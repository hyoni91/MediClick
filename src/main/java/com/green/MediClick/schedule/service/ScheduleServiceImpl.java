package com.green.MediClick.schedule.service;

import com.green.MediClick.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<ScheduleVO> getDocMem(int docNum) {
        return sqlSession.selectList("scheduleMapper.docMemChart",docNum);
    }

    @Override
    public void updateSchStatus(int schNum) {
        sqlSession.update("scheduleMapper.updateSchStatus",schNum);
    }
}
