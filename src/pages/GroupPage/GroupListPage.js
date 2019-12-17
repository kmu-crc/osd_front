import React, { Component } from 'react';
import GroupListContainer from 'containers/Groups/GroupListContainer';

class GroupListPage extends Component {
  render() {
    return(
        <GroupListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                            history={this.props.history}/>
    );
  }
}

export default GroupListPage;
