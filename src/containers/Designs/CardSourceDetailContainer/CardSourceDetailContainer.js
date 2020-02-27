import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  // GetDesignSourceRequest, 
  UpdateDesignSourceRequest, DesignSourceResetRequest
} from "actions/Designs/DesignCard";
import { GetItemContentsRequest, UpdateItemContentsRequest } from "actions/Item";
import CardSourceDetail from "components/Items/ItemDetail/CardSourceDetail";
import { UpdateDesignTime } from "actions/Designs/UpdateDesign"

class CardSourceDetailContainer extends Component {
  componentDidMount() {
    this.props.GetItemContentsRequest(this.props.cardId, this.props.token);
  }
  render() {
     return (
      <CardSourceDetail {...this.props} upDateRequest={this.props.UpdateDesignSourceRequest} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    content: state.ItemContent.status.content,

    status: state.ItemContent.ItemContentEdit.status,
    editStatus: state.ItemContent.ItemContentEdit.status
  };
};

const mapDispatchToProps = (dispatch) => ({
  GetItemContentsRequest: (id) => dispatch(GetItemContentsRequest(id)),

  UpdateItemContentsRequest: (data, card_id, token) => dispatch(UpdateItemContentsRequest(data, card_id, token)),

  DesignSourceResetRequest: () => { return dispatch(DesignSourceResetRequest()); },
  UpdateDesignTime: (design_id, token) => { return dispatch(UpdateDesignTime(design_id, token)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceDetailContainer)
