import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './OrderDetail.css'

const OrderDetail = () => {
  const navigate = useNavigate();
  const {requestNum} = useParams()
  const [orderDetail, setOrderDetail] = useState({
    customerAddr:'',
    customerOwner : '',
    customerTel : '',
    customerName:'',
    orderDate: '',
    orderNum:'' ,
    quantity:0,   
    productName : '',
    productPrice :0,
    orderStatus:''
  })

  const [deliStatus, setDeliStatus] = useState('배송대기')

  // 배송신청 누르면 배송현황을 배송신청중으로 바꾸기
  // 배송 테이블 생성하면 배송 테이블에 저장하기(db작업)
  function changeStatus(orderNum){
    if(window.confirm('배송 신청을 진행하시겠습니까?')){
      axios.put(`/orders/deli-orders-statusUpdate/${orderNum}`)
      .then((res)=>{
      })
      .catch((error)=>{
        console.log(error)
        alert('error!')
      })
    }
  }

  //상세정보 
  useEffect(()=>{
    axios.get(`/orders/ordersDetail/${requestNum}`)
    .then((res)=>{
      const detail ={
        customerAddr:res.data.customer.customerAddr,
        customerOwner : res.data.customer.customerOwner,
        customerTel : res.data.customer.customerTel,
        customerName:res.data.customerName,
        orderDate: res.data.orderDate,
        orderNum:res.data.orderNum ,
        quantity:res.data.orderRequest.quantity,   
        productName : res.data.orderRequest.orderItemsVO.productName,
        productPrice : res.data.orderRequest.orderItemsVO.productPrice,
        orderStatus:res.data.orderStatus
      }
      setOrderDetail(detail)
    })
    .catch((error)=>{
      alert('error!!')
      console.log(error)
    })
  },[])

  console.log(orderDetail)


  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 상세 정보</h3>
          </div>
          <div className='detail-header'>
            <div>
              <h3>거래처정보</h3>
              <h4>{orderDetail.customerName}</h4>
              <h4>{orderDetail.customerOwner}</h4>
            </div>
            <div>
              <h3>배송정보</h3>
              <h4>{orderDetail.customerTel}</h4>
              <h4>{orderDetail.customerAddr}</h4>              
            </div>
            <div>
              <h3>수주현황</h3>
              <h4>{orderDetail.orderStatus}</h4>
            </div>
            <div>
              <h3>총금액</h3>
              <h4>{(orderDetail.productPrice * orderDetail.quantity).toLocaleString()}원</h4>
            </div>
            
          </div>
        </div>
        <div className='manage-content'>
          <table className='content-table'>
            <thead>
              <tr>
                <td>주문날짜</td>
                <td>거래처명</td>
                <td>아이템</td>
                <td>수량</td>
                <td>금액</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderDetail.orderDate}</td>
                <td>{orderDetail.customerName}</td>
                <td>{orderDetail.productName}</td>
                <td>{orderDetail.quantity}</td>
                <td>{orderDetail.productPrice.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='orderDetail-btn'> 
          <button type='button' onClick={()=>{navigate('/provider/orders')}}>뒤로가기</button>
          <button type='button' onClick={()=>{changeStatus()}}>배송신청</button>
        </div>
      </div>
        

    </div>
  )
}

export default OrderDetail