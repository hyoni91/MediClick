package com.green.MediClick.temp.service;

import com.green.MediClick.temp.vo.TempVO;

import java.awt.image.VolatileImage;
import java.util.List;

public interface TempService {

    List<TempVO> selectTempAll();

    void keepDel();

    // 한시간마다 최신 온도
    List<TempVO> timeAvgDate();

    // 전체온도 데이터(평균)
    List<TempVO> tempListData();
}
