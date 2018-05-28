import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { Loader } from "semantic-ui-react";
import ContentList from "components/Commons/ContentList";

class ScrollList extends Component {
  state = {
    hasMore: true,
    loading: false
  }

  getLoadData = (page) => {
    this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2)
      .then(() => {
        this.setState({
          hasMore: this.props.DesignList.length === 0 ? false : true
        });
      });
  }
  
  render(){
    return(
      <InfiniteScroll threshold={100} pageStart={-1} loadMore={this.getLoadData}
                      hasMore={this.state.hasMore}
                      loader={<Loader active={this.state.loading ? true : false} inline="centered" size="huge" key={0} />}>
      {this.props.DesignListAdded.map((list, i) => (<ContentList key={i} data={list} user={this.props.userInfo} type="design" columns={5}/>)
    )}
      </InfiniteScroll>
    );
  }
}

export default ScrollList;
