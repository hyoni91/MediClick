import React from 'react'
import './ProviderLayout.css'

const ProviderMain = () => {
  return (
    <div className='provider-main-img'>
    {/* 메인이미지 */}
    <img src='http://localhost:8080/images/providermain.jpeg'/>
    <div>
      <p>고객과 함께</p>
      <p>더 높이 날아오르겠습니다.</p>
    </div>
  </div>
  )
}

export default ProviderMain