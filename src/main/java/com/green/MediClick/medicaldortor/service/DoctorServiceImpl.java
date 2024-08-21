package com.green.MediClick.medicaldortor.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("doctorService")
public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private SqlSessionTemplate sqlSession;
}
