import React, { useEffect, useState } from 'react'
import './ManageCustomer.css'
import axios from 'axios'
import ReactModal from 'react-modal'
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { useRef } from 'react';
import ManageCustomerContent from './ManageCustomerContent';

const ManageCustomer = () => {
  //모달창
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenDetail, setModalOpenDetail] = useState(false)
  const showModal = () => {setModalOpen(!modalOpen)}

  //삭제버튼
  const [deleteCustomer, setDeleteCustomer] = useState(true)

  //체크박스 설정
  const [chks, setChks] = useState([])
  const [chkAll, setChkAll] = useState(false)

  //체크 값 받기 
  const [customerNum, setCustomerNum] = useState([])
  console.log(customerNum)

  //거래처 목록
  const [customers, setCustomers] = useState([])
  
  //거래처 등록
  const [inputCustomer, setInputCustomer] = useState({
    businessNumber : '', 
    customerAddr : '',
    customerEmail : '',
    customerOwner : '',
    customerTel : ''
    })

  //검색
  const [searchValue , setSearchValue] = useState({})

  //daum 주소 api 팝업창을 띄우기 위한 함수선언 
  const open =  useDaumPostcodePopup();
  //주소 검색 팝업창이 닫힐 때 실행되는 함수 
  function handleComplete(data){
    //우편 번호와 도로명주소 가져오기
    //input태그에 검색한 내용 넣어주기
    setInputCustomer(
      {
        ...inputCustomer,
        customerAddr: data.roadAddress
      })
  }
  //주소 검색 클릭시 실행되는 함수 
  function handleClick(){
    open({onComplete : handleComplete});
  }

  //삭제버튼
  function removeCustomer(){
    axios.delete(`/customer/deleteCustomer`,{
      data: customerNum, // 삭제할 고객 ID 목록
  })
    .then((res)=>{
  
    })
    .catch((error)=>{
      alert('error!')
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    })

  }

  
  //거래처 목록 
  useEffect(()=>{
    axios.post(`/customer/customerList`, searchValue)
    .then((res)=>{
      setCustomers(res.data)
      let chkarr = new Array(res.data.length)
      chkarr.fill(false)
      setChks(chkarr)
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  },[inputCustomer])

  //검색
  function seachCustomer(){
    axios.post(`/customer/customerList`, searchValue)
    .then((res)=>{
      setCustomers(res.data)
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  }

  //거래처 등록
  const onchageCustomer = (e) =>{
    setInputCustomer({
      ...inputCustomer,
      [e.target.name] : e.target.value
    })
  }

  function addCustomer(){
    if (
      inputCustomer.businessNumber == '' || 
      inputCustomer.customerAddr == '' ||
      inputCustomer.customerEmail == '' ||
      inputCustomer.customerOwner == '' ||
      inputCustomer.customerTel == ''
    ) {
      alert('입력하시 내용을 다시 한 번 확인해 주세요.')
    }else{
    axios.put(`/customer/addCustomer`, inputCustomer)
    .then((res)=>{
      setModalOpen(false)
      setInputCustomer({
        ...inputCustomer,
        businessNumber : '', 
        customerAddr : '',
        customerEmail : '',
        customerOwner : '',
        customerTel : ''
      })
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
    }
  }


    //체크박스 함수 
    const handleCheckAll = () => {
      const newChks = chks.map(() => !chkAll);
      setChks(newChks);
      setChkAll(!chkAll);
    };
  
    const handleCheck = (index,e) => {
      //불변성유지를 위해 배열 복사
      const newChks = [...chks];
      // 특정 인덱스의 상태 변환 후 chks상태 업데이트
      newChks[index] = !newChks[index];
      setChks(newChks);
      //newChks.every(chk => chk)는 배열의 모든 요소가 true일 때만 true를 반환
      setChkAll(newChks.every(chk => chk)); 

        // 하나라도 체크되어 있는지 확인
      const hasChecked = newChks.some(chk => chk);
      setDeleteCustomer(!hasChecked); // 상태 업데이트

      // 체크된 거래처 상태 업데이트
      if (newChks[index]) {
      // 체크된 경우
        setCustomerNum(prev => [
        ...prev,
         e.target.value  // 객체 형태로 추가
        ]);
          } else {
            // 체크 해제된 경우
              setCustomerNum(prev => 
                  prev.filter(
                    num => num !== e.target.value
                  ));
        }
    };

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
              <div className='seachbar'>
                <input 
                  type='text' 
                  placeholder='거래처명을 입력하세요.'
                  name='searchValue'
                  onChange={(e)=>{
                    setSearchValue({
                      ...searchValue,
                      [e.target.name] : e.target.value
                    })
                  }}
                />
                <span
                  onClick={()=>{seachCustomer()}}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
              </div>
          </div>
          <div className='manage-sales'>
            <div>총 매출액</div>
            <div>총 미수금</div>
          </div>
        </div>
        <div className='manage-content'>
          <div className='content-btn'>
            <button 
              type='button'
              onClick={()=>{setModalOpen(true)}}
            >등록 <i className="fa-solid fa-plus" />
            
            </button>
            <button 
              type='button' 
              disabled={deleteCustomer}
              onClick={()=>{removeCustomer()}}
            >삭제 <i className="fa-regular fa-trash-can" />
            </button>
          </div>
          <table className='content-table'>
            <thead>
              <tr>
                <td>
                  <input 
                    type='checkbox'
                    checked={chkAll} 
                    onChange={()=>{handleCheckAll()}} 
                  />
                </td>
                <td>거래처명</td>
                <td>대표자 이름</td>
                <td>사업자 번호</td>
                <td>거래처 주소</td>
                <td>거래처 번호</td>
                <td>거래처 메일</td>
                <td>수정</td>
              </tr>
            </thead>
            <tbody>
              {
                customers?
                customers.map((customer,i)=>{
                  return(
                  <tr key={i}>
                    <td>
                      <input 
                        value={customer.customerNum}
                        type='checkbox'
                        name='customerNum'
                        checked={chks[i]} 
                        onChange={(e) => handleCheck(i,e)}
                      />
                    </td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerOwner}</td>
                    <td>{customer.businessNumber}</td>
                    <td>{customer.customerAddr}</td>
                    <td>{customer.customerTel}</td>
                    <td>{customer.customerEmail}</td>
                    <td>
                      <button 
                        type='button'
                        onClick={(e)=>{
                          setModalOpenDetail(true)
                          setCustomerNum(customer.customerNum)
                        }}
                      >
                        수정
                      </button>
                    </td>
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
          <h3> ◻거래처 정보</h3>
          <div className='costomer-add-div'>
            <div>
              <h5><i class="fa-regular fa-building" /> 거래처명</h5>
              <input 
                type='text'
                name='customerName'
                onChange={(e)=>{ onchageCustomer(e)}}
              />
            </div>
            <div>
              <h5><i className="fa-regular fa-user" /> 대표자 이름</h5>
              <input 
                type='text'
                name='customerOwner'
                onChange={(e)=>{ onchageCustomer(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-regular fa-file-lines" /> 사업자 번호</h5>
              <input 
                type='text'
                name='businessNumber'
                onChange={(e)=>{ onchageCustomer(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-solid fa-map-location-dot" /> 거래처 주소</h5>
              <input 
                type='text'
                name='customerAddr'
                value={inputCustomer.customerAddr}
                onChange={(e)=>{ onchageCustomer(e)}}
                onClick={()=>{handleClick()}}
              /> 
            </div>
            <div>
              <h5><i class="fa-solid fa-phone" /> 거래처 전화</h5>
              <input  
                type='text'
                name='customerTel'
                onChange={(e)=>{ onchageCustomer(e)}}
              />
            </div>
            <div>
              <h5><i class="fa-solid fa-envelope-open" />거래처 메일</h5>
              <input 
                type='text'
                name='customerEmail'
                onChange={(e)=>{ onchageCustomer(e)}}
              />
            </div>
          </div>
          <div className='cutomer-modal-btn'>
            <button 
              type='button'
              onClick={()=>{addCustomer()}}
            >등록하기
            </button>
            <button 
              type='button'
              onClick={()=>{setModalOpen(false)}}
            >닫기
            </button>
          </div>
        </div>
      </ReactModal>
        :null
      }
      {
        modalOpenDetail? 
        <ReactModal 
        isOpen={true}
        ariaHideApp={false}
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
        <ManageCustomerContent 
          customerNum={customerNum}
          setModalOpenDetail={setModalOpenDetail}
          />
      </ReactModal>
        :null
      }
    </div>
  )
}


export default ManageCustomer