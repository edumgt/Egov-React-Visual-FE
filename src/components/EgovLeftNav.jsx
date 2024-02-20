import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNav() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>게시판</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INFORM_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNav;