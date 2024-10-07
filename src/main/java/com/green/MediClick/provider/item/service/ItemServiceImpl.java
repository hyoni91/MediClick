package com.green.MediClick.provider.item.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import com.green.MediClick.provider.item.vo.ItemListData;
import com.green.MediClick.provider.item.vo.ItemVO;
import com.green.MediClick.schedule.vo.PageVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("itemService")
public class ItemServiceImpl implements ItemService{
    @Autowired
    SqlSession sqlSession;

    @Override
    public List<CategoryVO> cateList() {
        return sqlSession.selectList("itemMapper.cateList");
    }

    @Override
    public void cateInsert(CategoryVO categoryVO) {
        sqlSession.insert("itemMapper.cateInsert",categoryVO);
    }

    @Override
    public void cateDelete(int cateNum) {
        sqlSession.delete("itemMapper.cateDelete",cateNum);
    }

    @Override
    public void productInsert(ItemVO itemVO) {
        sqlSession.insert("itemMapper.productInsert",itemVO);
    }

//    @Override
//    public List<ItemVO> medicalSuppliesList(SearchVO searchVO, PageVO pageVO) {
//        Map<String ,Object> map = new HashMap<>();
//        map.put("searchVO",searchVO);
//        map.put("pageVO",pageVO);
//        return sqlSession.selectList("itemMapper.medicalSuppliesList",map);
//    }
    @Override
    public List<ItemVO> medicalSuppliesList(ItemListData itemListData) {
        return sqlSession.selectList("itemMapper.medicalSuppliesList", itemListData);
    }

    @Override
    public int getItemCount(ItemListData itemListData) {
        return sqlSession.selectOne("itemMapper.itemListCount", itemListData);
    }

    @Override
    public int getNextItemCode() {
        return sqlSession.selectOne("itemMapper.getNextItemCode");
    }

    @Override
    public int getNextNum() {
        return sqlSession.selectOne("itemMapper.getNextNum");
    }


    @Override
    public void insertItemImg(ItemImgVO imgVO) {
        sqlSession.insert("itemMapper.insertItemImg",imgVO);
    }

    @Override
    public List<ItemVO> inventoriesList(ItemVO itemVO) {
        return sqlSession.selectList("itemMapper.inventoriesList", itemVO);
    }
}
