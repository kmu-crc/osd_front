import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerDetail from "components/Designers/DesignerDetail";
import { GetExpertDesignerViewDetailRequest} from "actions/Expert";
import { LikeDesignerRequest,UnlikeDesignerRequest,GetLikeDesignerRequest } from "actions/Designer";


class GroupDetailContainer extends Component {
  componentWillMount(){
    this.props.GetExpertDesignerViewDetailRequest(this.props.id)
    .then(
      this.props.GetLikeDesignerRequest(this.props.id,this.props.token)
    );
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
    LikeDesignerRequest: (id, token) => {//다자이너를 좋아요 눌렀을 때
      return dispatch(LikeDesignerRequest(id, token))
    },
    UnlikeDesignerRequest: (id, token) => {
      return dispatch(UnlikeDesignerRequest(id, token))
    },
    GetLikeDesignerRequest: (id, token) => {
      return dispatch(GetLikeDesignerRequest(id, token))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
