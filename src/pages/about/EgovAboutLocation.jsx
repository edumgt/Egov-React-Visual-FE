import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutLocation() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사업소개</Link></li>
                        <li>찾아오시는길</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_CONTACT_US" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">사업소개</h1>

                        <p className="txt_1">-</p>

                        <h2 className="tit_4">-</h2>

                        <div className="map">
                            -
                        </div>

                        <div className="addr">
                            <div className="left_col">
                                
                            </div>
                            <div className="right_col">
                                
                            </div>
                        </div>

                        <div className="way">
                            <div className="left_col">
                                
                            </div>
                            <div className="right_col">
                                
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutLocation;