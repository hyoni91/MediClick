package com.green.MediClick.medicaldoctor.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("deptService")
public class MedicalDeptServiceImpl implements MedicalDeptService{
    @Autowired
    private SqlSessionTemplate sqlSession;
}