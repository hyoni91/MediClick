import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DocMemList.css';
import { useNavigate, useParams } from 'react-router-dom';

const DocMemList = () => {

  const navigate=useNavigate()
  const [page,setPage]=useState({})
  const [currentPage,setCurrentPage]=useState(1)

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




  // console.log(infoList)
  // console.log(oneDoc)

  //예약상태가 N일때 tr 텍스트 변경
  const cancelLine={color:'lightgray'}

  // 예약취소
  function goDelete(schNum){
    if(window.confirm('예약을 취소하시겠습니까?')){
      axios
      .delete(`/schedule/updateSchStatus/${schNum}`)
      .then((res)=>{

        alert('예약이 취소되었습니다.')
        
        // 예약 취소 후 스케줄 삭제
        infoList.forEach((info,i)=>{
          if(info.schNum==schNum){
            infoList.splice(i,1)
          }
        })
        setInfoList([...infoList])

      // // 예약 취소 후 상태를 업데이트 (delete가 아니라 update로 Y > N로 상태만 변경할 때)
      // setInfoList((prevList)=>
      //   prevList.map((item)=>
      //     item.schNum === schNum ? 
      //     {...item, schStatus:'N'} : item
      //   )
      // )
  
      })
      .catch((error)=>{console.log(error)})
    }


  }

  //페이징 그리기
  function drawPagination(){
    const pagesArr=[];
    if(page.prev){
      pagesArr.push(<span key="prev" className='page-span' 
        onClick={(e)=>{getList(page.beginPage-1)}}> 이전 </span>)
    }

    for(let a=page.beginPage; a<=page.endPage; a++){
      pagesArr.push(<span key={`page-${a}`} className={`page-span num ${a === currentPage ? 'active' : ''}`}
        onClick={() => getList(a)}>{a}</span>)
    }

    if(page.next){
      pagesArr.push(<span className='page-span' key="next"
        onClick={(e)=>{getList(page.endPage+1)}}> 다음 </span>)
    }

    return pagesArr

  }

  //페이징 처리한 곳에서 숫자(페이지 번호)를 클릭하면 다시 게시글 조회
  function getList(pageNo=1){
    axios
    .post(`/schedule/getDocMemList`,{pageNo,docNum})
    .then((res)=>{
      setInfoList(res.data.scheduleList)
      setPage(res.data.pageInfo)
      setCurrentPage(pageNo)
    })
    .catch((error)=>{console.log(error)})
  }

  
  //선택한 페이지 bold 유지
  // function changeBold(e){

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
    getList(1)
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
            {/* <col width='10%'/> */}
            <col width='15%'/>
            <col width='15%'/>
            <col width='45%'/>
            <col width='10%'/>

          </colgroup>

          <thead>
            <tr>
              {/* <td>예약번호</td> */}
              <td>진료일</td>
              <td>환자명</td>
              <td>증상</td>
              <td>취소</td>
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
                  {/* <td style={info.schStatus === 'N'?cancelLine:null}>{info.schNum}</td> */}
                  <td style={info.schStatus === 'N'?cancelLine:null}>{info.schDate}</td>
                  <td style={info.schStatus === 'N'?cancelLine:null}>
                    <span onClick={(e)=>{navigate(`/admin/docMemInfo/${info.schNum}`)}}>{info.memberVO.memName}</span>
                  </td>
                  <td style={info.schStatus === 'N'?cancelLine:null}>{info.detail}</td>
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