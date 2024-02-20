import React, { useState, useEffect, useCallback } from 'react';
import * as EgovNet from 'api/egovFetch';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import { DataGrid } from '@mui/x-data-grid';
import Modal from 'react-modal';

function AdminExcelWork3(props) {
    let counter = 1;
    const handleRowClick = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {

        openModal(params);
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [item, setItem] = React.useState({});
    const openModal = e => {
        setItem(e.row);
        setIsOpen(true);
    };

    function afterOpenModal() {

        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'none';
        }
    };

    function closeModal() {
        setIsOpen(false);
        let elms3 = document.getElementsByClassName("btnBig");
        for (var i = 0; i < elms3.length; i++) {
            elms3[i].style.display = 'block';
        }
    };

    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(30);

    const columns = [
        { field: "jumu", headerName: "jumu", width: 90 },
        { field: "yun", headerName: "yun", width: 90 },
        { field: "bgj", headerName: "bgj", width: 90 },
        { field: "mgj", headerName: "mgj", width: 90 },
        { field: "sgj", headerName: "sgj", width: 90 },
        { field: "gname", headerName: "gname", width: 190 },
        { field: "giga", headerName: "giga", width: 120 },
        { field: "sjipy", headerName: "sjipy", width: 150 },
        { field: "gjipy", headerName: "gjipy", width: 150 },
        { field: "mokp", headerName: "mokp", width: 190 },
        { field: "smokp", headerName: "smokp", width: 190 },
        { field: "sungyou", headerName: "sungyou", width: 150 },
        { field: "dalsungnm", headerName: "dalsungnm", width: 190 },
        { field: "link", headerName: "link", width: 190 },
        { field: "dalsunsebumok", headerName: "dalsunsebumok", width: 80 },
        { field: "dyyyy", headerName: "dyyyy", width: 80 },
        { field: "nyyyy", headerName: "nyyyy", width: 80 },
        { field: "scr", headerName: "scr", width: 190 },
        { field: "memo", headerName: "memo", width: 190 },
    ];

    const [searchCondition, setSearchCondition] =
        useState({
            searchCnd: '', searchWrd: '', searchGia: '', searchBgj: '', searchMgj: '',
            gjipy: '', sjipy: '', memo: '', kind: '', scr: ''
        });


    const retrieveList = useCallback((searchCondition) => {
        const retrieveListURL = '/uat/uia/selTotalEx1.do';
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
                setRows(resp.result.resultList);

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

    return (
        <div className="container">
            <div className="c_wrap">
                <div>&nbsp;</div>
                <div className="layout">
                    <EgovLeftNav />
                    <div className="contents  SITE_GALLARY_VIEW NOTICE_LIST2 contents_admin" id="contents" >
                        <h2 className="tit_2" style={{ marginBottom: '15px' }}>과제 DataGrid</h2>
                        <div className="Container">
                            <div className="Grid">
                                <DataGrid
                                    onRowClick={handleRowClick}
                                    rows={rows}
                                    columns={columns}
                                    checkboxSelection={false}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[30, 50, 100, 200]}
                                    pagination

                                />
                            </div>
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



                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ paddingTop: '50px', width: '100%', textAlign: 'right' }}>

                            </div>
                        </Modal>
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
export default AdminExcelWork3;