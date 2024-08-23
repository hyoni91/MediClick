package com.green.MediClick.member.service;

import com.green.MediClick.member.vo.MemberVO;

public interface MemberService {
    // 회원가입
    void insertMember(MemberVO memberVO);

    //로그인
    MemberVO goLogin(MemberVO memberVO);
}
