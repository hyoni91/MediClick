package com.green.MediClick.patientchart.service;

import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.patientchart.vo.PatientChartVO;
import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("patientChartService")
public class PatientChartServiceImpl implements  PatientChartService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<MemberVO> memberList(SearchVO searchVO) {
        return sqlSession.selectList("patientChartMapper.allMember",searchVO);
    }

    @Override
    public List<PatientChartVO> memberSelect(String memNum) {
        return sqlSession.selectList("patientChartMapper.select", memNum);
    }

    @Override
    public ScheduleVO nowSchedule(ScheduleVO scheduleVO) {
        return sqlSession.selectOne("patientChartMapper.nowSchedule",scheduleVO);
    }
}
