package com.green.MediClick.provider.delivery.service;

import com.green.MediClick.member.vo.MemberVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.delivery.vo.DeliveryVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("deliveryService")
public class DeliveryServiceImpl implements DeliveryService{
    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public DeliveryVO deliveryList(String deliveryDriverName) {
        return sqlSession.selectOne("deliveryMapper.deliveryList",deliveryDriverName);
    }

    @Override
    public List<OrdersVO> ordersList() {
        return sqlSession.selectList("deliveryMapper.ordersList");
    }

    @Override
    public void insertDriver(MemberVO memberVO) {
        sqlSession.insert("deliveryMapper.insertDriver",memberVO);
    }

    @Override
    public int selectOrderNum(int deliveryNum) {
        DeliveryVO deliveryVO = sqlSession.selectOne("deliveryMapper.orderNum", deliveryNum);
        return deliveryVO != null ? deliveryVO.getDeliveryNum() : -1;
    }

    @Override
    public void insertDd(DeliveryVO deliveryVO) {
        sqlSession.insert("deliveryMapper.insertDd",deliveryVO);
    }

    @Override
    public void updateDriver(DeliveryVO deliveryVO) {
        DeliveryVO vo = sqlSession.selectOne("deliveryMapper.orderNum",deliveryVO.getDeliveryNum());
        sqlSession.update("deliveryMapper.updateDriver",deliveryVO);
    }

    @Override
    public void sameUpdate(DeliveryVO deliveryVO) {
        sqlSession.update("deliveryMapper.sameUpdate", deliveryVO);
    }

    @Override
    public void endDriver(int deliveryNum) {
        sqlSession.update("deliveryMapper.endDriver",deliveryNum);
    }

    @Override
    public void endSameUpdate(int deliveryNum) {
        sqlSession.update("deliveryMapper.endSameUpdate", deliveryNum);
    }

}
