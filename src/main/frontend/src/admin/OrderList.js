import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './OrderList.css'
import { color } from 'chart.js/helpers'

const OrderList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [visibleCount,setVisibleCount]=useState(5) // 기본적으로 5개 표시

  // 주문 리스트
  const [orderList,setOrderList]=useState([])

  function handleShowMore(){
    setVisibleCount(prevCount=>
      Math.min(prevCount+5,orderList.length) // 5개씩 증가
    )
  }

  useEffect(()=>{

    // 주문 내역
    axios
    .get('/orderItems/orderList')
    .then((res)=>{
      setOrderList(res.data)
    })
    .catch((error)=>{console.log(error)})

    changeBold(location.pathname)

  },[location.pathname])


  // 주문취소 상태로 변경
  function goUpdate(requestNum){
    if(window.confirm('주문을 취소하시겠습니까?')){
      axios
      .delete(`/orderItems/update/${requestNum}`)
      .then((res)=>{
        alert('주문이 취소되었습니다.')
  
        setOrderList((prev)=>
          prev.map((order)=>
            order.requestNum===requestNum ?
            {...order,requestStatus:'주문취소'}:order
          )
        )
  
      })
      .catch((error)=>{console.log(error)})

    }
  }

  // 현황이 주문취소일 때 텍스트 변경
  const cancelLine={color:'lightgray'}

  // 현황이 배송완료일 때 
  const deliveryComplete={fontWeight:'bold',color:'cornflowerblue'}

  //선택한 li bold 유지
  function changeBold(currentPath){
    let bold=document.querySelectorAll('.getBold')
    // let currentPath=location.pathname // 현재페이지의 경로

    bold.forEach((b,i)=>{
      let targetPath=b.getAttribute('data-path')

      if(currentPath===targetPath){
        b.classList.add('active')
      } else{
        b.classList.remove('active')
      }
    })
  }

  console.log(orderList)




  return (


    <div className='orderList-div'>

        {/* 사이드바 */}
        <div className='order-sidebar'>
        <ul>
          <li><div className='getBold' 
            data-path="/admin/order"
            onClick={(e)=>{navigate('/admin/order');}}>
            <i className="bi bi-caret-right-fill"></i>
            <span> 상품 주문</span>
            </div></li>
          <li><div className='getBold' 
            data-path="/admin/orderList"
            onClick={(e)=>{(navigate('/admin/orderList'));}}>
            <i className="bi bi-caret-right-fill"></i>
            <span> 주문 내역</span>
            </div></li>
        </ul>
      </div>


      

      <div className='order-main'>
        <h3>주문 내역</h3>
        <div className='itemList-div'>
          <div className='orderList-table'>
            {
              orderList.slice(0,visibleCount).map((order,i)=>{
                return(
                  <div key={i} className='itemList-main'>
                    <div>{order.requestDate}</div>

                    <div className='itemList-inside'>
                      <div className='itemList-img'>
                        <img src={`http://localhost:8080/upload/${order.orderItemsVO.itemImgVO.attachedFileName}`}></img>
                      </div>

                      <div>
                        <div className='itemList-name'>
                          <span>[{order.orderItemsVO.cateVO.cateName}]</span>
                          <span>{order.orderItemsVO.productName}</span>
                        </div>

                        <div>{order.orderItemsVO.detail}</div>

                        <div className='itemList-quantity'>
                          <div>
                            <span className='priceNum'>{((order.quantity)*(order.orderItemsVO.productPrice)).toLocaleString()}</span> 원
                            / <span className='eachNum'>{order.quantity}</span> 개</div>
                        </div>

                        <div className='itemList-status'>
                          <div style={
                            order.requestStatus==='주문취소'?cancelLine:
                            order.requestStatus==='배송완료'?deliveryComplete:null
                            }>
                            {order.requestStatus}</div>
                          <div>
                            {
                              order.requestStatus==='주문취소'||
                              order.requestStatus==='배송완료'?
                              null
                              :
                              <button type='button' 
                                onClick={()=>{goUpdate(order.requestNum)}}>취소</button>
                            }
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                )
              })
            }
            
            {
              visibleCount < orderList.length &&
              <button onClick={handleShowMore} className='itemList-more'>
                더 보기
              </button>
            }

          </div>

          <table className='itemList-table'>
            <colgroup>
              {/* 주문번호 */}
              <col width={'8%'}/> 
              {/* 발주일 */}
              <col width={'10%'}/>
              {/* 카테 */}
              <col width={'10%'}/> 
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
              {/* 주문 취소 */}
              <col width={'7%'}/> 
            </colgroup>
  
            <thead>
              {/* <tr>
                <td>주문번호</td>
                <td>발주일</td>
                <td>카테고리</td>
                <td>품목명</td>
                <td>설명</td>
                <td>수량</td>
                <td>단가</td>
                <td>총 금액</td>
                <td>현황</td>
                <td></td>
              </tr> */}
            </thead>
            <tbody>
              {/* {
                orderList.map((order,i)=>{
                  return(
                    <tr key={i}>
                      <td>{order.requestNum}</td>
                      <td>{order.requestDate}</td>
                      <td>{order.orderItemsVO.cateVO.cateName}</td>
                      <td>{order.orderItemsVO.productName}</td>
                      <td>{order.orderItemsVO.detail}</td>
                      <td><span className='eachNum'>{order.quantity}</span> 개</td>
                      <td><span>{order.orderItemsVO.productPrice.toLocaleString()}</span> 원</td>
                      <td><span className='priceNum'>{((order.quantity)*(order.orderItemsVO.productPrice)).toLocaleString()}</span> 원</td>
                      <td style={order.requestStatus==='주문취소'?cancelLine:null}>
                        {
                          requestState(order.requestStatus)
                        }
                        </td>
                      <td><button type='button'
                        onClick={()=>{goUpdate(order.requestNum)}}
                        >취소</button></td>
                    </tr>
                  )
                })
              } */}
            </tbody>
          </table>
        </div>
      </div>


    </div>

  )
}

export default OrderList