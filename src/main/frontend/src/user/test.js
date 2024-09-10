import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
  BarChart,
  ScatterChart,
  Rectangle,
} from "recharts";
import './test.css';
import axios from 'axios';
const ExampleComponent = () => {
  const handleClick = (e) => {
    
  };
  const [timeList, setTimeList] = useState([])//시간
  const [temList, setTemList] = useState([])//온도
  //화면이 재랜더링 될때 db를 조회하여 시간값과 온도값을 가져와서 데이터를 넣어줌

  const data = [
    {time : 15 , tem:20},
    {time : 30 , tem:18},
    {time : 45 , tem:21},
    {time : 60 , tem:21},
  ];
  const data1 = [
    {name : '09.01', curTem : 2.2 , avgTem: 1.9},
    {name : '09.02', curTem : 1.9 , avgTem: 2.0},
    {name : '09.03', curTem : 2.0 , avgTem: 2.2},
    {name : '09.04', curTem : 2.2 , avgTem: 1.9},
    {name : '09.05', curTem : 2.1 , avgTem: 1.9},
  ]
  const formatXAxis = (e) => {
    return `${e}분`
  }
  const data3 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  // 막대 핸들러
  const [handleBar , setHandleBar] = useState(null)
console.log(data1)
  //막대 손올리면 바뀌는 함수
  const efectBar = (e) => {

  }
  return ( 
    <div className='center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <ResponsiveContainer>
        <BarChart
        width={500}
        height={300}
        data={data3}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="uv"
          fill="#B3CDAD"
          shape={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="pv"
          fill="#FF5F5E"
          shape={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ResponsiveContainer>
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 30, left: 30 }} >
          {/* CartesianGrid 추가 */}
          <CartesianGrid stroke="#ccc" // 그래프 밑에 색깔
                         strokeDasharray="5 5"// 그래프 선 (점선 수,선사이 간격)
                         horizontal={true} vertical={false} />
          {/* X선 */}
          <XAxis dataKey="time" //data안에 담긴 변수 name의 값
          tickFormatter={formatXAxis} // X축 값 포맷팅
          label={{ value: '시간', position: 'insideBottomRight', offset: 0, margin: '1'}} // X축 레이블 추가
          />
          {/* Y선 */}
          <YAxis dataKey="tem"
          />
          {/* 마우스 올리면 데이터 나타남 */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tem"
            stroke="#0CD3FF"
            fill="#0CD3FF" // 선 아래에 색을 채우기
            fillOpacity={0.3}
            yAxisId="left"
          />
          {/* <Legend display={false}/> */}
          <Line type="monotone" dataKey="tem" stroke="#0CD3FF" strokeWidth={2}  
          dot={false} // 점을 표시하지 않음
          />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExampleComponent;