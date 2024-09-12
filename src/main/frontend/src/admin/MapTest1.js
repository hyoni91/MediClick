import React, { useEffect, useState } from 'react'
import { DefaultLegendContent } from 'recharts'
import './MapTest.css'

const MapTest1 = () => {
  const {kakao}=window
  
  // 지도이동 state
  const [map, setMap] = useState(null);

  // 마커 state
  const [pointObj, setPointObj] = useState({
    startPoint : {marker: null, lat: null, lng: null},
    endPoint : {marker: null, lat: null, lng: null}
  });

  // 지도
  useEffect(()=>{
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center : new kakao.maps.LatLng(35.54210, 129.3382),
      level : 3
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(kakaoMap);
  }, []);

  // 마커 변경 
  useEffect(()=>{
    for (const point in pointObj){
      if (pointObj[point].marker){
        pointObj[point].marker.setMap(map);
      }
    }
  }, [pointObj]);

  // 지도 이동
  function setCenter({lat, lng}){
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
  }
  
  function setPoint({lat, lng}, pointType){
    setCenter({lat, lng});
    let marker = new kakao.maps.Marker({position: new kakao.maps.LatLng(lat, lng)});
    setPointObj(prev=>{
      if(pointObj[pointType].marker !== null){
        //주소 변경 기존 마커 제거
        prev[pointType].marker.setMap(null);
      }
      return {...prev, [pointType]: {marker, lat, lng}};
    })
  }

  // 경로
  async function getCarDirection() {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    // 호출방식 url
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    // 출발지 목적지 좌표 변환
    const origin = `${pointObj.startPoint.lng}, ${pointObj.startPoint.lat}`;
    const destination = `${pointObj.endPoint.lng}, ${pointObj.endPoint.lat}`;

    // 요청 헤더
    const headers = {
      Authorization: `kakaoAK ${REST_API_KEY}`,
      'Content-Type' : 'application/json'
    };

    console.log(REST_API_KEY)
    
    const queryParams = new URLSearchParams({
      origin : origin,
      destination : destination
    });

    // 피라미터 포함 전체 url
    const requestUrl = `${url}?${queryParams}`;

    try {
      const response = await fetch(requestUrl, {
        method : 'GET',
        headers : headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status : ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      const linePath = [];
      data.routes[0].sections[0].roads.forEach(router => {
        router.vertexes.forEach((vertex, index)=>{
          if (index % 2 === 0){
            linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        });
      });

        const  polyline = new kakao.maps.Polyline({
        path : linePath,
        strokeWeight : 5,
        strokeColor : '#000000',
        strokeOpacity : 0.7,
        strokeStyle : 'solid'
      });
      polyline.setMap(map);

    } catch (error) {
      console.error('Error: ',error);
    }
  }
  
  return (
    <div>
      <div id='map' style={{width: "450px", height: "450px"}}/>
      <div style={{display: "flex", gap: "10px"}}>
        <button onClick={()=>setPoint({lat: 35.5383773, lng: 129.3113596}, 'startPoint')}>출발지</button>
        <button onClick={()=>setPoint({lat: 35.54210, lng: 129.3382}, 'endPoint')}>목적지</button>
        <button onClick={getCarDirection}>경로 구하기</button>
      </div>
      
    </div>
  )
}

export default MapTest1;