import React, { useEffect, useState } from 'react'
import './PatientChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { now } from 'moment';

const PatientChart = () => {
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  const memNum = loginInfo.memNum

  //예시를 위한
  const [charts, setChats] = useState([])

  //화면 좌측에 표시될 진료 기록들
  useEffect(()=>{
    axios.get(`/patientChart/memberSelect/${memNum}`)
    .then((res)=>{
      setChats(res.data)
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
      alert(error)
    })
  },[])


  return (
    <div className='p-chart'>
      <div>
        진료차트
        
      </div>
      <div className='p-chart-container'>
        <div className='p-chart-side'>
          <div className='p-chart-side-content'>
            <p>진료날짜:2024-09-13</p>
            <p>진료번호:01</p>
            <p>증상:머리가아파요</p>
            <p>검사:x-ray</p>
            <p>처방:oooooo 7일분</p>
          </div>
          <div className='p-chart-side-content'>
            <p>진료날짜:2024-09-13</p>
            <p>진료번호:01</p>
            <p>증상:머리가아파요</p>
            <p>검사:x-ray</p>
            <p>처방:oooooo 7일분</p>
          </div>
          <div className='p-chart-side-content'>
            <p>진료날짜:2024-09-13</p>
            <p>진료번호:01</p>
            <p>증상:머리가아파요</p>
            <p>검사:x-ray</p>
            <p>처방:oooooo 7일분</p>
          </div>
        </div>
        <div className='p-chart-content'>
          <div>진료내용</div>
          <div>검사결과</div>
        </div>
        <div className='p-chart-rigthside'>
          <div>처방내용</div>
          <div>뭐넣지</div>
          <div>뭐넣지</div>
        </div>
      </div>
    </div>
  )
}

export default PatientChart