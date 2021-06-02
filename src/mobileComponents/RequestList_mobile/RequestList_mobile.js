import React, { Component } from "react";
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollRequestListContainer_mobile from "mobileComponents/ScrollRequestListContainer_mobile";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import { TextControllerPlus as TextControllerClassic } from "components/Commons/InputItem";
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import market_style from "market_style";
import { Dropdown } from "semantic-ui-react";

const Wrapper = styled.div`
  width:100%;
  .header{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.normal2};
    font-weight:800;
    color:#c1c1c1;
    margin-bottom:10px;
  }
  .row{width:100%;}
  .flex{display:flex;}
  .hCenter{justify-content:center;}
  .between{justify-content:space-between;}
  .buttonMargin{margin-left:2.5%};
  .filter{
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-top:10px;
    padding-bottom:7px;
    border-bottom:1px solid #eaeaea;
  }
  .redButton{
    width:82px;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    border:2px solid red;
    color:red;
    box-shadow: 2px 2px 3px #00000019;
    font-size:${market_style.font.size.small1};
    font-weight:500;
  }
  .active{
    background-color:red;
    color:white;
  }
  .list{
    padding-bottom:60px;
  }
`
const DropBox = styled(Dropdown)`
  font-size:${market_style.font.size.mini2};
  margin-right:10px;
`

const WriteButton = styled.div`
  position:fixed;
  bottom:60px;
  right:10px;
  width:120px;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  font-weight:800;
  font-size:${market_style.font.size.normal1};
  border-radius:20px;
  background-color:#FF3E3E;
  box-shadow: 5px 5px 3px var(--unnamed-color-ffffff);
`

const target = `request`;
class RequestList_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendering: true,
      path: "request",
      write: false,
      title: "",
      comment: "",
      type:"designer",
      sort:null,cate1:null,cate2:null,cate3:null,
    };
    this.handleCate1 = this.handleCate1.bind(this);
    this.handleCate2 = this.handleCate2.bind(this);
    this.handleCate3 = this.handleCate3.bind(this);
    this.resetCate = this.resetCate.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.createNoneRequest = this.createNoneRequest.bind(this);
    // this.onChangeValue = this.onChangeValue.bind(this);
  }
  handleCate1 = (e,{value}) => {
    const { type, keyword } = this.props;
    const { cate2, cate3 } = this.state;
    this.setState({cate1:{value}.value,cate2:null,cate3:null});
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.props.history.push(`/${target}/${type}/${{value}.value}/${cate2}/${cate3}/${sort}/${keyword}`);
  }
  handleCate2 = (e, {value}) => {
    const { type, keyword } = this.props;
    const { cate1, cate3 } = this.state;
    this.setState({cate2:{value}.value,cate3:null});
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.props.history.push(`/${target}/${type}/${cate1}/${{value}.value}/${cate3}/${sort}/${keyword}`);
  }
  handleCate3 = (e, {value}) => {
    const { type, keyword } = this.props;
    const { cate1, cate2 } = this.state;
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.setState({cate3:{value}.value});
    this.props.history.push(`/${target}/${type}/${cate1}/${cate2}/${{value}.value}/${sort}/${keyword}`);
  }
  resetCate = () => {
    const { type, sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/null/null/null/update/${keyword}`);
  }
  sortChange = (_, { value }) => {
    this.setState({sort:{value}.value})
    const result = {value}.value == 1?"like":{value}.value==2?"update":"name";
    const { cate1, cate2, cate3, type, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/${cate1}/${cate2}/${cate3}/${{value}.value}/${keyword}`);
  }
  typeChange = (type) => {
    const { sort, keyword } = this.props;
    this.props.RequestListInit();
    this.props.history.push(`/${target}/${type}/null/null/null/${sort}/${keyword}`);
  }
  createNoneRequest = (title, content) => {
    const data = {
      type: this.props.type,
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      title: title,
      content: content,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          this.props.GetRequestListRequest(this.props.type, 0, this.props.cate1, this.props.cate2, this.props.sort, null);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  render() {
    let { category1, category2, category3 } = this.props;
    category2 = this.state.cate1==null?[]:category2.filter(item=>item.parent == this.state.cate1);
    category3 = this.state.cate2==null?[]:category3.filter(item=>item.parent == this.state.cate2);
    const { cate1, cate2, cate3 } = this.props;
    const { sort } = this.props;


    return (
      <React.Fragment>
        <WriteButton onClick={()=>this.setState({write:true})}>게시글 등록</WriteButton>
        <ArticleModal
              write={this.state.write}
              handlerModal={(write) => { this.setState({ write: write }) }}
              createNoneRequest={(title, content) => this.createNoneRequest(title, content)}
          /> 
        <Wrapper>
          <div className="header">게시판</div>
          <div className="row flex hCenter">
            <div onClick={()=>this.typeChange("designer")} className={`redButton ${this.props.type=="designer"?"active":null}`}>디자이너</div>
            <div onClick={()=>this.typeChange("maker")} className={`redButton buttonMargin ${this.props.type=="maker"?"active":null}`}>메이커</div>
            <div onClick={()=>this.typeChange("item")} className={`redButton buttonMargin ${this.props.type=="item"?"active":null}`}>아이템</div>
            <div onClick={()=>this.typeChange("normal")} className={`redButton buttonMargin ${this.props.type=="normal"?"active":null}`}>일반</div>
          </div>
          <div className="filter">
          <div className="category">
            <DropBox placeholder="1차 카테고리" options={category1} onChange={this.handleCate1} value={this.state.cate1}/>
            {
              this.state.cate1 && <DropBox placeholder="2차 카테고리" options={category2} onChange={this.handleCate2} value={this.state.cate2}/>
            }
            {
               this.state.cate1==6&&this.state.cate2==42&&<DropBox placeholder="3차 카테고리" options={category3} onChange={this.handleCate3} value={this.state.cate3}/>
            }
          </div>
          <div className="sorting">
            <DropBox 
              placeholder="전체 " 
              value={this.state.sort}
              onChange={this.sortChange}
              options={[
                {text:"인기순",value:1},
                {text:"최신순",value:2},
                {text:"이름순",value:3}
                ]
            }/>
          </div>
          </div>
          <div className="list">
            <ScrollRequestListContainer_mobile type={this.props.type} sort={sort} cate1={cate1} cate2={cate2} cate3={cate3} keyword={this.props.keyword==undefined?null:this.props.keyword} history={this.props.history} />
          </div>
        </Wrapper>
      </React.Fragment >);
  }
}

export default RequestList_mobile;
