import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { GALLERY_BBS_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'components/EgovAttachFile';
//import bbsFormVaildator from 'utils/bbsFormVaildator';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EgovAdminGalleryEdit(props) {

    const showToast = (_val) => {
        toast(_val, { delay: 200, autoHideDelay: 200 });
    }
    const navigate = useNavigate();
    const location = useLocation();

    const bbsId = location.state?.bbsId || "BBSMSTR_CCCCCCCCCCCC";
    const nttId = location.state?.nttId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({ nttSj: '', nttCn: '' });
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/bbs/insertBoardArticleAPI.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/bbs/updateBoardArticleAPI.do'
                });
                break;
            case CODE.MODE_REPLY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "답글쓰기",
                    editURL: '/cop/bbs/replyBoardArticleAPI.do'
                });
                break;
            default:
                navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {
            
            const retrieveDetailURL = '/cop/bbs/selectUserBBSMasterInfAPI.do';
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    bbsId: bbsId,
                })
            }

            EgovNet.requestFetch(retrieveDetailURL,
                requestOptions,
                function (resp) {
                    setMasterBoard(resp.result.brdMstrVO);
                }
            );

            setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
            return;
        }

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

                if (modeInfo.mode === CODE.MODE_REPLY) {
                    setBoardDetail({
                        ...resp.result.boardVO, nttSj: "RE: " + resp.result.boardVO.nttSj, nttCn: "",
                        inqireCo: 0, atchFileId: ""
                    });
                }
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }

                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardAttachFiles(resp.result.resultFiles);
                }
            }
        );
    }

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
        }

        const jToken = localStorage.getItem('jToken');


        const requestOptions = {
            method: "POST",
            headers: {
                'Authorization': jToken
            },
            body: formData
        }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate(URL.ADMIN_GALLERY, { state: { bbsId: bbsId } });
                } else {
                    // alert("ERR : " + resp.message);
                    //navigate({ pathname: URL.ERROR }, { state: { msg: resp.resultMessage } });
                }
            }
        );

    };

    const Location = React.memo(function Location(masterBoard) {
        return (
            <div className="location">
                <ul>
                    <li><Link to={URL.MAIN} className="home">Home</Link></li>
                    <li><Link to={URL.ADMIN}>관리자메뉴</Link></li>
                    <li>{masterBoard && masterBoard.bbsNm}</li>
                </ul>
            </div>
        )
    });

    useEffect(function () {
        intMode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    return (
        <div className="container">
            <div className="c_wrap">
            <div>&nbsp;</div>


                <div className="layout">

                    <EgovLeftNav></EgovLeftNav>


                    <div className="contents contents_admin SITE_GALLARY_VIEW NOTICE_LIST2" id="contents">



                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2>

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">제목<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 " id="nttSj" name="nttSj" type="text"
                                        style={{ width: '400px' }}
                                        defaultValue={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl><dt style={{ backgroundColor: '#555', color: '#fff' }}>
                                MainImage, CORE1 ... CORE40 까지의 제목으로 구분 합니다.</dt></dl>

                            <dl>
                                <dt><label htmlFor="nttCn">내용<span className="req">필수</span></label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_200" id="nttCn"
                                        name="nttCn" cols="30" rows="3"
                                        placeholder=""
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
                                </dd>
                            </dl>

                            {modeInfo?.mode !== CODE.MODE_REPLY && masterBoard.fileAtchPosblAt === 'Y' &&
                                <EgovAttachFile
                                    fnChangeFile={(attachfile) => {

                                        const arrayConcat = { ...boardDetail };
                                        
                                        for (let i = 0; i < attachfile.length; i++) {
                                            arrayConcat[`file_${i}`] = attachfile[i];
                                        }
                                        setBoardDetail(arrayConcat);
                                    }}
                                    fnDeleteFile={(deletedFile) => {
                                        
                                        setBoardAttachFiles(deletedFile);
                                    }}
                                    boardFiles={boardAttachFiles}
                                    mode={props.mode}
                                    posblAtchFileNumber={masterBoard.posblAtchFileNumber}
                                />
                            }


                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="#!" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            updateBoard();
                                        }}>저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href={URL.ADMIN_GALLERY} className="btn btn_blue_h46 w_100">목록</a>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default EgovAdminGalleryEdit;