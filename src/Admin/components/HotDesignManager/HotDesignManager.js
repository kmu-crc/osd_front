import React, { Component } from "react";
import host from "config";
import DesignReorderGrid from "./DesignReorderGrid";
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
class HotDesignManager extends Component {
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

      category1: [], cate1: 0,
      category2: [], cate2: 0,
    };
    this.GetDesignListRequest = this.GetDesignListRequest.bind(this);
    this.GetDesignListCountRequest = this.GetDesignListCountRequest.bind(this);
    this.GetSpecialDesignListRequest = this.GetSpecialDesignListRequest.bind(this);
    this.GetCategoryRequest = this.GetCategoryRequest.bind(this);
    this.UpdateDesignRequest = this.UpdateDesignRequest.bind(this);
    this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
    this.MakeTopDesign = this.MakeTopDesign.bind(this);
    this.EditSpecial = this.EditSpecial.bind(this);
    this.DeleteDesignRequest = this.DeleteDesignRequest.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeMainCate = this.onChangeMainCate.bind(this);
    this.onChangeSubCate = this.onChangeSubCate.bind(this);
    this.search = this.search.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  };
  componentDidMount() {
      this.GetSpecialDesignListRequest();
      this.setState({ editSpecial: true });
    // this.setState({ loading: true });
    // this.GetCategoryRequest()
    //   .then(obj => {
    //     this.setState({ category1: obj.category1, category2: obj.category2 });
    //   })
    // this.GetDesignListRequest();
    // this.GetDesignListCountRequest();
    // this.setState({ loading: false });
  };
  GetDesignListRequest(page = 0, max = 10, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/DesignList/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ normal: data }))
        .catch(error => alert(error));
    });
  };
  GetDesignListCountRequest(page = 0, max = 10, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/DesignListCount/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ count: data.cnt }))
        .catch(error => alert(error));
    });
  };
  GetSpecialDesignListRequest() {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/TopDesignList`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ special: data }))
        .catch(error => alert(error));
    })
  };
  GetCategoryRequest() {
    return new Promise(resolve => {
      fetch(`${host}/categorys/getCategoryAll`, { method: "GET" })
        .then((res) => {
          return res.json()
        }).then(function (res) {
          let category1 = res.data.category1.map(data => {
            return { text: data.name, value: data.uid }
          })
          category1.unshift({ text: '전체', value: 0 });
          let category2 = [];
          res.data.category2.map(data =>
            data.map(item => category2.push({ text: item.name, value: item.uid, parents_id: item.parents_id })));
          category2.unshift({ text: '전체', value: 0, parents_id: 0 });
          resolve({ category1: category1, category2: category2 });
        }).catch(err => console.error(err));
    })
  };
  UpdateDesignRequest(id, data, token) {
    return new Promise((resolve) => {
      if (data.type === "delete") {
        fetch(`${host}/admins/${id}/deleteTopDesign`, {
          headers: { 'x-access-token': token },
          method: "POST"
        })
          .then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else if (data.type === "insert") {
        fetch(`${host}/admins/${id}/insertTopDesign`, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { })
          .catch(err => console.error(err));
      }
      else {
        fetch(`${host}/admins/${id}/updateTopDesign`, {
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
    promiseAry = jobs.map(job => this.UpdateDesignRequest(job.uid, job.data, this.props.admin_token))
    await Promise.all(promiseAry);
    this.GetSpecialDesignListRequest();
  };
  MakeTopDesign(id) {
    this.UpdateDesignRequest(id, { type: "insert", order: this.state.special.length || 0 }, this.props.admin_token)
      .then(this.GetSpecialDesignListRequest())
      .then(this.GetDesignListRequest());
  }
  EditSpecial() {
    if (this.state.editSpecial) { //to off
      this.setState({ editSpecial: false, special: [] });
    }
    else { //to on
      this.GetSpecialDesignListRequest();
      this.setState({ editSpecial: true });
    }
  }
  DeleteDesignRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteDesign/${item.uid}`;
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
    선택하신 디자인을 삭제합니다.
    확인 차 아래 입력창에 디자인의 이름을 입력해주세요.\n
    디자인이름입력: ${item.title}\n`);
    (prompt === item.title) ?
      deleteRequest()
        .then(() => this.GetDesignListCountRequest())
        .then(() => this.GetDesignListRequest())
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
  onChangeMainCate(e, { value }) {
    this.setState({ cate1: value, cate2: 0 });
  }
  onChangeSubCate(e, { value }) {
    this.setState({ cate2: value });
  }
  async search() {
    const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    await this.setState({ page: 0 });
    this.GetDesignListRequest(this.state.page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goNext() {
    await this.setState({ page: this.state.page + 1 });
    const { page, max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    this.GetDesignListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { page, max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    this.GetDesignListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  render() {
    const { special, normal, count, page, loading, editSpecial, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / 10, 10);

    // category1
    const combocate1 =
      (category1 && category1.length > 0)
        ? category1.map(cate1 =>
          ({ text: cate1.text, value: cate1.value, key: cate1.value }))
        : [{ key: "-", value: "-", text: "-" }];
    // console.log(combocate1);

    // category2
    const combocate2 =
      (cate1 > 0 && category2 && category2.length > 0)
        ? category2.filter(cate2 => cate2.parents_id === cate1 || cate2.parents_id === 0)
          .map(cate2 => ({ text: cate2.text, value: cate2.value, key: cate2.value }))
        : [{ key: "-", value: "-", text: "-" }];
    // console.log(combocate2);

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
          <h1>인기디자인</h1>
          <DesignReorderGrid list={special} update={this.handleUpdateRequest} />
        </div>
      </div>

    )
  }
}

export default HotDesignManager;

