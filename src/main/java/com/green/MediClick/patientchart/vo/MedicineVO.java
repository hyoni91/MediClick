package com.green.MediClick.patientchart.vo;


// 처방

import lombok.Data;

@Data
public class MedicineVO {
    private int mNum;
    private String mName; //처방약 이름
    private String dosage; // 복용량  2알 / 1알 등등
}
