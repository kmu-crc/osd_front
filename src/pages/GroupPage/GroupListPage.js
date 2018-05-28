import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import GroupListContainer from 'containers/Groups/GroupListContainer';

class GroupListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <GroupListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                            history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default GroupListPage;
