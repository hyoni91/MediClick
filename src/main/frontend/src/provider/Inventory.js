import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Inventory = () => {
   //카테 리스트
  const [category,setCategory]=useState([])
  //아이템 리스트
  const [item, setItem] = useState([])
  useEffect(() => {
    axios.all([
      axios.get('/item/cateList'),
      axios.get('/item/inventoriesList')
    ])
    
    .then(axios.spread((res1,res2) => {
      console.log(res1.data)
      //카테고리
      setCategory(res1.data)
      //조회된 상품 목록 및 페이지 정보 세팅
      setItem(res2.data)

      console.log(res2.data)
    }))
    .catch((error) => {console.log(error)})
  },[])
  return (
    <div>
      <h1>현 재고 현황</h1>
      <table>
        <thead>
          <tr>
            <td>카테고리</td>
            <td>제품번호</td>
            <td>제품명</td>
            <td>규격</td>
            <td>입고일자</td>
            <td>출고일자</td>
            <td>최초재고</td>
            <td>입고수량</td>
            <td>출고수량</td>
            <td>현 재고량</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Inventory