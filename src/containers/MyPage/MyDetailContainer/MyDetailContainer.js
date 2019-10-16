import React, { Component } from 'react'
import { connect } from 'react-redux'

import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';

import {
  GetMyDetailRequest, GetMyDesignListRequest, GetMyLikeDesignRequest,
  GetMyLikeDesignerRequest, GetMyGroupListRequest, GetMyLikeGroupRequest
} from "redux/modules/personal"
import { GetDesignerCountRequest } from "redux/modules/designer"

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
    this.props.GetDesignerCountRequest(this.props.userInfo.uid);
  }

  render() {
    return (
      <React.Fragment>
        <MypageHeader {...this.props} />
        <MypageBody {...this.props} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Authentication.status.userInfo,
    Count: state.Designer.status.Count,
    MyDetail: state.Personal.status.MyDetail,
    MyLikeDesign: state.Personal.status.MyLikeDesign,
    MyLikeDesigner: state.Personal.status.MyLikeDesigner,
    MyLikeDesignAdded: state.Personal.status.MyLikeDesignAdded,
    MyLikeDesignerAdded: state.Personal.status.MyLikeDesignerAdded,
    MyLikeGroup: state.Personal.status.MyLikeGroup,
    MyLikeGroupAdded: state.Personal.status.MyLikeGroupAdded,
    MyGroup: state.Personal.status.MyGroup,
    MyGroupAdded: state.Personal.status.MyGroupAdded,
    MyDesign: state.Personal.status.MyDesign,
    MyDesignAdded: state.Personal.status.MyDesignAdded,
  }
}

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
    GetMyGroupListRequest: (token, page) => {
      return dispatch(GetMyGroupListRequest(token, page))
    },
    GetMyLikeGroupRequest: (token, page) => {
      return dispatch(GetMyLikeGroupRequest(token, page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer)
