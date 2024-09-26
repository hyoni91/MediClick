import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderList = () => {
  const navigate = useNavigate()


  // 주문 리스트
  const [orderList,setOrderList]=useState([])


  useEffect(()=>{

    // 주문 내역
    axios
    .get('/orderItems/orderList')
    .then((res)=>{
      setOrderList(res.data)
    })
    .catch((error)=>{console.log(error)})

  },[])


  return (


    <div className='orderList-div'>

        {/* 사이드바 */}
        <div className='order-sidebar'>
        <ul>
          <li><span className='getBold' 
          onClick={(e)=>{navigate('/admin/order');}}>
            <i className="bi bi-caret-right-fill"></i>
            <span> 상품 주문</span>
            </span></li>
          <li><span className='getBold' 
          onClick={(e)=>{(navigate('/admin/orderList'));}}>
            <i className="bi bi-caret-right-fill"></i>
            <span> 주문 내역</span>
            </span></li>
        </ul>
      </div>


      <div className='order-main'>
        <h3>주문 내역</h3>
        {/* 품목 리스트 */}
        <div className='itemList-div'>
          <table className='itemList-table'>
            <colgroup>
              {/* 주문번호 */}
              <col width={'8%'}/> 
              {/* 발주일 */}
              <col width={'10%'}/>
              {/* 카테 */}
              <col width={'10%'}/> 
              {/* 품목코드 */}
              <col width={'7%'}/> 
              {/* 품목명 */}
              <col width={'20%'}/>
              {/* 설명 */}
              <col width={'16%'}/>
              {/* 수량 */}
              <col width={'5%'}/>
              {/* 단가 */}
              <col width={'10%'}/>
              {/* 총 금액 */}
              <col width={'10%'}/>
              {/* 현황 */}
              <col width={'7%'}/>
            </colgroup>
  
            <thead>
              <tr>
                <td>주문번호</td>
                <td>발주일</td>
                <td>카테고리</td>
                <td>품목코드</td>
                <td>품목명</td>
                <td>설명</td>
                <td>수량</td>
                <td>단가</td>
                <td>총 금액</td>
                <td>현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orderList.map((order,i)=>{
                  return(
                    <tr key={i}>
                      <td>{order.requestNum}</td>
                      <td>{order.requestDate}</td>
                      <td>{order.orderItemsVO.cateVO.cateName}</td>
                      <td>{order.productNum}</td>
                      <td>{order.orderItemsVO.productName}</td>
                      <td>{order.orderItemsVO.detail}</td>
                      <td><span className='eachNum'>{order.quantity}</span> 개</td>
                      <td><span>{order.orderItemsVO.productPrice.toLocaleString()}</span> 원</td>
                      <td><span className='priceNum'>{((order.quantity)*(order.orderItemsVO.productPrice)).toLocaleString()}</span> 원</td>
                      <td>
                        {
                          order.requestStatus=='Pending'?
                          '접수'
                          :
                          '배송 중'
                        }
                        </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>


    </div>

  )
}

export default OrderList