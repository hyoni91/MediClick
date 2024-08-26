package com.green.MediClick.schedule.controller;

import com.green.MediClick.schedule.service.ScheduleService;
import com.green.MediClick.schedule.vo.ScheduleVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
