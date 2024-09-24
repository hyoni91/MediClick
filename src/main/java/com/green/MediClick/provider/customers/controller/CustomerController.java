package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.service.CustomerServise;
import com.green.MediClick.provider.customers.vo.CustomersVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Resource(name = "customerService")
    private CustomerServise customerServise;

    @PostMapping("/customerList")
    public List<CustomersVO> customers(@RequestBody SearchVO searchVO){
        return customerServise.customerList(searchVO);
    }

    @PutMapping("/addCustomer")
    public void addCustomer(@RequestBody CustomersVO customersVO){
        System.out.println("============================="+ customersVO);
        customerServise.addCustomer(customersVO);
    }

}
