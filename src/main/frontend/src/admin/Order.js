import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import ReactModal from 'react-modal'

const Order = () => {
  // 사이드 바로 메뉴 이동
  const [showContents,setShowContents]=useState('itemList')
  
  // 상품 리스트
  const [itemList,setItemList]=useState([])
  // 주문 리스트
  const [orderList,setOrderList]=useState([])
  // 주문 데이터
  const [orderData,setOrderData]=useState({
    productNum:'',
    customerNum:'',
    quantity:''
  })
  // customerNum을 어떻게 할건데

  // 체크박스
  const [checkItems,setCheckItems]=useState({})

  const [isChecked,setIsChecked]=useState(false)
  const [isAllChecked,setisAllChecked]=useState(false)


  // 체크박스 개별 선택하기
  const selectChecked = (id,isChecked)=>{
    if(isChecked){
      checkItems.add(id)
      setCheckItems(checkItems)
      console.log(checkItems)
    }
    else if(!isChecked){
      checkItems.delete(id)
      setCheckItems(checkItems)
    }
  }
    
  const checkHandled=(e)=>{
    const {id,checked}=e.target
    setCheckItems((prev)=>({
      ...prev,
      [id]:checked
    }))
    // setIsChecked(!isChecked)
    // selectChecked(target.id,target.checked)
  }

  // 체크박스 전체 선택하기

  const allCheckedHandler =()=>{
    const newChecked=!isChecked
    setIsChecked(newChecked)
    const newCheckedItems=itemList.reduce((acc,i)=>{
      acc[i.productNum]=newChecked
      return acc
    },[])
    setCheckItems(newCheckedItems)
  }


  // 체크한 아이템
  const [checkedItem,setCheckedItem]=useState([])

  //모달 창
  const [modalOpen,setModalOpen]=useState(false)
  //모달 창 안의 내용
  const [modalContent,setModalContent]=useState(false)

  const showModal=(content)=>{
    setModalContent(content)
    setModalOpen(!modalOpen)
  }

  //모달 콘텐츠
  const renderModalContent=()=>{
    switch(modalContent){

      case 'one':
        return <div></div>

      case 'more':
        return <div></div>

    }
  }

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

  // 주문 데이터 입력
  function insertOrderData(){

  }

  // 주문 데이터 저장 - 개별 구매
  function goOrder(){

  }

  // 주문 데이터 저장 - 선택 구매
  function goOrderChecked(){

  }

  useEffect(()=>{
    // 상품 리스트
    axios
    .get('/orderItems/list')
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })

    // 상품 주문


    // 주문 내역
    axios
    .get('/orderItems/orderList')
    .then((res)=>{
      setOrderList(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  console.log(orderList)

  // 사이드 바, 담길 내용
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
              <span><i className="bi bi-search"></i></span>
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
                    <td><input type='checkbox'
                      checked={isChecked}
                      onChange={allCheckedHandler}
                    ></input></td>
                    <td>카테고리</td>
                    <td>품목코드</td>
                    <td>품목명</td>
                    <td>설명</td>
                    <td>수량</td>
                    <td>구매단가</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {/* 상품명 누르면 모달로 상세정보? */}
                  {
                    itemList.map((item,i)=>{
                      return(
                        <tr key={i}>
                          <td><input type='checkbox'
                            checked={checkItems[item.productNum]||false}
                            id={item.productNum}
                            selectChecked={selectChecked}
                            onChange={checkHandled}
                          ></input></td>
                          <td>{item.cateVO.cateName}</td>
                          <td><span name='productNum' >{item.productNum}</span></td>
                          <td><span className='order-pName'
                            onClick={()=>{}}>{item.productName}</span></td>
                          <td>{item.detail}</td>
                          <td><input type='number' name='quantity' value={1}></input></td>
                          <td>{item.productPrice}</td>
                          <td><button type='button' value={item.productNum}
                            onClick={()=>{goOrder(); showModal('one')}}
                          >주문</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

            <div className='order-btns'>
              <button type='button' className='order-btn' 
                onClick={()=>{goOrderChecked(); showModal('more')}}>선택주문</button>
              <button type='button' className='order-btn'>??</button>
            </div>

          </div>

      case 'orderList':
        return <div className='order-main'>
          <h3>주문 내역</h3>
          {/* 품목 리스트 */}
          <div className='itemList-div'>
            <table className='itemList-table'>
              <colgroup>
                {/* no */}
                <col width={'5%'}/> 
                {/* 카테 */}
                <col width={'10%'}/> 
                {/* 품목코드 */}
                <col width={'10%'}/> 
                {/* 발주일 */}
                <col width={'10%'}/>
                {/* 품목명 */}
                <col width={'25%'}/>
                {/* 설명 */}
                <col width={'10%'}/>
                {/* 수량 */}
                <col width={'5%'}/>
                {/* 단가 */}
                <col width={'5%'}/>
                {/* 총 금액 */}
                <col width={'10%'}/>
                {/* 현황 */}
                <col width={'5%'}/>
              </colgroup>
    
              <thead>
                <tr>
                  <td>No.</td>
                  <td>카테고리</td>
                  <td>품목코드</td>
                  <td>발주일</td>
                  <td>품목명</td>
                  <td>설명</td>
                  <td>수량</td>
                  <td>단가</td>
                  <td>총 금액</td>
                  <td>현황</td>
                </tr>
              </thead>
              <tbody>
                {
                  orderList.map((order,i)=>{
                    return(
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{order.orderItemsVO.cateVO.cateName}</td>
                        <td>{order.productNum}</td>
                        <td>{order.requestDate}</td>
                        <td>{order.orderItemsVO.productName}</td>
                        <td>{order.orderItemsVO.detail}</td>
                        <td>{order.quantity}</td>
                        <td>{order.orderItemsVO.productPrice}</td>
                        <td>{(order.quantity)*(order.orderItemsVO.productPrice)}</td>
                        <td>
                          {
                            order.requestStatus=='Pending'?
                            '접수'
                            :
                            '배송 중'
                          }
                          </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      // case 'orderState':
      //   return <div className='order-main'>
      //     <h3>주문 현황</h3>
      //   </div>

    }
  }


  return (
    <div className='order-div'>
      {
        modalOpen?
        <ReactModal
          isOpen={true}

          ariaHideApp={false}
          onRequestClose={()=>{setModalOpen(false)}}
          style={{
            overlay: {
              position: 'fixed',
              borderRadius : 10,
              width:'100%',
              height:'100vh',
              zIndex:'10',
              top: 0,
              left: 0,
              // right: 0,
              // bottom: 0,
              backgroundColor: 'rgba(0,0,0, 0.6)'
            },
            content: {
              margin:0,
              position: 'absolute',
              width: '440px',
              minHeight:'320px',
              maxHeight:'40vh',
              // height: '320px',
              zIndex:'150',
              top: '50%',
              left: '50%',
              // right: '50%',
              // bottom: '40px',
              transform: 'translate(-50%,-50%)',
              // border: '1px solid #ccc',
              background: '#fff',
              // overflow: 'auto',
              // WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none'
            }            
          }}
        >
          {renderModalContent()}
          <div className='order-btns'>
            <button type='button' className='order-btn'
              onClick={()=>{setModalOpen(false);}}>주문</button>
          </div>          
        </ReactModal>:null
      }

      {/* 사이드바 */}
      <div className='order-sidebar'>
        <ul>
          <li><span className='getBold' 
          onClick={(e)=>{showContent('itemList'); changeBold(e)}}>
            <i className="bi bi-caret-right-fill"></i>
            <span> 상품 주문</span>
            </span></li>
          <li><span className='getBold' 
          onClick={(e)=>{showContent('orderList'); changeBold(e)}}>
            <i className="bi bi-caret-right-fill"></i>
            <span>주문 내역</span>
            </span></li>
          {/* <li><span className='getBold' 
          onClick={(e)=>{showContent('orderState'); changeBold(e)}}>
            <i className="bi bi-caret-right-fill"></i>
            <span>주문 현황</span>
            </span></li> */}
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