import React, { Component } from 'react';
import styled from "styled-components";
import {
  GetGroupBoardRequest,
  // GetGroupNoticeListRequest, GetTotalCountGroupNoticeRequest,
} from "redux/modules/group";
import DateFormat from "modules/DateFormat";
import PaginationOpenDesign from "components/Commons/PaginationOpenDesign";

const Container = styled.div``;
const Head = styled.div`
  // *{
  // border:1px solid red;
  // }
  display: flex;
  flex-direction: row;
  width: 810px;
  height: 50px;
  background: #EFEFEF 0% 0% no-repeat padding-box;
  border-radius: 5px 5px 0px 0px;
  opacity: 1;
  *{cursor: default;}

  .num {
    margin-top: 13px;
    margin-left: 10px;
    width: max-content;
    height: 25px;
    text-align: left;
    font-size: 17px;
    line-height: 35px;
    font-family: Noto Sans KR;
    font-weight: 300;;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
  .title {
    margin-top: 13px;
    margin-left: 280px;
    width: max-content;
    height: 25px;
    text-align: left;
    font-size: 17px;
    line-height: 35px;
    font-family: Noto Sans KR;
    font-weight: 500;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
  .nick_name {
    margin-top: 13px;
    margin-left: 250px;
    width: max-content;
    height: 25px;
    text-align: left;
    font-size: 17px;
    line-height: 35px;
    font-family: Noto Sans KR;
    font-weight: 500;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
  .date {
    margin-top: 13px;
    margin-left: 30px;
    width: max-content;
    height: 25px;
    text-align: left;
    font-size: 17px;
    line-height: 35px;
    font-family: Noto Sans KR;
    font-weight: 300;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }

`;
const List = styled.div`
  *{ 
    // border:1px solid blue; 
    cursor: default;}
  .no-board{
    margin-top: 27px;
    font-size: 32px;
    color: #707070;
    font-weight: 500;
    font-family: Noto Sans KR;
    text-align: center;
    i {
      color: #FF0000;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #D6D6D6;
    :hover {
      background-color: #FFFAFA;
    }
    .num {
      margin-top: 8px;
      margin-bottom: 9px;
      margin-left: 10px;
      width: 48px;
      height: 25px;
      text-align: center;
      font-size: 17px;
      line-height: 35px;
      font-family: Noto Sans KR;
      font-weight: 300;
      letter-spacing: 0px;
      color: #AFAFAF;
      opacity: 1; 
    }
    .title {
      margin-top: 8px;
      margin-bottom: 9px;
      margin-left: 35px;
      width: 530px;
      height: 25px;
      text-align: left;
      font-size: 17px;
      line-height: 35px;
      font-family: Noto Sans KR;
      font-weight: 500;
      letter-spacing: 0px;
      color: #707070;
      opacity: 1; 
    }
    .nick_name {
      margin-top: 8px;
      margin-bottom: 9px;
      margin-left: 40px;
      min-width: 50px;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 25px;
      text-align: left;
      font-size: .95rem;
      line-height: 25px;
      font-family: Noto Sans KR;
      font-weight: 500;
      letter-spacing: 0px;
      color: #707070;
      opacity: 1; 
    }
    .date {
      margin-top: 8px;
      margin-bottom: 9px;
      margin-left: 40px;
      width: 116px;
      height: 25px;
      text-align: center;
      font-size: 13px;
      line-height: 35px;
      font-family: Noto Sans KR;
      font-weight: 300;
      letter-spacing: 0px;
      color: #AFAFAF;
      opacity: 1; 
    }
  }
`;
const Navi = styled.div`
  width: 810px;
  height: 26px;
  position: absolute;
  bottom: 50px;
  .inner {
    margin: auto;
    width: 273px;
    height: 100%;
  }
`;

class GroupBoardListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      count: 0,
      list: [],
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.reload !== this.props.reload) {
      this.getList();
    }
  }
  async getList() {
    const { page } = this.state;
    GetGroupBoardRequest(this.props.id, page)
      .then(data => {
        this.setState({ count: data.data.total, list: data.data.list });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { list, count, /*page*/ } = this.state;
    const per = 5;

    return (
      <Container>
        <Head>
          <div className="num">
            <p className="txt">번호</p>
          </div>
          <div className="title">
            <p className="txt">제목</p>
          </div>
          <div className="nick_name">
            <p className="txt">작성자</p>
          </div>
          <div className="date">
            <p className="txt">등록일(수정일)</p>
          </div>
        </Head>

        <List>
          {list && list.length > 0
            ? list.map(item => {
              return (<div className="row" key={item.uid} onClick={() => this.props.open(item)}>
                <div className="num">{item.uid}</div>
                <div className="title">{item.create_time !== item.update_time ? "[수정됨]" : null}{item.title}<span style={{ fontSize: ".8rem" }}>{item.comments > 0 ? " (" + item.comments + ")" : null}</span></div>
                <div className="nick_name" style={{ display: "flex", flexDirection: "row" }}>
                  {/* <img style={{ width: "25px", height: "25px", borderRadius: "100%" }} src={item.thumbnail || noface} /> */}
                  {item.nick_name}</div>
                <div className="date">{DateFormat(item.create_time)}({DateFormat(item.update_time)})</div>
              </div>)
            })
            : <div className="no-board">
              <i className="icon x" style={{ color: "#707070" }}></i>
              <p style={{ fontSize: "1.5rem" }}>등록된 글이 없습니다.</p>
            </div>}
        </List>

        <Navi>
          <div className="inner">

            {count > per
              ?
              <PaginationOpenDesign
                onChange={async (page) => {
                  await this.setState({ page: page - 1 });
                  this.getList();
                }}
                count={count}
                per={per} />
              :
              null}
          </div>
        </Navi>

      </Container>
    )
  }
}


export default GroupBoardListContainer;
