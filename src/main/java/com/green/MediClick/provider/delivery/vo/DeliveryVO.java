package com.green.MediClick.provider.delivery.vo;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import lombok.Data;

import java.util.List;

@Data
public class DeliveryVO {
    private int deliveryNum;
    private String deliveryDriverName;
    private String deliveryDriverPhone;
    private String deliveryStatus;
    private List<OrdersVO> orderList;
    private int orderNum;
}
