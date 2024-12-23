import React, { useEffect, useState } from 'react'

//(혈액냉장고 페이지)

const SettinWidthAvg = ({currentTemp, avgTemp}) => {
 // avg보다 currenttemp가 놓으면 막대 길이 조절
 // 초기 width 값 설정

  const [width100, setWidth100] = useState(100)
  const [widthAvg, setWidthAvg] = useState(100);

    useEffect(()=>{
      if(currentTemp < avgTemp){
        setWidthAvg(width100+80)
      }else{
        setWidthAvg(100)
      }
    },[currentTemp,avgTemp])



    return (
      <div id='item2' 
        className='p-50'
        style={{width: `${widthAvg}px`}} />
    )
  };


export default SettinWidthAvg;