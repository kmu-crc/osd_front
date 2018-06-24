import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DesignBoardCard from "components/Designs/DesignBoardCard";
import {
  UpdateCardTitleRequest,
  UpdateCardContentRequest,
  GetCardDetailRequest,
  UpdateCardImagesRequest,
  UpdateCardSourcesRequest,
  DeleteDesignCardRequest
} from "actions/Designs/DesignCard";
import { GetDesignBoardRequest } from "actions/Designs/DesignBoard";

class DesignBoardCardContainer extends Component {
  render() {
    return <DesignBoardCard {...this.props} />;
  }
}
const mapStateToProps = state => {
  return {
    token: state.Authentication.status.token,
    detail: state.DesignDetailStepCard.status.DesignDetailStepCard,
    isTeam: state.DesignDetail.status.DesignDetail.is_team
  };
};

const mapDispatchToProps = dispatch => {
  return {
    UpdateCardTitleRequest: (data, token, id) => {
      return dispatch(UpdateCardTitleRequest(data, token, id));
    },
    UpdateCardContentRequest: (data, token, id) => {
      return dispatch(UpdateCardContentRequest(data, token, id));
    },
    UpdateCardImagesRequest: (data, token, id) => {
      return dispatch(UpdateCardImagesRequest(data, token, id));
    },
    UpdateCardSourcesRequest: (data, token, id) => {
      return dispatch(UpdateCardSourcesRequest(data, token, id));
    },
    DeleteDesignCardRequest: (board_id, card_id, token) => {
      return dispatch(DeleteDesignCardRequest(board_id, card_id, token));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    GetCardDetailRequest: id => {
      return dispatch(GetCardDetailRequest(id));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DesignBoardCardContainer)
);
