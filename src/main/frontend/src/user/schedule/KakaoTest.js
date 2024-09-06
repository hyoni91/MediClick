import emailjs from '@emailjs/browser';
import React, { useEffect, useRef } from 'react'
const {Kakao} = window;

function KakaoTest() {
   // 배포한 자신의 사이트
    const realUrl = "https://localhost:3030/"
   // 로컬 주소 (localhost 3000 같은거)
    const resultUrl =  "https://localhost:3030/"



  //////////////////////////////////////////////////////////////////////////
    // 친구에게 보내기 

    useEffect(()=>{
      //메일
      emailjs.init(process.env.REACT_APP_Public_key)

     // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
       // 자신의 js 키를 넣어준다.
        Kakao.init(process.env.REACT_APP_JavaScript_KEY);
       // 잘 적용되면 true
        console.log(Kakao.isInitialized());
    },[]);

    const testDate = new Date()
    console.log(`${testDate.getFullYear()}년 ${testDate.getMonth()+1}월 ${testDate.getDay()}일`)
    const testInfo = {
      '이름' : '김아무개',
      '주민번호' : '123456-123456',
      '진료과목' : '흉부외과'
    }

    const kakaoShare = () =>{
    Kakao.Share.sendDefault({
      objectType: 'text',
      text:
        ` <예약안내>
        안녕하세요 MediClick입니다.
        하기와 같이 예약확정되었습니다. 
        날짜 : ${testDate.getFullYear()}년 ${testDate.getDate()}월 ${testDate.getDay()}일
        이름 : ${testInfo.이름}
        주민번호 : ${testInfo.주민번호}

        당일 취소는 반드시 전화주세요.`,
      link: {
        webUrl: "https://localhost:3030/",
      },
    })
    }
  //////////////////////////////////////////////////////////////////////////


  //나에게 보내기 
  const kakaoRequest = () =>{
  Kakao.API.request({
    url: '/v2/api/talk/memo/scrap/send',
    data: {
      template_id:111918,
      request_url: "https://localhost:3030/",
    },
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }






  /////////////////////////////////////이메일 보내기
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_opia6hi', 'mediClick_tamplate', form.current, {
        publicKey: process.env.REACT_APP_Public_key,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...')
          console.log(error);
        },
      );
  };


    return (
    <div>
      <button onClick={()=>{kakaoShare()}}>친구에게 카톡</button>
      <button onClick={()=>{kakaoRequest()}}>나에게 카톡</button>
      <button onClick={(e)=>{sendEmail(e)}}>이메일</button>
      <form ref={form}>
        <input type='hidden' name='memName' value={'김아무개'}/>
        <input type='hidden' name='regDate' value={'2024-09-05'}/>
        <input type='hidden' name='schDate' value={'2024-09-10'}/>
        <input type='hidden' name='schTime'  value={'11:00'}/>
        <input type='hidden' name='deptName' value={'산부인과'}/>
        <input type='hidden' name='memRrn' value={'123456'}/>
        <input type='hidden' name='from_name' value={'그린최고암센터'}/>
        <input type='hidden' name='reply_to' value={''}/>
        <input type='hidden' name='to_email' value={'hyoni.green@gmail.com'}/>
      </form>
    </div>
    )
  }

export default KakaoTest