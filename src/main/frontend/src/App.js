import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './user/login_join/LoginForm';
import JoinForm from './user/login_join/JoinForm';
import AdminJoinForm from './user/login_join/AdminJoinForm';
import UserLayout from './user/UserLayout';
import AdminLayout from './admin/AdminLayout';
import MedicalDoctor from './user/medicalDoctor/MedicalDoctor';
import Schedule from './user/schedule/Schedule';
import { useEffect, useState } from 'react';
import DocMemList from './admin/DocMemList';
import MySch from './user/schedule/MySch';
import DocMemInfo from './admin/DocMemInfo';
import DoctorUpdate from './admin/DoctorUpdate';
import UserService from './user/board/UserService';
import PatientChart from './admin/PatientChart';
import UserServiceMain from './user/board/UserServiceMain';
import UserServiceDetail from './user/board/UserServiceDetail';
import UserServiceUpdate from './user/board/UserServiceUpdate';
import markerImage from './assets/marker.png';
import StatChart from './user/StatChart';
import ExampleComponent from './user/test';
import BloodRefrigerator from './admin/BloodRefrigerator';
import TempData from './admin/TempData';
import MiniBoard from './user/board/MiniBoard';
import axios from 'axios';
import MapTest1 from './admin/MapTest1';
import ChartList from './admin/ChartList';
import DocSchManage from './admin/DocSchManage';
import ProviderLayout from './provider/ProviderLayout';
import Order from './admin/Order';
import ManageCustomer from './provider/ManageCustomer';
import MSCategory from './provider/MSCategory';
import MedicalSupplies from './provider/MedicalSupplies';
import Orders from './provider/providerCustom/Orders';
import OrderList from './admin/OrderList';
import OrderDetail from './provider/providerCustom/OrderDetail';
import DeliryveryCheck from './provider/DeliryveryCheck';
import Inventory from './provider/Inventory';



