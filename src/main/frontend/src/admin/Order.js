import React, { useState } from 'react'
import './Order.css'

const Order = () => {
  const [showContents,setShowContents]=useState('itemList')

  //선택한 li bold 유지
  function changeBold(e){
    let bold=document.querySelectorAll('.getBold')
    bold.forEach((b,i)=>{
      if(e.currentTarget==b){
        b.classList.add('active')
      }
      else{
        b.classList.remove('active')
      }
    })
  }

  const showContent=(content)=>{
    setShowContents(content)
  }

  const mainContent=()=>{
    switch(showContents){

      case 'itemList':
        return <div className='order-main'>
            <h3>상품 주문</h3>
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

      case 'orderList':
        return <div className='order-main'>
          <h3>주문 내역</h3>
          {/* 품목 리스트 */}
          <div className='itemList-div'>
            <table className='itemList-table'>
              <colgroup>
                <col width={'5%'}/>
                <col width={'10%'}/>
                <col width={'10%'}/>
                <col width={'10%'}/>
                <col width={'30%'}/>
                <col width={'10%'}/>
                <col width={'5%'}/>
                <col width={'10%'}/>
              </colgroup>
    
              <thead>
                <tr>
                  <td>No.</td>
                  <td>카테고리</td>
                  <td>품목코드</td>
                  <td>발주일</td>
                  <td>품목명</td>
                  <td>품목유형</td>
                  <td>수량</td>
                  <td>단가</td>
                  <td>총 금액</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ㅇㅇ</td>
                  <td>123123</td>
                  <td>2024-09-24</td>
                  <td>adadfaaaaaaaaaa</td>
                  <td>asdf</td>
                  <td>32</td>
                  <td>123,000</td>
                  <td>12312313</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ㅇㅇ</td>
                  <td>123123</td>
                  <td>2024-09-24</td>
                  <td>adadfaaaaaaaaaa</td>
                  <td>asdf</td>
                  <td>12</td>
                  <td>123,000</td>
                  <td>3231231231</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      case 'orderState':
        return <div className='order-main'>
          <h3>주문 현황</h3>
        </div>

    }
  }


  return (
    <div className='order-div'>

      {/* 사이드바 */}
      <div className='order-sidebar'>
        <ul>
          <li><span className='getBold' 
          onClick={(e)=>{showContent('itemList'); changeBold(e)}}>
            <i class="bi bi-caret-right-fill"></i>
            <span> 상품 주문</span>
            </span></li>
          <li><span className='getBold' 
          onClick={(e)=>{showContent('orderList'); changeBold(e)}}>
            <i class="bi bi-caret-right-fill"></i>
            <span>주문 내역</span>
            </span></li>
          <li><span className='getBold' 
          onClick={(e)=>{showContent('orderState'); changeBold(e)}}>
            <i class="bi bi-caret-right-fill"></i>
            <span>주문 현황</span>
            </span></li>
        </ul>
      </div>

      
      {/* 메인 */}
      {
        mainContent()
      }
      <div>

      </div>
      
      


    </div>
  )
}

export default Order