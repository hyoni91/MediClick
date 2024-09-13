package com.green.MediClick.patientchart.controller;


import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.patientchart.service.PatientChartService;
import com.green.MediClick.patientchart.vo.PatientChartVO;
import com.green.MediClick.patientchart.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patientChart")
public class PatientChartController {

    @Resource(name = "patientChartService")
    private PatientChartService patientChartService;

    //모든 환자 정보 조회
    @PostMapping("/memberList")
    List<MemberVO> memberList(@RequestBody SearchVO searchVO){
        System.out.println("=============================="+searchVO);
        return patientChartService.memberList(searchVO);
    }

    //해당멤버 진료차트 조회
    @GetMapping("memberSelect/{memNum}")
    List<PatientChartVO> memberSelect(@PathVariable("memNum") String memNum){
        return patientChartService.memberSelect(memNum);
    }

}
