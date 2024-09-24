package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.CustomersVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("customerService")
public class CustomerServiceImpl implements CustomerServise{

    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public List<CustomersVO> customerList(SearchVO searchVO) {
        return sqlSession.selectList("customerMapper.customers", searchVO);

    }

    @Override
    public void addCustomer(CustomersVO customersVO) {
        sqlSession.insert("customerMapper.addCustomer", customersVO);
    }
}
