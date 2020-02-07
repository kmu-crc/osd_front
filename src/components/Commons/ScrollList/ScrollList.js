import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";

// CSS STYLING
const ScrollContainer = styled.div`
// *{ border:1px solid red; }
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // border: 2px dashed blue;
  .item {
    flex: 0 0 180px;
    justify-content: space-around;
    margin: 0px 45px 45px 0px;
    padding: 0px;
    // background: #F7F7F7;
    // border: 1px solid #EFEFEF;
  }
  .designer {
    flex: 0 0 247px;
    justify-content: space-around;
    margin: 0px 45px 45px 0px;
    padding: 0px;
    // background: #707070;
    // border: 1px solid #FAFAFA;
  }
  .maker {
    flex: 0 0 247px;
    justify-content: space-around;
    margin: 0px 45px 45px 0px;
    padding: 0px;
    // background: #707070;
    // border: 1px solid #FAFAFA;
  }
`;
const NoData = styled.div`
  margin-top: 75px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  padding: 15px;
  text-align: center;
  font-size: 18px;
  font-family: Noto Sans KR;
  font-weight: 500;
  // border: 1px dashed gray;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false };
  // componentDidMount() {
  // console.log("mounted:", this.props);
  // if (this.props.dataListAdded.length) {
  // if (this.props.dataListAdded.length % this.props.cols !== 0) {
  // this.getLoadData(1);
  // }
  // }
  // }
  getLoadData = page => {
    this.props.getListRequest(page)
      .then(() => {
        this.setState({
          hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true,
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

    return (
      this.props.dataListAdded.length > 0 ?
        <ScrollContainer>
          <InfiniteScroll threshold={100} pageStart={0}
            loadMore={this.getLoadData} hasMore={this.state.hasMore}
            loader={
              <Loader className="loading" active={false}
                inline="centered" size="huge" key={0} />
            }>
            <ListContainer>
              {this.props.dataListAdded.map((content) => (
                <div key={content.uid} className={`${type}`}>
                  <ListComponent data={content} type={type}/>
                </div>
              ))}
            </ListContainer>
          </InfiniteScroll>
        </ScrollContainer>
        : <NoData>검색된 결과가 없습니다.</NoData>
    );
  }
}

export default ScrollList;
