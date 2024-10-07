package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;

import java.util.List;

public interface OrderService {

    List<OrdersVO> orders(SearchVO searchVO);

    void statusUpdate(int orderNum);

    //배송/수주테이블 '배송중'변경
    void updateStatus(OrdersVO ordersVO);

    //주문 상세 페이지
    OrdersVO detail(int requestNum);

}
