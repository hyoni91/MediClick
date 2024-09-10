import React, { useEffect, useState } from 'react'
import './BloodRefrigerator.css'
import { json } from 'react-router-dom'
import axios from 'axios';


const BloodRefrigerator = () => {

    //날씨 api
    const cityName = 'Seoul'
    const apiKey = process.env.REACT_APP_Weather_Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    

    // 날씨 정보 담을 변수 
    const [weather, setWeather] = useState({})

      //마운트시, 날씨 api에서 정보 받아오기
      useEffect(()=>{
        axios.get(url)
        .then((res)=>{
          console.log(res.data)
          const weatherIcon = res.data.weather[0].icon;
          const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
          const weather = {
            cityName : res.data.name,
            temp : res.data.main.temp,
            maxTemp : res.data.main.temp_max,
            minTemp : res.data.main.temp_min,
            icon : weatherIconAdrs
          }
          console.log(weather)
          setWeather(weather)
        })
        .catch((error)=>{
          console.log(error)
        })
      },[])
      
  return (
    <div className='graph-container'>
      <div className='graph-headerr'>
        <h1>BLOOD REFRIGERATOR</h1>
      </div>
      <div className='graph-header'>
        <div className='header-content'>
            <div>
              <p>
                <span>온도설정
                </span>
                <span className='icon-span'>
                <i class="fa-solid fa-hospital"></i>
                </span>
              </p>
              <span>2°C</span>
            </div>
            <div>
              <p>
                <span>날씨({weather.cityName})</span>
                <span><img className='weathericon' src={weather.icon}/></span>
              </p>
              <span>{(weather.temp -273.15).toFixed(0)}°C <br /> </span>
                최저:{(weather.minTemp -273.15).toFixed(0)}°C 
                / 최고: {(weather.maxTemp-273.15).toFixed(0)}°C
              
            </div>
            <div>
              <p>
                <span>현재 온도</span> 
                <span className='icon-span'>
                  <i class="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>2.3°C 
                <div className='graphWrap'>
                  <div className='graph'>
                    <div id='item1' className='p-100' />
                  </div>
                </div>
              </span>
            </div>
            <div>
              <p>
                <span>평균 온도</span>
                <span className='icon-span'>
                  <i class="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>
                2°C
                <div className='graphWrap'>
                  <div className='graph'>
                    <div id='item2' className='p-50' />
                  </div>
                </div>
              </span>
            </div>
          </div>
        <div className='header-graph'>
          <p>
            평균온도랑 현재온도 그래프로 나타내기
          </p>
          <div>그래프div</div>
        </div>
      </div>
      <div className='graph-content'>
        <div className='graph-div'>
          <p>실시간 온도 차트</p>
        </div>
        <div className='text-div'>
          <table className='graph-table'>
            <thead>
              <tr>
                <td>시간</td>
                <td>온도</td>
                <td>종류</td>
                <td>오차온도</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='graph-content'>
        <div className='weather-div'>
          <p>혈액 운송 차량정보</p>
          <div className='bloodcar'>
            <div>
              <h4>차량번호</h4>
            </div>
            <div>
              <h4>이동경로</h4>
            </div>
            <div>
              <h4>소요시간</h4>
            </div>
          </div>
        </div>
        <div className='graph-weather'>
          <p>차량 실시간 정보</p>
        </div>
      </div>
    </div>
  )
}

export default BloodRefrigerator