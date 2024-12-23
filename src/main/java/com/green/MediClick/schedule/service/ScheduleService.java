package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.PageVO;
import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    //의사별 담당환자 리스트
    List<ScheduleVO> getDocMem(String docNum, PageVO pageVO);

    //총 예약 환자 수
    int getChartCnt(String docNum);

    //의사별 담당환자 차트
    ScheduleVO getMemChart(String schNum);

    //담당환자 차트에서 예약정보 변경
    void updateSchChart(ScheduleVO scheduleVO);

    //환자가보는 나의 예약페이지
    List<ScheduleVO> getMemSch(String memNum,PageVO pageVO);

    //환자 총 예약 수
    int getMyChartCnt(String memNum);

    //예약 취소
//    void updateSchStatus(int schNum);
    void deleteSch(int schNum);

    // 예약을 위한 의사 진료과 정보 불러오기
    List<DoctorVO> getDocInfo();

    // 예약 insert
    void schInput(ScheduleVO scheduleVO);

    //예약 유무 확인 (진료과와 날짜만 선택했을때)
    List<ScheduleVO> checkSchtime(ScheduleVO scheduleVO);

    //과거(오늘기준) 예약 자동 삭제
    void autoDelete();

}
