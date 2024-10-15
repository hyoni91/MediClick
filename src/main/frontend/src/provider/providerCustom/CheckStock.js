import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CheckStock = ({productNum, orderSatus}) => {

  // 해당 제품의 현재고량 
  const [stock , setStock] = useState(0)

  // 배송대기 주문 재고합계
  const [sumQnt, setSumQnt] = useState(0)

  useEffect(()=>{
      axios.get(`/orders/CurrentStock/${productNum}`)
      .then((res)=>{
        setStock( res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[productNum])

  useEffect(()=>{
      axios.get(`/orders/sumQnt/${productNum}`)
    .then((res)=>{
      setSumQnt(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[productNum])

  const result = () => {
    const result1 = stock - sumQnt
    if(orderSatus == '배송대기' && result1 < sumQnt){
      return(
        <p className='check-stock'><i className="fa-solid fa-circle-exclamation" /></p>
            ) 
    }else{
      return(
        <>-</>
      )
    }
  }



  return (
    <div>
      {result()}
    </div>
  )
}

export default CheckStock