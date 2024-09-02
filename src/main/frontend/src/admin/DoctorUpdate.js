import React, { useEffect, useState } from 'react'
import './DoctorUpdate.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const DoctorUpdate = () => {
  // docNum 값 받기
  const {docNum} = useParams();
  
  const [doctorUpdate, setDoctorUpdate] = useState({});

  const [updateData, setUpdateData] = useState({
    // imgNum : imgNum,
    originFileName : '',
    attachedFileName : ''
  });

  function changeUpdateDate(e){
    setUpdateData({
      ...updateData,
      [e.target.name] : e.target.value
    })
  }

  useEffect(()=>{
    axios.get(`/admin/doctorUpdate/${docNum}`)
    .then((res)=>{
      setDoctorUpdate(res.data);
      setUpdateData({
        ...updateData,
        originFileName : res.data.originFileName,
        attachedFileName : res.data.attachedFileName
      })
    }).catch((error)=>{console.log(error)})
  }, [])

  return (
    <div>
      <table className='DoctorUpdate-table'>
        <colgroup>
          <col width="*"/>
          <col width="80%"/>
        </colgroup>
        <tr>
          <td>이름</td>
          <td>{doctorUpdate.docName}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{doctorUpdate.memTel}</td>
        </tr>
        <tr>
          <td>{doctorUpdate.originFileName}</td>
          <td>사진 변경</td>
        </tr>
      </table>
    </div>
  )
}

export default DoctorUpdate