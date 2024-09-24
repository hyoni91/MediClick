import React, { useEffect, useState } from 'react'
import './ManageCustomer.css'
import axios from 'axios'
import ReactModal from 'react-modal'

const ManageCustomer = () => {
  //모달창
  const [modalOpen, setModalOpen] = useState(true)
  const showModal = () => {
  setModalOpen(!modalOpen)
  }


  //거래처 목록
  const [customers, setCustomers] = useState([])
  useEffect(()=>{
    axios.get(`/customer/customerList`)
    .then((res)=>{
      setCustomers(res.data)
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  },[])



  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>
              거래처 관리 
              <i className="fa-regular fa-star" />
              <span>거래처 등록 및 관리</span>
            </h3>
              <input 
                type='text' 
                placeholder='거래처명을 입력하세요.'
                name=''
                value={''}
              />
              <i className="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        <div className='manage-content'>
          <div className='content-btn'>
            <button type='button'>등록 <i className="fa-solid fa-plus" /></button>
            <button type='button' disabled={true}>삭제 <i className="fa-regular fa-trash-can" /></button>
          </div>
          <table className='content-table'>
            <thead>
              <tr>
                <td><input type='checkbox'/></td>
                <td>거래처명</td>
                <td>대표자 이름</td>
                <td>사업자 번호</td>
                <td>거래처 주소</td>
                <td>거래처 번호</td>
                <td>거래처 메일</td>
              </tr>
            </thead>
            <tbody>
              {
                customers?
                customers.map((customer,i)=>{
                  return(
                  <tr key={i}>
                    <td><input type='checkbox'/></td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerOwner}</td>
                    <td>{customer.businessNumber}</td>
                    <td>{customer.customerAddr}</td>
                    <td>{customer.customerTel}</td>
                    <td>{customer.customerEmail}</td>
                  </tr>
                  )
                })
                :
                <>등록된 거래처가 없습니다.</>
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        modalOpen? 
        <ReactModal 
          isOpen={true}
          ariaHideApp={false}
          // onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: {
              position: 'fixed',
              borderRadius : 10,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0, 0.6)'
            },
            content: {
              position: 'absolute',
              width: '580px',
              height: '70%',
              top: '180px',
              left: '30%',
              right: '80%',
              bottom: '50%',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
        }}
        
        >
          <div className='customer-modal'>
            <h3>거래처 정보</h3>
            <div>
              <h5><i class="fa-regular fa-building" /> 거래처명</h5>
              <input 
                type='text'
              />
            </div>
            <div>
              <h5><i className="fa-regular fa-user" /> 대표자 이름</h5>
              <input 
                type='text'
              />
            </div>
            <div>
              <h5><i class="fa-regular fa-file-lines" /> 사업자 번호</h5>
              <input 
                type='text'
              />
            </div>
            <div>
              <h5><i class="fa-solid fa-map-location-dot" /> 거래처 주소</h5>
              <input 
                type='text'
              />
            </div>
            <div>
              <h5><i className="fa-regular fa-user" /> 거래처 전화</h5>
              <input 
                type='text'
              />
            </div>
            <div>
              <h5><i className="fa-regular fa-user" /> 거래처 메일</h5>
              <input 
                type='text'
              />
            </div>
          </div>
        </ReactModal>
        :null
      }
    </div>
  )
}

export default ManageCustomer



// <div>
//               <h4>거래처 등록</h4>
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>거래처명</td>
//                     <td><input /></td>
//                     <td>대표자 이름</td>
//                     <td><input /></td>
//                     <td>사업자번호</td>
//                     <td><input /></td>
//                   </tr>
//                   <tr>
//                     <td>거래처 주소</td>
//                     <td><input /></td>
//                     <td>거래처 번호</td>
//                     <td><input /></td>
//                     <td>거래처 메일</td>
//                     <td><input /></td>
//                   </tr>
//                   <tr>
//                     <td>비고란</td>
//                     <td colSpan={5}><input /></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>