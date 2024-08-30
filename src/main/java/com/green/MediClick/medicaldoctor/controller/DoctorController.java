package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.DoctorService;
import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class DoctorController {
    @Resource(name = "doctorService")
    private DoctorService doctorService;

    // 의사 정보 조회
    @GetMapping("/doctorList")
    public List<DoctorVO> getDoctorList(){
        return doctorService.getDoctorList();
    }

    @GetMapping("/oneDoctor/{docNum}")
    public DoctorVO getOneDoctor(@PathVariable("docNum")int docNum){
        return doctorService.getOneDoctor(docNum);
    }

    // 다음에 들어갈 이미지 조회한후
    // 상세정보 눌러서 이미지 수정하기
    @PostMapping("/insertDoctorImg/{docNum}")
    public void insertDoctorImg(@RequestBody DoctorVO doctorVO){
        doctorVO.setDocNum(doctorService.nextDoctorImg());
    }

    // 회원가입 후 의사 정보 조회
    @GetMapping("/selectDoctor/{docNum}")
    public DoctorVO selectDoctor(@PathVariable("docNum") String docNum){
        return doctorService.selectDoctor(docNum);
    }

    // 회원가입 후 관리자면 의사정보 추가
    @PostMapping("/insertDoctor")
    public void insertDoctor(@RequestBody DoctorVO doctorVO){
        doctorService.insertDoctor(doctorVO);
    }

    // 관리자 입력상태에서 취소시 삭제
    @GetMapping("/deleteDoctor/{docNum")
    public void deleteDoctor(@PathVariable ("docNum") String docNum){
        doctorService.deleteDoctor(docNum);
    }


}
