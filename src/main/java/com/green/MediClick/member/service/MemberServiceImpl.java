package com.green.MediClick.member.service;

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
    }

    @Override
    public MemberVO goLogin(MemberVO memberVO) {
        return sqlSession.selectOne("member.goLogin",memberVO);
    }
}
