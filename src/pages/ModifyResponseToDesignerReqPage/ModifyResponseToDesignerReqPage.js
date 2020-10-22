import React, { Component } from 'react';
import ModifyResponseToDesignerReqContainer from "containers/Designer/ModifyResponseToDesignerReqContainer";

class ModifyResponseToDesignerReqPage extends Component {
  render() {
    return (<ModifyResponseToDesignerReqContainer
      detail={this.props.location.state && this.props.location.state.detail}
      expert={this.props.location.state && this.props.location.state.expert}
      id={this.props.match.params.id}
    />);
  }
}

export default ModifyResponseToDesignerReqPage;
