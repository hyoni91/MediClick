import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './OrderDetail.css'

const OrderDetail = () => {
  const {requestNum} = useParams()
  console.log(requestNum)

  

  const [orderDetail, setOrderDetail] = useState([])

  useEffect(()=>{
    axios.get(`/customer/orders/${requestNum}`)
    .then((res)=>{
      setOrderDetail(res.data)
      console.log(res.data)
    })
    .catch((error)=>{
      alert('error!!')
      console.log(error)
    })
  },[])



  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 상세 정보</h3>
          </div>
          <div className='detail-header'>
            {
              orderDetail.map((customer,i)=>{
                return(
                  <>
                    <div>
                      <h4>거래처명</h4>
                      {customer.customerName}
                    </div>
                    <div>
                      <h4>수주일자</h4>
                      {customer.requestDate}
                    </div>
                    <div>배송현황</div>
                    <div>총금액</div>
                    <div>결제방식</div>
                  </>
                )
              })
            }
          </div>
        </div>
        <div className='manage-content'>
          <div className='content-btn'>
            <button>버튼</button>  
            <button>버튼</button>  
            <div className='seachbar'>
                <input 
                  type='text' 
                  placeholder='주문일자'
                />
                <span
                  onClick={()=>{}}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
              </div>              
          </div>
          
          <table className='content-table'>
            <thead>
              <tr>
                <td>주문날짜</td>
                <td>거래처명</td>
                <td>아이템</td>
                <td>수량</td>
                <td>금액</td>
                <td>총금액</td>
                <td>결제금액</td>
                <td>결제방식</td>
                <td>주문현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orderDetail.map((detail,i)=>{
                  return(
                    <tr key={i}>
                      <td>{detail.requestDate}</td>
                      <td>{detail.customerName}</td>
                      <td>{detail.orderItemsVO.productName}</td>
                      <td>{detail.quantity}</td>
                      <td>{detail.orderItemsVO.productPrice}</td>
                      <td>{(
                        detail.orderItemsVO.productPrice * 
                        detail.quantity).toLocaleString()}원
                      </td>
                      <td>{(
                        detail.orderItemsVO.productPrice * 
                        detail.quantity).toLocaleString()}원
                      </td>
                      <td>계좌이체</td>
                      <td>{detail.requestStatus}</td>
                    </tr>
                    
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className='orderDetail-btn'> 
          <button>뒤로가기</button>
        </div>
      </div>
        

    </div>
  )
}

export default OrderDetail