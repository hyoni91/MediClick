import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CheckStock = ({ product, productNum }) => {

  // 해당 제품의 현재고량 
  const [stock , setStock] = useState([])

  // 배송대기 주문 재고합계
  const [sumQnt, setSumQnt] = useState([])

  console.log(product)

  useEffect(()=>{
    product.forEach((e,i)=> {
      axios.get(`/orders/CurrentStock/${e}`)
      .then((res)=>{
        setStock(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    )},[])

  useEffect(()=>{
    product.forEach((e,i)=> {
      axios.get(`/orders/sumQnt/${e}`)
    .then((res)=>{
      setSumQnt(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  )},[])


  return (
    <p>
      <div>stock : {stock}</div> 
      <div>sumQnt : {sumQnt}</div>
      {/* <div>stock - sumQnt : {stock - sumQnt}</div>  */}
    </p>
  )
}

export default CheckStock