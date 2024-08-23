import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  
  return (
    <div>
      <div className='menu-bar'>
          {/* 메뉴 바 */}
          <ul>
            <li><span>병원안내</span></li>
            <li><span>진료과/의료진</span></li>
            <li><span>진료예약</span></li>
            <li><span>고객서비스</span></li>
          </ul>
        </div>


        <Outlet/>
    </div>
  )
}

export default UserLayout