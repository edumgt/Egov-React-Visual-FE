import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavAdmin() {
    return (
        <div className="nav nav_admin">
            <div className="inner">
                <h2 style={{ backgroundColor: '#0845A1', color: '#fff' }}>관리자메뉴</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.ADMIN_EXCELWORK} className={({ isActive }) => (isActive ? "cur" : "")}>
                        회원 엑셀 업로드</NavLink></li>


                    <li><NavLink to={URL.ADMIN_EXCELWORK2} className={({ isActive }) => (isActive ? "cur" : "")}>
                        과제별 상세정보 엑셀 업로드</NavLink></li>
                    <li><NavLink to={URL.ADMIN_EXCELWORK3} className={({ isActive }) => (isActive ? "cur" : "")}>
                        과제별 상세정보 목록</NavLink></li>

                    <li><NavLink to={URL.ADMIN_EXCELWORK5} className={({ isActive }) => (isActive ? "cur" : "")}>
                        핵심기술 로드맵 데이타 엑셀 업로드</NavLink></li>




                    {/*
                    <li><NavLink to={URL.ADMIN_EXCELWORK3} className={({ isActive }) => (isActive ? "cur" : "")}>
                    연구과제 지표별 현황 엑셀 업로드</NavLink></li>
                    */}




                    <li><NavLink to={URL.ADMIN_EXCELWORK6} className={({ isActive }) => (isActive ? "cur" : "")}>
                        사용후핵연료 저장/처분 기술수준 엑셀 업로드</NavLink></li>



                    <li style={{ borderTop: '1px solid #ddd' }}></li>

                    <li><NavLink to={URL.ADMIN_GALLERY} className={({ isActive }) => (isActive ? "cur" : "")}>
                        첨부파일관리</NavLink></li>

                    <li><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>
                        공지사항관리</NavLink></li>

                    <li><NavLink to={URL.ADMIN_MANAGER} className={({ isActive }) => (isActive ? "cur" : "")}>
                        암호변경</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(EgovLeftNavAdmin);