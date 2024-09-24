import React, { useState } from 'react'

const MSCategory = () => {
const [msCategory, setMsCategory] = useState({
  cateNum : '',
  cateName : ''
})
const [medicalSupplies, setMedicalSupplies] = useState({})
const categoryChange = (e) => {
  const selectedText = e.target.options[e.target.selectedIndex].text;
  setMsCategory({
    ...msCategory,
    cateNum : e.target.value,
    cateName : selectedText
  })
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

      의료용품카테고리</div>
  )
}

export default MSCategory