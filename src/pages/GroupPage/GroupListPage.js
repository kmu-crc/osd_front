import React, { Component } from 'react';
import ClientTemplate from '../../templates/ClientTemplate';
import GroupListContainer from '../../containers/GroupListContainer';

class GroupListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <GroupListContainer />
     </ClientTemplate>
    );
  }
}

export default GroupListPage;
