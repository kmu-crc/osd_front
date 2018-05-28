import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import Group from "components/Groups/Group";
import styled from "styled-components";

// css styling

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ScrollGroupList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = page => {
    this.props.GetGroupListRequest(page, this.props.sort)
    .then(() => {
      this.setState({
        hasMore: this.props.GroupList === null || this.props.GroupList.length === 0 ? false : true
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
            {this.props.GroupListAdded.length > 0 ?
              this.props.GroupListAdded.map((content, i) => (
                <Grid.Column key={content.uid}><Group group={content}/></Grid.Column>
              ))
              :
              <p>그룹이 없습니다</p>
            }
          </Grid.Row>
        </ListContainer>
      </InfiniteScroll>
    );
  }
}

export default ScrollGroupList;
