package com.green.MediClick.provider.delivery.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("deliveryService")
public class DeliveryServiceImpl implements DeliveryService{
    @Autowired
    SqlSessionTemplate sqlSession;

}
