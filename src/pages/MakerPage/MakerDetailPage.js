import React, { Component } from "react";
import MakerDetailContainer from "containers/Maker/MakerDetailContainer";

export class MakerDetailPage extends Component {
  render() {
    return(
        <MakerDetailContainer id={this.props.match.params.id}
                                 type={this.props.match.params.type? this.props.match.params.type : null}
                                 history={this.props.history}/>
    );
  }
}
