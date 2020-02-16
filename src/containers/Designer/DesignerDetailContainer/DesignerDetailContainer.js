import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerDetail from "components/Designers/DesignerDetail";
import { GetExpertDesignerViewDetailRequest} from "actions/Expert"


class GroupDetailContainer extends Component {
  componentWillMount(){
    this.props.GetExpertDesignerViewDetailRequest(this.props.id);
  }
  render() {
    console.log("ModifyDesignerContainer=====",this.props);
    return (<DesignerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like,
    Count: state.DesignerDetail.status.Count,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    DesignerViewDetail: state.DesignerDetail.status.DesignerViewDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetExpertDesignerViewDetailRequest: (data) => {
      return dispatch(GetExpertDesignerViewDetailRequest(data))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
