import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollProductListContainer_mobile from "mobileComponents/ScrollProductListContainer_mobile";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";
import market_style from "market_style";
import { Dropdown } from "semantic-ui-react";

const Wrapper =styled.div`
  width:100%;
  min-height:700px;
  .header{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.normal2};
    font-weight:800;
    color:#c1c1c1;
  }
  .buttonBox{
    width:100%;
    display:flex;
    padding:0px 15px;
    margin-top:10px;
      .marginRight{margin-right:10px;}
      .redButton{
        min-width:100%;
        height:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        color:red;
        border:2px solid red;
        border-radius:5px;
        box-shadow: 2px 2px 3px #00000019;
      }
  }
  .filter{
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-top:15px;
    padding:0px 20px;
    .category{

    }
    .sorting{
      
    }
  }
  .list{
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:15px;
  }
`
const DropBox = styled(Dropdown)`
  font-size:${market_style.font.size.mini2};
  margin-right:10px;
  .icon{
    
  }
`
const target = `product`;

export default class ProductList_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort:null,cate1:null,cate2:null,cate3:null,
    }
    this.handleCate1 = this.handleCate1.bind(this);
    this.handleCate2 = this.handleCate2.bind(this);
    this.handleCate3 = this.handleCate3.bind(this);
    this.resetCate = this.resetCate.bind(this);
    this.sortChange = this.sortChange.bind(this);
  }
  handleCate1 = (e,{value}) => {
    this.setState({cate1:{value}.value,cate2:null,cate3:null});
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.props.history.push(`/${target}/${sort}/${{value}.value}`);
  }
  handleCate2 = (e, {value}) => {
    this.setState({cate2:{value}.value,cate3:null});
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.props.history.push(`/${target}/${sort}/${this.state.cate1}/${{value}.value}`);
  }
  handleCate3 = (e, {value}) => {
    this.setState({cate3:{value}.value});
    const sort = this.state.sort == 1?"like":this.state.sort==2?"update":"name";
    this.props.history.push(`/${target}/${sort}/${this.state.cate1}/${this.state.cate2}/${{value}.value}`);
  }
  resetCate = () => {
    this.props.history.push(`/${target}/${this.props.sort}`);
  }
  sortChange = (_, { value }) => {
    this.setState({sort:{value}.value})
    const result = {value}.value == 1?"like":{value}.value==2?"update":"name";
    const { cate1, cate2, cate3 } = this.props;
    this.props.history.push(`/${target}/${result}/${cate1}/${cate2}/${cate3}`);
  }
  render() {
    let { category1, category2, category3 } = this.props;
    category2 = this.state.cate1==null?[]:category2.filter(item=>item.parent == this.state.cate1);
    category3 = this.state.cate2==null?[]:category3.filter(item=>item.parent == this.state.cate2);
    const { cate1, cate2, cate3 } = this.props;
    const { sort } = this.props;

    return (<React.Fragment>
            <Wrapper>
        <div className="header"><Link to={`/${target}`}>아이템</Link></div>
        <div className="buttonBox">
        <Link className="redButton" to={`/create${target}`}><div >아이템 등록</div></Link>
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
            <ScrollProductListContainer_mobile sort={sort} cate1={cate1} cate2={cate2} cate3={cate3} history={this.props.history}/>
        </div>
      </Wrapper>
    </React.Fragment>);
  }
}