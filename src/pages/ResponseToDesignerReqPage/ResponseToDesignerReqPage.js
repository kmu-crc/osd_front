import React, { Component } from 'react';
import ResponseToDesignerReqContainer from "containers/Designer/ResponseToDesignerReqContainer";

class ResponseToDesignerReqPage extends Component {
  render() {
    return (<ResponseToDesignerReqContainer
      detail={this.props.location.state && this.props.location.state.detail}
      expert={this.props.location.state && this.props.location.state.expert}
      id={this.props.match.params.id}
    />);
  }
}

export default ResponseToDesignerReqPage;
