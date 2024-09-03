import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
  const navigate = useNavigate();

  return (
  <div className='int'>
    <div className='layout-bar'>
      <div className='logoimg-div' onClick={(e)=>{navigate('/')}}>
        <img className='logo' src='http://localhost:8080/images/66135a3db29c4ef5faa06efb.png'/>
        <div>그린삼산병원</div>
      </div>
      
    <div className='menu-bar'>
    {/* 메뉴 바 */}
      <ul>
        <li><span>병원안내</span></li>
        <li><span onClick={()=>{navigate('/medicalDoctor')}}>진료과/의료진</span></li>
        <li><span onClick={()=>{navigate('/scheduleForm')}}>진료예약</span></li>
        <li><span onClick={()=>{navigate('/userServiceMain')}}>고객서비스</span></li>
      </ul>
    </div>
  </div>
  <Outlet/>
  </div>
  )
}

export default UserLayout