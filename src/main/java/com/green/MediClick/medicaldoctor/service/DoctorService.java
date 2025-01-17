package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.medicaldoctor.vo.MedicalDept;

import java.util.List;

public interface DoctorService {
    // 의사 정보 조회
    List<DoctorVO> getDoctorList();

    DoctorVO getOneDoctor(String docNum);

    // 다음에 들어갈 의사 이미지 조회
    int nextDoctorImg(int docImg);

    // 회원가입할때 "ADMIN"이면 의사정보도 추가
    void insertDoctor(DoctorVO doctorVO);

    // 회원가입할때 의사 정보 조회
    DoctorVO selectDoctor(String docNum);

    // 회원가입 취소시 삭제되는 데이터
    void deleteDoctor(String docNum);

    // 진료과 데이터 추가
    void insertDept(MedicalDept medicalDept);
    // 이미지 저장
    void insertDocImg(DoctorImgVO imgVO);

    // 의사 정보 수정
    void updateDoctor(DoctorVO doctorVO);
}
