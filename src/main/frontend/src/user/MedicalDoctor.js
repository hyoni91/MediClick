import React from 'react'
import './MedicalDoctor.css'

const MedicalDoctor = () => {
  return (
    <div>
    <div className='doctorMem'>
        <div className='doctorIntro'>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/김현경 프로필.png'/>
            <div>
              <div className='introDoctor'>김현경</div>
              <div className='introDoctor'>유방암외과 / 외과</div>
              <div className='introDoctor'>
                유방암의 진단 및 수술적 치료, 유방암의 새로운 치료법 개발을 위한 유전자 연구
              </div>
            </div>
          </div>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/민정흠 프로필.png'/>
            <div>
              <div className='introDoctor'>민정흠</div>
              <div className='introDoctor'>신경외과 / 뇌척수종양클리닉 전문</div>
              <div className='introDoctor'>
                뇌종양, 악성교정, 뇌전이암 및 연수막암전이 발생기전에 대한 기초연구, 신치료법 개발과 임상시험
              </div>
            </div>
          </div>
        </div>
        <div className='doctorIntro'>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/유지현 프로필.jpg'/>
            <div>
              <div className='introDoctor'>유지현</div>
              <div className='introDoctor'>갑상선외과 / 핵의학과</div>
              <div className='introDoctor'>갑상선암의 방사성 요오드 치료, 갑상선암의 핵의학적 진단, 진행성 갑상선암의 수술적 치료</div>
            </div>
          </div>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/서은송 프로필.jpg'/>
            <div>
              <div className='introDoctor'>서은송</div>
              <div className='introDoctor'>산부인과 / 임상연구부</div>
              <div className='introDoctor'>자궁내막암, 난소암, 자궁경부암 등의 로봇 및 내시경 수술, 재발성 부인암의 표적항암치료 및 면역치료</div>
            </div>
          </div>
        </div>
        <div className='doctorIntro'>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/서은송 프로필.jpg'/>
            <div>
              <div className='introDoctor'>김형진</div>
              <div className='introDoctor'>흉부외과 / 치료내성연구과</div>
              <div className='introDoctor'>폐암 및 식도암의 수술적 치료, 폐암의 새로운 치료법 개발을 위한 임상시험 및 약물 유전체 연구</div>
            </div>
          </div>
          <div className='cancer'>
            <img className='doctorMemImg' src='http://localhost:8080/images/정다영 프로필.jpg'/>
            <div>
              <div className='introDoctor'>정다영</div>
              <div className='introDoctor'>혈액종양내과 / 희귀ㆍ소아암연구과</div>
              <div className='introDoctor'>악성림프종, 백혈병, 다발골수종, 빈혈 및 혈소판 감소증, 조혈모세포이식, 혈전지혈질환 치료와 연구</div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default MedicalDoctor