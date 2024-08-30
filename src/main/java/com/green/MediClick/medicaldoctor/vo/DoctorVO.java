package com.green.MediClick.medicaldoctor.vo;

import lombok.Data;

import java.util.List;

@Data
public class DoctorVO {
    private String docNum;
    private String docName;
    private int deptNum;
    private MedicalDept medicalDept;
    private DoctorImgVO imgVO;
}

