import React, { useEffect, useRef, useState } from 'react'
import './BloodRefrigerator.css'
import { json } from 'react-router-dom'
import axios from 'axios';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';
import { useQuery } from '@tanstack/react-query';


const BloodRefrigerator = () => {

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

  // 초기 width 값 설정(현재온도랑 평균온도 따로하기? 지금은 같이 붙어 있음)
  const [width, setWidth] = useState([100,100]);
  // width를 증감시키는 함수(온도가 일정 수준 이상이면 크기 증가)
  const settingWidth = (temp) => {
    if(temp > 22.7){
      setWidth(prevWidth => prevWidth + 50)
    }else if(temp < 22.4){
      setWidth(prevWidth => Math.max(prevWidth - 50, 0)); // 최소값을 0으로 설정
    }
  };
  
  console.log(width)
  

  //데이터의 업 다운 아이콘 유무 (테이블)
  const upDownIcon = (temp)=>{
    if(temp > 22.7){
      return (
        <div className='iconUp'><i className="fa-solid fa-caret-up"></i></div>
      )
      
    } else if (temp < 22.4  ){
      return (
        <div className='iconDown'><i className="fa-solid fa-caret-down"></i></div>
      )
    } else{
      return (
        <div className='Iconequls'><i className="fa-solid fa-window-minimize"></i></div>
      )
    }
    }

  //날씨 api
  const cityName = 'Ulsan'
  const apiKey = process.env.REACT_APP_Weather_Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;


  // 날씨 정보 담을 변수 
  const [weather, setWeather] = useState({})

    //마운트시, 날씨 api에서 정보 받아오기
    useEffect(()=>{
      axios.get(url)
      .then((res)=>{
        // console.log(res.data)
        const weatherIcon = res.data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const weather = {
          cityName : res.data.name,
          temp : res.data.main.temp,
          maxTemp : res.data.main.temp_max,
          minTemp : res.data.main.temp_min,
          icon : weatherIconAdrs
        }
        // console.log(weather)
        setWeather(weather)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])



//실시간 온도 데이터 받을 함수
const [tempData, setTempData] = useState([
  {
    currentTemp : ''
  }
])

//실시간 온도 그래프
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
  // console.log(response.data)
  setTempData(response.data)
  settingWidth(response.data[0].currentTemp) 
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
const labels = sortedDataAsc.map((e) => e.tempTime.split(' ')[0]); // MM/DD 형식으로 분리

const timeList = sortedDataAsc.map((e) => formatDate(e.tempTime));
const temList = sortedDataAsc.map((e) => e.currentTemp);
    //배열 데이터 객체화
    const Objecttime = timeList.map((time , i) => {  
      return {
      time : time ,
      tem : temList[i]
      }
    })
    // console.log(Objecttime)
    // console.log(Objecttime)
    timeList.forEach((time) => labels.push(time));




      
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
            <div>
              <p>
                <span>날씨({weather.cityName})</span>
                <span><img className='weathericon' src={weather.icon}/></span>
              </p>
              <span>{(weather.temp -273.15).toFixed(0)}°C <br /> </span>
                최저:{(weather.minTemp -273.15).toFixed(0)}°C 
                최고: {(weather.maxTemp-273.15).toFixed(0)}°C
            </div>
            <div>
              <p>
                <span>현재 온도</span> 
                <span className='icon-span'>
                  <i className="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>
                {tempData[0].currentTemp}
                <div className='graphWrap'>
                  <div className='graph'>
                    <div style={{ width: `${width[0]}px`}} id='item1' className='p-100' />
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
                {tempData[0].currentTemp}
                <div className='graphWrap' >
                  <div className='graph'>
                    <div  style={{ width: `${width[1]}px`}} id='item2' className='p-50' />
                  </div>
                </div>
              </span>
            </div>
          </div>
        <div className='header-graph'>
          <p>
            그래프제목넣기
          </p>
          <div>그래프 넣을 div</div>
        </div>
      </div>
      <div className='graph-content'>
        <div className='graph-div'>
          <p>실시간 온도</p>
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
            return formatDate(date); // HH:MM 형식으로 반환
          }}
          label={{ value: `${''}/${''}`, position: 'insideBottomRight', offset: 0, margin: '1'}} // X축 레이블 추가
          // angle={-45} // x축 기울기
          />
          {/* Y선 */}
          <YAxis 
          domain={[22, 23]}
          tickFormatter={(value) => `${value.toFixed(1)}°C`} 
          />
          {/* 마우스 올리면 데이터 나타남 */}
          <Tooltip 
          formatter={(value, name, props) => [value, name === 'tem' ? '온도' : name]} 
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
                tempData.map((temp,i)=>{
                  return(
                    <tr key={i}>
                      <td>{temp.tempTime}</td>
                      <td>{temp.currentTemp}</td>
                      <td>{upDownIcon(temp.currentTemp)}</td>
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