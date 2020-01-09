import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
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
  };

  getLoadData = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    this.props.getListRequest(page).catch((err) => { console.log(err); });
  };

  render() {
    const { dataList, ListComponent } = this.props;
    // const { mobile, tablet, computer, largeScreen, widescreen, customClass, rerender } = this.props;
    return (
      <ScrollContainer>
        {dataList && dataList.length > 0 ?
          dataList.map(content => <ListComponent data={content} />)
          : <p>등록된 게시글이 없습니다.</p>}
        {dataList && dataList.length > 0 ? <div onClick={this.getLoadData}>next</div> : <div>1</div>}
      </ScrollContainer>
    );
  }
}

export default ScrollBoardList;
