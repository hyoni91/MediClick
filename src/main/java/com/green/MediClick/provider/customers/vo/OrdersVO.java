package com.green.MediClick.provider.customers.vo;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;
import lombok.Data;

import java.util.List;

@Data
public class OrdersVO {
    private int orderNum;
    private int requestNum;
    private String  orderDate;
    private String orderStatus;
    private int totalPrice; // 주문 총액
    private String customerName; //DATA넘기기위해
    private String customerAddr; //DATA넘기기위해
    private int productNum; //DATA넘기기위해
    private int quantity; //DATA넘기기위해
    private CustomersVO customer;
    private OrderRequestVO orderRequest;
    private DeliveryVO delivery;

}
