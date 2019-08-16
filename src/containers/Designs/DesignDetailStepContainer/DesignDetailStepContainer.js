import React, { Component } from "react";
import { connect } from "react-redux";
import { UpdateDesignTime, GetDesignBoardRequest } from "redux/modules/design";
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
    DesignDetailStep: state.DesignDetailStep.status.DesignDetailStep,
    isTeam: state.DesignDetail.status.DesignDetail.is_team
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id))
    },
    UpdateDesignTime: (id, token) => {
      return dispatch(UpdateDesignTime(id, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer);
