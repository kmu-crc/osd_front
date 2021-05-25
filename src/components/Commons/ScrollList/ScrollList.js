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
`;
const ListContainer = styled.div`

  padding:0px;
  flex-wrap: wrap;
  width: 100%;
  display:flex;
  
  .item{
    flex: 0 0 180px;
    justify-content: space-around;
    margin: ${props => props.isSmall == true ? "0px 20px 30px 0px" :
    props.isMini == true ? "0px 23px 30px 0px" : "0px 0px 35px 22px"};
  }
  .designer{
    // flex: 0 0 247px;
    justify-content: space-around;
    margin: ${props => props.isSmall == true ? "0px 20px 30px 0px" : "0px 0px 30px 28px"};
    padding: 0px;
  }
  .maker{
    // flex: 0 0 247px;
    justify-content: space-around;
    margin: ${props => props.isSmall == true ? "0px 20px 30px 0px" : "0px 0px 30px 28px"};
    padding: 0px;
  }
  .gallery{
    flex: 0 0 180px;
    justify-content: space-around;
    margin: 0px 20px 20px 0px;
    padding: 0px;
  }
  .sales{
    justify-content: space-around;
    margin: ${props => props.isSmall == true ? "0px 0px 35px 35px" : "0px 0px 35px 35px"};
    padding: 0px;
  }
  .sales_Expert{
    justify-content: space-around;
    margin: ${props => props.isSmall == true ? "0px 0px 35px 30px" : "0px 0px 35px 30px"};
    padding: 0px;
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
  padding: 57px 20px 57px 0px;
  text-align: center;
  font-size:${market_style.font.size.normal1};
  color:red;
  font-family: Noto Sans KR;
  font-weight: 500;
  // border: 1px dashed gray;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false };
  getLoadData = page => {
    this.props.getListRequest &&
      this.props.getListRequest(page)
        .then(() => {
          this.setState({
            hasMore: this.props.dataList === null || this.props.dataList.length < (this.props.type == "item" ? 8 : 10) ? false : true,
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
      this.props.dataListAdded &&
        this.props.dataListAdded.length > 0 ?
        <ScrollContainer>
          <InfiniteScroll className="wrapper_" id={this.props.scrollId || "infi-scroll"} threshold={100} pageStart={0}
            loadMore={this.getLoadData} hasMore={this.state.hasMore}
            loader={
              <Loader className="loading" active={false}
                inline="centered" size="huge" key={0} />
            }>
            <ListContainer isSmall={this.props.isSmall == null ? false : true} isMini={this.props.isMini == null ? false : true}>
              {this.props.dataListAdded.map((content, index) => (
                // <React.Fragment>
                <div key={index} className={this.props.type}>
                  <ListComponent data={content} type={type} confirm={this.props.confirm} handler={this.props.handler} />
                </div>
                // </React.Fragment>
              ))}
            </ListContainer>
          </InfiniteScroll>
        </ScrollContainer>
        : <NoData><div>검색 결과 없음</div></NoData>
    );
  }
}

export default ScrollList;
