package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.DoctorService;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class DoctorController {
    @Resource(name = "doctorService")
    private DoctorService doctorService;

    // 의사 정보 조회
    @GetMapping("/doctorList")
    public List<DoctorVO> getDoctorList(){
        return doctorService.getDoctorList();
    }
}
