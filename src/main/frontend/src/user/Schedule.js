import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import './Schedule.css'
import axios from 'axios';
import { now } from 'moment/moment';
import { useNavigate } from 'react-router-dom';


const Schedule = () => {

  const navigate = useNavigate()
  
  // 날짜를 계산
  const minDate = new Date(); // 현재 날짜
  minDate.setDate(minDate.getDate()+1) // 내일 날짜 
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3개월 후
  // 선택한 날짜 update
  const [value, onChange] = useState(minDate) //초기값은 현재 날짜

  //주말만 가져오기 
  const isWeekend = (date) => {
    const day = date.getDay();
    return day == 6 || day == 0; // 6: Saturday, 0: Sunday
  };

   // tileDisabled 속성을 사용하여 주말 날짜를 비활성화
  const tileDisabled = ({ date }) => {
    return isWeekend(date); // 주말 날짜를 비활성화
  };



  // 환자정보 불러오기
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
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


  //예약 내용 저장할 변수
  const [appo, setAppo] = useState({
    docNum : 7,
    memNum: loginInfo ? loginInfo.memNum : "",
    deptNum :1 ,
    schDate: moment(value).format("YYYY-MM-DD"),
    schTime : '',
    detail:'',
    deptName:'유방암 외과'
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

  // 진료과 클릭 선택(의사,진료과정보 넘기기)
  function changeDocInfo(e){
    //선택한 버튼 효과 유지
    var btns = document.querySelectorAll('.button');
    btns.forEach(function (btn, i) {
      if (e.currentTarget == btn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    //선택한 진료과와 의사선택 
    const selectedValue = e.target.value; // JSON 문자열
    const { deptNum, docNum , deptName } = JSON.parse(selectedValue); // JSON 파싱
    setAppo({
      ...appo,
      deptNum : deptNum,
      docNum : docNum,
      deptName: deptName
    })
  }




  // 증상 정보 받기
  function changeDetail(e){
    setAppo({...appo,
      [e.target.name] : e.target.value
    })
  }

  //클릭하면 예약 실행
  function goAppo(){
    //증상 이외의 정보가 다 들어가 있는지 확인
    if(appo.memNum == ''){
      alert('로그인 후 이용해 주세요.')
      navigate('/loginForm')
    }else if(appo.memRrn == '' || appo.schTime ==''){
      alert('예약 내용을 다시 확인해 주세요.')
    }else{
        //다 들어가 있으면 쿼리실행
    axios.post('/schedule/schInput', appo)
    .then((res)=>{
      alert('예약이 완료되었습니다.')
      //본인 예약 확인페이지로 넘어가기
      navigate('')
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }

  // time 데이터
  const schTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  //예약유무확인(타임버튼 비활성화를 위한)
  // schTimes길이 만큼 false값주기
  const [chkAppoTime, setChkAppoTime] = useState(new Array(schTimes.length).fill(false))

  useEffect(()=>{
    axios.post('schedule/checkSchTime',appo)
    .then((res)=>{
      // 예약가능한 시간을 저장하는 변수
      const availableTimes = res.data.map(time => {
        // 초를 제외하고 분 단위만 남기기
        const [hours, minutes] = time.schTime.split(':')
        return `${hours}:${minutes}`})

      //schTimes와 비교하여 예약가능한 시간이 있는지 체크
      const updatedChkAppoTime = schTimes.map(time => availableTimes.includes(time));
      // console.log(`updateTime: ` + updatedChkAppoTime)
      //체크를 끝냈으면 chkAppoTime을 갱신 
      setChkAppoTime(updatedChkAppoTime)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[appo])

  console.log(appo)
  
  return (
    <div className='sch-container'>
      <div className='sch-container-flex'>
        <div className='sch-flex'>
          <div className='h3tag'>진료과 선택</div>
          <div  className='doc-icon-div'>
            {
              docInfo.map((doc,i)=>{
                return(
                  <div key={i}>
                    <img src={(`http://localhost:8080/images/${i}.png`)}/>
                    <button type='button' onClick={(e)=>{
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
            <div  className='h3tag'>진료일 선택</div>
              <Calendar 
              onChange={onChange} 
              value={value} 
              showNeighboringMonth={false} 
              next2Label={null}
              prev2Label={null}
              minDetail="year"
              minDate={minDate}
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
                      key={time} type='button' className='sch-button' disabled={chkAppoTime[i]} value={time} onClick={clickTime}>
                    {time}</button>))
                    }
              </div>
              <div className='sch-status'> 🟦선택중  ⬜예약불가능</div>
              
            </div>
          </div>
          <div className='schedule-table'>
            <div  className='h3tag'>예약내용</div>
            <table>
              {/* <colgroup>
              <col width={'23%'}/>
              <col width={'*'}/>
              </colgroup> */}
              <tbody>
                <tr>
                  <td>예약날짜</td>
                  <td>
                    <input  type='text' readOnly 
                  value={moment(value).format("YYYY-MM-DD")}
                  name='schDate' ref={choseData} />
                  </td>
                </tr>
                <tr>
                  <td>예약시간</td>
                  <td><input type='text' name='schTime' value={appo.schTime}  ref={timeInput} onChange={(e)=>{}}/></td>
                </tr>
                <tr>
                  <td>예약자명</td>
                  <td>
                    <input type='text' name='memName' readOnly 
                    value={loginInfo? loginInfo.memName : ""}/> 
                    </td>
                </tr>
                <tr>
                  <td>진료과목</td>
                  <td>
                    <input type='text' readOnly  value={appo.deptName}/>
                    </td>
                </tr>
                <tr>
                  <td>주민번호</td>
                  <td>
                    <input type='tel' name='' readOnly 
                  value={loginInfo? loginInfo.memRrn:""}/>
                  </td>
                </tr>
                <tr>
                  <td>증상</td>
                  <td><textarea rows={6} cols={41} name='detail' onChange={(e)=>{changeDetail(e)}} /></td>
                </tr>
              </tbody>
            </table>
            <h5 className='h5tag'>*당일 예약은 전화로 문의주세요</h5>
            
            <div className='sch-footer'>
              <div>상기 내용으로 예약하시겠습니까?</div>
              <button  type='button' onClick={()=>{goAppo()}}>예약하기 </button>
            </div>
          </div>
      </div>
      
    </div>
  )
}
export default Schedule


// select로 진료과 정보 가져오기

          {/* <select name='docInfo' onChange={(e)=>{changeDocInfo(e)}} className='sch-select'>
            {
              docInfo.map((doc,i)=>{
                return(
                  <option key={i} value={JSON.stringify({deptNum :doc.medicalDept[0].deptNum, docNum : doc.docNum, deptName : doc.medicalDept[0].deptName })} >
                    {doc.medicalDept[0].deptName}
                  </option>
                )
              })
            }
            </select> */}


// 모든 예약 정보를 입력했을때 예약정보 확인
// //예약유무확인
// const [chkAppo, setChkAppo] = useState(false)
// useEffect(()=>{
//   axios.post('/schedule/checkAppo',appo)
//   .then((res)=>{
//     console.log(res.data)
//       if(res.data != ''){
//         alert('스케줄 중복')
//       }return;
//     })
//   .catch((error)=>{
//     console.log(error)
//   })
// },[appo])