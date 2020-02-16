import React, { Component } from 'react';
import { connect } from "react-redux";
import {GetDesignSourceRequest, UpdateDesignSourceRequest, DesignSourceResetRequest} from "actions/Designs/DesignCard";
import CardSourceDetail from "components/Designs/CardSourceDetail";
import { UpdateDesignTime } from "actions/Designs/UpdateDesign"

class CardSourceDetailContainer extends Component {
  render() {
    return(
      <CardSourceDetail {...this.props} upDateRequest={this.props.UpdateDesignSourceRequest}/>
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
    UpdateDesignSourceRequest: (data, card_id, token) => {
      return dispatch(UpdateDesignSourceRequest(data, card_id, token));
    },
    DesignSourceResetRequest: () => {
      return dispatch(DesignSourceResetRequest());
    },
    UpdateDesignTime: (design_id, token)=>{
      return dispatch(UpdateDesignTime(design_id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceDetailContainer)
