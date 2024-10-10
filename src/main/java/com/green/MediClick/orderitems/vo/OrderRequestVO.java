package com.green.MediClick.orderitems.vo;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestVO {

    private int requestNum;
    private int productNum;
    private int customerNum;
    private int quantity;
    private String requestStatus;
    private String requestDate;
    private OrderItemsVO orderItemsVO;
    private List<Object> orderDatas;
    private String customerName;  //join데이터를 가져오기위해서 추가
    private int totalPrice; // 주문 총액
    private int sumQuantity;
}
