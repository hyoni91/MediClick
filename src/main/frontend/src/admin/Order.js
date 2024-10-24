import React, { useEffect, useRef, useState } from 'react'
import './Order.css'
import axios from 'axios'
import ReactModal from 'react-modal'
import { useLocation, useNavigate } from 'react-router-dom'

const Order = () => {
  const navigate=useNavigate()
  const location=useLocation()
  

  // 상품 리스트
  const [itemList,setItemList]=useState([])

  // 체크박스, 체크한 아이템들 - 체크박스 ui
  const [checkItems,setCheckItems]=useState([])

  // 주문 데이터 임시 저장
  const [selectData,setSelectData]=useState({})
  // 주문 데이터들 임시 저장
  const [selectDatas,setSelectDatas]=useState([])

  // 주문 데이터
  const [orderData,setOrderData]=useState(
    {
    productNum:'',
    customerNum:1,
    quantity:10
    }
  )

  // 선택 주문 데이터들 - 상태관리
  const [orderDatas,setOrderDatas]=useState([
    {
    productNum:'',
    customerNum:1,
    quantity:10
    },
  ])

  //검색 조건 저장 변수
  const [searchBox,setSearchBox]=useState({
    searchValue:''
  })

  // 검색창
  function insertSearch(e){
    setSearchBox({
      ...searchBox,
      [e.target.name]:e.target.value
    })
  }



  // 검색하기
  function clickSearch(){
    console.log(searchBox)

    axios
    .post('/orderItems/list',searchBox)
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  function handleKeyPress(e){
    if(e.key==='Enter'){
      clickSearch()
    }
  }

    
  // 체크박스 개별 선택
  const checkHandled=(checked,id)=>{

    setCheckItems((prev)=>{
      if(checked){
        return [...prev,id] // 체크된 경우 아이템 추가
      } else {
        return prev.filter((el)=> el!==id) // 체크 해제된 경우 아이템 제거
      }
    })
  }


  // 체크박스 전체 선택하기
  const allCheckedHandler =(checked)=>{
    if(checked){
      //전체 선택 클릭 시 데이터의 모든 id를 담은 배열로 checkItems 상태 업데이트
      const idArray=[]
      itemList.forEach((el)=>idArray.push(el.productNum))
      setCheckItems(idArray)
    }
    else{
      //전체 선택 해제 시 checkItems를 빈 배열로 상태 업데이트
      setCheckItems([])
    }
  }


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
        return <div>
          {/* 해당 상품만 주문 */}
          <div className='order-modal-div'>
            <h3>주문 확인</h3>
            <table className='order-modal-table'>
              <colgroup>
                <col width={'30%'}/>
                <col width={'70%'}/>
              </colgroup>

              <thead></thead>
              <tbody>
                <tr>
                  <td>카테고리</td>
                  <td>{selectData.cateVO.cateName}</td>
                </tr>
                <tr>
                  <td>품목명</td>
                  <td>{selectData.productName}</td>
                </tr>
                <tr>
                  <td>설명</td>
                  <td>{selectData.detail}</td>
                </tr>
                <tr>
                  <td>수량</td>
                  <td><span className='eachNum'>{orderData.quantity}</span> 개</td>
                </tr>
                <tr>
                  <td>총 결제 금액</td>
                  <td><span className='priceNum'>
                    {((selectData.productPrice)*(orderData.quantity)).toLocaleString()}</span> 원</td>
                </tr>
              </tbody>
            </table>
            {/* <div className='inputCustomerNum-div'>
                <input type='text' className='inputCustomerNum'
                  name='customerNum'
                  placeholder='고객번호를 입력해주세요'
                  onChange={(e)=>{insertOrderData(e);}}></input>
            </div> */}
            <div className='order-btns'>
              <button type='button' className='order-btn'
                onClick={()=>{setModalOpen(false); goOrderData()}}>주문</button>
              <button type='button' className='order-btn'
                onClick={()=>{setModalOpen(false);}}>취소</button>
            </div>
          </div>
        </div>

      case 'more':
        return <div>
          {/* 체크된 모든 상품 주문 : 선택 주문*/}
          <div className='order-modal-div'>
            <h3>주문 확인</h3>
            <table className='order-modal-table-checked'>
              <colgroup>
                <col width={'40%'}/>
                <col width={'20%'}/>
                <col width={'40%'}/>
              </colgroup>
              
              <thead>
                <tr>
                  <td>품목명</td>
                  <td>수량</td>
                  <td>합계</td>
                </tr>
              </thead>
              <tbody>
                {
                  selectDatas.map((item,i)=>{
                      return(
                        <tr key={i}>
                          <td>{item.productName}</td>
                          <td><span className='eachNum'>
                          {
                            orderDatas.map((data,i)=>{
                              return(
                                data.productNum==item.productNum?
                                data.quantity
                                : null
                              )
                            })
                          }</span> 개</td>
                          <td><span className='priceNum'>
                            {
                              orderDatas.map((data,i)=>{
                                return(
                                  data.productNum===item.productNum?
                                  ((item.productPrice)*(data.quantity)).toLocaleString()
                                  : null
                                )
                              })
                            }</span> 원</td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </table>
            <div className='order-modal-detail'>
              <p>총 <span className='eachNum'>{checkItems.length}</span> 개의 상품을 주문하겠습니다.</p>
              <p>총 결제 금액은 <span className='priceNum'>{totalPrice().toLocaleString()}</span>원 입니다.</p>
            </div>
            <div className='order-btns'>
              <button type='button' className='order-btn'
                onClick={()=>{setModalOpen(false); goOrderDatas()}}>주문</button>
              <button type='button' className='order-btn'
                onClick={()=>{setModalOpen(false);}}>취소</button>
            </div>
          </div>
        </div>

    }
  }

  //선택한 li bold 유지
  function changeBold(currentPath){
    let bold=document.querySelectorAll('.getBold')
    // let currentPath=location.pathname // 현재페이지의 경로

    bold.forEach((b,i)=>{
      let targetPath=b.getAttribute('data-path')

      if(currentPath===targetPath){
        b.classList.add('active')
      } else{
        b.classList.remove('active')
      }
    })
  }

  // console.log(orderData)


  // 주문 데이터 저장 - 개별 구매
  function goOrder(e){
    //e.target.value가 문자열로 가져오는 거라 parseInt 정수로 바꿔줌
    const productNum=parseInt(e.target.value)

    // e로 받아온 productNum이랑 일치하는 product의 정보를 가져와서 저장
    itemList.forEach((item,i)=>{
      if(item.productNum===productNum){
        setSelectData({...item})
        setOrderData({
          ...orderData,
          productNum:item.productNum
        })
        return
      }
      else{
      }
    })
  }


  // 주문 데이터 저장 - 선택 구매
  function goOrderChecked(){
    // checkItems에 체크된 productNum이랑
    // 받아온 itemList에 있는 productNum이랑 비교해서 같은 숫자를 selectedItems에 저장
    const selectedItems=itemList.filter(item=>
      checkItems.includes(item.productNum)
    )

    if (checkItems.length==0){ // 아무것도 체크 안 했을 때
      alert('주문할 상품을 선택해주세요')
      return
    }
    else{
      showModal('more')
      setSelectDatas(selectedItems) //선택된 아이템들을 상태로 저장
    }

  }

  
  // 개별 - 주문 데이터 입력
  function insertOrderData(e){

    setOrderData({
      ...orderData,
      [e.target.name]:e.target.value,
      productNum:selectData.productNum,
      // customerNum:1
    })

  }

  // 선택 - 주문 데이터 입력
  function insertOrderDatas(e,eNum,quantity){
    
    setOrderDatas((prev)=>{ // 현재 상태 배열
      // 초기값 필터링
      const filterPrev=prev.filter(order => order.productNum !== "" && order.quantity !== "")

      //기존 데이터에서 같은 productNum이 있는지 확인 후 동일하면 existingOrder에 저장
      const existingOrder=filterPrev.find(order=>order.productNum===eNum)
      console.log(existingOrder) // 하나씩 늦게 입력됨 
      
      const finalQuantity = quantity || 10 

      if(existingOrder){ 
        return filterPrev.map(order =>
          order.productNum === eNum? // 동일한걸 찾아 
          {
            // ...order,
            [e.target.name]:e.target.value,
            quantity:finalQuantity,
            productNum:eNum,
            customerNum:e.target.name==='customerNum'?e.target.value : order.customerNum
          }
          :
          order // 조건에 맞지 않는 항목은 그대로 반환 
        ) 
      } 
      else {
        return [
          ...filterPrev, // 기존 상태 배열 유지 
          {
            [e.target.name]:e.target.value,
            quantity:finalQuantity,
            productNum:eNum,
            customerNum: e.target.name === 'cutomerNum'? e.target.value:1
          }
        ]
      }
    })
  }


  console.log(orderDatas)


  function goOrderData(){
    axios
    .put('/orderItems/insertOrder',orderData)
    .then((res)=>{
      alert('주문 완료')
      navigate('/admin/orderList')
    })
    .catch((error)=>{console.log(error)})
  }

  
  function goOrderDatas(){
    axios
    .put('/orderItems/insertOrderChecked',orderDatas)
    .then((res)=>{
      alert('주문 완료')
      navigate('/admin/orderList')
    })
    .catch((error)=>{console.log(error)})
  }

  useEffect(()=>{
    
    // 상품 리스트
    axios
    .post('/orderItems/list',searchBox)
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })

    changeBold(location.pathname)

  },[location.pathname])

  // console.log(orderList)


  // 합계 구하기
  function totalPrice(){
    let result=0
    selectDatas.forEach((item,i)=>{

      orderDatas.forEach((data,i)=>{
        return(
          data.productNum==item.productNum?
          result+=(item.productPrice*data.quantity)
          :
          null
        )
      })
    
    })
    return result
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
              padding:'10px',
              position: 'absolute',
              width: '560px',
              minHeight:'410px',
              maxHeight:'800px',
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
          
        </ReactModal>:null
      }
    <div className='orderList-div'>
  
        {/* 사이드바 */}
        <div className='order-sidebar'>
          <ul>
            <li><div className='getBold' 
                data-path="/admin/order"
                onClick={(e)=>{navigate('/admin/order');}}>
                <i className="bi bi-caret-right-fill"></i>
                <span> 상품 주문</span>
              </div></li>
            <li><div className='getBold' 
                data-path="/admin/orderList"
                onClick={(e)=>{navigate('/admin/orderList');}}>
                <i className="bi bi-caret-right-fill"></i>
                <span> 주문 내역</span>
              </div></li>
          </ul>
        </div>
        
        <div className='order-main'>
              <h3>상품 주문</h3>
              {/* 품목 검색 */}
              <div className='item-search'>
                <input type='text' name='searchValue' 
                  onChange={(e)=>{insertSearch(e)}} 
                  onKeyDown={(e)=>{handleKeyPress(e)}}></input>
                <span onClick={()=>{clickSearch()}}><i className="bi bi-search"></i></span>
              </div> 
              
              {/* 품목 리스트 */}
              <div className='itemList-div'>
                <table className='itemList-table'>
                  <colgroup>
                    <col width={'5%'}/>
                    <col width={'10%'}/>
                    <col width={'10%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'15%'}/>
                    <col width={'10%'}/>
                    <col width={'5%'}/>
                  </colgroup>
        
                  <thead>
                    <tr>
                      <td><input type='checkbox'
                        //데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === itemList.length ? true : false}
                        onChange={(e)=>allCheckedHandler(e.target.checked)}
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
                    {
                      itemList.map((item,i)=>{
                        return(
                          <tr key={i}>
                            <td><input type='checkbox'
                              // 체크된 아이템 배열에 해당 아이템이 있을 경우, 선택 활성화 아닐 시 해제 
                              // checked={checkItems[item.productNum]||false}
                              checked={checkItems.includes(item.productNum)? true:false}
                              name={`select-${item.productNum}`}
                              id={item.productNum}
                              // selectChecked={selectChecked}
                              onChange={(e)=>{
                                const isChecked = e.target.checked
                                const quantity = isChecked ? (document.querySelector(`input[name='quantity']`).value || 10) : 0 // 체크되면 기본값10 해제시 0
                                checkHandled(e.target.checked,item.productNum)
                                insertOrderDatas(e,item.productNum,quantity) // 수량 업데이트 
                                }}
                            ></input></td>
                            <td>{item.cateVO.cateName}</td>
                            <td><span name='productNum' >{item.productNum}</span></td>
                            <td><span className='order-pName'
                              onClick={()=>{}}>{item.productName}</span></td>
                            <td>{item.detail}</td>
                            <td>
                              <input type='number' name='quantity'
                              defaultValue={10} min={10} max={100} step={10}
                              onChange={(e)=>{
                                const value = e.target.value ? parseInt(e.target.value,10) : 10 // 입력된 값이 없으면 기본값 10
                                insertOrderData(e); insertOrderDatas(e,item.productNum,value)}}
                              ></input> 개</td>
                            <td><span className='priceNum'>{item.productPrice.toLocaleString()}</span> 원</td>
                            <td><button type='button' value={item.productNum}
                              onClick={(e)=>{goOrder(e); showModal('one')}}
                            >주문</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              <div className='order-btns'>
                <button type='button' className='order-btn' 
                  onClick={()=>{goOrderChecked();}}>선택 주문</button>
                {/* <button type='button' className='order-btn'>??</button> */}
              </div>

              </div>
  
            </div>
      </div>

    

    </div>
  )
}

export default Order