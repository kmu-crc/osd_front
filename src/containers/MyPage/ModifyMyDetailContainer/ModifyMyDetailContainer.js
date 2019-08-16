import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetMyDetailRequest, UpdateUserDetailRequest } from "redux/modules/personal"
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "redux/modules/category"
import ModifyMyDetail from "components/Users/ModifyMyDetail"

class ModifyMyDetailContainer extends Component {
  render() {
    return (<ModifyMyDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.MyDetail.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.Category.status.level1,
    category2: state.Category.status.level2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request())
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id))
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer)
