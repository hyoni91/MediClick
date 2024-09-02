package com.green.MediClick.patientchart.service;

import com.green.MediClick.patientchart.vo.PatientChartVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("patientChartService")
public class PatientChartServiceImpl implements  PatientChartService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public PatientChartVO pSelect(int schNum) {
        return sqlSession.selectOne("patientChartMapper.p-select",schNum);
    }
}
