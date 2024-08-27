package com.green.MediClick.member.controller;


import com.green.MediClick.member.service.MemberService;
import com.green.MediClick.member.vo.MemberVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Resource(name = "memberService")
    private MemberService memberService;

    //회원가입
    @PostMapping("/insertMember")
    public void insertMember(@RequestBody MemberVO memberVO){
        memberService.insertMember(memberVO);
    }

    //로그인
    @PutMapping("/goLogin")
    public MemberVO goLogin(@RequestBody MemberVO memberVO){
        return memberService.goLogin(memberVO);
    }

    //환자조회
    @GetMapping("/getOneMem/{memNum}")
    public MemberVO getOneMem(@PathVariable("memNum")int memNum){
        return memberService.getOneMem(memNum);
    }
}
