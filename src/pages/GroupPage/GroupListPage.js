import React, { Component } from 'react'
import GroupListContainer from "containers/Groups/GroupListContainer"

class GroupListPage extends Component {
  render() {
    return(
        <GroupListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                             cate1={this.props.match.params.cate1? this.props.match.params.cate1 : null}
                             cate2={this.props.match.params.cate2? this.props.match.params.cate2 : null}
                             history={this.props.history}/>
    );
  }

}

export default GroupListPage

