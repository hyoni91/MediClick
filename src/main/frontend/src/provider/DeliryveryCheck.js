import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DeliryveryCheck = () => {
  //배송정보 저장
  const [delivery,setDelivery] = useState([{
    deliveryNum : ''
  }])

  useEffect(() => {
    axios.get('/delivery/deliveryList')
    .then((res) => {
      setDelivery(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[])

  const statusChange = (id,newStatus) => {
    const updatedDelivery = delivery.map((item, i) => {
      return(item.deliveryNum == id ? {...item ,newStatus} : item
    )})
    setDelivery(updatedDelivery)
  }
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
              statusChange()
            }}>출발</button>  
            <button onClick={() => {
              statusChange()
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
              {
                delivery.map((item ,i) => {
                  return(
                    <tr key={i}>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>
                        {item.deliveryNum}
                      </td>
                      <td>
                        {item.deliveryNum}
                      </td>
                      <td>
                        {item.deliveryNum}
                      </td>
                      <td>
                        {item.deliveryNum}
                      </td>
                      <td>사사</td>
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