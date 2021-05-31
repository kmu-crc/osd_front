import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import market_style from "market_style";

// css styling
const ScrollContainer = styled.div`
  width: 100%;
`;
const NoPage = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  padding:50px;
  .text{
    font-size:${market_style.font.size.samll1};
  }
`
const ListContainer = styled.div`
`
class ScrollBoardList_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, loading: false, page: 0 };
    this.getLoadData = this.getLoadData.bind(this);
  };
  getLoadData = page => {
    this.props.getListRequest &&
      this.props.getListRequest(page)
        .then(() => {
          this.setState({
            hasMore: this.props.dataList === null || this.props.dataList.length <10 ? false : true,
            loading: true
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            hasMore: false
          });
        });
  };
  // goNext = async () => {
  //   await this.setState({ page: this.state.page + 1 });
  //   this.getLoadData();
  // };
  // goPrev = async () => {
  //   await this.setState({ page: this.state.page - 1 });
  //   this.getLoadData();
  // }
  // getLoadData = () => {
  //   this.props.getListRequest(this.state.page).catch((err) => { console.log(err); });
  // };
  // goPage = async (pagenum) => {
  //   await this.setState({ page:pagenum });
  //   this.getLoadData();
  // };

  render() {
    const { total, dataList,dataListAdded, ListComponent } = this.props;
    const { page } = this.state;
    const lastPage = parseInt(total / 10, 10);
    console.log(this.props);
    return (
      dataListAdded &&
      dataListAdded.length > 0 ?
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
                <div key={index}>
                  <ListComponent type={this.props.type} data={content} confirm={this.props.confirm} handler={this.props.handler} />
                </div>
                // </React.Fragment>
              ))}
            </ListContainer>
          </InfiniteScroll>
          </ScrollContainer>
          :<NoPage><div>검색 결과 없음</div></NoPage>
    );
  }
}

export default ScrollBoardList_mobile;
{/* {      this.props.dataListAdded &&
        this.props.dataListAdded.length > 0 ?
          dataListAdded.map(content => <ListComponent key={content.uid} data={content} />)
          : <NoPage><div className="text">등록된 게시글이 없습니다.</div></NoPage>}
        <div style={{ width: "max-content", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row" }}>
          <div style={{ width:"100%",marginTop:"20px" }}>
            <Pagination
                  activePage={page}
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={lastPage+1}
                  // pointing
                  secondary
                  onPageChange={(event, { activePage }) => {
                    this.goPage(activePage-1);
                  }}
                />
          </div>
        </div> */}