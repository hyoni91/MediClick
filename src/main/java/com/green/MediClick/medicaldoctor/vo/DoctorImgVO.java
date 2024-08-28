package com.green.MediClick.medicaldoctor.vo;

import lombok.Data;

@Data
public class DoctorImgVO {
    private String imgNum;
    private String originFileName; //원본파일
    private String attachedFileName; //첨부파일
    private String docNum;
}
