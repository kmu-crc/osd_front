import React, { Component } from "react";

class DetailView extends Component {
  render(){
    let detailView = this.props.DesignDetailView;
    console.log(detailView);
    return(
      <div>
        디자인뷰
      </div>
    );
  }
}

export default DetailView;