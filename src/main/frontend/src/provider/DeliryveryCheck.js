import axios from 'axios'
import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import './DeliryveryCheck.css'
const DeliryveryCheck = () => {
  const [isShow, setIsShow] = useState(false)
  
  //로그인 정보
  const loginData = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  //배달기사 정보
  const [driver, setDriver] =useState({
    deliveryNum : ''
    ,deliveryDriverName : loginData?loginData.memName : ''
    ,deliveryDriverPhone : ''
    ,deliveryAddress :''
    ,startTime :''
    ,endTime :''
    ,deliveryStatus :''
    ,orderList :[]
  })
  console.log(driver)
  //수주 물품 목록표
  const [order, setOrder] = useState([])
  // 상태 변경 시 데이터 요청
  useEffect(() => {
    fetchData();
  }, [driver.deliveryDriverName]);

  // 데이터 요청 함수
  const fetchData = () => {
    axios.all([
      axios.get(`/delivery/deliveryList/${driver.deliveryDriverName}`),
      axios.get('/delivery/ordersList')
    ])
    .then(axios.spread((res1, res2) => {
      setDriver(res1.data);
      // 주문 리스트에서 deliveryNum이 같은 주문 찾기
    const updatedOrderList = res2.data.filter(order => order.deliveryNum == res1.data.deliveryNum);
    
    console.log(updatedOrderList)

    // driver의 orderList에 업데이트된 리스트 설정
    setDriver(prevDriver => ({
      ...prevDriver,
      orderList: updatedOrderList // deliveryNum이 같은 주문들로 설정
    }));
      setOrder(res2.data);
      console.log(res2.data)
    }))
    .catch((error) => {
      console.log(error);
    });
  };
  //선택
  const statusChange = (newStatus = '') => {
    if (oneCheck.length === 0) {
      alert('선택된 주문이 없습니다.');
      return;
    }
    // 선택된 주문의 정보를 모은다.
    const dataToSend = oneCheck.map((orderNum) => {
      const selectedOrder = order.find((item) => item.orderNum === orderNum);
      console.log(selectedOrder)
      return {
        deliveryNum: driver.deliveryNum,
        deliveryDriverName: driver.deliveryDriverName,
        deliveryDriverPhone: driver.deliveryDriverPhone,
        deliveryStatus: newStatus,
        orderStatus: newStatus,
        orderNum: selectedOrder.orderNum // 선택된 주문 번호
      };
    });
  console.log(dataToSend)
  const url = (newStatus == '배송중') ? '/delivery/updateDriver' : '/delivery/endDriver'
    // 각 주문에 대해 개별 요청을 보낸다.
    Promise.all(dataToSend.map(data => axios.post(url, data)))
      .then((responses) => {
        console.log('배송 상태 업데이트 성공:', responses);
        // 모든 주문 상태 업데이트 후 데이터를 다시 가져옴
        fetchData();
      })
      .catch((error) => {
        console.error('배송 상태 업데이트 실패:', error);
      });
  };

  const [oneCheck, setOneCheck] = useState([]);

  //체크변경
  const changeCheck = (deliveryNum, checked) => {
    setOneCheck((e) => 
      checked ? [...e, deliveryNum] : e.filter((num) => num != deliveryNum)
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
          <div className='content-btn bb'>
            <div>
              <button onClick={() => {
                statusChange('배송중')
              }}>출발</button>  
              <button onClick={() => {
                statusChange('배송완료')
              }}>도착</button>  
            </div>
            <div className='abc'>
            <span className='show-btn' onClick={() => {setIsShow(!isShow)}}>배달목록</span>
                
              </div>              
          </div>
          {isShow?
          <>
            <h3>배송 목록</h3>
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
                    <td>배송상태</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {driver.orderList.map((order,i) => {
                    return(
                      <tr>
                        <td></td>
                        <td>{i+1}</td>
                        <td>{order.orderRequest.orderItemsVO.productName}</td>
                        <td>{order.customerAddr} ({order.customerName})</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.delivery.deliveryDriverName}</td>
                        <td>{order.delivery.deliveryDriverPhone}</td>
                        <td>{order.orderStatus}</td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
          </>
          :
          <></>
        }
          <table className='content-table aaa'>
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
              {order && order.length === 0 ? <tr><td colSpan={10}>ssssssssssssssss</td></tr>:
                order.map((item ,i) => {
                  return(
                    <tr key={i}>
                      <td>
                        <input type='checkbox' value={item.orderNum} onChange={(e) => {
                          console.log(item.orderNum)
                          changeCheck(item.orderNum, e.target.checked)} }/>
                      </td>
                      <td>{i+1}</td>
                      <td>{item.orderRequest.orderItemsVO.productName}</td>
                      <td>{item.customerAddr}({item.customerName})</td>
                      <td>{item.totalPrice}</td>
                      <td>{item.delivery.deliveryDriverName}</td>
                      <td>{item.delivery.deliveryDriverPhone}</td>
                      <td>{item.deliveryStatus}</td>
                      <td>{item.orderStatus == '배송중' ? '배송중' : 
                          item.orderStatus == '배송완료' ? '배송완료' : '배송 대기'}</td>
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