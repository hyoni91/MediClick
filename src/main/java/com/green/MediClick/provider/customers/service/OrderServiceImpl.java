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
//    @Override
//    public void updateStatus(List<OrdersVO> ordersVO) {
////        List<OrdersVO> deliList=new ArrayList<>();
//        List<OrdersVO> updateList=new ArrayList<>();
//        List<OrdersVO> outList=new ArrayList<>();
//
//        for (OrdersVO or :ordersVO){
//            if (!"배송중".equals(or.getOrderStatus())){
//                updateList.add(or);
//            }
//            else if (or.getQuantity()!=0){
//                outList.add(or);
//            }
//        }
//
//        Map<String,Object> params=new HashMap<>();
//        params.put("updateList",updateList);
//        params.put("outList",outList);
//
//        System.out.println(params);
//
//        sqlSession.update("ordersMapper.updateOrders",params);
//        sqlSession.update("ordersMapper.outgoing", params);
//
//    }

    //수주테이블 배송신청 누르면 '배송중'변경
    @Override
    public void updateOrders(List<OrdersVO> ordersVO) {

        for (OrdersVO orders:ordersVO){
            sqlSession.update("ordersMapper.updateOrders",orders);
        }

    }

    //배송신청시 재고테이블 OUT
    @Override
    public void outgoing(List<OrdersVO> ordersVO) {

        for (OrdersVO orders:ordersVO){
            sqlSession.update("inventoryMapper.outgoing",orders);
        }

    }

    //상세페이지
    @Override
    public List<OrdersVO> detail(String orderDate) {

        return sqlSession.selectList("ordersMapper.orderDetail", orderDate);
    }

    // orderDate값 뽑으려고
    @Override
    public List<OrdersVO> detailOrderDate(SearchVO searchVO) {
        // 먼저 orders 메서드를 호출하여 orderDate 목록을 가져오기
        List<OrdersVO> orderList=orders(searchVO);

        List<OrdersVO> orderDetails= new ArrayList<>();

        for (OrdersVO order:orderList){
            // 각 주문의 orderDate로 detail 메서드를 호출하여 세부 정보 가져오기
            List<OrdersVO> details=detail(order.getOrderDate());
            orderDetails.addAll(details); // 세부 정보를 리스트에 추가
        }

        return orderDetails;
    }


    //해당 제품의 현재고량
    @Override
    public List<Integer> currentStock(int productNum) {
        return sqlSession.selectList("inventoryMapper.currentStock", productNum);
    }

    //배송대기 상태의 제품 수량 합계
    @Override
    public List<Integer> sumQnt(int productNum) {
        return sqlSession.selectList("ordersMapper.sumQnt" , productNum);
    }




}
