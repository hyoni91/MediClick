import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const PchartMedicine = () => {

  const [medicine, setMedicine] = useState([])

  useEffect(()=>{
    axios.get("/patientChart/medicineList")
    .then((res)=>{
      setMedicine(res.data)
    })
    .catch((error)=>{
      alert('error!')
      console.log(error)
    })
  },[])

  const [selectMedicine, setSelectMedicine] = useState({
    dosage : '3알',
    mNum : 0,
    mName : ''
  })


  function selectedMedicine(e){
    const selectedMedicine = e.target.value
    const {dosage,mNum,mName} = JSON.parse(selectedMedicine)
    setSelectMedicine({
      ...selectMedicine,
      dosage : dosage,
      mNum : mNum,
      mName : mName
    })
  }


  return (
    <div className='p-chart-medicine'>
                <p>
                  <i className="bi bi-capsule"></i> 
                  <select 
                    name='selectMedicine' 
                    className='p-chart-select'
                    onChange={(e)=>{
                      selectedMedicine(e)
                  }}
                  
                  >
                    {
                      medicine.map((m,i)=>{
                        return(
                            <option 
                              key={i}
                              value={JSON.stringify({dosage:m.dosage, mNum : m.mnum, mName : m.mname})  } 
                            >
                              {m.mname}
                            </option>
                        )
                      })
                    }
                  </select>
                  <input 
                    className='p-chart-input' 
                    type='text' 
                    name='' 
                    value={selectMedicine.dosage}
                  />
                </p>
              </div>
  )
}

export default PchartMedicine;