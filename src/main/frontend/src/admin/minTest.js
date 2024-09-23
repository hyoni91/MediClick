import React from 'react'

function minTest() {

//온도 30도 이상 경보
  const [tempdd, setTempdd] = useState(true)
//화면이 재랜더링 될때 db를 조회하여 시간값과 온도값을 가져와서 데이터를 넣어줌
const fetchTemperatureData = async () => {
  const response = await axios.get('/temp/nowTemps');
  response.data[0].currentTemp > 30 ? setTempdd(false) : setTempdd(true)
  return response.data;  // API로부터 온도 데이터를 반환
};


  return (
    <div>


      <Area 
        type="monotone"
        dataKey="tem"
        stroke="" // 기본 선 색상
        fill=  {tempdd  ? "#3276ff" : '#ff0000'} // 기본 채우기 색상
        dot={(props) => {
          // 특정 조건을 만족하는 점에 대해 색상을 변경
          // props = {payload,value,index}
          // payload: {
          // tem: 28, // 온도 값
          // time: '09/20 14:00' // 시간 정보
          // },
          if (props.payload.tem >= 30) {
            return <Dot {...props} fill="#ff4d4d" />; // 30도 이상일 때 빨간색
          }
          return <Dot {...props} fill="#3276ff" />; // 기본은 파란색
        }}
      />

      
    </div>
  )
}

export default minTest