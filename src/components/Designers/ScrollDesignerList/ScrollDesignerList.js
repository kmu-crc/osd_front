import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import Designer from "components/Designers/Designer";
import styled from "styled-components";

// css styling

const ListContainer = styled(Grid)`
  margin-top: 30px;
`;

class ScrolldesignerList extends Component {
  state = {
    hasMore: true,
    loading: false
  };

  getLoadData = page => {
    this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2)
    .then(() => {
      this.setState({
        hasMore: this.props.DesignerList === null || this.props.DesignerList.length === 0 ? false : true
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
            {this.props.DesignerListAdded.length > 0 ?
              this.props.DesignerListAdded.map((content, i) => (
                <Grid.Column key={content.uid}><Designer designer={content}/></Grid.Column>
              ))
              :
              <p>해당 디자이너가 없습니다</p>
            }
          </Grid.Row>
        </ListContainer>
      </InfiniteScroll>
    );
  }
}

export default ScrolldesignerList;
