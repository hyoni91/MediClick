package com.green.MediClick.temp.service;


import com.green.MediClick.temp.vo.TempVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("tempService")
public class TempServiceImpl implements TempService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<TempVO> selectTempAll() {
        return sqlSession.selectList("tempMapper.nowTemps");
    }

    @Override
    public List<TempVO> oneHourData() {
        return sqlSession.selectList("tempMapper.oneHourData");
    }
}
