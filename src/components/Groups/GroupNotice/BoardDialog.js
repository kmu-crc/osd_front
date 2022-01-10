import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";
import TextController from "components/Designs/CardSourceDetail/TextControllerPlus.js";
import {
    CreateGroupBoardRequest, UpdateGroupBoardRequest, DeleteGroupBoardRequest, GetGroupBoardRequest,
} from "redux/modules/group";
import opendesign_style from "opendesign_style";
import Button from "./ButtonOSD";
import DateFormat from "modules/DateFormat";
import { alert } from "components/Commons/Alert/Alert";
import Pagination from "react-js-pagination";

//comment
import BoardCommentContainer from "./BoardCommentContainer";


const Navi = styled.div`
  .inner {
    margin: auto;
    width: 273px;
    height: 100%;
    .pagination {
        padding: 10px;
        display: flex;
        cursor: pointer;
        ul {
            list-style: none;
            padding: 0;
          }
          
          ul.pagination li {
            display: inline-block;
            width: 30px;
            border: 1px solid #e2e2e2;
            display: flex;
            justify-content: center;
            font-size: 1.05px;
          }
          
          ul.pagination li a {
            text-decoration: none;
            color: #1e9b79;
            font-size: 1.1rem;
          }
          
          ul.pagination li.active a {
            color: white;
          }
          ul.pagination li.active {
            background-color: #1e9b79;
          }
          
          ul.pagination li a:hover,
          ul.pagination li a.active {
            color: blue;
          }
          
          .page-selection {
            width: 48px;
            height: 15px;
            color: #1e9b79;
          }
          
          .pagination-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
          }
          
    }
  }
`;

