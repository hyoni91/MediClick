package com.green.MediClick.util;

import com.green.MediClick.medicaldoctor.vo.DoctorImgVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

//첨부파일과 관련된 기능
public class FileUploadUtil {

    //파일 업로드
    public static DoctorImgVO fileUpload(MultipartFile uploadFile){
        //원본 파일명 및 첨부된 파일명을 저장하기 위한 객체
        DoctorImgVO doctorImgVO = null;

        //input 태그에 파일을 선택했을 때만 첨부기능 실행
        if (!uploadFile.isEmpty()) {
            //imgVO 객체 생성
            doctorImgVO = new DoctorImgVO();
            //업로드 될 경로
            String uploadPath = "D:\\01-STUDY\\dev\\MediClick\\src\\main\\resources\\static\\upload\\";

            //내가 선택한 원본 파일명
            String originFileName = uploadFile.getOriginalFilename();

            //첨부될 파일명을 랜덤하게 생성
            String uuid = UUID.randomUUID().toString();

            //indexOf : 찾는 문자의 index(위치)
            int dotIndex = originFileName.lastIndexOf("."); //
            String extension = originFileName.substring(dotIndex);

            //첨부될 파일명 ->          파일명 , 파일확장자
            String attachedFileName = uuid + extension;
            //첨부될 파일 생성
            File file = new File(uploadPath + attachedFileName);

            //첨부 기능 실행
            try {
                uploadFile.transferTo(file);

                //첨부된 파일 정보를 imgVO에 저장
                doctorImgVO.setOriginFileName(originFileName);
                doctorImgVO.setAttachedFileName(attachedFileName);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return doctorImgVO;
    }
}
