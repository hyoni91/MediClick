package com.green.MediClick.patientchart.controller;


import com.green.MediClick.patientchart.service.PatientChartService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patientChart")
public class PatientChartController {

    @Resource(name = "patientChartService")
    private PatientChartService patientChartService;
}
