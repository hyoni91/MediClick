package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.CustomersVO;

import java.util.List;

public interface CustomerServise {

    List<CustomersVO> customerList(SearchVO searchVO);

    void addCustomer(CustomersVO customersVO);

}
