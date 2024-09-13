import React, { useEffect, useRef, useState } from 'react'
import './DocMemInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactModal, { Modal } from 'react-modal';
import { Overlay } from 'react-bootstrap';
import Calendar from 'react-calendar';
import DatePicker,{ subDays } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale'
// import { getDate } from 'react-datepicker/dist/date_utils';
// import { subDays } from 'react-datepicker/dist/date_utils';

const DocMemInfo = () => {
  const navigate=useNavigate()
  const [memInfo,setMemInfo]=useState({
    schNum:'',
    doctorVO:{
      docNum:'',
      docName:'',
      medicalDept:{
        deptName:''
      }
    },
    memberVO:{
      memNum:'',
      memName:''
    }
  })

  const [docInfoList,setDocInfoList]=useState([])

  //현 환자의 정보를 가져오고 싶은데 memInfo.doctorVO.medicalDept.deptName 안됨
  const [selectedOption,setSelectedOption]=useState('선택')

  //드롭다운으로 띄울 진료과 리스트
  const deptList=[] 
  docInfoList.forEach((doc,i)=>{
    const deptName= doc.medicalDept.deptName
    deptList.push(deptName)
  })
  //드롭다운으로 띄울 의사 리스트
  const docList=[]
  docInfoList.forEach((doc,i)=>{
    const docName=doc.docName
    docList.push(docName)
  })

  const [isDropOpen,setIsDropOpen]=useState(false)

  const toggleDropdown=()=>setIsDropOpen(!isDropOpen)
  const selectOption =(option)=>{
    setSelectedOption(option)
    setIsDropOpen(false)
  }

  //드롭다운 외부클릭
  const dropDownRef=useRef(null)

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if (dropDownRef.current&&!dropDownRef.current.contains(e.target)){
        setIsDropOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return ()=> document.removeEventListener('mousedown',handleClickOutside)
  },[])


  // //수정할 정보
  function insertData(e){
    setMemInfo({
      ...memInfo,
      [e.target.name]:e.target.value
    })
  }

  // console.log(memInfo)

  //정보 수정 후 보내기
  function updateData(){

    // axios
    // .put(`/schedule/updateSchChart`,memInfo)
    // .then((res)=>{

    // })
    // .catch((error)=>{console.log(error)})

  }

  //모달창
  const [modalOpen,setModalOpen]=useState(false)
  //모달창 안의 내용
  const [modalContent,setModalContent]=useState(false)

  const showModal=(content)=>{
    setModalContent(content)
    setModalOpen(!modalOpen)
  }

  const [startDate,setStartDate]=useState(new Date())

  // //요일반환
  // const getDayName = (date) => {
        
  //   return date.toLocaleDateString('ko-KR', {
  //     weekday: 'long',
  //   }).substr(0, 1);
  // }

  // //날짜 비교시 연,월,일까지만 비교하게끔
  // const createDate = (date) => {
  //   return new Date(new Date(date.getFullYear()
  //     , date.getMonth()
  //     , date.getDate()
  //     , 0
  //     , 0
  //     , 0));
  // }

  // const [formattedTime,setFormattedTime]=useState<Date>(minTime)

  //datepicker시간 time 이벤트 핸들러
  // const handleTimeChange=(selectedTime,any)=>{
  //   const hours=selectedTime.getHours()
  //   const minutes=selectedTime.getMinutes()
  //   const fTime=`${hours}:${minutes<10?'0':''}${minutes}`

  //   const timeStringToDate=(timeString,string) Date=>{
  //     const today=new Date()
  //     const [hours,minutes]=timeString.split(':').map(Number)
  //     const dateWithTime=new Date(today.getFullYear(),today.getMonth(),today/getDate(),hours,minutes)
  //     return dateWithTime
  //   }
  //   const st=timeStringToDate(fTime)
  //   setFormattedTime(st)
    
  // }


  //모달 콘텐츠
  const renderModalContent=()=>{
    switch(modalContent){

      case 'date':
        return <div className='schDetail-modal-div'>
          <h3>예약일</h3>
          <div>
            <DatePicker className='datePicker' 
              selected={startDate} onChange={date=>setStartDate(date)}
              locale={ko} //언어
              dateFormat={'yyyy/MM/dd'}
              minDate={new Date()} //선택불가날짜
              disabledKeyboardNavigation //다른 월의 같은 날짜 자동선택 방지
              // dayClassName={date=>
              //   getDayName(createDate(date))==='토'?"saturday"
              //   :
              //   getDayName(createDate(date))==='일'?"sunday":undefined
              // }
              />
          </div>
        </div>

      case 'time':
        return <div className='schDetail-modal-div'>
          {/* 드롭다운 안되는 시간대 회색처리 */}
          {/* 아니면 datepicker time으로  */}

          <h3>예약날짜</h3>
          <input value={memInfo.schTime}
            onChange={(e)=>{insertData(e)}}></input>
          {/* 모달창에 입력된 값이 info창 값으로 바뀌고 그 내용으로 수정을 하는 거면
          모달창에서 update하고 info창을 재렌더링하는건가 */}
          <div>
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption='Time'
              dateFormat={"HH:mm"}
              minTime={"09:00"}
              maxTime={"17:00"}
            />
          </div>
        </div>

      case 'dept':
        return <div className='schDetail-modal-div'>
          <h3>진료과</h3>
          <div className='custom-select' ref={dropDownRef}>
            <div className='selected' onClick={toggleDropdown}>
              {selectedOption}
              <span className='arrow'>{isDropOpen?
              <i class="bi bi-caret-up-fill"></i>
              :
              <i class="bi bi-caret-down-fill"></i>
              }</span>
            </div>
            {
              isDropOpen&&
              (<ul className='options' name='deptName' onChange={(e)=>{insertData(e)}}>
                {deptList.map((dept,i)=>{
                  return(
                  <li key={i} onClick={()=>{selectOption(dept)}} value={dept}>
                    {dept}
                  </li>
                  )
                })}
              </ul>)
            }

          </div>
          
        </div>

      case 'doctor':
        return <div className='schDetail-modal-div'>
          <h3>담당의</h3>
          <div className='custom-select' ref={dropDownRef}>
            <div className='selected' onClick={toggleDropdown}>
              {selectedOption}
              <span className='arrow'>{isDropOpen?
              <i class="bi bi-caret-up-fill"></i>
              :
              <i class="bi bi-caret-down-fill"></i>
              }</span>
            </div>
            {
              isDropOpen&&
              (<ul className='options' name='docName' onChange={(e)=>{insertData(e)}}>
                {docList.map((doc,i)=>{
                  return(
                  <li key={i} onClick={()=>{selectOption(doc)}} value={doc}>
                    {doc}
                  </li>
                  )
                })}
              </ul>)
            }

          </div>
          </div>


      default : return null
    }  
  }

  
  const {schNum}=useParams();

  useEffect(()=>{

    axios
    .get(`/schedule/getMemChart/${schNum}`)
    .then((res)=>{setMemInfo(res.data)})
    .catch((error)=>{console.log(error)})
        
    axios
    .get('/schedule/getDocInfo')
    .then((res)=>{
      setDocInfoList(res.data)
    })
    .catch((error)=>{console.log(error)})
    // axios
    // .get('/schedule/getDocInfo')
    // .then((res)=>{
    //   console.log(res.data)
    //   setDocDept(res.data)})
    // .catch((error)=>{console.log(error)})

  },[])

