
import React from 'react';


  //데이터의 업 다운 아이콘 유무 (테이블) (혈액냉장고 페이지)
  const UpDownIcon = ({temp})=>{
    if(temp > 22.7){
      return (
        <div className='iconUp'><i className="fa-solid fa-caret-up"></i></div>
      )
      
    } else if (temp < 22.4  ){
      return (
        <div className='iconDown'><i className="fa-solid fa-caret-down"></i></div>
      )
    } else{
      return (
        <div className='Iconequls'><i className="fa-solid fa-window-minimize"></i></div>
      )
    }
    }

    export default UpDownIcon;
