package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    List<ScheduleVO> getDocMem(int docNum);

    void updateSchStatus(int schNum);

    // 예약을 위한 멤버와 의사 진료과 정보 불러오기
    MemberVO getMemInfo(int memNum);

    DoctorVO getDocInfo(int deptNum);

    // 예약 insert
    void schInput(ScheduleVO scheduleVO);





}
