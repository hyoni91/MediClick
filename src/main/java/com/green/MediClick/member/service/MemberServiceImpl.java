package com.green.MediClick.member.service;

import com.green.MediClick.medicaldoctor.vo.DoctorVO;
import com.green.MediClick.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("memberService")
public class MemberServiceImpl implements MemberService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //회원가입
    @Override
    public void insertMember(MemberVO memberVO) {
        sqlSession.insert("member.insertMember",memberVO);

        // 회원가입할때 "ADMIN"이면 의사정보도 추가
        if("ADMIN".equals(memberVO.getMemRole())){
            //의사 클래스 생성
            DoctorVO doctorVO = new DoctorVO();
            //의사 데이터 삽입
            doctorVO.setDocNum(memberVO.getMemNum());
            doctorVO.setDocName(memberVO.getMemName());

            //의사데이터를 회원에 저장
            insertDoctor(doctorVO);
        }
    }

    @Override
    public MemberVO goLogin(MemberVO memberVO) {
        return sqlSession.selectOne("member.goLogin",memberVO);
    }

    // 다음에 들어갈 회원번호 조회
    @Override
    public String nextInsert(String memRole) {
        return sqlSession.selectOne("member.nextNumber",memRole);
    }

    // 회원가입할때 "ADMIN"이면 의사정보도 추가
    @Override
    public void insertDoctor(DoctorVO doctorVO) {
        sqlSession.insert("doctorMapper.insertDoctor",doctorVO);
    }

    public MemberVO getOneMem(int memNum) {
        return sqlSession.selectOne("member.getOneMem",memNum);
    }
}
