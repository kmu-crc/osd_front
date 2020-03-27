import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "modules/socket";
import Alarm from "components/Commons/Header/Alarm";
import { AcceptDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign"
import { GetWaitingGroupRequest, GetWaitingDesignRequest, UpdateDesignInGroupRequest, UpdateGroupInGroupRequest, DeleteGroupInGroupRequest, DeleteDesignInGroupRequest } from "actions/Group"

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
                    console.log(alarms);
                    this.setState({ alarms: alarms });
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    render() {
        return (<Alarm {...this.props} alarms={this.state.alarms} socket={Socket} />);
    }
};
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
