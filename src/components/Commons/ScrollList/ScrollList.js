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

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ScrollList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = page => {
    this.props.getListRequest(page)
    .then(() => {
      this.setState({
        hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true,
        loading: true
      });
    }).catch((err)=>{
      console.log(err);
      this.setState({
        hasMore: false
      });
    });
  };

  render() {
    const ListComponent = this.props.ListComponent;

    return (
      <ScrollContainer>
        {this.props.dataListAdded.length > 0 ?
          <InfiniteScroll threshold={100} pageStart={0}
                          loadMore={this.getLoadData} hasMore={this.state.hasMore}
                          loader={
                            <Loader className="loading" active={false} inline="centered" size="huge" key={0}/>
                          }>
            <ListContainer devided="vertically" padded={true} as="ul">
              <Grid.Row>
                  {this.props.dataListAdded.map((content) => (
                    <Grid.Column mobile={this.props.mobile} tablet={this.props.tablet} computer={this.props.computer}
                                largeScreen={this.props.largeScreen} widescreen={this.props.widescreen}
                                className={this.props.customClass}
                                key={content.uid}>
                      <ListComponent data={content} rerender={this.props.rerender}/>
                    </Grid.Column>
                  ))
                }
              </Grid.Row>
            </ListContainer>
          </InfiniteScroll>
          :
          <p>등록된 글이 없습니다</p>
          }
        </ScrollContainer>
    );
  }
}

export default ScrollList;
