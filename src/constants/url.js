
const URL = {
    //COMMON
    MAIN                        : "/", //메인페이지   
    
    LOGIN                       : "/login", //로그인
    ERROR                       : "/error", //로그인
    
    //ABOUT
    ABOUT                       : "/about", //사업소개   
    ABOUT_SITE                  : "/about/site", // 사업소개/소개
    ABOUT_HISTORY               : "/about/history", // 사업소개/연혁
    ABOUT_ORGANIZATION          : "/about/organization", // 사업소개/조직소개
    ABOUT_LOCATION              : "/about/location", // 사업소개/찾아오시는길
    
    
    INTRO                       : "/intro", 
    INTRO_WORKS                 : "/intro/works", 
    INTRO_SERVICE               : "/intro/service", 
    INTRO_SERVICE2               : "/intro/service2", 
    
    //SUPPORT
    SUPPORT                     : "/support", // 사업결과 1
    SUPPORT_DOWNLOAD            : "/support/download", // 사업결과 1/AA 결과
    SUPPORT_DOWNLOAD_DETAIL     : "/support/download/detail", 
    SUPPORT_DOWNLOAD_CREATE     : "/support/download/create", 
    SUPPORT_QNA                 : "/support/qna", // 사업결과 1/묻고답하기
    SUPPORT_QNA_DETAIL          : "/support/qna/detail", // 사업결과 1/묻고답하기/상세
    SUPPORT_APPLY               : "/support/apply", // 사업결과 1/서비스신청
    
    //INFORM
    INFORM                      : "/inform", // 게시판 
    INFORM_DAILY                : "/inform/daily", // 게시판/오늘의행사
    INFORM_DAILY_DETAIL         : "/inform/daily/detail", // 게시판/오늘의행사상세
    INFORM_WEEKLY               : "/inform/weekly", // 게시판/금주의행사
    INFORM_WEEKLY_DETAIL        : "/inform/weekly/detail", // 게시판/금주의행사상세
    INFORM_NOTICE               : "/inform/notice", // 게시판/공지사항
    INFORM_NOTICE_DETAIL        : "/inform/notice/detail", // 게시판/공지사항상세
    INFORM_NOTICE_CREATE        : "/inform/notice/create", // 게시판/공지사항등록
    INFORM_NOTICE_MODIFY        : "/inform/notice/modify", // 게시판/공지사항수정
    INFORM_NOTICE_REPLY         : "/inform/notice/reply", // 게시판/공지사항답글
    
    
    //ADMIN
    ADMIN                       : "/admin", // 관리자메뉴
    ADMIN_SCHEDULE              : "/admin/schedule", // 관리자메뉴/일정관리
    ADMIN_SCHEDULE_DETAIL       : "/admin/schedule/detail", // 관리자메뉴/일정관리상세
    ADMIN_SCHEDULE_CREATE       : "/admin/schedule/create", // 관리자메뉴/일정관리생성
    ADMIN_SCHEDULE_MODIFY       : "/admin/schedule/modify", // 관리자메뉴/일정관리수정

    ADMIN_BOARD                 : "/admin/board", // 관리자메뉴/게시판생성관리 목록
    ADMIN_BOARD_DETAIL          : "/admin/board/detail", // 관리자메뉴/게시판생성관리 상세
    ADMIN_BOARD_CREATE          : "/admin/board/create", // 관리자메뉴/게시판생성관리 등록
    ADMIN_BOARD_MODIFY          : "/admin/board/modify", // 관리자메뉴/게시판생성관리 상세/수정

    ADMIN_USAGE                 : "/admin/usage", // 관리자메뉴/게시판사용관리 목록
    ADMIN_USAGE_DETAIL          : "/admin/usage/detail", // 관리자메뉴/게시판사용관리 상세
    ADMIN_USAGE_CREATE          : "/admin/usage/create", // 관리자메뉴/게시판사용관리 등록
    ADMIN_USAGE_MODIFY          : "/admin/usage/modify", // 관리자메뉴/게시판사용관리 상세/수정

    ADMIN_NOTICE                : "/admin/notice/", // 관리자메뉴/공지사항관리 목록
    ADMIN_NOTICE_DETAIL         : "/admin/notice/detail", // 관리자메뉴/공지사항관리 상세
    ADMIN_NOTICE_CREATE         : "/admin/notice/create", // 관리자메뉴/공지사항관리 등록
    ADMIN_NOTICE_MODIFY         : "/admin/notice/modify", // 관리자메뉴/공지사항관리 수정
    ADMIN_NOTICE_REPLY          : "/admin/notice/reply", // 관리자메뉴/공지사항관리 답글 등록

    ADMIN_GALLERY               : "/admin/gallery", // 관리자메뉴/사이트자료실관리
    ADMIN_GALLERY_DETAIL        : "/admin/gallery/detail", // 관리자메뉴/사이트자료실관리 상세
    ADMIN_GALLERY_CREATE        : "/admin/gallery/create", // 관리자메뉴/사이트자료실관리 등록
    ADMIN_GALLERY_MODIFY        : "/admin/gallery/modify", // 관리자메뉴/사이트자료실관리 수정
    ADMIN_GALLERY_REPLY         : "/admin/gallery/reply", // 관리자메뉴/사이트자료실관리 답글 등록
    
	ADMIN_MANAGER               : "/admin/manager/", // 관리자메뉴/관리자메뉴자 암호변경

    ADMIN_EXCELWORK             : "/admin/excelwork", // 회원 엑셀업로드
    ADMIN_EXCELWORK2             : "/admin/excelwork2", // Data 엑셀업로드
    ADMIN_EXCELWORK3             : "/admin/excelwork3", // 지표 엑셀업로드
    ADMIN_EXCELWORK4             : "/admin/excelwork4", // 연도별 데이타 엑셀업로드
    ADMIN_EXCELWORK5             : "/admin/excelwork5", // 핵심기술 데이타 엑셀업로드
    ADMIN_EXCELWORK6             : "/admin/excelwork6", // 사업성과별 지표 엑셀업로드
}

export default URL;