package com.green.MediClick.medicaldortor.controller;

import com.green.MediClick.medicaldortor.service.MedicalDeptService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class MedicalDeptController {
    @Resource(name = "deptservice")
    private MedicalDeptService medicalDeptService;
}
