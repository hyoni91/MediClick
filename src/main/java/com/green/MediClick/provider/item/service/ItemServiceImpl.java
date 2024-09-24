package com.green.MediClick.provider.item.service;

import com.green.MediClick.provider.item.vo.CategoryVO;
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
}
