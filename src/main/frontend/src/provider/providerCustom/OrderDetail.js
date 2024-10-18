import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './OrderDetail.css'
import CheckStock from './CheckStock'
import { color } from 'chart.js/helpers'

const OrderDetail = () => {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false)
  const {orderDate} = useParams()
  const [orderDetail, setOrderDetail] = useState([{
    customerAddr:'',
    customerName:'',
    customer:{
      customerOwner : '',
      customerTel : '',
    },
    orderDate: '',
    orderNum:'' ,
    orderRequest:{
      quantity:0,
      orderItemsVO:{
        productName : '',
        productPrice :0,
        productNum:0,
      }
    },
    orderStatus:''
  }])

  // 체크박스, 체크박스한 아이템들 
  const [checkItems,setCheckItems]=useState([])

  console.log(checkItems)

  // 체크박스 개별 선택
  const checkHandled=(checked,id)=>{
    setCheckItems((prev)=>{
      if(checked){ 
        return [...prev,id] // 체크된 경우 아이템 추가 
      } else {
        return prev.filter((el)=>el!==id) // 체크 해제된 경우 아이템 제거
      }
    })
  }

  // 체크박스 전체 선택하기
  const allCheckedHandler =(checked)=>{
    if(checked){
      // 전체 선택 클릭 시 데이터의 모든 id를 담은 배열로 checkItems 상태 업데이트
      const idArray=[]
      orderDetail.forEach((el)=>{idArray.push(el.orderNum)})
      setCheckItems(idArray)
    } else {
      // 전체 선택 해제 시 checkItems를 빈 배열로 상태 업데이트
      setCheckItems([])
    }
  }

  // 체크박스로 선택한 주문들 정보가져오기
  const [checkData,setCheckData]=useState([])

  const orderNums=()=>{
    const newCheckData=[]

    checkItems.forEach((chk,i)=>{
      orderDetail.forEach((o,j)=>{
        if(chk===o.orderNum){
          newCheckData.push({
            // customerAddr:orderDetail[0].customerAddr,
            orderNum:o.orderNum,
            quantity:o.orderRequest.quantity,
            productNum:o.orderRequest.orderItemsVO.productNum,
          })
            // setCheckData([{
            //   ...checkData,
            //   customerAddr:orderDetail[0].customerAddr,
            //   orderNum:o.orderNum,
            //   quantity:o.orderRequest.quantity,
            //   productNum:o.orderRequest.orderItemsVO.productNum,
            // }])
        } 

      })
    })

    if(newCheckData.length>0){
      setCheckData(newCheckData)
    }else{
      alert('선택된 주문이 없습니다.')
    }

    console.log(checkData)
  }

  console.log(orderDetail)

  const disabledchk = ()=>{
    if( orderDetail.orderStatus == '배송대기'){
      return setIsDisabled(false)
    }else{
      return setIsDisabled(true)
    }
  }

  // 배송신청 누르면 배송현황을 배송신청중으로 바꾸기
  // 배송 테이블 생성하면 배송 테이블에 저장하기(db작업)
  function changeStatus(){
    if(window.confirm('배송 신청을 진행하시겠습니까?')){
      axios.post(`/orders/deli-orders-statusUpdate`, checkData)
      .then((res)=>{
        alert('배송 신청 완료!')
      })
      .catch((error)=>{
        console.log(error)
        alert('error!')
      })
    }
  }

  console.log(orderDetail)

  //상세정보 
  useEffect(()=>{
    axios.get(`/orders/ordersDetail/${orderDate}`)
    .then((res)=>{
      console.log(res.data)
      if( res.data.orderStatus == '배송대기'){
        return setIsDisabled(false)
      }else{
        return setIsDisabled(true)
      }
      setOrderDetail(res.data)
    })
    .catch((error)=>{
      alert('error!!')
      console.log(error)
    })
  },[])

  const totalPrice=()=>{
    let result=0
    orderDetail.forEach((o,i)=>{
      return(
        result+=(o.orderRequest.orderItemsVO.productPrice * o.orderRequest.quantity)
      )
    })
    return result
  }


  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 상세 정보</h3>
          </div>
          <div className='detail-header'>
            <div>
              <i className="fa-regular fa-building" />
              <div>
                <h4>{orderDetail[0].customerName}</h4>
                <h4>{orderDetail[0].customer.customerOwner}</h4>
              </div>
            </div>
            <div>
              <i className="fa-solid fa-truck-fast"/>
              <div>
                <h4>{orderDetail[0].customer.customerTel}</h4>
                <h4>{orderDetail[0].customerAddr}</h4>
              </div>              
            </div>
            {/* <div>
              <i className="fa-regular fa-circle-check"/>
              <h4>{orderDetail.orderStatus}</h4>
            </div> */}
            <div>
              <i className="fa-solid fa-won-sign" />
              <h4>{totalPrice().toLocaleString()}원</h4>
            </div>
            {/* <div>
              <CheckStock productNum={orderDetail.productNum} />
            </div> */}
          </div>
        </div>
        <div className='manage-content'>
          <table className='content-table'>
            <thead>
              <tr>
                <td><input type='checkbox' 
                  // 데이터 개수와 체크된 아이템 개수가 다를 경우 선택 해제
                  checked={checkItems.length===orderDetail.length ? true:false}
                  onChange={(e)=>{allCheckedHandler(e.target.checked)}}/></td>
                <td>주문날짜</td>
                <td>거래처명</td>
                <td>아이템</td>
                <td>수량</td>
                <td>금액</td>
                <td>배송현황</td>
                <td>재고</td>
              </tr>
            </thead>
            <tbody>
              {
                orderDetail.map((o,i)=>{
                  return(
                    <tr key={i}>
                      <td><input type='checkbox' 
                        checked={checkItems.includes(o.orderNum)?true:false}
                        name={`select-${o.orderNum}`}
                        id={o.orderNum}
                        onChange={(e)=>{checkHandled(e.target.checked,o.orderNum)}}/></td>
                      <td>{orderDetail[0].orderDate}</td>
                      <td>{orderDetail[0].customerName}</td>
                      <td>{o.orderRequest.orderItemsVO.productName}</td>
                      <td>{o.orderRequest.quantity}</td>
                      <td>{o.orderRequest.orderItemsVO.productPrice.toLocaleString()}원</td>
                      <td>{o.orderStatus}</td>
                      <td>
                        {
      
                        
                        }
                      <CheckStock 
                        orderSatus={o.orderStatus} productNum={o.orderRequest.orderItemsVO.productNum}/>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className='orderDetail-btn'> 
          <button 
            type='button' 
            onClick={()=>{navigate('/provider/orders')}}>
              뒤로가기
          </button>
          <button 
            type='button' 
            disabled={isDisabled}
            onClick={()=>{orderNums(); changeStatus()}}>
              {
                orderDetail.orderStatus == '배송대기'?
                <>배송신청</>
                :
                <>{orderDetail.orderStatus}</>
              }
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail