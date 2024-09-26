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
}
