import React, { Component } from "react";
import GroupDetailContainer from "containers/Groups/GroupDetailContainer";

export class GroupDetailPage extends Component {
  render() {
    return(
        <GroupDetailContainer id={this.props.match.params.id}
                              type={this.props.match.params.type? this.props.match.params.type : null}
                              sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                              history={this.props.history}/>
    );
  }
}

