import React, { Component } from "react";
import host from "config";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/thumbnail.png";
// import ScrollList from "components/Commons/ScrollList/ScrollList";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import Category from "components/Commons/Category";

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
`
const ListBox = styled.div`
  // border:1px solid black;
  width:780px;
  // height:max-content,
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  // justify-content:center;
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
function ListElement({ item: { nick_name, categoryName, type, imgURL, uid }, item, handleTop, handleDel }) {
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
        onClick={() => handleTop(uid)}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          width: "max-content",
          color: "white",
          backgroundColor: "orange",
          borderRadius: "15px",
        }}>인기아이템</div>
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
      <div title={categoryName + "," + type} style={{
        padding: "1px 2px",
        fontSize: "12px",
        height: "16px",
        width: "100%",
        color: "white",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <div>{categoryName}</div>
        <div>{type === "designer" ? "디자이너" : "메이커"}</div>
      </div>
    </div>
  </div>
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
    this.UpdateHotExpertRequest = this.UpdateHotExpertRequest.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeMainCate = this.onChangeMainCate.bind(this);
    this.onChangeSubCate = this.onChangeSubCate.bind(this);
    this.MakeTopExpert = this.MakeTopExpert.bind(this);
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
  UpdateHotExpertRequest(id, data, token) {
    return new Promise(resolve => {
      if (data.type === "insert") {
        const url = `${host}/admins/${id}/designer/insertTopExpert`;
        console.log(url);
        fetch(url, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => resolve(res))
          .catch(err => console.error(err));
      }

    });
  };
  MakeTopExpert(id) {
    this.UpdateHotExpertRequest(id, { type: "insert", order: this.state.normal.length || 0 }, this.props.admin_token)
      .then(
        () => {
          const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
          this.GetDesignerListRequest(0, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
        }
      )
  }
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
  async onChangeMainCate(value) {
    this.setState({
      cate1: value,
      cate2: 0
    });
    const { max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    await this.setState({ page: 0 });
    console.log(startDate)
    this.GetDesignerListRequest(this.state.page, max, value, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
 
  }
  async onChangeSubCate(parents_id,value) {
    this.setState({
      cate2: value
    });
    const { max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    await this.setState({ page: 0 });
    console.log(startDate)
    this.GetDesignerListRequest(this.state.page, max, cate1, value, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
 
  }
  resetCate = () => {
    this.props.history.replace(`/designManage/${this.props.sort}`);
    this.changeState();
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
    // console.log(this.props, this.state);

    const { special, addNormal, normal, count, page, loading, editSpecial, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / this.state.max, 10) + 1;

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


    // console.log(this.state.count);
    return (
      <MainBox>
        {/* loading */}
        {loading ? <Loading /> : null}

        {/* designer manager */}
        <div className="main">
          {/* title */}
          <h1>디자이너</h1>
          <div>
          <Category
              handleCate2={this.onChangeSubCate} 
              handleCate1={this.onChangeMainCate} 
              resetCate={this.resetCate}
              cate1={cate1} 
              cate2={cate2}
              category1={category1} 
              category2={category2}
              />
          </div>
          <div>
            {/* filter */}
            <FilterBox>
              {/* <Dropdown
                compact
                selection
                defaultValue={cate1}
                options={combocate1}
                onChange={this.onChangeMainCate}
              />
              <Dropdown
                compact
                selection
                defaultValue={cate2}
                options={combocate2}
                onChange={this.onChangeSubCate}
              /> */}
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
              {/* <div style={{ padding: "10px 5px", }}> */}
              <DatePicker className="s_margin" name="start" onChange={this.handleStartDateChange} value={this.state.start} minDate={new Date('1900-01-01')} /> ~
    {/* </div> */}
              {/* <div style={{ padding: "10px 5px", }}> */}
              <DatePicker className="s_margin" name="start" onChange={this.handleEndDateChange} value={this.state.end} maxDate={new Date()} />
              {/* </div> */}

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
                    <ListElement
                      key={item.uid}
                      item={item}
                      handleTop={this.MakeTopExpert}
                      handleDel={this.DeleteDesignRequest} />
                  )
                })
                : <div>데이터가 없습니다.</div>}
            </ListBox>
          </div>
          <div className="pageRange">
            <div>
              {count <= 10 ? null :
                <Pagination
                  activePage={this.state.page}
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

export default DesignerManager;

