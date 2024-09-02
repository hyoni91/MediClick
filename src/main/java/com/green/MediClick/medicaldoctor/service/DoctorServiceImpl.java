package com.green.MediClick.medicaldoctor.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
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
        return sqlSession.selectList("doctorMapper.medicalDoctorList");
    }

    @Override
    public DoctorVO getOneDoctor(String docNum) {
        return sqlSession.selectOne("doctorMapper.oneDoctor",docNum);
    }

    //다음에 들어갈 의사 이미지 조회
    @Override
    public int nextDoctorImg(int docImg) {
        return sqlSession.selectOne("doctorMapper.nextDoctorImg",docImg);
    }



    // 회원가입할때 의사 정보 조회
    @Override
    public DoctorVO selectDoctor(String docNum) {
        return sqlSession.selectOne("doctorMapper.selectDoctor",docNum);
    }

    @Override
    public void deleteDoctor(String docNum) {
        // 의사 정보 삭제
        sqlSession.delete("doctorMapper.deleteDoctor",docNum);
        // 멤버 정보 삭제
        sqlSession.delete("doctorMapper.deleteMember",docNum);
    }

    // 회원가입할때 "ADMIN"이면 의사정보도 추가
    @Override
    public void insertDoctor(DoctorVO doctorVO) {
        sqlSession.insert("doctorMapper.insertDoctor",doctorVO);
    }

}
