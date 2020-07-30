import React, { Component } from 'react'
import GroupListContainer from "containers/Groups/GroupListContainer"
import ClientTemplate from "templates/ClientTemplate";

class GroupListPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <GroupListContainer
          sort={this.props.match.params.sorting ? this.props.match.params.sorting : null}
          cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
          cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
          history={this.props.history} />
      </ClientTemplate>
    );
  }

}

export default GroupListPage

