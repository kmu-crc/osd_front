import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "modules/socket";
import Alarm from "components/Commons/Header/Alarm";
import { AcceptDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign"
import { GetWaitingGroupRequest, GetWaitingDesignRequest, UpdateDesignInGroupRequest, UpdateGroupInGroupRequest, DeleteGroupInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group"
import Alarm_mobile from "mobileComponents/Alarm_mobile";


const dummy =
    [
        // # uid, type, confirm, from_user, to_user, from_content, to_content, create_time, update_time
        { uid: 1, type: 'ITEM_PURCHASED_TO_EXPERT', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 2, type: 'ITEM_PURCHASED_TO_USER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 3, type: 'ITEM_QUESTION_TO_OWNER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 4, type: 'ITEM_RESPONSE_TO_DESIGNER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 5, type: 'ITEM_REQUEST_TO_DESIGNER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 6, type: 'ITEM_RESPONSE_TO_MAKER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
        { uid: 7, type: 'ITEM_REQUEST_TO_MAKER', confirm: 0, from_user: 19, to_user: 22, create_time: '2021-06-28 02:31:29', update_time: '2021-06-28 02:31:29' },
    ]

class AlarmContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { alarms: [] }
    }
    componentDidMount() {
        if (this.props.valid) {
            try {
                Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("get-alarm", alarms => {
                    this.setState({ alarms: alarms })
                })
            } catch (err) {
                console.error(err)
            }
        }
    }

    render() {
        const params = { ...this.props, alarms: dummy, socket: Socket } //
        // const params = { ...this.props, alarms: this.state.alarms , socket: Socket } //
        console.log(this.state.alarms)
        return (
            window.innerWidth >= 500
                ? <Alarm {...params} />
                : <Alarm_mobile {...params} />
        )
    }
}
const mapStateToProps = state => ({
    userInfo: state.Authentication.status.userInfo,
    valid: state.Authentication.status.valid,
});
const mapDispatchToProps = (dispatch) => ({
    AcceptDesignRequest: (design_id, member_id, token) => dispatch(AcceptDesignRequest(design_id, member_id, token)),
    UpdateDesignInGroupRequest: (id, design_id) => dispatch(UpdateDesignInGroupRequest(id, design_id)),
    UpdateGroupInGroupRequest: (id, group_id) => dispatch(UpdateGroupInGroupRequest(id, group_id)),
    GetWaitingDesignRequest: (id, sort) => dispatch(GetWaitingDesignRequest(id, sort)),
    GetWaitingGroupRequest: (id, sort) => (dispatch(GetWaitingGroupRequest(id, sort))),
    GetoutDesignRequest: (id, member_id, token, refuse) => (dispatch(GetoutDesignRequest(id, member_id, token, refuse))),
    DeleteDesignInGroupRequest: (id, design_id) => (dispatch(DeleteDesignInGroupRequest(id, design_id))),
    DeleteGroupInGroupRequest: (id, group_id) => (dispatch(DeleteGroupInGroupRequest(id, group_id)))
});
export default connect(mapStateToProps, mapDispatchToProps)(AlarmContainer);
