import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CheckStock = ({productNum, orderSatus}) => {

  console.log(productNum)

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
    const result = stock - sumQnt

    if(orderSatus == '배송대기' && result < sumQnt){
      return(
        <p className='check-stock'>재고확인</p>
            )
    }
  }

  console.log(`Stock = ${stock} sumQnt =  ${sumQnt}`)

  return (
    <div>
      {result()}
    </div>
  )
}

export default CheckStock