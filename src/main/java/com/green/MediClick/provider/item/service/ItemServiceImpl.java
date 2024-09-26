package com.green.MediClick.provider.item.service;

import com.green.MediClick.provider.item.vo.CategoryVO;
import com.green.MediClick.provider.item.vo.ItemImgVO;
import com.green.MediClick.provider.item.vo.ItemVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Override
    public List<ItemVO> medicalSuppliesList() {
        return sqlSession.selectList("itemMapper.medicalSuppliesList");
    }

    @Override
    public int getNextItemCode(int itemCode) {
        return sqlSession.selectOne("itemMapper.getNextItemCode",itemCode);
    }

    @Override
    public int getNextNum(int itemCode) {
        return sqlSession.selectOne("itemMapper.getNextNum",itemCode);
    }


    @Override
    public void insertItemImg(ItemImgVO imgVO) {
        sqlSession.insert("itemMapper.insertItemImg",imgVO);
    }
}
