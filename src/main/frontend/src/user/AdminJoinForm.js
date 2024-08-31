import React, { useEffect, useState } from 'react'
import './AdminJoinForm.css'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const AdminJoinForm = () => {
  const {docNum} = useParams()
  //조회를 했을때 닥넘이랑,닥네임,디이피티넘
  const navigate = useNavigate()
  //
  const [memData , setMemData] =useState({})
  // 의사데이터 저장할 변수
  const [docData, setDocData] = useState({
    docNum: docNum,
    docName: '',
    deptNum : '1',
    medicalDept: {}, 
    imgVO: {}
  })
  // 의사 번호
  // 의사 데이터 가져오기
  useEffect(() => {
    axios.get(`/member/getOneMem/${docNum}`)
    .then((res) => {
      console.log(res.data)
      setMemData(res.data)
      setDocData({...docData,docName : res.data.memName})
    })
    .catch((error) => {console.log(error)})
  },[])
  // 의사 진료과 선택
  const onChangeDept = (e) => {
    let value = e.target.value
    setDocData({...docData, [e.target.name] :value})
    console.log(docData)
  }
  const [docImg , setDocImg] = useState(null);

  //의사 등록 버튼
  const insertDoctor = (e) => {
    //의사 이미지 등록

    const fileConfig = {
      headers : {'Content-Type' : 'multipart/form-data'}
    }
    //form 객체 생성
    const docimgForm = new FormData();

    //2. form 객체에 데이터 추가

    docimgForm.append('docNum', docData.docNum );
    docimgForm.append('docNum', docData.docName );
    docimgForm.append('docNum', docData.deptNum );
    docimgForm.append('docImg', docImg );


    axios.post('/insertDoctor', docData,fileConfig)
    .then((res) => {
      console.log(res.data)
      navigate('/loginForm')
    })
    .catch((error) => {console.log(error)})
  }

  const deleteDoctor = (e) => {
    axios.get('')
  }
  //반드시 아래의 설정 코드를 axios에 추가!!!
  return (
    <div>
        <div><h1 className='join-head'>의사 정보</h1></div>
      <div className='join-div'>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input className='adminJoin-input' name='docName' value={memData.memName} type='text' readOnly/></td>
              
            </tr>
            <tr>
              <td>진료과</td>
              <td>
                <select name='deptNum' onChange={(e) => {onChangeDept(e)}}>
                  <option value={'1'}>유방암 외과</option>
                  <option value={'2'}>신경외과</option>
                  <option value={'3'}>갑상선외과</option>
                  <option value={'4'}>산부인과</option>
                  <option value={'5'}>흉부외과</option>
                  <option value={'6'}>혈액 종양 내과</option>
                </select>
                </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td >
              
        <input name='memTel' type="text" value={memData.memTel} readOnly onChange={(e)=>{
          // autoHyphen2(e)
        }} className='adminJoin-input'  maxLength='13' placeholder="전화번호를 입력하세요" /></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
            {/* {errors.memTel && <tr className='error'><td></td><td >{errors.memTel}</td></tr>} */}
          </tbody>
        </table>
        {/* 의사 이미지 */}
        <div>ddd
          <input type='file' onChange={(e) => {
            setDocImg(e.target.files[0])
          }}/>
        </div>
          <div>
            <button className='join-btn' onClick={() => {navigate('/joinForm')}}>취소</button>
            <button className='join-btn' onClick={() => {insertDoctor()}}>저장</button>
            
          </div>
        
      </div>
    </div>
  )
}

export default AdminJoinForm