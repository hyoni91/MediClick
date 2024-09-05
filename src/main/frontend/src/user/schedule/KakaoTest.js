import React, { useEffect } from 'react'
const {Kakao} = window;

function KakaoTest() {
   // 배포한 자신의 사이트
    const realUrl = "https://localhost:3030/"
   // 로컬 주소 (localhost 3000 같은거)
    const resultUrl =  "https://localhost:3030/"

   // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
     // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
       // 자신의 js 키를 넣어준다.
        Kakao.init('4efa41168cbd61da600f3efe717305a8');
       // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    },[]);

    const testDate = new Date()
    console.log(`${testDate.getFullYear()}년 ${testDate.getDate()}월 ${testDate.getDay()}일`)
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
  
    return (
    <div>
      <button onClick={()=>{kakaoShare()}}>카톡으로 안내받기</button>
    </div>
    )
  }

export default KakaoTest