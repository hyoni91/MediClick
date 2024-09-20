package com.green.MediClick.patientchart.controller;


import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.patientchart.service.MedicineService;
import com.green.MediClick.patientchart.service.PatientChartService;
import com.green.MediClick.patientchart.vo.MedicineVO;
import com.green.MediClick.patientchart.vo.PatientChartVO;
import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patientChart")
public class PatientChartController {

    @Resource(name = "patientChartService")
    private PatientChartService patientChartService;

    @Resource(name = "medicineService")
    private MedicineService medicineService;

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

    //해당 멤버 해당 진료과의 오늘 예약
    @PostMapping("/nowSchedule")
    ScheduleVO nowSchedule(@RequestBody ScheduleVO scheduleVO){
        return patientChartService.nowSchedule(scheduleVO);
    }

    //차트 입력
    @PutMapping("/chartInsert")
    public void chartInsert(@RequestBody PatientChartVO patientChartVO){
        patientChartService.chartInsert(patientChartVO);
    }

    //약정보
    @GetMapping("/medicineList")
    public List<MedicineVO> medicineList(){
       return medicineService.medicineList();
    }

    //마지막 차트 번호
    @GetMapping("/chartNum")
    public int chartNum(){
        return patientChartService.chartNum();
    }

}
