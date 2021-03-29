import React, { Component } from 'react';
import styled from "styled-components";
import market_style from "market_style";

const Container = styled.div`
  margin-top:10px;
  margin-bottom:8px;
  width:100%;
  font-family: Noto Sans KR;
  cursor: default;
  .over {
    display: flex;
    flex-direction: row;
    height:22px;
  }
  .under {
    height:max-content;
  }
`;
const CategoryItem = styled.div`
  cursor:pointer;
  font-size:${market_style.font.size.normal1};
  &:hover{
    opacity:0.7;
  }
`
const CategoryItem2 = styled.div`
  margin-top:3px;
  cursor:pointer;
  font-size:${market_style.font.size.small1};
  &:hover{
    opacity:0.7;
  }
`
const CurrentCategory = styled.div`
  width: 180px;
  font-size: ${market_style.font.size.small1};
  font-weight: 500;
  text-align: left;
  line-height: 29px;
`;
const CategoryMenu = styled.div`
  width:100%;
  display: flex;
  justify-content:center;
  flex-direction: row;
  font-size: ${market_style.font.size.small1};
  text-align: left;
  font-weight: 300;
  .font_small{
    font-size:${market_style.font.size.tiny1};
  }
  .element {
    margin-right: 10px;
  }
  .active {
    font-weight:700;
  }
  &.fly {
  }
`;
class Category extends Component {
  onChangeCategory1 = async value => {
    if (value === 0) {
      value = null;
    }
    await this.props.handleCate1(value);
  }
  onChangeCategory2 = async (e, cate1, value) => {
    e.stopPropagation();
    console.log("onChangeCategory", cate1, value);
    await this.props.handleCate2(cate1, value);
  };
  onChangeCategory3 = async (e, cate2, value) => {
    e.stopPropagation();
    console.log("onChangeCategory", cate2, value);
    await this.props.handleCate3(cate2, value);
  };
  resetCate = () => {
    this.props.resetCate();
  }
  componentDidUpdate(prevProps) {
    return (this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3);
  }

  render() {
    const { category1, cate1, cate2, cate3 } = this.props;
    const category2 = cate1 && this.props.category2 && this.props.category2.filter(item => item.parent === parseInt(cate1, 10));
    const category3 = cate1 && cate2 && this.props.category3 && this.props.category3.filter(item => item.parent === parseInt(cate2, 10));
    console.log(cate1, cate2, this.props.category3, cate1 && cate2 && this.props.category3.filter(item => item.parent === parseInt(cate2, 10)));

    return (
      <Container>
        <div className="over">
          {/* <CurrentCategory onClick={this.resetCate}>{this.props.which}</CurrentCategory> */}
          <CategoryMenu>
            {category1.map((cate, i) => cate.value !== 0 &&
              <CategoryItem
                onClick={() => this.onChangeCategory1(cate.value)}
                key={i} className={`element ${cate.value === parseInt(cate1, 10) ? "active" : ""}`}>
                {cate.text}</CategoryItem>)}
          </CategoryMenu></div>
        {cate1 &&
          <div className="under">
            <CategoryMenu className="fly">
              {cate1 && category2 ? (
                category2.map((cate, i) => cate.value !== 0 &&
                  <CategoryItem2
                    onClick={(e) => this.onChangeCategory2(e, cate.parent, cate.value)}
                    key={i} className={`element ${cate.value === parseInt(cate2, 10) ? "active" : ""}`}>{cate.text}</CategoryItem2>)) : null}
            </CategoryMenu>
          </div>}
        {cate1 && cate2 &&
          <div className="under">
            <CategoryMenu className="fly">
              {cate1 && cate2 && category3 ? (
                category3.map((cate, i) => cate.value !== 0 &&
                  <CategoryItem2
                    onClick={(e) => this.onChangeCategory3(e, cate.parent, cate.value)}
                    key={i} className={`element ${cate.value === parseInt(cate3, 10) ? "active" : ""}`}>{cate.text}</CategoryItem2>)) : null}
            </CategoryMenu>
          </div>}


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
