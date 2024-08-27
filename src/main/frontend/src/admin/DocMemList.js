import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useParams } from 'react-router-dom';

const DocMemList = () => {
  const [infoList,setInfoList]=useState([

  ])
  const {docNum}=useParams()

  useEffect(()=>{
    axios
    .get(`/schedule/getDocMemList/${docNum}`)
    .then((res)=>{
      setInfoList(res.data)

    })
    .catch((error)=>{
      console.log(error)
    })
  },[])




  function goDelete(schNum){
    // 예약상태를 Y에서 N로 바꾸는 그거  ㅇ
    // update쿼리  ㅇ
    // map돌린거에서 schNum 빼오기 
    // 예약취소하면 취소버튼이 취소되었습니다 텍스트로 변하기
    // 아니면 취소버튼 막기 !! 
    // 아니면 취소버튼 클릭했을 때 이미 취소된 예약입니다 띄우기 
    axios
    .put(`/schedule/updateSchStatus/${schNum}`)
    .then((res)=>{

    })
    .catch((error)=>{console.log(error)})
    
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
                  <td>{info.doctorVO.medicalDept[0].deptName}</td>
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
            <col width='20%'/>
            <col width='10%'/>
            <col width='30%'/>
            <col width='30%'/>
            <col width='10%'/>
          </colgroup>

          <thead>
            <tr>
              <td>진료일</td>
              <td>환자명</td>
              <td>증상</td>
              <td>처방</td>
              <td>예약 상태</td>
            </tr>
          </thead>
          <tbody>
            {
              infoList.map((info,i)=>{
                <tr>
                  <td>{info.schDate}</td>
                  <td>{info.memberVO.memName}</td>
                  <td>{info.detail}</td>
                  <td>휴식</td>
                  <td><button type='button' onClick={(e)=>{goDelete(info.schNum)}}>취소</button></td>
                </tr>
              })
            }
            {/* <tr>
              <td>2024-08-26</td>
              <td>고길동</td>
              <td>홧병</td>
              <td>휴식</td>
              <td><button type='button' onClick={(e)=>{goDelete()}}>취소</button></td>
            </tr> */}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default DocMemList