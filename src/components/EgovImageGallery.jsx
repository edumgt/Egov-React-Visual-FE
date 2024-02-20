import React from 'react';
import { SERVER_URL } from 'config';

function EgovImageGallery({ boardFiles }) {

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach(function (item, index) {
            filesTag.push(
                <React.Fragment key={index}>
                    <span>경로: {`${SERVER_URL}/cmm/fms/getImage.do?atchFileId=${item.atchFileId}&fileSn=${item.fileSn}`}</span><br />
                    <img 
                    style={{width:'50%'}}
                    src={`${SERVER_URL}/cmm/fms/getImage.do?atchFileId=${item.atchFileId}&fileSn=${item.fileSn}`} alt=""  /><br />
                </React.Fragment>
            );
        });
    }
    return (
        <div className="board_attach_img">
            {filesTag}
        </div>
    );
}

export default EgovImageGallery;