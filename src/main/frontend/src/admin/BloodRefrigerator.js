import React, { useEffect, useRef, useState } from 'react'
import './BloodRefrigerator.css'
import { json } from 'react-router-dom'
import axios from 'axios';


const BloodRefrigerator = () => {

  //온도설정 버튼 숨김
  const [isSetTemp, setIsSetTemp] = useState(false)
  const tempRef = useRef();
  //temp 변수(임의)
  const [temp,setTemp] = useState(2);
  //온도 설정 
  const tempSetting = ()=>{
    setTemp(tempRef.current.value)
    setIsSetTemp(!isSetTemp)
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


    const [tempData, setTempData] = useState([])

    //temp 데이터 받기
    useEffect(()=>{
      axios.get("/temp/nowTemps")
      .then((res)=>{
        setTempData(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
    console.log(tempData)

      
  return (
    <div className='graph-container'onClick={()=>{setIsSetTemp(false)}} >
      <div className='graph-headerr'>
        <h1>BLOOD REFRIGERATOR</h1>
      </div>
      <div className='graph-header'>
        <div className='header-content'>
            <div>
              <p>
                <span>온도설정<span className='setting-btn' onClick={(e)=>{setIsSetTemp(!isSetTemp , e.stopPropagation()) }}> <i class="fa-solid fa-ellipsis-vertical"></i></span>
                </span>
                <span className='icon-span'>
                <i class="fa-solid fa-hospital"></i>
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
                <td>오차</td>
              </tr>
            </thead>
            <tbody>
              {
                tempData.map((temp,i)=>{
                  return(
                    <tr>
                      <td>{temp.tempTime}</td>
                      <td>{temp.currentTemp}</td>
                      <td></td>
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
            <span><i class="fa-solid fa-truck-droplet"></i></span>
          </div>
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
          <div className='bloodcar-title'>
            <p>차량 실시간 정보</p>
            <span><i class="fa-solid fa-rotate-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodRefrigerator