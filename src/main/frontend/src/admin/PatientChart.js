import React, { useEffect, useState } from 'react'
import './PatientChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment, { now } from 'moment';
import PchartMedicine from '../custom/PchartMedicine';

const PatientChart = () => {
  const {memNum, memName} = useParams()
  //의사(admin) 정보 
  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'))
  const docNum =  loginInfo? loginInfo.memNum : null

  //약 추가 버튼 
  const [add , setAdd] = useState([1])
  //과거진료정보 
  const [charts, setChats] = useState([])
  //처방전 입력
  const [chartMedicine, setChartMedicine] = useState({})
  //차트번호
  const [chartNumber, setChartNumber] = useState(null)


  //예약정보
  const [schedule, setScedule] = useState({
    docNum : docNum,
    memNum : memNum,
    detail : '',
    schNum : 0,
  })


  //진료차트입력
  const [newChart, setNewChart] = useState({
    docNum : docNum,
    memNum : memNum,
    deptNum : 0,
    symptom : '',
    checkUp : '',
    disease : '',
    chartNum: chartNumber,
  })

  //날짜 계산 
  const now = new Date()
  const week = ['일','월','화','수','목','금','토','일']
  let dayOfWeek = week[now.getDay()]
  const today = moment(now).format('YYYY-MM-DD')

//차트번호
  useEffect(()=>{
    axios.get('/patientChart/chartNum')
    .then((res)=>{
      setChartNumber(res.data+1)
      
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  },[])



  //화면 좌측:진료기록리스트
  useEffect(()=>{
    axios.get(`/patientChart/memberSelect/${memNum}`)
    .then((res)=>{
      setChats(res.data)
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
        memNum : res.data.memNum,
      }
      )
    })
    .catch((error)=>{
      alert(error)
      console.log(error)
    })
  },[])

    //의사정보
    useEffect(()=>{
      axios
      .get(`/oneDoctor/${docNum}`)
      .then((res)=>{
        setNewChart({
          ...newChart,
          deptNum : res.data.medicalDept.deptNum
        })
      })
      .catch((error)=>{console.log(error)})
    },[docNum])


  //차트 입력
  function handleNewChart(e){
    setNewChart({
      ...newChart,
      chartNum : chartNumber,
      [e.target.name] : e.target.value
    })
  }

  function insertChart(){
    if(newChart.symptom == ''){
      alert('차트내용을 확인해 주세요.')
    }else if(window.confirm('저장하시겠습니까?')){
      axios.put(`/patientChart/chartInsert`,newChart)
      .then((res)=>{})
      .catch((error)=>{
        alert('error!')
        console.log(error)
      })
    }else{
      return;
    }
  }

  console.log(newChart)

  return (
    <div className='p-chart'>
      <h1>
      </h1>
      <div className='p-chart-container'>
        <div className='p-chart-side'>
          <h3>환자정보</h3>
          <h4> 
          <i className="fa-regular fa-user"></i>
            {memNum} {memName}님 
          </h4> 
          <h3>내원이력</h3>
          <div>
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
              </div>
              )
            })
          }
          </div>
        </div>
        <div className='p-chart-content'>
          <div>
            <p>날짜 : {today} ({dayOfWeek})</p>
            <span>
              접수번호 : {chartNumber}
              <span onClick={()=>{insertChart()}}>
                <i className="fa-solid fa-folder-plus"/>
              </span>
            </span>
          </div>
          <div>
            <h4>증상</h4>
            <div>{schedule.detail}</div>
          </div>
          <div>
            <h4>진료</h4>
            <div>
              <textarea 
                name='symptom' 
                placeholder='증상 및 기타 의료 기록'
                onChange={(e)=>{handleNewChart(e)}}
                >
              </textarea>
            </div>
          </div>
          <div>
            <h4>검사 및 결과</h4>
            <div>
              <textarea 
                name='checkUp' 
                placeholder='검사 및 검사결과 입력'
                onChange={(e)=>{handleNewChart(e)}}
                >
              </textarea>
            </div>
            <div>
              <h4>진단</h4>
              <div>
                <textarea 
                  className='p-chart-contetn-textarea4'
                  name='disease' 
                  placeholder='진단명을 입력'
                  onChange={(e)=>{handleNewChart(e)}}
                  >
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className='p-chart-rigthside'>
          <h3>처방</h3>
            <div>
              <span className='rightside-flex'>
                <h4>처방</h4>
                <span
                  onClick={()=>{
                    setAdd([...add,add.push(1)])
                  }}
                > 
                  <i className="fa-solid fa-circle-plus"/>
                </span>
              </span>
              <div>
                <p>
                  <i className="fa-regular fa-pen-to-square"/>
                  <span>보건의료원 내 의과</span>
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    value={1}
                  />
                </p>
              </div>
              {
                add.map((m,i)=>{
                  return(
                    <PchartMedicine key={i}/>
                  )
                })
              }
              
            </div>
          <input type='hidden' 
          value={schedule.deptNum} name='deptNum'
          onChange={(e)=>{handleNewChart(e)}}
          /> 
          <button 
            className='p-chart-btn'
            type='button'
          >  
            등록하기
          </button>     
        </div>
      </div>
    </div>
  )
}

export default PatientChart