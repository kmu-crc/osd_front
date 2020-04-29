import React, { Component } from "react";
import host from "config";
import DesignReorderGrid from "./DesignReorderGrid";
import Loading from "components/Commons/Loading";
import DatePicker from 'react-date-picker';
import { Dropdown } from "semantic-ui-react";
import noimg from "source/noimg.png";
import ScrollList from "components/Commons/ScrollList/ScrollList";
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
function ListElement({ item: { userName, title, thumbnail, uid,visible },item, handleTop,handleDel }) {
  // console.log("title",title);
  return <div style={{
      position: "relative",
      backgroundSize: "cover",
      backgroundImage: `url(${thumbnail==null?noimg:thumbnail})`,
      width: "150px",
      height: "150px",
      borderRadius: "5px",
      marginRight: "5px",
      marginBottom: "5px",
  }}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
      {visible==1?    <div
          onClick={() => handleTop(uid)}
          style={{
              cursor: "pointer",
              padding: "5px 10px",
              width: "max-content",
              color: "white",
              backgroundColor: "orange",
              borderRadius: "15px",
          }}>인기아이템</div>
          :null}
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
class DesignManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload:false,
      // ui
      loading: false,

      // list
      page: 0, max: 20,
      editSpecial: false,
      special: [], 
      normal: [],
      addNormal:[],
      count: null,
      

      // filter
      keyword: "",

      desc: true, sort: "update",

      start: null, end: null, //new Date('1900-01-01'), new Date()

      category1: [], cate1: 0,
      category2: [], cate2: 0,

      rendering:true,
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
    this.goPage = this.goPage.bind(this);
    this.handleReload=this.handleReload.bind(this);
  };
  async componentDidMount() {
    this.setState({ loading: true });
    this.GetCategoryRequest()
      .then(obj => {
        console.log(obj);
        this.setState({ category1: obj.category1, category2: obj.category2 });
      })
     this.GetDesignListRequest();
    this.GetDesignListCountRequest();
    this.setState({ loading: false });
  };
  handleReload() {
    this.setState({ reload: !this.state.reload });
  }

  GetDesignListRequest(page = 0, max = this.state.max, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/ItemList/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then(async data => {
          if(page==0){
            await this.setState({addNormal:data,normal:data});
            } else {
            // let listdata = [...this.state.addNormal]
            // listdata.concat(data);
            await this.setState({addNormal:this.state.addNormal.concat(data),normal:data});
            }
            resolve(true);
      
      })
        .catch(error => alert(error));
    });
  };
  GetDesignListCountRequest(page = 0, max = this.state.max, cate1 = "0", cate2 = "0", sort = "update", desc = "desc", start = "2000-01-01", end = "2020-12-31", keyword = null) {
    return new Promise((resolve, reject) => {
      const url = `${host}/admins/ItemListCount/${page}/${max}/${cate1}/${cate2}/${sort}/${desc}/${start}/${end}/${keyword}`;
      console.log(url);
      fetch(url, { headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.admin_token }, method: "GET" })
        .then(res => res.json())
        .then((data) => {
          // alert(data.cnt);
          this.setState({ count: data.cnt })
          // alert(data.cnt);
          resolve(true);
        }
        )
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
  // UpdateDesignRequest(id, data, token) {
  //   return new Promise(resolve => {
  //     if (data.type === "insert") {
  //       const url = `${host}/admins/${id}/insertTopDesign`;
  //       console.log(url);
  //       fetch(url, {
  //         headers: { 'x-access-token': token, "Content-Type": "application/json" },
  //         method: "POST",
  //         body: JSON.stringify(data)
  //       }).then(res => res.json())
  //         .then(res => resolve(res))
  //         .catch(err => console.error(err));
  //     }
  //   });
  // };
  UpdateDesignRequest(id, data, token) {
    return new Promise((resolve) => {
      if (data.type === "delete") {
        fetch(`${host}/admins/${id}/deleteTopDesign`, {
          headers: { 'x-access-token': token },
          method: "POST"
        })
          .then(res => res.json())
          .then(res => {resolve(res); })
          .catch(err => console.error(err));
      }
      else if (data.type === "insert") {
        fetch(`${host}/admins/${id}/insertTopDesign`, {
          headers: { 'x-access-token': token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        }).then(res => res.json())
          .then(res => { resolve(res);})
          .catch(err => console.error(err));
      }
      else {
        fetch(`${host}/admins/${id}/updateTopDesign`, {
          headers: { "x-access-token": token, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => { resolve(res);})
          .catch(err => console.error(err));
      }
      // resolve();
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
    .then( ()=>{
      const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
      this.GetDesignListRequest(0, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "")
    })
      // .then(this.GetSpecialDesignListRequest())
      // .then(this.GetDesignListRequest());
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
        const url = `${host}/admins/DeleteItem/${item.uid}`;
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
      start: date
    });
  }
  handleEndDateChange(date) {
    this.setState({
      end: date
    });
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  onChangeSort(e, { value }) {
    this.setState({ sort: value });
  }
  async onChangeMainCate(value) {
    await this.setState({ cate1: value, cate2: 0 });
    const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;

    console.log("ChangeCate",max, cate1, cate2, sort, desc, start, end, keyword );


    await this.setState({ page: 0 });
    this.GetDesignListRequest(this.state.page, max, value, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword :this.state.keyword)
    .then(()=>this.GetDesignListCountRequest(this.state.page, max, value, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : this.state.keyword));
  }
  async onChangeSubCate(parents_id,value) {
    await this.setState({ cate2: value });
    const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;

    console.log("ChangeCate",max, cate1, cate2, sort, desc, start, end, keyword );

    await this.setState({ page: 0 });
    this.GetDesignListRequest(this.state.page, max, cate1, value, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword :this.state.keyword)
    .then(()=>this.GetDesignListCountRequest(this.state.page, max, cate1, value, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : this.state.keyword));
  }
  resetCate = () => {
    this.props.history.replace(`/designManage/${this.props.sort}`);
    this.changeState();
  }
  async search() {
    // alert(this.state.keyword);
    const { max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    await this.setState({ page: 0 });
    this.GetDesignListRequest(this.state.page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword :this.state.keyword)
    .then(()=>this.GetDesignListCountRequest(this.state.page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : this.state.keyword));

  }
  async goNext() {
    console.log(this.state.page);
    await this.setState({ page: this.state.page + 1 });
    console.log(this.state.page);
    const { page, max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    this.GetDesignListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goPrev() {
    await this.setState({ page: this.state.page - 1 });
    const { page, max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    this.GetDesignListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : "");
  }
  async goPage(activePage) {
    // console.log(this.state.page);
    await this.setState({ page: activePage});
    // console.log(this.state.page);
    const { page, max, cate1, cate2, sort, desc, start, end, keyword } = this.state;
    this.GetDesignListRequest(page, max, cate1, cate2, sort, desc ? "desc" : "asc", getFormatDate(start), getFormatDate(end), keyword ? keyword : this.state.keyword)
  }
  render() {
    const { special, addNormal,normal, count, page, loading, editSpecial, category1, cate1, category2, cate2, keyword, desc, sort } = this.state;
    const lastPage = parseInt(count / this.state.max, 10)+1;
console.log(count);
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
        : [{ key: "-", value: "-", text: "-"}];
    // console.log(combocate2);

    // sort
    const combosort = [
      { key: "update", value: "update", text: "업데이트" },
      { key: "create", value: "create", text: "등록순" },
      { key: "title", value: "title", text: "제목" },
      // { key: "like", value: "like", text: "인기순" }
    ];
    // console.log(combosort);
      console.log(category2,cate2);
    return (
      <MainBox>
        {/* loading */}
        {loading ? <Loading /> : null}
        {/* normal design manager */}
        <div className="main">
          {/* title */}
          <h1>디자인</h1>
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
            {/* <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"cneter"}}>
            <ScrollList 
                    manual={this.props.manual || false}
                    getListRequest={this.goNext}
                    type="design"
                    dataList={normal} 
                    dataListAdded={addNormal} 
                    DeleteDesignRequest = {this.DeleteDesignRequest}
                    MakeTopDesign={this.MakeTopDesign}
                    handleReload={this.handleReload}
                    />
            </div> */}
            <ListBox>
              {normal && normal.length > 0 ?
                normal.map(item => {
                  console.log(item);
                    return (
                      <ListElement item={item}
                      handleTop={this.MakeTopDesign}
                      handleDel={this.DeleteDesignRequest}/>
                    )
                  }) 
                  : <div>데이터가 없습니다.</div>}
            </ListBox>
          </div>


            
          <div className="pageRange">
          <div> 
            {count<=10?null:
              <Pagination
              activePage={this.state.page}
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
            }

            </div>

          </div>
        </div>
      </MainBox>

    )
  }
}

export default DesignManager;