const BoardModalWrapper = styled(Modal)`
    width:100% !important;
    min-height:525px;
    max-width:1152px !important;
    padding:26px 49px !important;
    background-color: white;
    display: flex;
  
  .close-box{
    position: absolute;
    width:60px;
    height:60px;
    display:flex;
    align-items:center;
    justify-content:center;
    right: 0px;
    top: 0px;
  }
  .title {
    width:100%;
    text-alignment: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    cursor: default;
    .text_{
        font-family:Spoqa Han Sans Neo;
        font-weight:500;
        font-size:37px;
    }
    .newbutton {
        margin-top: 5px;
        height: 100%;
        min-width: 85px;
        width:max-content;
        text-alignment: center;
        
    }
  }



    .empty {
        display:flex;
        align-items:center;
        justify-content:center;
        height: 300px;
    }
    .bottom-buttons {
        width: 100%;
        display: inline-block;
        align-self: flex-end;
        .inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
    }
`;
const BoardModalWrapper_mobile = styled(Modal)`
    width:100% !important;
    min-height:525px;
    max-width:1152px !important;
    padding:20px !important;
    background-color: white;
    display: flex;
    .close-box{
        position: absolute;
        width:60px;
        height:60px;
        display:flex;
        align-items:center;
        justify-content:center;
        right: 0px;
        top: 0px;
      }
    .title_mobile{
        width:100%;
        text-align:center;
        font-size:20px;
        font-weight:500;
    }
    .flex{
        width:100%;
        display:flex;
    }
    .button_mobile{
        padding:10px;
        font-size:15px;
        font-weight:500;
        color:white;
        background-color:#1e9b79;
    }
    .empty {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 5px 11px 4px 11px;
        height: 300px;
    }
    .bottom-buttons {
        width: 100%;
        display: inline-block;
        align-self: flex-end;
        .inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
    }

`
const NoticeReadWrapper_mobile = styled.div`
    width: 100%;
    font-weight: 700;
    font-family:Spoqa Han Sans Neo;
    font-weight:Medium;
    padding: 5px 11px 4px 11px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top:13px;
    .header-element {
        font-weight: 700;
        display: flex;
        flex-direction: row;
        border-top: 1px solid #EAEAEA;

        .label {
            min-width:80px;
            width: 10%;
            background-color: #EAEAEA;
            padding: 10px;
            text-alignment: center;
        }
        .element-content{
            width: 90%;
            padding: 10px;
        }
    }

    .content {
        padding:25px;
        height:300px;
        border-top: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        font-weight: 00;
        min-height: 100px;
        overflow-y: auto;
    }
`;
const NoticeListWrapper = styled.div`
width: 100%;
padding: 5px;
font-size: 20px;
cursor: default;
.header { 
    background-color: #CECECE;
    font-weight: 700;
    font-family:Spoqa Han Sans Neo;
    font-weight:Medium;
    padding: 5px 11px 4px 11px;
    width: 100%;
    display: flex;
    align-items:center;
    margin-top:13px;
    .num { 
        height:28px;
        text-align: center; 
        width: 4%;
        min-width:max-content;
        display:flex;
        align-items:center;
    }
    .header-title { 
        height:28px;
        text-align: left; 
        width: 80%;
        padding-left:110px;
        display:flex;
        align-items:center;
    }
    .create_time { 
        height:28px;
        width: 6%;
        min-width:max-content;
        display:flex;
        text-align: center; 
        align-items:center;
    }
    .nick-name {
        white-space: nowrap; 
        text-overflow: ellipsis; 
        width: 10%;
        min-width:max-content;
        height:28px;
        display:flex;
        text-align: center; 
        align-items:center;
    }
}

.row {
    background-color: white;
    font-size: 15px;
    font-family:Noto Sans KR;
    font-weight: 300;
    padding: 19px 11px 19px 11px;
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    // border-bottom: 1px solid #EFEFEF;

    :hover { 
        background-color: #EFEFEF;
        opacity:0.5; 
    }
    .num { 
        text-align: center; 
        width: 3%;
        min-width:max-content;
    }
    .row-title { 
        text-align: left; 
        width: 80%;
        padding-left:110px;
        margin-right:50px;
        display:flex;
        align-items:center;
        // height:28px;
        max-width:1000px;
        // text-align: left; 
        // padding-left:120px;
        // width: 82%;
        white-space: nowrap; 
        overflow:hidden;
        text-overflow: ellipsis; 
    }
    .create_time { 
        text-align: center; 
        width: 6%;
        min-width:max-content;
    }
    .nick-name {
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        width: 9%;
    }
}
`;
const NoticeReadWrapper = styled.div`
    width: 100%;
    padding: 10px;

    .header-element {
        font-weight: 700;
        display: flex;
        flex-direction: row;
        border-top: 1px solid #EAEAEA;

        .label {
            min-width:80px;
            width: 10%;
            background-color: #EAEAEA;
            padding: 10px;
            text-alignment: center;
        }
        .element-content{
            width: 90%;
            padding: 10px;
        }
    }

    .content {
        height:200px;
        border-top: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        padding: 25px;
        font-weight: 500;
        min-height: 100px;
        overflow-y: auto;
    }
    .comment_mobile {
        background-color: #FAFAFA;
        margin-top:15px;
        padding: 15px;
        overflow-y: auto;
    }
`;
const NoticeWriteWrapper = styled.div`
    padding: 10px;

    .label {
        padding: 10px;
        font-size: 1.25rem;
        font-weight: 700;
    }
    .inputText{
        width: 100%; 
        padding-left: 10px;
        padding-right: 10px;
        font-size: 20px;
        font-weight: 300;
        font-family: Noto Sans KR;
        line-height: 29px;
        color: #707070;
        border: none;
        border-radius: 5px;
        outline: none;
        background-color: #EFEFEF;
        :focus { 
            border: 1px solid #719ECE;
        }
    }
`;
const NoticeListWrapper_mobile = styled.div`
    width: 100%;
    padding: 5px;
    font-size: 20px;
    cursor: default;
    .ellipsis{
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }
    .header{
        background-color: #CECECE;
        font-weight: 500;
        font-size:15px;
        font-family:Spoqa Han Sans Neo;
        width: 100%;
        display: flex;
        align-items:center;
        padding:5px;
        .num{width:10%;min-width:50px;margin-right:10px;}
        .name{width:50%;min-width:100px;margin-right:10px;}
        .time{width:20%;min-width:80px;}
        .user{width:20%;min-width:80px;}
    }
    .body{
        font-size:13px;
        font-family:Spoqa Han Sans Neo;
        .row{border-bottom:1px solid #eaeaea;display:flex;align-items:center;padding:5px;}
        .num{width:10%;min-width:50px;margin-right:10px;}
        .name{width:50%;min-width:100px;margin-right:10px;}
        .time{width:20%;min-width:80px;}
        .user{width:20%;min-width:80px;}

    }

`
const NoticeWriteWrapper_mobile = styled.div`
    padding: 10px;

    .label {
        padding: 10px;
        font-size: 1.25rem;
        font-weight: 700;
    }
    .inputText{
        width: 100%; 
        padding-left: 10px;
        padding-right: 10px;
        font-size: 20px;
        font-weight: 300;
        font-family: Noto Sans KR;
        line-height: 29px;
        color: #707070;
        border: none;
        border-radius: 5px;
        outline: none;
        background-color: #EFEFEF;
        :focus { 
            border: 1px solid #719ECE;
        }
    }
`;


