import React, { Component } from 'react';
import styled from "styled-components";
import {
  GetGroupNoticeListRequest, GetTotalCountGroupNoticeRequest,
} from "redux/modules/group";
import DateFormat from "modules/DateFormat";
// import { Pagination } from 'semantic-ui-react';
import PaginationOpenDesign from "components/Commons/PaginationOpenDesign";

const Container = styled.div``;
const Head = styled.div`
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
    margin-left: 44px;
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
    margin-left: 291px;
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
    margin-left: 300px;
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
  *{cursor: default;}
  .no-notice{
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
      margin-left: 34px;
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
      margin-left: 40px;
      width: 522px;
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

class GroupListContainer extends Component {
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
    GetTotalCountGroupNoticeRequest(this.props.id)
      .then(data => this.setState({ count: data.data }))
      .catch(err => console.error(err));
    GetGroupNoticeListRequest(this.props.id, this.state.page)
      .then(data => this.setState({ list: data.data }))
      .catch(err => console.error(err));
  }

  render() {
    const { list, count, /*page*/ } = this.state;
    const per = 5;
    // const totalPage = parseInt(count / per, 10) + 1;
    // console.log(totalPage);
    return (
      <Container>
        <Head>
          <div className="num">
            <p className="txt">번호</p>
          </div>
          <div className="title">
            <p className="txt">제목</p>
          </div>
          <div className="date">
            <p className="txt">등록일(수정일)</p>
          </div>
        </Head>

        <List>
          {list && list.length > 0 ?
            list.map(noti => {
              return (<div className="row" key={noti.uid} onClick={() => this.props.open(noti)}>
                <div className="num">{noti.uid}</div>
                <div className="title">{noti.title}</div>
                <div className="date">{DateFormat(noti.create_time)}({DateFormat(noti.update_time)})</div>
              </div>)
            })
            : <div className="no-notice">
              {/* <i className="icon x"></i> */}
              <p>등록된 공지사항이 없습니다.</p></div>}
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

export default GroupListContainer;
