import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";

const emptyCategory = [{ value: 0, text: "" }]

const ContentsBox = styled.div`
padding-left:47px;
    .title{
        min-width:167px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
    }
    @media only screen and (min-width : 780px) and (max-width:1440px) {
      .title{
        margin-bottom:10px;
      }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
      .title{
        margin-bottom:10px;
      }
    }
`
const CategoryBox = styled.div`
width:100%;
display:flex;
justify-contant:flex-start;
flex-direction:row;
@media only screen and (min-width : 780px) and (max-width:1440px) {
  // flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
}
`
const CategoryDropDown = styled(Dropdown)`
width:410px;
height:56px;     
border-radius:5px;
font-size:20px;
background-color:#EFEFEF !important;
margin-right:30px;
@media only screen and (min-width : 780px) and (max-width:1440px) {
  
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  margin-top:10px;
  width:90%;
}
`
class SectionAdditional extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryLevel1: 0, categoryLevel2: 0 };
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        categoryLevel1: nextProps.MyDetail.category_level1,
        categoryLevel2: nextProps.MyDetail.category_level2 == null ? 0 : nextProps.MyDetail.category_level2
      });
      this.props.updateCategory1(nextProps.MyDetail.category_level1);
      this.props.updateCategory2(nextProps.MyDetail.category_level2 == null ? 0 : nextProps.MyDetail.category_level2);


    }
    return true;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value });
    this.props.updateCategory1({ value }.value);
    
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value })
    this.props.updateCategory2({ value }.value);
  }

  render() {
    console.log(this.state.categoryLevel1);
    return (
      <ContentsBox>
        {/* category */}
        <CategoryBox>
          <div className="title">카테고리</div>
            <CategoryDropDown onChange={this.onChangeCategory1}
              options={this.props.category1} selection ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
            <CategoryDropDown onChange={this.onChangeCategory2}
              options={this.state.categoryLevel1 === 0 ? emptyCategory : this.props.category2[this.state.categoryLevel1 - 1]} selection 
              ref="dropdown2" value={this.state.categoryLevel2} />
        </CategoryBox>
      </ContentsBox>
    );
  }
}
export default SectionAdditional;
