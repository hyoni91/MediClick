package com.green.MediClick.orderitems.service;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderItemsService")
public class OrderItemsServiceImpl implements OrderItemsService {
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public List<OrderItemsVO> getAllItems() {
        return sqlSession.selectList("orderItemsMapper.getAllItems");
    }

    @Override
    public void insertGetOrder(OrderRequestVO orderRequestVO) {
        sqlSession.insert("orderItemsMapper.getOrderChecked",orderRequestVO);
    }

    @Override
    public List<OrderRequestVO> getOrderList() {
        return sqlSession.selectList("orderItemsMapper.getOrderList");
    }


}
