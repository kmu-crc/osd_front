import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailStepRequest } from "actions/Design";
import { GetDesignBoardRequest } from "actions/Designs/DesignBoard";
import DetailStep from "components/Designs/DetailStep";

class DesignDetailStepContainer extends Component {
  render() {
    return (
      <div>
        <DetailStep {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailStep: state.DesignDetailStep.status.DesignDetailStep
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer);
