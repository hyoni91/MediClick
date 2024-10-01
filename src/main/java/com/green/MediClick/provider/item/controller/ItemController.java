package com.green.MediClick.provider.item.controller;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.item.service.ItemService;
import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import com.green.MediClick.provider.item.vo.ItemVO;
import com.green.MediClick.schedule.vo.PageVO;
import com.green.MediClick.util.FileUploadUtil;
import jakarta.annotation.Resource;
import org.apache.ibatis.session.SqlSession;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @PostMapping("/medicalSuppliesList")
    public  List<ItemVO> medicalSuppliesList(@RequestBody Map<String, Object> mapData) {
        System.out.println(mapData);

        SearchVO searchVO = new SearchVO();
        searchVO.setSearchType(mapData.get("searchType").toString());
        searchVO.setSearchValue(mapData.get("searchValue").toString());



        // map이 null인지 확인
//        if (map == null) {
//            throw new IllegalArgumentException("Request body is required.");
//        }
//
//        SearchVO searchVO = (SearchVO) map.get("searchVO");
//        PageVO pageVO = (PageVO) map.get("pageVO");
//
//        System.out.println("SearchVO: " + searchVO);
//        System.out.println("PageVO: " + pageVO);
//        System.out.println();

        // 검색 결과 조회
        //List<ItemVO> items = itemService.medicalSuppliesList(searchVO, pageVO);
        List<ItemVO> items = itemService.medicalSuppliesList(searchVO);

        // 전체 아이템 수 조회
        //int totalCount = itemService.getItemCount();

        // 결과를 Map에 담아 반환
        //Map<String, Object> response = new HashMap<>();
        //response.put("items", items);
        //response.put("totalCount", totalCount);

        return items;
    }


}

