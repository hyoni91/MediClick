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
    const {name, value} = e.target;
    // 상태 업데이트
    setMemberData((e) => ({
      ...e,
      [name]: value,
    }));

    // 입력 값 변경 시 오류 리셋
    setErrors((e) => ({
      ...e,
      [name]: ''
    }));
  }
  // 전화번호 입력 시 자동 하이픈 기능
  const formatPhoneNumber = (value) => {
    // 입력값에서 숫자만 추출
    const rawValue = value.replace(/[^0-9]/g, '');
  
    // 숫자 길이에 따라 하이픈 추가
    let formattedValue = '';
  
    if (rawValue.length <= 3) {
      formattedValue = rawValue;
    } else if (rawValue.length <= 7) {
      formattedValue = rawValue.slice(0, 3) + '-' + rawValue.slice(3);
    } else {
      formattedValue = rawValue.slice(0, 3) + '-' + rawValue.slice(3, 7) + '-' + rawValue.slice(7);
    }
    
    // 오류 리셋
    setErrors((e) => ({
      ...e,
      memTel: '',
  }));
    return formattedValue;
  };
// 전화번호 입력 중 하이픈 추가
const handlePhoneChange = (e) => {
  if (e && e.target) {
    const { value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      memTel: formatPhoneNumber(value),
    }));
  }
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
      console.log(res.data)
      if(res.data.memRole === 'ADMIN'){
      navigate(`/adminJoinForm/${res.data.memNum}`)
      }
      else{navigate('/loginForm')}
    })
    .catch((error)=>{console.log(error)})
    }
  }
  
  useEffect(() => {
  }, [memberData])
  return (
    <div>
        <div><h1>회원가입</h1></div>
      <div className='join-div'>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input name='memName' type='text' placeholder="이름을 입력하세요" onChange={(e) => {changeData(e)
                console.log(memberData)

              }
              
            }/></td>
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
          handlePhoneChange(e)
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