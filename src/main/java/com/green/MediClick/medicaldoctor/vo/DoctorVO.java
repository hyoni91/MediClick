package com.green.MediClick.medicaldoctor.vo;

import lombok.Data;

import java.util.List;


@Data
public class DoctorVO {
    private String docNum;
    private String docName;
    private List<MedicalDept> medicalDept;
}
