import React, { useEffect, useState } from 'react'
import { DefaultLegendContent } from 'recharts'
import './MapTest.css'
import markerImage from '../assets/marker.png';
import { useNavigate } from 'react-router-dom';

const {kakao}=window
const MapTest = () => {
  const {kakao}=window

  useEffect(()=>{
    const container=document.getElementById('map')

    //현재 위치를 가져오는 함수
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}=position.coords

      const options={
        center:new kakao.maps.LatLng(latitude,longitude),
        level:3,
      }

    })

    const options={
      center:new kakao.maps.LatLng(35.54210, 129.3382),
      level : 3
    }

    //지도 생성
    const map=new kakao.maps.Map(container,options)

    //현재 위치 표시 마커
    const usermarker=new kakao.maps.Marker({
      position:new kakao.maps.LatLng(35.54210, 129.3382),
      image:new kakao.maps.MarkerImage(markerImage,new kakao.maps.Size(50,50),{
        offset:new kakao.maps.Point(25,50),
      })
    })
  
    usermarker.setMap(map)

  },[])
const navigate = useNavigate
  return (
    <div>
      <div className='mapTest' id='map' onClick={()=>{navigate('/https://map.kakao.com/link/to/18577297')}}></div>
    </div>
  )
}

export default MapTest;