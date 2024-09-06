import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MySch.css';
import axios from 'axios';

const MySch = () => {
  // 환자가 보는 나의 예약페이지

  const {memNum} = useParams();
  const [page,setPage]=useState({})
  const [currentPage,setCurrentPage]=useState(1)

  const [oneMem,setOneMem]=useState({
    memNum:'',
    memName:'',
    memRrn:''
  })
  const [memSchInfo,setMemSchInfo]=useState([
    {schDate:'',
    schTime:'',
    memberVO:{
      memName:''
    },
    doctorVO:{
      medicalDept:{
        deptName:''
      }
    }
    }
  ])

  //예약상태가 N일때 tr 텍스트 변경
  const cancelLine={color:'lightgray'}

  //예약취소 
  function goDelete(schNum){
    if(window.confirm(`예약을 취소하시겠습니까?`)){
      axios
      .delete(`/schedule/updateSchStatus/${schNum}`)
      .then((res)=>{
        alert('예약이 취소되었습니다.')

        //예약 취소 후 스케줄 삭제
        memSchInfo.forEach((sch,i)=>{
          if(sch.schNum==schNum){
            memSchInfo.splice(i,1)
          }
        })
        setMemSchInfo([...memSchInfo])
  
        //예약 취소 후 상태 업데이트
        // setMemSchInfo((prevList)=>
        //   prevList.map((item)=>
        //     item.schNum === schNum?
        //     {...item,schStatus:'N'}:item
        //   )
        // )
      })
      .catch((error)=>{console.log(error)})
    }


  }

  //페이징 그리기
  function drawPagination(){
    const pagesArr=[]
    if(page.prev){
      pagesArr.push(<span key="prev" className='page-span'
      onClick={(e)=>{getList(page.beginPage-1)}}>이전</span>)
    }

    for(let a=page.beginPage; a<=page.endPage; a++){
      pagesArr.push(<span key={`page-${a}`} className={`page-span num ${a === currentPage ? 'active' : ''}`}
        onClick={() => getList(a)}>{a}</span>)
    }

    if(page.next){
      pagesArr.push(<span key="next" className='page-span'
      onClick={(e)=>{getList(page.endPage+1)}}>다음</span>)
    }

    return pagesArr

  }

  //페이징 처리한 곳에서 숫자(페이지 번호)를 클릭하면 다시 게시글 조회
  function getList(pageNo=1){
    axios
    .post(`/schedule/getMemSch`,{pageNo,memNum})
    .then((res)=>{
      setMemSchInfo(res.data.scheduleList)
      setPage(res.data.pageInfo)
      setCurrentPage(pageNo)
    })
    .catch((error)=>{console.log(error)})  
    
  }

  //선택한 페이지 bold 유지
  // function cheangeBold(e){
  //   let bb=document.querySelectorAll('.num')
  //   bb.forEach((b,i)=>{
  //     if(e.currentTarget==b){
  //       b.classList.add('active')
  //     }
  //     else{
  //       b.classList.remove('active')
  //     }
  //   })
  // }

  //환자정보
  useEffect(()=>{
    axios
    .get(`/member/getOneMem/${memNum}`)
    .then((res)=>{
      console.log(res.data)
      setOneMem(res.data)
    })
    .catch((error)=>{console.log(error)})

  },[memNum])

  //예약리스트 
  useEffect(()=>{
    getList(1)
  },[memNum])

  return (
    <div>
      
      
      <div className='mySch-div'>
        <h2>예약 확인</h2>

        <h4>| 회원 정보</h4>
        <table className='mySch-table'>
          <colgroup>
            <col width='50%'/>
            <col width='50%'/>
          </colgroup>

          <thead>
            <tr>
              <td>이름</td>
              <td>생년월일</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{oneMem.memName}</td>
              <td>{oneMem.memRrn}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className='mySch-div'>
        <h4>| 예약정보</h4>
        <table className='mySch-table'>
          <colgroup>
            <col width='15%'/>
            <col width='15%'/>
            <col width='20%'/>
            <col width='25%'/>
            <col width='15%'/>
            <col width='10%'/>
          </colgroup>

          <thead>
            <tr>
              <td>예약일</td>
              <td>예약시간</td>
              <td>환자명</td>
              <td>진료과</td>
              <td>담당 의사</td>
              <td>예약 상태</td>
            </tr>
          </thead>
          <tbody>
            {
              memSchInfo.memName==''?
              (<tr>
                <td colSpan={6}>예약정보가 없습니다.</td>
              </tr>)
              :
              memSchInfo.map((mem,i)=>{
                return(
                  (<tr key={i}>
                    <td style={mem.schStatus === 'N'?cancelLine:null}>{mem.schDate}</td>
                    <td style={mem.schStatus === 'N'?cancelLine:null}>{mem.schTime}</td>
                    <td style={mem.schStatus === 'N'?cancelLine:null}>{mem.memberVO.memName}</td>
                    <td style={mem.schStatus === 'N'?cancelLine:null}>{mem.doctorVO.medicalDept.deptName}</td>
                    <td style={mem.schStatus === 'N'?cancelLine:null}>{mem.doctorVO.docName}</td>
                    <td>
                      {
                        mem.schStatus=='N'?
                        (<p className='cancel'>취소</p>)
                        :
                        (<p><button type='button' onClick={(e)=>{goDelete(mem.schNum)}}>취소</button></p>)
                      }
                      
                      </td>
                  </tr>)
                )
              })
            }
            
          </tbody>
        </table>
      </div>

      <div className='page-spans'>
        {
          drawPagination()
        }
      </div>
    
    </div>
  )
}

export default MySch