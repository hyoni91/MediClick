import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'

const MSCategory = () => {
  const navigate = useNavigate()
  const [msCategoryList,setMsCategoryList] = useState([])







  return (
    <div>
      <div>
        {msCategoryList == null || msCategoryList.length == 0 ? 
        <></>
        : 
        (
          <>
            {msCategoryList.map((category, i) => {
              return (
                <div key={i}> 
                  <div>{category.cateName}</div>
                  
                </div>
              );
            })}
          </>
        )
        }
      </div>
      
      </div>
  )
}

export default MSCategory