import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetGroupListRequest, GetGroupTotalCountRequest } from "redux/modules/group"
import GroupList from "components/Groups/GroupList"

class GroupListContainer extends Component {
  render() {
    return (
      <GroupList {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupList.status.GroupList,
    dataListAdded: state.GroupList.status.GroupListAdded,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    Count: state.GroupList.status.GroupCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupListRequest(page, sort, keyword) {
      return dispatch(GetGroupListRequest(page, sort, keyword))
    },
    GetGroupTotalCountRequest: () => {
      return dispatch(GetGroupTotalCountRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer)
