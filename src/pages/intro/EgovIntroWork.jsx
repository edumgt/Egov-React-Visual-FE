import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as EgovNet from 'api/egovFetch';
import Chart1 from "react-apexcharts";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from 'react-router-dom';
import URL from 'constants/url';
import { options1 } from 'config';
import { options3 } from 'config';

function EgovIntroWork() {
    let counter = 1;
    const location = useLocation();

    const [jumup1, setJumup1] = useState('');
    const [jumup2, setJumup2] = useState('');
    const [jumup3, setJumup3] = useState('');

    const [yunp1, setYunp1] = useState('');
    const [yunp2, setYunp2] = useState('');
    const [yunp3, setYunp3] = useState('');


    const [bgjp1, setBgjp1] = useState('');
    const [bgjp2, setBgjp2] = useState('');
    const [bgjp3, setBgjp3] = useState('');
    const [bgjp4, setBgjp4] = useState('');


    const [mgjp1, setMgjp1] = useState('');
    const [mgjp2, setMgjp2] = useState('');
    const [mgjp3, setMgjp3] = useState('');
    const [mgjp4, setMgjp4] = useState('');
    const [mgjp5, setMgjp5] = useState('');
    const [mgjp6, setMgjp6] = useState('');

    const [giap1, setGiap1] = useState('');
    const [giap2, setGiap2] = useState('');
    const [giap3, setGiap3] = useState('');
    const [giap4, setGiap4] = useState('');
    const [giap5, setGiap5] = useState('');
    const [giap6, setGiap6] = useState('');
    const [giap7, setGiap7] = useState('');


    function initText() {
        setJumup1('');
        setJumup2('');
        setJumup3('');

        setYunp1('');
        setYunp2('');
        setYunp3('');


        setBgjp1('');
        setBgjp2('');
        setBgjp3('');
        setBgjp4('');


        setMgjp1('');
        setMgjp2('');
        setMgjp3('');
        setMgjp4('');
        setMgjp5('');
        setMgjp6('');

        setGiap1('');
        setGiap2('');
        setGiap3('');
        setGiap4('');
        setGiap5('');
        setGiap6('');
        setGiap7('');
    }


    const [listTag1, setListTag1] = useState([]);
    const [listTag2, setListTag2] = useState([]);
    const [listTag5, setListTag5] = useState([]);
    const [listTag6, setListTag6] = useState([]);
    const [listTag7, setListTag7] = useState([]);
    const [listTag10, setListTag10] = useState([]);
    const [listTag11, setListTag11] = useState([]);
    const [listTag12, setListTag12] = useState([]);

    const [listTag110, setListTag110] = useState([]);
    const [listTag120, setListTag120] = useState([]);

    const [searchCondition, setSearchCondition]
        = useState(location.state?.searchCondition ||
        {
            searchCnd: '과기부',
            searchCnd1: '산업부',
            searchCnd2: '원안위',

            searchWrd: '저장',
            searchWrd1: '처분',
            searchWrd2: '규제',

            searchBgj: '총괄',
            searchBgj1: '총괄1',
            searchBgj2: '총괄2',
            searchBgj3: '전략',

            searchMgj: '1세부',
            searchMgj1: '2세부',
            searchMgj2: '3세부',
            searchMgj3: '4세부',
            searchMgj4: '1단위',
            searchMgj5: '2단위',

            searchGia: '한국원자력연구원',
            searchGia1: '한전원자력연료',
            searchGia2: '한국원자력환경공단',
            searchGia3: '한국수력원자력',
            searchGia4: '라온넥스텝',
            searchGia5: '한국원자력안전기술원',
            searchGia6: '한국지질자원연구원',

            searchGnm: '',


            gjipy: '',
            sjipy: '',
            memo: '',
            kind: '',
            scr: ''
        });

    const retrieveList2 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selHak01.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {


                if (resp.result !== null &&
                    resp.result.resultList[0] !== null) {
                    setListTag2(resp.result.resultList[0]);
                } else {
                    setListTag2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList2(searchCondition);
    }, []);

    const retrieveList10 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selReport.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021 !== '') {
                    setListTag10(resp.result.resultList[0]);
                } else {
                    setListTag10([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList10(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveList12 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selHak02.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021 !== '') {
                    setListTag11([
                        resp.result.resultList[0].y2021,
                        resp.result.resultList[0].y2022,
                        resp.result.resultList[0].y2023,
                        resp.result.resultList[0].y2024,
                        resp.result.resultList[0].y2025,
                        resp.result.resultList[0].y2026,
                        resp.result.resultList[0].y2027,
                        resp.result.resultList[0].y2028,
                        resp.result.resultList[0].y2029
                    ]);

                } else {
                    setListTag11([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
                }

                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021 !== '') {
                    setListTag12(
                        [resp.result.resultList[0].y2021r,
                        resp.result.resultList[0].y2022r,
                        resp.result.resultList[0].y2023r,
                        resp.result.resultList[0].y2024r,
                        resp.result.resultList[0].y2025r,
                        resp.result.resultList[0].y2026r,
                        resp.result.resultList[0].y2027r,
                        resp.result.resultList[0].y2028r,
                        resp.result.resultList[0].y2029r]);
                } else {
                    setListTag12([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
                }

                if (
                    resp.result.resultList[1] !== null &&
                    resp.result.resultList[1].y2021 !== '') {
                    setListTag110([
                        resp.result.resultList[1].y2021,
                        resp.result.resultList[1].y2022,
                        resp.result.resultList[1].y2023,
                        resp.result.resultList[1].y2024,
                        resp.result.resultList[1].y2025,
                        resp.result.resultList[1].y2026,
                        resp.result.resultList[1].y2027,
                        resp.result.resultList[1].y2028,
                        resp.result.resultList[1].y2029
                    ]);

                } else {
                    setListTag110([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
                }

                if (
                    resp.result.resultList[1] !== null &&
                    resp.result.resultList[1].y2021 !== '') {
                    setListTag120(
                        [resp.result.resultList[1].y2021r,
                        resp.result.resultList[1].y2022r,
                        resp.result.resultList[1].y2023r,
                        resp.result.resultList[1].y2024r,
                        resp.result.resultList[1].y2025r,
                        resp.result.resultList[1].y2026r,
                        resp.result.resultList[1].y2027r,
                        resp.result.resultList[1].y2028r,
                        resp.result.resultList[1].y2029r]);
                } else {
                    setListTag120([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
                }

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList12(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const retrieveList4 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selSung01.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021 !== '') {
                    setListTag5(resp.result.resultList[0]);
                } else {
                    setListTag5([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList4(searchCondition);
    }, []);


    const retrieveList5 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selSung02.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {


                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021r !== '') {
                    setListTag6(resp.result.resultList[0]);
                } else {
                    setListTag6([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }



            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList5(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveList6 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selSung03.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021r !== '') {
                    setListTag7(resp.result.resultList[0]);
                } else {
                    setListTag7([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }
            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );

    }, []);

    useEffect(() => {
        retrieveList6(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    const retrieveList = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selTotal3.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                if (
                    resp.result.resultList[0] !== null &&
                    resp.result.resultList[0].y2021 !== '') {
                    setListTag1(resp.result.resultList[0]);
                } else {
                    setListTag1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList(searchCondition);

    }, []);

    return (
        <div className="container">
            <div className="c_wrap">

                <div className="location">
                    <ul>
                        <li><a className="home" href="#!">Home</a></li>
                        <li>사업성과 지표별 현황</li>
                    </ul>
                </div>


                <div className="layout">
                    <div className="contents PDS_LIST" id="contents">
                        <h1 className="tit_3"><FontAwesomeIcon icon={faList} />&nbsp;사업성과 지표별 현황</h1>
                        <table className="msg_1" >

                            <tr>
                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>
                                    주무부처
                                </td>

                                <td colspan="9">
                                    <table><tr>
                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="jumu"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchCnd}

                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setJumup1('과기부');

                                                        } else {

                                                            setJumup1('');

                                                        }

                                                    }}

                                                />&nbsp;&nbsp;과학기술정보통신부
                                            </p>
                                        </td>

                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="jumu1"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchCnd1}

                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setJumup2('산업부');

                                                        } else {

                                                            setJumup2('');

                                                        }
                                                    }}

                                                />&nbsp;&nbsp;산업통산자원부</p></td>

                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="jumu2"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchCnd2}

                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setJumup3('원안위');

                                                        } else {

                                                            setJumup3('');

                                                        }
                                                    }}

                                                />&nbsp;&nbsp;원자력안전위원회</p>
                                        </td>
                                    </tr>
                                    </table>

                                </td>
                            </tr>
                            <tr>

                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>연구분야</td>

                                <td colspan="9">
                                    <table><tr>


                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="yun"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchWrd}

                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setYunp1('저장');

                                                        } else {

                                                            setYunp1('');

                                                        }

                                                    }}

                                                />&nbsp;&nbsp;저장</p>
                                        </td>
                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="yun1"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchWrd1}
                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setYunp2('처분');

                                                        } else {

                                                            setYunp2('');

                                                        }

                                                    }}

                                                />&nbsp;&nbsp;처분</p>
                                        </td>
                                        <td style={{ width: '30%', textAlign: 'center', padding: '5px' }}>
                                            <p style={{ backgroundColor: '#fff' }}>
                                                <input type="checkbox" name="yun2"
                                                    key={counter++}
                                                    defaultValue={searchCondition.searchWrd2}
                                                    onChange={e => {
                                                        if (e.target.checked) {

                                                            setYunp3('규제');

                                                        } else {

                                                            setYunp3('');

                                                        }

                                                    }}

                                                />&nbsp;&nbsp;규제</p>
                                        </td>
                                    </tr></table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>(대)과제분류</td>

                                <td colspan="9">
                                    <table><tr>
                                        <td style={{ width: '22%', textAlign: 'center', padding: '5px' }}>

                                            <p style={{ backgroundColor: '#fff' }}><input type="checkbox" name="bgj"
                                                key={counter++}
                                                defaultValue={searchCondition.searchBgj}
                                                onChange={e => {
                                                    if (e.target.checked) {

                                                        setBgjp1('총괄');

                                                    } else {

                                                        setBgjp1('');

                                                    }

                                                }}

                                            />&nbsp;&nbsp;총괄</p>
                                        </td>
                                        <td style={{ width: '22%', textAlign: 'center', padding: '5px' }}>

                                            <p style={{ backgroundColor: '#fff' }}><input type="checkbox" name="bgj1"
                                                key={counter++}
                                                defaultValue={searchCondition.searchBgj1}
                                                onChange={e => {
                                                    if (e.target.checked) {

                                                        setBgjp2('총괄1');

                                                    } else {

                                                        setBgjp2('');

                                                    }

                                                }}

                                            />&nbsp;&nbsp;총괄1</p>
                                        </td>
                                        <td style={{ width: '22%', textAlign: 'center', padding: '5px' }}>

                                            <p style={{ backgroundColor: '#fff' }}><input type="checkbox" name="bgj2"
                                                key={counter++}
                                                defaultValue={searchCondition.searchBgj2}
                                                onChange={e => {
                                                    if (e.target.checked) {

                                                        setBgjp3('총괄2');

                                                    } else {

                                                        setBgjp3('');

                                                    }

                                                }}

                                            />&nbsp;&nbsp;총괄2</p>
                                        </td>
                                        <td style={{ width: '22%', textAlign: 'center', padding: '5px' }}>

                                            <p style={{ backgroundColor: '#fff' }}><input type="checkbox" name="bgj3"
                                                key={counter++}
                                                defaultValue={searchCondition.searchBgj3}
                                                onChange={e => {
                                                    if (e.target.checked) {

                                                        setBgjp4('전략');

                                                    } else {

                                                        setBgjp4('');

                                                    }

                                                }}

                                            />&nbsp;&nbsp;전략</p>
                                        </td>
                                    </tr>
                                    </table>
                                </td>

                            </tr>

                            <tr>

                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>(중)과제분류</td>

                                <td colspan="9">
                                    <table>
                                        <tr>
                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp1('1세부');

                                                            } else {

                                                                setMgjp1('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;1세부</p>
                                            </td>

                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj1"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj1}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp2('2세부');

                                                            } else {

                                                                setMgjp2('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;2세부</p>
                                            </td>

                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj2"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj2}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp3('3세부');

                                                            } else {

                                                                setMgjp3('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;3세부</p>
                                            </td>

                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj3"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj3}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp4('4세부');

                                                            } else {

                                                                setMgjp4('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;4세부</p>
                                            </td>

                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj4"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj4}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp5('1단위');

                                                            } else {

                                                                setMgjp5('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;1단위</p>
                                            </td>
                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="mgj5"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchMgj5}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setMgjp6('2단위');

                                                            } else {

                                                                setMgjp6('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;2단위</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>기관명</td>


                                <td colspan="9">
                                    <table>
                                        <tr>

                                            <td style={{ width: '15%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap1('한국원자력연구원');

                                                            } else {

                                                                setGiap1('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한국원자력연구원</p>
                                            </td>
                                            <td style={{ width: '15%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga1"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia1}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap2('한전원자력연료');

                                                            } else {

                                                                setGiap2('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한전원자력연료</p>
                                            </td>
                                            <td style={{ width: '15%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga2"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia2}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap3('한국원자력환경공단');

                                                            } else {

                                                                setGiap3('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한국원자력환경공단</p>
                                            </td>
                                            <td style={{ width: '14.5%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga3"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia3}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap4('한국수력원자력');

                                                            } else {

                                                                setGiap4('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한국수력원자력</p>
                                            </td>
                                            <td style={{ width: '14.3%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga4"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia4}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap5('라온넥스텝');

                                                            } else {

                                                                setGiap5('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;라온넥스텝</p>
                                            </td>
                                            <td style={{ width: '15%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga5"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia5}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap6('한국원자력안전기술원');

                                                            } else {

                                                                setGiap6('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한국원자력안전기술원</p>
                                            </td>
                                            <td style={{ width: '16%', textAlign: 'center', padding: '5px' }}>
                                                <p style={{ backgroundColor: '#fff' }}>
                                                    <input type="checkbox" name="giga6"
                                                        key={counter++}
                                                        defaultValue={searchCondition.searchGia6}
                                                        onChange={e => {
                                                            if (e.target.checked) {

                                                                setGiap7('한국지질자원연구원');

                                                            } else {

                                                                setGiap7('');

                                                            }

                                                        }}

                                                    />&nbsp;&nbsp;한국지질자원연구원</p>
                                            </td>

                                        </tr>
                                    </table>

                                </td>
                            </tr>


                            <tr style={{ display: 'none' }}>
                                <td style={{ width: '10%', textAlign: 'center', height: '45px' }}>연도</td>


                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y1"


                                        />&nbsp;&nbsp;21</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y2"


                                        />&nbsp;&nbsp;22</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y3"


                                        />&nbsp;&nbsp;23</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y4"
                                            defaultValue={searchCondition.searchGia}


                                        />&nbsp;&nbsp;24</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y5"


                                        />&nbsp;&nbsp;25</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y6"


                                        />&nbsp;&nbsp;26</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y7"


                                        />&nbsp;&nbsp;27</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y8"


                                        />&nbsp;&nbsp;28</p>
                                </td>
                                <td style={{ width: '10%', textAlign: 'center', padding: '5px' }}>
                                    <p style={{ backgroundColor: '#fff' }}>
                                        <input type="checkbox" name="y9"


                                        />&nbsp;&nbsp;29</p>
                                </td>

                            </tr>

                            <tr>
                                <td colspan="10" style={{ textAlign: 'right', height: '50px', padding: '5px' }}>
                                    <button type="button"
                                        className="btn_dark"
                                        onClick={() => {
                                            retrieveList({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,



                                            });
                                            retrieveList2({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,
                                            });

                                            retrieveList4({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,
                                            });
                                            retrieveList5({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,
                                            });
                                            retrieveList6({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,
                                            });
                                            retrieveList10({
                                                ...searchCondition,
                                                searchCnd: jumup1,
                                                searchCnd1: jumup2,
                                                searchCnd2: jumup3,

                                                searchWrd: yunp1,
                                                searchWrd1: yunp2,
                                                searchWrd2: yunp3,

                                                searchBgj: bgjp1,
                                                searchBgj1: bgjp2,
                                                searchBgj2: bgjp3,
                                                searchBgj3: bgjp4,

                                                searchMgj: mgjp1,
                                                searchMgj1: mgjp2,
                                                searchMgj2: mgjp3,
                                                searchMgj3: mgjp4,
                                                searchMgj4: mgjp5,
                                                searchMgj5: mgjp6,

                                                searchGia: giap1,
                                                searchGia1: giap2,
                                                searchGia2: giap3,
                                                searchGia3: giap4,
                                                searchGia4: giap5,
                                                searchGia5: giap6,
                                                searchGia6: giap7,
                                            });

                                            setSearchCondition(searchCondition);


                                        }}
                                    >검색</button>&nbsp;
                                    <button type="button"
                                        style={{display:'none'}}
                                        className="btn_gray"
                                        onClick={() => {
                                            initText();
                                            retrieveList({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',



                                            });
                                            retrieveList2({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',
                                            });

                                            retrieveList4({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',
                                            });
                                            retrieveList5({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',
                                            });
                                            retrieveList6({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',
                                            });
                                            retrieveList10({
                                                ...searchCondition,
                                                searchCnd: '',
                                                searchCnd1: '',
                                                searchCnd2: '',

                                                searchWrd: '',
                                                searchWrd1: '',
                                                searchWrd2: '',

                                                searchBgj: '',
                                                searchBgj1: '',
                                                searchBgj2: '',
                                                searchBgj3: '',

                                                searchMgj: '',
                                                searchMgj1: '',
                                                searchMgj2: '',
                                                searchMgj3: '',
                                                searchMgj4: '',
                                                searchMgj5: '',

                                                searchGia: '',
                                                searchGia1: '',
                                                searchGia2: '',
                                                searchGia3: '',
                                                searchGia4: '',
                                                searchGia5: '',
                                                searchGia6: '',
                                            });

                                        }}
                                    >초기화</button>
                                </td>
                            </tr>
                        </table>

                        <div className="recent" >
                            <ul  >
                                <li >
                                    실증-검사시스템 구축율
                                    <Link to={{ pathname: URL.INTRO_SERVICE }}
                                        key={counter++}
                                        state={{
                                            nttId: '1',
                                            searchCondition: searchCondition,

                                            jumup1: jumup1,
                                            jumup2: jumup2,
                                            jumup3: jumup3,

                                            yunp1: yunp1,
                                            yunp2: yunp2,
                                            yunp3: yunp3,


                                            bgjp1: bgjp1,
                                            bgjp2: bgjp2,
                                            bgjp3: bgjp3,
                                            bgjp4: bgjp4,


                                            mgjp1: mgjp1,
                                            mgjp2: mgjp2,
                                            mgjp3: mgjp3,
                                            mgjp4: mgjp4,
                                            mgjp5: mgjp5,
                                            mgjp6: mgjp6,


                                            giap1: giap1,
                                            giap2: giap2,
                                            giap3: giap3,
                                            giap4: giap4,
                                            giap5: giap5,
                                            giap6: giap6,
                                            giap7: giap7,



                                        }}

                                        style={{
                                            width: '100%', textAlign: 'right', marginTop: '-30px',
                                        }}><span
                                            style={{ borderRadius: '3px', padding: '3px', backgroundColor: '#333', color: '#fefefe' }}
                                        >상세내용</span></Link>
                                </li>
                                <li className='chart_li'>
                                    <Chart1
                                        key={counter++}
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표',
                                                type: 'line',
                                                data: [
                                                    Math.round((parseInt(listTag6.y2021) + parseInt(listTag7.y2021)) / 2),
                                                    Math.round((parseInt(listTag6.y2022) + parseInt(listTag7.y2022)) / 2),
                                                    Math.round((parseInt(listTag6.y2023) + parseInt(listTag7.y2023)) / 2),
                                                    Math.round((parseInt(listTag6.y2024) + parseInt(listTag7.y2024)) / 2),
                                                    Math.round((parseInt(listTag6.y2025) + parseInt(listTag7.y2025)) / 2),
                                                    Math.round((parseInt(listTag6.y2026) + parseInt(listTag7.y2026)) / 2),
                                                    Math.round((parseInt(listTag6.y2027) + parseInt(listTag7.y2027)) / 2),
                                                    Math.round((parseInt(listTag6.y2028) + parseInt(listTag7.y2028)) / 2),
                                                    Math.round((parseInt(listTag6.y2029) + parseInt(listTag7.y2029)) / 2)]
                                            },
                                            {
                                                name: '달성',
                                                type: 'bar',
                                                data: [
                                                    Math.round((parseInt(listTag6.y2021r) + parseInt(listTag7.y2021r)) / 2),
                                                    Math.round((parseInt(listTag6.y2022r) + parseInt(listTag7.y2022r)) / 2),
                                                    Math.round((parseInt(listTag6.y2023r) + parseInt(listTag7.y2023r)) / 2),
                                                    Math.round((parseInt(listTag6.y2024r) + parseInt(listTag7.y2024r)) / 2),
                                                    Math.round((parseInt(listTag6.y2025r) + parseInt(listTag7.y2025r)) / 2),
                                                    Math.round((parseInt(listTag6.y2026r) + parseInt(listTag7.y2026r)) / 2),
                                                    Math.round((parseInt(listTag6.y2027r) + parseInt(listTag7.y2027r)) / 2),
                                                    Math.round((parseInt(listTag6.y2028r) + parseInt(listTag7.y2028r)) / 2),
                                                    Math.round((parseInt(listTag6.y2029r) + parseInt(listTag7.y2029r)) / 2)]
                                            }
                                        ]}
                                        type="line"
                                    />
                                </li>
                                <li style={{ marginTop: '30px' }}>
                                    규제요소 개발(건)
                                    <div style={{ width: '100%', textAlign: 'right', marginTop: '-20px' }}>
                                        <Link to={{ pathname: URL.INTRO_SERVICE }}
                                            key={counter++}
                                            style={{
                                                width: '100%', textAlign: 'right', marginTop: '-30px',
                                            }}
                                            state={{
                                                nttId: '2',
                                                searchCondition: searchCondition,
                                                jumup1: jumup1,
                                                jumup2: jumup2,
                                                jumup3: jumup3,

                                                yunp1: yunp1,
                                                yunp2: yunp2,
                                                yunp3: yunp3,


                                                bgjp1: bgjp1,
                                                bgjp2: bgjp2,
                                                bgjp3: bgjp3,
                                                bgjp4: bgjp4,


                                                mgjp1: mgjp1,
                                                mgjp2: mgjp2,
                                                mgjp3: mgjp3,
                                                mgjp4: mgjp4,
                                                mgjp5: mgjp5,
                                                mgjp6: mgjp6,


                                                giap1: giap1,
                                                giap2: giap2,
                                                giap3: giap3,
                                                giap4: giap4,
                                                giap5: giap5,
                                                giap6: giap6,
                                                giap7: giap7,

                                            }}><span
                                                style={{ borderRadius: '3px', padding: '3px', backgroundColor: '#333', color: '#fefefe' }}
                                            >상세내용</span></Link>
                                    </div>
                                </li>
                                <li className='chart_li'>
                                    <Chart1
                                        key={counter++}
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표건수',
                                                type: 'line',
                                                data: [parseInt(listTag5.y2021),
                                                parseInt(listTag5.y2022),
                                                parseInt(listTag5.y2023),
                                                parseInt(listTag5.y2024),
                                                parseInt(listTag5.y2025),
                                                parseInt(listTag5.y2026),
                                                parseInt(listTag5.y2027),
                                                parseInt(listTag5.y2028),
                                                parseInt(listTag5.y2029),]
                                            },
                                            {
                                                name: '달성건수',
                                                type: 'bar',
                                                data: [parseInt(listTag5.y2021r),
                                                parseInt(listTag5.y2022r),
                                                parseInt(listTag5.y2023r),
                                                parseInt(listTag5.y2024r),
                                                parseInt(listTag5.y2025r),
                                                parseInt(listTag5.y2026r),
                                                parseInt(listTag5.y2027r),
                                                parseInt(listTag5.y2028r),
                                                parseInt(listTag5.y2029r),]
                                            }

                                        ]}

                                        type="line"

                                    />



                                </li>

                                <li style={{ marginTop: '30px' }}>
                                    건식저장 인허가 관련문서 발간(건)
                                    <div style={{ width: '100%', textAlign: 'right', marginTop: '-20px' }}>
                                        <Link to={URL.INTRO_SERVICE}
                                            style={{
                                                width: '100%', textAlign: 'right', marginTop: '-30px',
                                            }}
                                            state={{
                                                nttId: '3',
                                                searchCondition: searchCondition,
                                                jumup1: jumup1,
                                                jumup2: jumup2,
                                                jumup3: jumup3,

                                                yunp1: yunp1,
                                                yunp2: yunp2,
                                                yunp3: yunp3,


                                                bgjp1: bgjp1,
                                                bgjp2: bgjp2,
                                                bgjp3: bgjp3,
                                                bgjp4: bgjp4,


                                                mgjp1: mgjp1,
                                                mgjp2: mgjp2,
                                                mgjp3: mgjp3,
                                                mgjp4: mgjp4,
                                                mgjp5: mgjp5,
                                                mgjp6: mgjp6,


                                                giap1: giap1,
                                                giap2: giap2,
                                                giap3: giap3,
                                                giap4: giap4,
                                                giap5: giap5,
                                                giap6: giap6,
                                                giap7: giap7,

                                            }}><span
                                                style={{
                                                    borderRadius: '3px', padding: '3px',
                                                    backgroundColor: '#333', color: '#fefefe'
                                                }}
                                            >상세내용</span></Link>
                                    </div>
                                </li>

                                <li className='chart_li'>

                                    <Chart1
                                        key={counter++}
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표',
                                                type: 'line',
                                                data: [parseInt(listTag1.y2021),
                                                parseInt(listTag1.y2022),
                                                parseInt(listTag1.y2023),
                                                parseInt(listTag1.y2024),
                                                parseInt(listTag1.y2025),
                                                parseInt(listTag1.y2026),
                                                parseInt(listTag1.y2027),
                                                parseInt(listTag1.y2028),
                                                parseInt(listTag1.y2029),]
                                            },
                                            {
                                                name: '달성',
                                                type: 'bar',
                                                data: [parseInt(listTag1.y2021r),
                                                parseInt(listTag1.y2022r),
                                                parseInt(listTag1.y2023r),
                                                parseInt(listTag1.y2024r),
                                                parseInt(listTag1.y2025r),
                                                parseInt(listTag1.y2026r),
                                                parseInt(listTag1.y2027r),
                                                parseInt(listTag1.y2028r),
                                                parseInt(listTag1.y2029r),]
                                            }

                                        ]}

                                        type="line"

                                    />
                                </li>
                            </ul>
                            <ul  >
                                <li>
                                    저장/처분 핵심기술 확보율
                                    <div style={{ width: '100%', textAlign: 'right', marginTop: '-20px' }}>
                                        <Link to={URL.SUPPORT_APPLY}
                                            style={{
                                                width: '100%', textAlign: 'right', marginTop: '-30px',
                                            }}
                                            state={{
                                                nttId: '4',
                                                searchCondition: searchCondition,
                                                jumup1: jumup1,
                                                jumup2: jumup2,
                                                jumup3: jumup3,

                                                yunp1: yunp1,
                                                yunp2: yunp2,
                                                yunp3: yunp3,


                                                bgjp1: bgjp1,
                                                bgjp2: bgjp2,
                                                bgjp3: bgjp3,
                                                bgjp4: bgjp4,


                                                mgjp1: mgjp1,
                                                mgjp2: mgjp2,
                                                mgjp3: mgjp3,
                                                mgjp4: mgjp4,
                                                mgjp5: mgjp5,
                                                mgjp6: mgjp6,


                                                giap1: giap1,
                                                giap2: giap2,
                                                giap3: giap3,
                                                giap4: giap4,
                                                giap5: giap5,
                                                giap6: giap6,
                                                giap7: giap7,

                                            }}><span
                                                style={{ borderRadius: '3px', padding: '3px', backgroundColor: '#333', color: '#fefefe' }}
                                            >상세내용</span></Link>
                                    </div>

                                </li>

                                <li className='chart_li'>

                                    <Chart1
                                        key={counter++}
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표',
                                                type: 'line',
                                                data: [
                                                    parseInt(listTag2.y2021),
                                                    parseInt(listTag2.y2022),
                                                    parseInt(listTag2.y2023),
                                                    parseInt(listTag2.y2024),
                                                    parseInt(listTag2.y2025),
                                                    parseInt(listTag2.y2026),
                                                    parseInt(listTag2.y2027),
                                                    parseInt(listTag2.y2028),
                                                    parseInt(listTag2.y2029),]
                                            },
                                            {
                                                name: '달성',
                                                type: 'bar',
                                                data: [
                                                    parseInt(listTag2.y2021r),
                                                    parseInt(listTag2.y2022r),
                                                    parseInt(listTag2.y2023r),
                                                    parseInt(listTag2.y2024r),
                                                    parseInt(listTag2.y2025r),
                                                    parseInt(listTag2.y2026r),
                                                    parseInt(listTag2.y2027r),
                                                    parseInt(listTag2.y2028r),
                                                    parseInt(listTag2.y2029r),]
                                            }

                                        ]}

                                        type="line"

                                    />
                                </li>
                                <li style={{ marginTop: '30px' }}>
                                    사용후핵연료 저장/처분 기술수준
                                </li>

                                <li className='chart_li'>


                                    <Chart1
                                        key={counter++}
                                        options={options3}
                                        series={[
                                            {
                                                name: '처분달성',
                                                type: 'bar',
                                                data: listTag12
                                            }
                                            ,
                                            {
                                                name: '저장달성',
                                                type: 'bar',
                                                data: listTag120
                                            }


                                            ,
                                            {
                                                name: '처분목표',
                                                type: 'line',
                                                data: listTag110
                                            }
                                            ,
                                            {
                                                name: '저장목표',
                                                type: 'line',
                                                data: listTag11
                                            }



                                        ]}

                                        type="line"

                                    />


                                </li>



                                <li style={{ marginTop: '30px' }}>
                                    종합안전성 입증 국제기구 검토 보고서 발행

                                    <div style={{ width: '100%', textAlign: 'right', marginTop: '-20px' }}>
                                        <Link to={URL.INTRO_SERVICE}
                                            style={{
                                                width: '100%', textAlign: 'right', marginTop: '-30px',
                                            }}
                                            state={{
                                                nttId: '5',
                                                searchCondition: searchCondition,
                                                jumup1: jumup1,
                                                jumup2: jumup2,
                                                jumup3: jumup3,

                                                yunp1: yunp1,
                                                yunp2: yunp2,
                                                yunp3: yunp3,


                                                bgjp1: bgjp1,
                                                bgjp2: bgjp2,
                                                bgjp3: bgjp3,
                                                bgjp4: bgjp4,


                                                mgjp1: mgjp1,
                                                mgjp2: mgjp2,
                                                mgjp3: mgjp3,
                                                mgjp4: mgjp4,
                                                mgjp5: mgjp5,
                                                mgjp6: mgjp6,


                                                giap1: giap1,
                                                giap2: giap2,
                                                giap3: giap3,
                                                giap4: giap4,
                                                giap5: giap5,
                                                giap6: giap6,
                                                giap7: giap7,

                                            }}><span
                                                style={{ borderRadius: '3px', padding: '3px', backgroundColor: '#333', color: '#fefefe' }}
                                            >상세내용</span></Link>
                                    </div>
                                </li>

                                <li className='chart_li'>

                                    <Chart1
                                        key={counter++}
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표',
                                                type: 'line',
                                                data: [
                                                    parseInt(listTag10.y2021),
                                                    parseInt(listTag10.y2022),
                                                    parseInt(listTag10.y2023),
                                                    parseInt(listTag10.y2024),
                                                    parseInt(listTag10.y2025),
                                                    parseInt(listTag10.y2026),
                                                    parseInt(listTag10.y2027),
                                                    parseInt(listTag10.y2028),
                                                    parseInt(listTag10.y2029),
                                                ]
                                            },
                                            {
                                                name: '달성',
                                                type: 'bar',
                                                data: [
                                                    parseInt(listTag10.y2021r),
                                                    parseInt(listTag10.y2022r),
                                                    parseInt(listTag10.y2023r),
                                                    parseInt(listTag10.y2024r),
                                                    parseInt(listTag10.y2025r),
                                                    parseInt(listTag10.y2026r),
                                                    parseInt(listTag10.y2027r),
                                                    parseInt(listTag10.y2028r),
                                                    parseInt(listTag10.y2029r),
                                                ]
                                            }

                                        ]}

                                        type="line"

                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EgovIntroWork;