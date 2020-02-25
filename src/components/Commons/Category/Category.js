import React, { Component } from 'react';
import styled from "styled-components";
// import StyleGuide from 'StyleGuide';
// import { geturl } from 'config';

const Container = styled.div`
  // width: 100%;
  font-family: Noto Sans KR;
  // display: flex;
  // flex-direction: colum;
  cursor: default;
  .over {
    display: flex;
    flex-direction: row;
  }
  .under {
    margin-top: 18px;
  }
`;
const CurrentCategory = styled.div`
  width: 180px;
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  line-height: 29px;
`;
const CategoryMenu = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  text-align: left;
  font-weight: 500;
  line-height: 29px;
  .element {
    margin-right: 20px;
  }
  .active {
    color: #FF0000;
  }
  &.fly {
    position: absolute;
    left: 10%;
  }
`;
class Category extends Component {
  onChangeCategory1 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(value);
  }
  onChangeCategory2 = async (e, cate1, value,test) => {
    console.log(cate1,value,test);
    e.stopPropagation();
    if (value === 0) {
      value = null;
    }
    let count =0;
    let result = 0;
    this.props.category2[cate1].map((item,idx)=>{
      item.value == value ? result=count:null;
      count++;
    })
    this.props.category2[cate1].value
    console.log(cate1,result);
    await this.props.handleCate2(cate1, result);
  };
  resetCate = () => {
    this.props.resetCate();
  }

  render() {

    const { category1, cate1, category2, cate2 } = this.props;
    return (
      <Container>
        <div className="over">
          <CurrentCategory onClick={this.resetCate}>{this.props.which}</CurrentCategory>
          <CategoryMenu>
            {category1.map((cate, i) => cate.value !== 0 &&
              <div
                onClick={() => this.onChangeCategory1(cate.value)}
                key={i} className={`element ${cate.value === parseInt(cate1, 10) ? "active" : ""}`}>
                {cate.text}</div>)}
          </CategoryMenu></div>
        <div className="under">
          <CategoryMenu className="fly">
            {cate1 && category2 && category2[cate1] ? (
              category2[cate1].map((cate, i) => cate.value !== 0 &&
                <div
                  onClick={(e) => this.onChangeCategory2(e, cate.parent, cate.value,cate2)}
                  key={i} className={`element ${cate.value === parseInt(cate2, 10) ? "active" : ""}`}>{cate.text}</div>)) : null}
          </CategoryMenu>
        </div>
      </Container>
      // <CateColumn className="category"
      //   widescreen={this.props.widescreen ? this.props.widescreen : null}
      //   largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
      //   computer={this.props.computer ? this.props.computer : null}
      //   tablet={this.props.tablet ? this.props.tablet : null}
      //   mobile={this.props.mobile ? this.props.mobile : null}>
      //   <ul className="cateUl">
      //     {this.props.category1.map((cate, i) => (
      //       cate.value !== 0 &&
      //       <CateItem key={i}
      //         className={cate.value === this.props.cate1 ||
      //           (cate.value === 0 && this.props.cate1 === null) ||
      //           (cate.value === 0 && this.props.cate1 === "null")
      //           ? "active" : ""}
      //         {cate.text}
      //         <Cate2List parentNum={i} />
      //       </CateItem>
      //     ))}
      //   </ul>
      // </CateColumn>
    );
  }
}

export default Category;
