package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("orderService")
public class OrderServiceImpl implements OrderService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //수주 리스트
    @Override
    public List<OrdersVO> orders(SearchVO searchVO) {
        return sqlSession.selectList("ordersMapper.orders", searchVO);
    }

    @Override
    public void statusUpdate(int orderNum) {
        sqlSession.update("ordersMapper.statusUpdate", orderNum);
    }

}
