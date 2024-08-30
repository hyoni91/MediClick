package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;

import java.util.List;

public interface DoctorService {
    // 의사 정보 조회
    List<DoctorVO> getDoctorList();

    DoctorVO getOneDoctor(String docNum);

    // 다음에 들어갈 의사 이미지 조회
    String nextDoctorImg();

    // 회원가입할때 "ADMIN"이면 의사정보도 추가
    void insertDoctor(DoctorVO doctorVO);

    // 회원가입할때 의사 정보 조회
    DoctorVO selectDoctor(String docNum);


}
