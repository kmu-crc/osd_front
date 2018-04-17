import React, { Component } from "react";

class GroupDetail extends Component {
  render(){
    const groupDetail = this.props.GroupDetail;
    return(
      <div>
        <div>{groupDetail.title}</div>
        <div>{groupDetail.explanation}</div>
        <div>{groupDetail.update_time}</div>
        
      </div>
    );
  }
}

export default GroupDetail;