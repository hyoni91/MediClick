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
    axios.get(`/selectDoctor/${docNum}`)
    .then((res)=>{
      console.log(res.data)
      setDoctorUpdate(res.data);
      setUpdateData({
        ...updateData,
        originFileName : res.data.originFileName,
        attachedFileName : res.data.attachedFileName
      })
    }).catch((error)=>{console.log(error)})
  }, [])

  // 전체 동의
const [allCheck, setAllCheck] = useState(false); 

// 만 14세 이상 이용 확인 동의
const [ageCheck, setAgeCheck] = useState(false); 
// 서비스 이용약관 동의
const [serviceCheck, setServiceCheck] = useState(false); 
// 개인(위치)정보 처리 방침 동의
const [privacyCheck, setPrivacyCheck] = useState(false); 
// 위치기반서비스 이용약관 동의
const [locationCheck, setLocationCheck] = useState(false); 
// 마케팅 수신 동의 (선택)
const [marketingCheck, setMarketingCheck] = useState(false); 

// 전체 선택버튼
const allchk = (e) => {
  const isChecked = e.target.checked;
	//전체 동의가 체크가 안되어있을때
		setAllCheck(isChecked) 
		setAgeCheck(isChecked)
		setServiceCheck(isChecked)
		setPrivacyCheck(isChecked)
    setLocationCheck(isChecked)
		setMarketingCheck(isChecked)
}

//각각 체크버튼 클릭시 
const chkAge = (e) => {
	setAgeCheck(e.target.checked);
}
const chkServiceCheck = (e) => {
	setServiceCheck(e.target.checked);
}
const chkPrivacyCheck = (e) => {
	setPrivacyCheck(e.target.checked);
}
const chkLocationCheck = (e) => {
	setLocationCheck(e.target.checked);
}
const chkMarketing = (e) => {
	setMarketingCheck(e.target.checked);
}
//마운트 되고 다시 랜더링했을때
useEffect (() => {
	// 체크한게 전부 true일때 전체 선택버튼도 같이 체크된다
	if(ageCheck == true && serviceCheck == true && privacyCheck ==true && locationCheck == true && marketingCheck == true){
		setAllCheck(true) 
	}// 아닐시 해제
	else{
		setAllCheck(false)
	}
},[ageCheck, serviceCheck, privacyCheck, locationCheck, marketingCheck])
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

      <div>
        <input type='checkbox' checked={allCheck} onChange={(e) => {allchk(e)}} />
      </div>
      <div>
        <input type='checkbox' checked={ageCheck} onChange={(e) => {chkAge(e)}} />
      </div>
      <div>
        <input type='checkbox' checked={serviceCheck} onChange={(e) => {chkServiceCheck(e)}} />
      </div>
      <div>
        <input type='checkbox' checked={privacyCheck} onChange={(e) => {chkPrivacyCheck(e)}} />
      </div>
      <div>
        <input type='checkbox' checked={locationCheck} onChange={(e) => {chkLocationCheck(e)}} />
      </div>
      <div>
        <input type='checkbox' checked={marketingCheck} onChange={(e) => {chkMarketing(e)}} /> 마케팅 수신 동의 (선택)
      </div>
    </div>
  )
}

export default DoctorUpdate