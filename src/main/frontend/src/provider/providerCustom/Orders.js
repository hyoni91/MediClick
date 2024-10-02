import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  // 총액 구하기
  const [sumPrice, setSumPrice] = useState(0)

  //현황 css 
  const statusTag = useRef([]);

  const whatStatus = (order) =>{
        if(order.requestStatus == 'Pending'){
        statusTag.current.className = `status pending`
        return <>접수중</>
        }else if(order.requestStatus == 'Completed'){
          statusTag.current.className = `status completed`
          return <>처리완료</>
        } else if(order.requestStatus == 'Failed'){
          statusTag.current.className = `status failed`
          return <>접수취소</>
        }
    
  }


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
                <td>결제현황</td>
                <td>주문현황</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{orders.length - i}</td>
                    <td>
                      <span onClick={()=>{navigate(`/provider/order_detail/${order.requestNum}`)}}>
                        {order.customerName}
                      </span>
                    </td>
                    <td>{order.requestDate}</td>
                    <td>{order.totalPrice.toLocaleString()}원</td>
                    <td>{order.totalPrice.toLocaleString()}원</td>
                    <td>
                      <span  
                        className='status'
                        ref={statusTag}
                      >
                        {whatStatus(order)}
                        {/* {order.requestStatus == 'Pending'? <>접수완료</> : <></>} */}
                      </span>
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

export default Orders