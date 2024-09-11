package com.green.MediClick.temp.service;

import com.green.MediClick.temp.vo.TempVO;

import java.util.List;

public interface TempService {

    List<TempVO> selectTempAll();

    // 한시간마다 최신 온도
    List<TempVO> oneHourData();
}
