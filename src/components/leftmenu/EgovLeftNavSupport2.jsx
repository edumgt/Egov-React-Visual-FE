import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavSupport2() {
    return (
        <div className="nav">
            <div className="inner">
            <h2 style={{backgroundColor:'#0845A1',color:'#fff'}}>핵심기술로드맵</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SUPPORT_APPLY} className={({ isActive }) => (isActive ? "cur" : "")}>핵심기술로드맵</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavSupport2;