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
      console.log(err);
      this.setState({
        hasMore: false
      });
    });
  };

  render() {
    const ListComponent = this.props.ListComponent;
 
    return (
      <div>
        {this.props.dataListAdded.length > 0 ?
          <InfiniteScroll threshold={100} pageStart={0}
                          loadMore={this.getLoadData} hasMore={this.state.hasMore}
                          loader={<Loader active={this.state.loading ? true : false} inline="centered" size="huge" key={0}/>}>
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
          <div>등록된 디자인이 없습니다</div>}
        </div>
    );
  }
}

export default ScrollList;
