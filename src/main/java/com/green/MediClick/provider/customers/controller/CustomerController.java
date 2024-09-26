package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.service.CustomerServiceImpl;
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

    @DeleteMapping("/deleteCustomer")
    public void deleteCustomer(@RequestBody List<Integer> customerNumList){
        System.out.println("======================="+customerNumList);
        customerServise.deleteCustomer(customerNumList);
    }

    @PutMapping("/updateCustomer")
    public void updateCustomer(@RequestBody CustomersVO customersVO){
        customerServise.updateCustomer(customersVO);
    }

    @GetMapping("/detailCustomer/{customerNum}")
    public CustomersVO detailCustomer(@PathVariable("customerNum") int customerNum ){
        return customerServise.detailCustomer(customerNum);
    }

    @GetMapping("/orders/{customerNum}")
    public List<CustomersVO> orders(@PathVariable("customerNum") int customerNum){
        System.out.println("=================================="+customerNum);
        return customerServise.order(customerNum);
    }

}
