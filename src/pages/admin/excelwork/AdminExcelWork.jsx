import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { GALLERY_BBS_ID } from 'config';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'components/EgovAttachFile';
//import bbsFormVaildator from 'utils/bbsFormVaildator';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ExcelWork from "components/ExcelWork";

function AdminExcelWork(props) {

    const showToast = (_val) => {
        toast(_val, { delay: 200, autoHideDelay: 200 });
    }


    const navigate = useNavigate();
    const location = useLocation();


    const bbsId = location.state?.bbsId || GALLERY_BBS_ID;
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

            setBoardDetail({ bbsId: bbsId, nttSj: "EX01", nttCn: "EX01" });

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
                        ...resp.result.boardVO,
                        nttSj: "RE: " + resp.result.boardVO.nttSj, nttCn: "", inqireCo: 0, atchFileId: ""
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
                    console.log(resp.resultCode);
                    //navigate(URL.ADMIN_GALLERY, {state:{bbsId : bbsId}});
                } else {

                    //navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                }
            }
        );

    };

    const deleteBoard = () => {
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
        EgovNet.requestFetch('/cop/bbs/delExcelData.do',
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log(resp.resultCode);
                    //navigate(URL.ADMIN_EXCELWORK4, {state:{bbsId : bbsId}});
                } else {
                    //navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                };

            },

        );
    };



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
                        <h2 className="tit_2">회원 Excel Upload</h2>
                        <ToastContainer AutoHide="true" Delay="200" />

                        <div style={{ fontSize: '14px', marginBottom: '20px', marginTop: '20px', backgroundColor: '#efefef', color: '#111', padding: '20px' }}>

                            <p style={{ padding: '10px' }}>회원정보 아이디,비번 등 업로드 입니다.</p>
                            <p style={{ padding: '10px' }}>엑셀파일명은 ex01.xlsx 으로 고정되어 있습니다.</p>
                            <p style={{ padding: '10px' }}>모든 cell은 텍스트 포맷만 인식 됩니다.</p>
                            <p style={{ padding: '10px' }}>엑셀의 산술식, 주석, 특수문자 등 서버에서 인식 불가 입니다.
                                &nbsp;<input id="nttSj" name="nttSj" type="hidden"
                                    defaultValue="EX01"></input>

                                <a href="#!" className="btn btn_warning_h46 w_200"
                                    onClick={(e) => {
                                        deleteBoard(); showToast('관리자 아이디를 제외하고 삭제하였습니다.');
                                    }}>기존 데이타 삭제</a>
                            </p>

                        </div>



                        <div>&nbsp;</div>

                        <div className="board_view2">


                            <EgovAttachFile
                                fnChangeFile={(attachfile) => {

                                    const arrayConcat = { ...boardDetail };
                                    // 기존 단일 파일 업로드에서 다중파일 객체 추가로 변환(아래 for문으로)
                                    for (let i = 0; i < attachfile.length; i++) {
                                        arrayConcat[`file_${i}`] = attachfile[i];
                                    }
                                    setBoardDetail(arrayConcat);
                                }}
                                fnDeleteFile={(deletedFile) => {
                                    //console.log("====>>> Delete deletedFile = ", deletedFile);
                                    setBoardAttachFiles(deletedFile);
                                }}
                                boardFiles={boardAttachFiles}
                                mode={props.mode}
                                posblAtchFileNumber={masterBoard.posblAtchFileNumber}
                            />


                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="#!" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            updateBoard(); showToast('업로드 하였습니다.');
                                        }}>저장</a>
                                </div>


                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminExcelWork;