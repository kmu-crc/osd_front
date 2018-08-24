import React, { Component } from 'react';
import { connect } from "react-redux";
import {GetDesignSourceRequest, DesignSourceResetRequest, UpdateCardSourceRequest} from "actions/Designs/DesignCard";
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceModifyContainer);
