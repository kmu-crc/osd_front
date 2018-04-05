import React, { Component } from 'react';
import ClientTemplate from '../../templates/ClientTemplate';
import DesignList from '../../components/DesignList';

class DesignListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignList />
     </ClientTemplate>
    );
  }
}

export default DesignListPage;