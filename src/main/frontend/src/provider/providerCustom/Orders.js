import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const customerNum = 1
  // 총액 구하기
  const [sumPrice, setSumPrice] = useState(0)





  useEffect(()=>{
    axios.get(`/customer/orderlist`)
    .then((res)=>{
      setOrders(res.data)
      let sum = 0;
      res.data.forEach((p,i)=>{
        sum = sum +p.totalPrice
      })
      setSumPrice(sum)

    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  console.log(orders)


  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 / 납품현황</h3>
          </div>
          <div className='manage-sales'>
            <div>
              <h4>총 매출액</h4>
              <h2>{sumPrice.toLocaleString()}원</h2>
            </div>
            <div>총미수금</div>
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
                <td>구분</td>
                <td>거래처명</td>
                <td>주문일자</td>
                <td>총 주문액</td>
                <td>현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{orders.length - i}</td>
                    <td>{order.customerName}</td>
                    <td>{order.requestDate}</td>
                    <td>{order.totalPrice.toLocaleString()}원</td>
                    <td>{order.requestStatus == 'Pending'? <>접수완료</> : <></>}</td>
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