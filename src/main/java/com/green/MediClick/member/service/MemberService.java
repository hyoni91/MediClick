package com.green.MediClick.member.service;

import com.green.MediClick.member.vo.MemberVO;

public interface MemberService {
    // 회원가입
    void insertMember(MemberVO memberVO);

    //로그인
    MemberVO goLogin(MemberVO memberVO);

    //환자 조회
    MemberVO getOneMem(int memNum);

    // 회원가입할 다음숫자
    String nextInsert(String memRole);
}
