package com.green.MediClick.provider.delivery.controller;

import com.green.MediClick.provider.delivery.service.DeliveryService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
    @Resource(name = "deliveryService")
    DeliveryService deliveryService;
}
