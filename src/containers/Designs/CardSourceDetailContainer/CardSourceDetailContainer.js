import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetCardDetailRequest, UpdateDesignTime, GetDesignSourceRequest, UpdateDesignSourceRequest, DesignSourceResetRequest } from "redux/modules/design";
import CardSourceDetail from "components/Designs/CardSourceDetail";

class CardSourceDetailContainer extends Component {
  render() {
    return (
      <CardSourceDetail {...this.props} upDateRequest={this.props.UpdateDesignSourceRequest} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    content: state.DesignCard.status.content,
    origin: state.DesignCard.status.origin,
    status: state.DesignCard.DesignSourceDetail.status,
    editStatus: state.DesignCard.DesignSourceEdit.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignSourceRequest: (id) => {
      return dispatch(GetDesignSourceRequest(id));
    },
    GetCardDetailRequest: id => {
      return dispatch(GetCardDetailRequest(id));
    },
    UpdateDesignSourceRequest: (data, card_id, token) => {
      return dispatch(UpdateDesignSourceRequest(data, card_id, token));
    },
    DesignSourceResetRequest: () => {
      return dispatch(DesignSourceResetRequest());
    },
    UpdateDesignTime: (design_id, token) => {
      return dispatch(UpdateDesignTime(design_id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceDetailContainer)
