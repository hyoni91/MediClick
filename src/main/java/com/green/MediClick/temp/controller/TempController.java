package com.green.MediClick.temp.controller;

import com.green.MediClick.temp.service.TempService;
import com.green.MediClick.temp.vo.TempVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/temp")
public class TempController {
    @Resource(name="tempService")
    private TempService tempService;

    //현재 온도 조회
    @GetMapping("/nowTemps")
    public List<TempVO> selectTempAll(){
        return tempService.selectTempAll();
    }

    @GetMapping("/oneHourData")
    public List<TempVO> oneHourData(){
        return tempService.oneHourData();
    }

}
