import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DeliryveryCheck = () => {
  //로그인 정보
  const loginData = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  //배달기사 정보
  const [driver, setDriver] =useState({
    deliveryNum : ''
    ,orderNum :''
    ,deliveryDriverName : loginData?loginData.memName : ''
    ,deliveryDriverPhone : ''
    ,deliveryAddress :''
    ,startTime :''
    ,endTime :''
    ,deliveryStatus :''
    ,ordersVO :''
  })
  console.log(driver)
  //수주 물품 목록표
  const [order, setOrder] = useState([])
  useEffect(() => {
    axios.all([
      //배달기사
      axios.get(`/delivery/deliveryList/${driver.deliveryDriverName}`),
      //주문정보
      axios.get('/delivery/ordersList')
    ])
    .then(axios.spread((res1,res2) => {
      setDriver(res1.data)
      //console.log(res1.data)
      console.log(res2.data)
      setOrder(res2.data)
      //setOrder(... res1.data,res2.data)

    }))
    .catch((error) => {
      console.log(error)
    })
  },[])

  //선택
  const statusChange = (newStatus = '') => {
    if (oneCheck.length === 0) {
      alert('선택된 주문이 없습니다.');
      return;
    }
    const selectedOrder = order.find((item) => oneCheck.includes(item.orderNum));
    console.log(newStatus)
  const dataToSend = {
    deliveryNum : driver.deliveryNum,
    deliveryDriverName: driver.deliveryDriverName,
    deliveryDriverPhone : driver.deliveryDriverPhone,
    deliveryStatus: newStatus,
    orderStatus : newStatus,
    orderNum: selectedOrder.orderNum, // 선택된 주문 번호 리스트
    deliveryAddress: selectedOrder.customerAddr // 배송 주소
    
  };
  console.log(dataToSend)
  const url = (newStatus == '배송중') ? '/delivery/updateDriver' : '/delivery/endDriver'
    axios.post(url, dataToSend)
    .then((response) => {
      console.log('배송 상태 업데이트 성공:');
      // 상태가 성공적으로 변경되면 주문 목록을 다시 갱신
      console.log(dataToSend)
      // setOrder();
      window.location.reload();
    })
    .catch((error) => {
      console.error('배송 상태 업데이트 실패:', error);
    });
  };

  const [oneCheck, setOneCheck] = useState([]);

  //체크변경
  const changeCheck = (deliveryNum, checked) => {
    setOneCheck((e) => 
      checked ? [...e, deliveryNum] : e.filter((num) => num !== deliveryNum)
    );
    console.log(order)
  };

  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>배송 정보</h3>
          </div>
          <div>
            
                  <>
                    <h4></h4>
                    <h4></h4>
                  </>
            
          </div>
        </div>
        <div className='manage-content'>
          <div className='content-btn'>
            <button onClick={() => {
              statusChange('배송중')
            }}>출발</button>  
            <button onClick={() => {
              statusChange('배송완료')
            }}>도착</button>  
            <div className='seachbar-2'>
                <input 
                  type='text' 
                  placeholder='주문일자'
                />
                <span
                  onClick={()=>{}}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
              </div>              
          </div>
          
          <table className='content-table'>
            <thead>
              <tr>
                <td></td>
                <td>배송번호</td>
                <td>상품</td>
                <td>주소</td>
                <td>금액</td>
                <td>기사이름</td>
                <td>기사번호</td>
                <td colSpan={2}>배송상태</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {order && order.length == 0 ? <tr><td colSpan={10}>ssssssssssssssss</td></tr>:
                order.map((item ,i) => {
                  return(
                    <tr key={i}>
                      <td>
                        <input type='checkbox' value={item.orderNum} onChange={(e) => {
                          changeCheck(item.orderNum, e.target.checked)} }/>
                      </td>
                      <td>{i+1}</td>
                      <td>{item.orderList[i]?.orderRequest.orderItemsVO.productName}</td>
                      <td>{item.orderList[i]?.customer.customerAddr}({item.customerName})</td>
                      <td>{item.orderList[i]?.totalPrice}</td>
                      <td>{item.deliveryDriverName}</td>
                      <td>{item.deliveryDriverPhone}</td>
                      <td>{item.deliveryStatus}</td>
                      <td>{item.deliveryStatus == '배송중' ? '배송중' : 
                          item.deliveryStatus == '배송완료' ? '배송완료' : '배송 대기'}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
          
      </div>
        

    </div>
  )
}

export default DeliryveryCheck