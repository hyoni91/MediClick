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
        sqlSession.insert("boardMapper.insertBoard", boardVO);
    }

    // 게시글 목록 조회
    @Override
    public List<BoardVO> getBoardList() {
        return sqlSession.selectList("boardMapper.getBoardList");
    }

    // 게시글 상세 정보
    @Override
    public BoardVO selectBoard(int boardNum) {
        return sqlSession.selectOne("boardMapper.selectBoard", boardNum);
    }

    // 게시글 삭제
    @Override
    public void deletePost(int boardNum) {
        sqlSession.delete("boardMapper.deletePost", boardNum);
    }

    @Override
    public void updateBoard(BoardVO boardVO) {
        sqlSession.update("boardMapper.updateBoard", boardVO);
    }

}
