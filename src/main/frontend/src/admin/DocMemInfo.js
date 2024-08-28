import React, { useEffect, useState } from 'react'
import './DocMemInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DocMemInfo = () => {
  const navigate=useNavigate()
  const {memInfo,setMemInfo}=useState({

  })
  const {memNum}=useParams();

  useEffect(()=>{
    
    axios
    .get(`/schdule/getDocMemList/`)
    .then((res)=>{
      setMemInfo(res.data)
    })
    .catch((error)=>{console.log(error)})

  },[])

  //수정할 정보
  function insertData(){
    setMemInfo({
      ...memInfo,
      // [e.target.name]:e.target.value
    })
  }

  //정보 수정 후 보내기
  function updateData(){

    axios
    .put(``,memInfo)
    .then((res)=>{
      alert('수정되었습니다.')
      // navigate(`/admin/docMemList/${docNum}`)
    })
    .catch((error)=>{console.log(error)})

  }



  return (
    <div className='meminfo-div'>
      
      <div>
        <div><h3>ㅇㅇ님 예약 정보</h3></div>
        <table className='meminfo-table'>
          <thead></thead>
          <tbody>
            <tr>
              <td>환자번호</td>
              <td>환자번호</td>
            </tr>
            <tr>
              <td>환자명</td>
              <td>환자명</td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td>주민번호</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>연락처</td>
            </tr>
            <tr>
              <td>예약 날짜</td>
              <td><input type='text' name='schDate'
              onChange={(e)=>{insertData(e)}}/></td>
            </tr>
            <tr>
              <td>예약 시간</td>
              <td><input type='text' name='schTime'
              onChange={(e)=>{insertData(e)}}/></td>
            </tr>
            <tr>
              <td>진료과</td>
              <td><input type='text' name='deptName'
              onChange={(e)=>{insertData(e)}}/></td>
            </tr>
            <tr>
              <td>담당의</td>
              <td><input type='text' name='docName'
              onChange={(e)=>{insertData(e)}}/></td>
            </tr>
            <tr>
              <td>증상</td>
              <td>증상</td>
            </tr>
            <tr>
              <td>특이사항</td>
              <td><textarea 
              onChange={(e)=>{insertData(e)}}/></td>
            </tr>
          </tbody>
        </table>

        <div className='infoBtns'>
          <div><button type='button' className='infoBtn'
          onClick={(e)=>{updateData()}}>수정</button></div>
          <div><button type='button' className='infoBtn'
          onClick={(e)=>{navigate(-1)}}>확인</button></div>
        </div>

      </div>

    </div>
  )
}

export default DocMemInfo