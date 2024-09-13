import React, { useEffect, useRef, useState } from 'react'
import './BloodRefrigerator.css'
import { json } from 'react-router-dom'
import axios from 'axios';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import WeatherDate from '../custom/WeatherDate';
import { Bar } from 'react-chartjs-2';
import SettingWidth from '../custom/SettingWidth';
import UpDownIcon from '../custom/UpDownIcon';
import SettinWidthAvg from '../custom/SettinWidthAvg';


const BloodRefrigerator = () => {
  //실시간 그래프 옆에 지표
  const [temp1, setTemp1] = useState([
    {
      currentTemp: '',
      tempTime: ''
    }
  ])
//실시간 온도 데이터 받을 함수
const [tempData, setTempData] = useState([
  {
    currentTemp: '',
    tempTime: ''
  }
])
useEffect(() => {
  axios.get('/temp/tempListData')
  .then((res) => {
    // console.log(res.data)
    setTempData(res.data)
  })
},[])

  //온도설정 버튼 숨김
  const [isSetTemp, setIsSetTemp] = useState(false)
  const tempRef = useRef();
  //온도 설정 변수 
  const [temp,setTemp] = useState(2);
  //온도 설정 
  const tempSetting = ()=>{
    setTemp(tempRef.current.value)
    setIsSetTemp(!isSetTemp)
  }

const tempList = tempData.map((temp,i) => {
return(temp.currentTemp)})
const sum = tempList.reduce((a, b) => a + b, 0);
const avg = sum / tempList.length;
// console.log(avg)


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
  setTemp1(response.data)
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
  queryKey : ['barChartData'],
  queryFn : fetchBarChartData,
  refetchInterval : 5000 
})


if (isLoading || isLoadingBar) return <div>Loading...</div>;  // 로딩 중일 때의 UI
if (error || errorBar) return <div>Error loading data.</div>;  // 에러가 발생했을 때의 UI


// 오름차순 정렬 10개만 조회하는 데이터
const sortedDataAsc = data.sort((a, b) => new Date(a.tempTime) - new Date(b.tempTime));

const timeList = sortedDataAsc.map((e) => formatDate(e.tempTime));
const temList = sortedDataAsc.map((e) => e.currentTemp);

// console.log(timeList)
// console.log(temList)
//배열 데이터 객체화
const Objecttime = timeList.map((time , i) => {  
  return {
  time : time ,
  tem : temList[i]
  }
})
// console.log(Objecttime)
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
    // title: {
    //   display: true,
    //   text: "한시간 온도" // 제목
    // },
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
    <div className='graph-container'onClick={()=>{setIsSetTemp(false)}} >
      <div className='graph-headerr'>
        <h1>BLOOD REFRIGERATOR</h1>
      </div>
      <div className='graph-header'>
        <div className='header-content'>
            <div>
              <p>
                <span>온도설정<span className='setting-btn' onClick={(e)=>{setIsSetTemp(!isSetTemp , e.stopPropagation()) }}> <i className="fa-solid fa-ellipsis-vertical"></i></span>
                </span>
                <span className='icon-span'>
                <i className="fa-solid fa-hospital"></i>
                </span>
              </p>
              <span>{temp}°C</span>
              { isSetTemp ? 
                <div className='setting-input'>
                  <input type='number' ref={tempRef} min={-10} max={5} onClick={(e)=>{e.stopPropagation()}} /> 
                  <button type='button' 
                  onClick={(e)=>{tempSetting()} }>
                    설정
                  </button>
                </div>
                :
                <></>
              }
            </div>
            <WeatherDate />
            <div>
              <p>
                <span>현재 온도</span> 
                <span className='icon-span'>
                  <i className="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>
                {temp1[0].currentTemp}°C
                <div className='graphWrap'>
                  <div className='graph'>
                    <SettingWidth 
                    currentTemp={temp1[0].currentTemp}
                    avg={avg}
                    />
                  </div>
                </div>
              </span>
            </div>
            <div>
              <p> 
                <span>평균 온도</span>
                <span className='icon-span'>
                  <i className="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>
                {avg.toFixed(1)}°C
                <div className='graphWrap' >
                  <div className='graph'>
                    <SettinWidthAvg 
                    currentTemp={temp1[0].currentTemp}
                    avg={avg}
                    />
                  </div>
                </div>
              </span>
            </div>
          </div>
        <div className='header-graph'>
          한시간온도
          <div>
            <Bar data={barData}  options={options}  width={50} height={10}/>
          </div>
        </div>
      </div>
      <div className='graph-content'>
        <div className='graph-div'>
          <div className='graph-title-flex'>
            <div>
              실시간 온도
            </div>
            <div>
              {formatDate1(new Date)}
            </div>
          </div>
            <ResponsiveContainer width="100%" height="100%">
              {/* 선밑에 채워지는 차트 */}
            <AreaChart
              width={450}
              height={300}
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
        <div className='text-div'>
          <table className='graph-table'>
            <thead>
              <tr>
                <td>시간</td>
                <td>온도</td>
                <td>오차</td>
              </tr>
            </thead>
            <tbody>
              {
                temp1.map((temp,i)=>{
                  return(
                    <tr key={i}>
                      <td>{temp.tempTime}</td>
                      <td>{temp.currentTemp}</td>
                      <td>{<UpDownIcon temp={temp.currentTemp}/>}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className='graph-content'>
        <div className='weather-div'>
          <div className='bloodcar-title'>
            <p>혈액 운송 차량정보</p>
            <span><i className="fa-solid fa-truck-droplet"></i></span>
          </div>
          <div className='bloodcar'>
            <div>
              <h4>차량정보</h4>
              <div>
                <p>담당자:김뭐시기</p>
                <p>차량번호:가1234</p>
                <p>연락처:010-1111-2222</p>
              </div>
            </div>
            <div>
              <h4>이동경로</h4>
              <div>서울 ~ 울산</div>
            </div>
            <div>
              <h4>도착시간</h4>
              <div>오후 6:00</div>
            </div>
          </div>
        </div>
        <div className='graph-weather'>
          <div className='bloodcar-title'>
            <p>차량 실시간 정보</p>
            <span id='replay'><i className="fa-solid fa-rotate-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodRefrigerator