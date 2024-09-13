import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './ChartList.css'

const ChartList = props => {

  const [memberList, setMemberList] = useState([])
  const [searchValue , setSearchValue] = useState({})

  useEffect(()=>{
    axios.post(`/patientChart/memberList`,searchValue)
    .then((res)=>{
      setMemberList(res.data)
    })
    .catch((error)=>{
      alert(error)
      console.log(error)
    })
  },[])


  function searchMember(){
    axios.post(`/patientChart/memberList`,searchValue)
    .then((res)=>{
      setMemberList(res.data)
      console.log(memberList)
    })
    .catch((error)=>{
      alert(error)
      console.log(error)
    })
  }


  return (
    <div>
        <h2> 차트 관리 리스트 </h2>
      <div className='chart-div'>
        <div className='chart-list-header'>
          <h4>| 환자 정보</h4>
          <input type='text' 
          placeholder='환자이름' name='searchValue' 
          onChange={(e)=>{
            setSearchValue({
              ...searchValue,
              [e.target.name] : e.target.value
            })
          }} />
          <div>
            <button type='button'
              onClick={()=>{searchMember()}}
            >검색</button>
            </div>
        </div>
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
              <td>환자명</td>
              <td>환자번호</td>
              <td>주민번호</td>
              <td>비고란</td>
            </tr>
          </thead>
          <tbody>
            {
              memberList.map((mem,i)=>{
                return(
                  <tr>
                    <td>{mem.memName}</td>
                    <td>{mem.memNum}</td>
                    <td>{mem.memRrn}</td>
                    <td></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

ChartList.propTypes = {}

export default ChartList