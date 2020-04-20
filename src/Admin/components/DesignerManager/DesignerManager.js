import React, { Component } from "react";
import host from "config";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/thumbnail.png";

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
class DesignerManager extends Component {
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

      category1: [], cate1: 0,
      category2: [], cate2: 0,
    };
    this.GetDesignerListRequest = this.GetDesignerListRequest.bind(this);
    this.GetDesignerListCountRequest = this.GetDesignerListCountRequest.bind(this);
    this.GetCategoryRequest = this.GetCategoryRequest.bind(this);
    this.DeleteDesignerRequest = this.DeleteDesignerRequest.bind(this);
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
    this.setState({ loading: true });
    this.GetCategoryRequest()
      .then(obj => {
        this.setState({ category1: obj.category1, category2: obj.category2 });
      })
    this.GetDesignerListRequest();
    this.GetDesignerListCountRequest();
    this.setState({ loading: false });
  };
  GetDesignerListRequest(page = 0, max = 10, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/DesignerList/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ normal: data }))
        .catch(error => alert(error));
    });
  };
  GetDesignerListCountRequest(page = 0, max = 10, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/DesignerListCount/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ count: data.cnt }))
        .catch(error => alert(error));
    });
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
  DeleteDesignerRequest(item) {
    const deleteRequest = () => {
      return new Promise((resolve, reject) => {
        const url = `${host}/admins/DeleteDesigner/${item.uid}`;
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
              resolve(true);
              alert("삭제성공");
            } else {
              reject(false);
              alert("삭제실패");
            }
          })
          .catch(error => alert(error));
      });
    }
    const prompt = window.prompt(`
                            선택하신 디자이너를 삭제합니다.
                            확인 차 아래 입력창에 디자인의 이름을 입력해주세요.\n
                            디자이너 이름입력: ${item.nick_name}\n`);

    if (prompt === item.nick_name) {
      deleteRequest();
      this.GetDesignerListCountRequest();
      this.GetDesignerListRequest();
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
  onChangeMainCate(e, { value }) {
    this.setState({
      cate1: value,
      cate2: 0
    });
  }
  onChangeSubCate(e, { value }) {
    this.setState({
      cate2: value
    });
  }
  async search() {
    const { max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    await this.setState({ page: 0 });
    console.log(startDate)
    this.GetDesignerListRequest(this.state.page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goNext() {
    await this.setState({ page: this.state.page + 1 });
    const { page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetDesignerListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetDesignerListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
  }

  render() {
    console.log(this.props, this.state);

    const { normal, count, page, loading, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
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


    console.log(this.state.count);
    return (
      <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "auto", width: "max-content" }}>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* designer manager */}
        <div>
          {/* title */}
          <h1>디자이너</h1>

          <div style={{ width: "max-content", marginLeft: "auto", marginRight: "auto" }}>
            {/* filter */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: "10px 5px", }}>
                <Dropdown
                  defaultValue={cate1}
                  options={combocate1}
                  onChange={this.onChangeMainCate}
                />
              </div>
              <div style={{ padding: "10px 5px", }}>
                <Dropdown
                  defaultValue={cate2}
                  options={combocate2}
                  onChange={this.onChangeSubCate}
                />
              </div>

              <div style={{ padding: "10px 5px", }}>
                <input onChange={e => this.setState({ keyword: e.target.value })} value={keyword} />keyword</div>
              <div style={{ padding: "10px 5px", }}>
                <Dropdown
                  defaultValue={sort}
                  options={combosort}
                  onChange={this.onChangeSort}
                />
              </div>
              <div
                onClick={() => this.setState({ desc: !desc })}
                style={{ padding: "10px 5px", }}>
                {desc
                  ? <div>내림차순 ▼</div>
                  : <div>오림차순 △</div>}
                {/* ▲ ▽  */}
              </div>
              <div style={{ padding: "10px 5px", }}>
                <DatePicker name="start" onChange={this.handleStartDateChange} value={this.state.startDate} minDate={new Date('1900-01-01')} /> ~
                </div>
              <div style={{ padding: "10px 5px", }}>
                <DatePicker name="start" onChange={this.handleEndDateChange} value={this.state.endDate} maxDate={new Date()} />
              </div>
              <div>
                <button onClick={this.search}>검색</button>
              </div>
            </div>

            {/* list */}
            <div>
              {normal && normal.length > 0 ?
                normal.map(item => {
                  return <div key={item.uid} style={{ display: "flex", flexDirection: "row" }}>
                    <div><div style={{ width: "75px", height: "75px", borderRadius: "50%", backgroundImage: `url(${(item.imgURL && item.imgURL.m_img) || noimg}`, backgroundSize: "cover" }} /></div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.categoryName || "전체"}</div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.nick_name}</div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.email}</div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.create_time}</div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.update_time}</div>
                    <div style={{ padding: "0px 10px", margin: "5px 15px" }}>
                      <div
                        onClick={() => this.DeleteDesignerRequest(item)}
                        style={{ backgroundColor: "red", color: "white", width: "max-content", textAlign: "center", cursor: "pointer", borderRadius: "15px", padding: "3px 20px" }}
                      >삭제</div></div>
                  </div>;
                }) : <div>데이터가 없습니다.</div>}
            </div>
          </div>

          <div>

            <div style={{ width: "max-content", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row" }}>
              <div style={{ width: "50px" }}>
                {page > 0 ? <div onClick={this.goPrev}>prev</div> : null}
              </div>
              <div style={{ width: "50px" }}>
                <div style={{ textAlign: "center", borderRadius: "15px" }}>{this.state.page + 1}</div>
              </div>
              <div style={{ width: "50px" }}>
                {lastPage > page + 1 ? <div onClick={this.goNext}>next</div> : null}
              </div>
            </div>

          </div>
        </div>
      </div>

    )
  }
}

export default DesignerManager;

