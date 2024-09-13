import React, { useEffect, useState } from 'react'
import './PatientChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { now } from 'moment';

const PatientChart = () => {
  const {memNum} = useParams()

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
      <h1>
      </h1>
      <div className='p-chart-container'>
        <div className='p-chart-side'>
          <h3>환자정보</h3>
          <h4> 
          <i className="fa-regular fa-user"></i>
            CTL_00001 유자씨 
          </h4> 
          <h3>내원이력</h3>
          {
            charts.map((chart,i)=>{
              return(
                <div key={i} className='p-chart-side-content'>
                <p>진료번호 : {chart.chartNum}</p>
                <p>진료날짜 : {chart.chartDate}</p>
                <p>증상 : {chart.symptom}</p>
                <p>검사 : {chart.checkUp}</p>
                <p>처방 : {chart.prescription}</p>
              </div>
              )
            })
          }
        </div>
        <div className='p-chart-content'>
          <div>
              <p>날짜 : 2024-09-13(금)</p>
              <span>접수정보</span>
          </div>
          <div>
              <h4>증상</h4>
              <div>이곳에 예약 증상 불러오기 </div>
          </div>
          <div>
            <h4>진료</h4>
            <div>
              진료차트 테이블 내용 불러와서 input 
              <p>증상 어쩌고 저쩌고</p>
              <p>병명 어쩌고 저쩌고 </p>
            </div>
          </div>
          <div>
            <h4>검사</h4>
            <div>
              검사가 필요하다면 검사 input 
              <p>xray 촬영</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className='p-chart-rigthside'>
          <h3>처방전</h3>
            <div>뭐넣지</div>
            <div>뭐넣지</div>          
        </div>
      </div>
    </div>
  )
}

export default PatientChart