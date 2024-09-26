
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WeatherDate = () => {
  
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


  return (
    <div>
    <p>
      <span>날씨({weather.cityName})</span>
      <span><img className='weathericon' src={weather.icon}/></span>
    </p>
    <span>{(weather.temp -273.15).toFixed(0)}°C <br /> </span>
      최저:{(weather.minTemp -273.15).toFixed(0)}°C 
      최고: {(weather.maxTemp-273.15).toFixed(0)}°C
  </div>
  )
}

export default WeatherDate