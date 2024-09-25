package com.green.MediClick.provider.customers.vo;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

@Data
public class CustomersVO {
    private int customerNum;
    private String customerName;
    private String customerOwner;
    private String businessNumber; //사업자 번호
    private String customerAddr;
    private String customerTel;
    private String customerEmail;
    private List<Integer> customerNumList;
}
