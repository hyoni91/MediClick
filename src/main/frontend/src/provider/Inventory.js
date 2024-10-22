import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Inventory.css'

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/provider/inventory');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>현 재고 현황</h1>
      <table className='inventoryTable'>
        <thead>
          <tr>
            <td>카테고리</td>
            <td>제품번호</td>
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
            <tr key={product.PRODUCT_NUM}>
              <td>{product.CATE_NUM}</td>
              <td>{product.PRODUCT_NUM}</td>
              <td>{product.PRODUCT_NAME}</td>
              <td>{product.STOCK_DATE}</td>
              <td>{product.OUTGOING_QTY}</td>
              <td>{product.INITIAL_STOCK}</td>
              <td>{product.INCOMING_QTY}</td>
              <td>{product.OUTGOING_QTY}</td>
              <td>{product.CURRENT_STOCK}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inventory