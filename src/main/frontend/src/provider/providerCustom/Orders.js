import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import './Orders.css'
import CheckStock from './CheckStock'

const Orders = () => {
  const navigate = useNavigate()
  const [orders , setOrders] = useState([])
  //총 주문액
  const [sumPrice ,setSumPrice] = useState(0)
  //총 매출액(수주완료건)
  const [orderPrice, setOrderPrice] = useState(0)

  //검색
  const [searchValue , setSearchValue] = useState({})

  //체크박스 설정
  const [chks, setChks] = useState([])
  const [chkAll, setChkAll] = useState(false)

  //체크박스 함수 
  const handleCheckAll = () => {
    const newChks = chks.map(() => !chkAll);
    setChks(newChks);
    setChkAll(!chkAll);
  };

  //완료 항목 보기
  const [isShow, setIsShow] = useState(false)

  const handleCheck = (index) => {
    //불변성유지를 위해 배열 복사
    const newChks = [...chks];
    // 특정 인덱스의 상태 변환 후 chks상태 업데이트
    newChks[index] = !newChks[index];
    setChks(newChks);
    //newChks.every(chk => chk)는 배열의 모든 요소가 true일 때만 true를 반환
    setChkAll(newChks.every(chk => chk)); 

  };


  useEffect(()=>{
    axios.post(`/orders/orderlist`,searchValue)
    .then((res)=>{
      setOrders(res.data)
      let sum = 0;
      let orderSum = 0;
      res.data.forEach((p,i)=>{
        sum = sum +p.totalPrice
        if(p.orderStatus == '배송완료'){
          orderSum = orderSum + p.totalPrice
        }
      })
      
      setSumPrice(sum)
      setOrderPrice(orderSum)

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
      let orderSum = 0;
      res.data.forEach((p,i)=>{
        sum = sum +p.totalPrice
        console.log(p.orderStatus)
        if(p.orderStatus == '배송완료'){
          console.log(p.orderStatus)
          orderSum = orderSum + p.totalPrice
        }
      })
      
      setSumPrice(sum)
      setOrderPrice(orderSum)
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
              <h4>총 주문액</h4>
              <h2>{sumPrice.toLocaleString()}원</h2>
            </div>
            <div>
              <h4>총 매출액</h4>
              <h2>{orderPrice.toLocaleString()}원</h2>
            </div>
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
              <div className='show-btn-div'>
                <button 
                className='show-btn'
                type='button' 
                onClick={()=>{
                setIsShow(!isShow)
                }}> 
                배송 완료 목록 
              </button>
              </div>
              </div>              
          {/* </div> */}
          <table className='content-table'>
            <colgroup>
              <col width={'5%'}/>
              <col width={'20%'}/>
              <col width={'20%'}/>
              <col width={'20%'}/>
              <col width={'20%'}/>
              <col width={'*'}/>
            </colgroup>
            <thead>
              <tr>
                <td>구분</td>
                <td>거래처명</td>
                <td>주문일자</td>
                <td>주문액</td>
                <td>수주현황</td>
                <td>재고확인</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                    order.orderStatus != '배송완료' ?
                  <tr key={i}>
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
                    <td>
                      {
                      <>{order.orderStatus}</>
                      }
                      </td>
                    <td>
                      <CheckStock 
                      productNum = {order.productNum} orderSatus={order.orderStatus}/> 
                    </td>
                  </tr>
                    :
                  <></>
                  )
                })
              }
                
            </tbody>
          </table>
          <div>
              {
                isShow? 
                <div className='manage-footer'>
                  <h3>배송 완료 목록</h3>
                  <table className='content-table'>
                  <colgroup>
                    <col width={'5%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'*'}/>
                  </colgroup>
                    <thead>
                      <tr>
                        <td>구분</td>
                        <td>거래처명</td>
                        <td>주문일자</td>
                        <td>주문액</td>
                        <td>수주현황</td>
                        <td>비고</td>
                      </tr>
                    </thead>
                    {
                      orders.map((e,i)=>{
                        return(
                          e.orderStatus == '배송완료'?
                          <tr key={i}>
                            <td>{i+1}</td>
                            <td> 
                              <span 
                                onClick={()=>{
                                  navigate(`/provider/order_detail/${e.requestNum}`)
                                  }}>{e.customerName}
                              </span>
                            </td>
                            <td>{e.orderDate}</td>
                            <td>{e.totalPrice.toLocaleString()}원</td>
                            <td>{e.orderStatus}</td>
                            <td>완료</td>
                          </tr>
                          :
                        <></>
                        )

                      })
                    }
                    </table>
                  </div>
                
                :null
              } 
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Orders