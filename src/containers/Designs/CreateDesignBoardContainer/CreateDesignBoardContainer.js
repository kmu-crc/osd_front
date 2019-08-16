import React, { Component } from "react";
import CreateBoard from "components/Designs/CreateBoard";
import { connect } from "react-redux";
import { GetDesignDetailRequest, CreateDesignBoardRequest, UpdateDesignTime, GetDesignBoardRequest } from "redux/modules/design";

class CreateDesignBoardContainer extends Component {
  render() {
    return (
      <CreateBoard {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDesignBoardContainer);
