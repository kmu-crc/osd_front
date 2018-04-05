import React, { Component } from 'react';
import ClientTemplate from '../../templates/ClientTemplate';
import DesignListContainer from '../../containers/DesignListContainer';

class DesignListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignListContainer />
     </ClientTemplate>
    );
  }
}

export default DesignListPage;
