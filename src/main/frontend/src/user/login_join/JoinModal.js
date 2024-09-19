import React, { useState } from 'react'
import ReactModal from 'react-modal'

//모달 컴포넌트
const JoinModal = ({isOpen, onRequestClose, content}) => {
  return (
      <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => onRequestClose}
      className="ReactModal__Content"
      style={{
        overlay: {
          position: 'fixed',
          borderRadius : 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0, 0.6)'
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
      <div className='join-modal'>
        {content}
        <i className="bi bi-x-lg" onClick={onRequestClose}/>
      </div>
    </ReactModal>
  )
}

export default JoinModal