package com.green.MediClick.orderitems.controller;

import com.green.MediClick.orderitems.service.OrderItemsService;
import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItems")
public class OrderItemsController {
    @Resource(name="orderItemsService")
    private OrderItemsService orderItemsService;

    // 상품 목록
    @GetMapping("/list")
    public List<OrderItemsVO> getAllItems(){
        return orderItemsService.getAllItems();
    }

    //상품 주문
    @PutMapping("/insertOrder")
    public void insertGetOrder(@RequestBody OrderRequestVO orderRequestVO){
        System.out.println("!!!!!!!!!!!!!!!"+orderRequestVO);
        orderItemsService.insertGetOrder(orderRequestVO);
    }

    //주문 내역
    @GetMapping("/orderList")
    public List<OrderRequestVO> getOrderList(){
        return orderItemsService.getOrderList();
    }

}
