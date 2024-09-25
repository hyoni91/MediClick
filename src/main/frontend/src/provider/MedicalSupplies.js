import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'

const MedicalSupplies = () => {
  const navigate = useNavigate()
  const [medicalSupplies, setMedicalSupplies] = useState({
    productNum : '',
    productName : '',
    cateNum : '',
    productPrice : '',
    stock : '',
    detail : ''
  })
  const [msCategory, setMsCategory] = useState({
    cateNum : '',
    cateName : ''
  })

  const categoryChange = (e) => {
    setMsCategory({
      ...msCategory,
      cateName : e.target.value
    })
  }
  const [category,setCategory]=useState([])
  useEffect(() => {
    axios.get('/item/cateList')
    .then((res) => {
      console.log(res.data)
      setCategory(res.data)
    })
    .catch((error) => {console.log(error)})
  },[])
  const mschange = (e) => {
    setMedicalSupplies({
      ...medicalSupplies,
      [e.target.name] : e.target.value
    })
  }
  const insertItem = () => {
    axios.post('/',medicalSupplies)
    .then((res) => {
      navigate('/order')
    })
    .catch((error) => {console.log(error)})
  }

  const insertCategory = () => {
    if (msCategory.cateName == '' ) {
      alert('카테고리를 입력하세요');
    } else {
      axios.post('/item/cateInsert', msCategory)
        .then((res) => {
          setMsCategory({cateName : ''}); 
          updateCategory(); // 카테고리 리스트 갱신
          alert('카테고리 등록 완료!');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  
  const deleteCategory = () => {
    axios.get('/')
    .then((res) => {})
    .catch((error) => {console.log(error)})
  }
  const updateCategory = () => {
    axios.get('/item/cateList')
      .then((res) => {
        setCategory(res.data); // category 상태 업데이트
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (

    <div>
      <div>
        <select name='cateNum' onChange={() => {}}>
          { category =='' || category.length == 0 ? <option>카테고리가 없습니다.
          </option>
          :
          category.map((cate,i) => {
            return(
                <>
                  <option key={i} value={cate.cateName}>{cate.cateName}</option>
                </>
            )
          })}
        </select>
        <div><button type='button' onClick={() => {deleteCategory()}}>카테고리 삭제</button></div>
      </div>
      <div>
        <input type='text' name='cateName' value={msCategory.cateName} onChange={(e) => {categoryChange(e)}} />
      </div>
        <div>
        <button type='button' onClick={() => {insertCategory()}}>카테고리 등록</button>
      </div>
      <div>
        <div>상품 이름</div>
      <input type='text' name='productName' onChange={(e) => {mschange(e)}} />
      
      <div>가격</div>
      <input type='text' name='productPrice' onChange={(e) => {mschange(e)}} />
      
      <div>수량</div>
      <input type='text' name='stock' onChange={(e) => {mschange(e)}} />
      
      <div>상세정보</div>
      <input type='text' name='detail' onChange={(e) => {mschange(e)}} />
      
    </div>
    <div>
      <button type='button' onClick={() => {
        insertItem()
      }}>상품 등록</button>
    </div>
    </div>
  )
}

export default MedicalSupplies