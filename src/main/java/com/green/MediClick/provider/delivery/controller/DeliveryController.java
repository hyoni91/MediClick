package com.green.MediClick.provider.delivery.controller;

import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.service.DeliveryService;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
@Slf4j
public class DeliveryController {
    @Resource(name = "deliveryService")
    DeliveryService deliveryService;

    @GetMapping("/deliveryList/{deliveryDriverName}")
    public DeliveryVO deliveryList(@PathVariable("deliveryDriverName") String deliveryDriverName){

        return deliveryService.deliveryList(deliveryDriverName);
    }
    @GetMapping("/ordersList")
    public List<OrdersVO> ordersList(){
        log.info("///////////////////////////"+deliveryService.ordersList().toString());
        return deliveryService.ordersList();
    }

    @PostMapping("/updateDriver")
    public void updateDriver(@RequestBody OrdersVO ordersVO){
        log.info(ordersVO+"////////////////");
        deliveryService.updateDriver(ordersVO);
        log.info(ordersVO+"////////////////");
        deliveryService.updateDd(ordersVO);
    }
    @PostMapping("/endDriver")
    public void endDriver(@RequestBody OrdersVO ordersVO){
        log.info(ordersVO+"////////////////");

        deliveryService.endDriver(ordersVO.getOrderNum());
        deliveryService.endSameUpdate(ordersVO.getDeliveryNum());
    }

}
