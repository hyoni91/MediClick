package com.green.MediClick.temp.vo;

import lombok.Data;

@Data
public class TempVO {
    private int tempNum;
    private double currentTemp;
    private String tempTime;
    private String timeDate; // 10분간격
    private double avgTemp; // 10분간격 평균

}
