import React, { Component } from "react";
// import InfiniteScroll from "react-infinite-scroller";
// import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

// css styling
const ScrollContainer = styled.div`
  & .ui.centered.inline.loader.active.loading,
  & .ui.centered.inline.loader.visible.loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  & p {
    text-align: center;
  }
`;

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

  render() {
    const { total, dataList, ListComponent } = this.props;
    const { page } = this.state;
    const lastPage = parseInt(total / 10, 10);
    console.log("page;", this.props);
    // const { mobile, tablet, computer, largeScreen, widescreen, customClass, rerender } = this.props;
    return (
      <ScrollContainer>
        {dataList && dataList.length > 0 ?
          dataList.map(content => <ListComponent key={content.uid} data={content} />)
          : <p>등록된 게시글이 없습니다.</p>}
        <div style={{ width: "max-content", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50px" }}>
            {page > 0 ? <div onClick={this.goPrev}>prev</div> : null}
          </div>
          <div style={{ width: "50px" }}>
            <div style={{ textAlign: "center", borderRadius: "15px" }}>{this.state.page + 1}</div>
          </div>
          <div style={{ width: "50px" }}>
            {lastPage > page ? <div onClick={this.goNext}>next</div> : null}
          </div>
        </div>
      </ScrollContainer>
    );
  }
}

export default ScrollBoardList;
