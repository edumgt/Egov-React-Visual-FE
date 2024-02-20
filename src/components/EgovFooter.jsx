import React from 'react';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">

                <div className="info">
                    <div style={{fontSize:'16px',fontWeight:'600'}}>
                        <div>사용후핵연료 저장·처분 안전성 확보를 위한 핵심기술 개발사업 성과관리시스템</div>
                        
                        <div className="copy">대표전화: 042-866-4282
                        &nbsp;&nbsp;Copyright © iKSNF All rights reserved.</div>
                    </div>
                    
                </div>

                <div className="right_col" style={{paddingTop:'10px',textAlign:'right'}}>
                    <a href='https://iksnf.or.kr/'><img src={'https://iksnf.or.kr/publishing/kor/img/layout/logo.png'}
                        style={{ width: '100%' }}
                        alt="iksnf 입니다."
                    />
                    </a>
                    
                </div>

            </div>
        </div>
    );
}

export default EgovFooter;