package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    //의사별 담당환자 리스트
    List<ScheduleVO> getDocMem(int docNum);

    //의사별 담당환자 차트
    ScheduleVO getMemChart(int memNum);

    //담당환자 차트에서 예약정보 변경
    void updateSchChart(ScheduleVO scheduleVO);

    //환자가보는 나의 예약페이지
    List<ScheduleVO> getMemSch(int memNum);

    void updateSchStatus(int schNum);

    // 예약을 위한 의사 진료과 정보 불러오기
    List<DoctorVO> getDocInfo();

    // 예약 insert
    void schInput(ScheduleVO scheduleVO);

    //예약 유무 확인(모든 조건을 선택했을때)
    ScheduleVO checkAppo(ScheduleVO scheduleVO);

    //예약 유무 확인 (진료과와 날짜만 선택했을때)
    List<ScheduleVO> checkSchtime(ScheduleVO scheduleVO);

}
