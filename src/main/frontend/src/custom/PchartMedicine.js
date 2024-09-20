import React from 'react'

const PchartMedicine = () => {

    //연습 약 종류
  const medicine = ['가나톤정50mg Ganaton Tab50mg','가나톤정50mg Ganaton Tab50mg','가나톤정50mg Ganaton Tab50mg','가나톤정50mg Ganaton Tab50mg']

  return (
    <div className='p-chart-medicine'>
                <p>
                  <i className="bi bi-capsule"></i> 
                  <select name='' className='p-chart-select'>
                    {
                      medicine.map((m,i)=>{
                        return(
                          <option value={''}>{m}</option>
                        )
                      })
                    }
                  </select>
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    name='' 
                    value={1}
                  />
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    name='' 
                    value={1}
                  />
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    name='' 
                    value={10}
                  />
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    name='' 
                    placeholder='용법'
                  >
                  </input>
                </p>
              </div>
  )
}

export default PchartMedicine;