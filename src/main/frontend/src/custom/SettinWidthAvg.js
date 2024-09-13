import React, { useEffect, useState } from 'react'

//(혈액냉장고 페이지)

const SettinWidthAvg = ({currentTemp, avg}) => {
 // avg보다 currenttemp가 놓으면 막대 길이 조절
 // 초기 width 값 설정

  const [widthAvg, setWidthAvg] = useState(100);

    useEffect(()=>{
      if(currentTemp < avg){
        setWidthAvg(prevWidthAvg => prevWidthAvg + 50)
      }
    },[currentTemp,avg])



    return (
      <div id='item2' 
        className='p-50'
        style={{width: `${widthAvg}px`}} />
    )
  };


export default SettinWidthAvg;