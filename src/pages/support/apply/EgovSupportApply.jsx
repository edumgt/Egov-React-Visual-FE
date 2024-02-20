import React, { useState, useEffect, useCallback } from 'react';
import * as EgovNet from 'api/egovFetch';
import Modal from 'react-modal';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EgovSupportApply() {


    let counter = 1;

    function createMarkup(_val) {
        return { __html: _val };
    }

    const [tmpMessage1, setTmpMessage1] = React.useState(false);
    const [searchCondition, setSearchCondition] = useState({ hno: '0' });

    const [customStyles, setCustomStyles] = useState({
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
            width: '670px',
            height: '560px',
            transform: 'translate(-50%, -50%)',
            overflowX: 'hidden',

            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
        }
    });
    const [noticeListTag, setNoticeListTag] = useState();
    const [data1, setData1] = useState();
    const [listData, setListData] = useState();
    const [listData2, setListData2] = useState();

    let modalimg;
    const [tmp, setTmp] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);


    const openModal = e => {

        setCustomStyles({
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
            }
        });

        setIsOpen(true);

        const { id } = JSON.parse(e.target.dataset.onclickparam);

        let elms = document.getElementsByClassName("detailtb_");
        setTmpMessage1(elms[id].innerHTML);
    };


    function afterOpenModal() {
        const obj = JSON.parse(JSON.stringify(tmp));
        console.log(obj);
        if (obj !== false) modalimg.src = obj.id;
    };

    function closeModal() {
        setIsOpen(false);
        setTmp(false);
    };

    const openModal2 = e => {

        setCustomStyles({
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
                width: '1300px',
                height: '1000px',
                transform: 'translate(-50%, -50%)',
                overflowX: 'hidden',

                maxHeight: 'calc(100vh - 50px)',
                overflowY: 'auto'
            }
        });

        const { id } = JSON.parse(e.target.dataset.onclickparam);
        setTmp({ id });
        setIsOpen(true);

        setTmpMessage1("");

    };

    const handleClick = useCallback(e => {
        const { id } = JSON.parse(e.target.dataset.onclickparam);
        const { img } = JSON.parse(e.target.dataset.onclickparam);
        let elms = document.getElementsByClassName("charttb_");

        let infoR = document.getElementById("infoR");
        infoR.style.display = 'none';

        for (var i = 0; i < elms.length; i++) {
            elms[i].style.display = 'none';
        }
        elms[img].style.display = 'block';
        retrieveList2({
            ...searchCondition,
            hno: id
        });

    });
    const retrieveList = useCallback((searchCondition) => {
        const retrieveListURL = '/cmm/main/excelsubPageAPI2.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }
        EgovNet.requestFetch(retrieveListURL, requestOptions,
            (resp) => {
                let data1Dummy = [];
                let data2Dummy = [];

                resp.result.notiList.forEach(function (item, index) {
                    if (index === 0) {
                        data1Dummy = [];
                        data2Dummy = [];
                    }
                    data1Dummy.push(
                        <tr key={counter++}>
                            <td className='rightTT' style={{
                                borderLeft: '1px solid #ccc', height: '30px', width: '9%',
                                textAlign: 'center', padding: '5px'
                            }}>
                                <input
                                    key={counter++}
                                    type="radio"
                                    name="rdosn1"

                                    onClick={handleClick} data-onclickparam={JSON.stringify({ id: item.hno, img: index })} />
                            </td>
                            <td className='leftTT' key={counter++}
                                style={{ width: '9%', textAlign: 'center', padding: '5px' }}
                            >{item.hno}</td>
                            <td className='leftTT' key={counter++}
                                style={{ width: '64%', textAlign: 'center', padding: '5px' }}
                            >{item.gname}</td>
                            <td className='rightTT' key={counter++}
                                style={{ width: '13%', textAlign: 'left', padding: '5px' }}
                            >{item.dyyyy}</td>
                            <td className='rightTT' key={counter++}
                                style={{ width: '6%', textAlign: 'center', padding: '5px 8px 5px 0px' }}
                            >{item.yun}</td>

                        </tr>);
                    data2Dummy.push(

                        <>
                            <li key={counter++} style={{ marginTop: '16px' }} className='charttb_'>
                                <img
                                    key={counter++}
                                    src={"/assets/images/" + item.imglink + ".jpg"}
                                    style={{ width: '100%' }}
                                    onClick={openModal2}
                                    data-onclickparam={JSON.stringify({ id: "/assets/images/" + item.imglink + ".jpg" })}
                                    alt='로드맵 이미지 입니다.' />
                            </li>

                        </>
                    );

                });
                setNoticeListTag(data1Dummy);
                setData1(data2Dummy);

            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );

    }, []);

    useEffect(() => {
        retrieveList(searchCondition);
    }, [retrieveList, searchCondition]);

    const retrieveList2 = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selHaklist.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }
        EgovNet.requestFetch(retrieveListURL, requestOptions,
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
                                <input type="radio"
                                    key={counter++}
                                    name="rdosn2"
                                    onClick={openModal} data-onclickparam={JSON.stringify({ id: index })}
                                />
                            </td>

                            <td key={counter++} className='leftTT'
                                style={{ cursor: 'pointer', width: '45%', textAlign: 'center', padding: '5px' }}
                                onClick={openModal} data-onclickparam={JSON.stringify({ id: index })}

                            >{item.mokp}</td>


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

                            <li className='detailtb_' style={{ backgroundColor: '#E6E6E6', fontSize: '15px' }}>

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
                setListData(mutListTag);
                setListData2(mutListTag2);


            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );

    }, [counter]);

    useEffect(() => {
        retrieveList2(searchCondition);
    }, [retrieveList2, searchCondition]);
    return (
        <div key={counter++} className="container">
            <div className="c_wrap">
                <div className="location">
                    <ul>
                        <li><a className="home" href="#!">Home</a></li>
                        <li>핵심기술로드맵</li>
                    </ul>
                </div>
                <div className="layout">
                    <div className="contents PDS_LIST" id="contents">
                        <h1 className="tit_3"><FontAwesomeIcon icon={faList} />&nbsp;핵심기술로드맵</h1>
                        <div className="recent">
                            <ul>
                                <li className='lftTitle'>핵심기술 목록</li>
                                <li>
                                    <table className='board_list' >
                                        <thead>
                                            <tr style={{ backgroundColor: '#f1f1f1' }}>
                                                <th style={{ height: '33px', width: '10%', textAlign: 'center', padding: '5px' }}>선택</th>
                                                <th style={{ width: '10%', textAlign: 'center', padding: '5px' }}>번호</th>
                                                <th style={{ width: '*', textAlign: 'center', padding: '5px' }}>핵심기술명</th>
                                                <th style={{ width: '12%', textAlign: 'center', padding: '5px' }}>달성연도</th>
                                                <th style={{ width: '12%', textAlign: 'center', padding: '5px' }}>분야</th>

                                            </tr>
                                        </thead>
                                    </table>
                                    <table className='scrolltbody2' >
                                        <tbody style={{ borderBottom: '1px solid #ccc' }}>
                                            {noticeListTag}
                                        </tbody>
                                    </table>
                                </li>
                                <li>
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
                                            </tr>
                                        </thead>

                                        <tbody style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                                            {listData}
                                        </tbody>
                                    </table>
                                </li>
                                {listData2}
                            </ul>
                            <ul>
                                <li className='lftTitle'>핵심기술 로드맵</li>
                                <div
                                    id="infoR"
                                    className="infoR" key="9999"
                                >좌측의 핵심기술을 선택하세요</div>
                                <div>
                                    {data1}</div>
                            </ul>
                        </div>
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
                            <img ref={(_modalimg) => (modalimg = _modalimg)}
                                src=''
                                style={{ width: '100%' }}
                                alt='' />
                            <div id="detailData" dangerouslySetInnerHTML={createMarkup(tmpMessage1)} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EgovSupportApply;