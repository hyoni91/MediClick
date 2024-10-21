import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Inventory.css'

const Inventory = () => {
   //카테 리스트
  const [category,setCategory]=useState([]);
  //아이템 리스트
  const [item, setItem] = useState([]);

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
  },[]);
  // const [resultList, setResultList] = useState({
  //   items : [],
  //   pageInfo : {}
  // })
  return (
    <div>
      <table className='inventoryTable'>
        <thead>
          <tr>
            <td>카테고리</td>
            <td>제품번호</td>
            <td>제품명</td>
            <td>입고일자</td>
            <td>출고일자</td>
            <td>최초재고</td>
            <td>입고수량</td>
            <td>출고수량</td>
            <td>현 재고량</td>
          </tr>
        </thead>
        <tbody>
        {item
        .sort((a, b) => a.productNum - b.productNum) // 제품번호를 기준으로 정렬
        .map(pro => {
          const categoryName = category.find(cat => cat.cateNum === pro.cateNum)?.cateName || '없음';
          return (
            <tr key={pro.productNum}>
              <td>{categoryName}</td>
              <td>{pro.productNum}</td>
              <td>{pro.productName}</td>
              <td>{pro.stockDate}</td>
              <td></td> {/* 출고일자 */}
              <td>{pro.stock}</td>
              <td></td> {/* 입고수량 */}
              <td></td> {/* 출고수량 */}
              <td></td> {/* 현 재고량 */}
            </tr>
          );
        })}
</tbody>

      </table>
    </div>
  )
}

export default Inventory