import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { AcceptDesignRequest, GetoutDesignRequest } from "redux/modules/design"
// import { GetWaitingGroupRequest, GetWaitingDesignRequest, UpdateDesignInGroupRequest, UpdateGroupInGroupRequest, DeleteGroupInGroupRequest, DeleteDesignInGroupRequest } from "redux/modules/group"
import Alarm from "components/Header/Alarm"
import Socket from "modules/Socket"

class AlarmContainer extends Component {
    state = { alarm: null }
    componentDidMount() {
        this.getAlarm()
    }
    getAlarm() {
        if (this.props.isLoggedIn) {
            try {
                Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("getNoti", alarm => {
                    this.setState({ alarm: alarm })
                    console.log("getNoti", alarm)
                })
            } catch (err) {
                //TODO v2: doesn't meaning in client, so! report administrator e-mail
                console.log(err)
            }
        }
    }
    handleAlarmConfirm = (uid, alarmid) => {
        Socket.emit("confirm", { uid: uid, alarmId: alarmid });
    }
    handleAllAlarmConfirm = (uid) => {
        Socket.emit("allConfirm", { user_id: uid })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn === true) {
            this.getAlarm()
        }
    }
    render() {
        return <Alarm handleAlarmConfirm={this.handleAlarmConfirm}{...this.state}{...this.props} />
    }
}
const mapDisaptchToProps = (dispatch) => {
    return {
        // AcceptDesignRequest: (design_id, member_id, token) => {
        // return dispatch(AcceptDesignRequest(design_id, member_id, token))
        // },
        // UpdateDesignInGroupRequest: (id, design_id) => {
        //     return dispatch(UpdateDesignInGroupRequest(id, design_id))
        // },
        // UpdateGroupInGroupRequest: (id, group_id) => {
        //     return dispatch(UpdateGroupInGroupRequest(id, group_id))
        // },
        // GetWaitingDesignRequest: (id, sort) => {
        //     return dispatch(GetWaitingDesignRequest(id, sort))
        // },
        // GetWaitingGroupRequest: (id, sort) => {
        //     return dispatch(GetWaitingGroupRequest(id, sort))
        // },
        // GetoutDesignRequest: (id, member_id, token, refuse) => {
        //     return dispatch(GetoutDesignRequest(id, member_id, token, refuse))
        // },
        // DeleteDesignInGroupRequest: (id, design_id) => {
        //     return dispatch(DeleteDesignInGroupRequest(id, design_id))
        // },
        // DeleteGroupInGroupRequest: (id, group_id) => {
        //     return dispatch(DeleteGroupInGroupRequest(id, group_id))
        // }
    }
}
export default connect(null, mapDisaptchToProps)(AlarmContainer)
