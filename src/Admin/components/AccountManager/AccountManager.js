import React, { Component } from "react";
import host from "config";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/thumbnail.png";
// import ScrollList from "components/Commons/ScrollList/ScrollList";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import Account from "Admin/Commons/Account/Account"
const MainBox = styled.div`
  // *{
  //   border:1px solid black;
  // }
  display:flex;
  width:1350px;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;
  .main{
    width:100%;
    margin-top:20px;
    margin-bottom:10px;
  }
  .pageRange{
    width:100%;
    margin-left:auto;
    margin-right:auto;
    margin-top:30px;
    display:flex;
    justify-content:center;
    
  }
`
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
`
const ListBox = styled.div`
  // border:1px solid black;
  width:100%;
  // height:max-content,
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  // justify-content:center;
  margin-top:30px;
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
function ListElement({ item: { nick_name, categoryName, type, imgURL, uid }, item, handleDel }) {
  console.log("item::", item);

  return <div style={{
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: `url(${(imgURL && imgURL.m_img) || noimg})`,
    width: "150px",
    height: "150px",
    borderRadius: "5px",
    marginRight: "5px",
    marginBottom: "5px",
  }}>
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
      <div
        onClick={() => handleDel(item)}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          marginLeft: "auto",
          width: "max-content",
          color: "white",
          backgroundColor: "red",
          borderRadius: "15px",
        }}>삭제</div>
    </div>
    <div style={{
      bottom: "0px",
      width: "100%",
      position: "absolute",
      padding: "5px",
      backgroundColor: "#707070",
    }}>
      <div title={nick_name} style={{
        padding: "1px 2px",
        fontSize: "16px",
        height: "20px",
        width: "100%",
        color: "white",
        wordWrap: "break-word",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }}>
        {nick_name}</div>
    </div>
  </div >
}
// MANAGER
class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,

      // list
      page: 0, max: 10,
      normal: [],
      count: null,

      // filter
      keyword: "",
      desc: true, sort: "update",
      startDate: null, endDate: null, //new Date('1900-01-01'), new Date()

    };
    this.GetAccountListRequest = this.GetAccountListRequest.bind(this);
    this.GetAccountListCountRequest = this.GetAccountListCountRequest.bind(this);
    this.DeleteAccountRequest = this.DeleteAccountRequest.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.search = this.search.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.goPage = this.goPage.bind(this);
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.GetAccountListRequest();
    this.GetAccountListCountRequest();
    this.setState({ loading: false });
  };
  GetAccountListRequest(page = 0, max = this.state.max, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/AccountList/${page}/${max}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ normal: data }))
        .catch(error => alert(error));
    });
  };
  GetAccountListCountRequest(page = 0, max = this.state.max, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/AccountListCount/${page}/${max}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => {
          this.setState({ count: data.cnt });
          resolve(true);
        })
        .catch(error => alert(error));
    });
  };
  DeleteAccountRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteAccount/${item.uid}`;
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
                            선택하신 회원을 삭제합니다.
                            확인 차 아래 입력창에 회원의 이름을 입력해주세요.\n
                            회원 이름입력: ${item.nick_name}\n`);

    if (prompt === item.nick_name) {
      deleteRequest()
        .then(() => this.GetAccountListCountRequest())
        .then(() => this.GetAccountListRequest());
    } else {
      alert("잘못입력하셨습니다.");
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
  async search() {
    const { max, sort, desc, startDate, endDate, keyword } = this.state;
    await this.setState({ page: 0 });
    console.log(startDate)
    this.GetAccountListRequest(this.state.page, max, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goNext() {
    await this.setState({ page: this.state.page + 1 });
    const { page, max, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetAccountListRequest(page, max, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { page, max, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetAccountListRequest(page, max, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goPage(activePage) {
    // alert(activePage);
    await this.setState({ page: activePage });
    const { page, max, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetAccountListRequest(activePage, max, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  render() {
    const { normal, count, loading, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / this.state.max, 10) + 1;

    // sort
    const combosort = [
      { key: "update", value: "update", text: "업데이트" },
      { key: "create", value: "create", text: "등록일" },
      { key: "nick_name", value: "nick_name", text: "닉네임" },
    ];

    return (
      <MainBox>
        {/* loading */}
        {loading ? <Loading /> : null}

        {/* account manager */}
        <div className="main">
          {/* title */}
          <h1>회원</h1>

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
                  // console.log(item);
                  return (
                    <Account
                      key={item.uid}
                      data={item}
                      removeLabel={"삭제"}
                      handleDel={this.DeleteAccountRequest} />
                  )
                })
                : <div>데이터가 없습니다.</div>}
            </ListBox>
          </div>
          <div className="pageRange">
            <div>
              {count <= this.state.max ? null :
                <Pagination
                  activePage={this.state.page + 1}
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
                />
              }
            </div>
          </div>
        </div>
      </MainBox>
    )
  }
}

export default AccountManager;

