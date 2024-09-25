package com.green.MediClick.provider.item.service;

import com.green.MediClick.provider.item.vo.CategoryVO;

import java.util.List;

public interface ItemService {
    //카테고리 리스트
    List<CategoryVO> cateList();

    //카테고리 등록
    void cateInsert(CategoryVO categoryVO);
}
