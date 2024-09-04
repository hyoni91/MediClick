import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserServiceUpdate = () => {
  const {boardNum} = useParams();

  // 게시글 상세 정보 저장 state 변수
  const [BoardDetail, setBoardDetail] = useState({});

  // 수정 쿼리 실행 빈 값 채워줄 데이터
  const [updateData, setUpdateData] = useState({
    boardNum : boardNum,
    content : ''
  });

  function changeUpdateData(e){
    setUpdateData({
      ...updateData,
      [e.target.name] : e.target.value
    });
  }

  // 게시글 상세 정보 조회
  useEffect(()=>{
    axios.get(`/board/detail/${boardNum}`)
    .then((res)=>{
      setBoardDetail(res.data);
      setUpdateData({
        ...updateData,
        content : res.data.content
      });
    })
    .catch((error)=>{console.log(error);});
  },[]);

  const navigate = useNavigate();
  // 게시글 수정 쿼리 실행
  function updateBoard(){
    if(updateData.content == ''){
      alert('게시글 내용을 다시 확인해 주세요.')
    }else{
      axios.put('/board/update', updateData)
      .then((res)=>{
        alert('게시글이 수정 되었습니다.');
        navigate(`/detail/${boardNum}`);
      })
      .catch((error)=>{console.log(error);});
    }
  }
  return (
    <div>
      <div className='userServiceUpdate-table-div'>
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
                <td>내용 <span className='userService-notNull'>*</span></td>
                <td><textarea value={updateData.content} maxLength={1000} name='content' onChange={(e)=>{changeUpdateData(e)}}/></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='userServiceUpdate-btn-div'>
          <button type='button' onClick={(e)=>{navigate(-1)}}>뒤로가기</button>
          <button type='button' onClick={(e)=>{updateBoard()}}>게시글 수정</button>
        </div>
    </div>
  )
}

export default UserServiceUpdate