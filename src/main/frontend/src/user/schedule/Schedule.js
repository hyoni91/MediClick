import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import './Schedule.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import './Modal.css'
import { now } from 'moment/moment';

const Schedule = () => {

  // const nowDate = moment(now).locale
  // console.log(nowDate)

  const navigate = useNavigate()

  //모달창
  const [modalOpen, setModalOpen] = useState(false)
  const showModal = () => {
    setModalOpen(!modalOpen)
  }

  //이메일 보내기
  useEffect(()=>{
    emailjs.init(process.env.REACT_APP_Public_key)
  },[]);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_opia6hi', 'mediClick_tamplate', form.current, {
        publicKey: process.env.REACT_APP_Public_key,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...')
          console.log(error);
        },
      );
  };


  // 날짜를 계산
  const minDate = new Date(); // 현재 날짜
  minDate.setDate(minDate.getDate()+1) // 내일 날짜 
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3개월 후

  // 선택한 날짜 update
  const [value, onChange] = useState(minDate) //초기값설정

  //주말만 가져오기 
  const isWeekend = (date) => {
    const day = date.getDay();
    return day == 6 || day == 0; // 6:토,0:일
  };

   // tileDisabled 속성을 사용하여 주말 날짜를 비활성화
  const tileDisabled = ({ date }) => {
     //주말 날짜를 비활성화
    return isWeekend(date);
  };

  // 환자정보 불러오기
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  
  //예약 내용 저장할 변수
  const [appo, setAppo] = useState({
    docNum :'',
    memNum: loginInfo ? loginInfo.memNum : "", //로그인 회원 정보
    deptNum :1 , //진료과 테이블 오름차순기준으로 초기값 설정
    schDate: moment(value).format("YYYY-MM-DD"), //다음날을 기준일로 초기값
    schTime : '',
    detail:'',
    deptName:'',
    to_email : ''  //확정메일주소
  })


  // schDate를 선택하면 appo정보도 바뀌도록 설정(실시간으로 schDate갱신)
  useEffect(() => {
    setAppo(prevAppo => ({
      ...prevAppo,
      schDate: moment(value).format("YYYY-MM-DD")
    }));
  }, [value])


  // 예약 시간 input
  const timeInput = useRef();
  // 환자가 선택한 시간
  const choseData = useRef()

  // 예약 시간 선택
  function clickTime(e){
    //선택한 버튼 효과 유지
    var btns = document.querySelectorAll('.sch-button');
    btns.forEach(function (btn, i) {
      if (e.currentTarget == btn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    // 선택한 시간 정보 저장
    setAppo({...appo,
    [timeInput.current.name] : e.target.value
    })
  }

    // 진료과 의사 정보를 담을 변수 선언
    const [docInfo, setDocInfo] = useState([])

    // //의료진 진료과 정보 불러오기
    useEffect(()=>{
      axios.get('/schedule/getDocInfo')
      .then((res)=>{
        setDocInfo(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

  // 진료과 클릭 선택(의사,진료과정보 넘기기)
  function changeDocInfo(e){
    //선택한 진료과 버튼 효과 유지
    var btns = document.querySelectorAll('.button');
    btns.forEach(function (btn, i) {
      if (e.currentTarget == btn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    //선택한 진료과와 의사 정보 저장
    const selectedValue = e.target.value; //밸류값 문자열로 받기
    const { deptNum, docNum , deptName } = JSON.parse (selectedValue); //JSON 파싱 (객체로 다시 바꾸기)
    setAppo({
      ...appo,
      deptNum : deptNum,
      docNum : docNum,
      deptName: deptName
    })
  }

  console.log(appo)

  // 증상(detail) 정보 저장
  function changeDetail(e){
    setAppo({...appo,
      [e.target.name] : e.target.value
    })
  }

  // time 데이터
  const schTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  // schTimes길이 만큼 false값주기
  const [chkAppoTime, setChkAppoTime] = useState(new Array(schTimes.length).fill(false))

  //예약 유무 확인(예약된 시간 True -> 버튼 비활성화)
  useEffect(()=>{
    axios.post('schedule/checkSchTime',appo)
    .then((res)=>{
      console.log(res.data)
      // 예약이 있는 데이터 뽑아내기 
      const availableTimes = res.data.map(time => {
        // 초를 제외하고 분 단위만 남기기
        const [hours,minutes] = time.schTime.split(':')
        return `${hours}:${minutes}`})

      //schTimes와 비교하여 예약가능한 시간이 포함되어 있는지 확인
      //있으면 true 없으면 false
      const updatedChkAppoTime = schTimes.map(time => availableTimes.includes(time));
      // console.log(`updateTime: ` + updatedChkAppoTime)
      //체크를 끝났으면 chkAppoTime을 갱신 
      setChkAppoTime(updatedChkAppoTime)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[appo])

  //클릭하면 예약 실행
  function goAppo(){
    //증상 이외의 정보가 다 들어가 있는지 확인
    if(appo.memNum == ''){  //회원 번호가 없으면 로그인 페이지로 이동
      alert('로그인 후 이용해 주세요.') 
      navigate('/loginForm')
    }else if(appo.memRrn == '' || appo.schTime =='' || appo.docNum == ''){
      alert('예약 내용을 다시 확인해 주세요.') //빈 값이 있는 경우 예약버튼 실행안됨
    }else{
        //문제없으면 예약 테이블에 insert
    axios.post('/schedule/schInput', appo)
    .then((res)=>{
      //모달창띄우기
      showModal()
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }

  return (
    <div className='sch-container'>
      <div className='sch-header'>
        <div>
          <h3>진료예약</h3>
          <span>1234-1234</span>
          <p>평일 09:00~18:00</p>
          <p>주말 휴무</p>
        </div>
        <div className='sch-header-content'>
          <hr />
          <p>◾인터넷예약은 로그인 후 이용가능합니다.</p>
          <p>◾인터넷예약은 당일예약이  불가합니다.</p>
          <p>◾당일예약은 전화로 문의주세요.</p>
        </div>
      </div>
      <div >
        <div className='h1-flex'>
          <h1 className='h1tag'>step1-진료과 및 날짜선택</h1>
          <h1 className='h1tag'>step2-예약확정</h1>
        </div>
        <div className='sch-container-flex'>
          <div className='sch-flex'>
            <div  className='doc-icon-div'>
              {
                docInfo.map((doc,i)=>{
                  return(
                    <div key={i}>
                      <img src={(`http://localhost:8080/images/${i}.png`)}/>
                      <button 
                        type='button' 
                        onClick={(e)=>{
                        changeDocInfo(e)
                      }}  name='docInfo' className='button' value={JSON.stringify({deptNum :doc.medicalDept.deptNum, docNum : doc.docNum, deptName : doc.medicalDept.deptName })} >
                        {doc.medicalDept.deptName}
                        </button>
                    </div>
                  )
                })
                }
              </div>
              <div className='sch-calendar'>
                <Calendar 
                onChange={onChange} 
                value={value} 
                showNeighboringMonth={false} 
                next2Label={null}
                prev2Label={null}
                minDetail="year"
                // 오늘기준 과거는 클릭 비활성화
                minDate={minDate}
                // 오늘기준 3개월 까지만 클릭 활성화
                maxDate={maxDate}
                //날짜 칸에 보여지는 컨텐츠
                tileDisabled={tileDisabled}
                //비활성화 날짜 목록
                />
              </div>                      
              <div className='sch-time'>
                <div className='sch-btn'>
                      {schTimes.map((time,i) => (
                        <button
                        key={time} 
                        type='button' className='sch-button' 
                        disabled={chkAppoTime[i]} 
                        value={time} 
                        onClick={clickTime}>
                      {time}</button>))
                      }
                </div>
                <div className='sch-status'> 🟦선택중  ⬜예약불가능</div>
              </div>
            </div>
            <div className='schedule-table'>
              <table  >
                <colgroup>
                  <col width={'25%'}/>
                  <col width={'*'}/>
                </colgroup>
                <tbody>
                  <tr>
                    <td>예약날짜 : </td>
                    <td>
                      <input  type='text' readOnly 
                    value={moment(value).format("YYYY-MM-DD")}
                    name='schDate' ref={choseData} />
                    </td>
                  </tr>
                  <tr>
                    <td>예약시간 : </td>
                    <td>
                      <input 
                      type='text' 
                      name='schTime' 
                      value={appo.schTime} 
                      ref={timeInput} 
                      onChange={(e)=>{}}/></td>
                  </tr>
                  <tr>
                    <td>예약자명 : </td>
                    <td>
                      <input type='text' name='memName' readOnly 
                      value={loginInfo? loginInfo.memName : ""}/> 
                      </td>
                  </tr>
                  <tr>
                    <td>진료과목 : </td>
                    <td>
                      <input type='text' readOnly  value={appo.deptName}/>
                      </td>
                  </tr>
                  <tr>
                    <td>주민번호 : </td>
                    <td>
                      <input type='tel' name='' readOnly 
                    value={loginInfo? loginInfo.memRrn:""}/>
                    </td>
                  </tr>
                  <tr>
                    <td>증상</td>
                    <td><textarea placeholder='특이사항이나 증상을 자세히 기입바랍니다.' rows={6} cols={30} name='detail' onChange={(e)=>{changeDetail(e)}} /></td>
                  </tr>
                </tbody>
              </table>
              <div className='sch-footer'>
                <h5 className='h5tag'>*당일 예약은 전화로 문의주세요</h5>
                <div>상기 내용으로 예약하시겠습니까?</div>
                <button  type='button' 
                onClick={()=>{ 
                  goAppo(appo.memNum)
                }}
                >예약하기 </button>
              </div>
            </div>
        </div>
      </div>
      {
        modalOpen ? 
        <ReactModal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: {
              position: 'fixed',
              borderRadius : 10,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0, 0.6)'
            },
            content: {
              position: 'absolute',
              width: '550px',
              height: '40%',
              top: '180px',
              left: '40%',
              right: '60%',
              bottom: '50%',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              // padding: '20px'
            }
          }}
        >
          <div className='modal-div'>
            <div>
              <h3>예약 완료</h3>
              <hr />
              <div className='modal-content'>
                  예약이 완료되었습니다. <br/>
                  예약 메일을 받아보시려면 아래에 메일을 입력해 주세요.
                <div>       
                {/* 확정 메일 from */}
                <form ref={form}>
                  <input type='hidden' name='memName' 
                  value={loginInfo? loginInfo.memName : ""}/>
                  <input type='hidden' name='regDate' 
                  value={now}/>
                  <input type='hidden' name='schDate' 
                  value={appo.schDate}/>
                  <input type='hidden' name='schTime'  
                  value={appo.schTime}/>
                  <input type='hidden' name='deptName' 
                  value={appo.deptName}/>
                  <input type='hidden' name='memRrn' 
                  value={loginInfo? loginInfo.memRrn : ""}/>
                  <input type='hidden' name='from_name' 
                  value={'그린최고암센터'}/>
                  <input type='hidden' name='reply_to' 
                  value={'mediclick@email.com'}/>
                  <input type='text' placeholder='이곳에 메일주소를 입력해 주세요.'
                  name='to_email' 
                  onChange={(e)=>{
                    setAppo({
                    ...appo,
                    [e.target.name] : e.target.value})
                    }} />  
                </form>
                </div>
              </div>
              <button type='button' 
                onClick={(e)=>{
                  navigate(`/mySch/${appo.memNum}`)
                  sendEmail(e)
                  }}>확인</button>
              <button type='button' onClick={()=>{navigate(`/mySch/${appo.memNum}`)}}>취소</button>
            </div>
          </div>
        </ReactModal>
        :
        null
      }

    </div>
  )
}
export default Schedule