package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.orderitems.vo.OrderRequestVO;
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

    // 수주테이블로 대체
//    @GetMapping("/orders/{requestNum}")
//    public List<CustomersVO> orders(@PathVariable("requestNum") int requestNum){
//        System.out.println("=================================="+requestNum);
//        return customerServise.order(requestNum);
//    }

    // orderscontoller로 대처되면 삭제예정
//    @PostMapping("/orderlist")
//    public List<OrderRequestVO> orderList(@RequestBody  SearchVO searchVO){
//        return customerServise.orderList(searchVO);
//    }
}
