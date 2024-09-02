import React, { useEffect, useState } from 'react'
import './DocMemInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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



  
  const {schNum}=useParams();

  useEffect(()=>{

    axios
    .get(`/schedule/getMemChart/${schNum}`)
    .then((res)=>{setMemInfo(res.data)})
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


  

  // //수정할 정보
  // function insertData(e){
  //   setMemInfo({
  //     ...memInfo,
  //     [e.target.name]:e.target.value
  //   })
  // }

  //정보 수정 후 보내기
  // function updateData(){

  //   axios
  //   .put(`/schedule/updateSchChart`,memInfo)
  //   .then((res)=>{
  //     alert('수정되었습니다.')
  //     navigate(`/admin/docMemList/${memInfo.doctorVO.docNum}`)
  //   })
  //   .catch((error)=>{console.log(error)})

  // }

  // const [selectDept,setSelectDept]=useState(memInfo.doctorVO.medicalDept[0].deptName)


  // const handleChange=(e)=>{
  //   setSelectDept(e.target.value)
  // }


  return (
    <div className='meminfo-div'>
      
      <div>
        <div><h3>{memInfo.memberVO.memName}님 예약 정보</h3></div>
        <table className='meminfo-table'>
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
              <td>{memInfo.schDate}</td>
            </tr>
            <tr>
              <td>예약 시간</td>
              <td>{memInfo.schTime}</td>
            </tr>
            <tr>
              <td>진료과</td>
              <td>{memInfo.doctorVO.medicalDept.deptName}</td>
            </tr>
            <tr>
              <td>담당의</td>
              <td>{memInfo.doctorVO.docName}</td>
            </tr>
            <tr>
              <td>증상</td>
              <td>{memInfo.detail}</td>
            </tr>
          </tbody>
        </table>

        <div className='infoBtns'>
          {/* <div><button type='button' className='infoBtn'>수정</button></div> */}
          <div><button type='button' className='infoBtn'
          onClick={(e)=>{navigate(-1)}}>확인</button></div>
        </div>

      </div>

    </div>
  )
}

export default DocMemInfo