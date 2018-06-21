import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetDesignCardRequest } from "actions/Designs/DesignCard";
import { UpdateDesignBoardRequest, GetDesignBoardRequest, DeleteDesignBoardRequest } from "actions/Designs/DesignBoard";
import DesignBoard from "components/Designs/DesignBoard";
import { SetActive } from "actions/OpenDesign";

class DesignBoardContainer extends Component {
  render() {
    return(
      <DesignBoard {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.DesignDetailStepCard.status,
    isTeam: state.DesignDetail.status.DesignDetail.is_team,
    isActive: state.OpenDesign.isActive,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignCardRequest: (id, board_id) => {
      return dispatch(GetDesignCardRequest(id, board_id));
    },
    UpdateDesignBoardRequest: (id, token, data) => {
      return dispatch(UpdateDesignBoardRequest(id, token, data));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    DeleteDesignBoardRequest: (id, token) => {
      return dispatch(DeleteDesignBoardRequest(id, token))
    },
    SetActive: (active) => {
      return dispatch(SetActive(active))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignBoardContainer);
