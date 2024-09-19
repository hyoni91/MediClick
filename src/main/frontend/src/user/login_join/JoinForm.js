import React, { useEffect, useState } from 'react'
import './JoinForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'
import JoinModal from './JoinModal'
import Agreement from './Agreement'
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

    //입력 값 변경시 유효성 검사 수행
    //이름 유효성 검사
    if(name =='memName'){
      // 이름 입력시 한글과 영어만 나오게
      const koEnRegex = /^[가-힣a-zA-Z]*$/;

      if(!koEnRegex.test(value)){
        setErrors((e) => ({
          ...e,
          [name]: '한글 또는 영어로만 입력하세요'
        }));
      }
      else {
        setErrors((e) => ({
          ...e,
          [name]: ''
        }));
      }
    }
    //주민번호 유효성 검사
    else if (name === 'memRrn') {
      const rrnRegex = /^\d{13}$/; // 13자리 숫자만 허용
      if (!rrnRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: '주민번호 13자리 입력해주세요.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    }
    // 입력 값 변경 시 오류 리셋
    else {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
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
    //약관동의
    if(!privacyCheck || !serviceCheck){
      alert('약관 동의해주세요')
      return;
    }
    console.log(memberData)
    // 유효성 검사
    if (validate()){
    axios.post('/member/insertMember',memberData)
    .then((res) => {
      if(res.data.memRole === 'ADMIN'){
      navigate(`/adminJoinForm/${res.data.memNum}`)
      }
      else{navigate('/loginForm')}
    })
    .catch((error)=>{console.log(error)})
    }
  }
  
  useEffect(() => {
    axios.get('/doctorList').then((res) => {}).catch()
  }, [memberData])

    // 전체 동의
const [allCheck, setAllCheck] = useState(false); 
// 개인회원 약관에 동의
const [privacyCheck, setPrivacyCheck] = useState(false); 
  // 개인정보 수집 및 이용 동의
const [serviceCheck, setServiceCheck] = useState(false);
// 마케팅 수신 동의 (선택)
const [marketingCheck, setMarketingCheck] = useState(false); 

// 전체선택 
const allChange = (e) => {
  const ischk = e.target.checked
    setAllCheck(ischk)
    setPrivacyCheck(ischk)
    setServiceCheck(ischk)
    setMarketingCheck(ischk)
}
// 상태를 토글하는 일반 함수
 // 전체 선택
  const toggleAllCheck = (e) => {
  const newValue = !allCheck;  // 현재 상태와 반대의 값을 설정
  setAllCheck(newValue);
  setPrivacyCheck(newValue);
  setServiceCheck(newValue);
  setMarketingCheck(newValue);
  
};
const togglePrivacyCheck = () => setPrivacyCheck(e => !e);
const toggleServiceCheck = () => setServiceCheck(e => !e);
const toggleMarketingCheck = () => setMarketingCheck(e => !e);

useEffect(() => {
  if(privacyCheck && serviceCheck&& marketingCheck ){
    setAllCheck(true)
  }
  else{
    setAllCheck(false)
  }
},[privacyCheck,serviceCheck,marketingCheck])

// 약관동의 모달
const [modalOpen, setModalOpen] = useState(false)
const [modalContent , setModalContent] = useState(null)

const openModal = (e) => {
  setModalContent(<Agreement type = {e} />)
  setModalOpen(true)
}
const closeModal = () => {setModalOpen(false)}


  return (
    <div className='join'>
        
      <div className='join-div'>
        <div><i className="bi bi-people-fill"></i></div>
        <div><h1>회원가입</h1></div>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input name='memName'value={memberData.memName} type='text' placeholder="이름을 입력하세요" onChange={(e) => {changeData(e)
                console.log(memberData)

              }
              
            }/></td>
            </tr>
            <tr >
              <td></td>
              {/* 데이터가 빈값일때 나타나는 변수 */}
              {/* 데이터가 다시 바뀌면 사라짐 */}
                <td className='error1'>{errors.memName && <><td ></td><td className='error '>{errors.memName}</td></>}</td>
            </tr>
            <tr>
              <td>회원주민번호</td>
              <td><input name='memRrn' maxLength={13} type='password' placeholder="주민번호를 입력하세요" onChange={(e) => {changeData(e)}}/></td>
            </tr>
            <tr >
              <td></td>
              {/* 데이터가 빈값일때 나타나는 변수 */}
              {/* 데이터가 다시 바뀌면 사라짐 */}
                <td className='error1'>{errors.memRrn && <><td ></td><td className='error '>{errors.memRrn}</td></>}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
              
        <input name='memTel' type="text" onChange={(e)=>{
          handlePhoneChange(e)
        }} value={memberData.memTel} maxLength='13' placeholder="전화번호를 입력하세요" /></td>
            </tr>
            <tr >
              <td></td>
              {/* 데이터가 빈값일때 나타나는 변수 */}
              {/* 데이터가 다시 바뀌면 사라짐 */}
                <td className='error1'>{errors.memTel && <><td ></td><td className='error '>{errors.memTel}</td></>}</td>
            </tr>
          </tbody>
        </table>
        {/* 약관 동의 */}
        <div className='join-checkbox'>
          <div>약관 동의</div>
          
            <div>
              <input type='checkbox' checked={allCheck} onChange={(e) => {allChange(e)}}/>
              <span  className='box-span' onClick={(e) => {toggleAllCheck(e)}}>전체선택</span>
            </div>
            <div className='join-check'>
              <div>
                <input type='checkbox' checked={privacyCheck}  onChange={(e) => {setPrivacyCheck(e.target.checked)}}/>
                <span className='box-span' onClick={(e) => {togglePrivacyCheck(e)}}><span>[필수]</span> 개인회원 약관에 동의</span>
              </div> 
              <i className="bi bi-caret-right" onClick={() => {openModal('privacy')}}></i>
            </div>
          <div className='join-check'>
            <div>
              <input type='checkbox' checked={serviceCheck}  onChange={(e) => {setServiceCheck(e.target.checked)}}/><span className='box-span' onClick={(e) => {toggleServiceCheck(e)}}><span>[필수]</span> 개인정보 수집및 이용에 동의</span>
            </div>
            <i className="bi bi-caret-right" onClick={() => {openModal('service')}}></i>
          </div>
          <div className='join-check'>
            <div>
              <input type='checkbox' checked={marketingCheck}  onChange={(e) => {setMarketingCheck(e.target.checked)}}/><span className='box-span' onClick={(e) => {toggleMarketingCheck(e)}}><span>[선택]</span> 마케팅 정보 수신 동의</span>
            </div>
            <i className="bi bi-caret-right" onClick={() => {openModal('marketing')}}></i>
          </div>

        </div>
          <div><button className='join-btn' onClick={() => {insertJoin()}}>가입하기</button></div>

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
          <JoinModal 
            isOpen={modalOpen}
            onRequestClose={closeModal}
            content={modalContent}
          />
    </div>
  )
}

export default JoinForm