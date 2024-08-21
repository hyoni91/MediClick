package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.DoctorService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class DoctorController {
    @Resource(name = "doctorservic")
    private DoctorService doctorService;
}
