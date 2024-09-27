import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

const Order = () => {
  const navigate=useNavigate()

  // 상품 리스트
  const [itemList,setItemList]=useState([])


  // 주문 데이터 임시 저장
  const [selectData,setSelectData]=useState({})
  // 주문 데이터들 임시 저장
  const [selectDatas,setSelectDatas]=useState([])


  // 주문 데이터
  const [orderData,setOrderData]=useState({
    productNum:'',
    customerNum:'',
    quantity:10
  })

  // 선택 주문 데이터들 - 상태관리
  const [orderDatas,setOrderDatas]=useState([
    {
    productNum:'',
    customerNum:'',
    quantity:10
    }
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

  // console.log(searchBox)


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


  // 체크박스, 체크한 아이템들 - 체크박스 ui
  const [checkItems,setCheckItems]=useState([])
    
  // 체크박스 개별 선택
  const checkHandled=(checked,id)=>{
    // const {id,checked}=e.target
    // if (checked){
      // 단일 선택 시 체크된 아이템을 배열에 추가
      // setCheckItems((prev)=>(
      // [...prev,id]
      // ))}
    // else{
      // 단일 선택해제 시 체크된 아이템을 제외한 배열 (필터)
      // setCheckItems(checkItems.filter((el)=>el !== id))
    // }

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

  // console.log(checkItems)

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
            <div className='inputCustomerNum-div'>
                <input type='text' className='inputCustomerNum'
                  name='customerNum'
                  placeholder='고객번호를 입력해주세요'
                  onChange={(e)=>{insertOrderData(e);insertOrderDatas(e)}}></input>
                {/* <button type='button'>확인</button> */}
            </div>
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
                          <td><span className='eachNum'>{orderDatas[0].quantity}</span> 개</td>
                          <td><span className='priceNum'>{((item.productPrice)*(orderDatas[0].quantity)).toLocaleString()}</span> 원</td>
                        </tr>
                      )
                  })
                }
              </tbody>
            </table>
            <div className='inputCustomerNum-div'>
                <input type='text' className='inputCustomerNum'
                  name='customerNum'
                  placeholder='고객번호를 입력해주세요'
                  onChange={(e)=>{insertOrderData(e);insertOrderDatas(e)}}></input>
                {/* <button type='button'>확인</button> */}
            </div>
            <div className='order-modal-detail'>
              <p>총 <span className='eachNum'>{checkItems.length}</span> 개의 상품을 주문하겠습니다.</p>
              <p>총 결제 금액은 <span className='priceNum'>{}</span>입니다.</p>
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

  // console.log(orderData)


  // 주문 데이터 저장 - 개별 구매
  function goOrder(e){
    //e.target.value가 문자열로 가져오는 거라 parseInt 정수로 바꿔줌
    const productNum=parseInt(e.target.value)

    //일치하는 아이템 찾기
    // const foundItem=itemList.find(item=>{return item.productNum===productNum})
    // e로 받아온 productNum이랑 일치하는 product의 정보를 가져와서 저장
    itemList.forEach((item,i)=>{
      if(item.productNum===productNum){
        // console.log(foundItem)
        setSelectData({...item})
        console.log(selectData)
        return
      }
      else{
        console.log('일치 ㄴ')
      }

    })

  }


  // 주문 데이터 저장 - 선택 구매
  function goOrderChecked(){
    if (checkItems.length==0){
      alert('주문할 상품을 선택해주세요')
      return
    }
    const selectedItems=itemList.filter(item=>
      checkItems.includes(item.productNum)
    )

    if(selectedItems.length>0){
      setSelectDatas(selectedItems) //선택된 아이템들을 상태로 저장
    }



  }

  // console.log(selectDatas)
  
  // 개별 - 주문 데이터 입력
  function insertOrderData(e){

    // productNum으로 가져온 상품정보
    // 고객번호
    // 를 insert

    setOrderData({
      ...orderData,
      [e.target.name]:e.target.value,
      productNum:selectData.productNum
    })

  }

  // console.log(orderDatas)

  // 선택 - 주문 데이터 입력
  function insertOrderDatas(e){
    const {name,value}=e.target
    //마지막 데이터가 빈 값인지 확인하고 제거 후 새로운 데이터 추가
    
      setOrderDatas((prev)=>{
        const filterPrev=prev.filter(order=>order.customerNum!==""&&order.productNum!=="")

        return[
          ...filterPrev,
          {
            ...filterPrev[filterPrev.length-1],  //마지막 주문 데이터 복사
            [name]:value, //새로 입력된 값으로 업데이트 
            productNum:selectDatas.map(item=>item.productNum), // 선택된 상품 번호 배열
            quantity:filterPrev.map(order=>order.quantity),
          }

        ]
      })
    
  }

  console.log(orderDatas)



  function goOrderData(){
    axios
    .put('/orderItems/insertOrder',orderData)
    .then((res)=>{
      alert('주문 완료')
    })
    .catch((error)=>{console.log(error)})
  }

  function goOrderDatas(){
    axios
    .put('/orderItems/insertOrder',orderDatas)
    .then((res)=>{
      alert('주문 완료')
    })
    .catch((error)=>{console.log(error)})
  }


  useEffect(()=>{
    
    // 만약 현재 주소가 list라면 상품 주문에 bold


    // 상품 리스트
    axios
    .post('/orderItems/list',searchBox)
    .then((res)=>{
      setItemList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })

  },[])

  // console.log(orderList)


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
              minHeight:'300px',
              maxHeight:'80vh',
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
            <li><span className='getBold' 
            onClick={(e)=>{navigate('/admin/order'); changeBold(e)}}>
              <i className="bi bi-caret-right-fill"></i>
              <span> 상품 주문</span>
              </span></li>
            <li><span className='getBold' 
            onClick={(e)=>{navigate('/admin/orderList'); changeBold(e)}}>
              <i className="bi bi-caret-right-fill"></i>
              <span> 주문 내역</span>
              </span></li>
          </ul>
        </div>
        
        <div className='order-main'>
              <h3>상품 주문</h3>
              {/* 품목 검색 */}
              <div className='item-search'>
                <input type='text' name='searchValue' 
                  onChange={(e)=>{insertSearch(e)}}></input>
                <span onClick={()=>{clickSearch()}}><i className="bi bi-search"></i></span>
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
                    {/* 상품명 누르면 모달로 상세정보? */}
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
                              onChange={(e)=>checkHandled(e.target.checked,item.productNum)}
                            ></input></td>
                            <td>{item.cateVO.cateName}</td>
                            <td><span name='productNum' >{item.productNum}</span></td>
                            <td><span className='order-pName'
                              onClick={()=>{}}>{item.productName}</span></td>
                            <td>{item.detail}</td>
                            <td>
                              <input type='number' name='quantity' 
                              defaultValue={10} min={10} max={100} step={10}
                              onChange={(e)=>{insertOrderData(e); insertOrderDatas(e)}}
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
              </div>
  
              <div className='order-btns'>
                <button type='button' className='order-btn' 
                  onClick={()=>{goOrderChecked(); showModal('more');}}>선택주문</button>
                <button type='button' className='order-btn'>??</button>
              </div>
  
            </div>
      </div>

      
      


    </div>
  )
}

export default Order