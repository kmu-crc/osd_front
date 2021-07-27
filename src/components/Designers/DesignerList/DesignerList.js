import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollDesignerListContainer from "containers/Designer/ScrollDesignerListContainer";
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
  margin-right:20px;
  border:1px solid red;
  display:flex;
  justify-content:center;
  align-items:center;
  `;
const Container = styled.div`
  width:100%;
  padding:0px 30px 0px 30px;
  ._wrapper{
    margin-bottom:15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    .category {
      width: 100%;
    }
    ._title {
      color: black;
      width: max-content;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Noto Sans KR;
      font-weight: 600;
      font-size: ${market_style.font.size.normal3};
    }
    .sort {
      width: 300px;
    }
    .request {
      width: 300px;
      display: flex;
    }
  }
  @media only screen and (max-width: 800px) and (min-width: 500px) {
    ._wrapper{
      margin-top: 20px;
      .sort{
        width: 100%;
      }
    }
  }
`;

export default class DesignerList extends Component {
  constructor(props) {
    super(props);
    this.handleCate1 = this.handleCate1.bind(this);
    this.handleCate2 = this.handleCate2.bind(this);
    this.handleCate3 = this.handleCate3.bind(this);
    this.resetCate = this.resetCate.bind(this);
    this.sortChange = this.sortChange.bind(this);
  }
  handleCate1 = (value) => {
    const { sort } = this.props;
    this.props.history.push(`/designer/${sort}/${value}`);
  }
  handleCate2 = (parent, value) => {
    const { sort, } = this.props;
    this.props.history.push(`/designer/${sort}/${parent}/${value}`);
  }
  handleCate3 = (parent, value) => {
    const { sort, cate1, } = this.props;
    this.props.history.push(`/designer/${sort}/${cate1}/${parent}/${value}`);
  }
  resetCate = () => {
    this.props.history.push(`/designer/${this.props.sort}`);
  }
  sortChange = (_, { value }) => {
    const { cate1, cate2, cate3 } = this.props;
    this.props.history.push(`/designer/${value}/${cate1}/${cate2}/${cate3}`);
  }

  render() {
    const { category1, category2, category3 } = this.props;
    const { cate1, cate2, cate3 } = this.props;
    const { sort } = this.props;

    return (<React.Fragment>
      <Content top={15}>
        <Container>
          <div className="category">
            <Category // which="디자이너"
              handleCate1={this.handleCate1}
              handleCate2={this.handleCate2}
              handleCate3={this.handleCate3}
              resetCate={this.resetCate}
              cate1={cate1}
              cate2={cate2}
              cate3={cate3}
              category1={category1}
              category2={category2}
              category3={category3}
            />
          </div>
          <div className="_wrapper">
            <div className="request">
              {/* <RequestButton>
                <Link to={`/request/designer`}>디자이너 게시판</Link>
              </RequestButton> */}
              {
                this.props.userInfo != null ?
                  <RequestButton>
                    <Link to={`/requestToDesigner/null`}>디자인 의뢰</Link>
                  </RequestButton>
                  :
                  null
              }
            </div>
            <div className="_title">디자이너</div>
            <div className="sort">
              <Sorting handleClick={this.sortChange} placeholder={sort} />
            </div>
          </div>
        </Container>
      </Content>

      <Content>
        <Wrapper className="listWrap">
          <ScrollDesignerListContainer sort={sort} cate1={cate1} cate2={cate2} cate3={cate3} history={this.props.history} />
        </Wrapper>
      </Content>
    </React.Fragment>);
  }
}
