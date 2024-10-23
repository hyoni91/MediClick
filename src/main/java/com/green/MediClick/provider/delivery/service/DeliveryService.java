package com.green.MediClick.provider.delivery.service;

import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;

import java.util.List;

public interface DeliveryService {
    DeliveryVO deliveryList(String deliveryDriverName);

    List<OrdersVO> ordersList();

    //회원가입
    void insertDriver(MemberVO memberVO);

    int selectOrderNum(int orderNum);
    void updateDriver(OrdersVO ordersVO);
    void updateDd(OrdersVO ordersVO);

    void endDriver(int deliveryNum);
    void endSameUpdate(int deliveryNum);

}
