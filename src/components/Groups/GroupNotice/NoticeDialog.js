import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react'
import Cross from "components/Commons/Cross";
import TextController from "components/Designs/CardSourceDetail/TextControllerPlus.js";
import { GetTotalCountGroupNoticeRequest, GetGroupNoticeListRequest, CreateGroupNoticeRequest, } from "redux/modules/group";
import opendesign_style from "opendesign_style";
import Button from "./ButtonOSD";
import DateFormat from "modules/DateFormat";
import { alert } from "components/Commons/Alert/Alert";
import Pagination from "react-js-pagination";
// import PaginationOpenDesign from "components/Commons/PaginationOpenDesign";

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
            color: #337ab7;
            font-size: 1.1rem;
          }
          
          ul.pagination li.active a {
            color: white;
          }
          ul.pagination li.active {
            background-color: #337ab7;
          }
          
          ul.pagination li a:hover,
          ul.pagination li a.active {
            color: blue;
          }
          
          .page-selection {
            width: 48px;
            height: 15px;
            color: #337ab7;
          }
          
          .pagination-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
          }
          
    }
  }
`;
const NoticeModalWrapper = styled(Modal)`
  min-width: 500px;
  min-height: 350px;
  width: 85%;
  padding: 35px;
  background-color: white;
  display: flex;
  
  .close-box{
    position: absolute;
    right: 25px;
    top: 25px;
  }
  .title {
    text-alignment: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-between;
    cursor: default;
    h2 {
        margin-left: 10px;
        margin-top: 10px;
        padding: 5px;
    }
    .newbutton {
        margin-right: 10px;
        margin-top: 5px;
        height: 100%;
        width: max-content;
        margin-left: auto;
        text-alignment: center;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
  and (max-width : ${1024}px) { 
      min-width:100%;
   }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) { 
      min-width:100%;
   }



    .empty {
        height: 150px;
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
const NoticeListWrapper = styled.div`
    width: 100%;
    padding: 5px;
    font-size: 1.25rem;
    cursor: default;

    .header { 
        background-color: #EFEFEF;
        font-weight: 700;
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;

        .num { 
            text-align: center; 
            width: 10%;
        }
        .header-title { 
            text-align: center; 
            width: 80%;
        }
        .create_time { 
            text-align: center; 
            width: 20%;
        }
    }

    .row {
        background-color: white;
        font-weight: 500;
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        border-bottom: 1px solid #EFEFEF;

        :hover { 
            background-color: #EFEFEF; 
        }
        .num { 
            text-align: center; 
            width: 10%;
        }
        .row-title { 
            text-align: left; 
            padding-left: 15px;
            width: 80%;
            white-space: nowrap; 
            text-overflow: ellipsis; 
        }
        .create_time { 
            text-align: center;
            width: 20%;
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
        border-top: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        padding: 25px;
        font-weight: 500;
        min-height: 100px;
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


// constants
const LIST = 0;
const READ = 1;
const WRITE = 2;
export default class NoticeDialog extends Component {
    /*
d      pagination
      style
      */
    constructor(props) {
        super(props);
        this.state = {
            mode: LIST, // READ, WRITE

            // LIST
            list: [], page: 0, count: 0, per: 5,

            // WRITE
            title: "", content: "",

            // READ
            notice: null,
        };
        this.getList = this.getList.bind(this);
        this.readNotice = this.readNotice.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        const { group_id } = this.props;
        const { page } = this.state;

        GetTotalCountGroupNoticeRequest(group_id)
            .then(res => this.setState({ count: res.data }))
            .catch(err => this.setState({ count: 0 }));
        GetGroupNoticeListRequest(group_id, page)
            .then(res => this.setState({ list: res.data }))
            .catch(err => this.setState({ list: [] }));
        this.setState({ page: page });
    }
    readNotice(notice) {
        this.setState({ notice: notice, mode: READ });
    }
    onChangeContent(data) {
        this.setState({ content: data.content });
    }
    write() {
        const { title, content } = this.state;
        const { group_id, token } = this.props;
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
        CreateGroupNoticeRequest(token, { group_id: group_id, title: title, content: content })
            .then(res => {
                console.log(res);
                if (res) {
                    alert("공지사항을 등록하였습니다.");
                    this.setState({ mode: LIST, title: "", content: "", page: 0 });
                    this.getList();
                } else {
                    throw res
                }
            })
            .catch(e => {
                console.error(e);
                alert("공지사항을 등록하지 못하였습니다.");
            })
    }
    render() {
        const { open, close, group_id,group_owner_id, user_id } = this.props;
        const { mode, list, count, per, page, notice } = this.state;
        console.log(this.props);
        return (
            <NoticeModalWrapper
                /*closeIcon*/
                closeOnDimmerClick={mode === WRITE ? false : true}
                open={open}
                onClose={() => close()}>

                <div className="close-box" onClick={() => close()}>
                    <Cross angle={45} color={"#707070"} weight={5} width={35} height={35} />
                </div>

                <Modal.Content>
                    {/* title & write-button */}
                    <div className="title">
                        <h2>공지사항</h2>
                        {mode === LIST && user_id === group_owner_id
                            ? <div className="newbutton">
                                <Button
                                    onClick={() => { this.setState({ mode: WRITE }) }}
                                    color={"white"}
                                    bgcolor={"#AEAEAE"}
                                    bgcolor_hover={"#CECECE"}
                                    marginTop={"0px"}
                                    marginRight={"0px"}
                                >공지사항 등록하기</Button></div>
                            : null}
                    </div>

                    {mode === LIST
                        ? <NoticeListWrapper>
                            <div className="header">
                                <div className="num">번호</div>
                                <div className="header-title">제목</div>
                                <div className="create_time">등록일</div>
                            </div>
                            <div className="body">
                                {list && list.length > 0
                                    ? list.map((item, index) =>
                                        <div className="row" key={index} onClick={() => this.readNotice(item)}>
                                            <div className="num">{count - ((page * per) + index)}</div>
                                            <div className="row-title">{item.title}</div>
                                            <div className="create_time">{DateFormat(item.create_time)}</div>
                                        </div >)
                                    : <div className="empty"> 글이 없습니다. </div>}
                            </div>


                        </NoticeListWrapper>
                        : null}

                    {mode === READ
                        ? <NoticeReadWrapper>
                            {notice
                                ? <React.Fragment>
                                    <div className="header-element">
                                        <div className="label">제목</div>
                                        <div className="element-content">{notice.title}</div>
                                    </div>
                                    <div className="header-element">
                                        <div className="label">등록일</div>
                                        <div className="element-content">{DateFormat(notice.create_time)}</div>
                                    </div>
                                    <div className="content">
                                        <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                                    </div>
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
                                            // <PaginationOpenDesign current={page} count={count} per={per} />
                                            : null}
                                    </div>
                                </Navi>
                                : null}
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", width: "max-content", marginLeft: "auto", marginRight: "10px" }}>
                            {mode === WRITE
                                ? <Button bgcolor="red" color="white" onClick={() => this.write()}>등록</Button>
                                : null}
                            {mode === WRITE || mode === READ
                                ? <Button onClick={() => this.setState({ mode: LIST, title: "", content: "", notice: null })}>목록으로</Button>
                                : null}
                            <Button onClick={() => close()}>닫기</Button>
                        </div>
                    </div>

                </Modal.Content >
            </NoticeModalWrapper >);
    }
};