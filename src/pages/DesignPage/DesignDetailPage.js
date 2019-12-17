import React, { Component } from "react";
import DesignDetailContainer from "containers/Designs/DesignDetailContainer";

export class DesignDetailPage extends Component {
  render() {
    return(
        <DesignDetailContainer id={this.props.match.params.id}/>
    );
  }
}
