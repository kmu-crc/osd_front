import React, { Component } from "react";
import { connect } from "react-redux";
// import GridEditor from "components/GridEditor";
import { LocalGridEditor as GridEditor } from "components/GridEditor/LocalGridEditor";
import { GetItemStepsRequest, CreateItemListRequest, DeleteItemListRequest, UpdateItemListRequest } from "actions/Item";
// , ,
// , GetCardDetailRequest, GetDesignCardRequest, GetDesignBoardRequest,
// UpdateCardTitleRequest, UpdateDesignBoardRequest, 

class ItemStepContainer extends Component {
  componentDidMount() {
    this.props.GetItemStepsRequest(this.props.ItemDetail["item-id"], this.props.token);
  }
  render() {
    console.log(this.props.ItemStep);
    return (
      <GridEditor {...this.props} itemId={this.props.ItemDetail["item-id"]} item={this.props.ItemDetail} />
    );
  }
}

const mapStateToProps = (state) => ({
  ItemDetail: state.ItemDetail.status.ItemDetail,
  ItemStep: state.ItemStep.status.ItemStep,
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  GetItemStepsRequest: (id, token) => dispatch(GetItemStepsRequest(id, token)),
  CreateItemListRequest: (data, id, token) => dispatch(CreateItemListRequest(data, id, token)),
  DeleteItemListRequest: (id, list_id, token) => dispatch(DeleteItemListRequest(id, list_id, token)),
  UpdateItemListRequest: (id, list_id, token, data) => dispatch(UpdateItemListRequest(id, list_id, token, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemStepContainer);
