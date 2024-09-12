import React, { useEffect, useState } from 'react'
import './MiniBoard.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MiniBoard = () => {
  const [miniBoard,setMiniBoard]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    axios
    .get('/board/miniBoard')
    .then((res)=>{
      setMiniBoard(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  return (
    <div>
      
      <div className='main-miniBoard-div'>
        <table className='main-miniBoard'>
          <colgroup>
            <col width='80%'/>
            <col width='20%'/>
          </colgroup>
          <thead></thead>
          <tbody>
            {
              miniBoard.map((mini,i)=>{
                return(
                  <tr key={i}>
                    <td><span onClick={(e)=>{navigate(`detail/${mini.boardNum}`)}}>
                      <i class="bi bi-dot"></i>{mini.title}</span>
                    </td>
                    <td><span>{mini.createDate}</span></td>
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

export default MiniBoard