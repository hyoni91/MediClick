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
    public DoctorVO getOneDoctor(int docNum) {
        return sqlSession.selectOne("doctorMapper.oneDoctor",docNum);
    }
}
