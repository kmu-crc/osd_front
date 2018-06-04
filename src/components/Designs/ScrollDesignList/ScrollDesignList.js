import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import Design from "components/Designs/Design";
import styled from "styled-components";

// css styling

const ListContainer = styled(Grid) `
  margin-top: 30px;
`;

class ScrollDesignList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = page => {
    this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2)
      .then(() => {
        this.setState({
          hasMore: this.props.DesignList === null || this.props.DesignList.length === 0 ? false : true,
          loading: false
        })
      }).catch(()=>{
        this.setState({
          hasMore: false
        });
      });
  };

  render() {
    return (
      <InfiniteScroll threshold={100} pageStart={-1}
        loadMore={this.getLoadData} hasMore={this.state.hasMore}
        loader={<Loader active={this.state.loading ? true : false} inline="centered" size="huge" key={0} />}>
        <ListContainer devided="vertically" padded={true} centered={true} as="ul">
          <Grid.Row>
            {this.props.DesignListAdded.length > 0 ?
              this.props.DesignListAdded.map((content, i) => (
                <Grid.Column mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} key={content.uid} className="largeCustom"><Design design={content} /></Grid.Column>
              ))
              :
              <p>해당 디자인이 없습니다</p>
            }
          </Grid.Row>
        </ListContainer>
      </InfiniteScroll>
    );
  }
}

export default ScrollDesignList;
