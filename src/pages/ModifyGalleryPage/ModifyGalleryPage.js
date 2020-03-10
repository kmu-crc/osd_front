import React, { Component } from "react";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer/ModifyGroupInfoContainer";

class ModifyGalleryPage extends Component {
  render() {
    return(
        <ModifyGroupInfoContainer id={this.props.match.params.id} history={this.props.history}/>
    );
  }
}

export default ModifyGalleryPage;
