package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
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
    public List<ScheduleVO> getMemSch(int memNum) {
        return sqlSession.selectList("scheduleMapper.getMemSch",memNum);
    }

    @Override
    public void updateSchStatus(int schNum) {
        sqlSession.update("scheduleMapper.updateSchStatus",schNum);
    }

    // 예약을 위한 의사 및 진료과 정보
    @Override
    public List<DoctorVO> getDocInfo() {
        return sqlSession.selectList("scheduleMapper.doctor");
    }

    // 예약 실행
    @Override
    public void schInput(ScheduleVO scheduleVO) {
        sqlSession.insert("scheduleMapper.insertsch", scheduleVO);
    }

    //예약 유무 확인(모든 조건 선택)
    @Override
    public ScheduleVO checkAppo(ScheduleVO scheduleVO) {
        return sqlSession.selectOne("scheduleMapper.checkAppo", scheduleVO);
    }

    //예약 유무 확인(진료과와 날짜 선택)
    @Override
    public ScheduleVO checkSchtime(ScheduleVO scheduleVO) {
        return sqlSession.selectOne("scheduleMapper.checkSchTime", scheduleVO);
    }




}
