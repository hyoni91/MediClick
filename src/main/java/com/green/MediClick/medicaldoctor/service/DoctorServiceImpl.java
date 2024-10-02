package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.medicaldoctor.vo.MedicalDept;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("doctorService")
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    // 의사 정보 조회
    @Override
    public List<DoctorVO> getDoctorList() {
        return sqlSession.selectList("mappers.generalMapper.doctorMapper.medicalDoctorList");
    }

    @Override
    public DoctorVO getOneDoctor(String docNum) {
        return sqlSession.selectOne("mappers.generalMapper.doctorMapper.oneDoctor",docNum);
    }

    //다음에 들어갈 의사 이미지 조회
    @Override
    public int nextDoctorImg(int docImg) {
        return sqlSession.selectOne("mappers.generalMapper.doctorMapper.nextDoctorImg",docImg);
    }



    // 회원가입할때 의사 정보 조회
    @Override
    public DoctorVO selectDoctor(String docNum) {
        return sqlSession.selectOne("mappers.generalMapper.doctorMapper.selectDoctor",docNum);
    }

    @Override
    public void deleteDoctor(String docNum) {
        // 의사 정보 삭제
        sqlSession.delete("mappers.generalMapper.doctorMapper.deleteDoctor",docNum);
        // 멤버 정보 삭제
        sqlSession.delete("mappers.generalMapper.doctorMapper.deleteMember",docNum);
    }

    //진료과 선택후 저장
    @Override
    public void insertDept(MedicalDept medicalDept) {
        sqlSession.insert("mappers.generalMapper.doctorMapper.insertDept",medicalDept);
    }

    //이미지 저장
    @Override
    public void insertDocImg(DoctorImgVO imgVO) {
        sqlSession.insert("mappers.generalMapper.doctorMapper.insertDocImg",imgVO);
    }

    @Override
    public void updateDoctor(DoctorVO doctorVO) {
        sqlSession.update("mappers.generalMapper.doctorMapper.updateDoctor",doctorVO);
    }

    // 회원가입할때 "ADMIN"이면 의사정보도 추가
    @Override
    public void insertDoctor(DoctorVO doctorVO) {
        sqlSession.insert("mappers.generalMapper.doctorMapper.insertDoctor",doctorVO);
    }

}
