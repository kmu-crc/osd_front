import React, { Component } from "react";
import styled from "styled-components";
const details = {
    "success": true, "message": "get board list 성공.",
    "list":
        [
            {
                "uid": 3207, "user_id": 190, "design_id": 2494, "title": "회원 가입", "order": 0, "create_time": "2018-10-14T17:27:07.000Z", "update_time": "2019-03-19T05:18:44.000Z", "d_flag": 0,
                "cards":
                    [{ "uid": 9842, "user_id": 249, "nick_name": "귤귤귤귤귤귤귤", "content": "", "first_img": null, "title": "사용자 매뉴얼 : 회원가입", "order": 0, "update_time": "2018-10-17T07:23:54.000Z", "comment_count": 1 }]
            },
            {
                "uid": 3989, "user_id": 190, "design_id": 2494, "title": "서비스 개요", "order": 1, "create_time": "2018-11-21T01:48:33.000Z", "update_time": "2019-03-19T05:18:44.000Z", "d_flag": 0,
                "cards":
                    [{ "uid": 11947, "user_id": 249, "nick_name": "귤귤귤귤귤귤귤", "content": "", "first_img": null, "title": "서비스 개요", "order": 0, "update_time": "2018-11-21T07:02:27.000Z", "comment_count": 0 }]
            },
            {
                "uid": 3991, "user_id": 190, "design_id": 2494, "title": "디자인", "order": 2, "create_time": "2018-11-21T01:49:15.000Z", "update_time": "2019-03-04T03:04:31.000Z", "d_flag": 0,
                "cards":
                    [{ "uid": 11911, "user_id": 190, "nick_name": "둉", "content": "", "first_img": null, "title": "디자인 등록", "order": 0, "update_time": "2018-11-21T01:59:34.000Z", "comment_count": 0 },
                    { "uid": 11912, "user_id": 190, "nick_name": "둉", "content": "", "first_img": null, "title": "블로그 형식 : 컨텐츠 수정", "order": 1, "update_time": "2018-11-21T01:59:55.000Z", "comment_count": 0 },
                    { "uid": 11913, "user_id": 190, "nick_name": "둉", "content": "사용자 매뉴얼의 '디자인 등록_프로젝트 형식' 파트를 기술함.", "first_img": null, "title": "블로그 -> 프로젝트 형식 변경", "order": 2, "update_time": "2018-11-21T02:02:21.000Z", "comment_count": 0 },
                    { "uid": 11914, "user_id": 190, "nick_name": "둉", "content": "사용자 매뉴얼의 '디자인 등록_프로젝트 형식' 파트를 기술함", "first_img": null, "title": "프로젝트 형식 : 컨텐츠 등록", "order": 3, "update_time": "2018-11-21T02:02:31.000Z", "comment_count": 0 },
                    { "uid": 11915, "user_id": 190, "nick_name": "둉", "content": "사용자 매뉴얼의 '디자인 등록_프로젝트 형식' 파트를 기술함", "first_img": null, "title": "프로젝트 형식 : 컨텐츠 삭제", "order": 4, "update_time": "2018-11-21T02:02:36.000Z", "comment_count": 0 },
                    { "uid": 11916, "user_id": 190, "nick_name": "둉", "content": ":: 문의사항은 doeuncow@gmail.com으로 연락주세요", "first_img": null, "title": "FAQ", "order": 5, "update_time": "2018-11-21T02:02:40.000Z", "comment_count": -3 }]
            },
            {
                "uid": 3992, "user_id": 190, "design_id": 2494, "title": "그룹", "order": 3, "create_time": "2018-11-21T01:49:27.000Z", "update_time": "2018-11-21T01:49:27.000Z", "d_flag": 0,
                "cards":
                    [{ "uid": 11930, "user_id": 192, "nick_name": "쩡", "content": "그룹 가입 신청에 대한 설명입니다.", "first_img": null, "title": "그룹 가입 신청/승인", "order": 0, "update_time": "2018-11-21T05:59:19.000Z", "comment_count": 0 },
                    { "uid": 11929, "user_id": 192, "nick_name": "쩡", "content": "상단 바의 그룹 탭을 클릭합니다", "first_img": null, "title": "그룹 개설", "order": 1, "update_time": "2018-11-21T05:59:09.000Z", "comment_count": 0 },
                    { "uid": 11949, "user_id": 192, "nick_name": "쩡", "content": "그룹 가입관리에 대한 설명입니다.", "first_img": null, "title": "그룹 관리", "order": 2, "update_time": "2018-11-21T07:18:33.000Z", "comment_count": 0 }]
            },
            {
                "uid": 3993, "user_id": 190, "design_id": 2494, "title": "디자이너", "order": 4, "create_time": "2018-11-21T01:49:36.000Z", "update_time": "2018-11-21T01:49:36.000Z", "d_flag": 0,
                "cards":
                    [{ "uid": 11919, "user_id": 191, "nick_name": "ssssss0", "content": "메뉴에서 디자이너 탭에대한 설명입니다.", "first_img": null, "title": "디자이너 탭", "order": 0, "update_time": "2018-11-21T02:26:10.000Z", "comment_count": 0 },
                    { "uid": 11920, "user_id": 191, "nick_name": "ssssss0", "content": "회원가입 절차에서 디자이너로 등록하는 방법입니다.(기본)", "first_img": null, "title": "회원가입에서 등록", "order": 1, "update_time": "2018-11-21T02:30:12.000Z", "comment_count": 0 },
                    { "uid": 11921, "user_id": 191, "nick_name": "ssssss0", "content": "마이페이지에서 디자이너로 등록하는 방법입니다.", "first_img": null, "title": "마이페이지에서 등록", "order": 2, "update_time": "2018-11-21T02:31:15.000Z", "comment_count": 0 }]
            }]
}
const Wrapper = styled.div`
  width: 94%;
  border: 1px solid red;
  height: max-content;
`;
const Editor = styled.div`
  ;
`;
export class GridEditor2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ui
            
            // data
            content: []
        }
    }
    render() {
        return (<Wrapper>
            {/* shadow modal */}
            {/* horizontal scroll buttons is here */}
            <Editor>

            </Editor>
            {/* lists */}
        </Wrapper>)
    }
}
