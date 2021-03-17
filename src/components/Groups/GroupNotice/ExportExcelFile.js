// import React from 'react';
// import ReactExport from 'react-export-excel';
// import data from "./data";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// export default class ExportExcelFile extends React.Component {
//     render() {
//         console.log("damm", data);
//         const students = [...new Set(data.data.map(content => content.nick_name))];
//         console.log("damm", students);
//         const sheet = students.map(student => {
//             let row = { nick_name: student, ...data.data.filter(item => item.nick_name === student).map(item =>  };//JSON.parse(item.content).name);
//             // row = { ...row };
//             console.log("damm - row:", row);
//             return row;
//         })
//         console.log("damm", sheet);
//         const columns = [...new Set(data.data.map(content => JSON.parse(content.content).name))];
//         console.log("damm", columns);

//         return (<ExcelFile
//             hideElement={true}
//             filename={`${this.props.group.title}`}
//             fileExtension="xlsx"
//         // element={<button style={{ border: "none", marginLeft: "15px", background: "#EFEFEF", color: "red", borderRadius: "15%" }} id="excel-file-donwn">엑셀파일로 다운받기</button>}>
//         >
//             <ExcelSheet data={sheet} name="제출현황" >
//                 <ExcelColumn label="제출자" value="nick_name" />
//                 {columns.map((col, index) => {
//                     return <ExcelColumn label={`${col}`} value={`${index}`} />
//                 })}
//                 {/* <ExcelColumn label="디자인" value="design_title" /> */}
//                 {/* <ExcelColumn label="보드" value="board_title" /> */}
//                 {/* <ExcelColumn label="카드" value="card_title" /> */}
//                 {/* <ExcelColumn label="문제" value="problem_name" /> */}
//                 {/* <ExcelColumn label="제출결과" value="submit_result" /> */}
//                 {/* <ExcelColumn label="제출일자" value="submit_date" /> */}
//             </ExcelSheet>
//         </ExcelFile>
//         );
//     }
// }

// //board_id: 11564
// //board_order: 0
// //board_title: "단계 생성하기"
// //card_id: 31823
// //card_order: 3
// //card_title: "4"
// //content_create_time: "2021-01-28T06:29:18.000Z"
// //content_id: 59566
// //content_order: 0
// //design_id: 3249
// //design_title: "웹사이트 "
// //nick_name: "김정혁(관리자)"
// //problem_name: "구간과숫자의포함관계"
// //submit_date: "미제출"
// //submit_result: "미제출"
// //user_id: 762


import React from 'react';
import ReactExport from 'react-export-excel';
// import { data } from "./data";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportExcelFile extends React.Component {
    render() {
        // if (this.props.data == null) {
        //     this.props.nodata();
        //     return;
        // }
        const { data } = this.props;
        // get all nick_name
        const nicks = [...new Set(data.map(content => content.nick_name))];
        // get all problem_name
        const problem_name = [...new Set(data.map(content => content.problem_name))];
        console.log("excel", nicks, problem_name);

        const sheet = nicks.map(nick => {
            let row = { nick_name: nick, };
            problem_name.forEach(PN => {
                const content = data.filter(content => content.nick_name === nick && content.problem_name === PN)[0];
                let ts, obj, date;
                if (content && content.submit_date) {
                    ts = content.submit_date;
                    obj = new Date(ts);
                    date = obj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
                }
                const cell = { [PN]: content ? content.submit_result === "성공" ? `O(${date})` : "X" : " - " };
                row = { ...row, ...cell };
            });
            return row;
        });
        console.log("excel", sheet);

        return (<ExcelFile
            hideElement={true}
            element={< button style={{ border: "none", marginLeft: "15px", background: "#EFEFEF", color: "red", borderRadius: "15%" }} id="excel-file-donwn" > 엑셀파일로 다운받기</button >}
            filename={`${this.props.group.title}`}
            fileExtension="xlsx"
        >
            <ExcelSheet data={sheet} name="제출현황" >
                <ExcelColumn label="제출자" value="nick_name" />
                {problem_name.map((problem, index) =>
                    <ExcelColumn key={index} label={`${problem}`} value={`${problem}`} />)}
            </ExcelSheet>
        </ExcelFile>
        );
    }
}
