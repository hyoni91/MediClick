import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import './Schedule.css'
import axios from 'axios';
import { now } from 'moment/moment';

const Schedule = () => {
  const [value, onChange] = useState(new Date()) //초기값은 현재 날짜
  
  // 오늘 날짜 기준으로 3개월 후의 날짜를 계산
  const minDate = new Date(); // 현재 날짜
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3개월 후

  // member정보 불러오기
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  // 진료과 의사 정보를 담을 변수 선언
  const [docInfo, setDocInfo] = useState([])

  //의료진 진료과 정보 불러오기
  useEffect(()=>{
    axios.get('/schedule/getDocInfo')
    .then((res)=>{
      setDocInfo(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  // 예약 내용 저장할 변수
  const [appo, setAppo] = useState({
    docNum : 7,
    memNum: loginInfo ? loginInfo.memNum : "",
    deptNum :1 ,
    schDate: moment(value).format("YYYY-MM-DD"),
    schTime : '',
    detail:'',
    deptName:'유방암 외과'
  })

  // schDate를 선택하면 appo정보도 바뀌도록 설정
  useEffect(() => {
    setAppo(prevAppo => ({
      ...prevAppo,
      schDate: moment(value).format("YYYY-MM-DD")
    }));
  }, [value])

  console.log(appo)

  // 예약 시간 input
  const timeInput = useRef();
  // 환자가 선택한 시간
  const choseData = useRef()

  // 예약 시간 선택
  function clickTime(e){
    setAppo({...appo,
    [timeInput.current.name] : e.target.value
    })
  }

  // 의료진과 진료과 정보 동시에 받기
  function changeDocInfo(e){
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
    axios.post('/schedule/schInput', appo)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

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

  //예약유무확인(타임버튼 비활성화를 위한)
  const availableTimes = [false,false,false,false,false,false,false,false]
  const [chkAppoTime, setChkAppoTime] = useState([availableTimes])
  useEffect(()=>{
    axios.post('schedule/checkSchTime',appo)
    .then((res)=>{
      console.log(res.data)
      // 예약 가능 여부 배열로 저장
      res.data.forEach((time, i)=>{
        if(time != ''){
          availableTimes[i]= true
          setChkAppoTime(availableTimes)
          
        }
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  },[appo])

  console.log(chkAppoTime)

  return (
    <div className='sch-container'>
      <div className='sch-flex'>
      {/* <h3>예약날짜</h3> */}
        <div className='sch-calendar'>
        <div>진료과 선택</div>
          <select name='docInfo' onChange={(e)=>{changeDocInfo(e)}} className='sch-select'>
            {
              docInfo.map((doc,i)=>{
                return(
                  // <option key={i} 
                  // value={doc.docNum} > {doc.medicalDept[0].deptName}
                  // </option> 
                  <option key={i} value={JSON.stringify({deptNum :doc.medicalDept[0].deptNum, docNum : doc.docNum, deptName : doc.medicalDept[0].deptName })} >
                    {doc.medicalDept[0].deptName}
                  </option>
                )
              })
            }
            </select>
          <Calendar 
          onChange={onChange} 
          value={value} 
          showNeighboringMonth={false} 
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          minDate={minDate}
          maxDate={maxDate}
          />
        </div>
        <div className='sch-time'>
          <div className='sch-btn'>
                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time,i) => (
                  <button
                  key={time} type='button' disabled={chkAppoTime[i]} value={time} onClick={clickTime}>
                {time}</button>))
                }
          </div>
          <div className='sch-status'>🟧예약가능 ⬜ 예약불가능</div>
        </div>
        </div>
        <div className='schedule-table'>
          <table>
            <colgroup>
            <col width={'23%'}/>
            <col width={'*'}/>
            </colgroup>
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
                  {/* <select name='docInfo' onChange={(e)=>{changeDocInfo(e)}} className='sch-select'>
                    {
                      docInfo.map((doc,i)=>{
                        return(
                          // <option key={i} 
                          // value={doc.docNum} > {doc.medicalDept[0].deptName}
                          // </option> 
                          <option key={i} value={JSON.stringify({deptNum :doc.medicalDept[0].deptNum, docNum : doc.docNum })} >
                            {doc.medicalDept[0].deptName}
                          </option>
                        )
                      })
                    }
                  </select> */}
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
                <td><textarea rows={5} cols={40} name='detail' onChange={(e)=>{changeDetail(e)}} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      <div className='sch-footer'>상기 내용으로 예약하시겠습니까?</div>
      <div className='sch-footer'>
        <button  type='button' onClick={()=>{goAppo()}}>예약하기 </button>
      </div>
    </div>
  )
}

export default Schedule;