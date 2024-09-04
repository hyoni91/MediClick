package com.green.MediClick.board.service;

import com.green.MediClick.board.vo.BoardVO;

import java.util.List;

public interface BoardService {

    // 게시글 등록
    void insertBoard(BoardVO boardVO);

    // 게시글 목록 조회
    List<BoardVO> getBoardList();

    // 게시글 상세정보
    BoardVO selectBoard(int boardNum);

    // 게시글 삭제
    void deletePost(int boardNum);

    // 게시글 수정
    void updateBoard(BoardVO boardVO);
}
