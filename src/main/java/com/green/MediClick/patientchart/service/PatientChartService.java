package com.green.MediClick.patientchart.service;

import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.patientchart.vo.PatientChartVO;
import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface PatientChartService {

    //모든 환자 조회
    List<MemberVO> memberList(SearchVO searchVO);

    //해당환자 진료차트 조회
    List<PatientChartVO> memberSelect(String memNum);

    //해당 환자와 진료과의 오늘 예약 정보
    ScheduleVO nowSchedule(ScheduleVO scheduleVO);

}
