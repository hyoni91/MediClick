import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MySch.css';
import axios from 'axios';

const MySch = () => {
  // 환자가 보는 나의 예약페이지

  const {memNum} = useParams();
  const [page,setPage]=useState({})

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
    axios
    .put(`/schedule/updateSchStatus/${schNum}`)
    .then((res)=>{
      alert('예약이 취소되었습니다.')

      //예약 취소 후 상태 업데이트
      setMemSchInfo((prevList)=>
        prevList.map((item)=>
          item.schNum === schNum?
          {...item,schStatus:'N'}:item
        )
      )
    })
    .catch((error)=>{console.log(error)})
  }

  //페이징 그리기
  function drawPagination(){
    const pagesArr=[]
    if(page.prev){
      pagesArr.push()
    }

    //페이징 처리한 곳에서 숫자(페이지 번호)를 클릭하면 다시 게시글 조회
    function getList(pageNo){
      axios
      .post()
      .then((res)=>{
  
      })
      .catch((error)=>{console.log(error)})  
      
    }

    for(let a=page.beginPage; a<=page.endPage; a++){
      pagesArr.push()
    }

    if(page.next){
      pagesArr.push()

    }

    return pagesArr

  }

  //선택한 페이지 bold 유지
  function cheangeBold(e){

  }




  useEffect(()=>{
    axios
    .get(`/member/getOneMem/${memNum}`)
    .then((res)=>{
      console.log(res.data)
      setOneMem(res.data)
    })
    .catch((error)=>{console.log(error)})


    axios
    .get(`/schedule/getMemSch/${memNum}`)
    .then((res)=>{
      console.log(res.data)
      setMemSchInfo(res.data)

    })
    .catch((error)=>{console.log(error)})

  },[])

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
    
    </div>
  )
}

export default MySch