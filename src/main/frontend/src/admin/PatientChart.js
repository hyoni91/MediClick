import React, { useEffect, useState } from 'react'
import './PatientChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { now } from 'moment';

const PatientChart = () => {
  const {schNum} = useParams()
  console.log(schNum)
  const today = new Date();
  const formatDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

  const [pselect , setPselect] = useState({
    chartNum: 0,
    chartDate: formatDate,
    schList: [
      {
        memberVO: {
          memNum: '',
          memName: '',
          memRrn: '',
        },
        doctorVO: {
          docName: '',
          medicalDept: {
            deptName: ''
          },
        }
      }
    ]
  })


  useEffect(()=>{
    axios.get(`/patientChart/p_select/${schNum}`)
    .then((res)=>{
      setPselect(res.data)
      console.log(pselect)
    })
    .catch((error)=>{
      console.log(error)
    });

  },[])


  return (
    <div className='p-chart-container'>
      <div>진료차트</div>
      <div className='p-chart-content'>
        <table className='p-chart-table'>
          <colgroup>
            <col width={'20%'}/>
            <col width={'30%'}/>
            <col width={'20%'}/>
            <col width={'30%'}/>
          </colgroup>
          <tbody>
            <tr>
              <td>진료번호</td>
              <td>{pselect.chartNum +1}</td>
              <td>진료날짜</td>
              <td>{formatDate}</td>
            </tr>
            <tr>
              <td>진료과</td>
              <td>{pselect.schList[0].doctorVO.medicalDept.deptName}</td>
              <td>담당의사</td>
              <td>{pselect.schList[0].doctorVO.docName}</td>
            </tr>
            <tr>
              <td className='td-style' colSpan={4}>환자정보</td>
            </tr>
            <tr>
              <td>환자번호</td>
              <td colSpan={3}>{pselect.schList[0].memberVO.memNum}</td>
            </tr>
            <tr>
              <td>환자이름</td>
              <td colSpan={3}>{pselect.schList[0].memberVO.memName}</td>
            </tr>
            <tr>
              <td>주민번호</td>
              <td colSpan={3}>{pselect.schList[0].memberVO.memRrn}</td>
            </tr>
            <tr>
              <td className='td-style' colSpan={4}>진료내용</td>
            </tr>
            <tr rowSpan={2}>
              <td>증상</td>
              <td colSpan={3}><textarea cols={40} rows={7}/></td>
            </tr>
            <tr>
              <td className='td-style' colSpan={4}>검사내용</td>
            </tr>
            <tr >
              <td colSpan={4}><textarea cols={50} rows={7}/></td>
            </tr>
            <tr>
              <td>병명</td>
              <td colSpan={3}><input type='text' name=''/></td>
            </tr>
            <tr>
              <td className='td-style' colSpan={4}>처방내용</td>
            </tr>
            <tr>
              <td colSpan={4}><textarea cols={50} rows={7}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientChart