import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as EgovNet from 'api/egovFetch';
import { Link } from 'react-router-dom';
import Chart1 from "react-apexcharts";
import Chart2 from "react-apexcharts";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieChart } from 'react-minimal-pie-chart';
import Modal from 'react-modal';
import Loading from '../../../utils/loading';
import CODE from 'constants/code';
import { options1 } from 'config';

function EgovDownloadList(props) {
    const sessionUser = sessionStorage.getItem('loginUser');
    const sessionUserId = JSON.parse(sessionUser)?.id;
    const sessionUserSe = JSON.parse(sessionUser)?.userSe;
    let counter = 1;
    const [loading, setLoading] = useState(true);
    function createMarkup(_val) {
        return { __html: _val };
    }

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


    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [tmpMessage1, setTmpMessage1] = React.useState(false);


    function afterOpenModal() {

        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'none';
        }
    };


    const [idno, setIdno] = useState('');
    const [smoss, setSmoss] = useState('');
    const [dalsunsebumok, setDalsunsebumok] = useState('');

    const openModal = e => {
        setIsOpen(true);
        const { id } = JSON.parse(e.target.dataset.onclickparam);
        const { no } = JSON.parse(e.target.dataset.onclickparam);
        const { smoss } = JSON.parse(e.target.dataset.onclickparam);
        const { dalsunsebumok } = JSON.parse(e.target.dataset.onclickparam);

        let elms = document.getElementsByClassName("charttb_");
        setTmpMessage1(elms[id].innerHTML);

        setIdno(no);
        setSmoss(smoss);
        setDalsunsebumok(dalsunsebumok);


    };



    function closeModal() {
        setIsOpen(false);
        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'block';
        }
    };


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

    const aRef = useRef();
    const bRef = useRef();


    const [searchCondition, setSearchCondition] =
        useState({
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


            y2021p1: '2021',
            y2022p1: '2022',
            y2023p1: '2023',
            y2024p1: '2024',
            y2025p1: '2025',
            y2026p1: '2026',
            y2027p1: '2027',
            y2028p1: '2028',
            y2029p1: '2029',

            gjipy: "", sjipy: "", memo: "", kind: "", scr: ""
        });


    const [listTag, setListTag] = useState([]);
    const [listTag2, setListTag2] = useState([]);

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
                let mutListTag2 = [];

                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) {
                        mutListTag = [];
                        mutListTag2 = [];

                    }

                    mutListTag.push(
                        <><tr key={counter++} >
                            <td key={counter++} className='rightTT'
                                style={{
                                    borderLeft: '1px solid #ccc', height: '30px',
                                    width: '10%', textAlign: 'center', padding: '5px'
                                }}>
                                <input key={counter++} type="radio" name="rdosn"
                                    onClick={openModal}

                                    data-onclickparam={JSON.stringify({
                                        id: index,
                                        no: item.no,
                                        smoss: item.smoss,
                                        dalsunsebumok: item.dalsunsebumok

                                    })}
                                />
                            </td>

                            <td key={counter++} className='leftTT'
                                onDoubleClick={openModal}
                                onClick={openModal}
                                data-onclickparam={JSON.stringify({
                                    id: index, no: item.no,
                                    smoss: item.smoss,
                                    dalsunsebumok: item.dalsunsebumok

                                })}

                                style={{
                                    cursor: 'pointer',
                                    width: '45%', textAlign: 'center', padding: '5px'
                                }}>
                                {item.smokp}</td>


                            <td key={counter++} className='rightTT'
                                style={{ width: '10%', textAlign: 'center', padding: '5px' }}>{item.dyyyy}</td>
                            <td key={counter++} className='rightTT'
                                style={{ width: '10%', textAlign: 'center', padding: '5px' }}>{item.jumu}</td>
                            <td key={counter++} className='rightTT'
                                style={{ width: '25%', textAlign: 'center', padding: '5px' }}>{item.giga}</td>

                        </tr>
                        </>

                    );

                    mutListTag2.push(

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
                    <tr className="no_data" key="0"><td colSpan="5"
                        style={{ textAlign: 'center', height: '30px' }}
                    >검색된 결과가 없습니다.</td></tr>
                );
                setListTag(mutListTag);
                setListTag2(mutListTag2);
                setLoading(false);
            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );

    }, [counter]);

    useEffect(() => {
        retrieveList(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [listTag5, setListTag5] = useState([]);
    const [listTag6, setListTag6] = useState([]);

    const [listTag7, setListTag7] = useState([]);
    const [listTag8, setListTag8] = useState([]);

    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);

    const [data3text, setData3text] = useState([]);

    const retrieveList4 = useCallback((searchCondition) => {


        const retrieveListURL = '/uat/uia/selTotal42.do';
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

                setListTag6(resp.result.resultList[0]);

            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList4(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const retrieveList2 = useCallback((searchCondition) => {


        const retrieveListURL = '/uat/uia/selTotal4.do';
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

                setListTag5(resp.result.resultList[0]);


            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList2(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const retrieveList5 = useCallback((searchCondition) => {


        const retrieveListURL = '/uat/uia/selTotal4rate.do';
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
                    setListTag7([0, 0, 0, 0, 0, 0, 0, 0]);
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


        const retrieveListURL = '/uat/uia/selTotal42rate.do';
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
                    setListTag8(resp.result.resultList[0]);
                } else {
                    setListTag8([0, 0, 0, 0, 0, 0, 0, 0]);
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


    const retrieveList3 = useCallback((searchCondition) => {


        const retrieveListURL = '/uat/uia/selTotal5.do';
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



                // eslint-disable-next-line react-hooks/exhaustive-deps
                setData4([
                    { 'title': 'DB구축및모델개발', 'value': parseInt(resp.result.resultList[0].s1cnt), 'color': '#9dc3e7' },
                    { 'title': '규제요소', 'value': parseInt(resp.result.resultList[0].s3cnt), 'color': '#fed966' },
                    { 'title': '종합안전성입증', 'value': parseInt(resp.result.resultList[0].s4cnt), 'color': '#f4b184' },
                    { 'title': '각종보고서및절차서', 'value': parseInt(resp.result.resultList[0].s2cnt), 'color': '#a8d18d' }
                ]);

                // eslint-disable-next-line react-hooks/exhaustive-deps
                setData3([
                    { title: 'DB구축및모델개발', value: parseInt(resp.result.resultList[0].s5cnt), color: '#9dc3e7' },
                    { title: '규제요소', value: parseInt(resp.result.resultList[0].s7cnt), color: '#fed966' },
                    { title: '종합안전성입증', value: parseInt(resp.result.resultList[0].s8cnt), color: '#f4b184' },
                    { title: '각종보고서및절차서', value: parseInt(resp.result.resultList[0].s6cnt), color: '#a8d18d' }
                ]);

                setData3text(resp.result.resultList[0]);




            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }, []);

    useEffect(() => {
        retrieveList3(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const updateEx1 = e => {

        const editURL = "/uat/esm/updateEx1.do";
        const jToken = localStorage.getItem('jToken');
        let requestOptions = {};

        const formData = new FormData();
        formData.append("smoss", aRef.current.value);
        formData.append("dalsunsebumok", bRef.current.value);
        formData.append("idno", idno);

        //console.log(idno);
        //console.log(aRef.current.value);
        //console.log(bRef.current.value);

        requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': jToken
            },
            body: JSON.stringify({
                "smoss": aRef.current.value,
                "dalsunsebumok": bRef.current.value,
                "idno": idno

            })
        }
        EgovNet.requestFetch(editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("수정하였습니다.전체페이지를 새로고침 하세요.");

                }
            }
        );

    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            {loading ? <Loading /> : null}
            <div className="c_wrap">

                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li>사업현황</li>
                    </ul>
                </div>


                <div className="layout">
                    <div className="contents PDS_LIST" id="contents">
                        <h1 className="tit_3"><FontAwesomeIcon icon={faList} />&nbsp;총 사업현황</h1>

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
                                            retrieveList3({
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

                                            setSearchCondition(searchCondition);
                                        }}
                                    >검색</button>&nbsp;
                                    <button
                                        style={{ display: 'none' }}
                                        type="button"
                                        className="btn_gray"
                                        onClick={() => {



                                            window.location.href = '/support/donwload'
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
                                            retrieveList3({
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

                                        }}
                                    >초기화</button>

                                </td>
                            </tr>
                        </table>

                        <div className="recent" >
                            <ul>
                                <li className='lftTitle'>성과 목록</li>
                                <li style={{ marginTop: '-10px' }}>
                                    <table className='board_list'>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f1f1f1' }}>
                                                <th style={{
                                                    borderLeft: '1px solid #ccc',
                                                    height: '30px', width: '10%',
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
                                    <table className='scrolltbody' >

                                        <tbody style={{ borderBottom: '1px solid #ccc' }}>
                                            {listTag}
                                        </tbody>
                                    </table>

                                </li>
                                {listTag2}
                            </ul>

                            <ul>
                                <li className='lftTitle'>달성 현황</li>

                                <li style={{ marginTop: '5px' }}>연차별 성과율</li>
                                <li style={{
                                    textAlign: 'center', width: '100%',
                                    border: '1px solid #ddd', marginTop: '0px', height: '440px'
                                }}>


                                    <Chart1
                                        options={options1}
                                        series={[
                                            {
                                                name: '목표달성율',
                                                type: 'line',
                                                data: [
                                                    parseInt(listTag8.y2021r),
                                                    parseInt(listTag8.y2022r),
                                                    parseInt(listTag8.y2023r),
                                                    parseInt(listTag8.y2024r),
                                                    parseInt(listTag8.y2025r),
                                                    parseInt(listTag8.y2026r),
                                                    parseInt(listTag8.y2027r),
                                                    parseInt(listTag8.y2028r),
                                                    parseInt(listTag8.y2029r)


                                                ]
                                            },
                                            {
                                                name: '실달성율',
                                                type: 'column',
                                                data: [
                                                    parseInt(listTag7.y2021r),
                                                    parseInt(listTag7.y2022r),
                                                    parseInt(listTag7.y2023r),
                                                    parseInt(listTag7.y2024r),
                                                    parseInt(listTag7.y2025r),
                                                    parseInt(listTag7.y2026r),
                                                    parseInt(listTag7.y2027r),
                                                    parseInt(listTag7.y2028r),
                                                    parseInt(listTag7.y2029r)


                                                ]
                                            }

                                        ]}

                                        type="line"

                                    />
                                </li>


                                <li style={{ marginTop: '10px' }}>연차별 성과 달성 건수</li>
                                <li style={{
                                    textAlign: 'center', width: '100%',
                                    border: '1px solid #ddd', height: '440px'
                                }}>

                                    <Chart2
                                        options={options1}
                                        series={[

                                            {
                                                name: '목표달성 건수',
                                                type: 'line',
                                                data: [
                                                    parseInt(listTag6.y2021),
                                                    parseInt(listTag6.y2022),
                                                    parseInt(listTag6.y2023),
                                                    parseInt(listTag6.y2024),
                                                    parseInt(listTag6.y2025),
                                                    parseInt(listTag6.y2026),
                                                    parseInt(listTag6.y2027),
                                                    parseInt(listTag6.y2028),
                                                    parseInt(listTag6.y2029)


                                                ]
                                            },
                                            {
                                                name: '실달성 건수',
                                                type: 'column',
                                                data: [
                                                    parseInt(listTag5.y2021),
                                                    parseInt(listTag5.y2022),
                                                    parseInt(listTag5.y2023),
                                                    parseInt(listTag5.y2024),
                                                    parseInt(listTag5.y2025),
                                                    parseInt(listTag5.y2026),
                                                    parseInt(listTag5.y2027),
                                                    parseInt(listTag5.y2028),
                                                    parseInt(listTag5.y2029)


                                                ]
                                            },

                                        ]}
                                        type="line"

                                    />
                                </li>

                                <li style={{ marginTop: '10px' }}>성과 유형별 달성 건수</li>


                                <li style={{
                                    textAlign: 'center', width: '100%',
                                    border: '1px solid #ddd', height: '460px'
                                }}>


                                    <ul style={{ float: 'left', width: '100%', }}>

                                        <li style={{
                                            float: 'left', width: '37%', padding: '20px',
                                            textAlign: 'center', fontSize: '14px'
                                        }}>



                                            <div style={{ paddingBottom: '10px', fontSize: '15px' }}>목표</div>

                                            <PieChart
                                                data={data3}
                                                label={({ dataEntry }) => dataEntry.value}
                                                labelStyle={{
                                                    fontWeight: 500,
                                                    fontSize: '10px',
                                                    fill: 'white'
                                                }}
                                            />
                                            <div>&nbsp;</div>
                                            <p style={{ color: '#000' }}>DB구축및모델개발: {data3text.s5cnt}건</p>
                                            <p style={{ color: '#000' }}>규제요소: {data3text.s7cnt}건</p>
                                            <p style={{ color: '#000' }}>종합안전성입증: {data3text.s8cnt}건</p>
                                            <p style={{ color: '#000' }}>각종보고서및절차서: {data3text.s6cnt}건</p>
                                        </li>

                                        <li style={{ float: 'left', width: '17%', padding: '20px', textAlign: 'center', fontSize: '14px' }}>&nbsp;</li>
                                        <li style={{ float: 'left', width: '46%', padding: '20px', textAlign: 'center', fontSize: '14px' }}>
                                            <div style={{ paddingBottom: '10px', fontSize: '15px' }}>달성</div>


                                            <PieChart
                                                data={data4}
                                                label={({ dataEntry }) => dataEntry.value}

                                                labelStyle={{
                                                    fontWeight: 500,
                                                    fontSize: '11px',
                                                    fill: 'white'

                                                }}
                                            />
                                            <div>&nbsp;</div>
                                            <p style={{ color: '#000' }}>DB구축및모델개발: {data3text.s1cnt}건</p>
                                            <p style={{ color: '#000' }}>규제요소: {data3text.s3cnt}건</p>
                                            <p style={{ color: '#000' }}>종합안전성입증: {data3text.s4cnt}건</p>
                                            <p style={{ color: '#000' }}>각종보고서및절차서: {data3text.s2cnt}건</p>


                                        </li>


                                    </ul>
                                </li>

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
                                <div style={{ paddingTop: '50px', width: '100%', textAlign: 'right' }}>

                                    {sessionUserSe === 'USR' &&
                                        sessionUserId === 'admin' &&
                                        <><div style={{
                                            border: '1px solid #555',
                                            width: '100%', textAlign: 'left',
                                            padding: '15px', marginTop: '-20px'
                                        }}>

                                            &nbsp;
                                            달성여부:&nbsp;<input type="text" name="smoss"
                                                style={{ width: '30px', padding: '5px' }}
                                                defaultValue={smoss}
                                                ref={aRef}
                                                key={counter++}
                                                onChange={e => {
                                                    console.log(" e.target.value " + e.target.value);
                                                    aRef.current.value = e.target.value;

                                                }} />&nbsp;&nbsp;

                                            세부달성여부:&nbsp;<input type="text" name="dalsunsebumok"
                                                style={{ width: '30px', padding: '5px' }}
                                                defaultValue={dalsunsebumok}
                                                ref={bRef}
                                                key={counter++}
                                                onChange={e => {
                                                    console.log(" e.target.value " + e.target.value);
                                                    bRef.current.value = e.target.value;
                                                }} />&nbsp;&nbsp;

                                            <button className="btn btn_dark"
                                                key={counter++}
                                                style={{ width: '100px' }}
                                                onClick={() => updateEx1()}>변경내역저장</button>

                                        </div></>



                                    }


                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div >
        </div >
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
export default EgovDownloadList;