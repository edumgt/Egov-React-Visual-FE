import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';

import URL from 'constants/url';
import CODE from 'constants/code';

function EgovLoginContent(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [userInfo, setUserInfo] = useState({ id: '', password: 'default', userSe: 'USR' });
	// eslint-disable-next-line no-unused-vars
    const [loginVO, setLoginVO] = useState({});

    const [saveIDFlag, setSaveIDFlag] = useState(false);

    const checkRef = useRef();

    const KEY_ID = "KEY_ID";
    const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

    const handleSaveIDFlag = () => {
        localStorage.setItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
        setSaveIDFlag(!saveIDFlag);
    };

    let idFlag;
        try {
            idFlag = JSON.parse(localStorage.getItem(KEY_SAVE_ID_FLAG));
        }
        catch(err) {
            idFlag = null;
        } 

    useEffect(() => {

        if (idFlag === null) {
            setSaveIDFlag(false);
			// eslint-disable-next-line react-hooks/exhaustive-deps
            idFlag = false;
        }
        if (idFlag !== null) setSaveIDFlag(idFlag);
        if (idFlag === false) {
            localStorage.setItem(KEY_ID, "");
            checkRef.current.className = "f_chk"
        } else {
            checkRef.current.className = "f_chk on"
        };
      
        let data = localStorage.getItem(KEY_ID);
        if (data !== null) setUserInfo({ ...userInfo, id: data });
      }, [idFlag]);

    const submitFormHandler = (e) => {
        //console.log("EgovLoginContent submitFormHandler()");
        
        //const loginUrl = "/uat/uia/actionLoginAPI.do"
        const loginUrl = "/uat/uia/actionLoginJWT.do"
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        EgovNet.requestFetch(loginUrl,
            requestOptions,
            (resp) => {
                let resultVO = resp.resultVO;
                let jToken = resp?.jToken

                localStorage.setItem('jToken', jToken);

                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    setLoginVO(resultVO);
                    sessionStorage.setItem('loginUser', JSON.stringify(resultVO));
                    props.onChangeLogin(resultVO);
                    if (saveIDFlag) localStorage.setItem(KEY_ID, resultVO?.id);
                    navigate(URL.MAIN);
                    // PC와 Mobile 열린메뉴 닫기 0910 수정
                    document.querySelector('.all_menu.WEB').classList.add('closed');
                    document.querySelector('.btnAllMenu').classList.remove('active');
                    document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
		            document.querySelector('.all_menu.Mobile').classList.add('closed');
                } else {
                    alert(resp.resultMessage)
                }
            })
    }

 
    return (
        <div className="contents" id="contents">
            {/* <!-- 본문 --> */}
            <div className="Plogin">
                <h1>로그인</h1>
                
                <div className="login_box">
                    <form name="" method="" action="" >
                        <fieldset>
                            <legend>로그인</legend>
                            <span className="group">
                                <input type="text" name="" title="아이디" placeholder="아이디" value={userInfo?.id}
                                    onChange={e => setUserInfo({ ...userInfo, id: e.target.value })} />
                                <input type="password" name="" title="비밀번호" placeholder="비밀번호"
                                    onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} />
                            </span>
                            <div className="chk">
                                <label style={{display:'none'}} className="f_chk" htmlFor="saveid" ref={checkRef}>
                                    <input type="checkbox" name="" id="saveid" onChange={handleSaveIDFlag} checked={saveIDFlag}/> 
                                    <em>ID저장</em>
                                </label>
                            </div>
                            <button type="button" onClick={submitFormHandler}><span>LOGIN</span></button>
                        </fieldset>
                    </form>
                </div>

                
            </div>
            {/* <!--// 본문 --> */}
        </div>
    );
}

export default EgovLoginContent;