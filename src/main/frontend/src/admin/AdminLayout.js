import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer';

const AdminLayout = ({loginInfo}) => {
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
            <li><span onClick={(e)=>{navigate(`/admin/docMemList/${loginInfo.memNum}`)}}>예약차트</span></li>
            <li><span onClick={()=>{navigate(`/admin/chartList`)}}>환자차트</span></li>
            <li><span>스케줄 관리</span></li>
            <li><span onClick={()=>{navigate('/admin/order')}}>발주</span></li>
          </ul>
  
        </div>
      </div>


      <div className='outlet'><Outlet/></div>

      <div className='footer-mid'>

      <div className='mid-div'>
        <div>
          <h3>대표전화</h3>
          <p>052-716-3199</p>
        </div>
        <div>
          <h4>그린 최고 암센터</h4>
          <p>울산 남구 삼산중로100번길 26 케이엠빌딩 1~4층</p>
        </div>
      </div>

      </div>
      
      <div className='footer-bottom'>
        <div>환자의 권리와 의무 | 개인정보처리방침 | 웹 이용약관</div>
      </div>

    </div>

    
  )
}

export default AdminLayout