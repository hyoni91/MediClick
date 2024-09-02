import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import UserLayout from './user/UserLayout';
import AdminLayout from './admin/AdminLayout';
import MedicalDoctor from './user/MedicalDoctor';
import JoinForm from './user/JoinForm';
import Schedule from './user/Schedule';
import { useEffect, useState } from 'react';
import DocMemList from './admin/DocMemList';
import MySch from './user/MySch';
import DocMemInfo from './admin/DocMemInfo';
import AdminJoinForm from './user/AdminJoinForm';
import DoctorUpdate from './admin/DoctorUpdate';
import UserService from './user/UserService';
import PatientChart from './admin/PatientChart';

function App() {
  const navigate=useNavigate()
  const {kakao}=window;

  //로그인 정보를 저장할 수 있는 state변수
  const [loginInfo,setLoginInfo]=useState({})


  const loginInfoString=window.sessionStorage.getItem('loginInfo')

  useEffect(()=>{
    if(loginInfoString!=null){
      setLoginInfo(JSON.parse(window.sessionStorage.getItem('loginInfo')))
    }

  },[])
  
  //로그아웃
  function goLogout(){
    window.sessionStorage.removeItem('loginInfo')
    setLoginInfo({})
    alert('로그아웃되었습니다.')
    navigate('/')
  }

  



  return (
    <div className="container">

      <div className='main'>
        <div className='header'>
          {/* 헤더 */}
          
          <div className='mid-header'>
            {
              Object.keys(loginInfo).length==0
              ?
              <ul>
                <li><span onClick={(e)=>{navigate('/loginForm')}}>로그인</span></li>
                <li><span onClick={()=>{navigate('/JoinForm')}}>회원가입</span></li>
              </ul>
              :
              <ul>
                {
                  loginInfo.memNum.includes('DOC')?
                  <li><span onClick={(e)=>{navigate(`/admin/DocMemList/${loginInfo.memNum}`)}}>{loginInfo.memName}님</span></li>
                  :
                  <li><span onClick={(e)=>{navigate(`/mySch/${loginInfo.memNum}`)}}>{loginInfo.memName}님</span></li>
                }
                
                <li><span onClick={(e)=>{navigate('/admin/doctorUpdate')}}>정보수정하기</span></li>
                <li><span onClick={(e)=>{goLogout()}}>로그아웃</span></li>
              </ul>
            }
            
          </div>

        </div>
  
        
  

      </div>
      <div className='main-routers'>
  
        <Routes>
          
  
          {/* 유저용 */}
          <Route path='/' element={<UserLayout/>}>
            {/* 메인페이지 */}
            <Route path='/' element={<Home loginInfo={loginInfo}/>}/>
            {/* 로그인 페이지 */}
            <Route path='loginForm' element={<LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}/>
            {/* 환자별 예약확인 페이지 */}
            <Route path='mySch/:memNum' element={<MySch/>}/>
            {/* 진료과/의료진 페이지 */}
            <Route path='medicalDoctor' element={<MedicalDoctor />}/>
            {/* 회원가입 페이지 */}
            <Route path='joinForm' element={<JoinForm/>}/>
            {/* 회원가입 시 관리자일 경우 정보 추가 */}
            <Route path='adminJoinForm/:docNum' element={<AdminJoinForm />} />
            {/* 예약 화면 페이지 */}
            <Route path='scheduleForm' element={<Schedule/>}/>
            {/* 고객서비스 페이지 */}
            <Route path='userService' element={<UserService/>}/>
          </Route>
  
  
          {/* 관리자용 */}
          <Route path='/admin' element={<AdminLayout/>}>
            {/* 의사별 담당환자 확인 */}
            <Route path='docMemList/:docNum' element={<DocMemList/>}/>
            {/* 담당환자 상세정보 */}
            <Route path='docMemInfo/:schNum' element={<DocMemInfo/>}/>
            {/* 의사 정보수정 페이지 */}
            <Route path='doctorUpdate' element={<DoctorUpdate/>}/>
            {/* 진료차트 */}
            <Route path='patientChart/:schNum' element={<PatientChart/>}/>
          </Route>
      </Routes>
      </div>


      <div className='footer-mid'>

          <div className='mid-div'>
            <div>
              <h3>대표전화</h3>
              <p>052-716-3199</p>
            </div>
            <div>
              <h4>ㅇㅇ 병원</h4>
              <p>울산 남구 삼산중로100번길 26 케이엠빌딩 1~4층</p>
            </div>
          </div>


      </div>
      <div className='footer-bottom'>
        <div>환자의 권리와 의무 | 개인정보처리방침 | 웹 이용약관</div>
      </div>

    </div>
  );
}

function Kakao(){
  const {kakao}=window

  useEffect(()=>{
    const container=document.getElementById('map')
    const options={
      // center:new.kakao.maps.
      level : 3
    }
  },[])

  return(
    <div id='map'>

    </div>
  )

}

const Home=({loginInfo})=>{
  const navigate=useNavigate()


  return(

    <div>
      <div className='main-img'>
        {/* 메인이미지 */}
        <img src='http://localhost:8080/images/IMG_2611.jpeg'/>
      </div>
  
      
      <div className='mid-main'>
        <h3>주요 서비스</h3>
    
        <div className='mid-divs'>
          <div onClick={(e)=>{navigate('/medicalDoctor')}}>
            <div><i class="bi bi-hospital"></i></div>
            <div>진료과목</div>
          </div>
    
          <div>
            <div><i class="bi bi-search"></i></div>
            <div>진료안내</div>
          </div>
    
          <div onClick={(e)=>{
            {
              Object.keys(loginInfo).length==0
              ?
              navigate('/loginForm')
              :
              navigate(`/mySch/${loginInfo.memNum}`)
            }
          }}>
            <div><i class="bi bi-clipboard-data"></i></div>
            <div>예약 조회</div>
          </div>
          
        </div>

        <div className='miniMap'>
          <div id='map'><Kakao/></div>

        </div>

      </div>
  
    </div>

    
  )
}
export default App;
