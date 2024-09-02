package com.green.MediClick.medicaldoctor.controller;

import com.green.MediClick.medicaldoctor.service.DoctorService;
import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.util.FileUploadUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
public class DoctorController {
    @Resource(name = "doctorService")
    private DoctorService doctorService;

    // 의사 정보 조회
    @GetMapping("/doctorList")
    public List<DoctorVO> getDoctorList() {
        return doctorService.getDoctorList();
    }

    @GetMapping("/oneDoctor/{docNum}")
    public DoctorVO getOneDoctor(@PathVariable("docNum") String docNum) {
        return doctorService.getOneDoctor(docNum);
    }

    // 다음에 들어갈 이미지 조회한후
    // 상세정보 눌러서 이미지 수정하기
    @PostMapping("/insertDoctorImg/{docNum}")
    public void insertDoctorImg(@RequestBody DoctorVO doctorVO) {
        doctorVO.setDocNum(doctorService.nextDoctorImg());
    }

    // 회원가입 후 의사 정보 조회
    @GetMapping("/selectDoctor/{docNum}")
    public DoctorVO selectDoctor(@PathVariable("docNum") String docNum) {
        return doctorService.selectDoctor(docNum);
    }

    // 회원가입 후 관리자면 의사정보 추가
    @PostMapping("/insertDoctor")

    public void insertDoctor( DoctorVO doctorVO,
                            @RequestParam("docImg") MultipartFile docImg){

        //-------파일 업로드-----------//
        //파일 빈객체로 설정
        DoctorImgVO mainImgVO = null;

        //파일이 들어있을 경우 업로드
        if (docImg != null && docImg.isEmpty()) {
            //메인이 되는 이미지 첨부 후 첨부된 원본 파일명, 첨부된 파일명을 리턴 받음
            mainImgVO = FileUploadUtil.fileUpload(docImg);
        }
        //다음에 들어갈 이미지 번호 조회
        String nextDoctorImg = doctorService.nextDoctorImg();

        //다음에 들억갈 이미지 번호 저장
        doctorVO.setDocNum(nextDoctorImg);

        //의사 정보 등록
        //-----DoctorImgVO 이미지 저장-----//
        if(mainImgVO != null) {
            doctorVO.setImgVO(mainImgVO);
        }
        // 의사 등록
        doctorService.insertDoctor(doctorVO);
    }

    // 관리자 입력상태에서 취소시 삭제
    @GetMapping("/deleteDoctor/{docNum}")
    public void deleteDoctor(@PathVariable ("docNum") String docNum){

        doctorService.deleteDoctor(docNum);
    }
}
