package com.swp391.JewelryProduction.controller;

import com.swp391.JewelryProduction.dto.AccountDTO;
import com.swp391.JewelryProduction.dto.OrderDTO;
import com.swp391.JewelryProduction.enums.Role;
import com.swp391.JewelryProduction.services.account.AccountService;
import com.swp391.JewelryProduction.services.order.OrderService;
import com.swp391.JewelryProduction.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AccountService accountService;
    private final OrderService orderService;

    @GetMapping("/account-list")
    public ResponseEntity<Response> getAccounts() {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response("account-list", accountService.findAllAccounts())
                .buildEntity();
    }

//    @PostMapping("/account/remove/{accountId}")
//    public ResponseEntity<Response> deleteAccount(@PathVariable("accountId") String accountId) {
//        return Response.builder()
//                .status(HttpStatus.OK)
//                .message("Request sent successfully")
//                .buildEntity();
//    }

//    @PostMapping("/account/remove")
//    public ResponseEntity<Response> updateAccount(@RequestBody AccountDTO newAccount) {
//        accountService.updateAccount(newAccount);
//        return Response.builder()
//                .status(HttpStatus.OK)
//                .message("Request sent successfully")
//                .buildEntity();
//    }

    //<editor-fold desc="ADMIN" defaultstate="collapsed>

    //<editor-fold desc="CLIENTS/EMPLOYEES" defaultstate="collapsed>
    @GetMapping("/get/{role}/{offset}")
    public ResponseEntity<Response> getAccountByRole(@PathVariable("role") Role role, @PathVariable("offset") int offset) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response(role + "_list",accountService.findAllByRole(role, offset))
                .buildEntity();
    }
    @PostMapping("/create/account")
    public ResponseEntity<Response> createAccount(@RequestBody AccountDTO accountDTO) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response("account", accountService.createAccount(accountDTO))
                .buildEntity();
    }
    @PostMapping("/update/account")
    public ResponseEntity<Response> updateAccount(@RequestBody AccountDTO accountDTO) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response("account", accountService.updateAccount(accountDTO))
                .buildEntity();
    }
    @PostMapping("/delete/account")
    public ResponseEntity<Response> deleteAccount(@RequestParam String accountId) {
        accountService.deleteAccount(accountId);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .buildEntity();
    }
    //</editor-fold>

    //<editor-fold desc="ORDER" defaultstate="collapsed>
    @GetMapping("/get/order/{offset}")
    public ResponseEntity<Response> getOrder(@PathVariable("offset") int offset) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response("ORDER_list", orderService.findAll(offset))
                .buildEntity();
    }

    @PostMapping("/update/order")
    public ResponseEntity<Response> updateOrder(@RequestBody OrderDTO orderDTO) {
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .response("order", orderService.updateOrder(orderDTO))
                .buildEntity();
    }

    @PostMapping("/delete/order")
    public ResponseEntity<Response> deleteOrder(@RequestParam String orderId) {
        orderService.deleteOrder(orderId);
        return Response.builder()
                .status(HttpStatus.OK)
                .message("Request sent successfully")
                .buildEntity();
    }
    //</editor-fold>




    //</editor-fold>
}
