package com.green.MediClick.schedule.service;

import com.green.MediClick.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {

    List<ScheduleVO> getDocMem(int docNum);

    void updateSchStatus(int schNum);

}
