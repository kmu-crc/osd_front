import React, { Component } from 'react';
import { connect } from "react-redux";
import {GetDesignSourceRequest, UpdateDesignSourceRequest} from "actions/Designs/DesignCard";
import CardSourceDetail from "components/Designs/CardSourceDetail";

class CardSourceDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return(
      <CardSourceDetail {...this.props} />
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceDetailContainer);
