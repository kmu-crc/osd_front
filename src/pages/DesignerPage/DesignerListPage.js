import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import DesignerListContainer from 'containers/Designer/DesignerListContainer';

class DesignerListPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignerListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                               cate1={this.props.match.params.cate1? this.props.match.params.cate1 : null}
                               cate2={this.props.match.params.cate2? this.props.match.params.cate2 : null}
                               history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default DesignerListPage;
