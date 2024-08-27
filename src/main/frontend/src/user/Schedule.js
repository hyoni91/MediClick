import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import './Schedule.css'
import axios from 'axios';

const Schedule = () => {
  // member정보 불러오기
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  console.log(loginInfo)
  // 진료과 의사 정보 불러오기
  useEffect(()=>{
    axios.get('/schedule/getDocInfo')
    .then((res)=>{
      console.log(res.data)
    })
    .catch()
  },[])
  



  const [value, onChange] = useState(new Date()) //초기값은 현재 날짜

  // 예약 내용 저장할 변수
  const [appo, setAppo] = useState({
    memNum:loginInfo.memNum,
    docNum : '',
    deptNum : '',
    schData: moment(value).format('YYYY-MM-DD'),
    detail:'',
    time : ''
  })

  // 예약 시간 input
  const timeInput = useRef();
  // 환자가 선택한 시간
  const choseData = useRef()

  // 시간을 클릭 
  function clickTime(e){
    setAppo({...appo,
    [timeInput.current.name] : e.target.value
    })
  }

  // 증상 onchange
  function changeDetail(e){
    setAppo({...appo,
      [e.target.name] : e.target.value
    })
  }

  console.log(appo)

  return (
    <div className='sch-container'>
      <div className='sch-flex'>
      <h3>예약날짜</h3>
        <div className='sch-calendar'>
          <Calendar 
          onChange={onChange} 
          value={value} 
          showNeighboringMonth={false} 
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          />
        </div>
        <div className='sch-time'>
          <hr />
          <h3>예약시간</h3>
          <div className='sch-btn'>
            <button type='button' value={'09:00'}  onClick={(e)=>{clickTime(e)}}> 09:00</button>
            <button type='button' value={'10:00'}  onClick={(e)=>{clickTime(e)}}> 10:00</button>
            <button type='button' value={'11:00'}  onClick={(e)=>{clickTime(e)}}> 11:00</button>
            <button type='button' value={'12:00'}  onClick={(e)=>{clickTime(e)}}> 12:00</button>
            <button type='button' value={'15:00'}  onClick={(e)=>{clickTime(e)}}> 15:00</button>
            <button type='button' value={'16:00'}  onClick={(e)=>{clickTime(e)}}> 16:00</button>
            <button type='button' value={'17:00'}  onClick={(e)=>{clickTime(e)}}> 17:00</button>
          </div>
          <div className='sch-status'>🟧예약가능 ⬜ 예약불가능</div>
        </div>
      </div>
      <div className='schedule-table'>
        <table>
          <colgroup>
          <col width={'25%'}/>
          <col width={'*'}/>
          </colgroup>
          <tbody>
            <tr>
              <td>예약날짜</td>
              <td>
                <input  type='text' readOnly 
              value={moment(value).format("YYYY-MM-DD")}
              name='schDate' ref={choseData}/>
              </td>
            </tr>
            <tr>
              <td>예약시간</td>
              <td><input type='text' name='time' value={appo.time}  ref={timeInput} onChange={(e)=>{}}/></td>
            </tr>
            <tr>
              <td>예약자명</td>
              <td><input type='text' name='memName' readOnly value={loginInfo.memName}/> </td>
            </tr>
            <tr>
              <td>진료과목</td>
              <td><input type='text' name='' value={'예)산부인과'} onChange={(e)=>{}} / ></td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td><input type='tel' name='' readOnly value={loginInfo.memRrn}/></td>
            </tr>
            <tr>
              <td>증상</td>
              <td><textarea rows={5} cols={41} name='detail' onChange={(e)=>{changeDetail(e)}} /></td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div>상기 내용으로 예약하시겠습니까?</div>
      <div className='sch-footer'>
        <button  type='button'>예약하기 </button>
      </div>
    </div>
  )
}

export default Schedule;