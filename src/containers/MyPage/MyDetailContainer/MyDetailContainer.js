import React, { Component } from 'react'
import { connect } from 'react-redux'

import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';

import {
  GetMyDetailRequest, GetMyDesignListRequest, GetMyLikeDesignRequest,
  GetMyLikeDesignerRequest, GetMyGroupListRequest, GetMyLikeGroupRequest
} from "redux/modules/personal"


class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }

  render() {
    return (//수정 요망 - 내용기술할것! 이러면몰라요ㅠ
      <>
        <MypageHeader {...this.props} />
        <MypageBody {...this.props} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
