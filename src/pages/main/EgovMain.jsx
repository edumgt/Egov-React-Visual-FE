/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import URL from 'constants/url';

import * as EgovNet from 'api/egovFetch';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SERVER_URL } from 'config';

function EgovMain(props) {

    let serverUrl = SERVER_URL + "/cmm/fms/getMainImage.do?pname=MainImage";

    const showToast = () => {
        toast("로그인 후 이용 가능 합니다.");
    };
    const sessionUser = sessionStorage.getItem('loginUser');
    const sessionUserId = JSON.parse(sessionUser)?.id;
    const sessionUserName = JSON.parse(sessionUser)?.name;
    const sessionUserSe = JSON.parse(sessionUser)?.userSe;
    const [noticeBoard, setNoticeBoard] = useState();
    const [noticeListTag, setNoticeListTag] = useState();
    const retrieveList = useCallback(() => {
        const retrieveListURL = '/cmm/main/mainPageAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()

        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setNoticeBoard(resp.result.notiList);

                let mutNotiListTag = [];
                mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>);

                resp.result.notiList.forEach(function (item, index) {
                    if (index === 0) mutNotiListTag = [];
                    mutNotiListTag.push(
                        <li key={index}>
                            <Link
                                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                                state={{
                                    nttId: item.nttId,
                                    bbsId: item.bbsId
                                }}
                            >
                                {item.nttSj}
                                <span>{item.frstRegisterPnttm}</span>
                            </Link>
                        </li>
                    );
                });
                setNoticeListTag(mutNotiListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );

    }, []);

    useEffect(() => {
        retrieveList();
    }, [retrieveList]);

    return (
       
        <div className="container_main P_MAIN">
            
            <div className="c_wrap" >
                <div className="colbox">
                    <div className="left_col" >

                        <img src={serverUrl}
                            style={{ position: 'relative' }}
                            alt="visual 이미지 입니다." />


                    </div>

                    <div className="right_col" >
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="#공지사항" className="on">공지사항</a></li>
                            </ul>
                            <div className="list">
                                <div className="notice">
                                    <h2 className="blind">공지사항</h2>
                                    <ul>
                                        {noticeListTag}
                                    </ul>
                                    <Link to={URL.INFORM_NOTICE} className="more">더보기</Link>
                                </div>

                                <div className="gallary"></div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="banner_bot" >

                    <div className="b0">
                        <div><Link to={URL.ABOUT_SITE} style={{ color: '#222', fontSize: '20px', padding: '0px', fontWeight: '600', marginLeft: '-23px', marginTop: '-10px' }}>사업소개</Link>
                            <div style={{ marginTop: '20px', padding: '10px', fontSize: '15px' }}>사용후핵연료 저장·처분 안정성<br />
                                확보를 위한 핵심기술 개발사업의<br />목표, 현주소, 성과구성 관련사항 </div>
                        </div>

                    </div>
                    <div className="b1">
                        <div>

                            {sessionUserSe === 'USR' &&
                                <Link
                                    to={URL.SUPPORT_DOWNLOAD}
                                    style={{
                                        color: '#222', fontSize: '20px', padding: '0px', fontWeight: '600',
                                        marginLeft: '-23px', marginTop: '-10px'
                                    }}>
                                    총사업현황</Link>
                            }

                            {sessionUserSe !== 'USR' &&
                                <Link
                                    to={"/"}
                                    style={{
                                        color: '#222', fontSize: '20px', padding: '0px', fontWeight: '600',
                                        marginLeft: '-23px', marginTop: '-10px'
                                    }}>
                                    총사업현황</Link>
                            }

                            <div style={{ marginTop: '20px', padding: '10px', fontSize: '15px' }}>과기정통부, 산업부, 원안위 통합<br />
                                863건 기준 성과달성 현황 안내</div>
                        </div>

                    </div>
                    <div className="b2">
                        <div>
                            {sessionUserSe === 'USR' &&
                                <Link to={URL.INTRO_WORKS} style={{
                                    color: '#222', fontSize: '20px',
                                    padding: '0px', fontWeight: '600', marginLeft: '-23px', marginTop: '-10px'
                                }}>사업성과 지표별 현황</Link>}
                            {sessionUserSe !== 'USR' &&
                                <Link to={"/"} style={{
                                    color: '#222', fontSize: '20px',
                                    padding: '0px', fontWeight: '600', marginLeft: '-23px', marginTop: '-10px'
                                }}>사업성과 지표별 현황</Link>}
                            <div style={{ marginTop: '20px', padding: '10px', fontSize: '15px' }}>6개 대표 사업성과별<br />
                                달성 현황 안내</div>
                        </div>

                    </div>
                    <div className="b3">
                        <div>
                            {sessionUserSe === 'USR' &&
                                <Link to={URL.SUPPORT_QNA}
                                    style={{
                                        lineHeight: '36px', color: '#222', fontSize: '20px', padding: '0px', fontWeight: '600', marginLeft: '-23px',
                                        marginTop: '-6px'
                                    }}>
                                    연구과제<br />&nbsp;&nbsp;&nbsp;&nbsp;성과지표별 현황</Link>}
                            {sessionUserSe !== 'USR' &&
                                <Link to={"/"}
                                    style={{
                                        lineHeight: '36px', color: '#222', fontSize: '20px', padding: '0px', fontWeight: '600', marginLeft: '-23px',
                                        marginTop: '-6px'
                                    }}>
                                    연구과제<br />&nbsp;&nbsp;&nbsp;&nbsp;성과지표별 현황</Link>}

                            <div style={{ marginTop: '15px', padding: '10px', fontSize: '15px' }}>6개 대표 사업성과를 구성하는<br />
                                22개 과제 성과의 달성 현황 안내</div>
                        </div>

                    </div>
                    <div className="b4">
                        <div>
                            {sessionUserSe === 'USR' &&
                                <Link to={URL.SUPPORT_APPLY} style={{
                                    lineHeight: '36px', color: '#222', fontSize: '20px', padding: '0px',
                                    fontWeight: '600', marginLeft: '-23px', marginTop: '-8px'
                                }}>
                                    연구과제<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;핵심기술 로드맵</Link>}
                            {sessionUserSe !== 'USR' &&
                                <Link to={"/"} style={{
                                    lineHeight: '36px', color: '#222', fontSize: '20px', padding: '0px',
                                    fontWeight: '600', marginLeft: '-23px', marginTop: '-8px'
                                }}>
                                    연구과제<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;핵심기술 로드맵</Link>}

                            <div style={{ marginTop: '15px', padding: '10px', fontSize: '15px' }}>사용후핵연료 저장·처분 40개<br />
                                핵심기술 로드맵 관련 사항 안내</div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        

    );
}

export default EgovMain;