import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useParams } from 'react-router-dom';

const DocMemList = () => {
  const [infoList,setInfoList]=useState([])

  const {docNum}=useParams()

  // 예약이 없는 의사는 조회가 안되어서 
  // 의사 리스트를 다시 불러와야 할 것 같은데 .. 


  useEffect(()=>{
    axios
    .get('')
    .then((res)=>{})
    .catch((error)=>{console.log(error)})

    axios
    .get(`/schedule/getDocMemList/${docNum}`)
    .then((res)=>{
      setInfoList(res.data)

    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  // console.log(infoList)


  function goDelete(schNum){

    axios
    .put(`/schedule/updateSchStatus/${schNum}`)
    .then((res)=>{
      alert('예약이 취소되었습니다.')

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
                return(
                <tr key={i}>
                  <td>{info.doctorVO.docName}</td>
                  <td>{info.doctorVO.medicalDept[0].deptName}</td>
                </tr>
                )
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
              infoList.length==0?
              <tr>
                <td colSpan={5}>
                  <p>예약 환자가 없습니다.</p>
                </td>
              </tr>
              :
              infoList.map((info,i)=>{
                return(
                <tr key={i}>
                  <td>{info.schDate}</td>
                  <td>{info.memberVO.memName}</td>
                  <td>{info.detail}</td>
                  <td>휴식</td>
                  <td>
                    {
                      info.schStatus===0?
                      (<button type='button' onClick={(e)=>{goDelete(info.schNum)}}>취소</button>)
                      :
                      (<p className='cancel'>취소</p>)
                    }
                  </td>
                </tr>
                )
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