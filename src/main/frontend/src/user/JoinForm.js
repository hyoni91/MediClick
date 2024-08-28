import React, { useEffect, useState } from 'react'
import './JoinForm.css'
import axios from 'axios'
import { useNavigate, useNavigation } from 'react-router-dom'
const JoinForm = () => {
  //회원가입 담을 변수
  const [memberData, setMemberData] = useState({
    memNum : '',
    memName : '',
    memRrn : '',
    memTel : '',
    memRole : 'USER'
  })
  
  //이동페이지 할수있게 네비게이션
  const navigate = useNavigate()
  //데이터가 바뀔때마다 저장되는 함수
  const changeData = (e) => {
    const {name} = e.target;
    // 입력 값 변경 시 오류 리셋
    setErrors((e) => ({
      ...e,
      [name]: ''
    }));
    // 상태 업데이트
    setMemberData((e) => ({
      ...e,
      [name]: e.target
    }));
    setMemberData({
      ...memberData
      
      , [e.target.name] : e.target.value
    })
  }
  const regex = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[-]\d{7}$/
  //전화번호 정규식
  const [phoneNumber, setPhoneNumber] = useState('');
  const autoHyphen2 = (e) => {
    setMemberData({...memberData,memTel :e.target.value})
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    
      setPhoneNumber(value);
      // 저장된 전화번호를 memberData에 저장
      // 전화번호 변경 시 오류 리셋
    setErrors(prevErrors => ({
      ...prevErrors,
      memTel: ''
    }));
  };
   // 오류 메시지를 관리하기 위한 상태
  const [errors, setErrors] = useState({});
  const validate = () => {
    let isValid = true;
    let errors = {};
    // 이름 검사
    if (!memberData.memName) {
      isValid = false;
      errors.memName = '이름을 입력해주세요.';
    }
    // 주민 검사
    if (!memberData.memRrn) {
      isValid = false;
      errors.memRrn = '주민번호를 입력해주세요.';
    }
    // 전화번호 검사
    if (!memberData.memTel) {
      isValid = false;
      errors.memTel = '전화번호을 입력해주세요.';
    }
    setErrors(errors);
    return isValid;
  }
  const insertJoin = () => {

    console.log(memberData)
    // 유효성 검사
    if (validate()){
    axios.post('/member/insertMember',memberData)
    .then((res) => {
      navigate('/')
    })
    .catch((error)=>{console.log(error)})
    }
  }
  return (
    <div>
        <div><h1>회원가입</h1></div>
      <div className='join-div'>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input name='memName' type='text' placeholder="이름을 입력하세요" onChange={(e) => {changeData(e)}}/></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
              {errors.memName && <tr className='error'><td></td><td >{errors.memName}</td></tr>}
            <tr>
              <td>회원주민번호</td>
              <td><input name='memRrn' maxLength={13} type='password' placeholder="주민번호를 입력하세요" onChange={(e) => {changeData(e)}}/></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
            {errors.memRrn && <tr className='error'><td></td><td >{errors.memRrn}</td></tr>}
            <tr>
              <td>전화번호</td>
              <td>
              
        <input name='memTel' type="text" onChange={(e)=>{
          autoHyphen2(e)
        }} value={memberData.memTel} maxLength='13' placeholder="전화번호를 입력하세요" /></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
            {errors.memTel && <tr className='error'><td></td><td >{errors.memTel}</td></tr>}
          </tbody>
        </table>
          <div><button className='join-btn' onClick={() => {insertJoin()}}>가입하기</button></div>
        
      </div>
        <div className='relative-container'>
        <button className='join-btn btn-user' onClick={() => {
          setMemberData({...memberData,memRole : 'USER'})
        }}>고객용</button>
        <button className='join-btn btn-admin' onClick={() => {
          console.log(memberData)
          setMemberData({...memberData,memRole : 'ADMIN'})
          console.log(memberData)
        }}>관리자용</button>
      </div>
    </div>
  )
}

export default JoinForm