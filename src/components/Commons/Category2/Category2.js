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
      &:hover {
        color: ${StyleGuide.color.main.basic};
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
    padding-top: 30px;
    color: ${StyleGuide.color.geyScale.scale5};
  }
`;

const CateItem = styled.li`
  padding-right: 2rem;
`;

const SubCateItem = styled.li`
  padding-right: 1.2rem;
`;

class Category2 extends Component {
  state = {
    cate1: null,
    cate2: null
  }

  componentDidMount(){
    if (this.props.cate1) {
      this.setState({
        cate1: this.props.cate1
      });
    }
  }

  onChangeCategory1 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(value);
  }

  loadCategory2 = async value => {
    await this.setState({
      cate1: value === 0? null : value
    });
    this.props.GetCategoryLevel2Request(value)
    .then(res=>{
      this.setState({
        cate2: res.category
      });
    });
  }

  onChangeCategory2 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(this.state.cate1);
    this.props.handleCate2(value);
  };

  render(){
    const Cate2List = (cate2) => {
      const list = cate2.cate2;
      return (
          <ul className="cateUl subCateUl">
            {list && list.length !== 0 && list.map((subcate, i) => (
              <SubCateItem key={i}
                           className={subcate.value == this.props.cate2 ||
                                      (subcate.value === 0 && this.state.cate2 === null) ||
                                      (subcate.value === 0 && this.state.cate2 === "null")
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
                      className={cate.value == this.state.cate1 ||
                                (cate.value === 0 && this.state.cate1 === null) ||
                                (cate.value === 0 && this.state.cate1 === "null")
                                ? "active" : ""}
                      onClick={() => this.onChangeCategory1(cate.value)}
                      onMouseOver={() => this.loadCategory2(cate.value)}>
              {cate.text}
            </CateItem>
          ))}
          <Cate2List cate2={this.state.cate2}/>
        </ul>
      </CateColumn>
    );
  }
}

export default Category2;
