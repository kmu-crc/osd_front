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
  width: 150px;
  color: #FF0000;
  font-family: Noto Sans KR;
  font-size:${market_style.font.size.mini1};
  `;
const Container = styled.div`
  ._wrapper{
    display:flex;
    justify-content:space-between;
    .category {
      width: 100%;
    }
    ._title{
      font-family:Noto Sans KR;
      font-weight:500;
      font-size:${market_style.font.size.normal1};
    }
    .sort {
      width: max-content;
    }
    .request {
      width: max-content;
    }
  }
`;

class DesignerList extends Component {
  constructor(props) {
    super(props);
    this.state = { rendering: true };
  }
  componentDidMount() {
    // this.props.GetDesignerTotalCountRequest(this.props.cate1, this.props.cate2);
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    this.props.history.replace(`/designer/${this.props.sort}/${value}/null`);
    // this.props.GetDesignerTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    // console.log("cate2change",cate1,value);
    // return;
    if (cate1 && this.props.cate1 !== cate1) {
      this.props.history.replace(`/designer/${this.props.sort}/${cate1}/${value}`);
    } else {
      this.props.history.replace(`/designer/${this.props.sort}/${this.props.cate1}/${value}`);
    }
    // this.props.GetDesignerTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }
  sortChange = (e, { value }) => {
    this.props.history.replace(`/designer/${value}/${this.props.cate1}/${this.props.cate2}`);
    this.changeState();
  }
  resetCate = () => {
    this.props.history.replace(`/designer/${this.props.sort}`);
    this.changeState();
  }
  render() {
    const { sort, category1, category2, cate1, cate2 } = this.props;
    return (<React.Fragment>

      <Content top={30}>
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
              which="디자이너" /></div>
          <div className="_wrapper">
                <div className="request">
                  <RequestButton>
                    <Link to={`/requestToDesigner/null`}>디자인 의뢰</Link>
                  </RequestButton>
                </div>
                <div className="_title">디자이너</div>
                <div className="sort">
                  <Sorting handleClick={this.sortChange} placeholder={sort} />
                </div>
          </div>
        </Container>
      </Content>

      <Content top={16}>
        <Wrapper className="listWrap">
          {this.state.rendering &&
            <ScrollDesignerListContainer
              sort={sort} cate1={cate1} cate2={cate2}
              history={this.props.history} />}
        </Wrapper>
      </Content>
    </React.Fragment>);
  }
}

export default DesignerList;
