import React, { Component } from "react";
import ModifyItemFormContainer from "containers/Items/ModifyItemFormContainer";
// import styled from "styled-components";
// import ContentBox from "components/Commons/ContentBox";

// const Wrapper = styled(ContentBox)`
//   margin-top: -70px;
//   margin-bottom: 100px;
//   position: relative;
//   z-index: 3;
// `;

class ModifyItem extends Component {
  render() {
    // console.log("props", this.props)
    return (
      <ModifyItemFormContainer
        history={this.props.history}
        id={this.props.id} />
    );
  }
}

export default ModifyItem;
