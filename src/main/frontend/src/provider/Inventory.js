import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Inventory.css'

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/inventory/list');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className='inventory-wrap'>
      <h3>현 재고 현황</h3>
          {/* <div className='inverntory-seachbar'>
            <input 
              type='text' 
              placeholder='날짜/현황/거래처명'
              name='searchValue'
              onChange={(e)=>{
                
              }}
            />
            <span
              onClick={()=>{}}
            >
            </span>
            </div>        */}
            {products.length === 0 ? (
      <p>데이터가 없습니다.</p>
    ) : (
      <table className='inventoryTable'>
        <thead>
          <tr>
            {/* <td>카테고리</td> */}
            <td>No.</td>
            <td>제품명</td>
            <td>입고일자</td>
            <td>출고일자</td>
            <td>최초재고</td>
            <td>입고수량</td>
            <td>출고수량</td>
            <td>현 재고량</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productNum}>
              {/* <td>{product.cateNum}</td> */}
              <td>{product.productNum}</td>
              <td>{product.productName}</td>
              <td>{product.stockDate}</td>
              <td>{product.outDate}</td>
              <td>{product.initialStock}</td>
              <td>{product.incomimgQty}</td>
              <td>{product.outgoingQty}</td>
              <td>{product.currentStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
}

export default Inventory