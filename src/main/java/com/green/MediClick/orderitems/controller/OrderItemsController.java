package com.green.MediClick.orderitems.controller;

import com.green.MediClick.orderitems.service.OrderItemsService;
import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.orderitems.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.Param;

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

        return orderItemsService.getAllItems(searchVO);
    }

    //선택주문
    @PutMapping("/insertOrderChecked")
    public void insertGetOrderChecked(@RequestBody List<OrderRequestVO> orderDatas){
        System.out.println("!!!!!!!!!!!!!!! 선택 : "+orderDatas);

        orderItemsService.insertGetOrder(orderDatas);

    }

    //개별주문
    @PutMapping("/insertOrder")
    public void insertGetOrder(@RequestBody OrderRequestVO orderRequestVO){
        System.out.println("!!!!!!!!!!!!!!! 개별 : "+orderRequestVO);

        orderItemsService.insertSingleOrder(orderRequestVO);
    }

    //주문 내역
    @GetMapping("/orderList")
    public List<OrderRequestVO> getOrderList(){
        return orderItemsService.getOrderList();
    }

    //주문 취소 상태로 변경
    @DeleteMapping("/update/{requestNum}")
    public void updateOrder(@PathVariable("requestNum") int requestNum){
        orderItemsService.updateOrder(requestNum);
    }

}
