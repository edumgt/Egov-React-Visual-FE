import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutHistory() {
    return (
        <div className="container">
            <div className="c_wrap">
                
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사업소개</Link></li>
                        <li>연혁</li>
                    </ul>
                </div>
                

                <div className="layout">
                    
                    <EgovLeftNav></EgovLeftNav>
                    
                    
                    <div className="contents SITE_INTRO NOTICE_LIST2" id="contents">
                        

                        <h1 className="tit_3">사업소개</h1>

                        <p className="txt_1">-</p>
                        
                        <h2 className="tit_4">-</h2>

                        <h3 className="tit_5">-</h3>

                        <p className="msg_1">-</p>
                    
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutHistory;