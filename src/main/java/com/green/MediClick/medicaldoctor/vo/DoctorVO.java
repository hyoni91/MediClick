package com.green.MediClick.medicaldoctor.vo;

import lombok.Data;

import java.util.List;

@Data
public class DoctorVO {
    private int docNum;
    private String docName;
    private MedicalDept medicalDept;
    private int deptNum;
    private MedicalDept deptVO;
    private List<MedicalDept> medicalDept;
}
