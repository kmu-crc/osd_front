import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import market_style from "market_style";
// CSS STYLING
const ScrollContainer = styled.div`

`;
const ListContainer = styled.div`
  padding:0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .request{
    justify-content: space-around;
    padding: 0px;
    margin-bottom:15px;
    &:nth-child(2n+1){
      margin-right:10px;
    }
  }
  .sales{
    justify-content: space-around;
    padding: 0px;
    margin-bottom:15px;
    &:nth-child(2n+1){
      margin-right:10px;
    }
  }
  .sales_Expert{
    justify-content: space-around;
    padding: 0px;
    margin-bottom:15px;
    &:nth-child(2n+1){
      margin-right:10px;
    }
  }
  @media only screen and (min-width: 500px) and (max-width: 740px) {
    justify-content:center;
  }
  @media only screen and (min-width: 500px) and (max-width:700px){
    justify-content:center;
    .sales{
      margin: 0px 0px 35px 0px;
    }
  }
`;
const NoData = styled.div`
  min-width:100%;
  min-height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  width: max-content;
  padding: 57px 20px 57px 0px;
  text-align: center;
  font-size:${market_style.font.size.normal1};
  color:#FF3838;
  font-family: Noto Sans KR;
  font-weight: 500;
  // border: 1px dashed gray;
`;

class PagingList_mobile extends Component {
  state = { hasMore: true, loading: false };
  getLoadData = page => {
    this.props.getListRequest &&
      this.props.getListRequest(page)
        .then(() => {
          this.setState({
            hasMore: this.props.dataList === null || this.props.dataList.length < 10 ? false : true,
            loading: true
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            hasMore: false
          });
        });
  };

  render() {
    const { ListComponent, type } = this.props;
    console.log(this.props.type);
    return (
      this.props.dataList &&
        this.props.dataList.length > 0 ?
        <ScrollContainer>
            <ListContainer isSmall={this.props.isSmall==null?false:true}>
              {this.props.dataList.map((content, index) => (
                <div key={index} className={this.props.type}>
                  <ListComponent data={content} type={type} confirm={this.props.confirm} handler={this.props.handler} />
                </div>
              ))}
            </ListContainer>
        </ScrollContainer>
        : <NoData><div>검색 결과 없음</div></NoData>
    );
  }
}

export default PagingList_mobile;
