import React, { useEffect, useState } from 'react'
import { DefaultLegendContent } from 'recharts'
import './MapTest.css'
import markerImage from '../assets/marker.png';
import { useNavigate } from 'react-router-dom';

const MapTest = () => {
  const {kakao}=window
  
  // 지도이동 state
  const [map, setMap] = useState(null);
  useEffect(()=>{
    // 지도
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center : new kakao.maps.LatLng(35.54210, 129.3382),
      level : 3
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);
  function setCenter({lat, lng}){
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.setCenter(moveLatLon);
  }
  function panTo({lat, lng}){
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
  }
  //
const navigate = useNavigate
  return (
    <div>
      <div id='map' style={{width: "450px", height: "450px"}}/>
      <div style={{display: "flex", gap: "10px"}}>
        <button onClick={()=> setCenter({lat: 33.452613, lng: 126.570888})}>지도 중심좌표 이동</button>
        <button onClick={()=> panTo({lat: 33.45058, lng:126.574942})}>지도 중심좌표 부드럽게 이동</button>
      </div>
      
    </div>
  )
}

export default MapTest;