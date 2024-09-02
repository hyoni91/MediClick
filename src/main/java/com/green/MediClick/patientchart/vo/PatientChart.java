package com.green.MediClick.patientchart.vo;

import lombok.Data;

@Data
public class PatientChart {
    private int chartNum;
    private String chartDate;
    private String docNum;
    private String memNum;
    private String deptNum;
    private String symptom; //증상
    private String checkUp; //검사
    private String disease; //병명
    private String prescription; //처방
}