//   const [docDept,setDocDept]=useState([
//     {
//     docName:memInfo.doctorVO.docName,
//     medicalDept:[{
//       deptName:memInfo.doctorVO.medicalDept[0].deptName
//     }]
//   }
// ])




  // const [selectDept,setSelectDept]=useState(memInfo.doctorVO.medicalDept[0].deptName)

  // const handleChange=(e)=>{
  //   setSelectDept(e.target.value)
  // }


  return (
    <div className='meminfo-div'>
        {
          modalOpen?
          <ReactModal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: {
              position: 'fixed',
              borderRadius : 10,
              width:'100%',
              height:'100vh',
              zIndex:'10',
              top: 0,
              left: 0,
              // right: 0,
              // bottom: 0,
              backgroundColor: 'rgba(0,0,0, 0.6)'
            },
            content: {
              position: 'absolute',
              width: '440px',
              height: '350px',
              zIndex:'150',
              top: '50%',
              left: '50%',
              // right: '50%',
              // bottom: '40px',
              transform: 'translate(-50%, -50%)',
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
          {renderModalContent()}
          <div className='schDetail-modal-div'>
            <button type='button' className='infoBtn'
              onClick={()=>{setModalOpen(false); updateData()}}>확인</button>
          </div>
          </ReactModal>
          :
          null
        }


      <div>
        <div><h3>{memInfo.memberVO.memName}님 예약 정보</h3></div>
        <table className='meminfo-table'>
          <colgroup>
            <col width='35%'/>
            <col width='*'/>
          </colgroup>

          <thead></thead>
          <tbody>
            <tr>
              <td>환자번호</td>
              <td>{memInfo.memberVO.memNum}</td>
            </tr>
            <tr>
              <td>환자명</td>
              <td>{memInfo.memberVO.memName}</td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td>{memInfo.memberVO.memRrn}</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>{memInfo.memberVO.memTel}</td>
            </tr>
            <tr>
              <td>예약 날짜</td>
              <td>
                <span>{memInfo.schDate}</span>
                <span onClick={()=>{showModal('date')}}><i class="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>예약 시간</td>
              <td>
                <span>{memInfo.schTime}</span>
                <span onClick={()=>{showModal('time')}}><i class="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>진료과</td>
              <td>
                <span>{memInfo.doctorVO.medicalDept.deptName}</span>
                <span onClick={()=>{showModal('dept')}}><i class="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>담당의</td>
              <td>
                <span>{memInfo.doctorVO.docName}</span>
                <span onClick={()=>{showModal('doctor')}}><i class="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>증상</td>
              <td>{memInfo.detail}</td>
            </tr>
          </tbody>
        </table>

        <div className='infoBtns'>
          <div><button type='button' className='infoBtn'>수정</button></div>
          <div><button type='button' className='infoBtn'
          onClick={(e)=>{navigate(-1)}}>확인</button></div>
        </div>

      </div>

    </div>
  )
}

export default DocMemInfo
