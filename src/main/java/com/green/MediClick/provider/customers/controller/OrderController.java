package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.service.OrderService;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Resource(name = "orderService")
    private OrderService orderService;

    @PostMapping("/orderlist")
    public List<OrdersVO> orders(@RequestBody SearchVO searchVO){
        return orderService.orders(searchVO);
    }

    @PostMapping("/orderInsert")
    public void orderInsert(@RequestBody List<Integer> requesNumtList){
        orderService.orderInsert(requesNumtList);
    }
}
