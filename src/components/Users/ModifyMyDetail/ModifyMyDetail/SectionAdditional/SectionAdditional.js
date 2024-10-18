import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";


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
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
    and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
      .title{
        margin-bottom:10px;
      }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
        padding:15px;
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
        @media only screen and (min-width : 360px) and (max-width:780px) {
          flex-direction:column;
        }
`
const CategoryDropDown = styled(Dropdown)`
      width:380px;
      height:56px;     
      border-radius:5px;
      font-size:20px;
      background-color:#EFEFEF !important;
      margin-right:30px;
      @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
      and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
        width:100%;
        margin-right:0px;
        margin-bottom:5px;
      }
`

class SectionAdditional extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryLevel1: 0, categoryLevel2: 0 };
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.onChangeCategory3 = this.onChangeCategory3.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        categoryLevel1: nextProps.MyDetail.category_level1,
        categoryLevel2: nextProps.MyDetail.category_level2 == null ? 0 : nextProps.MyDetail.category_level2,
        categoryLevel3: nextProps.MyDetail.category_level3 == null ? 0: nextProps.MyDetail.category_level3
      });
      this.props.updateCategory1(nextProps.MyDetail.category_level1);
      this.props.updateCategory2(nextProps.MyDetail.category_level2 == null ? 0 : nextProps.MyDetail.category_level2);
      this.props.updateCategory3(nextProps.MyDetail.category_level3 == null ? 0: nextProps.MyDetail.category_level3);


    }
    return true;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value, categoryLevel2:null, categoryLevel3:null });
    this.props.updateCategory1({ value }.value);
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value ,categoryLevel3:null})
    this.props.updateCategory2({ value }.value);
  }
  onChangeCategory3(event, { value }) {
    this.setState({ categoryLevel3: { value }.value })
    this.props.updateCategory3({ value }.value);
  }

  render() {
    let category3Index = -1;
    let nCount=0;
    for(let i in this.props.category2){
      this.props.category2&&this.props.category2[i]&&this.props.category2[i].map((item,index)=>{
          if(item.value == this.state.categoryLevel2){
            category3Index = nCount;
          }
          nCount++;
        })
    }
    console.log(category3Index);
    // let category2_index = 0;
    // let category1_index = -1;
    // for( let i in this.props.category2){
    //     category1_index++;
    //     this.props.category2[i]&&this.props.category2[i].map((item,index)=>{
    //       // console.log(this.state.categoryLevel2);
    //       if(i<this.state.category_level1-1){
    //         console.log(category2_index,this.state.categoryLevel1);
    //         category2_index++;
    //       }
    //     })
    // }
    // console.log(this.props.category3[category2_index-1],category1_index,category2_index);
    return (
      <ContentsBox>
        {/* category */}
        <CategoryBox>
          <div className="title">카테고리</div>
          <CategoryDropDown onChange={this.onChangeCategory1}
            options={this.props.category1} selection
            name="cate1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
          {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
            ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
            : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />
          }
          {/* {this.state.categoryLevel1 !== 0 &&this.state.categoryLevel2 !== 0 && this.props.category3[this.state.categoryLevel2 - 1]
            ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
            : <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={emptyCategory} />
          } */}
        </CategoryBox>
      </ContentsBox>
    );
  }
}
export default SectionAdditional;