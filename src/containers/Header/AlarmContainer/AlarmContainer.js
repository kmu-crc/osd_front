import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AcceptDesignRequest, GetoutDesignRequest } from "redux/modules/design"
import { GetWaitingGroupRequest, GetWaitingDesignRequest, UpdateDesignInGroupRequest, UpdateGroupInGroupRequest, DeleteGroupInGroupRequest, DeleteDesignInGroupRequest } from "redux/modules/group"
import Alarm from "components/Header/Alarm"
import Socket from "modules/Socket"

class AlarmContainer extends Component {
    handleAlarmConfirm = (userID, alarmID) => {
        Socket.emit("confirm", { user_id: userID, alarmId: alarmID });
    }
    handleAllAlarmConfirm = () => {
        Socket.emit("allConfirm", { user_id: this.props.userInfo.uid })
    }
    render() {
        return <Alarm handleAllAlarmConfirm={this.handleAllAlarmConfirm} handleAlarmConfirm={this.handleAlarmConfirm} {...this.props} />
    }
}
const mapDisaptchToProps = (dispatch) => {
    return {
        AcceptDesignRequest: (design_id, member_id, token) => {
            return dispatch(AcceptDesignRequest(design_id, member_id, token))
        },
        UpdateDesignInGroupRequest: (id, design_id) => {
            return dispatch(UpdateDesignInGroupRequest(id, design_id))
        },
        UpdateGroupInGroupRequest: (id, group_id) => {
            return dispatch(UpdateGroupInGroupRequest(id, group_id))
        },
        GetWaitingDesignRequest: (id, sort) => {
            return dispatch(GetWaitingDesignRequest(id, sort))
        },
        GetWaitingGroupRequest: (id, sort) => {
            return dispatch(GetWaitingGroupRequest(id, sort))
        },
        GetoutDesignRequest: (id, member_id, token, refuse) => {
            return dispatch(GetoutDesignRequest(id, member_id, token, refuse))
        },
        DeleteDesignInGroupRequest: (id, design_id) => {
            return dispatch(DeleteDesignInGroupRequest(id, design_id))
        },
        DeleteGroupInGroupRequest: (id, group_id) => {
            return dispatch(DeleteGroupInGroupRequest(id, group_id))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.Authentication.status.token,
        userInfo: state.Authentication.status.userInfo,
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(AlarmContainer)
