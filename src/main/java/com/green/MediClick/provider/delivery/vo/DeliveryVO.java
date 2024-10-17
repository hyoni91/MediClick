package com.green.MediClick.provider.delivery.vo;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import lombok.Data;

@Data
public class DeliveryVO {
    private int deliveryNum;
    private int orderNum;
    private String deliveryDriverName;
    private String deliveryDriverPhone;
    private String deliveryAddress;
    private String startTime;
    private String endTime;
    private String deliveryStatus;
    private OrdersVO ordersVO;

}
