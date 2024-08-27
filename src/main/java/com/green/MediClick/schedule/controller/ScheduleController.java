package com.green.MediClick.schedule.controller;

import com.green.MediClick.schedule.service.ScheduleService;
import com.green.MediClick.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

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



}
