import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ManageCustomerContent = ({customerNum, setModalOpenDetail}) => {

    const [detail, setDetail] = useState({})
  
    useEffect(()=>{
      axios.get(`/customer/detailCustomer/${customerNum}`)
      .then((res)=>{
        setDetail(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

    const onchageDetail=(e)=>{
      setDetail({
        ...detail,
        customerNum : customerNum,
        [e.target.name] : e.target.value
      })
    }

    console.log(detail)

      //수정
  function updateCustomer(){
    axios.put(`/customer/updateCustomer`, detail)
    .then((res)=>{
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  }



  return (
    <div className='customer-modal'>
          <h3> ◻거래처 정보수정</h3>
          <div className='costomer-add-div'>
            <div>
              <h5><i class="fa-regular fa-building" /> 거래처명</h5>
              <input 
                type='text'
                name='customerName'
                defaultValue={detail.customerName}
                onChange={(e)=>{onchageDetail(e)}}
              />
            </div>
            <div>
              <h5><i className="fa-regular fa-user" /> 대표자 이름</h5>
              <input 
                type='text'
                name='customerOwner'
                defaultValue={detail.customerOwner}
                onChange={(e)=>{onchageDetail(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-regular fa-file-lines" /> 사업자 번호</h5>
              <input 
                type='text'
                name='businessNumber'
                defaultValue={detail.businessNumber}
                onChange={(e)=>{onchageDetail(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-solid fa-map-location-dot" /> 거래처 주소</h5>
              <input 
                type='text'
                name='customerAddr'
                defaultValue={detail.customerAddr}
                onChange={(e)=>{onchageDetail(e)}}
              /> 
            </div>
            <div>
              <h5><i class="fa-solid fa-phone" /> 거래처 전화</h5>
              <input  
                type='text'
                name='customerTel'
                defaultValue={detail.customerTel}
                onChange={(e)=>{onchageDetail(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-solid fa-envelope-open" />거래처 메일</h5>
              <input 
                type='text'
                name='customerEmail'
                defaultValue={detail.customerEmail}
                onChange={(e)=>{onchageDetail(e)}}
              />
            </div>
          </div>
          <div className='cutomer-modal-btn'>
            <button 
              type='button'
              onClick={()=>{
                updateCustomer()
                setModalOpenDetail(false)
              }}
            >수정하기
            </button>
            <button 
              type='button'
              onClick={()=>{
                setModalOpenDetail(false)
              }}
            >닫기
            </button>
          </div>
        </div>
  )
}

export default ManageCustomerContent