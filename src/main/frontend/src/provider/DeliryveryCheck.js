import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DeliryveryCheck = ({setLoginInfo}) => {
  const loginData = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  
  const [driver, setDriver] =useState({
    deliveryNum : ''
    ,orders :''
    ,deliveryDriverName : loginData?loginData.memName : <></> 
    ,deliveryDriverPhone :loginData?loginData.memTel : <></>
    ,deliveryAddress :''
    ,startTime :''
    ,endTime :''
    ,deliveryStatus :''
    ,ordersVO :''
  })
  console.log(driver)
  const [order, setOrder] = useState([])
  useEffect(() => {
    axios.all([
      axios.get(`/delivery/deliveryList/${driver.deliveryDriverName}`),
      axios.get('/delivery/ordersList')
    ])
    .then(axios.spread((res1,res2) => {
      setDriver(res1.data)
    // driver.map(() => {})
      console.log(res1.data)
      setOrder(res2.data)
    }))
    .catch((error) => {
      console.log(error)
    })
  },[])
  //선택
  const [oneCheck, setOneCheck] = useState([]);

  const statusChange = (id,newStatus) => {
    const updatedDelivery = order.map((item, i) => {
      return(item.deliveryNum == id ? {...item ,newStatus} : item
    )})
    setOneCheck(updatedDelivery)
    
  }

  //체크변경
  const changeCheck = (deliveryNum, checked) => {
    setOneCheck((item) => 
      checked 
      ? [...item, deliveryNum] 
      : item.filter((num) => num !== deliveryNum))
    
  }

  console.log(oneCheck)
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
            <div className='seachbar'>
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
                        <input type='checkbox' value={item.orderNum} onChange={(e) => setOneCheck(e.target.checked) }/>
                      </td>
                      <td>
                        {item.orderNum}
                      </td>
                      <td>
                        {item.orderNum}
                      </td>
                      <td>
                        {item.orderNum}
                      </td>
                      <td>
                        {item.orderNum}
                      </td>
                      <td>{}</td>
                      <td>010-----</td>
                      <td>
                        배송출발
                      </td>
                      <td>배송중</td>
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