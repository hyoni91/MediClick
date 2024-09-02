import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './UserService.css'
const UserService = () => {
  const navigate = useNavigate();

  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'));

  // 글 등록시 가져갈 데이터
  const [insertBoardData, setInsertBoardData] = useState({
    title : '',
    writer : '',
    content : '',
    memNum : loginInfo ? loginInfo.memNum  : ''
  })
  // 변경 되는 데이터를 저장할 함수
  function changeInsertBoardData(e){
    setInsertBoardData({
      ...insertBoardData,
      [e.target.name] : e.target.value
    });
  }
  // 글 등록
  function regBoard(){
    axios.post('/board/insert', insertBoardData)
    .then((res)=>{alert('글 등록'); console.log(insertBoardData);navigate('/userServiceMain');})
    .catch((error)=>{console.log(error);})
  }
  return (
    <div className='user-service-div'>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td><input type='text' name='title' onChange={(e)=>{changeInsertBoardData(e)}}/></td>
          </tr>
          <tr>
            <td>작성자</td>
            <td><input type='text' name='writer' onChange={(e)=>{changeInsertBoardData(e)}}/></td>
          </tr>
          <tr>
            <td className='userService-content'>내용</td>
            <td><textarea name='content' onChange={(e)=>{changeInsertBoardData(e)}} /></td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='userService-btn' onClick={(e)=>{regBoard()}}>글 등록</button>
      <button type='button' className='userService-btn userService-btn2' onClick={(e)=>{navigate(-1)}}>목록</button>
    </div>
  )
}

export default UserService