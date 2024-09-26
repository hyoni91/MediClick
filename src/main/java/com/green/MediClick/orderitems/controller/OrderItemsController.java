package com.green.MediClick.orderitems.controller;

import com.green.MediClick.orderitems.service.OrderItemsService;
import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.orderitems.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orderItems")
public class OrderItemsController {
    @Resource(name="orderItemsService")
    private OrderItemsService orderItemsService;

    // 상품 목록
    @PostMapping("/list")
    public List<OrderItemsVO> getAllItems(@RequestBody(required = false) SearchVO searchVO){

        //검색 또는 전체 데이터를 서비스로부터 가져옴
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+searchVO);


        return orderItemsService.getAllItems(searchVO);
    }

    //상품 주문
    @PutMapping("/insertOrder")
    public void insertGetOrder(@RequestBody List<Map<String, Object>> orderDatas){
        System.out.println("!!!!!!!!!!!!!!!"+orderDatas);
        orderItemsService.insertGetOrder(orderDatas);
    }

    //주문 내역
    @GetMapping("/orderList")
    public List<OrderRequestVO> getOrderList(){
        return orderItemsService.getOrderList();
    }

}
