package com.green.MediClick.patientchart.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("patientChartService")
public class PatientChartServiceImpl implements  PatientChartService{

    @Autowired
    private SqlSessionTemplate sqlSession;
}
