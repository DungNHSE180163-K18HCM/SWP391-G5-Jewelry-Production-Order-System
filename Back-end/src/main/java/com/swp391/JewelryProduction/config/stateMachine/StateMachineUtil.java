package com.swp391.JewelryProduction.config.stateMachine;

import com.swp391.JewelryProduction.enums.OrderEvent;
import com.swp391.JewelryProduction.enums.OrderStatus;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.services.order.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.service.StateMachineService;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.state.StateMachineState;
import org.springframework.util.ObjectUtils;

@Slf4j
public class StateMachineUtil {
    private static StateMachine<OrderStatus, OrderEvent> currentStateMachine;

    public static State<OrderStatus, OrderEvent> getCurrentState (StateMachine<OrderStatus, OrderEvent> stateMachine) {
        State<OrderStatus, OrderEvent> currentState = stateMachine.getState();
        while (currentState instanceof StateMachineState<OrderStatus, OrderEvent>) {
            StateMachineState<OrderStatus, OrderEvent> machineState = (StateMachineState<OrderStatus, OrderEvent>) currentState;
            currentState = machineState.getSubmachine().getState();
        }
        return currentState;
    }

    public static synchronized StateMachine<OrderStatus, OrderEvent> getStateMachine(
            String machineId, StateMachineService<OrderStatus,
            OrderEvent> stateMachineService
    ) throws RuntimeException {
        if (currentStateMachine == null) {
            currentStateMachine = stateMachineService.acquireStateMachine(machineId);
            currentStateMachine.startReactively().block();
        } else if (!ObjectUtils.nullSafeEquals(currentStateMachine.getId(), machineId)) {
            stateMachineService.releaseStateMachine(currentStateMachine.getId());
            currentStateMachine.stopReactively().block();
            currentStateMachine = stateMachineService.acquireStateMachine(machineId);
            currentStateMachine.startReactively().block();
        }
        return currentStateMachine;
    }

    public static StateMachine<OrderStatus, OrderEvent> instantiateStateMachine(
            Order order,
            OrderService orderService,
            StateMachineService<OrderStatus, OrderEvent> stateMachineService) {
        String orderId = order.getId();
        StateMachine<OrderStatus, OrderEvent> stateMachine = stateMachineService.acquireStateMachine(orderId, true);
        stateMachine.getExtendedState().getVariables().put("orderID", orderId);
        stateMachine.getStateMachineAccessor()
                .doWithAllRegions(
                        region -> region.addStateMachineInterceptor(new StateMachineInterceptor(orderService)
                        )
                );
        stateMachine.startReactively().block();
        log.info("State machine started successfully. Current state: " + stateMachine.getState().getId());
        return stateMachine;
    }
}
