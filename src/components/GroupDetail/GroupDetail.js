import React, { Component } from "react";

class GroupDetail extends Component {
  render(){
    const groupDetail = this.props.GroupDetail;
    return(
      <div>{groupDetail.title}</div>
    );
  }
}

export default GroupDetail;