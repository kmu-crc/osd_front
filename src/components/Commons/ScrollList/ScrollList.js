import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import Design from "components/Designs/Design";
import styled from "styled-components";

// css styling

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ScrollList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = page => {
    this.props
      .GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2)
      .then(() => {
        this.setState({
          hasMore: this.props.DesignList.length === 0 ? false : true
        });
      });
  };

  render() {
    return (
      <InfiniteScroll threshold={100} pageStart={-1}
                      loadMore={this.getLoadData} hasMore={this.state.hasMore}
                      loader={<Loader active={this.state.loading ? true : false} inline="centered" size="huge" key={0}/>}>
        <ListContainer devided="vertically" padded={true} columns={5} as="ul">
          <Grid.Row>
            {this.props.DesignListAdded.map((content, i) => (
              <Grid.Column key={content.uid}>
                <Design design={content} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </ListContainer>
      </InfiniteScroll>
    );
  }
}

export default ScrollList;
