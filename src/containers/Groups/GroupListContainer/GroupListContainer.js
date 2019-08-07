import React, { Component } from 'react'
import GroupList from "components/Groups/GroupList"

import { connect } from 'react-redux'
import { GetGroupListRequest, GetGroupListCountRequest } from "redux/modules/grouplist"

class GroupListContainer extends Component {
    render() {
        return (<GroupList {...this.props} />)
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.grouplist.status.GroupList,
        dataListAdded: state.grouplist.status.GroupListAdded,
        Count: state.grouplist.status.Count,
        status: state.grouplist.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetGroupListRequest: (page, sort, keyword) => {
            return dispatch(GetGroupListRequest(page, sort, keyword))
        },
        GetGroupListCountRequest: () => {
            return dispatch(GetGroupListCountRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer)
