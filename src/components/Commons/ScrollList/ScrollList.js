import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
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
    this.props.getListRequest(page)
    .then(() => {
      this.setState({
        hasMore: this.props.dataList === null || this.props.dataList.length === 0 ? false : true
      });
    }).catch((err)=>{
      this.setState({
        hasMore: false
      });
    });
  };

  render() {
    const ListComponent = this.props.ListComponent;
    return (
      <InfiniteScroll threshold={100} pageStart={-1}
                      loadMore={this.getLoadData} hasMore={this.state.hasMore}
                      loader={<Loader active={this.state.loading ? true : false} inline="centered" size="huge" key={0}/>}>
        <ListContainer devided="vertically" padded={true} as="ul">
          <Grid.Row>
            {this.props.dataListAdded.length > 0 ?
              this.props.dataListAdded.map((content, i) => (
                <Grid.Column mobile={this.props.mobile} tablet={this.props.tablet} computer={this.props.computer} 
                             largeScreen={this.props.largeScreen} widescreen={this.props.widescreen} 
                             className={this.props.customClass}
                             key={content.uid}>
                  <ListComponent data={content} rerender={this.props.rerender}/>
                </Grid.Column>
              ))
              :
              <p>해당 컨텐츠가 없습니다</p>
            }
          </Grid.Row>
        </ListContainer>
      </InfiniteScroll>
    );
  }
}

export default ScrollList;
