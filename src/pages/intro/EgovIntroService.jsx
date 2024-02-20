import React, { useState, useEffect, useCallback } from 'react';
import * as EgovNet from 'api/egovFetch';
import { Link, useLocation } from 'react-router-dom';
import Chart1 from "react-apexcharts";

import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from 'react-modal';
import Loading from '../../utils/loading';
import { options1 } from 'config';

function EgovIntroService() {

    const location = useLocation();
    const nttId = location.state.nttId;
    

    const sjumup1 = location.state.jumup1;
    const sjumup2 = location.state.jumup2;
    const sjumup3 = location.state.jumup3;

    const syunp1 = location.state.yunp1;
    const syunp2 = location.state.yunp2;
    const syunp3 = location.state.yunp3;


    const sbgjp1 = location.state.bgjp1;
    const sbgjp2 = location.state.bgjp2;
    const sbgjp3 = location.state.bgjp3;
    const sbgjp4 = location.state.bgjp4;


    const smgjp1 = location.state.mgjp1;
    const smgjp2 = location.state.mgjp2;
    const smgjp3 = location.state.mgjp3;
    const smgjp4 = location.state.mgjp4;
    const smgjp5 = location.state.mgjp5;
    const smgjp6 = location.state.mgjp6;


    const sgiap1 = location.state.giap1;
    const sgiap2 = location.state.giap2;
    const sgiap3 = location.state.giap3;
    const sgiap4 = location.state.giap4;
    const sgiap5 = location.state.giap5;
    const sgiap6 = location.state.giap6;
    const sgiap7 = location.state.giap7;

    const [jumup1, setJumup1] = useState(sjumup1);
    const [jumup2, setJumup2] = useState(sjumup2);
    const [jumup3, setJumup3] = useState(sjumup3);

    const [yunp1, setYunp1] = useState(syunp1);
    const [yunp2, setYunp2] = useState(syunp2);
    const [yunp3, setYunp3] = useState(syunp3);


    const [bgjp1, setBgjp1] = useState(sbgjp1);
    const [bgjp2, setBgjp2] = useState(sbgjp2);
    const [bgjp3, setBgjp3] = useState(sbgjp3);
    const [bgjp4, setBgjp4] = useState(sbgjp4);


    const [mgjp1, setMgjp1] = useState(smgjp1);
    const [mgjp2, setMgjp2] = useState(smgjp2);
    const [mgjp3, setMgjp3] = useState(smgjp3);
    const [mgjp4, setMgjp4] = useState(smgjp4);
    const [mgjp5, setMgjp5] = useState(smgjp5);
    const [mgjp6, setMgjp6] = useState(smgjp6);

    const [giap1, setGiap1] = useState(sgiap1);
    const [giap2, setGiap2] = useState(sgiap2);
    const [giap3, setGiap3] = useState(sgiap3);
    const [giap4, setGiap4] = useState(sgiap4);
    const [giap5, setGiap5] = useState(sgiap5);
    const [giap6, setGiap6] = useState(sgiap6);
    const [giap7, setGiap7] = useState(sgiap7);


    function initText() {
        window.location.reload();
    }



    let gjipy = "";
    let sjipy = "";
    let memo = "";
    let kind = "";
    let scr = "";

    if (nttId === "1") { gjipy = "실증/검사시스템"; }
    if (nttId === "2") { sjipy = "규제요소 개발"; }
    if (nttId === "3") { memo = "인허가"; }
    if (nttId === "4") { kind = "핵심기술"; }
    if (nttId === "5") { scr = "SCR 보조보고서"; }

    const [searchCondition, setSearchCondition]
        = useState(
        {
            
            searchCnd: sjumup1,
            searchCnd1: sjumup2,
            searchCnd2: sjumup3,

            searchWrd: syunp1,
            searchWrd1: syunp2,
            searchWrd2: syunp3,

            searchBgj: sbgjp1,
            searchBgj1: sbgjp2,
            searchBgj2: sbgjp3,
            searchBgj3: sbgjp4,

            searchMgj: smgjp1,
            searchMgj1: smgjp2,
            searchMgj2: smgjp3,
            searchMgj3: smgjp4,
            searchMgj4: smgjp5,
            searchMgj5: smgjp6,

            searchGia: sgiap1,
            searchGia1: sgiap2,
            searchGia2: sgiap3,
            searchGia3: sgiap4,
            searchGia4: sgiap5,
            searchGia5: sgiap6,
            searchGia6: sgiap7,
            

            searchGnm: '',


            gjipy: gjipy,
            sjipy: sjipy,
            memo: memo,
            kind: kind,
            scr: scr,

            
        });

        


    let counter = 1;
    const [loading, setLoading] = useState(true);

    function createMarkup(_val) {
        return { __html: _val };
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [tmpMessage1, setTmpMessage1] = React.useState(false);


    function afterOpenModal() {

        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'none';
        }
    };

    const openModal = e => {
        setIsOpen(true);
        const { id } = JSON.parse(e.target.dataset.onclickparam);
        const { tid } = JSON.parse(e.target.dataset.onclickparam);
        let elms = document.getElementsByClassName("charttb_");
        setTmpMessage1(elms[id].innerHTML);
        console.log(tid);
    };

    function closeModal() {
        setIsOpen(false);
        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'block';
        }
    };

    const [listTag, setListTag] = useState([]);
    const [listTag22, setListTag22] = useState([]);
    const retrieveList = useCallback((searchCondition) => {
        setLoading(true);
        const retrieveListURL = '/uat/uia/selTotal222.do';
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
                let mutListTag = [];
                let mutListTag22 = [];

                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) {
                        mutListTag = [];
                        mutListTag22 = [];

                    }
                    mutListTag.push(

                        <><tr key={counter++} >
                            <td key={counter++} className='rightTT'
                                style={{ borderLeft: '1px solid #ccc', height: '30px', width: '10%', textAlign: 'center', padding: '5px' }}>
                                <input key={counter++} type="radio" name="rdosn"
                                    onClick={openModal}

                                    data-onclickparam={JSON.stringify({ id: index })}
                                />
                            </td>

                            <td key={counter++} className='leftTT'
                                onDoubleClick={openModal}
                                onClick={openModal}
                                data-onclickparam={JSON.stringify({ id: index, tid: counter })}

                                style={{ cursor: 'pointer', width: '45%', textAlign: 'center', padding: '5px' }}>{item.smokp}</td>


                            <td key={counter++} className='rightTT'
                                style={{ width: '10%', textAlign: 'center', padding: '5px' }}>{item.dyyyy}</td>
                            <td key={counter++} className='rightTT'
                                style={{ width: '10%', textAlign: 'center', padding: '5px' }}>{item.jumu}</td>
                            <td key={counter++} className='rightTT'
                                style={{ width: '25%', textAlign: 'center', padding: '5px' }}>{item.giga}</td>
                        </tr>
                        </>

                    );

                    mutListTag22.push(

                        <>
                            <li className='charttb_' style={{ backgroundColor: '#E6E6E6', fontSize: '15px' }}>

                                <div style={{
                                    borderRadius: '3px',
                                    backgroundColor: '#0431B4',
                                    color: '#fff',
                                    textAlign: 'center', fontWeight: '600',
                                    height: '35px', padding: '6px 0px 14px 0px', marginBottom: '10px'
                                }}
                                >성과 세부정보</div>

                                <div key={counter++}>
                                    <table className='board_list' style={{ border: '1px solid #585858' }}>

                                        <thead>
                                            <tr>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>주무부처</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.jumu}</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>연구분야</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.yun}</td>
                                            </tr>

                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>(대) 과제분류</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.bgj}</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>(중) 과제분류</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.mgj}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>(소) 과제분류</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>
                                                    {item.gjipy}
                                                </td>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>달성목표연도</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>
                                                    {item.dyyyy}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>기관명</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.giga}</td>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>달성연도</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.nyyyy}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>사업성과지표</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.sjipy}</td>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>과제성과지표</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.gjipy}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>특이사항</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.memo}</td>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>SCR관련여부</td>
                                                <td key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.scr}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>과제명</td>
                                                <td colSpan='3' key={counter++} className='leftTT2'
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                >{item.gname}</td>

                                            </tr>



                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>목표성과명</td>
                                                <td colSpan='3' key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.mokp}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>세부목표성과명</td>
                                                <td colSpan='3' key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>{item.smokp}</td>
                                            </tr>

                                            <tr>
                                                <td
                                                    style={{ border: '1px solid #585858', backgroundColor: '#E6E6E6', color: '#000' }}
                                                    className='rightTT2'>달성성과명(링크)</td>
                                                <td colSpan='3' key={counter++}
                                                    style={{ border: '1px solid #585858', backgroundColor: '#fff', color: '#000' }}
                                                    className='leftTT2'>

                                                    <p><a href={item.link.split('|')[0]} target='_new'>{item.dalsungnm.split('|')[0]}</a></p>
                                                    <p><a href={item.link.split('|')[1]} target='_new'>{item.dalsungnm.split('|')[1]}</a></p>
                                                    <p><a href={item.link.split('|')[2]} target='_new'>{item.dalsungnm.split('|')[2]}</a></p>
                                                    <p><a href={item.link.split('|')[3]} target='_new'>{item.dalsungnm.split('|')[3]}</a></p>
                                                    <p><a href={item.link.split('|')[4]} target='_new'>{item.dalsungnm.split('|')[4]}</a></p>
                                                    <p><a href={item.link.split('|')[5]} target='_new'>{item.dalsungnm.split('|')[5]}</a></p>
                                                    <p><a href={item.link.split('|')[6]} target='_new'>{item.dalsungnm.split('|')[6]}</a></p>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </>
                    );
                });

                if (!mutListTag.length) mutListTag.push(
                    <tr className="no_data" key="0"><td colSpan="5">검색된 결과가 없습니다.</td></tr>
                );

                setListTag(mutListTag);
                setListTag22(mutListTag22);
                setLoading(false);

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );

    }, []);

    useEffect(() => {
        retrieveList(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [listTag5, setListTag5] = useState([]);
    const [listTag2, setListTag2] = useState([]);
    const [listTag6, setListTag6] = useState([]);
    const [listTag7, setListTag7] = useState([]);
    const [listTag15, setListTag15] = useState([]);
    const [listTag10, setListTag10] = useState([]);

    const retrieveList10 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selReport.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        if (nttId === "5") {
            EgovNet.requestFetch(retrieveListURL,
                requestOptions,
                (resp) => {

                    if (
                        resp.result.resultList[0] !== null &&
                        resp.result.resultList[0].y2021 !== '') {
                        setListTag10(resp.result.resultList[0]);
                    } else {
                        setListTag10([0, 0, 0, 0, 0, 0, 0, 0, 0,]);
                    }

                },
                function (resp) {
                    console.log("err response : ", resp);
                }

            );
        }
    }, []);

    useEffect(() => {
        retrieveList10(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveList15 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selTotal3.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        if (nttId === "3") {
            EgovNet.requestFetch(retrieveListURL,
                requestOptions,
                (resp) => {

                    if (
                        resp.result.resultList[0] !== null &&
                        resp.result.resultList[0].y2021 !== '') {
                        setListTag15(resp.result.resultList[0]);
                    } else {
                        setListTag15([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                    }

                },
                function (resp) {
                    console.log("err response : ", resp);
                }

            );
        }
    }, []);

    useEffect(() => {
        retrieveList15(searchCondition);

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
        if (nttId === "2") {
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
        }
    }, []);

    useEffect(() => {
        retrieveList4(searchCondition);

    }, []);


    const retrieveList2 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selHak01.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }
        if (nttId === "4") {
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
        }
    }, []);

    useEffect(() => {
        retrieveList2(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        if (nttId === "1") {
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
        }
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

        if (nttId === "1") {
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
        }

    }, []);

    useEffect(() => {
        retrieveList6(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    return (
        <div className="container">
            {loading ? <Loading /> : null}
            <div className="c_wrap">

                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li>지표별 성과목록</li>
                    </ul>
                </div>


                <div className="layout">
                    <div className="contents PDS_LIST" id="contents">
                        <h1 className="tit_3"><FontAwesomeIcon icon={faList} />&nbsp;지표별 성과목록</h1>


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
                                                    checked={sjumup1 !== '' ? true : false}
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
                                                    checked={sjumup2 !== '' ? true : false}
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
                                                    checked={sjumup3 !== '' ? true : false}
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
                                                    checked={syunp1 !== '' ? true : false}
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
                                                    checked={syunp2 !== '' ? true : false}
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
                                                    checked={syunp3 !== '' ? true : false}
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
                                                checked={sbgjp1 !== '' ? true : false}
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
                                                checked={sbgjp2 !== '' ? true : false}
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
                                                checked={sbgjp3 !== '' ? true : false}
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
                                                checked={sbgjp4 !== '' ? true : false}
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
                                                        checked={smgjp1 !== '' ? true : false}
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
                                                        checked={smgjp2 !== '' ? true : false}
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
                                                        checked={smgjp3 !== '' ? true : false}
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
                                                        checked={smgjp4 !== '' ? true : false}
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
                                                        checked={smgjp5 !== '' ? true : false}
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
                                                        checked={smgjp6 !== '' ? true : false}
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
                                                        checked={sgiap1 !== '' ? true : false}
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
                                                        checked={sgiap2 !== '' ? true : false}
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
                                                        checked={sgiap3 !== '' ? true : false}
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
                                                        checked={sgiap4 !== '' ? true : false}
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
                                                        checked={sgiap5 !== '' ? true : false}
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
                                                        checked={sgiap6 !== '' ? true : false}
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
                                                        checked={sgiap7 !== '' ? true : false}
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

                            <tr style={{display:'none'}}>
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


                                            //setSearchCondition(searchCondition);


                                        }}
                                    >검색</button>&nbsp;
                                    <button type="button"
                                        className="btn_gray"
                                        onClick={() => {
                                            initText();

                                        }}
                                    >초기화</button>
                                </td>
                            </tr>
                        </table>




                        <div className="recent" >
                            <ul>
                                {nttId === '1' &&
                                    <li style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '-2px'
                                    }}>실증-검사시스템 구축율


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
                                    </li>}


                                {nttId === '2' &&
                                    <li style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '-2px'
                                    }}>규제요소 개발(건)



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
                                                    parseInt(listTag5.y2029)]
                                                }, {
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
                                                    parseInt(listTag5.y2029r)]
                                                }

                                            ]}

                                            type="line"

                                        />
                                    </li>}



                                {nttId === '3' &&
                                    <li style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '-2px'
                                    }}>건식저장 인허가 관련문서 발간(건)

                                        <Chart1
                                            key={counter++}
                                            options={options1}
                                            series={[
                                                {
                                                    name: '목표',
                                                    type: 'line',
                                                    data: [parseInt(listTag15.y2021),
                                                    parseInt(listTag15.y2022),
                                                    parseInt(listTag15.y2023),
                                                    parseInt(listTag15.y2024),
                                                    parseInt(listTag15.y2025),
                                                    parseInt(listTag15.y2026),
                                                    parseInt(listTag15.y2027),
                                                    parseInt(listTag15.y2028),
                                                    parseInt(listTag15.y2029),]
                                                },
                                                {
                                                    name: '달성',
                                                    type: 'bar',
                                                    data: [parseInt(listTag15.y2021r),
                                                    parseInt(listTag15.y2022r),
                                                    parseInt(listTag15.y2023r),
                                                    parseInt(listTag15.y2024r),
                                                    parseInt(listTag15.y2025r),
                                                    parseInt(listTag15.y2026r),
                                                    parseInt(listTag15.y2027r),
                                                    parseInt(listTag15.y2028r),
                                                    parseInt(listTag15.y2029r),]
                                                }

                                            ]}

                                            type="line"

                                        /></li>}

                                {nttId === '4' &&
                                    <li style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '-2px'
                                    }}>저장/처분 핵심기술 확보율

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

                                    </li>}

                                {nttId === '5' &&
                                    <li style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '-2px'
                                    }}>종합안전성 입증 국제기구 검토 보고서 발행

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
                                                    type: 'column',
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

                                        /></li>}

                                <li
                                    style={{
                                        textAlign: 'center', width: '100%',
                                        border: '1px solid #ddd', marginTop: '20px'
                                    }}
                                >
                                    {nttId === '1' &&
                                        <img src="/assets/images/info_1.png"
                                            alt="" style={{ width: '100%' }} />}
                                    {nttId === '2' &&
                                        <img src="/assets/images/info_2.png"
                                            alt="" style={{ width: '100%' }} />}
                                    {nttId === '3' &&
                                        <img src="/assets/images/info_3.png"
                                            alt="" style={{ width: '100%' }} />}
                                    {nttId === '4' &&
                                        <img src="/assets/images/info_4.png"
                                            alt="" style={{ width: '100%' }} />}
                                    {nttId === '5' &&
                                        <img src="/assets/images/info_5.png"
                                            alt="" style={{ width: '100%' }} />}


                                </li>


                            </ul>
                            <ul>
                                <li className='lftTitle'>성과 목록</li>
                                <li style={{ marginTop: '-10px' }}>
                                    <table className='board_list'>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f1f1f1' }}>
                                                <th style={{
                                                    borderLeft: '1px solid #ccc', height: '30px', width: '10%',
                                                    textAlign: 'center', padding: '5px'
                                                }}>선택</th>
                                                <th style={{ width: '45%', textAlign: 'center', padding: '5px' }}>성과 명</th>
                                                <th style={{ width: '10%', textAlign: 'center', padding: '5px' }}>달성연도</th>
                                                <th style={{ width: '10%', textAlign: 'center', padding: '5px' }}>부처</th>
                                                <th style={{ width: '25%', textAlign: 'center', padding: '5px' }}>기관</th>
                                                <th style={{ width: '2%' }}>&nbsp;</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <table className='scrolltbody1' >

                                        <tbody style={{
                                            borderBottom: '1px solid #ccc',
                                            borderLeft: '1px solid #ccc',
                                            borderRight: '1px solid #ccc'
                                        }}>
                                            {listTag}
                                        </tbody>
                                    </table>

                                </li>
                                {listTag22}
                            </ul>
                        </div>
                        <div>
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                ariaHideApp={false}>
                                <div style={{ width: '100%', textAlign: 'right', paddingBottom: '8px', marginTop: '-8px' }}>
                                    <span style={{ cursor: 'pointer' }} onClick={closeModal}>X</span>
                                </div>
                                <div dangerouslySetInnerHTML={createMarkup(tmpMessage1)} />

                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const customStyles = {
    overlay: {
        zIndex: '998',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        zIndex: '999',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '800px',
        height: '700px',
        transform: 'translate(-50%, -50%)',
        overflowX: 'hidden',

        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto'
    },
};
export default EgovIntroService;