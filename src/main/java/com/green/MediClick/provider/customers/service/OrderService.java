package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;

import java.util.List;

public interface OrderService {

    List<OrdersVO> orders(SearchVO searchVO);

    void statusUpdate(int orderNum);

}
