import React, { Component } from 'react';
import ResponseToDesignerReqContainer from "containers/Designer/ResponseToDesignerReqContainer";

class ResponseToDesignerReqPage extends Component {
  render() {
    return (<ResponseToDesignerReqContainer id={this.props.match.params.id} />);
  }
}

export default ResponseToDesignerReqPage;
