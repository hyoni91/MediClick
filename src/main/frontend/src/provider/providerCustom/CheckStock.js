import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CheckStock = ({productNum}) => {

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


  console.log(`Stock = ${stock} sumQnt =  ${sumQnt}`)

  return (
    <p>
      <div>현재고량 - 주문량 : {stock - sumQnt}</div> 
    </p>
  )
}

export default CheckStock