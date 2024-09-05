import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserServiceMain.css'

const UserServiceMain = ({loginInfo}) => {
  const navigate = useNavigate();
  // 조회된 게시글 목록 저장 변수
  const [boardList, setBoardList] = useState([]);

  // // 검색 조건 저장 변수
  // const [searchData, setSearchData] = useState({
  //   searchType : 'TITLE',
  //   searchValue : ''
  // });

  // function changeSearchDate(e){
  //   setSearchData({
  //     ...searchData,
  //     [e.target.name] : e.target.value
  //   });
  // }

  // 게시글 목록 조회
  useEffect(()=>{
    axios.post('/board/list')
    .then((res)=>{setBoardList(res.data);})
    .catch((error)=>{console.log(error);})
  },[]);

  // // 검색 버튼 클릭 시 실행 함수
  // function searchBoard(){
  //   axios.post('/board/list', data)
  //   .then((res)=>{setBoardList(res.data);})
  //   .catch((error)=>{console.log(error);})
  // }

  return (
    <div>
      <div className='board-list-div'>
        <table>
          <colgroup>
            <col width='70px'/>
            <col width='400px'/>
            <col width='150px'/>
            <col width='300px'/>
          </colgroup>
          <thead className='board-list-div-thead'>
            <tr>
              <td>No</td>
              <td>제 목</td>
              <td>작성자</td>
              <td>작성일</td>
            </tr>
          </thead>
          <tbody className='board-list-div-tbody'>
            {
              boardList.map((board, i) => {
                return (
                  <tr key={i}>
                    <td>{boardList.length - i}</td>
                    <td>
                      <span className='go-userServiceDetail' onClick={(e)=>{navigate(`/detail/${board.boardNum}`)}}>{board.title}</span>
                    </td>
                    <td className='go-userServiceDetail-wirter'>{board.writer}</td>
                    <td>{board.createDate}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className='btn-div'>
        {
          loginInfo.memName != null ? 
          <button className='btn' onClick={()=>{
            navigate('/userService')
          }}>글쓰기</button>
          :
          null
        }
      </div>
    </div>
  )
}

export default UserServiceMain