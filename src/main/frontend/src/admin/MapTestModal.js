import React, { useState } from 'react'
import ReactModal from 'react-modal'

const MapTestModal = ({isOpen, onRequestClose, clickSearchBtn, changeSearchAddress, searchAddress, resultList, setPoint}) => {
  // 선택한 주소의 위도 경도 저장할 변수
  const [selectAddress, setSelectAddress] = useState({
    lat : 0,
    lng : 0
  });

  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById('mapMain')}
      // ariaHideApp={false}
      onRequestClose={() => onRequestClose()}
      className="ReactModal__Content"
      style={{
        overlay: {
          position: 'fixed',
          borderRadius : 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0, 0.6)',
          zIndex:99
        },
        content: {
          position: 'absolute',
          width: '500px',
          height: '300px',
          margin : 'auto',
          top: '50%',
          left: '50%',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          // padding: '20px'
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      <div className='mapTest-modal'>
        <div>
          <input type='text' name='searchAddress' onChange={(e) => {changeSearchAddress(e)}} className='mapInput'/>
          <button type='button' onClick={() => {clickSearchBtn(searchAddress)}} className='btn'>검색</button>
        </div>
        <div>
          {resultList.length > 0 ? (
            resultList.map((result, i)=>{
              return(
                <p key={result.address_name || i} onClick={()=>{
                  console.log(result.x)
                  console.log(result.y)
                  // setSelectAddress({lat : result.y, lng : result.x});
                  onRequestClose();
                  setPoint(result.y,  result.x, 'startPoint')
                }}>주소 : <span className='mapBtn'>{result.address_name}</span></p>
              )
            })
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
        <i className="bi bi-x-lg" onClick={() =>{onRequestClose()}}/>
      </div>
      <div className='modalBtn' onClick={() => {onRequestClose()}}><button type='button' className='modalBtn'>닫기</button></div>
    </ReactModal>
  )
}

export default MapTestModal