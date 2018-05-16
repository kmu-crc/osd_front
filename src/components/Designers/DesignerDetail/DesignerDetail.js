import React, { Component } from "react";

class DesignerDetail extends Component {
  render(){
    const designerDetail = this.props.DesignerDetail;
    return(
      <div>{designerDetail.uid}</div>
    );
  }
}

export default DesignerDetail;