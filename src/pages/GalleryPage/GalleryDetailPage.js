import React, { Component } from "react";
import GalleryDetailContainer from "containers/Gallery/GalleryDetailContainer/GalleryDetailContainer";

export class GalleryDetailPage extends Component {
  render() {
    return(
        <GalleryDetailContainer id={this.props.match.params.id}
                              history={this.props.history}/>
    );
  }
}

