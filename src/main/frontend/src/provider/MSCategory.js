import axios from 'axios'
import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom'

const MSCategory = () => {
  const navigate = useNavigation()
const [msCategory, setMsCategory] = useState({
  cateNum : '',
  cateName : ''
})
const [medicalSupplies, setMedicalSupplies] = useState({
  productNum : '',
  productName : '',
  cateNum : '',
  productPrice : '',
  stock : '',
  detail : ''
})
const categoryChange = (e) => {
  const selectedText = e.target.options[e.target.selectedIndex].text;
  setMsCategory({
    ...msCategory,
    cateNum : e.target.value,
    cateName : selectedText
  })
  setMedicalSupplies({
    ...medicalSupplies,
    cateNum : e.target.value
  })
}
const mschange = (e) => {
  setMedicalSupplies({
    ...medicalSupplies,
    [e.target.name] : e.target.value
  })
}
const insertItem = () => {
  axios.post('/',msCategory,medicalSupplies)
  .then((res) => {
    navigate('/adming/order')
  })
  .catch((error) => {console.log(error)})
}

  return (
    <div>
      <select name='cateNum' onChange={(e) => {categoryChange(e)}}>
        <option value={1}>밴드/붕대/거즈</option>
        <option value={2}>장갑/마스크/안대</option>
        <option value={3}>주사기/주사용품</option>
        <option value={4}>소독제/소독용품</option>
        <option value={5}>수술/처치용품</option>
      </select>
        <div>상품 이름</div>
        <input type='text' name='productName' onChange={(e) => {mschange(e)}} />
        
        <div>가격</div>
        <input type='text' name='productPrice' onChange={(e) => {mschange(e)}} />
        
        <div>수량</div>
        <input type='text' name='stock' onChange={(e) => {mschange(e)}} />
        
        <div>상세정보</div>
        <input type='text' name='detail' onChange={(e) => {mschange(e)}} />
        
      <button type='button' onClick={() => {
        insertItem()
      }}>상품 등록</button>
      </div>
  )
}

export default MSCategory