import React, { Component } from 'react';
import { connect } from "react-redux";
import { UpdateDesignTime, UpdateDesignBoardRequest, GetDesignBoardRequest, DeleteDesignBoardRequest, GetDesignCardRequest, UpdateCardTitleRequest } from "redux/modules/design";
import DesignBoard from "components/Designs/DesignBoard";
import { SetActive } from "redux/modules/auth"

class DesignBoardContainer extends Component {
  render() {
    return (
      <DesignBoard {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.DesignDetailStepCard.status,
    isTeam: state.DesignDetail.status.DesignDetail.is_team,
    isActive: state.Authentication.isActive,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateCardTitleRequest: (data, token, id) => {
      return dispatch(UpdateCardTitleRequest(data, token, id));
    },
    GetDesignCardRequest: (id, board_id) => {
      return dispatch(GetDesignCardRequest(id, board_id));
    },
    UpdateDesignBoardRequest: (id, token, data) => {
      return dispatch(UpdateDesignBoardRequest(id, token, data));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    DeleteDesignBoardRequest: (id, board_id, token) => {
      return dispatch(DeleteDesignBoardRequest(id, board_id, token))
    },
    SetActive: (active) => {
      return dispatch(SetActive(active))
    },
    UpdateDesignTime: (id, token) => {
      return dispatch(UpdateDesignTime(id, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignBoardContainer);
