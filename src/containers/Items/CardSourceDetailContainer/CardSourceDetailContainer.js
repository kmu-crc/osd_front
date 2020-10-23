import React, { Component } from 'react';
import { connect } from "react-redux";
// import {
//   // GetDesignSourceRequest, 
//   UpdateDesignSourceRequest, DesignSourceResetRequest
// } from "actions/Designs/DesignCard";
import { GetItemContentsRequest, UpdateItemContentsRequest } from "actions/Item";
import CardSourceDetail from "components/Items/ItemDetail/CardSourceDetail";


class CardSourceDetailContainer extends Component {
  componentDidMount() {
    this.props.cardId && this.props.GetItemContentsRequest(this.props.cardId, this.props.token);
  }
  render() {
    return (
      <CardSourceDetail {...this.props} handlerModifyContent={()=>this.props.handlerModifyContent} upDateRequest={this.props.UpdateItemContentsRequest} />
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  content: state.ItemContent.status.content,
  ItemDetail: state.ItemDetail.status.ItemDetail,
  status: state.ItemContent.ItemContentEdit.status,
  editStatus: state.ItemContent.ItemContentEdit.status
});

const mapDispatchToProps = (dispatch) => ({
  GetItemContentsRequest: (id) => dispatch(GetItemContentsRequest(id)),
  UpdateItemContentsRequest: (data, card_id, token) => dispatch(UpdateItemContentsRequest(data, card_id, token)),

  // DesignSourceResetRequest: () => { return dispatch(DesignSourceResetRequest()); },
  // UpdateDesignTime: (design_id, token) => { return dispatch(UpdateDesignTime(design_id, token)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSourceDetailContainer);
