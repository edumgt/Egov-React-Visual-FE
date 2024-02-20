import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import Modal from 'react-modal';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from '../../../utils/loading';

function EgovQnaList(props) {



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

        let elms = document.getElementsByClassName("charttb_");
        setTmpMessage1(elms[id].innerHTML);
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

    const smossRef = useRef();
    const dalsunsebumokRef = useRef();


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

            gjipy: '',
            sjipy: '',
            memo: '',
            kind: '',
            scr: ''
        });





    const handleClick = e => {
        const { id } = JSON.parse(e.target.dataset.onclickparam);
        let elms = document.getElementsByClassName("charttb_");
        for (var i = 0; i < elms.length; i++) {
            elms[i].style.display = 'none';
        }
        elms[id].style.display = 'block';

        let infoR = document.getElementById("infoR");
        infoR.style.display = 'none';
    };


    const [listTag, setListTag] = useState([]);
    const [listTag2, setListTag2] = useState([]);


    const [listTag3, setListTag3] = useState([]);


    const retrieveList = useCallback((searchCondition) => {
        setLoading(true);
        const retrieveListURL = '/uat/uia/selTotal2.do';
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
                                style={{ borderLeft: '1px solid #ccc', height: '30px', width: '10%', textAlign: 'center', padding: '5px' }}>
                                <input type="radio" name="rdosn"
                                    onClick={openModal} data-onclickparam={JSON.stringify({ id: index })}
                                />
                            </td>

                            <td key={counter++} className='leftTT'
                                style={{ cursor: 'pointer', width: '45%', textAlign: 'center', padding: '5px' }}
                                onDoubleClick={openModal}
                                onClick={openModal}
                                data-onclickparam={JSON.stringify({ id: index, tid: counter })}

                            >{item.smokp}</td>
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
                    <tr className="no_data" key="0"><td colSpan="5">검색된 결과가 없습니다.</td></tr>
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

    const retrieveList3 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selRightJP.do';

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

                let mutListTag3 = [];

                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) {

                        mutListTag3 = [];

                    }


                    mutListTag3.push(

                        <>
                            <tr>
                                <td>{item.gjipy}</td>

                                <td style={{ textAlign: 'center' }}>{item.totalr}%&nbsp;&nbsp;<span style={{ color: '#dd3333' }}>{item.totalr2}%</span><br></br>

                                    <progress className='prbar2' value={item.totalr} max="100"></progress>
                                </td>


                            </tr>
                        </>


                    );




                });

                if (!mutListTag3.length) mutListTag3.push(
                    <tr className="no_data" key="0"><td colSpan="5">검색된 결과가 없습니다.</td></tr>
                );
                setListTag3(mutListTag3);
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



    return (
        <div className="container">
            {loading ? <Loading /> : null}
            <div className="c_wrap">
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li>연구과제 지표별 현황</li>
                    </ul>
                </div>
                <div className="layout">
                    <div className="contents PDS_LIST" id="contents">
                        <h1 className="tit_3">
                            <FontAwesomeIcon icon={faList} />&nbsp;연구과제 지표별 현황</h1>


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

                                        }}
                                    >초기화</button>
                                </td>
                            </tr>
                        </table>


                        <div className="recent" >
                            <ul>
                                <li className='lftTitle'>성과 목록</li>
                                <li style={{ marginTop: '-5px' }}>
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
                                    <table className='scrolltbody' >

                                        <tbody style={{ borderBottom: '1px solid #ccc' }}>
                                            {listTag}
                                        </tbody>
                                    </table>

                                </li>
                                {listTag2}
                            </ul>
                            <ul style={{ marginTop: '0px' }}>
                                <li className='lftTitle'>세부 성과 지표 달성 현황</li>
                                <li style={{ marginTop: '-5px' }}>
                                    <table id="infoR" className='board_list' key="10000" style={{ width: '100%' }}>
                                        <thead>
                                            <tr style={{ width: '100%', backgroundColor: '#f1f1f1' }}>
                                                <th className='rightTT' style={{ width: '28%' }}>내역</th>
                                                <th className='rightTT' style={{ width: '71%' }}>달성율 / 목표율</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {listTag3}
                                        </tbody>



                                    </table>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <>
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
                    </>
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
export default EgovQnaList;