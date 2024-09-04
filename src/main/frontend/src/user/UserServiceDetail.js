import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserServiceDetail = ({loginInfo}) => {
  const navigate = useNavigate();
  const {boardNum} = useParams();

  // 게시글 상세 정보 저장할 변수
  const [BoardDetail, setBoardDetail] = useState({});

  useEffect(()=>{
    axios.get(`/board/detail/${boardNum}`)
    .then((res)=>{setBoardDetail(res.data)})
    .catch((error)=>{console.log(error)})
  },[])

  // 게시글 삭제
  function deletePost(boardNum){
    axios.delete(`/board/delete/${boardNum}`)
    .then((res)=>{
      alert('게시글 삭제')
      navigate('/userServiceMain')
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <div>
      <div className='userServiceDetail-table-div'>
        <table>
          <colgroup>
            <col width='10%'/>
            <col width='*'/>
            <col width='20%'/>
            <col width='25%'/>
          </colgroup>
          <thead>
            <tr>
              {/* <td>No</td> */}
              <td>제 목</td>
              <td>작성자</td>
              <td>작성일</td>
              
            </tr>
            <tr>
              {/* <td>{BoardDetail.boardNum}</td> */}
              <td>{BoardDetail.title}</td>
              <td>{BoardDetail.writer}</td>
              <td>{BoardDetail.createDate}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>내용</td>
              <td>{BoardDetail.content}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='userServiceDetail-btn-div'>
        <button type='button' onClick={(e)=>{navigate(-1)}}>목록</button>
        {
          loginInfo.memRole == 'ADMIN' || loginInfo.memId == BoardDetail.memId ? 
          <>
          <button type='button' onClick={(e)=>{navigate(`/userServiceUpdate/${BoardDetail.boardNum}`)}}>게시글 수정</button>
          <button type='button' onClick={(e)=>{deletePost(BoardDetail.boardNum)}}>게시글 삭제</button>
          </>
          :
          null
        }
      </div>
    </div>
  )
}

export default UserServiceDetail