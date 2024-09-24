package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.provider.customers.service.CustomerServise;
import com.green.MediClick.provider.customers.vo.CustomersVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Resource(name = "customerService")
    private CustomerServise customerServise;

    @GetMapping("/customerList")
    public List<CustomersVO> customers(){
        return customerServise.customerList();
    }

}
