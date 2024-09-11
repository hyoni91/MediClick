import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
  BarChart,
  ScatterChart,
  Rectangle,
  AreaChart,
} from "recharts";
import './test.css';
import axios from 'axios';
import { CategoryScale, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import { useQuery } from '@tanstack/react-query';


const ExampleComponent = () => {
  //폼데이터 함수정의
  const formatDate = (e) => {
    //객체 데이트값 생성
    const date = new Date(e);
    const options = {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12 : false //24시간
    };
    // 객체를 문자열로 변환 후 ',' 제거
    return date.toLocaleString('en-US', options).replace(',', '');
  };
  //화면이 재랜더링 될때 db를 조회하여 시간값과 온도값을 가져와서 데이터를 넣어줌
  const fetchTemperatureData = async () => {
    const response = await axios.get('/temp/nowTemps');
    return response.data;  // API로부터 온도 데이터를 반환
  };
  // useQuery 훅을 사용하여 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['temperatureData'],
    queryFn: fetchTemperatureData,
    refetchInterval: 5000, // 5초마다 데이터 갱신
  });

  if (isLoading) return <div>Loading...</div>;  // 로딩 중일 때의 UI
  if (error) return <div>Error loading data.</div>;  // 에러가 발생했을 때의 UI
  
  // 오름차순 정렬
  const sortedDataAsc = data.sort((a, b) => new Date(a.tempTime) - new Date(b.tempTime));

  const timeList = sortedDataAsc.map((e) => formatDate(e.tempTime));
  const temList = sortedDataAsc.map((e) => e.currentTemp);
  const sum = temList.reduce((a, b) => a + b, 0);
  const avg = sum / temList.length;
  console.log(timeList)
  console.log(temList)
  //배열 데이터 객체화
  const Objecttime = timeList.map((time , i) => {  
    return {
    time : time ,
    tem : temList[i]
    }
  })
  console.log(Objecttime)
  //데이터 조회
  const formatXAxis = (e) => {
    return `${e}분`
  }
  const data2 = ['January', 'February', 'March', 'April']; // 예시 배열
  
  const labels = [];
  timeList.forEach((time) => labels.push(time));
  
  const data3 = {
    labels: labels, // labels 배열 사용
    datasets: [{
      type: 'bar',
      label: '현재 온도',
      data: temList,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      hoverBackgroundColor: "rgba(255, 99, 132, 0.8)", // 호버 시 색상 설정
      
    }, {
      type: 'line',
      label: '평균온도',
      data: temList.map(() => avg.toFixed(2)), // 각 포인트에 평균온도값 설정
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      hoverBackgroundColor: "rgba(54, 162, 235, 0.8)", // 호버 시 색상 설정
    }]
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart Example", // 제목
      },
      tooltip: {
        mode: "index", // 같은 X축 인덱스의 모든 데이터를 표시
        intersect: false, //바있는 화면에 가져다 대면 데이터나옴
        callbacks: {
          // 커스터마이징된 툴팁 내용을 반환하는 함수
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset; // 현재 데이터셋 가져오기
            const label = dataset.label || ""; // 데이터셋 라벨 가져오기
            const value = dataset.data[tooltipItem.dataIndex]; // 현재 데이터 값 가져오기
            return `${label}: ${value}`; // 라벨과 값으로 텍스트 반환
          },
        },
      },
      
    },
    hover: {
      mode: "index",
      intersect: false, // 막대에 겹칠 때 툴팁이 나타나도록 설정
    },
  };
  
  console.log(avg)
  return ( 
    <div className='center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div>
      <Bar data={data3}  options={options} className='center'></Bar>
      <Line data={data3} options={options} className=''></Line>  
      </div>
      <div>
      
        <ResponsiveContainer width="100%" height="100%">
          {/* 선밑에 채워지는 차트 */}
        <AreaChart
          width={500}
          height={400}
          data={Objecttime}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" 
          stroke="#ccc" // 그래프 밑에 색깔
          horizontal={true} vertical={false}
          />
          {/* X선 */}
          <XAxis dataKey="time" 
          label={{ value: '시간', position: 'insideBottomRight', offset: 0, margin: '1'}} // X축 레이블 추가
          //tickFormatter={formatXAxis} // X축 값 포맷팅
          // angle={-45} // x축 기울기
          />
          {/* Y선 */}
          <YAxis />
          {/* 마우스 올리면 데이터 나타남 */}
          <Tooltip />
          <Area 
          type="monotone" //부드러운 곡선
          dataKey="tem"  //나타낼 데이터
          stroke="#8884d8" //그래프 선 색깔
          fill="#8884d8" // 선 아래에 색을 채우기
          dot={true}//점을 표시 (ture) 표시 X (false)
          />
          <Area 
          type="step" //부드러운 곡선
          dataKey="tem"  //나타낼 데이터
          stroke="#8884d8" //그래프 선 색깔
          fill="#8884d8" // 선 아래에 색을 채우기
          dot={true}//점을 표시 (ture) 표시 X (false)
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExampleComponent;