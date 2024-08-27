package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;

import java.util.List;

public interface DoctorService {
    // 의사 정보 조회
    List<DoctorVO> getDoctorList();

    DoctorVO getOneDoctor(int docNum);
}
