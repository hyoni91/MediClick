import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useNavigate, useParams } from 'react-router-dom';

const DocMemList = () => {
  const navigate=useNavigate()
  // 예약 리스트 담을 변수
  const [infoList,setInfoList]=useState([])
  // 의사 하나의 환자예약정보 담을 변수
  const [oneDoc,setOneDoc]=useState({
    docNum : '',
    docName:'',
    medicalDept:[{
      deptName:''
    }]
  })

  const {docNum}=useParams()


  useEffect(()=>{
    axios
    .get(`/oneDoctor/${docNum}`)
    .then((res)=>{
      setOneDoc(res.data)
      // console.log(oneDoc)
    })
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
  // console.log(oneDoc)

  // 예약취소
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

      <div className='docInfo-div'>
        <h2>의료진 정보</h2>
        <h4>| 나의 정보</h4>
        <table className='docInfo-table'>
          <colgroup>
            <col width='50%'/>
            <col width='50%'/>
          </colgroup>
          <thead>
            <tr>
              <td>이름</td>
              <td>진료과</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{oneDoc.docName}</td>
              <td>{oneDoc.medicalDept[0].deptName}</td>
            </tr>
                
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
              <td>특이사항</td>
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
                  <td><span onClick={(e)=>{navigate(`/admin/docMemInfo/${info.memNum}`)}}>{info.memberVO.memName}</span></td>
                  <td>{info.detail}</td>
                  <td>-</td>
                  <td>
                    {
                      info.schStatus==='Y'?
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