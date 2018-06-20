import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DesignBoardCard from "components/Designs/DesignBoardCard";
import { UpdateCardTitleRequest, UpdateCardContentRequest, GetCardDetailRequest, UpdateCardImagesRequest, UpdateCardSourcesRequest } from "actions/Designs/DesignCard";

class DesignBoardCardContainer extends Component {
  render() {
    return(
      <DesignBoardCard {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    detail: state.DesignDetailStepCard.status.DesignDetailStepCard,
    isTeam: state.DesignDetail.status.DesignDetail.is_team
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateCardTitleRequest: (data, token, id) => {
      return dispatch(UpdateCardTitleRequest(data, token, id));
    },
    UpdateCardContentRequest: (data, token, id) => {
      return dispatch(UpdateCardContentRequest(data, token, id))
    },
    UpdateCardImagesRequest: (data, token, id) => {
      return dispatch(UpdateCardImagesRequest(data, token, id));
    },
    UpdateCardSourcesRequest: (data, token, id) => {
      return dispatch(UpdateCardSourcesRequest(data, token, id));
    },
    GetCardDetailRequest: (id) => {
      return dispatch(GetCardDetailRequest(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignBoardCardContainer));
