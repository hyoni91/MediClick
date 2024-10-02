package com.green.MediClick.provider.inventory.service;

import com.green.MediClick.provider.inventory.vo.InventoryVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("inventoryService")
public class InventoryServiceImpl implements InventoryService{
    @Autowired
    SqlSession sqlSession;
}
