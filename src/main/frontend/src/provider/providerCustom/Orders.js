import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import './Orders.css'

const Orders = () => {
  const navigate = useNavigate()
  const [orders , setOrders] = useState([])
  const [sumPrice ,setSumPrice] = useState(0)
   //검색
    const [searchValue , setSearchValue] = useState({})

 


  useEffect(()=>{
    axios.post(`/orders/orderlist`,searchValue)
    .then((res)=>{
      console.log(res.data)
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


  },[searchValue])

  function searchOrder(){
    axios.post(`/orders/orderlist`,searchValue)
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
  }



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
            <div className='seachbar'>
                <input 
                  type='text' 
                  placeholder='날짜/현황/거래처명'
                  name='searchValue'
                  onChange={(e)=>{
                    setSearchValue({
                      ...searchValue,
                      [e.target.name] : e.target.value
                    })
                  }}
                />
                <span
                  onClick={()=>{searchOrder()}}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
              </div>              
          {/* </div> */}
          
          <table className='content-table'>
            <thead>
              <tr>
                <td><input type='checkbox'/></td>
                <td>구분</td>
                <td>거래처명</td>
                <td>주문일자</td>
                <td>총 주문액</td>
                <td>주문현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{i+1}</td>
                    <td>
                      <span 
                    onClick={()=>{
                      navigate(`/provider/order_detail/${order.requestNum}`)
                      }}>{order.customerName}
                      </span>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>{order.totalPrice.toLocaleString()}원</td>
                    <td>{order.orderStatus}</td>
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