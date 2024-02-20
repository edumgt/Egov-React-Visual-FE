import React, { useState, useEffect, useCallback, useRef } from 'react';

import * as EgovNet from 'api/egovFetch';


function TopSel() {

    const cndRef = useRef();

    const [searchCondition, setSearchCondition] 
    = useState({ pageIndex: 1, searchCnd: '0', searchWrd: '' });

    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback(() => {
    const retrieveListURL = '/uat/uia/selJumu.do';
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify()
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                let mutListTag = [];
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; 
                    
                    mutListTag.push(
                        <option key={index} value="{item.jumu}">{item.jumu}</option>
                        
                    );
                });
                
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
    },[]);

    useEffect(() => {
        retrieveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            부처:&nbsp;
             <select id="jumu"
             defaultValue={searchCondition.searchCnd} ref={cndRef}
             onChange={e => {
                 cndRef.current.value = e.target.value; 
             }}
             >
                <option value="">전체</option>
                {listTag}
            </select>&nbsp;&nbsp;
            분야: <input type="text" name="yun" />
            &nbsp;&nbsp;
            (대)과제분류: <input type="text" name="bgj" />
            &nbsp;&nbsp;
            (중)과제분류: <input type="text" name="mgj" />
            &nbsp;&nbsp;
            기관명: <input type="text" name="giga" />
            &nbsp;&nbsp;
        </>
    );
}

export default TopSel;