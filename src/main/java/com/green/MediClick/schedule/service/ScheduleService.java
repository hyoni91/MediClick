package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    List<ScheduleVO> getDocMem(int docNum);

    void updateSchStatus(int schNum);

    // 예약을 위한 의사 진료과 정보 불러오기
    List<DoctorVO> getDocInfo();

    // 예약 insert
    void schInput(ScheduleVO scheduleVO);

    //예약 유무 확인
    ScheduleVO checkAppo(ScheduleVO scheduleVO);



}
