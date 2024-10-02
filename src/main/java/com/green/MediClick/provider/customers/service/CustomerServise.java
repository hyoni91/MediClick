package com.green.MediClick.provider.customers.service;

import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.CustomersVO;

import java.util.List;

public interface CustomerServise {

    List<CustomersVO> customerList(SearchVO searchVO);

    void addCustomer(CustomersVO customersVO);

    void deleteCustomer(List<Integer> customerNumList);

    void updateCustomer(CustomersVO customersVO);

    CustomersVO detailCustomer(int customerNum);

    List<CustomersVO> order(int requestNum);

    List<OrderRequestVO> orderList(SearchVO searchVO);

}
