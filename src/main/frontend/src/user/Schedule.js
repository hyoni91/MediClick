import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import './Schedule.css'

const Schedule = () => {
  
  const [value, onChange] = useState(new Date()) //초기값은 현재 날짜
  console.log(value)

  return (
    <div>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div>
        예약시간 선택
        <div>예약시간 띄우기</div>
      </div>
      <div className='schedule-table'>
        <table>
          <colgroup>
          <col width={'40%'}/>
          <col width={'*'}/>
          </colgroup>
          <tbody>
            <tr>
              <td>예약날짜</td>
              <td><input type='text' readOnly value={moment(value).format("YYYY-MM-DD")}/></td>
            </tr>
            <tr>
              <td>예약시간</td>
              <td><input type='text' /></td>
            </tr>
            <tr>
              <td>예약자명</td>
              <td><input type='text' name=''/> </td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td><input type='tel' name=''/></td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div>상기 내용으로 예약하시겠습니까?</div>
      <div>
        <button type='button'>예약 확정</button>
      </div>
    </div>
  )
}

export default Schedule