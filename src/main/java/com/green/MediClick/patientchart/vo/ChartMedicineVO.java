package com.green.MediClick.patientchart.vo;


import lombok.Data;

//처방전
@Data
public class ChartMedicineVO {
    private int cmNum;
    private int chartNum; //차트 fk
    private int mNum; //약 fk
    private int quantity; // 처방된 약의 총 수량 2알 10일 = 20
}
