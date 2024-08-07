package com.swp391.JewelryProduction.enums;

public enum OrderStatus {
    REQUEST,
        REQUESTING,             //GO TO REQ_AWAIT_APPROVAL
        REQ_AWAIT_APPROVAL,     //
            REQ_APPROVAL_CHOICE,
            REQ_APPROVED,   //GO TO IN_EXCHANGING   send email to customer
            REQ_DECLINED,   //GO TO CANCEL          send email to customer
        AWAIT_ASSIGN_STAFF,
            ASSIGN_STAFF_CHOICE,
        IN_EXCHANGING,          //Guard from REQ_AWAIT_APPROVAL to IN_EXCHANGIN
    QUOTATION,
        QUO_AWAIT_MANA_APPROVAL,
            QUO_MANA_APPROVAL_CHOICE,
            QUO_MANA_APPROVED,
            QUO_MANA_DECLINED,
        QUO_AWAIT_CUST_APPROVAL,                    //send email to customer
            QUO_CUST_APPROVAL_CHOICE,
            QUO_CUST_APPROVED,
            QUO_CUST_DECLINED,
        AWAIT_BET_TRANSACTION,
            BET_TRANSACTION_CHOICE,
            BET_TRANSACTION_SUCCESSFUL,
                BET_TRANSACTION_SUCCESSFUL_CHOICE,
            BET_TRANSACTION_UNSUCCESSFUL,
    DESIGN,
        IN_DESIGNING,
        DES_AWAIT_MANA_APPROVAL,
            DES_MANA_APPROVAL_CHOICE,
            DES_MANA_APPROVED,
            DES_MANA_DECLINED,
        DES_AWAIT_CUST_APPROVAL,                //send email to customer
            DES_CUST_APPROVAL_CHOICE,
            DES_CUST_APPROVED,
            DES_CUST_DECLINED,
    PRODUCTION,
        IN_PRODUCTION,
        PRO_AWAIT_APPROVAL,                     //send email to customer
            PRO_APPROVAL_CHOICE,
            PRO_APPROVED,
            PRO_DECLINED,
    TRANSPORT,
        ON_DELIVERING,
        DELIVERED_AWAIT_APPROVAL,          //send email to customer
            DELIVERED_APPROVAL_CHOICE,
            DELIVERED_CONFIRMED,
            DELIVERED_DENIED,
    FINISH,
        AWAIT_REMAIN_TRANSACTION,
            REMAIN_TRANSACTION_CHOICE,
            REMAIN_TRANSACTION_SUCCESSFUL,
            REMAIN_TRANSACTION_UNSUCCESSFUL,
    ORDER_COMPLETED, //send email to customer
    CANCEL,
    ORDER_RESTORED,
    ALL,
    INCOMPLETE
}
