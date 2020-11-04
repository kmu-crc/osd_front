import React, { Component } from "react";
import ModifyResponseToMakerReqContainer from "containers/Request/ModifyResponseToMakerReqContainer /ModifyResponseToMakerReqContainer";

class ModifyResponseToMakerReqPage extends Component {
  render() {
    return (<ModifyResponseToMakerReqContainer
      detail={this.props.location.state && this.props.location.state.detail}
      expert={this.props.location.state && this.props.location.state.expert}
      id={this.props.match.params.id} />);
  }
}

export default ModifyResponseToMakerReqPage;
