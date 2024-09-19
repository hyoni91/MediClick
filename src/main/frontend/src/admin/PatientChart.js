import React, { useEffect, useState } from 'react'
import './PatientChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { now } from 'moment';

const PatientChart = () => {
  const {memNum} = useParams()
  //의사 정보 불러오기
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  const docNum = loginInfo.memNum

  //과거진료정보 
  const [charts, setChats] = useState([])
  //예약정보가 있으면 입력
  const [schedule, setScedule] = useState({
    docNum : docNum,
    memNum : memNum,
    detail : '',
    schNum : 0
  })
  //진료차트입력
  const [newChart, setNewChart] = useState({})
  //처방전입력
  const [medicine, setMedicine] = useState({})


  //화면 좌측:진료기록리스트
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

  //화면 중앙: 예약정보
  useEffect(()=>{
    axios.post(`/patientChart/nowSchedule`,schedule)
    .then((res)=>{
      setScedule({
        docNum : res.data.docNum,
        detail : res.data.detail,
        schNum : res.data.schNum,
        memNum : res.data.memNum
      }
      )
    })
    .catch((error)=>{
      alert(error)
      console.log(error)
    })
  },[])
  console.log(schedule)

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
            charts.length == 0?
            <div>내원 이력이 없습니다.</div>
            :
            charts.map((chart,i)=>{
              return(
                <div key={i} className='p-chart-side-content'>
                <p>진료번호 : {chart.chartNum}</p>
                <p>진료날짜 : {chart.chartDate}</p>
                <p>진료 : {chart.symptom}</p>
                <p>검사 : {chart.checkUp}</p>
                <p>처방 : {chart.prescription}</p>
              </div>
              )
            })
          }
        </div>
        <div className='p-chart-content'>
          <div>
              <p>날짜 :YYYY-MM-DD(day)</p>
              <span>접수정보</span>
          </div>
          <div>
              <h4>증상</h4>
              <div>{schedule.detail}</div>
          </div>
          <div>
            <h4>진료</h4>
            <div>
              <textarea name=''>
                </textarea>
            </div>
          </div>
          <div>
            <h4>검사 및 결과</h4>
            <div>
              <textarea name=''>
                
              </textarea>
            </div>
          </div>
        </div>
        <div className='p-chart-rigthside'>
          <h3>진단 및 처방</h3>
            <div>
              <h4>진단</h4>
            </div>
            <div>
              <h4>처방</h4>
              <div>
                <p>
                  <i class="fa-regular fa-pen-to-square"></i>
                  <span>보건의료원 내 의과</span>
                  <input className='p-chart-input' type='text' value={1}/>
                  </p>
              </div>
              <div className='p-chart-medicine'>
                <p>
                  <i className="bi bi-capsule"></i> 
                  <span>약이름 쏼라쏼라쏼라(어쩌고) </span>
                  <input className='p-chart-input' type='text' name='' value={1}/>
                  <input className='p-chart-input' type='text' name='' value={1}/>
                  <input className='p-chart-input' type='text' name='' value={10}/>
                  <input className='p-chart-input' type='text' name='' placeholder='용법'/>
                </p>
              </div>
            </div>
          <button className='p-chart-btn' type='button'>등록하기</button>        
        </div>
      </div>
    </div>
  )
}

export default PatientChart