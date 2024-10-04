package com.green.MediClick.provider.delivery.vo;

import lombok.Data;

@Data
public class DeliveryVO {
    private int deliveryNum;
    private int orders;
    private String deliveryDriverName;
    private String deliveryDriverPhone;
    private String deliveryAddress;
    private String startTime;
    private String endTime;
    private String deliveryStatus;
}
