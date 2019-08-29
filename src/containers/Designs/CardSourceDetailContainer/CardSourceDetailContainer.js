import React, { Component } from 'react';
import { connect } from "react-redux";
import {UpdateDesignTime, GetDesignSourceRequest, UpdateDesignSourceRequest, DesignSourceResetRequest} from "redux/modules/design";
import CardSourceDetail from "components/Designs/CardSourceDetail";

class CardSourceDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    console.log("TEST", this.props)
    return(
      <CardSourceDetail {...this.props} upDateRequest={this.props.UpdateDesignSourceRequest}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    content: state.DesignCard.status.content,
    status: state.DesignCard.DesignSourceDetail.status,
    editStatus: state.DesignCard.DesignSourceEdit.status
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
