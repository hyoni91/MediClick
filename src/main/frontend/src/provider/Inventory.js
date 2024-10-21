import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Inventory.css'

const Inventory = () => {
   //카테 리스트
  const [category,setCategory]=useState([]);
  //아이템 리스트
  const [item, setItem] = useState([]);

  const [list,setList] = useState([])

  //재고 
  useEffect(()=>{
    axios.get('/inventory/list')
    .then((res)=>{
      console.log(res.data)
      setList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  useEffect(() => {
    axios.all([
      axios.get('/item/cateList'),
      axios.get('/item/inventoriesList')
    ])
    .then(axios.spread((res1,res2) => {
      // console.log(res1.data)
      console.log(res2.data)
      //카테고리
      setCategory(res1.data)
      //조회된 상품 목록 및 페이지 정보 세팅
      // setItem(res2.data)
      // console.log(res2.data)
    }))
    .catch((error) => {console.log(error)})
  },[]);

  const [resultList, setResultList] = useState({
    items : [],
    pageInfo : {}
  })


  return (
    <div className='inventory-wrap'>
      <h3>현 재고 현황</h3>
      <table className='inventoryTable'>
        <thead>
          <tr>
            {/* <td>카테고리</td> */}
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
          {
            list.map((list,i)=>{
              return(
                <tr>
                  <td>{list.productNum}</td>
                  <td>{list.productName}</td>
                  <td>{list.stockDate}</td>
                  <td>{list.outDate}</td>
                  <td>{list.initialStock.toLocaleString()}</td>
                  <td>{list.incomingQty.toLocaleString()}</td>
                  <td>{list.outgoingQty.toLocaleString()}</td>
                  <td>{list.currentStock.toLocaleString()}</td>
                </tr>
              )
            })
          }
          
          {item.map(pro => {
            const categoryName = category.find(cat => cat.cateNum === pro.cateNum)?.cateName || '없음';
            return (
                <tr key={pro.productNum}>
                    <td>{categoryName}</td>
                    <td>{pro.productNum}</td>
                    <td>{pro.productName}</td>
                    <td>{pro.stockDate}</td>
                    <td></td> {/* 출고일자 여기에 */}
                    <td>{pro.stock}</td>
                    <td></td> {/* 입고수량 여기에 */}
                    <td></td> {/* 출고수량 여기에 */}
                    <td></td> {/* 현 재고량 여기에 */}
                </tr>
              );
          })}


        </tbody>
      </table>
    </div>
  )
}

export default Inventory