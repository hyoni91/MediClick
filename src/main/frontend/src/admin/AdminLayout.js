import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const AdminLayout = () => {
  const navigate=useNavigate();
  const {docNum}=useParams();

  return (
    <div>

      <div className='layout-bar'>
        <div className='logoimg-div' onClick={(e)=>{navigate('/')}}>
          <img className='logo' src='http://localhost:8080/images/66135a3db29c4ef5faa06efb.png'/>
          <div>
            <p>그린 최고 암센터</p>
            <p>GREEN BEST CANCER CENTER</p>
          </div>
        </div>

        <div className='menu-bar'>
  
          <ul>
            <li><span onClick={(e)=>{navigate(`/admin/docMemList/${docNum}`)}}>예약차트</span></li>
            <li><span>환자차트</span></li>
            <li><span>스케줄 관리</span></li>
            <li><span>마이페이지</span></li>
          </ul>
  
        </div>
      </div>


      <Outlet/>
    </div>

    
  )
}

export default AdminLayout