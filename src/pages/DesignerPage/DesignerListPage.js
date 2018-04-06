import React, { Component } from 'react';
import ClientTemplate from '../../templates/ClientTemplate';
import DesignerListContainer from '../../containers/DesignerListContainer';

class DesignerListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignerListContainer />
     </ClientTemplate>
    );
  }
}

export default DesignerListPage;
