package com.green.MediClick.provider.item.controller;

import com.green.MediClick.provider.item.service.ItemService;
import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import com.green.MediClick.provider.item.vo.ItemVO;
import com.green.MediClick.util.FileUploadUtil;
import jakarta.annotation.Resource;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Resource(name = "itemService")
    ItemService itemService;

    @GetMapping("/cateList")
    public List<CategoryVO> cateList(){
        return itemService.cateList();
    }

    @PostMapping("/cateInsert")
    public void cateInsert(@RequestBody CategoryVO categoryVO){
        itemService.cateInsert(categoryVO);
    }

    @GetMapping("/cateDelete/{cateNum}")
    public void cateDelete(@PathVariable("cateNum") int cateNum){
        itemService.cateDelete(cateNum);
    }

//    @PostMapping("/productInsert")
//    public void productInsert(@RequestBody ItemVO itemVO){
//        itemService.productInsert(itemVO);
//    }
    @PostMapping("/productInsert")
    public void insertItem(ItemVO itemVO,
                           @RequestParam("mainImg") MultipartFile mainImg) {
        if (mainImg == null || mainImg.isEmpty()) {
            throw new IllegalArgumentException("File 'mainImg' is required."); // 사용자 정의 예외 처리
        }
        System.out.println(itemVO);
        // 파일 빈 객체 설정
        ItemImgVO itemImgVO = null;
//        itemService.getNextNum();
        // 파일이 들어있을 경우 업로드
        if (mainImg != null && !mainImg.isEmpty()) {
            itemImgVO = (ItemImgVO) FileUploadUtil.fileUpload(mainImg, "item", null, itemVO.getProductNum());
        }

        // 아이템 정보 등록
        if (itemImgVO != null) {
            itemVO.setImgVO(itemImgVO);
        }
        itemService.productInsert(itemVO);

        System.out.println(itemVO.getProductNum());
        // 아이템 이미지 정보 저장
        itemImgVO.setProductNum(itemVO.getProductNum());
        itemService.insertItemImg(itemImgVO);

    }
    @GetMapping("/medicalSuppliesList")
    public List<ItemVO> medicalSuppliesList(){
        return itemService.medicalSuppliesList();
    }


}

