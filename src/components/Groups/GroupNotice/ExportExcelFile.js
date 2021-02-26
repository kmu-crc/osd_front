import React from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportExcelFile extends React.Component {
    render() {
        return (
            <ExcelFile filename={`${this.props.group.title}.xls`} fileExtension="xls" element={<button style={{ border: "none", marginLeft: "15px", background: "#EFEFEF", color: "red", borderRadius: "15%" }} id="excel-file-donwn">엑셀파일로 다운받기</button>}>
                <ExcelSheet data={this.props.data} name="제출현황" >
                    <ExcelColumn label="디자인" value="design_title" />
                    <ExcelColumn label="제출자" value="nick_name" />
                    <ExcelColumn label="보드" value="board_title" />
                    <ExcelColumn label="카드" value="card_title" />
                    <ExcelColumn label="문제" value="problem_name" />
                    <ExcelColumn label="제출결과" value="submit_result" />
                    <ExcelColumn label="제출일자" value="submit_date" />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

//board_id: 11564
//board_order: 0
//board_title: "단계 생성하기"
//card_id: 31823
//card_order: 3
//card_title: "4"
//content_create_time: "2021-01-28T06:29:18.000Z"
//content_id: 59566
//content_order: 0
//design_id: 3249
//design_title: "웹사이트 "
//nick_name: "김정혁(관리자)"
//problem_name: "구간과숫자의포함관계"
//submit_date: "미제출"
//submit_result: "미제출"
//user_id: 762
