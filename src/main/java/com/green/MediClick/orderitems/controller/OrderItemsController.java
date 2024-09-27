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

        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+searchVO.getSearchValue());
        List<OrderItemsVO> items=orderItemsService.getAllItems(searchVO);
        System.out.println("!!!!!!!!!!!!!!!!!!!!itmes:"+items);
        return items;
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

    //주문 취소
    @DeleteMapping("/del/{requestNum}")
    public void delOrder(@PathVariable("requestNum") int requestNum){
        orderItemsService.delOrder(requestNum);
    }

}
