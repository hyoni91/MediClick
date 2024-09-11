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

    //24시간 전 데이터 자동 삭제
    @Scheduled(fixedRate = 3600000) //1시간마다 자동 실행
    public void keepDel(){
        System.out.println("2시간 전 데이터 삭제 중");
        tempService.keepDel();
    }

}
