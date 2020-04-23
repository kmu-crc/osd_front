import React, { Component } from "react";
import host from "config";
import GroupReorderGrid from "./GroupReorderGrid";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/noimg.png";

function getFormatDate(date) {
  if (date == null) return;
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return year + '-' + month + '-' + day;
}
// MANAGER
class HotGroupManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,

      // list
      page: 0, max: 10,
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

  };
  componentDidMount() {
    // this.setState({ loading: true });
    // this.GetGroupListRequest();
    // this.GetGroupListCountRequest();
    // this.setState({ loading: false });
    this.GetSpecialGroupListRequest();
    this.setState({ editSpecial: true });
  };
  GetGroupListRequest(page = 0, max = 10, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/GroupList/${page}/${max}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ normal: data }))
        .catch(error => alert(error));
    });
  };
  GetGroupListCountRequest(page = 0, max = 10, sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
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
    this.GetGroupListRequest(this.state.page, max, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
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
  render() {
    const { special, normal, count, page, loading, editSpecial, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / 10, 10);

    // sort
    const combosort = [
      { key: "update", value: "update", text: "업데이트" },
      { key: "create", value: "create", text: "등록순" },
      { key: "title", value: "title", text: "제목" },
      { key: "like", value: "like", text: "인기순" }];
    // console.log(combosort);

    return (
      <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "auto", width: "max-content" }}>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* favorite design manager */}
        <div style={{ width: editSpecial ? "770px" : "150px", overflowX: "hidden",marginTop:"20px",marginBottom:"10px" }}>
          <h1>인기그룹</h1>
          <GroupReorderGrid list={special} update={this.handleUpdateRequest} />
        </div>
      </div>

    )
  }
}

export default HotGroupManager;

