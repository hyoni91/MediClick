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
    if(insertBoardData.title == '' || insertBoardData.writer == '' || insertBoardData.content == ''){
      alert('게시글 내용을 다시 확인해 주세요.')
    }else{
      axios.post('/board/insert', insertBoardData)
      .then((res)=>{alert('글 등록'); console.log(insertBoardData);navigate('/userServiceMain');})
      .catch((error)=>{console.log(error);})
    }
  }
  return (
    <div className='user-service-div'>
      <table>
        <tbody>
          <tr>
            <td>제목 <span className='userService-notNull'>*</span></td>
            <td><input type='text' maxLength={20} name='title' onChange={(e)=>{changeInsertBoardData(e)}}/></td>
          </tr>
          <tr>
            <td>작성자 <span className='userService-notNull'>*</span></td>
            <td><input type='text' name='writer' maxLength={10} onChange={(e)=>{changeInsertBoardData(e)}}/></td>
          </tr>
          <tr>
            <td className='userService-content'>내용 <span className='userService-notNull'>*</span></td>
            <td><textarea name='content' onChange={(e)=>{changeInsertBoardData(e)}} maxLength={1000} /></td>
          </tr>
        </tbody>
      </table>
      <button type='button' className='userService-btn' onClick={(e)=>{regBoard()}}>글 등록</button>
      <button type='button' className='userService-btn userService-btn2' onClick={(e)=>{navigate(-1)}}>목록</button>
    </div>
  )
}

export default UserService