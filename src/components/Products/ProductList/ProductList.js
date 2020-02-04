import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollProductListContainer from "containers/Products/ScrollProductListContainer";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";

// CSS STYLING
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  &.left {
    margin-left: auto;
  }
`;
const Content = styled(ContentBox)`
  margin-top: ${props => props.top}px;
  width: 1790px;
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
  background-color: ${props => props.bgcolor || "#FFFFFF"};
`;
const RequestButton = styled.div`
  margin-left: 100px;
  width: 150px;
  color: #FF0000;
  font-family: Noto Sans KR;
  font-size: 20px;
  line-height: 29px;
`;
const Container = styled.div`
  display: flex;
  .categoy {
    width: max-content;
  }
  .sort {
    width: max-content;
    margin-left: auto;
  }
  .request {
    width: max-content;
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

    return (<React.Fragment>
      <Content top={116}>
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
          <div className="sort">
            <Sorting handleClick={this.sortChange} placeholder={sort} /></div>
          <div className="request"><RequestButton>
            <Link to={`/createproduct`}>아이템 등록하기</Link></RequestButton></div>
        </Container>
      </Content>

      <Content top={160}>
        <Wrapper className="listWrap">
          {this.state.rendering &&
            <ScrollProductListContainer sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
        </Wrapper>
      </Content>
    </React.Fragment>);
  }
}

export default ProductList;
