package com.green.MediClick.patientchart.service;

import com.green.MediClick.patientchart.vo.MedicineVO;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service ("medicineService")
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    SqlSessionTemplate sqlSession;


    @Override
    public List<MedicineVO> medicineList() {
        return sqlSession.selectList("medicineMapper.medicineList");
    }
}
