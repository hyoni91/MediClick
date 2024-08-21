import logo from './logo.svg';
import './App.css';
import './reset.css';

function App() {


  return (
    <div className="container">

      <div className='main'>
        <div className='header'>
          {/* 헤더 */}
          <div className='logo'>MediClick</div>
          <ul>
            <li><span>로그인</span></li>
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
  
        <div className='main-img'>
          {/* 메인이미지 */}
          <img src='http://localhost:8080/images/IMG_2611.jpeg'/>
        </div>
      </div>

    </div>
  );
}

export default App;
