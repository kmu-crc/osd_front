import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { GetGroupDetailRequest, GetGroupMemberRequest, CheckInvitedUserRequest } from "redux/modules/group";
// import host from "config";
import VChatGroup from "components/VChatMediasoupGroup/VChatGroup";

class VChatGroupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { group: null };
    };
    close = (msg) => {
        msg && alert(msg)
        window.open('', '_self').close();
        window.history.go(-1); // 주소 입력창으로 접근 시 뒤로가기 해야하기 때문에 추가됨.
    };
    componentDidMount() {
        if (this.props.token == null || this.props.userInfo == null) {
            this.close("접근권한이 없습니다. 로그인 후 사용해주시기 바랍니다.");
        }
        if (this.props.id == null) {
            this.close("올바른 접근이 아닙니다.");
        }
        this.props.GetGroupDetailRequest(this.props.id)//, this.props.token)
            .then(data => {
                console.log(data);
                if (data && Object.entries(data).length === 0) {
                    this.close("올바른 접근이 아닙니다.");
                }
                GetGroupMemberRequest(this.props.id)
                    .then(async mem => {
                        const ismember = mem.filter(m => m.user_id === this.props.userInfo.uid).length > 0;
                        const invited = await CheckInvitedUserRequest(this.props.id, this.props.token);
                        console.log("INVITED", invited);
                        if (ismember || (invited.result || false)) {
                            data.member = mem;
                        } else {
                            this.close("화상회의에 입장하실 수 없습니다.");
                        }
                    });
                this.setState({ group: data });
            });

    };

    render() {
        const { group, } = this.state;
        const { token, userInfo } = this.props;
        return this.props.id ?
            group ?
                <VChatGroup
                    token={token}
                    userInfo={userInfo}
                    group={group}
                />
                : "LOADING"
            : "INVALID DATA"
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
});
const mapDispatchToProps = (dispatch) => ({
    GetGroupDetailRequest: (id) => dispatch(GetGroupDetailRequest(id)),
    // GetGroupMemberRequest: (id) => dispatch(GetGroupMemberRequest(id)), // this function is not dispatch function
    // VerifyInvitedUserRequest: (id, token) => dispatch(VerifyInvitedUserRequest(id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VChatGroupContainer));