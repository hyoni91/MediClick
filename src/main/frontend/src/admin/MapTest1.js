import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DefaultLegendContent } from 'recharts'
import './MapTest.css'
import axios from 'axios'
import { debounce } from 'chart.js/helpers'
import { useNavigate } from 'react-router-dom'
import MapTestModal from './MapTestModal'
import ReactModal from 'react-modal'



const MapTest1 = () => {
  const {kakao}=window

  // 지도이동 state
  const [map, setMap] = useState(null);

  // 마커 state
  const [pointObj, setPointObj] = useState({
    startPoint : {marker: null, lat: null, lng: null},
    endPoint : {marker: null, lat: 35.54210, lng: 129.3382}
  });

  // 지도
  useEffect(()=>{
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center : new kakao.maps.LatLng(35.54210, 129.3382),
      level : 3
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);

  // 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(35.54210, 129.3382); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(kakaoMap);
    setMap(kakaoMap);
  }, []);

  useEffect(() => {
    if(map != null){
      setPoint(35.54210, 129.3382, 'endPoint')
    }
  }, [map]);

  // 마커 변경 
  useEffect(()=>{
    for (const point in pointObj){
      if (pointObj[point].marker){
        pointObj[point].marker.setMap(map);
      }
    }
  }, [pointObj]);

  // 지도 이동
  function setCenter(lat, lng){
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
    //setPoint({lat: 35.54210, lng: 129.3382}, 'endPoint')
  }
  
  function setPoint(lat, lng, pointType){
    setCenter(lat, lng);
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
    const REST_API_KEY = process.env.REACT_APP_Kakao_api_key;

    // 호출방식 url
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    // 출발지 목적지 좌표 변환
    const origin = `${pointObj.startPoint.lng}, ${pointObj.startPoint.lat}`;
    const destination = `${pointObj.endPoint.lng}, ${pointObj.endPoint.lat}`;

    axios.get(url, {
      headers: {
        'Authorization': `KakaoAK ${REST_API_KEY}`,  // 헤더에 API 키를 포함합니다.
        'Content-Type' : 'application/json'
      },
      params: {
        origin: origin,
        destination: destination
      }
    }).then((res) => {
      console.log(res.data);

      const linePath = [];
      res.data.routes[0].sections[0].roads.forEach(router => {
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

    })
    .catch((error) => {console.log(error)});
  }

  // 주소입력 모달
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  // 주소 검색
  const [searchAddress, setSearchAddress] = useState();
  const [changeSearchAddress, setChangeSearchAddress] = useState();

  // 검색버튼 실행시
  // function searchAddress(){
    
  // }
  
  function addressModalContent(){
    return (
      <div>
        <input type='text' name='searchAddress' onChange={(e)=>{changeSearchAddress(e)}}/>
        <button type='button' onClick={(e)=>{searchAddress(e)}}>검색</button>
      </div>
    );
  }

  const openModal = (e) => {
    setModalContent(addressModalContent)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  function getLocation(){
    const REST_API_KEY = process.env.REACT_APP_Kakao_api_key;
    // 호출방식 url
    const url = 'https://dapi.kakao.com/v2/local/search/address.json';

    axios.get(url, {
      headers: {
        'Authorization': `KakaoAK ${REST_API_KEY}`,
        'Content-Type' : 'application/json;charset=UTF-8'
      },
      params: {
        query: '전북 삼성동 100'
      }
    }).then((res) => {
    console.log(res.data);
    const lng = res.data.documents[0].x;
    const lat = res.data.documents[0].y;
      //setPoint({lat: lat, lng: lng}, 'startPoint')
    })
    .catch((error) => {console.log(error)});
  }

  return (
    <div>
      <div id='map' style={{width: "450px", height: "450px"}}/>
      <div style={{display: "flex", gap: "10px"}}>
        <button onClick={()=>{
          //모달창 띄운다.
          {openModal('')}
          getLocation()
          // setPoint(35.9766482774572,126.99597495347,'startPoint');
        }}>출발지</button>
        <button onClick={()=>{}}>목적지</button>
        <button onClick={getCarDirection}>경로 구하기</button>
      </div>
      <MapTestModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />
    </div>
  )
}

export default MapTest1;