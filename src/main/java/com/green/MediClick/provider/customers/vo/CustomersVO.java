package com.green.MediClick.provider.customers.vo;

import lombok.Data;

@Data
public class CustomersVO {
    private int customerNum;
    private String customerName;
    private String customerOwner;
    private String businessNumber; //사업자 번호
    private String customerAddr;
    private String customerTel;
    private String customerEmail;
}
