import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MedicalSupplies.css';
import ReactModal from 'react-modal';
const MedicalSupplies = () => {

  //검색 및 페이지 정보를 자바로 가져갈 때 사용하는 변수
  const [itemListData, setItemListData] = useState({
    searchType : 'CATE_NAME',
    searchValue : '',
    nowPage : 1
  });

  //조회 결과를 저장할 변수
  const [resultList, setResultList] = useState({
    items : [],
    pageInfo : {}
  })



  //const [searchValue ,setSearchValue] = useState('')
  const [mainImg, setMainImg] = useState(null)
  const navigate = useNavigate()
  const [previewUrl, setPreviewUrl] = useState('');
  //const [searchData, setSearchData] = useState({
  //  searchType : 'CATE_NAME',
  //  searchValue : ''
  //})
  //const [page,setPage]=useState({})
  //const [currentPage,setCurrentPage]=useState(1)

  //아이템
  const [medicalSupplies, setMedicalSupplies] = useState({
    productNum : '',
    productName : '',
    cateNum : '',
    productPrice : 0,
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
      axios.post('/item/medicalSuppliesList', itemListData)
    ])
    
    
    .then(axios.spread((res1,res2) => {
      console.log(res1.data)
      //카테고리
      setCategory(res1.data)
      setCateNum(res1.data[0].cateNum);

      //조회된 상품 목록 및 페이지 정보 세팅
      setResultList(res2.data)

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
  

  const search = (e) => {
    setItemListData({
      ...itemListData,
      [e.target.name] : e.target.value
    })
    console.log(itemListData)
  }
  
  const searchItem = () => {
    axios.post('/item/medicalSuppliesList',itemListData)
    .then((res) => {
      setResultList(res.data);

    })
    .catch((error) => {console.log(error)})
  }


  //페이징 처리한 곳에서 숫자(페이지 번호)를 클릭하면 다시 게시글 조회
  function getList(pageNo=1){
    setItemListData({
      ...itemListData,
      nowPage : pageNo
    });
  }

  useEffect(() => {
      axios
      .post('/item/medicalSuppliesList', itemListData) // 요청 시 params를 전송
      .then((res) => {
        setResultList(res.data);
      })
      .catch((error)=>{console.log(error)})  ;
    //}
  }, [itemListData.nowPage]);

  //페이징 그리기
  function drawPagination(){
    const pagesArr=[]
    if(resultList.pageInfo.prev){
      pagesArr.push(<span key="prev" className='page-span'
      onClick={(e)=>{getList(resultList.pageInfo.beginPage-1)}}>이전</span>)
    }

    for(let a=resultList.pageInfo.beginPage; a<=resultList.pageInfo.endPage; a++){
      pagesArr.push(<span key={`page-${a}`} className={`page-span num ${a === resultList.pageInfo.beginPage ? 'active' : ''}`}
        onClick={() => getList(a)}>{a}</span>)
    }

    if(resultList.pageInfo.next){
      pagesArr.push(<span key="next" className='page-span'
      onClick={(e)=>{getList(resultList.pageInfo.endPage+1)}}>다음</span>)
    }

    return pagesArr

  }
  
  return (

    <div className='medicalSupplies-container'>
      <h3>아이템 관리</h3>
      <div className='medicalSupplies-flex'>
        <div className='category-div'>
          <div >
            <select key={''} className='cateSelect' name='cateNum' value={cateNum} onChange={(e) => {setCateNum(e.target.value)}}>
              { category =='' || category.length == 0 ? <option>카테고리가 없습니다.
              </option>
              :
              category.map((cate,i) => {
                return(
                      <option key={i} value={cate.cateNum}>{cate.cateName}</option>
                )
              })}
            </select>
            
              <input 
              className='getCate' 
              type='text' name='cateName' 
              value={msCategory.cateName} 
              onChange={(e) => {categoryChange(e)}} placeholder='카테고리를 입력 해주세요.'
              />
          </div>
            <div className='cate-flex'>
              <div className='cate-divBtn'>
                <button type='button' onClick={() => {deleteCategory(cateNum)}}className='btn'>카테고리 삭제</button>
                <button type='button' onClick={() => {insertCategory()}}className='btn'>카테고리 등록</button>
              </div>
              <div className='cate-divBtn'>
              </div>
            </div>
        </div>
        <div className='medicalSupplies-div'>
        <div 
        className='ms-imgdiv'>
          {previewUrl ? (
            <img className="adminfile-img" src={previewUrl} alt="미리보기" />
          ) 
          : (
          <div 
          className="adminfile-placeholder">
            사진 등록해주세요
          </div> /* 이미지가 없을 때의 빈 영역 */
            )}
            <input
              className='ad-input'
              name='mainImg'
              type='file'
              accept='image/*'
              onChange={(e) => {
                setMainImg(e.target.files[0]); // 파일을 상태에 설정
                setPreviewUrl(URL.createObjectURL(e.target.files[0])); // 미리보기 URL 설정
              }}
            />
          </div>
          <div className='sup-item-div'>
            <select className='cateSelect' key={''} name='cateNum' onChange={(e) => {setCateNum(e.target.value)}}>
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
            <pre></pre>
            <input type='text' name='detail' onChange={(e) => {mschange(e)
              console.log(medicalSupplies)
            }} />
          
            <div className='sup-btn-div'>
              <button 
                type='button' 
                onClick={() => {
                console.log(mainImg)
                console.log(item)
                insertItem()
              }}
              className='btn'>
                상품 등록
              </button>
            </div>
          </div>
          
        </div>
      </div>
          {/* 아이템 테이블 */}
      <div className='searchItem-div'>
        <select name='searchType' onChange={(e) => {
          console.log(e.target.value)
          search(e)}
        }>
          <option value={'CATE_NAME'}>카테고리</option>
          <option value={'PRODUCT_NAME'}>제품명</option>
        </select>
        <input type='text' name='searchValue' onChange={(e) => {search(e)}}/>
        <button type='button' className='btn' onClick={() => {searchItem()}}>검색</button>
      </div>
      <div className='medicalSupplies-item'>
        <table className='medicalSupplies-itemtable'>
          <colgroup>
          <col width={'10%'}/>
          <col width={'25%'}/>
          <col width={'20%'}/>
          <col width={'*'}/>
          </colgroup>
          <thead>
            <tr>
              <td>종류</td>
              <td>상품명</td>
              <td>가격</td>
              {/* <td>수량</td> */}
              <td>상품설명</td>
            </tr>
          </thead>
          <tbody>
          {
            resultList.items.length > 0 ? (
              resultList.items.map((item,i) => {
              return(
                <tr key={i}>
                  <td>{item.categoryVO.cateName}</td>
                  <td className="td-flex">
                    <div className="img-td">
                      <img className="product-img" src={`http://localhost:8080/upload/${item.imgVO.attachedFileName}`} />
                    </div>
                    <div className="img-div">{item.productName}</div>
                  </td>
                  <td>{item.productPrice.toLocaleString()}원</td>
                  {/* <td>{item.stock}</td> */}
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
      <div className='sup-footer'>
      {drawPagination()}
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