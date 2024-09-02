package com.green.MediClick.patientchart.controller;


import com.green.MediClick.patientchart.service.PatientChartService;
import com.green.MediClick.patientchart.vo.PatientChartVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patientChart")
public class PatientChartController {

    @Resource(name = "patientChartService")
    private PatientChartService patientChartService;

    //진료차트에 표시할 정보 조회
    @GetMapping("/p_select/{schNum}")
    PatientChartVO pSelect(@PathVariable("schNum") int schNum){
        System.out.println("//////////////////////////////////////" + schNum);
        return patientChartService.pSelect(schNum);
    }

}
