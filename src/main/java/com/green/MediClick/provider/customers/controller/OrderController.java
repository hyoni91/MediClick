package com.green.MediClick.provider.customers.controller;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.service.OrderService;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.inventory.vo.InventoryVO;
import jakarta.annotation.Resource;
import org.apache.ibatis.annotations.Update;
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

    @PutMapping("/statusUpdate/{orderNum}")
    public void statusUpdate(@PathVariable("orderNum") int orderNum){
        orderService.statusUpdate(orderNum);
    }

    //배송과 수주 현황 변경 '배송중' and 배송 insert
    @PostMapping("/deli-orders-statusUpdate")
    public void deliOrdersUpdate(@RequestBody OrdersVO ordersVO){
        System.out.println("========================================"+ordersVO);
            orderService.updateStatus(ordersVO);

    }

    //상세페이지
    @GetMapping("/ordersDetail/{requestNum}")
    public OrdersVO orderDertail(@PathVariable("requestNum")int requestNum){
        return orderService.detail(requestNum);
    }

    //해당 제품의 현재고량
    @GetMapping("/CurrentStock/{productNum}")
    public int currentStock(@PathVariable("productNum") int productNum){
       return  orderService.currentStock(productNum);
    }

    //배송대기 상태의 제품의 수량 합계
    @GetMapping("/sumQnt/{productNum}")
    public int sumQnt (@PathVariable("productNum") int productNum){
        return orderService.sumQnt(productNum);
    }

}
