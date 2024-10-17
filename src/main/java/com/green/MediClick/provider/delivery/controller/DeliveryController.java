package com.green.MediClick.provider.delivery.controller;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.service.DeliveryService;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
    @Resource(name = "deliveryService")
    DeliveryService deliveryService;

    @GetMapping("/deliveryList/{deliveryDriverName}")
    public DeliveryVO deliveryList(@PathVariable("deliveryDriverName") String deliveryDriverName){
        return deliveryService.deliveryList(deliveryDriverName);
    }
    @GetMapping("/ordersList")
    public List<OrdersVO> ordersList(){
        return deliveryService.ordersList();
    }

    @PostMapping("/updateDriver")
    public void updateDriver(@RequestBody DeliveryVO deliveryVO){
        deliveryService.updateDriver(deliveryVO);
    }
    @PostMapping("/endDriver")
    public void endDriver(@RequestBody DeliveryVO deliveryVO){
        deliveryService.endDriver(deliveryVO.getDeliveryNum());
    }
}
