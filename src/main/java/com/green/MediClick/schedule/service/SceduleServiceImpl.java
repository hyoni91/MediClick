package com.green.MediClick.schedule.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("scheduleService")
public class SceduleServiceImpl implements ScheduleService{
    @Autowired
    private SqlSessionTemplate sqlSession;
}
