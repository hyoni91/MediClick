import React, { useEffect, useRef, useState } from 'react'
import './DocMemInfo.css';
import { json, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactModal, { Modal } from 'react-modal';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale'

const DocMemInfo = () => {
  const navigate=useNavigate()
  const [memInfo,setMemInfo]=useState({
    schNum:'',
    schDate:'',
    schTime:'',
    doctorVO:{
      docNum:'',
      docName:'',
      medicalDept:{
        deptNum:0,
        deptName:''
      }
    },
    memberVO:{
      memNum:'',
      memName:''
    }
  })

  // docNum,docName,deptNum,deptName
  const [docInfoList,setDocInfoList]=useState([])

  //현 환자의 정보를 가져오고 싶은데 memInfo.doctorVO.medicalDept.deptName 안됨
  const [selectedOption,setSelectedOption]=useState('선택')

  //드롭다운으로 띄울 예약 시간대 리스트
  const schTimeList=['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  //드롭다운으로 띄울 진료과 리스트
  const deptList=[] 
  docInfoList.forEach((doc,i)=>{
    const dept= doc
    deptList.push(dept)
  })
  
  //드롭다운으로 띄울 의사 리스트
  // const docList=[]
  // docInfoList.forEach((doc,i)=>{
  //   const docName=doc.docName
  //   docList.push(docName)
  // })

  const [isDropOpen,setIsDropOpen]=useState(false)

  const toggleDropdown=()=>setIsDropOpen(!isDropOpen)

  const selectOption =(option)=>{
    setSelectedOption(option)
    // console.log(option)
    setIsDropOpen(false)
    setMemInfo({...memInfo})
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

  //수정될 예약 시간
  const [updateSchTime,setUpdateSchTime]=useState('')

  //수정될 진료과
  const [updateDept,setUpdateDept]=useState('')

  //수정될 담당의
  const [updateDoc,setUpdateDoc]=useState('')

  //수정할 정보
  //수정된 값으로 화면이 바뀌고 수정을 눌러야 수정 완
  function insertDate(e){
    const real_date = e.getFullYear() + '-' + String(e.getMonth()+ 1).padStart(2, '0') +'-' + String(e.getDate()).padStart(2, '0');

    setMemInfo({
      ...memInfo,
      schDate:real_date
    })
  }
  function insertTime(e){
    setMemInfo({
      ...memInfo,
      schTime:e.target.value
    })
  }
  function insertDept(e){
    const selectedValue=e.target.value //밸류값 문자열로 받기
    const {deptNum,docNum}=JSON.parse(selectedValue) // JSON값 객체로 다시 바꾸기

    setMemInfo({
      ...memInfo,
      docNum:docNum,
      doctorVO:{
        medicalDept:{
          deptNum:deptNum
        }
      }
    })
  }

  console.log(memInfo)

  //정보 수정 후 보내기
  function updateData(){

    axios
    .put(`/schedule/updateSchChart`,memInfo)
    .then((res)=>{
      alert('수정완')
      navigate(`/admin/docMemList/${memInfo.doctorVO.docNum}`)
    })
    .catch((error)=>{console.log(error)})

  }

  //모달창
  const [modalOpen,setModalOpen]=useState(false)
  //모달창 안의 내용
  const [modalContent,setModalContent]=useState(false)

  const showModal=(content)=>{
    setModalContent(content)
    setModalOpen(!modalOpen)
  }

  //당일 선택불가
  const today=new Date()
  const notToday = new Date(today.getTime()+1*24*60*60*1000)
  //초기값
  const [startDate,setStartDate]=useState(notToday)
  //const [startDate,setStartDate]=useState('')

  //요일반환
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', {weekday: 'long',}).substr(0, 1);
  }

  //날짜 비교시 연,월,일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(new Date(date.getFullYear()
      , date.getMonth()
      , date.getDate()
      , 0, 0, 0));
  }

  //공휴일
  const set_holiday=["1001","1003","1009","1225"]

  //캘린더 비활성화 유무판단 함수
  const disabledWeekends=(date)=>{
    let isDisabled = true; // 비활성화 유무
    let dayOfWeek = date.getDay() //주마다 number로 반환됨
    let day = date.getDate() //날짜가 number로 반환됨

    //주말 구하기
    if (dayOfWeek===0 || dayOfWeek==6){
      isDisabled=false
    }
    //공휴일
    else{
      let month = date.getMonth()+1 // ? 
      month=month>=10?month:"0"+month // month가 10보다 적으면 01,02 이렇게 표시 
      day=day>=10?day:"0"+day // dd
      let set_disabled = String(month)+String(day) // MMdd 
      let get_holiday = set_holiday.includes(set_disabled)
      // includes === indexOf 대체 가능 

      if (get_holiday){
        isDisabled=false
      }
      
    }

    return isDisabled 
    
  }


  //schTimeList 길이만큼 false값 주기
  const [chkSchTime,setChkSetTime]=useState(new Array(schTimeList.length).fill(false))


  //예약 유무 확인(예약된 시간 True > 비활성화)
  useEffect(()=>{
    
    axios
    .post('/schedule/checkSchTime',memInfo)
    .then((res)=>{
      // console.log(res.data)
      //예약이 있는 데이터 뽑아내기
      const availableTimes=res.data.map(time=>{
        //초 제외 분단위만 남기기
        const [hours,minutes]=time.schTime.split(':')
        return `${hours}:${minutes}`
      })

      //schTimeList와 비교하여 예약 가능한 시간이 포함되어 있는지 확인
      const updateedChkSchtTime=schTimeList.map(time=>availableTimes.includes(time))
      // console.log(updateedChkSchtTime)
      setChkSetTime(updateedChkSchtTime)
    })
    .catch((error)=>{console.log(error)})
  },[memInfo])


  //모달 콘텐츠
  const renderModalContent=()=>{
    switch(modalContent){

      case 'date': 
        // 예약 날짜, 예약 시간
        return <div className='schDetail-modal-div'>
          <div>
            <h3>예약일</h3>
            <div>
              <DatePicker className='datePicker' name='schDate' 
                selected={startDate} 
                onChange={(date)=>{setStartDate(date);insertDate(date)}}
                locale={ko} //언어
                dateFormat={'yyyy/MM/dd'} //박스 안 포맷
                dateFormatCalendar='yyyy년 MM월' //캘린더 안 포맷
                minDate={notToday} //선택불가날짜
                disabledKeyboardNavigation //다른 월의 같은 날짜 자동선택 방지
                dayClassName={date=>
                  getDayName(createDate(date))==='토'?"saturday"
                  :
                  getDayName(createDate(date))==='일'?"sunday":undefined
                }
                filterDate={disabledWeekends} //선택불가날짜
                />
            </div>
          </div>

          <div>
            <h3>예약시간</h3>
            {/* 모달창에 입력된 값이 info창 값으로 바뀌고 그 내용으로 수정을 하는 거면
            모달창에서 update하고 info창을 재렌더링하는건가 */}
            <div>
              {/* 원래 선택된 값 띄우고 */}
              {/* 이미 예약된 시간대 불가능 checkSchtime 쿼리 불러와서 */}
              <div className='custom-select' ref={dropDownRef}>
            <div className='selected' onClick={toggleDropdown}>
              {selectedOption}
              <span className='arrow'>
                {isDropOpen?
                <i className="bi bi-caret-up-fill"></i>
                :
                <i className="bi bi-caret-down-fill"></i>
                }</span>
            </div>
            {
              isDropOpen&&
              (<ul className='options' 
                >
                  {schTimeList.map((time,i)=>{
                    return(
                    <li key={i}>
                      <button type='button' name='schTime' value={time}
                        onClick={(e)=>{selectOption(time);
                        insertTime(e); setUpdateSchTime(time)}}
                        disabled={chkSchTime[i]}>
                          {time}</button>
                    </li>
                    )
                  })}
              </ul>)
            }
          </div>
            </div>
          </div>
        </div>

      case 'dept': 
      // deptnum으로 왔다갔다 해야하지 않을까 
        return <div className='schDetail-modal-div'>
          <h3>진료과</h3>
          <div className='custom-select' ref={dropDownRef}>
            <div className='selected' onClick={toggleDropdown}>
              {selectedOption}
              <span className='arrow'>
                {isDropOpen?
                <i className="bi bi-caret-up-fill"></i>
                :
                <i className="bi bi-caret-down-fill"></i>
                }</span>
            </div>
            {
              isDropOpen&&
              (<ul className='options' >
                {deptList.map((dept,i)=>{
                  return(
                  <li key={i}>
                    <button type='button' name='docInfo' 
                      value={JSON.stringify({deptNum:dept.medicalDept.deptNum, docNum:dept.docNum})}
                      onClick={(e)=>{selectOption(dept.medicalDept.deptName);
                        insertDept(e); 
                        setUpdateDept(dept.medicalDept.deptName)
                        setUpdateDoc(dept.docName)
                        // console.log(dept)
                      }}
                    >{dept.medicalDept.deptName}</button>
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
    .then((res)=>{setMemInfo(res.data); setStartDate(new Date(res.data.schDate))})
    .catch((error)=>{console.log(error)})
        
    axios
    .get('/schedule/getDocInfo')
    .then((res)=>{
      setDocInfoList(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])


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
              // WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              // padding: '20px'
            }
          }}
          >
          {renderModalContent()}
          <div className='schDetail-modal-div'>
            <button type='button' className='infoBtn'
              onClick={()=>{setModalOpen(false);}}>확인</button>
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
              <td>진료과</td>
              <td>
                <span>
                  {
                    updateDept==''?
                    memInfo.doctorVO.medicalDept.deptName
                    :
                    updateDept
                  }
                  </span>
                <span onClick={()=>{showModal('dept')}}><i className="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>담당의</td>
              <td>
                <span> 
                  {/* deptNum에 해당되는 의료진 띄우기 */}
                  {
                    updateDoc==''?
                    memInfo.doctorVO.docName
                    :
                    updateDoc
                  }
                    
                  </span>
              </td>
            </tr>
            <tr>
              <td>예약 날짜</td>
              <td>
                <span>
                  {/* 선택된 날짜가 없으면 원래 예약 날짜
                  선택된 날짜가 있으면 선택된 날짜  */}
                  {
                    startDate.toLocaleDateString()===notToday.toLocaleDateString()
                    ?
                    memInfo.schDate
                    :
                    startDate.toLocaleDateString()
                  }
                  {/* {memInfo.schDate} */}
                  </span>
                <span onClick={()=>{showModal('date')}}><i className="bi bi-pencil-square"></i></span>
              </td>
            </tr>
            <tr>
              <td>예약 시간</td>
              <td>
                <span>
                  {
                    updateSchTime==''?
                    memInfo.schTime
                    :
                    updateSchTime
                  }
                </span>
              </td>
            </tr>

            <tr>
              <td>증상</td>
              <td>{memInfo.detail}</td>
            </tr>
          </tbody>
        </table>

        <div className='infoBtns'>
          <div><button type='button' className='infoBtn' 
            onClick={()=>{updateData()}}>수정</button></div>
          <div><button type='button' className='infoBtn'
          onClick={(e)=>{navigate(-1)}}>확인</button></div>
        </div>

      </div>

    </div>
  )
}

export default DocMemInfo
