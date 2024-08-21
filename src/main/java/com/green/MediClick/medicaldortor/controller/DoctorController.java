package com.green.MediClick.medicaldortor.controller;

import com.green.MediClick.medicaldortor.service.DoctorService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class DoctorController {
    @Resource(name = "doctorservice")
    private DoctorService doctorService;
}
