package com.green.MediClick.board.controller;

import com.green.MediClick.board.service.BoardService;
import com.green.MediClick.board.vo.BoardVO;
import jakarta.annotation.Resource;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/board")
public class BoardController {
    @Resource(name = "boardService")
    private BoardService boardService;

    // 게시글 등록
    @PostMapping("/insert")
    public void insertBoard(@RequestBody BoardVO boardVO){
        boardService.insertBoard(boardVO);
    }
    // 게시글 목록 조회
    @PostMapping("/list")
    public List<BoardVO> getBoardList(){
        return boardService.getBoardList();
    }
    // 게시글 상세 정보
    @GetMapping("detail/{boardNum}")
    public BoardVO boardDetail(@PathVariable("boardNum")int boardNum){
        return boardService.selectBoard(boardNum);
    }

}
