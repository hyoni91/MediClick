package com.green.MediClick.schedule.vo;

import lombok.Data;

@Data
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



    //기본 생성자
    public PageVO(){
    }

    //생성자 초기값 설정
    //매개변수 : DB에서 조회한 전체 데이터 수
    public PageVO(int totalDataCnt){
        this.nowPage=1;
        this.displayPageCnt=5;
        this.displayDataCnt=5;
        this.totalDataCnt=totalDataCnt;
    }

    //모든 페이지 정보를 세팅하는 메서드
    public void setPageInfo(){
        //화면에 보이는 마지막 페이지 번호
        endPage=(int)Math.ceil(nowPage/(double)displayPageCnt)*displayPageCnt;

        beginPage=endPage-displayPageCnt+1;

        totalPageCnt=(int)Math.ceil(totalDataCnt/(double)displayDataCnt);

        endPage=endPage>totalPageCnt?totalPageCnt:endPage;

        prev= beginPage!=1;

        next= endPage!=totalPageCnt;

        offset=displayDataCnt*(nowPage-1);

    }




}
