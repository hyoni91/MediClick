package com.green.MediClick.schedule.vo;

public class PageVO {

    //전체 데이터 수
    private int totalDataCnt;

    //한 페이지에 보여지는 데이터 수(게시글 수)
    //쿼리의 LIMIT랑 같아야함
    private int displayDataCnt;

    //전체 페이지 수
    private int totalPageCnt;

    //현재 페이지
    private int nowPage;

    //한 화면에 보여지는 페이지 수
    private int displayPageCnt;

    //화면에 보이는 시작페이지
    private int beginPage;

    //화면에 보이는 마지막 페이지
    private int endPage;

    //이전 버튼 유무
    private boolean prev;

    //다음 버튼 유무
    private boolean next;

    private int offset;




}
