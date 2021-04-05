import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollProductListContainer from "containers/Products/ScrollProductListContainer";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";
import market_style from "market_style";

// CSS STYLING
const Wrapper = styled.div`
*{
  // border:1px solid black;
}
  width: 100%;
  display: flex;
  flex-direction: row;
  &.left {
    margin-left: auto;
  }
`;
const Content = styled(ContentBox)`
  margin-top: ${props => props.top}px;
  width:100%;
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
  background-color: ${props => props.bgcolor || "#FFFFFF"};
`;
const RequestButton = styled.div`
  width:max-content;
  padding:2px 7px 3px 7px;
  color: #FF0000;
  font-family: Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  border:1px solid red;
  margin-right:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  `;
const Container = styled.div`
  padding:0px 30px 0px 30px;
  ._wrapper{
    margin-bottom:20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .category {
      width: 100%;
    }
    ._title{
      color:black;
      width:200px;
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:Noto Sans KR;
      font-weight:600;
      font-size:${market_style.font.size.normal3};
    }
    .sort {
      width: 300px;
    }
    .request {
      width: 300px;
      display:flex;
    }
  }
`;


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { rendering: true };
  }
  componentDidMount() {
    this.props.GetProductTotalCountRequest(this.props.cate1, this.props.cate2);
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    this.props.history.replace(`/product/${this.props.sort}/${value}/null`);
    this.props.GetProductTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      this.props.history.replace(`/product/${this.props.sort}/${cate1}/${value}`);
    } else {
      this.props.history.replace(`/product/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    this.props.GetProductTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }
  sortChange = (e, { value }) => {
    this.props.history.replace(`/product/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }

  resetCate = () => {
    this.props.history.replace(`/product/${this.props.sort}`);
    this.changeState();
  }
  render() {
    const { sort, category1, category2, cate1, cate2 } = this.props;
    // console.log(this.props);

    return (<React.Fragment>
      <Content top={15}>
        <Container>
          <div className="category">
            <Category
              handleCate2={this.cate2Change}
              handleCate1={this.cate1Change}
              resetCate={this.resetCate}
              cate1={cate1}
              cate2={cate2}
              category1={category1}
              category2={category2}
              which="아이템" />
          </div>
          <div className="_wrapper">
                <div className="request">
                {this.props.userInfo != null && (this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1) ?
                  <RequestButton>
                  <Link to={`/createproduct`}>아이템 등록</Link>
                  </RequestButton>
                  : null}
                </div>
                <div className="_title">아이템</div>
                <div className="sort">
                  <Sorting handleClick={this.sortChange} placeholder={sort} />
                </div>
          </div>
        </Container>
      </Content>

      <Content>
        <Wrapper className="listWrap">
          {this.state.rendering &&
            <ScrollProductListContainer sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
        </Wrapper>
      </Content>
    </React.Fragment>);
  }
}

export default ProductList;
