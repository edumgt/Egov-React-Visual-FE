import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { GALLERY_BBS_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'components/EgovAttachFile';
import EgovImageGallery from 'components/EgovImageGallery';

function EgovAdminGalleryDetail(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const bbsId = location.state.bbsId || "BBSMSTR_CCCCCCCCCCCC";
    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const retrieveDetail = () => {
        const retrieveDetailURL = '/cop/bbs/selectBoardArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
        const deleteBoardURL = `/cop/bbs/deleteBoardArticleAPI/${nttId}.do`;
        const jToken = localStorage.getItem('jToken');
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': jToken
            },
            body: JSON.stringify({
                bbsId: bbsId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {

                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("게시글이 삭제되었습니다.")
                    navigate(URL.ADMIN_GALLERY, { replace: true });
                } else {
                    // alert("ERR : " + resp.message);
                    //navigate({ pathname: URL.ERROR }, { state: { msg: resp.resultMessage } });
                }

            }
        );
    }

    useEffect(function () {
        retrieveDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.groupEnd("EgovAdminGalleryDetail");

    return (
        <div className="container">
            <div className="c_wrap">

            <div>&nbsp;</div>
                <div className="layout">
                    <EgovLeftNav></EgovLeftNav>
                    <div className="contents contents_admin NOTICE_VIEW NOTICE_LIST2" id="contents">
                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterNm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>조회수</dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                            <EgovImageGallery boardFiles={boardAttachFiles} />

                            <div className="board_article2">
                                <textarea name="" cols="30" rows="3" readOnly="readonly"
                                    defaultValue={boardDetail && boardDetail.nttCn}></textarea>

                            </div>

                            <div className="board_attach">

                                <EgovAttachFile boardFiles={boardAttachFiles} />
                            </div>


                            <div className="board_btn_area">
                                {masterBoard.bbsUseFlag === 'Y' &&
                                    <div className="left_col btn3">

                                        <a href="#!" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                            e.preventDefault();
                                            onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                        }}>삭제</a>


                                    </div>
                                }
                                <div className="right_col btn1">
                                    <Link to={{ pathname: URL.ADMIN_GALLERY }}
                                        state={{
                                            nttId: nttId,
                                            bbsId: bbsId,
                                            searchCondition: searchCondition
                                        }}
                                        className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovAdminGalleryDetail;