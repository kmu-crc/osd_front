import React, { Component } from "react"
import { connect } from "react-redux"
import GridEditor from "modules/GridEditor"
import { GetDesignDetailRequest, CreateDesignBoardRequest, UpdateDesignTime, GetDesignBoardRequest } from "redux/modules/design";

class DesignDetailStepContainer extends Component {
  componentDidMount() {
    this.props.GetDesignBoardRequest(this.props.design.uid)
  }
  render() {
    return (<>
      <GridEditor {...this.props} />
    </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    DesignDetailStep: state.DesignCard.status.DesignDetailStep,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignBoardRequest: (data, design_id, token) => {
      return dispatch(CreateDesignBoardRequest(data, design_id, token));
    },
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    UpdateDesignTime: (design_id, token) => {
      return dispatch(UpdateDesignTime(design_id, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer)
