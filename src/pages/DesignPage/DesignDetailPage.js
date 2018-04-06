import React, { Component } from 'react';
import ClientTemplate from '../../templates/ClientTemplate';
import DesignDetailContainer from '../../containers/DesignDetailContainer';

class DesignDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <div>here</div>
        <DesignDetailContainer />
     </ClientTemplate>
    );
  }
}

export default DesignDetailPage;
