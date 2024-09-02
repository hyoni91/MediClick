import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserServiceDetail = ({loginInfo}) => {
  const {boardNum} = useParams();

  // 게시글 상세 정보 저장할 변수
  const [BoardDetail, setBoardDetail] = useState({});

  // 댓글 목록 저장할 변수
  // const [selectReply, setSelectReply] = useState([]);

  // 댓글 등록시 가져가야 하는 데이터 저장할 변수
  // const [replyData, setReplyData] = useState({})

  useEffect(()=>{
    axios.get(`/board/detail/${boardNum}`)
    .then((res)=>{setBoardDetail(res.data)})
    .catch((error)=>{console.log(error)})
  },[])

  // 게시글 삭제
  // function deletePost(boardNum){
  //   axios.
  // }

  return (
    <div>
      <table>
        <colgroup>
          <col width='10%'/>
          <col width='*'/>
          <col width='20%'/>
          <col width='25%'/>
        </colgroup>
        <thead>
          <tr>
            <td>No</td>
            <td>제 목</td>
            <td>작성자</td>
            <td>작성일</td>
            <td>내용</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{BoardDetail.boardNum}</td>
            <td>{BoardDetail.title}</td>
            <td>{BoardDetail.writer}</td>
            <td>{BoardDetail.createDate}</td>
            <td>{BoardDetail.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserServiceDetail