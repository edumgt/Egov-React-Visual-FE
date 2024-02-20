import React, { useState } from "react";
import { read, utils, writeFile } from 'xlsx';
const ExcelWork = () => {
    const [movies, setMovies] = useState([]);
    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const handleExport = () => {
        const headings = [[
            'Col.1',
            'Col.2',
            'Col.3',
            'Col.4'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A4', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'File.xlsx');
    }

    return (
        <>

            <div>
                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required 
                onChange={handleImport}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
            </div>

            <div style={{display:'none'}}>
                <button onClick={handleExport} className="btn btn-primary float-right">
                    Export <i className="fa fa-download"></i>
                </button>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Col.1</th>
                            <th scope="col">Col.2</th>
                            <th scope="col">Col.3</th>
                            <th scope="col">Col.4</th>
                            <th scope="col">Col.5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.length
                                ?
                                movies.map((movie, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{movie.Check}</td>
                                        <td>{movie.Auth}</td>
                                        <td>{movie.Action}</td>
                                        <td><span className="badge bg-warning text-dark">{movie.Dept}</span></td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan="5" className="text-center">No Data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>

        </>

    );
};

export default ExcelWork;
