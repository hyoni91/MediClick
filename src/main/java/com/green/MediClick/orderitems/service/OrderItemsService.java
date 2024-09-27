package com.green.MediClick.orderitems.service;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.orderitems.vo.SearchVO;

import java.util.List;
import java.util.Map;

public interface OrderItemsService {

    //상품 목록
    List<OrderItemsVO> getAllItems(SearchVO searchVO);

    //주문
    void insertGetOrder(OrderRequestVO orderRequestVO);

    //주문 내역
    List<OrderRequestVO> getOrderList();

    //주문 취소
    void delOrder(int requestNum);

}
