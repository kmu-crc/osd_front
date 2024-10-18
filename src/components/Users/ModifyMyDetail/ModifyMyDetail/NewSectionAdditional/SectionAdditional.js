import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import opendesign_style from "opendesign_style";

const Wrapper = styled.div`
  max-width: 1300px;
  border-bottom: 3px solid #707070;

  .section {
    :first-child {
      margin-top: 42px;
    }
    margin-bottom: 38px;

    display: flex;
    flex-direction: row;
    
    .label {
      margin-left: 42px;
      width: max-content;
      height: 33px;
      text-align: left;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #777777;
      opacity: 1;
      min-width: 221px;
    }
    .content {
      display: flex;
      flex-direction: row;
      .cate-wrap {
        margin-right: 40px;
        :last-child{
          margin-right: 0px;
        }
      }
    }
  }
`;
const CategoryDropDown = styled(Dropdown)`
  width: 180px;
  height: 40px;
  border-radius: 0px !important;
  outline: none !important;
  border: 0px !important;
  background-color: #C9C9C9 !important;
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 5px;
  }
  text-align: left;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  font-family: Spoqa Han Sans Neo;
  letter-spacing: 0px;
  *{color: #000000 !important;}
  opacity: 1;
`

const emptyCategory = [{ value: 0, text: "" }]

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
        categoryLevel1: nextProps.MyDetail.category_level1 == null ? 7 : nextProps.MyDetail.category_level1,
        categoryLevel2: nextProps.MyDetail.category_level2 == null ? 27 : nextProps.MyDetail.category_level2,
        categoryLevel3: nextProps.MyDetail.category_level3 == null ? 0 : nextProps.MyDetail.category_level3
      });
      this.props.updateCategory1(nextProps.MyDetail.category_level1 == null ? 7 : nextProps.MyDetail.category_level1);
      this.props.updateCategory2(nextProps.MyDetail.category_level2 == null ? 27 : nextProps.MyDetail.category_level2);
      this.props.updateCategory3(nextProps.MyDetail.category_level3 == null ? 0 : nextProps.MyDetail.category_level3);


    }
    return true;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value, categoryLevel2: null, categoryLevel3: null });
    this.props.updateCategory1({ value }.value);
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value, categoryLevel3: null })
    this.props.updateCategory2({ value }.value);
  }
  onChangeCategory3(event, { value }) {
    this.setState({ categoryLevel3: { value }.value })
    this.props.updateCategory3({ value }.value);
  }

  render() {
    let category3Index = -1;
    let nCount = 0;
    for (let i in this.props.category2) {
      this.props.category2 && this.props.category2[i] && this.props.category2[i].map((item, index) => {
        if (item.value == this.state.categoryLevel2) {
          category3Index = nCount;
        }
        nCount++;
      })
    }
    console.log(this.state.categoryLevel2,this.state.categoryLevel1)
    return (<Wrapper id="additional">
      <div className="section">
        <div className="label">카테고리</div>
        <div className="content">
          <div className="cate-wrap">
            <CategoryDropDown
              selection name="cate1" ref="dropdown1" onChange={this.onChangeCategory1} options={this.props.category1} value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
          </div>
          <div className="cate-wrap">
            {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
              ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
              : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />}
          </div>
          <div className="cate-wrap">
            {/* {category3Index} */}
            {category3Index > -1 && this.state.categoryLevel2==28
              ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
              : null}
          </div>
        </div>

      </div>
    </Wrapper>);
  }
}
export default SectionAdditional;

{/* <ContentsBox>
  <CategoryBox>
    <CategoryDropDown onChange={this.onChangeCategory1}
      options={this.props.category1} selection
      name="cate1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
    {this.state.categoryLevel1 !== 0 && this.props.category2[this.state.categoryLevel1 - 1]
      ? <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1]} />
      : <CategoryDropDown value={this.state.categoryLevel2} ref="dropdown2" selection onChange={this.onChangeCategory2} options={emptyCategory} />
    }
 
  </CategoryBox>
</ContentsBox>
    );
  }
} */}
