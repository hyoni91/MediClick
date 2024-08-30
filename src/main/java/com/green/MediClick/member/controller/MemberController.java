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
    public MemberVO insertMember(@RequestBody MemberVO memberVO){
        //다음에 들어갈 번호
        String nextNum = memberService.nextInsert(memberVO.getMemRole());
        System.out.println(memberVO);
        //다음에 들어가는 번호 저장
        memberVO.setMemNum(nextNum);
        //회원가입
        memberService.insertMember(memberVO);
        return memberVO;
    }

    //로그인
    @PutMapping("/goLogin")
    public MemberVO goLogin(@RequestBody MemberVO memberVO){
        return memberService.goLogin(memberVO);
    }

    //환자조회
    @GetMapping("/getOneMem/{memNum}")
    public MemberVO getOneMem(@PathVariable("memNum")String memNum){
        return memberService.getOneMem(memNum);
    }
}
