import React from 'react'
import './BloodRefrigerator.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const BloodRefrigerator = () => {
  return (
    <div className='graph-container'>
      <div className='graph-headerr'>
        <h1>BLOOD STORAGE</h1>
      </div>
      <div className='graph-header'>
        <div className='header-content'>
            <div>
              <p>
                <span>온도설정
                </span>
                <span className='icon-span'>
                <i class="fa-solid fa-hospital"></i>
                </span>
              </p>
              <span>2°C</span>
            </div>
            <div>
              <p>
                <span>날씨</span>
                <span className='icon-span'>
                <i class="fa-solid fa-cloud-sun"></i>
                </span>
              </p>
              <span>현재: /최저: /최고
              </span>
            </div>
            <div>
              <p>
                <span>현재 온도</span> 
                <span className='icon-span'>
                  <i class="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>2.3°C</span>
            </div>
            <div>
              <p>
                <span>평균 온도</span>
                <span className='icon-span'>
                  <i class="fa-solid fa-temperature-empty"></i>
                </span>
              </p>
              <span>2°C</span>
            </div>
          </div>
        <div className='header-graph'>
        <div>
          평균온도랑 현재온도 그래프로 나타내기
        </div>
        </div>
      </div>
      <div className='graph-content'>
        <div className='graph-div'>
          실시간 그래프 그려넣기 
        </div>
        <div className='text-div'>
          <table className='graph-table'>
            <thead>
              <tr>
                <td>시간</td>
                <td>온도</td>
                <td>종류</td>
                <td>오차온도</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
              <tr>
                <td>10:00</td>
                <td>2.2</td>
                <td>혈액</td>
                <td>0.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='graph-content'>
        <div className='weather-div'>
          지도 뜨우면 보여줄 정보
        </div>
        <div className='graph-weather'>
          지도 api로 띄우기 
        </div>
      </div>
    </div>
  )
}

export default BloodRefrigerator