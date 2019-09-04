import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignFile from "components/Designs/ModifyDesignFile";
import { GetDesignDetailViewRequest } from "actions/Design";
import { UpdateCardImagesRequest, UpdateCardSourcesRequest, DeleteDesignCardRequest } from "actions/Designs/DesignCard";

class ModifyDesignFileContainer extends Component {

  render() {
    return(
      <ModifyDesignFile {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetailView: state.Design.status.DesignDetailView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailViewRequest: (id) => {
      return dispatch(GetDesignDetailViewRequest(id))
    },
    UpdateCardImagesRequest: (data, token, id) => {
      return dispatch(UpdateCardImagesRequest(data, token, id));
    },
    UpdateCardSourcesRequest: (data, token, id) => {
      return dispatch(UpdateCardSourcesRequest(data, token, id));
    },
    DeleteDesignCardRequest: (board_id, card_id, token) => {
      return dispatch(DeleteDesignCardRequest(board_id, card_id, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignFileContainer));
