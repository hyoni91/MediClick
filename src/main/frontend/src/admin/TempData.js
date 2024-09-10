import axios from 'axios'
import { BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, LineElement, scales, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-chartjs-2'

ChartJs.register(LineElement,CategoryScale,LinearScale,Title,BarElement,Legend,Tooltip)

const TempData = () => {
  //온도 리스트
  const [tempData,setTempData]=useState([])

  const [tempTime,setTempTime]=useState([])

  useEffect(()=>{
    axios
    .get('/temp/nowTemps')
    .then((res)=>{

      //조회한 온도를 저장할 리스트
      const tempList = []
      const timeList = []

      res.data.forEach((e, i) => {
        tempList.push(e.currentTemp)
        timeList.push(e.tempTime)
      })
      
      setTempData(tempList);
      setTempTime(timeList);

    })
    .catch((error)=>{console.log(error)})

  },[])

  



  
  const data={
    labels:tempTime,
    datasets:[
      {
        type:'line',
        label:'현재 온도',
        data:tempData,
        fill:false,
        backgroundColor:'#0254AF',
        borderColor:'#0254AF',
        tension:0.1,
      }
    ]
  }

  // console.log(data)

  const options={
    responsive:true,
    scales:{
      y:{
        min:20.0,
        max:25.0
      }
    }

  }



  return (
    <div>
      {/* 야이야이야
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>날짜</td>
            <td>현재온도</td>
          </tr>
        </thead>
        <tbody>
          {
            tempData.map((temp,i)=>{
              return(
                <tr key={i}>
                  <td>{temp.tempNum}</td>
                  <td>{temp.tempTime}</td>
                  <td>{temp.currentTemp}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table> */}

      <div className='statChart'>
        <div><Chart type='line' data={data} options={options}/></div>
      </div>
    </div>
  )
}

export default TempData