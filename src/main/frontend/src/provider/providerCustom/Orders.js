import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import './Orders.css'
import CheckStock from './CheckStock'

const Orders = () => {
  const navigate = useNavigate()
  const [orders , setOrders] = useState([])
  const [sumPrice ,setSumPrice] = useState(0)

  //아이템 물량 확인
  const [product , setProduct] = useState([])

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

  const handleCheck = (index) => {
    //불변성유지를 위해 배열 복사
    const newChks = [...chks];
    // 특정 인덱스의 상태 변환 후 chks상태 업데이트
    newChks[index] = !newChks[index];
    setChks(newChks);
    //newChks.every(chk => chk)는 배열의 모든 요소가 true일 때만 true를 반환
    setChkAll(newChks.every(chk => chk)); 

  };


  //test 배송완료 버튼
  // function changeStatus(orderNum){
  //   axios.put(`/orders/statusUpdate/${orderNum}`)
  //   .then((res)=>{
      
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }


  useEffect(()=>{
    axios.post(`/orders/orderlist`,searchValue)
    .then((res)=>{
      console.log(res.data)
      setOrders(res.data)
      let sum = 0;
      let Numarr= new Array(res.data.length)
      res.data.forEach((p,i)=>{
        sum = sum +p.totalPrice
        Numarr.push(p.productNum)
      })

      let chkarr = new Array(res.data.length)
      chkarr.fill(false)
      setChks(chkarr)
      setProduct(Numarr)
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
            <div>
              <h4>총미수금</h4>
              <h2>0원</h2>
            </div>
            <div>
              <h4>test</h4>
              <CheckStock product={product} />
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
              </div>              
          {/* </div> */}
          <table className='content-table'>
            <thead>
              <tr>
                <td>
                  <input 
                    type='checkbox'
                    checked={chkAll}
                    onChange={()=>{handleCheckAll()}}
                  />
                </td>
                <td>구분</td>
                <td>거래처명</td>
                <td>주문일자</td>
                <td>총 주문액</td>
                <td>수주현황</td>
                <td>비고</td>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order,i)=>{
                  return(
                  <tr key={i}>
                    <td>
                      <input 
                        type='checkbox'
                        checked={chks[i]}
                        onChange={()=>{handleCheck(i)}}
                      />
                    </td>
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
                    order.orderStatus == '배송완료'? 
                      <>완료✅</>
                      : 
                      <>{order.orderStatus}</>
                      }
                      </td>
                    <td>
                      {/* <CheckStock productNum = {order.productNum}/>  */}
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