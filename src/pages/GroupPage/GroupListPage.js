import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import GroupListContainer from 'containers/Groups/GroupListContainer';

class GroupListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <GroupListContainer/>
     </ClientTemplate>
    );
  }
}

export default GroupListPage;
