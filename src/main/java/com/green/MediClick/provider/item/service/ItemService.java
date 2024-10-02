package com.green.MediClick.provider.item.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import com.green.MediClick.provider.item.vo.ItemVO;
import com.green.MediClick.schedule.vo.PageVO;

import java.util.List;

public interface ItemService {
    //카테고리 리스트
    List<CategoryVO> cateList();

    //카테고리 등록
    void cateInsert(CategoryVO categoryVO);

    void cateDelete(int cateNum);

    void productInsert(ItemVO itemVO);

    //List<ItemVO> medicalSuppliesList(SearchVO searchVO, PageVO pageVO);
    List<ItemVO> medicalSuppliesList(SearchVO searchVO);

    int getItemCount();
    int getNextItemCode();
    int getNextNum();

    void insertItemImg(ItemImgVO imgVO);
}
