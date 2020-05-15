import React, { Component } from "react";
import host from "config";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/noimg.png";
import styled from "styled-components"
import { Pagination } from 'semantic-ui-react'

function ListElement({ item: { nick_name, email, imgURL, uid },item, handleTop,handleDel }) {
  // console.log("title",title);
  return <div style={{
      position: "relative",
      backgroundSize: "cover",
      backgroundImage: `url(${imgURL==null?noimg:imgURL.m_img})`,
      width: "150px",
      height: "150px",
      borderRadius: "5px",
      marginRight: "5px",
      marginBottom: "5px",
  }}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
          {/* <div
          onClick={() => handleTop(uid)}
          style={{
              cursor: "pointer",
              padding: "5px 10px",
              width: "max-content",
              color: "white",
              backgroundColor: "orange",
              borderRadius: "15px",
          }}>인기디자인</div> */}
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
          padding:"5px",
          backgroundColor: "#707070",
      }}>
          <div title={email} style={{
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
              {email}({uid})</div>
          <div title={nick_name} style={{
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
              {nick_name}</div>
      </div>
  </div>
}
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

// MANAGER
class DesignerManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ui
      loading: false,

      // list
      page: 0, max: 20,
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
  GetDesignerListRequest(page = 0, max = this.state.max, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/DesignerList/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(data => this.setState({ normal: data }))
        .catch(error => alert(error));
    });
  };
  GetDesignerListCountRequest(page = 0, max = this.state.max, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
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
  async goPage(activePage) {
    await this.setState({ page:activePage});
    const { page, max, cate1, cate2, sort, desc, startDate, endDate, keyword } = this.state;
    this.GetDesignerListRequest(activePage, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(startDate), getFormatDate(endDate), keyword ? keyword : "");
   }
  render() {
    console.log(this.props, this.state);

    const { max,normal, count, page, loading, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / max, 10);

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
      <MainBox>

        {/* loading */}
        {loading ? <Loading /> : null}

        {/* designer manager */}
        <div className="main">
          {/* title */}
          <h1>디자이너</h1>

            {/* filter */}
            
            <div>
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
                <DatePicker name="start" onChange={this.handleStartDateChange} value={this.state.startDate} minDate={new Date('1900-01-01')} /> ~
                <DatePicker name="start" onChange={this.handleEndDateChange} value={this.state.endDate} maxDate={new Date()} />
            </FilterBox>
            <FilterBox>
                <input placeholder="검색어"  className="textRgn" onChange={e => this.setState({ keyword: e.target.value })} value={keyword} />
                <button className="btn" onClick={this.search}>검색</button>
            </FilterBox>
            {/* list */}
            <ListBox>
              {normal && normal.length > 0 ?
                normal.map(item => {
                  return (
                    <ListElement item={item}
                    handleDel={this.DeleteDesignerRequest}/>
                  )
                  // <div key={item.uid} style={{ display: "flex", flexDirection: "row" }}>
                  //   <div><div style={{ width: "75px", height: "75px", borderRadius: "50%", backgroundImage: `url(${(item.imgURL && item.imgURL.m_img) || noimg}`, backgroundSize: "cover" }} /></div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.categoryName || "전체"}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.nick_name}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.email}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.create_time}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>{item.update_time}</div>
                  //   <div style={{ padding: "0px 10px", margin: "5px 15px" }}>
                  //     <div
                  //       onClick={() => this.DeleteDesignerRequest(item)}
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
                activePage={this.state.page+1}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={lastPage}
                onPageChange={(event,{activePage})=>{
                  this.goPage(activePage-1);
                }}
              />
            </div>


          </div>
        </div>
      </MainBox>

    )
  }
}

export default DesignerManager;

