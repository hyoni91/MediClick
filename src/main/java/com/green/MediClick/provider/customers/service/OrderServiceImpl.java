package com.green.MediClick.provider.customers.service;

import com.green.MediClick.patientchart.vo.SearchVO;
import com.green.MediClick.provider.customers.vo.OrdersVO;
import com.green.MediClick.provider.inventory.vo.InventoryVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


    //배송/수주테이블 '배송중'변경
    @Override
    public void updateStatus(List<OrdersVO> ordersVO) {
//        List<OrdersVO> deliList=new ArrayList<>();
        List<OrdersVO> updateList=new ArrayList<>();
        List<OrdersVO> outList=new ArrayList<>();

        for (OrdersVO or :ordersVO){
            if (!"배송중".equals(or.getOrderStatus())){
                updateList.add(or);
            }
            else if (or.getQuantity()!=0){
                outList.add(or);
            }
//          else if (or.getCustomerAddr()!=null){
//            deliList.add(or);}
        }

        Map<String,Object> params=new HashMap<>();
        params.put("updateList",updateList);
        params.put("outList",outList);
//        params.put("deliList",deliList);

        System.out.println(params);

        sqlSession.update("ordersMapper.updateOrders",params);
        sqlSession.update("ordersMapper.outgoing", params);
//        sqlSession.insert("ordersMapper.deliInsert", params);
    }

    //상세페이지
    @Override
    public List<OrdersVO> detail(String orderDate) {

        return sqlSession.selectList("ordersMapper.orderDetail", orderDate);
    }


    //해당 제품의 현재고량
    @Override
    public int currentStock(int productNum) {
        return sqlSession.selectOne("inventoryMapper.currentStock", productNum);
    }

    //배송대기 상태의 제품 수량 합계
    @Override
    public int sumQnt(int productNum) {
        return sqlSession.selectOne("ordersMapper.sumQnt" , productNum);
    }




}
