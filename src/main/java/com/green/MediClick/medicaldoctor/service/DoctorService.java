package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;

import java.util.List;

public interface DoctorService {
    // 의사 정보 조회
    List<DoctorVO> getDoctorList();

    DoctorVO getOneDoctor(int docNum);

    // 다음에 들어갈 의사 이미지 조회
    String nextDoctorImg();


}
