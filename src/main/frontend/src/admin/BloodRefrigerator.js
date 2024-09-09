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
          const weather = {
            cityName : res.data.name,
            temp : res.data.main.temp,
            maxTemp : res.data.main.temp_max,
            minTemp : res.data.main.temp_min
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
                <span>날씨 ({weather.cityName})</span>
                <span className='icon-span'>
                <i class="fa-solid fa-cloud-sun"></i>
                </span>
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
              <span>2.3°C</span>
            </div>
            <div>
              <p>
                <span>평균 온도</span>
                <span className='icon-span'>
                  <i class="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>2°C</span>
            </div>
          </div>
        <div className='header-graph'>
        <div>
          평균온도랑 현재온도 그래프로 나타내기 <i class="fa-solid fa-rotate-right"></i>
        </div>
        </div>
      </div>
      <div className='graph-content'>
        <div className='graph-div'>
          실시간 그래프 그려넣기 
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
          지도 뜨우면 보여줄 정보
        </div>
        <div className='graph-weather'>
          지도 api로 띄우기 
        </div>
      </div>
    </div>
  )
}

export default BloodRefrigerator