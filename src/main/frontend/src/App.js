import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './user/LoginForm';

function App() {
  const navigate=useNavigate()

  


  return (
    <div className="container">

      <div className='main'>
        <div className='header'>
          {/* 헤더 */}
          <div className='logo' onClick={(e)=>{navigate('/')}}>MediClick</div>
          <ul>
            <li><span onClick={(e)=>{navigate('/loginForm')}}>로그인</span></li>
            <li><span>회원가입</span></li>
          </ul>

        </div>
  
        <div className='menu-bar'>
          {/* 메뉴 바 */}
          <ul>
            <li><span>병원안내</span></li>
            <li><span>진료과/의료진</span></li>
            <li><span>진료예약</span></li>
            <li><span>고객서비스</span></li>
          </ul>
        </div>
  

      </div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/loginForm' element={<LoginForm/>}/>

      </Routes>

    </div>
  );
}

const Home=()=>{
  return(

    <div className='main-img'>
      {/* 메인이미지 */}
      <img src='http://localhost:8080/images/IMG_2611.jpeg'/>
    </div>


  )
}

export default App;
