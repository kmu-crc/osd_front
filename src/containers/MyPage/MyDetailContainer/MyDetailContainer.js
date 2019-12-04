import React, { Component } from 'react'
import { connect } from 'react-redux'
import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';
import {
  GetMyDetailRequest,
  GetMyDesignListRequest,
  GetMyLikeDesignRequest,
  GetMyLikeDesignerRequest,
  // GetMyGroupListRequest, 
  GetMyLikeGroupRequest
} from "redux/modules/personal";
import {
  GetDesignerCountRequest,
  GetGroupInDesignerRequest,
  GetRelatedGroupInDesignerRequest,
  GetLikeInDesignerRequest,
  GetMyDesignInDesignerRequest,
  GetLikeGroupInDesignerRequest,
  GetLikeDesignerInDesignerRequest
} from "redux/modules/designer";

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
    this.props.GetDesignerCountRequest(this.props.userInfo.uid);
  }

  render() {
    return (
      <React.Fragment>
        <MypageHeader {...this.props} />
        <MypageBody {...this.props} id={this.props.userInfo.uid} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    Count: state.Designer.status.Count,
    MyDesign: state.Designer.status.MyDesignInDesigner,
    MyDesignAdded: state.Designer.status.MyDesignInDesignerAdded,
    MyLikeDesign: state.Designer.status.LikeInDesigner,
    MyLikeDesignAdded: state.Designer.status.LikeInDesignerAdded,
    MyLikeGroup: state.Designer.status.LikeGroupInDesigner,
    MyLikeGroupAdded: state.Designer.status.LikeGroupInDesignerAdded,
    MyLikeDesigner: state.Designer.status.LikeDesignerInDesigner,
    MyLikeDesignerAdded: state.Designer.status.LikeDesignerInDesignerAdded,
    MyGroup: state.Designer.status.GroupInDesigner,
    MyGroupAdded: state.Designer.status.GroupInDesignerAdded,
    RelatedGroup: state.Designer.status.RelatedGroupInDesigner,
    RelatedGroupAdded: state.Designer.status.RelatedGroupInDesignerAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerCountRequest: (id) => {
      return dispatch(GetDesignerCountRequest(id))
    },
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetMyDesignListRequest: (token, page) => {
      return dispatch(GetMyDesignListRequest(token, page))
    },
    GetMyLikeDesignRequest: (token, page) => {
      return dispatch(GetMyLikeDesignRequest(token, page))
    },
    GetMyLikeDesignerRequest: (token, page) => {
      return dispatch(GetMyLikeDesignerRequest(token, page))
    },
    GetGroupInDesignerRequest: (id, page) => {
      return dispatch(GetGroupInDesignerRequest(id, page))
    },
    GetRelatedGroupInDesignerRequest: (id, page) => {
      return dispatch(GetRelatedGroupInDesignerRequest(id, page))
    },
    // GetMyGroupListRequest: (token, page) => {
    // return dispatch(GetMyGroupListRequest(token, page))
    // },
    GetLikeInDesignerRequest: (id, page) => {
      return dispatch(GetLikeInDesignerRequest(id, page))
    },
    GetMyDesignInDesignerRequest: (id, page) => {
      return dispatch(GetMyDesignInDesignerRequest(id, page))
    },
    GetLikeGroupInDesignerRequest: (id, page) => {
      return dispatch(GetLikeGroupInDesignerRequest(id, page))
    },
    GetLikeDesignerInDesignerRequest: (id, page) => {
      return dispatch(GetLikeDesignerInDesignerRequest(id, page))
    },
    GetMyLikeGroupRequest: (token, page) => {
      return dispatch(GetMyLikeGroupRequest(token, page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer)
