package com.green.MediClick.orderitems.vo;

import lombok.Data;

@Data
public class OrderRequestVO {

    private int requestNum;
    private int productNum;
    private int customerNum;
    private int quantity;
    private String requestStatus;
    private String requestDate;
    private OrderItemsVO orderItemsVO;
}
