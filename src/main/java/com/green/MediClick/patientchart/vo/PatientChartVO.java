package com.green.MediClick.patientchart.vo;

import com.green.MediClick.schedule.vo.ScheduleVO;
import lombok.Data;

import java.util.List;

@Data
public class PatientChartVO {
    private int chartNum;
    private String chartDate;
    private String docNum;
    private String memNum;
    private String deptNum;
    private String symptom; //증상 진료차트의 진료란 input
    private String checkUp; //검사
    private String disease; //병명
    private String prescription; //처방
    private List<ScheduleVO> schList; // 스케줄 정보
}
