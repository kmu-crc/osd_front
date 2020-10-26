import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { GetDesignDetailRequest } from "redux/modules/design";
import host from "config";
import NewVChat from "components/VChatMediasoup";

class VChat2Container extends Component {
    constructor(props) {
        super(props);
        this.state = { valid: false, design: {} }
        this.requestCheckAlreadyThereIn = this.requestCheckAlreadyThereIn.bind(this);
    }
    requestCheckAlreadyThereIn = () => {
        return new Promise(resolve => {
            const designId = this.props.DesignDetail.uid;
            const url = `${host}/checkAlreadyThereIn/${designId}/${this.props.userInfo.uid}`
            fetch(url,
                { headers: { "Content-Type": "application/json" }, method: "get" })
                .then(res => res.json())
                .then(res => resolve(res.exists))
                .catch(err => console.error(err));
            // resolve(false);
        });
    }
    close = (msg) => {
        msg && alert(msg)
        window.open('', '_self').close()
        // window.history.back();
    }
    componentDidMount() {
        // if (this.props.opt == null) {
        // this.close("올바른 접근이 아닙니다.");
        // window.history.go(-1);
        // }
        if (this.props.id == null) {
            this.close("올바른 접근이 아닙니다.");
            window.history.go(-1);
        }
        if (this.props.userInfo == null) {
            this.close("로그인 후 가능합니다.");
        }
        // 디자인 맴버인지 체크
        this.props.token &&
            this.props.GetDesignDetailRequest(this.props.id, this.props.token)
                .then(data => {
                    if (data && data.member) {
                        const found = data.member.filter(mem => mem.user_id === this.props.userInfo.uid)
                        if (found.length === 0) {
                            this.close("회원이 아닙니다.")
                        }
                        this.setState({ design: data });
                        this.setState({ valid: true });
                        console.log('validated');
                    } else {
                        this.close("디자인정보가 잘못되었습니다.");
                    }
                })
        // .then(async () => {
        // const in_there = await this.requestCheckAlreadyThereIn();
        // console.log(in_there);
        // })
        // 접속한 맴버가 이미 방에 있는지 체크
        // alert("이미 접속중입니다. 열려있는 창이 있는지 다시 확인해주세요.");
        // window.history.back();
    }
    render() {
        return this.state.valid &&
            this.props.userInfo
            ? <NewVChat
                userInfo={this.props.userInfo}
                design={this.state.design} />
            : <div>
                VALIDATING YOUR INFORMATION</div>
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
});
const mapDispatchToProps = (dispatch) => ({
    GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VChat2Container));