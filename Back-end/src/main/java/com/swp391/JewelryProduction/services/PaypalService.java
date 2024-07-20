package com.swp391.JewelryProduction.services;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.pojos.Transactions;
import com.swp391.JewelryProduction.services.transaction.TransactionService;
import com.swp391.JewelryProduction.util.exceptions.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PaypalService {

    private final APIContext apiContext;
    private final TransactionService transactionService;

    public Payment makePayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelURL,
            String successURL
    ) throws PayPalRESTException {

        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(
                String.format(
                        Locale.forLanguageTag(currency),
                        "%.2f", total
                )
        );

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelURL);
        redirectUrls.setReturnUrl(successURL);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        payment = payment.create(apiContext);

        return payment;
    }

    public Payment createBet (
              Double total,
              String currency,
              String method,
              String intent,
              String description,
              String cancelURL,
              String successURL,
              Order order
    ) throws PayPalRESTException {
        Payment payment = makePayment(total, currency, method, intent, description, cancelURL, successURL);
        transactionService.createTransaction(payment, order);
        return payment;
    }

    public Payment createRemainingPayment (
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelURL,
            String successURL,
            Order order
    ) throws PayPalRESTException {
        Payment payment = makePayment(total, currency, method, intent, description, cancelURL, successURL);
        transactionService.createTransaction(payment, order);
        return payment;
    }

    public Payment executePayment (
            String paymentID,
            String payerID
    ) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentID);

        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerID);
        payment = payment.execute(apiContext, execution);

        return payment;
    }

    public Currency refundSale (
            String currency,
            String refundAmount,
            Transactions transactions
    ) throws PayPalRESTException {
        Sale sale = new Sale();
        sale.setId(transactions.getPaypalSaleId());

        RefundRequest refundRequest = new RefundRequest();

        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(refundAmount);

        refundRequest.setAmount(amount);

        DetailedRefund detailsRefund = sale.refund(apiContext, refundRequest);
        return detailsRefund.getTotalRefundedAmount();
    }

    public Payment getPaymentDetails(String paymentId) throws PayPalRESTException {
        return Payment.get(apiContext, paymentId);
    }
}
