package com.green.MediClick.provider.customers.vo;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import lombok.Data;

import java.util.List;

@Data
public class OrdersVO {
    private int orderNum;
    private int requestNum;
    private String  orderDate;
    private String orderStatus;
    private int totalPrice; // 주문 총액
    private String customerName;
    private CustomersVO customer;
    private OrderRequestVO orderRequest;
}
