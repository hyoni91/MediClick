package com.green.MediClick.orderitems.service;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;

import java.util.List;

public interface OrderItemsService {

    List<OrderItemsVO> getAllItems();

    void insertGetOrder(OrderRequestVO orderRequestVO);

    List<OrderRequestVO> getOrderList();
}
