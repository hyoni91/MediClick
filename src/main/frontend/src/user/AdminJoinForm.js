import React from 'react'
import './AdminJoinForm.css'
const AdminJoinForm = () => {
  return (
    <div>
        <div><h1>회원가입</h1></div>
      <div className='join-div'>
        <table className='join-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input name='memName' type='text' placeholder="이름을 입력하세요"/></td>
            </tr>
            <tr>
              <td>회원주민번호</td>
              <td><input name='memRrn' maxLength={13} type='password' placeholder="주민번호를 입력하세요" onChange={(e) => {changeData(e)}}/></td>
            </tr>
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
    </div>
  )
}

export default AdminJoinForm