import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useNavigate, useParams } from 'react-router-dom';

const DocMemList = () => {

  const navigate=useNavigate()
  const [page,setPage]=useState({})


  // 예약 리스트 담을 변수
  const [infoList,setInfoList]=useState([])


  // 의사 하나의 환자예약정보 담을 변수
  const [oneDoc,setOneDoc]=useState({
    schNum:'',
    schStatus:'',
    docNum : '',
    docName:'',
    medicalDept:{
      deptName:''
    }
  })

  const {docNum}=useParams()


  //선택한 페이지 bold 유지
  function changeBold(e){

    let bb=document.querySelectorAll('.num')
    bb.forEach((b,i)=>{
      if(e.currentTarget==b){
        b.classList.add('active')
      }
      else{
        b.classList.remove('active')
      }
    })
  }


  // console.log(infoList)
  // console.log(oneDoc)

  // 예약취소
  function goDelete(schNum){
    axios
    .put(`/schedule/updateSchStatus/${schNum}`)
    .then((res)=>{
      alert('예약이 취소되었습니다.')

      // 예약 취소 후 상태를 업데이트
      setInfoList((prevList)=>
        prevList.map((item)=>
          item.schNum === schNum ? 
          {...item, schStatus:'N'} : item
        )
      )

    })
    .catch((error)=>{console.log(error)})
  }

  //페이징 그리기
  function drawPagination(){
    const pagesArr=[];
    if(page.prev){
      pagesArr.push(<span key="prev" className='page-span' 
        onClick={(e)=>{getList(page.beginPage-1)}}> 이전 </span>)
    }

    //페이징 처리한 곳에서 숫자(페이지 번호)를 클릭하면 다시 게시글 조회
    function getList(pageNo){
      axios
      .post(`/schedule/getDocMemList`,{pageNo,docNum})
      .then((res)=>{
        setInfoList(res.data.scheduleList)
        setPage(res.data.pageInfo)
      })
      .catch((error)=>{console.log(error)})
    }

    for(let a=page.beginPage; a<=page.endPage; a++){
      pagesArr.push(<span key={`page-${a}`} className='page-span num' 
        onClick={(e)=>{
          changeBold(e)
          getList(a)}}>{a}</span>)
    }

    if(page.next){
      pagesArr.push(<span className='page-span' key="next"
        onClick={(e)=>{getList(page.endPage+1)}}> 다음 </span>)
    }

    return pagesArr

  }

  //의사정보
  useEffect(()=>{
    axios
    .get(`/oneDoctor/${docNum}`)
    .then((res)=>{
      console.log(res.data)
      setOneDoc(res.data||
        {docNum:'',docName:'',medicalDept:{deptName:''}})
      
    })
    .catch((error)=>{console.log(error)})
    
  },[docNum])


  //의사별 담당환자 리스트  
  useEffect(()=>{

    axios
    .post(`/schedule/getDocMemList`,{'docNum':docNum})
    .then((res)=>{
      setInfoList(res.data.scheduleList)
      setPage(res.data.pageInfo)

    })
    .catch((error)=>{
      console.log(error)
    })
    
  },[docNum])

  

  return (
    <div>

      <div className='docInfo-div'>
        <h2>의료진 정보</h2>
        <h4>| 나의 정보</h4>
        <table className='docInfo-table'>
          <colgroup>
            <col width='50%'/>
            <col width='50%'/>
          </colgroup>
          <thead>
            <tr>
              <td>이름</td>
              <td>진료과</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{oneDoc.docName}</td>
              <td>{oneDoc.medicalDept.deptName}</td>
            </tr>
                
          </tbody>
        </table>
      </div>
      
      <div className='chart-div'>
        <h4>| 담당 환자 정보</h4>
        <table className='chart-table'>
          <colgroup>
            <col width='2%'/>
            <col width='18%'/>
            <col width='20%'/>
            <col width='50%'/>
            <col width='10%'/>

          </colgroup>

          <thead>
            <tr>
              <td>No</td>
              <td>진료일</td>
              <td>환자명</td>
              <td>증상</td>
              <td>예약 상태</td>
            </tr>
          </thead>
          <tbody>
            {
              infoList.length===0?
              <tr>
                <td colSpan={4}>
                  <p>예약 환자가 없습니다.</p>
                </td>
              </tr>
              :
              infoList.map((info,i)=>{
                return(
                <tr key={i}>
                  <td>{info.schNum}</td>
                  <td>{info.schDate}</td>
                  <td><span onClick={(e)=>{navigate(`/admin/docMemInfo/${info.schNum}`)}}>{info.memberVO.memName}</span></td>
                  <td>{info.detail}</td>
                  <td>
                    {
                      info.schStatus==='Y'?
                      (<button type='button' onClick={(e)=>{goDelete(info.schNum)}}>취소</button>)
                      :
                      (<p className='cancel'>취소</p>)
                    }
                  </td>
                </tr>
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

export default DocMemList