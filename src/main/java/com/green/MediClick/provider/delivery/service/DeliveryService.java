package com.green.MediClick.provider.delivery.service;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;

import java.util.List;

public interface DeliveryService {
    List<DeliveryVO> deliveryList();

    List<OrdersVO> ordersList();
}
