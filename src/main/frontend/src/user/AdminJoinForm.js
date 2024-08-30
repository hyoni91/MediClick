import React, { useEffect, useState } from 'react'
import './AdminJoinForm.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const AdminJoinForm = () => {
  // 의사데이터 저장할 변수
  const [docData, setDocData] = useState({
    docNum: '',
    docName: '',
    deptNum : '',
    medicalDept: {}, 
    imgVO: {}
  })
  // 의사 번호
  const {docNum} = useParams()
  console.log(docNum)
  // 의사 데이터 가져오기
  useEffect(() => {
    axios.get(`/selectDoctor/${docNum}`)
    .then((res) => {
      console.log(res.data)
      setDocData(res.data)
    })
    .catch((error) => {console.log(error)})
  },[])
  // 의사 진료과 선택
  const onChangeDept = (e) => {
    let value = e.target.value
    setDocData({...docData, [e.target.name] :value})
    console.log(docData)
  }
  const insertDoctor = (e) => {
    axios.post('/insertDoctor', docData)
    .then((res) => {console.log(res.data)})
    .catch((error) => {console.log(error)})
  }
  return (
    <div>
        <div><h1 className='join-head'>의사 정보</h1></div>
      <div className='join-div'>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input className='adminJoin-input' name='memName' defaultValue={docData.docName} type='text' /></td>
              
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
              
        <input name='memTel' type="text" value={docData.docNum} readOnly onChange={(e)=>{
          // autoHyphen2(e)
        }}  maxLength='13' placeholder="전화번호를 입력하세요" /></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
            {/* {errors.memTel && <tr className='error'><td></td><td >{errors.memTel}</td></tr>} */}
          </tbody>
        </table>
          <div>
            <button className='join-btn' onClick={() => {}}>취소</button>
            <button className='join-btn' onClick={() => {insertDoctor()}}>저장</button>
          </div>
        
      </div>
    </div>
  )
}

export default AdminJoinForm