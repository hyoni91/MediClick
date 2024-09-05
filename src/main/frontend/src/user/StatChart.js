import { type } from '@testing-library/user-event/dist/type'
import { Chart as ChartJs,CategoryScale, LinearScale, LineElement, Title, PointElement, BarElement } from 'chart.js'
import { callback } from 'chart.js/helpers'
import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import './StatChart.css'

ChartJs.register(LineElement,CategoryScale,LinearScale,Title,PointElement,BarElement)


const StatChart = () => {

  const data={
    labels:['유방','뇌 및 중추신경계','갑상선','백혈병','다발성 골수종','폐'],
    datasets:[
      {
        label:'cancer-incidence-statistics',
        data:[21839,2015,26051,3416,1535,25780],
        fill:false,
        borderColor:'#eeeeee',
        tension:0.1
      }
    ]
  }

  const options={
    responsive:true,
    plugins:{
      legend:{
        position:'top'
      },
      tooltip:{
        callback:{
          label:function(tooltipItem){
            return `${tooltipItem.datasets.label}`
          }
        }
      }
    }


  }


  
  return (
    <div className='statChart'>
      <Bar data={data} options={options}/>
    </div>
  )
}

export default StatChart
