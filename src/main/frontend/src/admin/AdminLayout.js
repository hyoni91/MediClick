import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer';

const AdminLayout = ({loginInfo}) => {
  const navigate=useNavigate();
  const {docNum}=useParams();

  return (
    <div className='layout-main'>

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
            <li><span onClick={(e)=>{navigate(`/admin/docMemList/${loginInfo.memNum}`)}}>예약차트</span></li>
            <li><span onClick={()=>{navigate(`/admin/chartList`)}}>환자차트</span></li>
            <li><span>스케줄 관리</span></li>
            <li><span onClick={()=>{navigate('/admin/order')}}>발주</span></li>
          </ul>
  
        </div>
      </div>


      <div className='outlet'><Outlet/></div>

      <Footer/>

    </div>

    
  )
}

export default AdminLayout