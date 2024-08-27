import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MySch.css';
import axios from 'axios';

const MySch = () => {
  // 환자가 보는 나의 예약페이지
  const {memNum} = useParams();
  const [memSchInfo,setMemSchInfo]=useState({
    schDate:'',
    schTime:'',
    memberVO:{
      memName:''
    }

  })

  useEffect(()=>{
    axios
    .get(`/schedule/getMemSch/${memNum}`)
    .then((res)=>{
      setMemSchInfo(res.data)

    })
    .catch((error)=>{console.log(error)})

  },[])

  // console.log(memSchInfo[0])


  return (
    <div>
      <h2>예약 확인</h2>
      
      <div className='mySch-div'>
        <h4>| 회원 정보</h4>
        <table className='mySch-table'>
          <colgroup>
            <col width='50%'/>
            <col width='50%'/>
          </colgroup>

          <thead>
            <tr>
              <td>이름</td>
              <td>생년월일</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className='mySch-div'>
        <h4>| 예약정보</h4>
        <table className='mySch-table'>
          <colgroup>
            <col width='10%'/>
            <col width='10%'/>
            <col width='10%'/>
            <col width='30%'/>
            <col width='30%'/>
            <col width='10%'/>
          </colgroup>

          <thead>
            <tr>
              <td>예약일</td>
              <td>예약시간</td>
              <td>환자명</td>
              <td>진료과</td>
              <td>담당 의사</td>
              <td>예약 상태</td>
            </tr>
          </thead>
          <tbody>
            {
              memSchInfo.memName==''?
              (<tr>
                <td colSpan={5}>예약정보가 없습니다.</td>
              </tr>)
              :
              (<tr>
                <td>{memSchInfo.schDate}</td>
                <td>{memSchInfo.schTime}</td>
                {/* <td>{memSchInfo.memberVO.memName}</td> */}
                <td>{memSchInfo.schDate}</td>
                {/* <td>{memSchInfo.doctorVO.medicalDept[0].deptName}</td> */}
                <td>{memSchInfo.schStatus}</td>
              </tr>)
            }
            
          </tbody>
        </table>
      </div>
    
    </div>
  )
}

export default MySch