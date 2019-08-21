import React, { Component } from 'react'
import { connect } from 'react-redux'

import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';

import { GetMyDetailRequest, GetMyDesignListRequest } from "redux/modules/personal"

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }

  render() {
    return (
      <>
        <MypageHeader {...this.props}/>
        <MypageBody />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetMyDesignListRequest: (token, page) => {
      return dispatch(GetMyDesignListRequest(token, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer)
