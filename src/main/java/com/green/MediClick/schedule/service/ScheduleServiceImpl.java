package com.green.MediClick.schedule.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.vo.PageVO;
import com.green.MediClick.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    //의사별 담당환자 리스트
    @Override
    public List<ScheduleVO> getDocMem(String docNum,PageVO pageVO) {
        return sqlSession.selectList("scheduleMapper.docMemChart", Map.of("docNum", docNum, "pageVO", pageVO));
    }

    //총 예약 환자 수
    @Override
    public int getChartCnt(String docNum) {
        return sqlSession.selectOne("scheduleMapper.getChartCnt",docNum);
    }

    //의사별 담당환자 차트
    @Override
    public ScheduleVO getMemChart(String schNum) {
        return sqlSession.selectOne("scheduleMapper.getMemChart",schNum);
    }

    //담당환자 차트에서 예약정보 변경
//    @Override
//    public void updateSchChart(ScheduleVO scheduleVO) {
//        sqlSession.update("scheduleMapper.updateSchChart",scheduleVO);
//    }

    //환자가보는 나의 예약페이지
    @Override
    public List<ScheduleVO> getMemSch(String memNum,PageVO pageVO) {
        return sqlSession.selectList("scheduleMapper.getMemSch",Map.of("memNum",memNum,"pageVO",pageVO));
    }

    //환자페이지 총 예약개수
    @Override
    public int getMyChartCnt(String memNum) {
        return sqlSession.selectOne("scheduleMapper.getMyChartCnt",memNum);
    }

    //예약취소
    @Override
//    public void updateSchStatus(int schNum) {
//        sqlSession.update("scheduleMapper.updateSchStatus",schNum);
//    }
    public void deleteSch(int schNum){
        sqlSession.delete("scheduleMapper.deleteSch",schNum);
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


    //예약 유무 확인(진료과와 날짜 선택)
    @Override
    public List<ScheduleVO> checkSchtime(ScheduleVO scheduleVO) {
        return sqlSession.selectList("scheduleMapper.checkSchtime", scheduleVO);
    }

    //과거 예약 자동 삭제
    @Override
    public void autoDelete() {
        sqlSession.delete("scheduleMapper.autoDelete");
    }


}
