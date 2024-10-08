package com.green.MediClick.provider.customers.vo;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
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
    private String orderStatus; //상세조회
//    private List<OrderRequestVO> orderRequest;
}
