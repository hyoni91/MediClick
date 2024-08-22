import React, { useState } from 'react'
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate=useNavigate()
  const [inputData,setInputData]=useState({

  })


  function insertData(e){
    setInputData({
      ...inputData,
      [e.target.name]:e.target.value
    })
    
  }


  function goLogin(){

    if(inputData.memName==''||inputData.memRrn==''){
      alert('성함과 주민번호를 입력해주세요.')
      return
    }

    axios
    .put('',inputData)
    .then((res)=>{

      if(res.data!=''){
        const loginInfo={
          memName:res.data.memName,
          memRrn:res.data.memRrn
        }
      }

      // window.sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))
      // setLoginInfo(loginInfo)

    })
    .catch((error)=>{
      console.log(error)
    })


    navigate('/')
    

  }

  return (
    <div className='login-div'>
      <div>

        <div>메디클릭 로그인</div>
        <table className='login-table'>
          <thead></thead>
          <tbody>
            <tr>
              <td>성명</td>
              <td><input type='text' name='memName' placeholder='성함을 입력하세요.' 
              onChange={(e)=>{insertData(e)}}></input></td>
            </tr>

            <tr>
              <td>주민등록번호</td>
              <td><input type='text' name='memRrn' placeholder='주민등록번호를 입력하세요.'
              onChange={(e)=>{insertData(e)}}></input></td>
            </tr>
          </tbody>
        </table>

        <button type='button' onClick={(e)=>{goLogin()}}>로그인</button>

      </div>
    </div>
  )
}

export default LoginForm