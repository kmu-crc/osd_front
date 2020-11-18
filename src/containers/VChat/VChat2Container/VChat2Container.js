import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { GetDesignDetailRequest, CheckInvitedUserRequest } from "redux/modules/design";
import host from "config";
import NewVChat from "components/VChatMediasoup";

// TODO
// 1. 화면공유버튼 플래그 확인 ... 리덕스와 스테이터스의 관리
// 2. 음성녹음
// 3. 캔버스에 모든영상녹화
// 4. 플래그에 따른 영상녹화화면 편집
// 5. 녹화상태보기 기능
// 6. 스피커 위주 화면배치
// 7. 초대하기 기능 추가 ... 회원 검색목록 가져오는 컨포넌트확인필요.

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
        window.open('', '_self').close();
        window.history.go(-1); // 주소 입력창으로 접근 시 뒤로가기 해야하기 때문에 추가됨.
    }
    componentDidMount() {
        if (this.props.id == null) {
            this.close("올바른 접근이 아닙니다.");
        }
        if (this.props.userInfo == null) {
            this.close("로그인 후 가능합니다.");
        }
        // 디자인 맴버인지 체크
        this.props.token &&
            this.props.GetDesignDetailRequest(this.props.id, this.props.token)
                .then(async data => {
                    if (data && data.member) {
                        const ismember = data.member.filter(mem => mem.user_id === this.props.userInfo.uid).length > 0;
                        const invited = await CheckInvitedUserRequest(this.props.id, this.props.token);
                        if (ismember || (invited.result || false)) {
                            this.setState({ design: data });
                            this.setState({ valid: true });
                        } else {
                            this.close("화상회의에 입장하실 수 없습니다.");
                        }
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
        return this.state.valid && this.props.userInfo && this.state.design

            ? <NewVChat userInfo={this.props.userInfo} design={this.state.design} />
            : <div style={{ color: "#F0F0F0", textAlign: "center", fontSize: "2rem" }}>
                사용자 정보를 확인하고 있습니다.
            </div>
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
});
const mapDispatchToProps = (dispatch) => ({
    GetDesignDetailRequest: (id, token) => dispatch(GetDesignDetailRequest(id, token)),
    // VerifyInvitedUserRequest: (id, token) => dispatch(VerifyInvitedUserRequest(id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VChat2Container));