function App() {
  const navigate=useNavigate()
  const {kakao}=window;
  
  // 홈페이지를 열었을때, 과거 예약 자동삭제
    useEffect(()=>{
      axios.delete(`/schedule/delete`)
      .then((res)=>{
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

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
                  <li><span onClick={(e)=>{navigate(`/admin/docMemList/${loginInfo.memNum}`)}}>{loginInfo.memName}님</span></li>
                  :
                  loginInfo.memNum.includes('CTL')?
                  <li><span onClick={(e)=>{navigate(`/mySch/${loginInfo.memNum}`)}}>{loginInfo.memName}님</span></li>
                  :<li><span onClick={(e)=>{navigate(`/provider/deliveryCheck`)}}>{loginInfo.memName}님</span></li>
                }
                
                <li><span onClick={(e)=>{navigate(`/admin/doctorUpdate/${loginInfo.memNum}`)}}>정보수정하기</span></li>
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
            {/* ?? */}
            {/* <Route path='/??' element={<ExampleComponent/>} /> */}
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
            <Route path='userServiceMain' element={<UserServiceMain loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}/>
            {/* 고객서비스 글 작성 화면 페이지 */}
            <Route path='userService' element={<UserService/>}/>
            {/* 고객서비스 게시글 상세 페이지 */}
            <Route path='detail/:boardNum' element={<UserServiceDetail loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}/>
            {/* 고객서비스 게시글 수정 페이지 */}
            <Route path='userServiceUpdate/:boardNum' element={<UserServiceUpdate loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}/>
            {/* 차트 */}
            <Route path='statChart' element={<StatChart/>}/>
            {/* 메인, 최근 게시글 */}
            <Route path='miniBoard' element={<MiniBoard/>}/>
          </Route>
  
  
          {/* 관리자용 */}
          <Route path='/admin' element={<AdminLayout loginInfo={loginInfo}/>}>
            {/* 의사별 담당환자 확인 */}
            <Route path='docMemList/:docNum' element={<DocMemList/>}/>
            {/* 담당환자 상세정보 */}
            <Route path='docMemInfo/:schNum' element={<DocMemInfo loginInfo={loginInfo}/>}/>
            {/* 의사 정보수정 페이지 */}
            <Route path='doctorUpdate/:docNum' element={<DoctorUpdate/>}/>
            {/* 환자차트항목 */}
            <Route path='chartList' element={<ChartList />}/>
            {/* 진료차트 */}
            <Route path='patientChart/:memNum/:memName' element={<PatientChart/>}/>
            {/* 혈액냉장고관리 페이지 */}
            <Route path='BloodRefrigerator' element={<BloodRefrigerator />}/>
            {/* 온도 차트 연습 */}
            <Route path='tempdata' element={<TempData/>}/>
            {/* 지도 api 연습 */}
            <Route path='mapTest' element={<MapTest1/>}/>
            {/* 의사 스케줄관리 */}
            <Route path='docSch' element={<DocSchManage/>}/>
            {/* 발주페이지 : 상품 주문 */}
            <Route path='order' element={<Order/>}/>
            {/* 발주페이지 : 주문 내역*/}
            <Route path='orderList' element={<OrderList/>}/>
          </Route>

          
          {/* 공급자 계정 */}
          <Route path='/provider' element={<ProviderLayout/>}>
            {/* 거래처/ 매출처 관리 */}
            <Route path='manageCustomer' element={<ManageCustomer/>}/>
            {/* 품목 / 카테고리관리 */}
            {/* 품목 / 제품 관리 */}
            <Route path='medicalSupplies' element={<MedicalSupplies/>} />
            {/* 품목 / 입고 등록 */}
            {/* 주소 / 주문(수주) 입력 */}
            <Route path='orders' element={<Orders />}/>
            <Route path='order_detail/:requestNum' element={<OrderDetail />}/>
            {/* 주소 / 수주 주문서 */}
            {/* 주소 / 공급받는 용도 납품서 */}
            {/* 주소 / 수주(납품) 현황 */}
            {/* 현황 / 월별 매출 현황 */}
            {/* 현황 / 현 재고 현황 */}
            <Route path='inventory' element={<Inventory/>}/>
            {/* 배달 현황 */}
            <Route path='deliveryCheck' element={<DeliryveryCheck setLoginInfo={setLoginInfo} loginInfo ={loginInfo}/>} />
          </Route>

      </Routes>


      </div>




    </div>
  );
}

//카카오 맵 띄우기
function KakaoMap(){
  
  const {kakao}=window

  useEffect(()=>{
    const container=document.getElementById('map')

    //현재 위치를 가져오는 함수
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}=position.coords

      const options={
        center:new kakao.maps.LatLng(latitude,longitude),
        level:3,
      }

    })

    const options={
      center:new kakao.maps.LatLng(35.54210, 129.3382),
      level : 3
    }

    //지도 생성
    const map=new kakao.maps.Map(container,options)

    //현재 위치 표시 마커
    const usermarker=new kakao.maps.Marker({
      position:new kakao.maps.LatLng(35.54210, 129.3382),
      image:new kakao.maps.MarkerImage(markerImage,new kakao.maps.Size(50,50),{
        offset:new kakao.maps.Point(25,50),
      })
    })
  
    usermarker.setMap(map)


  },[])


}

const Home=({loginInfo})=>{
  const navigate=useNavigate()


  return(

    <div>
      <div className='main-img'>
        {/* 메인이미지 */}
        <img src='http://localhost:8080/images/IMG_2611.jpeg'/>
        <div>
          {/* 언젠가 텍스트 추가할 예정 */}
          <p></p>
          <p></p>
        </div>
      </div>
  
      
      <div className='mid-main'>
        
    
        <div className='mid-container'>

          {/* <h1>주요 서비스</h1> */}

          <div className='mid-divs'>
            <div onClick={(e)=>{navigate('/medicalDoctor')}}>
              <div><i class="bi bi-hospital"></i></div>
              <div>진료과목</div>
            </div>
      
            <div>
              <div><i class="bi bi-search"></i></div>
              <div>진료안내</div>
            </div>

            <div>
              <div><i class="bi bi-heart-pulse"></i></div>
              <div>건강검진</div>
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
          
        </div>

        <div className='main-plus'>
          <div className='miniMap'>
            <h1>오시는 길</h1>
            <div id='map'><KakaoMap/></div>
          </div>

          {/* 버스 */}

          <div className='main-detail'>
            
            {/* 게시판 */}
            
            <div>
              <h3>고객 서비스</h3>
              <div><MiniBoard/></div>
            </div>
            {/* 차트 */}
            <div>
              <h3>보건 의료 통계</h3>
              <div><StatChart/></div>
            </div>
          </div>

        </div>

      </div>
  
    </div>

    
  )
}
export default App;
