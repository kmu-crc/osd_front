import React, { Component } from "react";
// import InfiniteScroll from "react-infinite-scroller";
// import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'

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
    font-size:15px;
  }
`

class ScrollBoardList extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, loading: false, page: 0 };
    this.getLoadData = this.getLoadData.bind(this);
  };

  goNext = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.getLoadData();
  };
  goPrev = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.getLoadData();
  }
  getLoadData = () => {
    this.props.getListRequest(this.state.page).catch((err) => { console.log(err); });
  };
  goPage = async (pagenum) => {
    await this.setState({ page:pagenum });
    this.getLoadData();
  };

  render() {
    const { total, dataList, ListComponent } = this.props;
    const { page } = this.state;
    const lastPage = parseInt(total / 10, 10);
    // const { mobile, tablet, computer, largeScreen, widescreen, customClass, rerender } = this.props;
    return (
      <ScrollContainer>
        {dataList && dataList.length > 0 ?
          dataList.map(content => <ListComponent key={content.uid} data={content} />)
          : <NoPage><div className="text">등록된 게시글이 없습니다.</div></NoPage>}
        <div style={{ width: "max-content", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row" }}>
          {/* <div style={{ width: "50px" }}>
            {page > 0 ? <div onClick={this.goPrev}>prev</div> : null}
          </div> */}
          {/* <div style={{ width: "50px" }}>
            <div style={{ textAlign: "center", borderRadius: "15px" }}>{this.state.page + 1}</div>
          </div> */}
          <div style={{ width: "50px" }}>
            {10<total ?
            // <div onClick={this.goNext}>next</div> 
            <Pagination
                  activePage={page+1}
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={lastPage+1}
                  onPageChange={(event, { activePage }) => {
                    this.goPage(activePage-1);
                  }}
                />
            : null}
          </div>
        </div>
      </ScrollContainer>
    );
  }
}

export default ScrollBoardList;
