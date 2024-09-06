import { Chart as ChartJs,CategoryScale, LinearScale, LineElement, Title, PointElement, BarElement, scales, Legend, Tooltip } from 'chart.js'
import { callback, color } from 'chart.js/helpers'
import React from 'react'
import { Bar, Chart, Line } from 'react-chartjs-2'
import './StatChart.css'

ChartJs.register(LineElement,CategoryScale,LinearScale,Title,PointElement,BarElement,Legend,Tooltip)


const StatChart = () => {

  const data={
    labels:['유방','뇌 및 중추신경계','갑상선','백혈병','다발성 골수종','폐'],
    datasets:[
      {
        type:'bar',
        label:'발생자수',
        data:[21839,2015,26051,3416,1535,25780],
        backgroundColor:'#0254AF',
        order:2,
        yAxisID:'y1'
      },
      {
        type:'line',
        label:'조발생률',
        data:[9.5,0.9,11.4,1.5,0.7,11.2],
        fill:false,
        borderColor:'#FCDE70',
        tension:0.1,
        order:1,
        yAxisID:'y2'
      }
    ]
  }

  const options={
    responsive:true,
    interaction:{ //호버하게되면 툴팁뜨게 하기
      mode:'index', // 호버했을때 인덱스를 띄우기 왜 안나오지? 
      intersect:false,
    },
    scales:{
      y1:{
        id:'y1',
        type:'linear',
        position:'left',
        display:true,
        title:{ // 왜 안나오지?
          display:true,
          // align:'end',
          text:'발생자수(명)',
          font:{
            size:12,
          }
        },
        ticks:{
          beginAtZero:true
        }
      },
      y2:{
        id:'y2',
        type:'linear',
        position:'right',
        // display:true,
        title:{
          display:true,
          align:'end',
          text:'조발생률(명_10만명)',
        },

        ticks:{
          beginAtZero:true
        },
        grid:{
          drawOnChartArea:false
        }
      },
      x:{
        axis:'x', //x축임
        position:'bottom',
        // type:'category',
        // title:{
        //   display:true,
        //   text:'질병'
        // }
      }
    },
    plugins:{
      legend:{ //범례 왜 안나오지?
        // position:'top',
        display:true,
        usePointStyle:true,
      },
      // datalabels:{ //차트 위에 데이터 라벨 띄우기 왜 안나오지? 설치해야함 보류
      //   backgroundColor:'black',
      //   borderRadius:5,
      //   padding:10,
      //   color:'white',
      //   textAlign:'center',
      //   formatter:(value,ctx)=>{
      //     let index=ctx.dataIndex
      //     let label=ctx.Chart.data.labels[index]
      //     return label + '/n' + value + '%'
      //   }
      // },

      tooltip:{
        backgroundColor:'rgba(0, 0, 0, 0.6)',
        padding:10,
        // callbacks:{
        //   label:function(tooltipItem){
        //     return `${tooltipItem.datasets.label}`
        //   }
        // }
      },
    
    }

  }


  
  return (
    <div className='statChart'>

      <Chart type='bar' data={data} options={options}/>
      <p>보건복지부 암발생률 통계 2016</p>
    </div>
  )
}

export default StatChart
