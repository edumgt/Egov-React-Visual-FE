import React from 'react';
import { Link } from 'react-router-dom';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';

function EgovQnaDetail() {
    return (
        <div className="container">
            <div className="c_wrap">
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">사업결과 1</Link></li>
                        <li>소개</li>
                    </ul>
                </div>
                <div className="layout">
                    <EgovLeftNav></EgovLeftNav>
                    <div className="contents QNA_LIST" id="contents">
                        <h2 className="tit_2">Q&amp;A 상세조회</h2>
                        <div className="board_view2">
                            <dl>
                                <dt>제목</dt>
                                <dd>
                                    내용
                                </dd>
                            </dl>
                            <dl>
                                <dt>첨부파일</dt>
                                <dd>
                                    <span className="file_attach">
                                        <Link to="">file_name.hwp</Link> <span>[3626] byte</span>
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <div className="qna_q">
                        </div>
                        <div className="qna_a">
                            <span>A</span>
                            <ul>
                                <li>
                                </li>
                            </ul>
                        </div>
                        <div className="replay">
                            <div className="left_col">
                                <label htmlFor="replay_write">답변달기</label>
                                <div>
                                    <textarea className="f_txtar w_full" name="" id="replay_write" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="right_col">
                                <a href="#!" className="btn ">등록</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EgovQnaDetail;