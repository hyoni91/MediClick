package com.green.MediClick.board.service;

import com.green.MediClick.board.vo.BoardVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    // 게시글 등록
    @Override
    public void insertBoard(BoardVO boardVO) {
        sqlSession.insert("boardMapper.generalMapper.insertBoard", boardVO);
    }

    // 게시글 목록 조회
    @Override
    public List<BoardVO> getBoardList() {
        return sqlSession.selectList("boardMapper.generalMapper.getBoardList");
    }

    // 게시글 상세 정보
    @Override
    public BoardVO selectBoard(int boardNum) {
        return sqlSession.selectOne("boardMapper.generalMapper.selectBoard", boardNum);
    }

    // 게시글 삭제
    @Override
    public void deletePost(int boardNum) {
        sqlSession.delete("boardMapper.generalMapper.deletePost", boardNum);
    }

    // 게시글 수정
    @Override
    public void updateBoard(BoardVO boardVO) {
        sqlSession.update("boardMapper.generalMapper.updateBoard", boardVO);
    }

    //메인 미니 게시판
    @Override
    public List<BoardVO> getMiniBoard() {
        return sqlSession.selectList("boardMapper.generalMapper.getMainBoard");
    }

}
