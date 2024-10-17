import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './ProviderLayout.css'

const ProviderLayout = () => {
  const navigate=useNavigate()
  //사이드 메뉴 정보를 관리하는 state변수
  const [sideMenu,setSideMenu]=useState('')

  return (
    <div>
      <div className='layout-bar'>
        <div 
          className='logoimg-div' 
          onClick={()=>{
            navigate('/provider/main')}}
        >
          <img 
            className='logo' 
            src='http://localhost:8080/images/providerlogo2.png'/
          >
          <div className='provider-logo-div'>
            <p>그린의료용품</p>
            <p>수주 관리 프로그램</p>
          </div>
        </div>

        <div className='menu-bar'>
  
          <ul>
            <li><span onClick={()=>{navigate('/provider/manageCustomer')}}>거래처</span></li>
            {/* 매출처 관리 */}
            <li><span onClick={() => {navigate('/provider/medicalSupplies')}}>품목</span></li>
            {/* 카테고리,제품관리, 입고등록 */}
            <li><span onClick={()=>{navigate('/provider/orders')}}>수주</span></li>
            {/* 주문(수주)입력, 주문서(수주), 납품서(공급받는자), 수주/납품현황 */}
            <li><span onClick={()=>{navigate('/provider/inventory')}}>현황</span></li>
            {/* 월별 매출현황,현 재고현황 */}
            {/* 배송 */}
            <li><span onClick={() => {navigate('/provider/deliveryCheck')}}>배송</span></li>
          </ul>
  
        </div>
      </div>
        
      <Outlet/>

    </div>
  )
}


export default ProviderLayout