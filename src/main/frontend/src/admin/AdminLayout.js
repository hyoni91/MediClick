import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const AdminLayout = () => {
  const navigate=useNavigate();
  const {docNum}=useParams();

  return (
    <div>

      <div className='layout-bar'>
        <div onClick={(e)=>{navigate('/')}}><img className='logo' src='http://localhost:8080/images/66135a3db29c4ef5faa06efb.png'/></div>
        <div className='menu-bar'>
  
          <ul>
            <li onClick={(e)=>{navigate(`/admin/docMemList/${docNum}`)}}>예약환자</li>
            <li>2</li>
            <li>3</li>
            <li>마이페이지</li>
          </ul>
  
        </div>
      </div>


      <Outlet/>
    </div>

    
  )
}

export default AdminLayout