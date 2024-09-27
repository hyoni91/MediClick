import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MedicalSupplies.css';
const MedicalSupplies = () => {
  const [mainImg, setMainImg] = useState(null)
  const navigate = useNavigate()
  const [previewUrl, setPreviewUrl] = useState('');
  //아이템
  const [medicalSupplies, setMedicalSupplies] = useState({
    productNum : '',
    productName : '',
    cateNum : '',
    productPrice : '',
    stock : '',
    detail : ''
  })
  //카테
  const [msCategory, setMsCategory] = useState({
    cateNum : '',
    cateName : ''
  })
  //카테 리스트
  const [category,setCategory]=useState([])
  //아이템 리스트
  const [item, setItem] = useState([])
  useEffect(() => {
    axios.all([
      axios.get('/item/cateList'),
      axios.get('/item/medicalSuppliesList')
    ])
    
    
    .then(axios.spread((res1,res2) => {
      console.log(res1.data)
      //카테고리
      setCategory(res1.data)
      setCateNum(res1.data[0].cateNum);
      //아이템
      setItem(res2.data)
      console.log(res2.data)
    }))
    .catch((error) => {console.log(error)})
  },[])
  const [cateNum, setCateNum] =useState('')
  const categoryChange = (e) => {
    setMsCategory({
      ...msCategory,
      cateNum : cateNum,
      [e.target.name] : e.target.value
    })
    console.log(cateNum)
  }


  const mschange = (e) => {
console.log(cateNum)

    setMedicalSupplies({
      ...medicalSupplies,
      cateNum : cateNum,
      [e.target.name] : e.target.value
    })
  }
  
  const insertCategory = () => {
    if (msCategory.cateName == '' ) {
      alert('카테고리를 입력하세요');
    } else {
      console.log(msCategory)
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
  
  const insertItem = () => {
    console.log(mainImg)
      //이미지
    const fileConfig = {headers : {'Content-Type' : 'multipart/form-data'}}
    const itemForm = new FormData();

    itemForm.append('productName', medicalSupplies.productName)
    itemForm.append('cateNum', medicalSupplies.cateNum)
    itemForm.append('productPrice', medicalSupplies.productPrice)
    itemForm.append('stock', medicalSupplies.stock)
    itemForm.append('detail', medicalSupplies.detail)
    itemForm.append('mainImg', mainImg)
    
    axios.post('/item/productInsert',itemForm,fileConfig)
    .then((res) => {
      window.location.reload()
    })
    .catch((error) => {console.log(error)})
  }
  
  const deleteCategory = (cateNum) => {
    axios.get(`/item/cateDelete/${cateNum}`)
    .then((res) => {
      updateCategory()
    })
    .catch((error) => {console.log(error)})
  }
  const updateCategory = () => {
    axios.all([
      axios.get('/item/cateList'),
      axios.get('/item/medicalSuppliesList')
    ])
    .then(axios.spread((res1,res2) => {
      console.log(res1.data)
      //카테고리
      setCategory(res1.data)
      setCateNum(res1.data[0].cateNum);
      //아이템
      setItem(res2.data)
      console.log(res2.data)
    }))
    .catch((error) => {
      console.log(error);
    });
  };
  

  return (

    <div className='medicalSupplies-container'>
      <div className='medicalSupplies-flex'>
        <div className='category-div'>
          <div >
            <select key={''} name='cateNum' onChange={(e) => {setCateNum(e.target.value)}}>
              { category =='' || category.length == 0 ? <option>카테고리가 없습니다.
              </option>
              :
              category.map((cate,i) => {
                return(
                    
                      <option key={i} value={cate.cateNum}>{cate.cateName}</option>
                    
                )
              })}
            </select>
              <input type='text' name='cateName' value={msCategory.cateName} onChange={(e) => {categoryChange(e)}} />
          </div>
            <div className='cate-flex'>
              <div className='cate-divBtn'>
                <button type='button' onClick={() => {deleteCategory(cateNum)}}>카테고리 삭제</button>
              </div>
              <div className='cate-divBtn'>
                <button type='button' onClick={() => {insertCategory()}}>카테고리 등록</button>
              </div>
            </div>
        </div>
          <div className='cate-divBtn'>
          </div>
        <div className='medicalSupplies-div'>
          <div className='ms-imgdiv'>
          {previewUrl ? (
            <img className="adminfile-img" src={previewUrl} alt="미리보기" />
          ) : (
          <div className="adminfile-placeholder">사진 등록해주세요</div> /* 이미지가 없을 때의 빈 영역 */
        )}
            <div>
            <input
          className='ad-input'
          name='mainImg'
          type='file'
          accept='image/*'
          onChange={(e) => {
            console.log(1)
        setMainImg(e.target.files[0]); // 파일을 상태에 설정
        setPreviewUrl(URL.createObjectURL(e.target.files[0])); // 미리보기 URL 설정
    }}
/>
            </div>
          </div>
          <div>
          <select key={''} name='cateNum' onChange={(e) => {setCateNum(e.target.value)}}>
              { category =='' || category.length == 0 ? <option>카테고리가 없습니다.
              </option>
              :
              category.map((cate,i) => {
                return(
                    
                      <option key={i} value={cate.cateNum}>{cate.cateName}</option>
                    
                )
              })}
            </select>
            <div>상품 이름</div>
            <input type='text' name='productName' onChange={(e) => {mschange(e)}} />
            
            <div>가격</div>
            <input type='text' name='productPrice' onChange={(e) => {mschange(e)}} />
            
            <div>수량</div>
            <input type='text' name='stock' onChange={(e) => {mschange(e)}} />
            
            <div>상세정보</div>
            <input type='text' name='detail' onChange={(e) => {mschange(e)
              console.log(medicalSupplies)
            }} />
          
            <div>
              <button type='button' onClick={() => {
                console.log(mainImg)
                console.log(item)
                insertItem()
              }}>상품 등록</button>
            </div>
          </div>
          {/* 아이템 테이블 */}
          
        </div>
      </div>
      <div className='medicalSupplies-item'>
        <table className='medicalSupplies-itemtable'>
          <colgroup>
          <col width={'10%'}/>
          <col width={'20%'}/>
          <col width={'20%'}/>
          <col width={'10%'}/>
          <col width={'*0%'}/>
          </colgroup>
          <thead>
            <tr>
              <td>종류</td>
              <td>상품</td>
              <td>가격</td>
              <td>수량</td>
              <td>상품설명</td>
            </tr>
          </thead>
          <tbody>
          {
            item.length > 0 ? (
              item.map((item,i) => {
              return(
                <tr key={i}>
                  <td>{item.categoryVO.cateName}</td>
                  <td className ='td-flex'>
                    <div><img className='img-td' src={`http://localhost:8080/upload/${item.imgVO.attachedFileName}`} /></div>
                    <div>{item.productName}</div>
                  </td>
                  <td>{item.productPrice}</td>
                  <td>{item.stock}</td>
                  <td>{item.detail}</td>
                </tr>
              )}))
              :
            <tr>
              <td colSpan="6">의료용품이 없습니다.</td>
            </tr>
          }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default MedicalSupplies
// 이미지 
//   <div>
//     {previewUrl ? (
//     <img className="file-img" src={previewUrl} alt="미리보기" />
//   ) : (
//   <div className="file-placeholder">사진 등록해주세요</div> /* 이미지가 없을 때의 빈 영역 */
// )}
//   </div>