import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UserServiceDetail.css'

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

  console.log(loginInfo);
  console.log(BoardDetail);
  return (
    <div>
      <div className='userServiceDetail-table-div'>
        <table>
          <colgroup>
            <col width='330px'/>
            <col width='150px'/>
            <col width='440px'/>
          </colgroup>
          <thead>
            <tr className='thead-div'>
              {/* <td>No</td> */}
              <td>제 목</td>
              <td>작성자</td>
              <td>작성일</td>
            </tr>
            <tr className='tbody-div'>
              {/* <td>{BoardDetail.boardNum}</td> */}
              <td>{BoardDetail.title}</td>
              <td>{BoardDetail.writer}</td>
              <td>{BoardDetail.createDate}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='thead-div'>내용</td>
              <td colSpan={2} className='tbody-div'>{BoardDetail.content}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='userServiceDetail-btn-div'>
        <button type='button' onClick={(e)=>{navigate(-1)}} className='btn'>목록</button>
        {
          loginInfo.memRole == 'ADMIN' || loginInfo.memNum == BoardDetail.memNum ? 
          <>
          <button type='button' className='btn' onClick={(e)=>{navigate(`/userServiceUpdate/${BoardDetail.boardNum}`)}}>게시글 수정</button>
          <button type='button' className='btn' onClick={(e)=>{deletePost(BoardDetail.boardNum)}}>게시글 삭제</button>
          </>
          :
          null
        }
      </div>
    </div>
  )
}

export default UserServiceDetail