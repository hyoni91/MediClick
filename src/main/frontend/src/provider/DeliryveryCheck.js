import React from 'react'

const DeliryveryCheck = () => {
  //
  return (
    <div className='manage-contailner'>
      <div className='manage-main'>
        <div className='magage-header'>
          <div className='header-div'>
            <h3>수주 상세 정보</h3>
          </div>
          <div>
            
                  <>
                    <h4></h4>
                    <h4></h4>
                  </>
            
          </div>
        </div>
        <div className='manage-content'>
          <div className='content-btn'>
            <button>버튼</button>  
            <button>버튼</button>  
            <div className='seachbar'>
                <input 
                  type='text' 
                  placeholder='주문일자'
                />
                <span
                  onClick={()=>{}}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
              </div>              
          </div>
          
          <table className='content-table'>
            <thead>
              <tr>
                <td>배송번호</td>
                <td>아이템</td>
                <td>수량</td>
                <td>금액</td>
                <td>총금액</td>
                <td colSpan={2}>배송상태</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        배송출발
                      </td>
                      <td>배송중</td>
                    </tr>                
                
            </tbody>
          </table>
        </div>
          
      </div>
        

    </div>
  )
}

export default DeliryveryCheck