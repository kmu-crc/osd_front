import React, { Component } from "react";
import { connect } from "react-redux";
import MakerDetail from "components/Makers/MakerDetail";
import { GetExpertMakerViewDetailRequest } from "actions/Expert";
import { LikeMakerRequest, UnlikeMakerRequest, GetLikeMakerRequest } from "actions/Maker";
import { CreateRequestRequest, GetMakerRequestListRequest } from "actions/Request";

class MakerDetailContainer extends Component {
  componentWillMount() {
    this.props.GetExpertMakerViewDetailRequest(this.props.id)
      .then(
        this.props.GetLikeMakerRequest(this.props.id, this.props.token)
      );
  }
  render() {
    return (<MakerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  like: state.MakerLike.status.like,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  MakerViewDetail: state.MakerDetail.status.MakerViewDetail,
});

const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
  GetMakerRequestListRequest: (id, page) => dispatch(GetMakerRequestListRequest(id, page)),
  GetExpertMakerViewDetailRequest: (id) => dispatch(GetExpertMakerViewDetailRequest(id)),
  LikeMakerRequest: (id, token) => dispatch(LikeMakerRequest(id, token)),
  UnlikeMakerRequest: (id, token) => dispatch(UnlikeMakerRequest(id, token)),
  GetLikeMakerRequest: (id, token) => dispatch(GetLikeMakerRequest(id, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
