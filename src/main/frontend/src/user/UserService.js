import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserService = () => {
  const navigate = useNavigate();

  const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'));
  // 글 등록시 가져갈 데이터
  const [insertBoardData, setInsetBoardData] = useState({
    title : '',
    writer : '',
    content : '',
    memNum : loginInfo ? loginInfo.memNum  : ''
  })
  // 변경 되는 데이터를 저장할 함수
  function changeInsertBoardData(e){
    setInsetBoardData({
      ...insertBoardData,
      [e.target.name] : e.target.value
    });
  }
  // 글 등록
  function regBoard(){
    axios.post(`/board/insert`, insertBoardData)
    .then((res)=>{alert('글 등록'); navigate('/board');})
    .catch((error)=>{console.log(error);})
  }
  return (
    <div>
      <div>
        제목 <input type='text' name='title' onChange={(e)=>{changeInsertBoardData(e)}}/>
      </div>
      <div>
        작성자 <input type='text' name='writer' onChange={(e)=>{changeInsertBoardData(e)}}/>
      </div>
      <div>
        내용 <textarea name='content' onChange={(e)=>{changeInsertBoardData(e)}} />
      </div>
      <button type='button' onClick={(e)=>{regBoard()}}>글 등록</button>
    </div>
  )
}

export default UserService