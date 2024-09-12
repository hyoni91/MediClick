package com.green.MediClick.schedule.controller;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.service.ScheduleService;
import com.green.MediClick.schedule.vo.PageVO;
import com.green.MediClick.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;

    //의사별 담당환자 리스트
    @PostMapping("/getDocMemList")
    public Map<String,Object> getDocMemList(@RequestBody DoctorVO doctorVO){

        //전체 환자 수
        //scheduleService.getChartCnt(doctorVO.getDocNum());

        //페이지 정보를 담을 수 있는 PageVO 생성
        PageVO pageInfo=new PageVO(scheduleService.getChartCnt(doctorVO.getDocNum()));

        pageInfo.setPageInfo();

        System.out.println(pageInfo);

        //화면상에 나타나는 현재 페이지 번호
        if(doctorVO.getPageNo()!=0){
            pageInfo.setNowPage(doctorVO.getPageNo());
        }

        pageInfo.setPageInfo();

        List<ScheduleVO> scheduleList=scheduleService.getDocMem(doctorVO.getDocNum(),pageInfo);

        //리액트로 가져갈 모든 데이터를 담을 변수
        Map<String,Object> mapData=new HashMap<>();
        //페이징 정보가 담긴 데이터
        mapData.put("pageInfo",pageInfo);
        mapData.put("scheduleList",scheduleList);


        return mapData;
    }

    //의사별 담당환자 차트
    @GetMapping("/getMemChart/{schNum}")
    public ScheduleVO getMemChart(@PathVariable("schNum")String schNum){
        return scheduleService.getMemChart(schNum);
    }

    //담당환자 차트에서 예약정보 변경
//    @PutMapping("/updateSchChart")
//    public void updateSchChart(@RequestBody ScheduleVO scheduleVO){
//        scheduleService.updateSchChart(scheduleVO);
//    }

    //환자가 보는 나의 예약페이지
    @PostMapping("/getMemSch")
    public Map<String,Object> getMemSch(@RequestBody MemberVO memberVO){
        //페이징처리 예정

        //전체 예약 수
        scheduleService.getMyChartCnt(memberVO.getMemNum());

        //페이지 정보를 담을 수 있는 PageVO 생성
        PageVO pageInfo=new PageVO(scheduleService.getMyChartCnt(memberVO.getMemNum()));

        //화면상에 나타나는 현재 페이지 번호
        if(memberVO.getPageNo()!=0){
            pageInfo.setNowPage(memberVO.getPageNo());
        }

        pageInfo.setPageInfo();

        List<ScheduleVO> scheduleList=scheduleService.getMemSch(memberVO.getMemNum(),pageInfo);

        //리액트로 가져갈 모든 데이터를 담을 변수
        Map<String,Object> mapData=new HashMap<>();
        //페이징 정보가 담긴 데이터
        mapData.put("pageInfo",pageInfo);
        mapData.put("scheduleList",scheduleList);
        return mapData;


    }

    //예약취소 -> 아예 삭제
    @DeleteMapping("/updateSchStatus/{schNum}")
//    public void updateSchStatus(@PathVariable("schNum")int schNum){
//        scheduleService.updateSchStatus(schNum);
//    }
    public void deleteSch(@PathVariable("schNum")int schNum){
        scheduleService.deleteSch(schNum);
    }

    //예약을 위한  의사/ 진료과 정보
    @GetMapping("/getDocInfo")
    public List<DoctorVO> getDocInfo(){
        return scheduleService.getDocInfo();
    }

    // 예약 실행
    @PostMapping("/schInput")
    public void schInput(@RequestBody ScheduleVO scheduleVO){
        scheduleService.schInput(scheduleVO);
    }

    //예약 유무 확인(진료과와 날짜선택)
    @PostMapping("/checkSchTime")
    public List<ScheduleVO> checkSchTime(@RequestBody ScheduleVO scheduleVO){
        return scheduleService.checkSchtime(scheduleVO);
    }

    //과거 예약 자동 삭제
    @DeleteMapping("/delete")
    public void autoDelete(){
        scheduleService.autoDelete();
    }

}
