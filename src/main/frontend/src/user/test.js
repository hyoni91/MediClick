import React, { useState } from 'react';
import { Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
const ExampleComponent = () => {
  const handleClick = (e) => {
    
  };
  const [timeList, setTimeList] = useState([])//시간
  const [temList, setTemList] = useState([])//온도
  //화면이 재랜더링 될때 db를 조회하여 시간값과 온도값을 가져와서 데이터를 넣어줌

  const data = [
    { name: '2017', react: 32, angular: 37, vue: 60 },
    { name: '2018', react: 42, angular: 42, vue: 54 },
    { name: '2019', react: 51, angular: 41, vue: 54 },
    { name: '2020', react: 60, angular: 37, vue: 28 },
    { name: '2021', react: 51, angular: 31, vue: 27 },
    { name: '2022', react: 95, angular: 44, vue: 49 },
    { name: '2023', react: 97, angular: 42, vue: 52 },
  ];
  return (
    <div >
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
      {/* CartesianGrid 추가 */}
      <CartesianGrid stroke="#ccc" // 그래프 밑에 색깔
                     strokeDasharray="5 5"// 그래프 선 (점선 수,선사이 간격)
                     horizontal={true} vertical={false} />
      {/* X선 */}
      <XAxis dataKey="name" //data안에 담긴 변수 name의 값
      />
      {/* Y선 */}
      <YAxis />
      <Tooltip />
      <Legend display={false}/>
      <Line type="monotone" dataKey="react" stroke="#0CD3FF" strokeWidth={2} />
      <Line type="monotone" dataKey="angular" stroke="#a6120d" strokeWidth={2} />
      <Line type="monotone" dataKey="vue" stroke="#FFCA29" strokeWidth={2} />
    </LineChart>
    </div>
  );
};

export default ExampleComponent;