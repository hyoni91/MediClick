import React, { useEffect, useState } from 'react'
import './JoinForm.css'
import axios from 'axios'
import { useNavigate, useNavigation } from 'react-router-dom'
const JoinForm = () => {
  //회원가입 담을 변수
  const [memberData, setMemberData] = useState({memRole : 'User'})

  //이동페이지 할수있게 네비게이션
  const navigate = useNavigate()
  //데이터가 바뀔때마다 저장되는 함수
  const changeData = (e) => {
    setMemberData({
      ...memberData
      
      , [e.target.name] : e.target.value
    })
  }
  //전화번호 정규식
  const [phoneNumber, setPhoneNumber] = useState('');
  const autoHyphen2 = (e) => {
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    
    setPhoneNumber(value);
  };
  const insertJoin = () => {
    axios.post('/member/insertMember',memberData)
    .then((res) => {
      navigate('/')
    })
    .catch((error)=>{console.log(error)})
  }
  return (
    <div>
      <div className='join-div'>
        <div>회원가입</div>
        <div>
          <div>회원이름</div>
          <div><input name='memName' type='text' placeholder="이름을 입력하세요" onChange={(e) => {changeData(e)}}/></div>
          <div>회원주민번호</div>
          <div><input name='memRrn' type='password' placeholder="전화번호를 입력하세요" onChange={(e) => {changeData(e)}}/></div>
          <div>전화번호</div>
          <div>
          
    <input name='memTel' type="text" onChange={(e)=>{autoHyphen2(e)}} value={phoneNumber} maxlength="13" placeholder="전화번호를 입력하세요" />
          </div>
          <div><button className='join-btn' onClick={() => {insertJoin()}}>가입하기</button></div>
        </div>
        
      </div>
      <button className='join-btn' onClick={() => {
        setMemberData({...memberData,memRole : 'USER'})
      }}>고객용</button>
      <button className='join-btn' onClick={() => {
        setMemberData({...memberData,memRole : 'ADMIN'})
      }}>관리자용</button>
    </div>
  )
}

export default JoinForm