import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const customerNum = 1

  useEffect(()=>{
    axios.get(`/customer/orders/${customerNum}`)
    .then((res)=>{
      setOrders(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 / 납품현황</h3>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>거래처명</td>
                    <td></td>
                    <td>대표자명</td>
                    <td></td>
                    <td>사업자번호</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>주소</td>
                    <td></td>
                    <td>전화번호</td>
                    <td></td>
                    <td>메일주소</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='manage-sales'>
            <div>해당 거래처의 매출액</div>
            <div>해당 거래처의 미수금</div>
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
                <td><input type='checkbox'/></td>
                <td>주문일자</td>
                <td>품목명</td>
                <td>수량</td>
                <td>금액</td>
                <td>부가세</td>
                <td>합계</td>
                <td>배송현황</td>
                <td>결제현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{order.requestDate}</td>
                    <td>{order.orderItemsVO.productName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.orderItemsVO.productPrice}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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

export default Orders