// CONSTANTS
const LIST = 0;
const READ = 1;
const WRITE = 2;
export default class BoardDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: LIST, // READ, WRITE

            // LIST
            list: [], page: 0, count: 0, per: 5,

            // WRITE
            title: "", content: "",

            // READ
            board: null,
        };
        this.getList = this.getList.bind(this);
        this.readBoard = this.readBoard.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        const { group_id } = this.props;
        const { page } = this.state;

        GetGroupBoardRequest(group_id, page)
            .then(res => {
                if (res.success) {
                    const { total, list } = res.data;
                    this.setState({ count: total, list: list })
                } else {
                    throw res.success;
                }
            })
            .catch(e => console.error(e));
        // this.setState({ page: page });
    }
    readBoard(board) {
        this.setState({ board: board, mode: READ });
    }
    onChangeContent(data) {
        this.setState({ content: data.content });
    }
    write() {
        const { title, content } = this.state;
        const { group_id, token, userInfo } = this.props;
        if (!(token && group_id)) {
            return;
        }
        if (title.length === 0) {
            alert("제목을 입력하여 주세요.");
            return;
        }
        if (content.length === 0) {
            alert("내용을 입력하여 주세요.");
            return;
        }
        CreateGroupBoardRequest({ user_id: userInfo.uid, title: title, content: content }, group_id, token)
            .then(res => {
                console.log(res);
                if (res) {
                    alert("글을 등록하였습니다.");
                    this.setState({ mode: LIST, title: "", content: "", page: 0 });
                    this.getList();
                } else {
                    throw res;
                }
            })
            .catch(e => {
                console.error(e);
                alert("글을 등록하지 못하였습니다.");
            })
    }
    render() {
        const { open, close, token, userInfo, group_id } = this.props;
        const { mode, list, count, per, page, board } = this.state;
        console.log("----------",this.props)
        return (
            <React.Fragment>
            {
                window.innerWidth<500?
                <BoardModalWrapper_mobile
                closeOnDimmerClick={mode === WRITE ? false : true}
                open={open}
                onClose={() => close()}>

                <div className="close-box" onClick={() => close()}>
                    <Cross angle={45} color={"black"} weight={5} width={35} height={35} />
                </div>
                <div className="close-box" onClick={() => close()}><Cross angle={45} color={"black"} weight={2} width={20} height={20} /></div>
                        <div className="title_mobile">그룹 게시판</div>
                        <div className="flex" style={{marginTop:"10px",justifyContent:"flex-end"}}>
                        <div onClick={() => { this.setState({ mode: WRITE }) }} className="button_mobile">글쓰기</div>
                </div>
                    {/* <div className="title">
                        <div className="newbutton"/>
                        <div className="text_">그룹 게시판</div>
                        <div className="newbutton">
                        {mode === LIST && userInfo != null
                            ? 
                                <Button
                                    onClick={() => { this.setState({ mode: WRITE }) }}
                                    color={"white"}
                                    bgcolor={"#FF0000"}
                                    bgcolor_hover={"#DD0000"}
                                    marginTop={"0px"}
                                    marginRight={"0px"}
                                > 글쓰기</Button>
                            : null}
                        </div>
                    </div> */}

                    {mode === LIST
                        ? <NoticeListWrapper_mobile>
                            <div className="header">
                                <div className="num">번호</div>
                                <div className="name">제목</div>
                                <div className="user">작성자</div>
                                <div className="time">등록일</div>
                            </div>
                            <div className="body">
                                {list && list.length > 0
                                    ? list.map((item, index) =>
                                        <div className="row" key={index} onClick={() => this.readBoard(item)}>
                                            <div className="num ellipsis">{count - ((page * per) + index)}</div>
                                            <div className="name ellipsis">{item.title}{item.comments > 0 ? `(${item.comments})` : null}</div>
                                            <div className="user ellipsis">{item.nick_name}</div>
                                            <div className="time ellipsis">{DateFormat(item.create_time)}</div>
                                        </div >)
                                    : <div className="empty"> 글이 없습니다. </div>}
                            </div>
                        </NoticeListWrapper_mobile>
                        : null}

                    {mode === READ
                        ? <NoticeReadWrapper_mobile>
                            {board
                                ? <React.Fragment>
                                    <div className="header-element">
                                        <div className="label">제목</div>
                                        <div className="element-content">{board.title}</div>
                                    </div>
                                    <div className="header-element">
                                        <div className="label">등록일</div>
                                        <div className="element-content">{DateFormat(board.create_time)}</div>
                                    </div>
                                    <div className="content">
                                        <div dangerouslySetInnerHTML={{ __html: board.content }} />
                                    </div>
                                    {
                                        this.props.userInfo&&
                                        <div className="comment_mobile" style={{marginTop:"15px"}}>
                                            <BoardCommentContainer
                                                token={token}
                                                userInfo={userInfo}
                                                group_id={group_id}
                                                board_id={board.uid}
                                            />
                                        </div>
                                    }
                                </React.Fragment>
                                : <div>내용을 표시할 수 없습니다.</div>}
                        </NoticeReadWrapper_mobile>
                        : null}

                    {mode === WRITE
                        ? <NoticeWriteWrapper_mobile>
                            <div className="label">제목</div>
                            <div>
                                <input
                                    autoFocus
                                    type="text" className="inputText"
                                    value={this.state.title}
                                    onChange={event =>
                                        this.setState({ title: event.target.value })} />
                            </div>
                            <div className="label">내용</div>
                            <div>
                                <TextController
                                    donotfocus
                                    userHeight="230"
                                    item={{ content: "" }}
                                    getValue={(data) =>
                                        this.onChangeContent(data)} />
                            </div>
                        </NoticeWriteWrapper_mobile>
                        : null}

                    {/* button */}
                    <div className="bottom-buttons">
                        <div>
                            {/* /* pagination */}
                            {mode === LIST
                                ? <Navi>
                                    <div className="inner">
                                        {count > per
                                            ?
                                            <div className="pagination">
                                                <Pagination
                                                    activePage={this.state.page + 1}
                                                    itemsCountPerPage={5}
                                                    totalItemsCount={count}
                                                    pageRangeDisplayed={5}
                                                    onChange={async (page) => { await this.setState({ page: page - 1 }); this.getList(); }}
                                                />
                                            </div>
                                            : null}
                                    </div>
                                </Navi>
                                : null}
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", width: "max-content", marginLeft: "auto", }}>
                            {mode === WRITE
                                ? <Button 
                                bgcolor="#1e9b79;" color="white" onClick={() => this.write()}>등록</Button>
                                : null}
                            {mode === WRITE || mode === READ
                                ? <Button onClick={() => this.setState({ mode: LIST, title: "", content: "", notice: null })}>목록으로</Button>
                                : null}
                        </div>
                    </div>

                </BoardModalWrapper_mobile >
                :/**---------------------------- ----------------------- 웹/모바일 ------------ --------------------------- ------------------------ */
                <BoardModalWrapper
                closeOnDimmerClick={mode === WRITE ? false : true}
                open={open}
                onClose={() => close()}>

                <div className="close-box" onClick={() => close()}>
                    <Cross angle={45} color={"black"} weight={5} width={35} height={35} />
                </div>
                    <div className="title">
                        <div className="newbutton"/>
                        <div className="text_">그룹 게시판</div>
                        <div className="newbutton">
                        {mode === LIST && userInfo != null
                            ? 
                                <Button
                                    onClick={() => { this.setState({ mode: WRITE }) }}
                                    color={"white"}
                                    bgcolor={"#FF0000"}
                                    bgcolor_hover={"#DD0000"}
                                    marginTop={"0px"}
                                    marginRight={"0px"}
                                > 글쓰기</Button>
                            : null}
                        </div>
                    </div>

                    {mode === LIST
                        ? <NoticeListWrapper>
                            <div className="header">
                                <div className="num">번호</div>
                                <div className="header-title">제목</div>
                                <div className="nick-name">작성자</div>
                                <div className="create_time">등록일</div>
                            </div>
                            <div className="body">
                                {list && list.length > 0
                                    ? list.map((item, index) =>
                                        <div className="row" key={index} onClick={() => this.readBoard(item)}>
                                            <div className="num ellipsis">{count - ((page * per) + index)}</div>
                                            <div className="row-title ellipsis">{item.title}{item.comments > 0 ? `(${item.comments})` : null}</div>
                                            <div className="nick-name ellipsis">{item.nick_name}</div>
                                            <div className="create_time ellipsis">{DateFormat(item.create_time)}</div>
                                        </div >)
                                    : <div className="empty"> 글이 없습니다. </div>}
                            </div>


                        </NoticeListWrapper>
                        : null}

                    {mode === READ
                        ? <NoticeReadWrapper>
                            {board
                                ? <React.Fragment>
                                    <div className="header-element">
                                        <div className="label">제목</div>
                                        <div className="element-content">{board.title}</div>
                                    </div>
                                    <div className="header-element">
                                        <div className="label">등록일</div>
                                        <div className="element-content">{DateFormat(board.create_time)}</div>
                                    </div>
                                    <div className="content">
                                        <div dangerouslySetInnerHTML={{ __html: board.content }} />
                                    </div>
                                    {
                                    this.props.userInfo&&
                                    <div className="comment_">
                                    <BoardCommentContainer
                                        token={token}
                                        userInfo={userInfo}
                                        group_id={group_id}
                                        board_id={board.uid}
                                    />
                                    </div>
                                    }
                                </React.Fragment>
                                : <div>내용을 표시할 수 없습니다.</div>}
                        </NoticeReadWrapper>
                        : null}

                    {mode === WRITE
                        ? <NoticeWriteWrapper>
                            <div className="label">제목</div>
                            <div>
                                <input
                                    autoFocus
                                    type="text" className="inputText"
                                    value={this.state.title}
                                    onChange={event =>
                                        this.setState({ title: event.target.value })} />
                            </div>
                            <div className="label">내용</div>
                            <div>
                                <TextController
                                    donotfocus
                                    userHeight="230"
                                    item={{ content: "" }}
                                    getValue={(data) =>
                                        this.onChangeContent(data)} />
                            </div>
                        </NoticeWriteWrapper>
                        : null}

                    {/* button */}
                    <div className="bottom-buttons">
                        <div>
                            {/* /* pagination */}
                            {mode === LIST
                                ? <Navi>
                                    <div className="inner">
                                        {count > per
                                            ?
                                            <div className="pagination">
                                                <Pagination
                                                    activePage={this.state.page + 1}
                                                    itemsCountPerPage={5}
                                                    totalItemsCount={count}
                                                    pageRangeDisplayed={5}
                                                    onChange={async (page) => { await this.setState({ page: page - 1 }); this.getList(); }}
                                                />
                                            </div>
                                            : null}
                                    </div>
                                </Navi>
                                : null}
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", width: "max-content", marginLeft: "auto", }}>
                            {mode === WRITE
                                ? <Button 
                                bgcolor="red" color="white" onClick={() => this.write()}>등록</Button>
                                : null}
                            {mode === WRITE || mode === READ
                                ? <Button onClick={() => this.setState({ mode: LIST, title: "", content: "", notice: null })}>목록으로</Button>
                                : null}
                        </div>
                    </div>

            </BoardModalWrapper >
            }
 
            </React.Fragment>
            );
    }
};


