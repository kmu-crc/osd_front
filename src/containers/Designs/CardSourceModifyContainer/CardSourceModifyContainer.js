import React, { Component } from 'react';
import { connect } from "react-redux";
import {GetDesignSourceRequest, DesignSourceResetRequest, UpdateCardSourceRequest, GetCardDetailRequest} from "actions/Designs/DesignCard";
import {GetDesignDetailRequest} from "actions/Design";
import {UpdateDesignTime} from "actions/Designs/UpdateDesign";
import DesignCardModify from "components/Designs/DesignCardModify";

class CardSourceModifyContainer extends Component {
  render() {
    return(
      <DesignCardModify {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    detail: state.DesignDetailStepCard.status.DesignDetailStepCard,
    content: state.DesignSourceDetail.status.content,
    status: state.DesignSourceDetail.DesignSourceDetail.status,
    editStatus: state.DesignSourceDetail.DesignSourceEdit.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignSourceRequest: (id) => {
      return dispatch(GetDesignSourceRequest(id));
    },
    DesignSourceResetRequest: () => {
      return dispatch(DesignSourceResetRequest());
    },
    UpdateCardSourceRequest: (data, id, token) => {
      return dispatch(UpdateCardSourceRequest(data, id, token))
    },
    UpdateDesignTime: (id, token) => {
      return dispatch(UpdateDesignTime(id, token))
    },
    GetCardDetailRequest: id => {
      return dispatch(GetCardDetailRequest(id));
    },
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceModifyContainer);
