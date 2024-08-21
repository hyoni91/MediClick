package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.MedicalDeptService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class MedicalDeptController {
    @Resource(name = "deptService")
    private MedicalDeptService medicalDeptService;
}
