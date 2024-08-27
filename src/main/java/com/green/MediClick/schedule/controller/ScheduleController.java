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

    @GetMapping("/getDocMemList/{docNum}")
    public List<ScheduleVO> getDocMemList(@PathVariable("docNum")int docNum){
        return scheduleService.getDocMem(docNum);
    }

    // 예약상태를 Y>N로 바꿔야함
    @PutMapping("/updateSchStatus")
    public void updateSchStatus(@PathVariable("schNum")int schNum){
        scheduleService.updateSchStatus(schNum);
    }

}
