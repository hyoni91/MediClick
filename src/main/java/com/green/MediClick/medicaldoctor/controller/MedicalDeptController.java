package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.MedicalDeptService;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.medicaldoctor.vo.MedicalDept;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class MedicalDeptController {
    @Resource(name = "deptService")
    private MedicalDeptService medicalDeptService;
}
