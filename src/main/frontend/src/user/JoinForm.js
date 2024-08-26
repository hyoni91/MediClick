import React from 'react'
import './JoinForm.css'

const JoinForm = () => {
  const autoHyphen2 = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }
  return (
    <div className='join-div'>
      <div>
        회원가입
      </div>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>
              <input type='text' name='' onChange={() => {}}/>
            </td>
          </tr>
          <tr>
            <td>주민등록번호</td>
            <td>
              <input type='password' name='' onChange={() => {}}/>
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td><input type='tel' onChange={(e) => {
              autoHyphen2(e)
            }} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default JoinForm