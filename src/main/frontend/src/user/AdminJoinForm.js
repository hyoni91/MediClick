import React, { useEffect, useState } from 'react'
import './AdminJoinForm.css'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const AdminJoinForm = () => {
  const {docNum} = useParams()
  //조회를 했을때 닥넘이랑,닥네임,디이피티넘
  const navigate = useNavigate()
  //
  const [memData , setMemData] =useState({})
  // 의사데이터 저장할 변수
  const [docData, setDocData] = useState({
    docNum: docNum,
    docName: '',
    deptNum : '1',
    medicalDept: {
      deptNum: '', // 기본값
      deptName: '' // 기본값
    },
    imgVO: {
      imgNum: '', // 기본값
      originFileName: '', // 기본값
      attachedFileName: '', // 기본값
      docNum: '' // 기본값
    }
  })
  
  // 의사 번호
  // 의사 데이터 가져오기
  useEffect(() => {
    axios.get(`/member/getOneMem/${docNum}`)
    .then((res) => {
      console.log(res.data)
      setMemData(res.data)
      setDocData({...docData,docName : res.data.memName})
    })
    .catch((error) => {console.log(error)})
  },[])
  //이미지 미리보기
  const [previewUrl, setPreviewUrl] = useState('')
  // 이미지 생성
  const [docImg , setDocImg] = useState(null);

  // 이미지 미리보기
  useEffect(() => {
    if (docImg) {
      const objectUrl = URL.createObjectURL(docImg);
      setPreviewUrl(objectUrl);

      // Cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [docImg]);
  // 의사 진료과 선택
  const onChangeDept = (e) => {
    let value = e.target.value
    setDocData({...docData, [e.target.name] :value})
    console.log(docData)
  }

  //의사 등록 버튼
  const insertDoctor = (e) => {
    //의사 이미지 등록

    const fileConfig = {
      headers : {'Content-Type' : 'multipart/form-data'}
    }
    //form 객체 생성
    const docForm = new FormData();

    //2. form 객체에 데이터 추가

    docForm.append('docNum', docData.docNum );
    docForm.append('docName', docData.docName );
    docForm.append('deptNum', docData.deptNum );
    // 파일이 있을 경우에만 추가
    if (docImg) {
      docForm.append('docImg', docImg);
    }


    axios.post('/insertDoctor', docForm,fileConfig)
    .then((res) => {
      console.log(res.data)
      navigate('/loginForm')
    })
    .catch((error) => {console.log(error)})
  }

  const deleteDoctor = (e) => {
    axios.get('')
  }
  //반드시 아래의 설정 코드를 axios에 추가!!!
  return (
    <div>
        <div><h1 className='adminJoin-head'>의사 정보</h1></div>
      <div className='adminJoin-div'>
        <table className='adminJoin-table'>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td><input className='adminJoin-input' name='docName' value={memData.memName} type='text' readOnly/></td>
              
            </tr>
            <tr>
              <td>진료과</td>
              <td>
                <select className='adminJoin-select' name='deptNum' onChange={(e) => {onChangeDept(e)}}>
                  <option value={'1'}>유방암 외과</option>
                  <option value={'2'}>신경외과</option>
                  <option value={'3'}>갑상선외과</option>
                  <option value={'4'}>산부인과</option>
                  <option value={'5'}>흉부외과</option>
                  <option value={'6'}>혈액 종양 내과</option>
                </select>
                </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td >
              
        <input name='memTel' type="text" value={memData.memTel} readOnly onChange={(e)=>{
          // autoHyphen2(e)
        }} className='adminJoin-input'  maxLength='13' placeholder="전화번호를 입력하세요" /></td>
            </tr>
            {/* 데이터가 빈값일때 나타나는 변수 */}
            {/* 데이터가 다시 바뀌면 사라짐 */}
            {/* {errors.memTel && <tr className='error'><td></td><td >{errors.memTel}</td></tr>} */}
          </tbody>
        </table>
        {/* 의사 이미지 */}
        <div className='file-div'>
          
          <div>
            {previewUrl ? (
            <img className="file-img" src={previewUrl} alt="미리보기" />
          ) : (
          <div className="file-placeholder">사진 등록해주세요</div> /* 이미지가 없을 때의 빈 영역 */
        )}
          </div>
          <babel className='file-label'>사진등록
            <input className='file-input' type='file' accept='image/*' onChange={(e) => {
              setDocImg(e.target.files[0])
            }}/>
          </babel>
        </div>
          <div>
            <button className='adminJoin-btn' onClick={() => {navigate('/joinForm')}}>취소</button>
            <button className='adminJoin-btn' onClick={() => {insertDoctor()}}>저장</button>
            
          </div>
        
      </div>
    </div>
  )
}

export default AdminJoinForm