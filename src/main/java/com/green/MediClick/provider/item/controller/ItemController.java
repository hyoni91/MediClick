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

    @PostMapping("/productInsert")
    public void insertItem(ItemVO itemVO,
                           @RequestParam("mainImg") MultipartFile mainImg) {
        if (mainImg == null || mainImg.isEmpty()) {
            throw new IllegalArgumentException("File 'mainImg' is required."); // 사용자 정의 예외 처리
        }
        System.out.println(itemVO);
        int nextNum = itemService.getNextNum();
        itemVO.setProductNum(nextNum);
        // 아이템 정보 등록
        itemService.productInsert(itemVO);
        // 파일 빈 객체 설정
        ItemImgVO itemImgVO = null;

        // 파일이 들어있을 경우 업로드
        if (mainImg != null && !mainImg.isEmpty()) {
            int nextItemCode = itemService.getNextItemCode();

            itemImgVO = (ItemImgVO) FileUploadUtil.fileUpload(mainImg, "item", null, nextNum);

            itemImgVO.setImgCode(nextItemCode);
        }

        if (itemImgVO != null) {
            // 아이템 이미지 정보 저장
            itemService.insertItemImg(itemImgVO);
        }

    }
    @GetMapping("/medicalSuppliesList")
    public List<ItemVO> medicalSuppliesList(){
        return itemService.medicalSuppliesList();
    }


}

