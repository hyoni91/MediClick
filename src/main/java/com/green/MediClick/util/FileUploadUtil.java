package com.green.MediClick.util;

import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

//첨부파일과 관련된 기능
public class FileUploadUtil {

    //파일 업로드
    public static Object fileUpload(MultipartFile uploadFile, String type, String docNum, int productNum) {
        // 공통 VO 객체를 반환하기 위한 로직
        if (uploadFile.isEmpty()) {
            return null; // 파일이 없으면 null 반환
        }

        // 업로드 될 경로 설정
        String uploadPath = "D:\\01-STUDY\\dev\\MediClick\\src\\main\\resources\\static\\upload\\";

        // 내가 선택한 원본 파일명
        String originFileName = uploadFile.getOriginalFilename();

        // 첨부될 파일명을 랜덤하게 생성
        String uuid = UUID.randomUUID().toString();

        // 파일 확장자 추출
        int dotIndex = originFileName.lastIndexOf(".");
        String extension = originFileName.substring(dotIndex);

        // 첨부될 파일명 -> 파일명 + 파일 확장자
        String attachedFileName = uuid + extension;

        // 파일 생성 (경로와 첨부된 파일명)
        File file = new File(uploadPath + attachedFileName);

        // 파일을 업로드 경로로 전송
        try {
            uploadFile.transferTo(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 타입에 따라 적절한 VO 객체를 생성 및 반환
        if ("doctor".equals(type)) {
            DoctorImgVO doctorImgVO = new DoctorImgVO();
            doctorImgVO.setOriginFileName(originFileName);
            doctorImgVO.setAttachedFileName(attachedFileName);
            doctorImgVO.setDocNum(docNum);
            return doctorImgVO;
        } else if ("item".equals(type)) {
            ItemImgVO itemImgVO = new ItemImgVO();
            itemImgVO.setOriginFileName(originFileName);
            itemImgVO.setAttachedFileName(attachedFileName);
            itemImgVO.setProductNum(productNum);
            return itemImgVO;
        }

        return null;
    }
}