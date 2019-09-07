import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardSource from "components/Designs/CardSource";
import { UpdateCardImagesRequest, UpdateCardSourcesRequest, GetDesignDetailViewRequest } from "redux/modules/design";

class CardSourceContainer extends Component {
  render() {
    return (
      <CardSource {...this.props} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    status: state.DesignCard.DesignDetailStepCard.status,
    view: state.Design.status.DesignDetailView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailViewRequest: (id, token) => {
      return dispatch(GetDesignDetailViewRequest(id, token))
    },
    UpdateCardImagesRequest: (data, token, id) => {
      return dispatch(UpdateCardImagesRequest(data, token, id));
    },
    UpdateCardSourcesRequest: (data, token, id) => {
      return dispatch(UpdateCardSourcesRequest(data, token, id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardSourceContainer));
