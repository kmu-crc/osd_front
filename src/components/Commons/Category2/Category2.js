import React, { Component } from 'react';
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import StyleGuide from 'StyleGuide';

const CateColumn = styled(Grid.Column)`
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (min-width: 1200px) {
    display: block;
  }
  & ul.cateUl {
    margin-top: 0;
    & li {
      cursor: pointer;
      float: left;
      position: relative;
      padding-top: 1rem;
      padding-bottom: 1rem;
      &:hover {
        color: ${StyleGuide.color.main.basic};
        &:hover ul.subCateUl {
          display: block;
        }
      }
    }
    & li.active {
      font-weight: bold;
      color: ${StyleGuide.color.main.basic};
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
  & ul.cateUl.subCateUl {
    display: none;
    position: absolute;
    z-index: 2;
    top: 40px;
    left: 0;
    background-color: ${StyleGuide.color.geyScale.scale0};
    border: 1px solid ${StyleGuide.color.geyScale.scale2};
    box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
    color: ${StyleGuide.color.geyScale.scale6};
    font-weight: normal;
    &:hover {
      display: block;
    }
    & li {
      width: 120px;
      padding: .7rem 1rem;
      &:hover {
        background-color: ${StyleGuide.color.geyScale.scale2};
      }
    }
  }
`;

const CateItem = styled.li`
  padding-right: 2rem;
`;

const SubCateItem = styled.li`
  padding-right: 1.2rem;
`;

class Category2 extends Component {
  componentDidMount(){
    this.props.GetCategoryLevel2AllRequest(this.props.category1);
  }

  shouldComponentUpdate(nextProps){
    if(JSON.stringify(this.props.category1) !== JSON.stringify(nextProps.category1)){
      this.props.GetCategoryLevel2AllRequest(nextProps.category1);
    }
    return true;
  }

  onChangeCategory1 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(value);
  }

  onChangeCategory2 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(this.props.cate1);
    this.props.handleCate2(value);
  };

  render(){
    const Cate2List = (i) => {
      const n = i.parentNum;
      let list = this.props.category2All;
      list = list[n];
      return (
          <ul className="cateUl subCateUl">
            {list && list.length !== 0 && list.map((subcate, i) => (
              <SubCateItem key={i}
                           className={subcate.value == this.props.cate2
                                      ? "active" : ""}
                           onClick={() => this.onChangeCategory2(subcate.value)}>
              {subcate.text}
              </SubCateItem>
            ))}
          </ul>
      )
    };
    return(
      <CateColumn className="category"
                  widescreen={this.props.widescreen ? this.props.widescreen : null}
                  largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
                  computer={this.props.computer ? this.props.computer : null}
                  tablet={this.props.tablet ? this.props.tablet : null}
                  mobile={this.props.mobile ? this.props.mobile : null}>
        <ul className="cateUl">
          {this.props.category1.map((cate, i) => (
            <CateItem key={i}
                      className={cate.value == this.props.cate1 ||
                                (cate.value === 0 && this.props.cate1 === null) ||
                                (cate.value === 0 && this.props.cate1 === "null")
                                ? "active" : ""}
                      onClick={() => this.onChangeCategory1(cate.value)}>
              {cate.text}
              {this.props.category2All.length === this.props.category1.length - 1 &&
              <Cate2List parentNum={(i-1)}/>
              }
            </CateItem>
          ))}

        </ul>
      </CateColumn>
    );
  }
}

export default Category2;
