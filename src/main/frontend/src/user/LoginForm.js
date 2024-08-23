import React, { useState } from 'react'
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({loginInfo,setLoginInfo}) => {
  const navigate=useNavigate()
  const [inputData,setInputData]=useState({
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
          memRole:res.data.memRole
        }

        //로그인정보 저장
        window.sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))


        setLoginInfo(loginInfo)

        alert(`${loginInfo.memName}님 반갑습니다.`)

        

        if(loginInfo.memRole=='USER'){
          navigate('/')
        }
        else if(loginInfo.memRole=='ADMIN'){
          navigate('/admin')
        }
        

      }
      else{

      }

    })
    .catch((error)=>{
      console.log(error)
    })



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