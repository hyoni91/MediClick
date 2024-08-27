package com.green.MediClick.schedule.controller;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.schedule.service.ScheduleService;
import com.green.MediClick.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;

    //의사별 담당환자 리스트
    @GetMapping("/getDocMemList/{docNum}")
    public List<ScheduleVO> getDocMemList(@PathVariable("docNum")int docNum){
        return scheduleService.getDocMem(docNum);
    }

    //예약상태 취소버튼을 누르면 예약상태를 Y > N로 변경
    @PutMapping("/updateSchStatus/{schNum}")
    public void updateSchStatus(@PathVariable("schNum")int schNum){
        scheduleService.updateSchStatus(schNum);
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

    // 예약 유무 확인
    @PostMapping("/checkAppo")
    public ScheduleVO checkAppo(@RequestBody ScheduleVO scheduleVO){
        return scheduleService.checkAppo(scheduleVO);
    }

}
