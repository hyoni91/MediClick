import React, { useEffect, useState } from 'react'

//(혈액냉장고 페이지)
const SettingWidth = ({currentTemp, avgTemp}) => {
  
  const [width100, setWidth100] = useState(100)
  const [width, setWidth] = useState(100);

  useEffect(()=>{
      if(currentTemp > avgTemp){
        setWidth(width100+80)
      }else{
        setWidth(100)
      }
  },[currentTemp,avgTemp])


    return (
    <div id='item1' 
      className='p-100'
      style={{width: `${width}px`}} />
    )
  }
  

export default SettingWidth