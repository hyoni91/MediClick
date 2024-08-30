import React, { useState } from 'react'
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({loginInfo,setLoginInfo}) => {
  const navigate=useNavigate()
  const [inputData,setInputData]=useState({
    memNum:0,
    memName:'',
    memRrn:'',
    memRole:''
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
    .put('/member/goLogin',inputData)
    .then((res)=>{

      if(res.data!=''){
        const loginInfo={
          memName:res.data.memName,
          memRrn:res.data.memRrn,
          memRole:res.data.memRole,
          memNum:res.data.memNum
        }

        //로그인정보 저장
        window.sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))


        setLoginInfo(loginInfo)

        alert(`${loginInfo.memName}님 반갑습니다.`)

        

        
        navigate('/')

        // if(loginInfo.memRole=='USER'){
        //   navigate('/')
        // }
        // else if(loginInfo.memRole=='ADMIN'){
        //   navigate('/admin')
        // }


      }
      else{
        alert('성함과 주민번호를 확인하세요.')
      }

    })
    .catch((error)=>{
      console.log(error)
    })



  }

  return (
    <div className='login-div'>
      <div className='login-table-div'>

        <h2>로그인</h2>
        <div className='login-info'>회원 서비스는 로그인 이후 이용하실 수 있습니다.</div>
        <table className='login-table'>
          <thead></thead>
          <tbody>
            <tr>
              <td><input type='text' name='memName' placeholder='성함을 입력하세요.' 
              onChange={(e)=>{insertData(e)}}></input></td>
            </tr>

            <tr>
              <td><input type='password' name='memRrn' placeholder='주민등록번호를 입력하세요.'
              onChange={(e)=>{insertData(e)}}></input></td>
            </tr>
          </tbody>
        </table>

        <button type='button' className='loginBtn' onClick={(e)=>{goLogin()}}>로그인</button>

      </div>
    </div>
  )
}

export default LoginForm