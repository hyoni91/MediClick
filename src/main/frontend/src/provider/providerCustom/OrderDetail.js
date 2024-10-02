import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './OrderDetail.css'

const OrderDetail = () => {
  const navigate = useNavigate();
  const {requestNum} = useParams()
  const [orderDetail, setOrderDetail] = useState([])


  const [deliStatus, setDeliStatus] = useState('배송대기')

  // 배송신청 누르면 배송현황을 배송신청중으로 바꾸기
  // 배송 테이블 생성하면 배송 테이블에 저장하기(db작업)
  function changeStatus(){
    if(window.confirm('배송 신청을 진행하시겠습니까?')){
      setDeliStatus('배송신청중')

    }
    
  }


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
                      <h4>대표자명</h4>
                      <h4>대표번호</h4>
                    </div>
                    <div>
                      <h4>수주일자</h4>
                      {customer.requestDate}
                    </div>
                    <div>
                      <h4>배송현황</h4>
                      {deliStatus}
                    </div>
                    <div>총금액</div>
                    <div>
                      <h4>결제현황</h4>
                      예시 : 결제완료
                      결제현황은 없앨지도..
                      주문은 결제후 완료되는 걸로
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
        <div className='manage-content'>
          {/* <div className='content-btn'>
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
          </div> */}
          
          <table className='content-table'>
            <thead>
              <tr>
                <td>주문날짜</td>
                <td>거래처명</td>
                <td>아이템</td>
                <td>수량</td>
                <td>금액</td>
                <td>총금액</td>
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
                      <td>{detail.requestStatus}</td>
                    </tr>
                    
                  )
                })
              }
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