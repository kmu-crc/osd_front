import React, { Component } from "react";
import host from "config";
import GroupReorderGrid from "./GroupReorderGrid";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/noimg.png";
import styled from "styled-components"
import { Pagination } from 'semantic-ui-react'

const MainBox = styled.div`
// *{
//   border:1px solid black;
// }
  display:flex;
  width:max-content;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;
  .main{
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
    p{
      font-size: 20px;
      height: 12px;
      vertical-align: middle;
    }
  }
`

const ListBox = styled.div`
// border:1px solid black;
  width:780px;
  // height:max-content,
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:center;
  margin-top:30px;

`

function getFormatDate(date) {
  if (date == null) return;
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return year + '-' + month + '-' + day;
}
function ListElement({ item: { userName, title, thumbnailUrl, uid }, handleTop, handleDel }) {
  // console.log("title",title);
  return <div style={{
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: `url(${thumbnailUrl == null ? noimg : thumbnailUrl.m_img})`,
    width: "150px",
    height: "150px",
    borderRadius: "5px",
    marginRight: "5px",
    marginBottom: "5px",
  }}>
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
      <div
        onClick={() => handleTop(uid)}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          width: "max-content",
          color: "white",
          backgroundColor: "orange",
          borderRadius: "15px",
        }}>인기디자인</div>
      <div
        onClick={() => handleDel(uid)}
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
      <div title={title} style={{
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
        {title}({uid})</div>
      <div title={userName} style={{
        padding: "1px 2px",
        fontSize: "12px",
        height: "16px",
        width: "100%",
        color: "white",
        wordWrap: "break-word",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textAlign: "right"
      }}>
        {userName}</div>
    </div>
  </div>
}
// MANAGER
class GroupManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,

      // list
      page: 0, max: 20,
      editSpecial: false,
      special: [], normal: [],
      count: null,

      // filter
      keyword: "",
      desc: true, sort: "update",
      startDate: null, endDate: null, //new Date('1900-01-01'), new Date()
    };

    this.GetGroupListRequest = this.GetGroupListRequest.bind(this);
    this.GetGroupListCountRequest = this.GetGroupListCountRequest.bind(this);
    this.GetSpecialGroupListRequest = this.GetSpecialGroupListRequest.bind(this);
    this.UpdateGroupRequest = this.UpdateGroupRequest.bind(this);
    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
    this.MakeTopGroup = this.MakeTopGroup.bind(this);
    this.EditSpecial = this.EditSpecial.bind(this);
    this.DeleteGroupRequest = this.DeleteGroupRequest.bind(this);
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
    this.GetGroupListRequest();
    this.GetGroupListCountRequest();
    this.setState({ loading: false });
  };
  GetGroupListRequest(page = 0, max = this.state.max, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/GroupList/${page}/${max}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => {
          this.setState({ normal: data });
          resolve(true);
        })
        .catch(error => alert(error));
    });
  };
  GetGroupListCountRequest(page = 0, max = this.state.max, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/GroupListCount/${page}/${max}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ count: data.cnt }))
        .catch(error => alert(error));
    });
  };
  GetSpecialGroupListRequest() {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/TopGroupList`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ special: data }))
        .catch(error => alert(error));
    })
  };
  UpdateGroupRequest(id, data, token) {
    return new Promise((resolve) => {
      if (data.type === "delete") {
        fetch(`${host}/admins/${id}/deleteTopGroup`, {
          headers: { 'x-access-token': token },
          method: "POST"
        })
          .then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else if (data.type === "insert") {
        fetch(`${host}/admins/${id}/insertTopGroup`, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else {
        fetch(`${host}/admins/${id}/updateTopGroup`, {
          headers: { "x-access-token": token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      resolve();
    });
  };
  async handleUpdateRequest(jobs) {
    // console.log(jobs); return;
    let promiseAry = [];
    promiseAry = jobs.map(job => this.UpdateGroupRequest(job.uid, job.data, this.props.admin_token))
    await Promise.all(promiseAry);
    this.GetSpecialGroupListRequest();
  };
  MakeTopGroup(id) {
    this.UpdateGroupRequest(id, { type: "insert", order: this.state.special.length || 0 }, this.props.admin_token)
      .then(this.GetSpecialGroupListRequest())
      .then(this.GetGroupListRequest());
  }
  EditSpecial() {
    if (this.state.editSpecial) { //to off
      this.setState({ editSpecial: false, special: [] });
    }
    else { //to on
      this.GetSpecialGroupListRequest();
      this.setState({ editSpecial: true });
    }
  }
  DeleteGroupRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteGroup/${item.uid}`;
        console.log(url);
        fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.props.admin_token
          },
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => data.success ? alert("삭제성공") : alert("삭제실패"))
          .catch(error => alert(error));
      });
    }
    const prompt = window.prompt(`
    선택하신 그룹을 삭제합니다.
    확인 차 아래 입력창에 디자인의 이름을 입력해주세요.\n
    그룹이름 입력: ${item.title}\n`);
    (prompt === item.title) ?
      deleteRequest()
        .then(() => this.GetGroupListCountRequest())
        .then(() => this.GetGroupListRequest())
      : alert("잘못입력하셨습니다.");
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
    this.setState({ sort: value });
  }
  async search() {
    const { max, sort, desc, start, end, keyword } = this.state;
    await this.setState({ page: 0 });
    this.GetGroupListRequest(this.state.page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "")
      .then(() => {
        this.GetGroupListCountRequest(this.state.page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "")
      })
  }
  async goNext() {
    await this.setState({ page: this.state.page + 1 });
    const { page, max, sort, desc, start, end, keyword } = this.state;
    this.GetGroupListRequest(page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { page, max, sort, desc, start, end, keyword } = this.state;
    this.GetGroupListRequest(page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goPage(activePage) {
    // console.log(this.state.page);
    await this.setState({ page: activePage });
    // console.log(this.state.page);
    const { page, max, sort, desc, start, end, keyword } = this.state;
    this.GetGroupListRequest(page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  render() {
    const { special, normal, count, page, loading, editSpecial, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / this.state.max, 10) + 1;

    // sort
    const combosort = [
      { key: "update", value: "update", text: "업데이트" },
      { key: "create", value: "create", text: "등록순" },
      { key: "title", value: "title", text: "제목" },
      { key: "like", value: "like", text: "인기순" }];
    // console.log(combosort);

    return (
      <MainBox>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* normal design manager */}
        <div className="main">
          {/* title */}
          <h1>그룹</h1>

          <div>
            {/* filter */}
            <FilterBox>
              {/* <div style={{ padding: "10px 5px", }}> */}

              {/* </div> */}
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
                <p>기간:</p>
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
                    <ListElement item={item}
                      handleTop={this.MakeTopGroup}
                      handleDel={this.DeleteGroupRequest} />
                  )
                  // return <div key={item.uid} style={{ display: "flex", flexDirection: "row" }}>
                  //   <div>
                  //     <div
                  //       onClick={() => this.MakeTopGroup(item.uid)}
                  //       style={{ backgroundColor: "orange", color: "white", width: "100%", textAlign: "center", cursor: "pointer", borderRadius: "15px", padding: "3px 10px" }}
                  //     >인기그룹 등록</div></div>
                  //   <div><div style={{ width: "75px", height: "75px", borderRadius: "25%", backgroundImage: `url(${(item.thumbnailUrl && item.thumbnailUrl.m_img) || noimg}`, backgroundSize: "cover" }} /></div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.title}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.userName}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.create_time}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.update_time}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>
                  //     <div
                  //       onClick={() => this.DeleteGroupRequest(item)}
                  //       style={{ backgroundColor: "red", color: "white", width: "max-content", textAlign: "center", cursor: "pointer", borderRadius: "15px", padding: "3px 20px" }}
                  //     >삭제</div></div>
                  // </div>;
                })
                : <div>데이터가 없습니다.</div>}
            </ListBox>
          </div>

          <div className="pageRange">
            <div>
              <Pagination
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
            </div>


          </div>
        </div>
      </MainBox>

    )
  }
}

export default GroupManager;

