package com.green.MediClick.orderitems.service;

import com.green.MediClick.orderitems.vo.OrderItemsVO;
import com.green.MediClick.orderitems.vo.OrderRequestVO;
import com.green.MediClick.orderitems.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("orderItemsService")
public class OrderItemsServiceImpl implements OrderItemsService {
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public List<OrderItemsVO> getAllItems(SearchVO searchVO) {
        return sqlSession.selectList("orderItemsMapper.getAllItems");
    }

    @Override
    public void insertGetOrder(List<Map<String, Object>> orderDatas) {
        // SQL 쿼리에 직접 orderDatas를 전달
        Map<String,Object> params = new HashMap<>();
        params.put("orderDatas",orderDatas);

        sqlSession.insert("orderItemsMapper.getOrderChecked",params);
    }

    @Override
    public List<OrderRequestVO> getOrderList() {
        return sqlSession.selectList("orderItemsMapper.getOrderList");
    }


}
