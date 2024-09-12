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
  Rectangle,
  AreaChart,
} from "recharts";
import './test.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// // Bar 차트 데이터 조회를 위한 함수 정의
// const fetchBarChartData = async () => {
//   const response = await axios.get('/temp/oneHourData');
//   return response.data;
// };

// // useQuery 훅을 사용하여 Bar 차트 데이터 가져오기
// const {
//   data: barChartData,
//   isLoading: isBarLoading,
//   error: barError,
// } = useQuery({
//   queryKey: ['barChartData'],
//   queryFn: fetchBarChartData,
//   refetchInterval: 5000,
// });

const ExampleComponent = () => {
  
  //폼데이터 함수정의
  const formatDate  = (e) => {
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

    // 시간만 형식화하는 함수
    const formatDateTime = (e) => {
      const date = new Date(e);
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12 : false //24시간
      };
      return date.toLocaleString('en-US', options); // 'HH:MM' 형식으로 반환
    };
    
  //화면이 재랜더링 될때 db를 조회하여 시간값과 온도값을 가져와서 데이터를 넣어줌
  const fetchTemperatureData = async () => {
    const response = await axios.get('/temp/nowTemps');
    return response.data;  // API로부터 온도 데이터를 반환
  };
  // useQuery 훅을 사용하여 데이터 가져오기 (AreaChart 데이터 갱신)
  const { data, isLoading, error } = useQuery({
    queryKey: ['temperatureData'],
    queryFn: fetchTemperatureData,
    refetchInterval: 5000, // 5초마다 데이터 갱신
  });

  // bar차트 데이터 조회를위한 함수
  const fetchBarChartData = async () => {
    const response = await axios.get('/temp/oneHourData')
    return response.data
  }
  // useQuery 훅을 사용하여 데이터 가져오기 (AreaChart 데이터 갱신)
  const {
    data : barChartData,
    isLoading : isLoadingBar,
    error : errorBar
  } = useQuery({
    queryKey : 'barChartData',
    queryFn : fetchBarChartData,
    refetchInterval : 5000 
  })


  if (isLoading || isLoadingBar) return <div>Loading...</div>;  // 로딩 중일 때의 UI
  if (error || errorBar) return <div>Error loading data.</div>;  // 에러가 발생했을 때의 UI
  
  
  // 오름차순 정렬 10개만 조회하는 데이터
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
  // X축 레이블 데이터 (MM/DD 형식)
  const labels = sortedDataAsc.map((e) => e.tempTime.split(' ')[0]); // MM/DD 형식으로 분리
  
  timeList.forEach((time) => labels.push(time));

  //한시간데이터르 저장하는 변수
  const sortedDataAsc1 = barChartData.sort((a, b) => new Date(a.tempTime) - new Date(b.tempTime));
  // 날짜
  const timeList1 = sortedDataAsc1.map((e) => formatDateTime(e.tempTime));
  // 온도
  const temList1 = sortedDataAsc1.map((e) => e.currentTemp);
  // 바차트 데이터
  const barData = {
    labels: timeList1, //배열 사용
    datasets: [{
      type: 'bar',
      label: '현재 온도',
      data: temList1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      hoverBackgroundColor: "rgba(0, 88, 232, 0.6)" // 호버 시 색상 설정
    }]
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "한시간 온도" // 제목
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
    scales: {
      y: {
        min: 22,  // Y축 최소값
        max: 24,  // Y축 최대값
        ticks: {
          callback: (value) => `${value.toFixed(1)}°C`, // Y축 눈금 포맷
        },
      }
    }
  };
  
  console.log(avg)
  const formatDate1  = (e) => {
    //객체 데이트값 생성
    const date = new Date(e);
    const options = {
      month: '2-digit',
      day: '2-digit',
    };
    // 객체를 문자열로 변환 후 ',' 제거
    return date.toLocaleString('en-US', options).replace(',', '');
  };
  return ( 
    <div className='center' >
      
      <div>
      <Bar data={barData}  options={options} className='center'></Bar>
      {/* <Line data={data3} options={options} className='center'></Line>   */}
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
          tickFormatter={(e) => {
            // 문자열을 날짜 객체로 변환한 후, 시간과 분만 추출
            const date = new Date(e);
            return formatDateTime(date); // HH:MM 형식으로 반환
          }}
          label={{ 
            value: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }), // 현재 날짜를 월/일 형식으로 설정
             position: 'outsideBottomLeft', offset: 0, margin: '1'}} // X축 레이블 추가
          // angle={-45} // x축 기울기
          
          />
          {/* Y선 */}
          <YAxis 
          domain={[22, 23]}
          tickFormatter={(value) => `${value.toFixed(1)}°C`} 
          />
          
          {/* 마우스 올리면 데이터 나타남 */}
          <Tooltip 
          formatter={(value, name) => [value, name === 'tem' ? '온도' : name]} 
          />
          <Area 
          type="monotone" //부드러운 곡선
          dataKey="tem"  //나타낼 데이터
          stroke="#3276ff" //그래프 선 색깔
          strokeWidth={2} // 선 두께
          fill="#d8e5ff" // 선 아래에 색을 채우기
          dot={false}//점을 표시 (ture) 표시 X (false)
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      <div className='graph-div'>
          <div className='flex-temp'>
            <div>실시간 온도</div>
            <div>{formatDate1(new Date)}</div>
          </div>
        <ResponsiveContainer width="100%" height="100%">
          {/* 선밑에 채워지는 차트 */}
        <AreaChart
          width={500}
          height={400}
          data={Objecttime}
          margin={{
            top: 25,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#ccc" // 그래프 밑에 색깔
          horizontal={true} vertical={false}
          />
          {/* X선 */}
          <XAxis dataKey="time" 
          tickFormatter={(e) => {
            // 문자열을 날짜 객체로 변환한 후, 시간과 분만 추출
            const date = new Date(e);
            return formatDateTime(date); // HH:MM 형식으로 반환
          }}
          label={{ 
            }} // X축 레이블 추가
          // angle={-45} // x축 기울기
          
          />
          {/* Y선 */}
          <YAxis 
          domain={[22, 23]}
          tickFormatter={(value) => `${value.toFixed(1)}°C`} 
          />
          {/* 마우스 올리면 데이터 나타남 */}
          <Tooltip 
          formatter={(value, name) => [value, name === 'tem' ? '온도' : name]} 
          />
          <Area 
          type="monotone" //부드러운 곡선
          dataKey="tem"  //나타낼 데이터
          stroke="#3276ff" //그래프 선 색깔
          strokeWidth={2} // 선 두께
          // strokeDasharray={0}
          fill="#d8e5ff" // 선 아래에 색을 채우기
          dot={true}//점을 표시 (ture) 표시 X (false)
          />
        </AreaChart>
      </ResponsiveContainer>
        </div>
    </div>
  );
};

export default ExampleComponent;