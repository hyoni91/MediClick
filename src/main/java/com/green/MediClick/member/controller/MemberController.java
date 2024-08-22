package com.green.MediClick.member.controller;


import com.green.MediClick.member.service.MemberService;
import com.green.MediClick.member.vo.MemberVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Resource(name = "memberService")
    private MemberService memberService;

    @PostMapping("/insertMember")
    public void insertMember(@RequestBody MemberVO memberVO){
        memberService.insertMember(memberVO);
    }
}
