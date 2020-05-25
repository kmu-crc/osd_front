import React, { Component } from "react";
import host from "config";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import Category from "components/Commons/Category";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import DateFormat from "modules/DateFormat";

const MainBox = styled.div`
  display:flex;
  width:1350px;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;

  .main {
    width:100%;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .pageRange {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
`;
const FilterBox = styled.div`
  display:flex;
  align-items:center;
  .s_padding{
    padding:10px;
  }
  .s_margin{
    margin:10px;
  }
  .textRgn{
    height:29px;
    width:300px;
  }
  .btn{
    width:100px;
    height:29px;
    display:flex;
    align-item:center;
    justify-content:center;
    padding:5px;
  }
  .range-box {
    text-align: center;
    display: flex;
    align-items:center;
    .classic{
      font-size:17px;
      margin-left:10px;
      vertical-align: middle;
    }
    p{
      font-size: 20px;
      height: 12px;
      vertical-align: middle;
    }
  }
`;
const ListBox = styled.div`
  width:100%;
  margin-top:30px;
  // display:flex;
  // flex-direction:row;
  // flex-wrap:wrap;
`;
const ThumbnailWriter = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-size: contain;
  background-image: url(${props => props.src ? props.src : profile});
  margin-right:10px;
`;
const ListElementWrapper = styled.div`
  margin: 0 auto 0.9rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
  align-items:center;
  cursor: default;
  .non-status-box{
    margin-left:5px;
  }
  .status-box{
    min-width: 80px;
    line-height: 15px;
    font-family: Noto Sans KR;
    font-weight: 500;
    padding: 7px 15px 7px 15px;
    border-radius: 15px;
    margin-right: 10px;
    display:flex;
    justify-content:center;
    align-itmes:center;
    &.request {
      background: hotpink;
      color: white;
    }
    &.response {
      // margin-left: 5px;
      background: blue;
      color: white;
    }
    &.completed {
      background: gray;
      color: white;
    }
  }
  .title_{
    min-width:67%;
    display:flex;
    align-items:center;
    padding:5px;
  }
  .writer{
    width: 20%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
  }
  .date{
    width: max-content;
    align-items: center;
    padding: 5px;
  }
  .del {
    height: 25px;
    width: 75px;
    color: white;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    margin-left: auto;
    margin-right: 25px;
    border-radius: 15px;
    background-color: red;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`;
const TabContainer = styled.div`
  cursor: default;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  line-height: 29px;
  .element {
    margin-right: 25px;
  }
  .active {
    color: #FF0000;
  }
`;
function getFormatDate(date) {
  if (date == null) return;
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return year + '-' + month + '-' + day;
}
function ListElement({ item: item, handleDel }) {
  return <ListElementWrapper left={item.status === "response" ? 25 : 0}>
    <div className="title_" style={{ display: "flex", flexDirection: "row" }}>
      {item.completed === 1 && item.status === "request" ?
        <div className="status-box completed" >완료</div> : null}
      {item.status === "normal"
        ? <div className="non-status-box" />
        // <div className="status-box"></div>
        : item.status === "request"
          ? <div className="status-box request">{item.type === 'maker' ? '제작' : '디자인'} 의뢰</div>
          : item.status === "response" ?
            <React.Fragment>
              <Icon size="small" name="reply" style={{ color: "black", transform: "rotate(180deg)" }} />
              <div className="status-box response">{item.type === 'maker' ? '제작' : '디자인'} 응답</div>
            </React.Fragment> : ""}
      {item.title || "글 제목"}
    </div>

    {item.status == "response" ?
      <div className="writer">
        <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
        <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
      </div>
      :
      <div className="writer">
        <div style={{ border: "1px solid transparent" }}><ThumbnailWriter src={item.imgURL} /></div>
        <div style={{ border: "1px solid transparent" }}>{item.nick_name}</div>
      </div>
    }

    <div className="date">{DateFormat(item.create_time)}</div>
    <div className="del" onClick={() => handleDel(item)}><div>삭제</div></div>
  </ListElementWrapper>
}
// MANAGER
class RequestManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,

      // list
      page: 0, max: 10,
      type: "designer",
      normal: [],
      count: null,

      // filter
      keyword: "",
      desc: true, sort: "update",
      startDate: null, endDate: null, //new Date('1900-01-01'), new Date()
      category1: [], cate1: 0,
      category2: [], cate2: 0,
    };
    this.GetRequestListRequest = this.GetRequestListRequest.bind(this);
    this.GetCategoryRequest = this.GetCategoryRequest.bind(this);
    this.DeleteRequestRequest = this.DeleteRequestRequest.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeMainCate = this.onChangeMainCate.bind(this);
    this.onChangeSubCate = this.onChangeSubCate.bind(this);
    this.search = this.search.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.goPage = this.goPage.bind(this);
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.GetCategoryRequest()
      .then(obj => {
        this.setState({ category1: obj.category1, category2: obj.category2 });
      })
    this.GetRequestListRequest();
    this.setState({ loading: false });
  };

  GetRequestListRequest(page = 0, max = this.state.max, type = "designer", cate1 = "null", cate2 = "null", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise(resolve => {
      const url = `${host}/admins/RequestList/${page}/${max}/${type}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => {
          this.setState({ normal: data.data.requests, count: data.data.total });
          resolve(true);
        })
        .catch(error => alert(error));
    });
  };
  GetCategoryRequest() {
    return new Promise(resolve => {
      fetch(`${host}/categorys/getCategoryAll`, { method: "GET" })
        .then((res) => {
          return res.json()
        }).then(function (res) {
          console.log(res);
          let category1 = res.data.category1.map(data => {
            return { text: data.name, value: data.uid }
          })
          category1.unshift({ text: '전체', value: 0 });
          let category2 = [];
          res.data.category2.map(item => category2.push({ text: item.name, value: item.value, parents_id: item.parents_id }));
          // data.map(item => category2.push({ text: item.name, value: item.uid, parents_id: item.parents_id })));
          category2.unshift({ text: '전체', value: 0, parents_id: 0 });
          console.log("category_test:end")
          resolve({ category1: category1, category2: category2 });
        }).catch(err => console.error(err));
    })
  };
  DeleteRequestRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteRequest/${item.uid}`;
        console.log(url);
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.props.admin_token
          },
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("삭제성공");
              resolve(true);
            } else {
              alert("삭제실패");
              reject(false);
            }
          })
          .catch(error => alert(error));
      });
    }
    const prompt = window.prompt(`
      선택하신 게시글을 삭제합니다.
      확인 차 아래 입력창에 게시글 제목을 입력해주세요.\n
      게시글 이름입력: ${item.title}\n`);

    if (prompt === item.title) {
      deleteRequest()
        .then(() => this.GetRequestListRequest())
    } else {
      alert("삭제가 취소되습니다.");
    }
  }
  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }
  onChangeSort(e, { value }) {
    this.setState({
      sort: value
    });
  }
  async onChangeMainCate(value) {
    await this.setState({ cate1: value, cate2: null, page: 0 });
    const { page, max, type, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetRequestListRequest(this.state.page, max, type, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async onChangeSubCate(parents_id, value) {
    await this.setState({ cate2: value, page: 0 });
    const { page, max, type, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetRequestListRequest(page, max, type, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  resetCate = () => {
    this.props.history.replace(`/requestManage`);
    this.changeState();
  }
  async search() {
    const { max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    await this.setState({ page: 0 });
    console.log(startDate)
    this.GetMakerListRequest(this.state.page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goNext() {
    await this.setState({ page: this.state.page + 1 });
    const { page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetMakerListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { type, page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetMakerListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goPage(go) {
    await this.setState({ page: go });
    const { type, page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetRequestListRequest(page, max, type, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async changeTab(pType) {
    this.setState({ type: pType });
    const { page, max, type, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetRequestListRequest(page, max, type, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  render() {
    const { max, type, normal, count, loading, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / max, 10) + 1;

    // sort
    const combosort = [
      { key: "update", value: "update", text: "업데이트" },
      { key: "create", value: "create", text: "등록일" },
      { key: "title", value: "title", text: "제목" },
    ];

    return (<MainBox>
      {/* loading */}
      {loading ? <Loading /> : null}
      {/* designer manager */}
      <div className="main">
        {/* title */}
        <h1>게시글</h1>
        <TabContainer>
          <div className={type === "designer" ? "element active" : "element"} onClick={() => this.changeTab("designer")}>디자이너</div>
          <div className={type === "maker" ? "element active" : "element"} onClick={() => this.changeTab("maker")}>메이커</div>
          <div className={type === "item" ? "element active" : "element"} onClick={() => this.changeTab("item")}>아이템</div>
          <div className={type === "normal" ? "element active" : "element"} onClick={() => this.changeTab("normal")}>일반</div>
        </TabContainer>

        <div>
          <Category
            handleCate2={this.onChangeSubCate}
            handleCate1={this.onChangeMainCate}
            resetCate={this.resetCate}
            cate1={cate1}
            cate2={cate2}
            category1={category1}
            category2={category2} />
        </div>

        <div>
          {/* filter */}
          <FilterBox>
            <Dropdown
              compact
              selection
              defaultValue={sort}
              options={combosort}
              onChange={this.onChangeSort}
            />
            <div
              onClick={() => this.setState({ desc: !desc })}
              className="s_padding">
              {desc
                ? <div>내림차순 ▼</div>
                : <div>오림차순 △</div>}
              {/* ▲ ▽  */}
            </div>
            <div className="range-box">
              <div className="classic">기간</div>
              <DatePicker className="s_margin" name="start" onChange={this.handleStartDateChange} value={this.state.startDate} minDate={new Date('1900-01-01')} />
              <p>~</p>
              <DatePicker className="s_margin" name="start" onChange={this.handleEndDateChange} value={this.state.endDate} maxDate={new Date()} />
            </div>

          </FilterBox>
          <FilterBox>
            <input className="textRgn" placeholder="검색어" onChange={e => this.setState({ keyword: e.target.value })} value={keyword} />
            <button className="btn" onClick={this.search}>검색</button>
          </FilterBox>

          {/* list */}
          <ListBox>
            {normal && normal.length > 0 ?
              normal.map(item => {
                return (
                  <ListElement
                    key={item.uid}
                    handleDel={this.DeleteRequestRequest}
                    item={item} />)
              })
              : <div>데이터가 없습니다.</div>}
          </ListBox>
        </div>

        <div className="pageRange">
          <div>
            {count <= max ? null :
              <Pagination
                // activePage={this.state.page}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={lastPage}
                onPageChange={(event, { activePage }) => {
                  this.goPage(activePage - 1);
                }}
              />}

          </div>
        </div>
      </div>
    </MainBox>)
  }
}

export default RequestManager;

