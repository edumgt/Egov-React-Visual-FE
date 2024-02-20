import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EgovHeader({ loginUser, onChangeLogin }) {
    const sessionUser = sessionStorage.getItem('loginUser');
    const sessionUserId = JSON.parse(sessionUser)?.id;
    const sessionUserName = JSON.parse(sessionUser)?.name;
    const sessionUserSe = JSON.parse(sessionUser)?.userSe;
    const navigate = useNavigate();
    const logInHandler = () => { 
        navigate(URL.LOGIN);
		document.querySelector('.all_menu.WEB').classList.add('closed');
		document.querySelector('.all_menu.Mobile').classList.add('closed');
    }
    const showToast = () => {
        toast("로그아웃되었습니다!");
        logOutHandler();
      }
    const logOutHandler = () => {
        const logOutUrl = '/uat/uia/actionLogoutAPI.do';
        const requestOptions = {
            credentials: 'include',
        }
        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                if (parseInt(resp.resultCode) === parseInt(CODE.RCV_SUCCESS)) {
                    onChangeLogin({ loginVO: {} });
                    sessionStorage.setItem('loginUser', JSON.stringify({"id":""}));
                    navigate(URL.MAIN);
					document.querySelector('.all_menu.WEB').classList.add('closed');
					document.querySelector('.all_menu.Mobile').classList.add('closed');
                }
            }
        );
    }
    return (
        <div className="header">
            <div className="inner">
                <div className="gnb">
                     <ul>
                        <li><NavLink to={URL.MAIN} className={({ isActive }) => (isActive ? "cur" : "")}>Home</NavLink></li>
                        <li><NavLink to={URL.INFORM_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항</NavLink></li>
                        <li><NavLink to={URL.ABOUT} className={({ isActive }) => (isActive ? "cur" : "")}>사업소개</NavLink></li>
                        {sessionUserSe ==='USR' &&
                            <li><NavLink to={URL.SUPPORT_DOWNLOAD} className={({ isActive }) => (isActive ? "cur" : "")}>총사업현황</NavLink></li>
                        }
                        {sessionUserSe ==='USR' &&
                            <li><NavLink to={URL.INTRO} className={({ isActive }) => (isActive ? "cur" : "")}>사업성과 지표별 현황</NavLink></li>
                        }
                        {sessionUserSe ==='USR' &&
                            <li><NavLink to={URL.SUPPORT_QNA} className={({ isActive }) => (isActive ? "cur" : "")}>연구과제 지표별 현황</NavLink></li>
                        }
                        {sessionUserSe ==='USR' &&
                            <li><NavLink to={URL.SUPPORT_APPLY} className={({ isActive }) => (isActive ? "cur" : "")}>핵심기술로드맵</NavLink></li>
                        }
                        
                        {sessionUserSe ==='USR' &&
                        sessionUserId === 'admin' &&
                            <li><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>관리자메뉴</NavLink></li>
                        }
                    </ul>
                    <ToastContainer />
                </div>
                <div className="user_info">
                    {sessionUserId &&
                        <>
                            <span className="person">{sessionUserName}&nbsp;&nbsp;</span>
                            <button onClick={showToast} className="btn">로그아웃</button>
                            
                        </>
                    }
                    {!sessionUserId &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                </div>
                <div className="right_a">
                    <button type="button" className="btn mobile btnAllMenuM" title="전체메뉴 닫힘">전체메뉴</button>
                </div>
            </div>
            <div className="all_menu WEB closed">
                <h2 className="blind">전체메뉴</h2>
                <div className="inner">
                </div>
            </div>
            <div className="all_menu Mobile closed">
                <div className="user_info_m">
                    {sessionUserId &&
                        <>
                            <span className="person">{sessionUserName}</span>이 로그인하셨습니다.&nbsp;&nbsp;
                            <button onClick={logOutHandler} className="btn logout">로그아웃</button>
                        </>
                    }
                    {!sessionUserId &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                    <button className="btn noscript close" type="button">전체메뉴 닫기</button>
                </div>
                <div className="menu">
                <h3><NavLink to={URL.INFORM_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항</NavLink></h3>
                <h3><NavLink to={URL.ABOUT} className={({ isActive }) => (isActive ? "cur" : "")}>사업소개</NavLink></h3>
                        {sessionUserSe ==='USR' &&
                            <h3><NavLink to={URL.SUPPORT_DOWNLOAD} className={({ isActive }) => (isActive ? "cur" : "")}>총사업현황</NavLink></h3>
                        }
                        {sessionUserSe ==='USR' &&
                            <h3><NavLink to={URL.INTRO} className={({ isActive }) => (isActive ? "cur" : "")}>사업성과 지표별 현황</NavLink></h3>
                        }
                        {sessionUserSe ==='USR' &&
                            <h3><NavLink to={URL.SUPPORT_QNA} className={({ isActive }) => (isActive ? "cur" : "")}>연구과제 지표별 현황</NavLink></h3>
                        }
                        {sessionUserSe ==='USR' &&
                            <h3><NavLink to={URL.SUPPORT_APPLY} className={({ isActive }) => (isActive ? "cur" : "")}>핵심기술로드맵</NavLink></h3>
                        }
                        {sessionUserSe ==='USR' &&
                        sessionUserId === 'admin' &&
                        <>
                            <h3><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur adminSub" : "adminSub")}>관리자메뉴</NavLink></h3>
                            <div className="submenu closed">
                                <ul>
                                    <li><NavLink to={URL.ADMIN_EXCELWORK} className={({ isActive }) => (isActive ? "cur" : "")}>회원 엑셀 업로드</NavLink></li>
                                    <li><NavLink to={URL.ADMIN_EXCELWORK2} className={({ isActive }) => (isActive ? "cur" : "")}>Data 엑셀 업로드</NavLink></li>
                                    
                                    
                                    <li><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항관리</NavLink></li>
									<li><NavLink to={URL.ADMIN_MANAGER} className={({ isActive }) => (isActive ? "cur" : "")}>관리자메뉴자 암호변경</NavLink></li>
                                </ul>
                            </div>
                        </>
                        }
                </div>
            </div>
        </div>
    );
}

export default EgovHeader;