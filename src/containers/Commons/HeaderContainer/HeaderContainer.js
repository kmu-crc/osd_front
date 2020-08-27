import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "components/Commons/Header";
import { SignOutRequest } from "actions/Registration";
import { SetActive } from "actions/OpenDesign";
// import {GetNotification} from "actions/Commons/Notification"
// notification: state.Authentication.status.notification,
// GetNotification: ()=>{
// return dispatch(GetNotification())
// },
import { GetItemSearchCountRequest } from "actions/Design";
import { GetMakerSearchCountRequest } from "actions/Maker";
import { GetDesignerSearchCountRequest } from "actions/Designer";
class HeaderContainer extends Component {
  componentWillMount(){
    // this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword)
    // .then(()=>this.props.GetMakerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword))
    // .then(()=>this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword));
  }
  render() {
    return (<Header {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  valid: state.Authentication.status.valid,
  userInfo: state.Authentication.status.userInfo,
  isActive: state.OpenDesign.isActive,
  signed: state.SignIn.status.success,
});
const mapDispatchToProps = (dispatch) => ({
  SignOutRequest: () => dispatch(SignOutRequest()),
  SetActive: (active) => dispatch(SetActive(active)),
  GetItemSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetItemSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  },
  GetMakerSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetMakerSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  },
  GetDesignerSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetDesignerSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
