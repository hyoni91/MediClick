package com.green.MediClick.orderitems.service;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.orderitems.vo.SearchVO;

import java.util.List;
import java.util.Map;

public interface OrderItemsService {

    List<OrderItemsVO> getAllItems(SearchVO searchVO);

    void insertGetOrder(List<Map<String, Object>> orderDatas);

    List<OrderRequestVO> getOrderList();
}
