package com.green.MediClick.schedule.controller;

import com.green.MediClick.schedule.service.ScheduleService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scedule")
public class ScheduleController {
    @Resource(name = "scheduleService")
    private ScheduleService scheduleService;
}
