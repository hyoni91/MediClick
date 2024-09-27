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

    //상품 목록 + 검색기능
    @Override
    public List<OrderItemsVO> getAllItems(SearchVO searchVO) {
        return sqlSession.selectList("orderItemsMapper.getAllItems",searchVO);
    }

    //주문 : 개별주문,선택주문
    @Override
    public void insertGetOrder(OrderRequestVO orderRequestVO) {
        // SQL 쿼리에 직접 orderDatas를 전달
//        Map<String,Object> params = new HashMap<>();
//        params.put("orderDatas",orderRequestVO);

        sqlSession.insert("orderItemsMapper.getOrderChecked",orderRequestVO);
    }

    //주문 내역
    @Override
    public List<OrderRequestVO> getOrderList() {
        return sqlSession.selectList("orderItemsMapper.getOrderList");
    }

    //주문 삭제
    @Override
    public void delOrder(int requestNum) {
        sqlSession.delete("orderItemsMapper.delOrder",requestNum);
    }


}
