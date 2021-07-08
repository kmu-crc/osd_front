import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import market_style from "market_style";
// CSS STYLING
const ScrollContainer = styled.div`
  width:100%;
  .wrapper_{
    width:100%;
  }
  .viewmore{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#F7F7F7;
    padding:5px;
    border-radius:5px;
    color:#A5A5A5;
  }
`;
const ListContainer = styled.div`
    width: 100%;
    display:flex;
    flex-wrap: wrap;

  .designer{
    margin-bottom:20px;
    &:nth-child(2n+1){
      margin-right:10px;
    }
  }
  .item{
    margin-bottom:20px;
    &:nth-child(2n+1){
      margin-right:10px;
    }
  }
  .gallery{
      margin-bottom:20px;
      &:nth-child(2n+1){
        margin-right:10px;
      }
  }
  @media only screen and (min-width: 500px) and (max-width:1366px){
    justify-content:center;
  }
`;
const NoData = styled.div`
  min-width:100%;
  min-height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  width: max-content;
  padding: 57px 20px 57px 20px;
  text-align: center;
  font-size:${market_style.font.size.normal1};
  color:#FF3838;
  font-family: Noto Sans KR;
  font-weight: 500;
`;

class NoInfiniteScrollList_mobile extends Component {
  state = { hasMore: true, loading: false, moreview:false,page:0, };
  getLoadData = page => {
    this.setState({moreview:true});
    this.props.getListRequest &&
      this.props.getListRequest(page)
        .then(() => {
          this.setState({
            hasMore: this.props.dataList === null || this.props.dataList.length < (this.props.type=="item"?8:10) ? false : true,
            loading: true, page:page+1,
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            hasMore: false,
            moreview:false,
          });
        });
  };

  render() {
    const { ListComponent, type } = this.props;
    console.log(this.props);
    return (
      this.props.dataListAdded &&
        this.props.dataListAdded.length > 0 ?
        <ScrollContainer>
            <ListContainer isSmall={this.props.isSmall == null ? false : true} isMini={this.props.isMini == null ? false : true}>
              {this.props.dataListAdded.map((content, index) => {
                if(index>1)return null;
                return(<div key={index} className={this.props.type}>
                <ListComponent data={content} type={type} confirm={this.props.confirm} handler={this.props.handler} />
                </div>);
              }
              )}
              {this.state.moreview&&this.props.dataListAdded.map((content, index) => {
                if(index<=1)return null;
                return(
                  <div key={index} className={this.props.type}>
                    <ListComponent data={content} type={type} confirm={this.props.confirm} handler={this.props.handler} />
                  </div>
                )
              })}
            </ListContainer>
            {this.state.hasMore&&this.props.dataListAdded.length > 2&&<div className="viewmore" onClick={()=>this.getLoadData(this.state.page)}>▾</div>}
        </ScrollContainer>
        : <NoData><div>검색 결과 없음</div></NoData>
    );
  }
}
export default NoInfiniteScrollList_mobile;