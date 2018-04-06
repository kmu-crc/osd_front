import React, { Component } from "react";

class DesignDetail extends Component {
  render(){
    const designDetail = this.props.DesignDetail;
    return(
      <div>{designDetail.title}</div>
    );
  }
}

export default DesignDetail;