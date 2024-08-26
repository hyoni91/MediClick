import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useParams } from 'react-router-dom';

const DocMemList = () => {
  const [infoList,setInfoList]=useState([])
  const {docNum}=useParams()

  useEffect(()=>{
    axios
    .get(`/schedule/getDocMemList/${docNum}`)
    .then((res)=>{
      console.log(res.data)
      setInfoList(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])



  function goDelete(){

  }


  return (
    <div>
      <h2>의료진 정보</h2>

      <div className='docInfo-div'>
        <h4>| 나의 정보</h4>
        <table className='docInfo-table'>
          <thead>
            <tr>
              <td>이름</td>
              <td>진료과</td>
            </tr>
          </thead>
          <tbody>
            {
              infoList.map((info,i)=>{
                <tr>
                  <td>{info.doctorVO.docName}</td>
                  <td>{info.deptName}</td>
                </tr>

              })
            }
          </tbody>
        </table>
      </div>
      
      <div className='chart-div'>
        <h4>| 담당 환자 정보</h4>
        <table className='chart-table'>
          <colgroup>
            <col width='12%'/>
            <col width='10%'/>
            <col width='25%'/>
            <col width='30%'/>
            <col width='6%'/>
            <col width='12%'/>
          </colgroup>

          <thead>
            <tr>
              <td>진료일</td>
              <td>환자명</td>
              <td>증상</td>
              <td>처방</td>
              <td>예약 상태</td>
              <td>다음 예약일</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-08-26</td>
              <td>고길동</td>
              <td>홧병</td>
              <td>휴식</td>
              <td><button type='button' onClick={(e)=>{goDelete()}}>취소</button></td>
              <td>-</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default DocMemList