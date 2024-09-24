import React from 'react'
import './Order.css'

const Order = () => {


  return (
    <div className='order-div'>

      {/* 사이드바 */}
      <div className='order-sidebar'>
        <ul>
          <li>상품 목록</li>
          <li>주문 내역</li>
          <li>주문 현황</li>
        </ul>
      </div>

      
      {/* 메인 */}
      <div className='order-main'>
        {/* 품목 검색 */}
        <div className='item-search'>
          <input type='text'></input>
          <button type='button'>조회</button>
        </div> 
        
        {/* 품목 리스트 */}
        <div className='itemList-div'>
          <table className='itemList-table'>
            <colgroup>
              <col width={'5%'}/>
              <col width={'10%'}/>
              <col width={'10%'}/>
              <col width={'30%'}/>
              <col width={'10%'}/>
              <col width={'15%'}/>
              <col width={'10%'}/>
              <col width={'5%'}/>
            </colgroup>
  
            <thead>
              <tr>
                <td><input type='checkbox'></input></td>
                <td>카테고리</td>
                <td>품목코드</td>
                <td>품목명</td>
                <td>품목유형</td>
                <td>수량</td>
                <td>구매단가</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type='checkbox'></input></td>
                <td>ㅇㅇ</td>
                <td>123123</td>
                <td>adadfaaaaaaaaaa</td>
                <td>asdf</td>
                <td><input type='number' value={10}></input></td>
                <td>123,000</td>
                <td><button type='button'>주문</button></td>
              </tr>
              <tr>
                <td><input type='checkbox'></input></td>
                <td>ㅇㅇ</td>
                <td>123123</td>
                <td>adadfaaaaaaaaaa</td>
                <td>asdf</td>
                <td><input type='number' value={10}></input></td>
                <td>123,000</td>
                <td><button type='button'>주문</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='order-btns'>
          <button type='button' className='order-btn'>선택주문</button>
          <button type='button' className='order-btn'>전체주문</button>
        </div>

      </div>
      


    </div>
  )
}

export default Order