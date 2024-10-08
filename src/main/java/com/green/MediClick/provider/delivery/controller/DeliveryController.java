package com.green.MediClick.provider.delivery.controller;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.service.DeliveryService;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
    @Resource(name = "deliveryService")
    DeliveryService deliveryService;

    @GetMapping("/deliveryList")
    public List<DeliveryVO> deliveryList(){
        return deliveryService.deliveryList();
    }
    @GetMapping("/ordersList")
    public List<OrdersVO> ordersList(){
        return deliveryService.ordersList();
    }
}
