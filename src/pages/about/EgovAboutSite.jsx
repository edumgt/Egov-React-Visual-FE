import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutSite() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li>사업소개</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    {/*<EgovLeftNav></EgovLeftNav> ppt4페이지 요청으로 삭제함0907_한아름*/}
                    {/* <!--// Navigation --> */}

                    <div className="about" id="about">
                            {/* <!-- 본문 --> */}

                            <h1 className="tit_3">사업소개</h1>
                            <p className="txt_1" style={{textAlign:'center'}}>
                                <img src="/assets/images/about_site_txt_1.png" alt="사업소개 이미지 입니다."  style={{width:"100%",}}/>
                            </p> {/*이미지 작업하여 링크 추가함 0908_한아름*/}
                            

                            {/*<p className="txt_1">사용후핵연료입니다!!!·처분 안전성 확보를 위한 핵심기술개발 사업</p>

                            <div style={{padding:'20px'}}>&nbsp;</div>

                            <h1 className="tit_3">사업목표</h1>

                            <p className="txt_1">사용 후 핵연료 저장 처분...</p>

                            <div style={{padding:'20px'}}>&nbsp;</div>

                            <h1 className="tit_3">성과목표</h1>

                            <p className="txt_1">국제기구 검토를 거친...</p>
                            <p className="txt_1">IAEA...</p>

                            <div style={{padding:'20px'}}>&nbsp;</div>

                            <h1 className="tit_3">사업현주소</h1>

                            <p className="txt_1" style={{textAlign:'center'}}>
                                <img src='https://iksnf.or.kr/publishing/kor/img/contents/busi_range.jpg' alt='' />
                            </p>

                            <div style={{padding:'20px'}}>&nbsp;</div>

                            <h1 className="tit_3">성과구성</h1>
                            <p className="txt_1" style={{textAlign:'center'}}>
                                <img src='https://iksnf.or.kr/publishing/kor/img/contents/busi_system.jpg' alt='' />

                            </p>

                            {/* <!--// 본문 --> ppt (4page) 반영하여 삭제함 0908한아름 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutSite;