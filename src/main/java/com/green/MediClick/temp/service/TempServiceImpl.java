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

    //실시간 온도 데이터 10개
    @Override
    public List<TempVO> selectTempAll() {
        return sqlSession.selectList("tempMapper.nowTemps");
    }

    @Override
    public void keepDel() {
        sqlSession.delete("tempMapper.keepDel");
    }

    //한시간 온도데이터
    @Override
    public List<TempVO> timeAvgDate() {
        return sqlSession.selectList("tempMapper.timeAvgDate");
    }

    //온도데이터 (평균)
    @Override
    public List<TempVO> tempListData() {
        return sqlSession.selectList("tempMapper.tempListData");
    }
}
