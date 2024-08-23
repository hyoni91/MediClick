import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
const Schedule = () => {
  
  const [value, onChange] = useState(new Date()) //초기값은 현재 날짜
  console.log(value)

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default Schedule