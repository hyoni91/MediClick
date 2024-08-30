package com.green.MediClick.board.vo;

import com.green.MediClick.member.vo.MemberVO;
import lombok.Data;

@Data
public class BoardVO {
    private int boardNum;
    private String title;
    private String writer;
    private String content;
    private String createDate;
    private String memNum;
    private MemberVO memberVO;
}
