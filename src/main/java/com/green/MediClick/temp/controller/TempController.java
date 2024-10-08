package com.green.MediClick.temp.controller;

import com.green.MediClick.temp.service.TempService;
import com.green.MediClick.temp.vo.TempVO;
import jakarta.annotation.Resource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@EnableScheduling
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

    //12시간 전 데이터 자동 삭제
    @Scheduled(fixedRate = 43200000)
    public void keepDel() {
        System.out.println("12시간 전 데이터 삭제 중");
        tempService.keepDel();
    }

    // 10분간격 온도 평균 데이터
    @GetMapping("/timeAvgDate")
    public List<TempVO> timeAvgDate(){
        System.out.println(tempService.timeAvgDate());
        return tempService.timeAvgDate();
    }

    // 온도데이터 (평균 온도)
    @GetMapping("/tempListData")
    public List<TempVO> tempListData(){
        return tempService.tempListData();
    }

}
