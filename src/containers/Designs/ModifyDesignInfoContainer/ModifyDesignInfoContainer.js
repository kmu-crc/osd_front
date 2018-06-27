import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignInfo from "components/Designs/ModifyDesignInfo";

class ModifyDesignInfoContainer extends Component {
  render() {
    return(
      <ModifyDesignInfo {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
