package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.inventory.vo.InventoryVO;

import java.util.List;

public interface OrderService {

    List<OrdersVO> orders(SearchVO searchVO);

    void statusUpdate(int orderNum);

    //배송/수주테이블 '배송중'변경
    void updateStatus(OrdersVO ordersVO);

    //주문 상세 페이지
    OrdersVO detail(int requestNum);

    //해당 제품의 현재고량
    int currentStock(int productNum);

    //배송대기 상태의 제품 수량 합계
    int sumQnt (int productNum);

}
