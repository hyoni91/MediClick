package com.green.MediClick.schedule.vo;

import lombok.Data;

@Data
public class ScheduleVO {
    private int schNum;
    private int docNum;
    private int memNum;
    private String regDate;
    private String schDate;
    private String detail;
    private String schStatus;
}
