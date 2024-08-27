package com.green.MediClick.schedule.vo;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import lombok.Data;

@Data
public class ScheduleVO {
    private int schNum;
    private int docNum;
    private int memNum;
    private int deptNum; // 진료과 추가
    private String regDate;
    private String schDate;
    private String schTime; //시간 추가
    private String detail;
    private String schStatus;
    private MemberVO memberVO;
    private DoctorVO doctorVO;
}
