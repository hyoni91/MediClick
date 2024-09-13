import React, { useEffect, useState } from 'react'

//(혈액냉장고 페이지)
const SettingWidth = ({currentTemp, avg}) => {
  const [width, setWidth] = useState(100);

  useEffect(()=>{
      if(currentTemp > avg){
        setWidth(prevWidth => prevWidth + 50)
      }

  },[currentTemp,avg])


    return (
    <div id='item1' 
      className='p-100'
      style={{width: `${width}px`}} />
    )
  }
  

export default SettingWidth