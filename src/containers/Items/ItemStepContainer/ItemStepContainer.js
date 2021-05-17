import React, { Component } from "react";
import { connect } from "react-redux";
import GridEditor from "components/GridEditor";
import { GetItemStepsRequest2, CreateItemListRequest, DeleteItemListRequest, UpdateItemListRequest } from "actions/Item";
import { UpdateCardTitleRequest, GetDesignCardRequest, } from "actions/Designs/DesignCard"
import { GetDesignBoardRequest, } from "actions/Designs/DesignBoard";

class ItemStepContainer extends Component {
  componentDidMount() {
    const { header, index, token } = this.props;
    console.log(header, index, token);

    if (header != null) {
      this.props.GetItemStepsRequest2(index, header.uid, token);
    } else {
      alert("no head");
    }
  }
  GetItemStep = () => {
    const { header, index, token } = this.props;
    if (header != null)
      this.props.GetItemStepsRequest2(index, header.uid, token);
  }
  render() {
    const { ItemDetail, ItemStep } = this.props
    console.log("STEPS:", ItemDetail, ItemStep);
    return (
      <GridEditor {...this.props} GetItemStepsRequest={this.GetItemStep} itemId={ItemDetail.item_id} item={ItemDetail} />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { index } = props;
  return {
    ItemDetail: state.ItemDetail.status.ItemDetail,
    ItemStep: state.ItemSteps.ItemSteps[index],
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
  }
};

const mapDispatchToProps = (dispatch) => ({
  GetItemStepsRequest2: (index, id, token) => dispatch(GetItemStepsRequest2(index, id, token)),
  CreateItemListRequest: (data, id, token) => dispatch(CreateItemListRequest(data, id, token)),
  DeleteItemListRequest: (id, list_id, token) => dispatch(DeleteItemListRequest(id, list_id, token)),
  UpdateItemListRequest: (id, list_id, token, data) => dispatch(UpdateItemListRequest(id, list_id, token, data)),
  // 
  UpdateCardTitleRequest: (data, token, id) => dispatch(UpdateCardTitleRequest(data, token, id)),
  GetDesignBoardRequest: (id) => dispatch(GetDesignBoardRequest(id)),
  GetDesignCardRequest: (id, board_id) => dispatch(GetDesignCardRequest(id, board_id)),
  // 
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemStepContainer);
