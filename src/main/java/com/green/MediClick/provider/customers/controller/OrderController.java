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
//    @PostMapping("/deli-orders-statusUpdate")
//    public void deliOrdersUpdate(@RequestBody List<OrdersVO> ordersVO){
//        System.out.println("========================================"+ordersVO);
//            orderService.updateStatus(ordersVO);
//
//    }

    //수주테이블 배송신청 누르면 '배송중'변경
    @PostMapping("/updateOrders")
    public void updateOrders(@RequestBody List<OrdersVO> ordersVO){
        System.out.println("@!!!!!!!!!!!!!!!!"+ordersVO);
        orderService.updateOrders(ordersVO);
    }

    //배송신청시 재고테이블 OUT
    @PostMapping("/outgoing")
    public void outgoing(@RequestBody List<OrdersVO> ordersVO){
        orderService.outgoing(ordersVO);
    }

    //상세페이지
    @GetMapping("/ordersDetail/{orderDate}")
    public List<OrdersVO> orderDetail(@PathVariable("orderDate")String orderDate){
        System.out.println(orderDate);
        return orderService.detail(orderDate);
    }

    // orderDate값 뽑으려고
    @PostMapping("/ordersDate")
    public List<OrdersVO> ordersDate(@RequestBody SearchVO searchVO){

        return orderService.detailOrderDate(searchVO);
    }

    //해당 제품의 현재고량
    @GetMapping("/CurrentStock/{productNum}")
    public List<Integer> currentStock(@PathVariable("productNum") int productNum){
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!! productNum "+productNum);
       return  orderService.currentStock(productNum);
    }

    //배송대기 상태의 제품의 수량 합계
    @GetMapping("/sumQnt/{productNum}")
    public List<Integer> sumQnt (@PathVariable("productNum") int productNum){
        System.out.println("=======================" + productNum);
        return orderService.sumQnt(productNum);
    }

}
