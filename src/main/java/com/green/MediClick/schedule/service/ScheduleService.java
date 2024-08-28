package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    List<ScheduleVO> getDocMem(int docNum);

    List<ScheduleVO> getMemSch(int memNum);

    void updateSchStatus(int schNum);

    // 예약을 위한 의사 진료과 정보 불러오기
    List<DoctorVO> getDocInfo();

    // 예약 insert
    void schInput(ScheduleVO scheduleVO);

    //예약 유무 확인(모든 조건을 선택했을때)
    ScheduleVO checkAppo(ScheduleVO scheduleVO);

    //예약 유무 확인 (진료과와 날짜만 선택했을때)
    ScheduleVO checkSchtime(ScheduleVO scheduleVO);

}
