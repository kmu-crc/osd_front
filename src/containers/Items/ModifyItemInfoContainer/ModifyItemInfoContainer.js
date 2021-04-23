import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyItemInfo from "components/Items/ModifyItemInfo";
import { GetDesignDetailRequest } from "actions/Design";
import { UpdateDesignInfoRequest } from "actions/Designs/UpdateDesign";
import { UpdateItemListHeaderRequest, } from "actions/Item";
import { SearchMemberRequest } from "actions/Commons/Search";

class ModifyItemInfoContainer extends Component {
  render() {
    return (<ModifyItemInfo {...this.props} />);
  }
}
const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  ItemDetail: state.ItemDetail.status.ItemDetail,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  members: state.Search.status.members
});

const mapDispatchToProps = (dispatch) => ({
  GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
  UpdateDesignInfoRequest: (data, id, token) => dispatch(UpdateDesignInfoRequest(data, id, token)),
  SearchMemberRequest: (data, token) => dispatch(SearchMemberRequest(data, token)),
  UpdateItemListHeaderRequest: (id, token, data) => dispatch(UpdateItemListHeaderRequest(id, token, data)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyItemInfoContainer));
