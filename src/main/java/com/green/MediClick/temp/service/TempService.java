package com.green.MediClick.temp.service;

import com.green.MediClick.temp.vo.TempVO;

import java.awt.image.VolatileImage;
import java.util.List;

public interface TempService {

    List<TempVO> selectTempAll();

    void keepDel();

}
