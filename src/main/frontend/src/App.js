import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import UserLayout from './user/UserLayout';

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
  
        
  

      </div>

      <Routes>
        {/* 유저용 */}
        <Route path='/' element={<UserLayout/>}>
          <Route path='/loginForm' element={<LoginForm/>}/>
        </Route>
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
