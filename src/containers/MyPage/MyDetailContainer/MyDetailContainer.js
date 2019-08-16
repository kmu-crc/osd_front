import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetMyDetailRequest, GetMyDesignListRequest } from "redux/modules/personal"
import MyDetail from "components/Users/MyDetail"

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }

  render() {
    return (
      <MyDetail {...this.props} />
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
