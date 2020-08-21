import React, { Component } from 'react';
import styled from "styled-components";
import {
  GetGroupNoticeListRequest, GetTotalCountGroupNoticeRequest,
} from "redux/modules/group";
import DateFormat from "modules/DateFormat";
// import { Pagination } from 'semantic-ui-react';

import icon_goto_first from "source/page-left-double-arrow.svg";
import icon_goto_prev from "source/page-left-single-arrow.svg";
import icon_goto_next from "source/page-right-single-arrow.svg";
import icon_goto_end from "source/page-right-double-arrow.svg";


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
    margin-left: 322px;
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
      font-size: 17px;
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
    if (prevProps.reload != this.props.reload) {
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
    const { list, count, page } = this.state;
    const per = 5;
    const totalPage = parseInt(count / per, 10) + 1;
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
            <p className="txt">등록일</p>
          </div>
        </Head>

        <List>
          {list && list.length > 0 ?
            list.map(noti => {
              return (<div className="row" key={noti.uid} onClick={() => this.props.open(noti)}>
                <div className="num">{noti.uid}</div>
                <div className="title">{noti.title}</div>
                <div className="date">{DateFormat(noti.create_time)}</div>
              </div>)
            })
            : <div className="no-notice"><i className="icon x"></i><p>등록된 공지사항이 없습니다.</p></div>}
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



const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  // *{border: 1px solid red;}
  *{cursor: default;}

  .arrows {
    width: 62px;
    display: flex;
    flex-direction: row;
    *{
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .ll{
      margin-right: 22px;
    }
    .r {
      margin-left: 20px;
      margin-right: 22px;
    }
    .blank{
      background-image: none;
    }
  }
  .pages {
    width: 146px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: row;

    .page {
      width: 10px;
      height: 26px;
      text-align: left;
      font-size: 17px;
      // line-height: 35px;
      font-weight: medium;
      font-family: Noto Sans KR;
      letter-spacing: 0px;
      opacity: 1;
      color: #707070;

      &.active{
        color: #FF0000;
        text-decoration: underline;
      }
      margin-right: 38px;
      &.last{
        margin-right: 0px;
      }
    }
  }




  .ll {
    width: 14px;
    height: 13px;
    background-image: url(${icon_goto_first});
  }
  .l {
    width: 6px;
    height: 13px;
    background-image: url(${icon_goto_prev});
  }
  .r {
    width: 6px;
    height: 13px;
    background-image: url(${icon_goto_next});
  }
  .rr {
    width: 15px;
    height: 13px;
    background-image: url(${icon_goto_end});
  }
`;
class PaginationOpenDesign extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 1, group: 0, per: 3, pages: 1, groups: 1, refresh: false };
    this.gotoFirstGroup = this.gotoFirstGroup.bind(this);
    this.gotoFinalGroup = this.gotoFinalGroup.bind(this);
    this.prevGroup = this.prevGroup.bind(this);
    this.nextGroup = this.nextGroup.bind(this);
    this.selectedPage = this.selectedPage.bind(this);
    this.cb = this.cb.bind(this);
  }
  componentDidMount() {
    const pages = { pages: Math.ceil((this.props.count / this.props.per)) };
    const groups = { groups: Math.ceil(((this.props.count / this.props.per) / this.state.per)) };
    // console.log(pages, groups, this.props, this.state);
    this.setState(pages);
    this.setState(groups);
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.count) !== JSON.stringify(this.props.count)) {
      this.setState({ refresh: !this.state.refresh });
    }
  }

  cb() {
    this.props.onChange && this.props.onChange(this.state.active + (this.state.group * this.state.per));
  }
  async gotoFinalGroup() {
    await this.setState({ group: this.state.groups - 1, active: this.state.pages % this.state.per });
    this.cb();
  }
  async gotoFirstGroup() {
    await this.setState({ group: 0, active: 1 });
    this.cb();
  }
  async prevGroup() {
    await this.setState({ group: this.state.group - 1, active: 1 });
    this.cb();
  }
  async nextGroup() {
    await this.setState({ group: this.state.group + 1, active: 1 });
    this.cb();
  }
  async selectedPage(nth) {
    await this.setState({ active: nth + 1 });
    this.cb();
  }

  render() {
    // console.log(this.state);

    return (<PaginationContainer refresh={this.state.refresh}>

      <div className="arrows">
        {/* << */}
        {this.state.group > 0
          ? <div onClick={this.gotoFirstGroup} className="ll"></div>
          : <div className="ll blank"></div>}
        {/* < */}
        {this.state.group > 0
          ? <div onClick={this.prevGroup} className="l"></div>
          : <div className="l blank"></div>}
      </div>

      {/* page */}
      <div className="pages">
        {Array.from(Array(this.state.per), (_, i) => {
          const { group, per, pages, active } = this.state;
          const num = i + (group * per);
          const cssactive = active === i + 1 ? " active" : "";
          const csslast = per === i + 1 ? " last" : "";
          const css = `page${cssactive}${csslast}`;

          return (num < pages)
            ? <div key={i} onClick={() => this.selectedPage(i)} className={css}>{num + 1}</div>
            : <div key={i} className={css}></div>
        })
        }
      </div>

      <div className="arrows">
        {/* > */}
        {this.state.groups - 1 != this.state.group
          ? <div onClick={this.nextGroup} className="r"></div>
          : <div className="r blank"></div>}

        {/* >> */}
        {this.state.groups - 1 != this.state.group ?
          <div onClick={this.gotoFinalGroup} className="rr"></div>
          : <div className=""></div>}
      </div>

    </PaginationContainer >);
  }
}