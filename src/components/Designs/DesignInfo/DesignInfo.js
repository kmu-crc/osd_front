import React, { Component } from 'react';
import thumbup from "source/thumbup.png";
import email from "source/email.png";
import iEdit from "source/edit.png";
import forked from "source/forked.svg";
import noimg from "source/noimg.png";
import noface from "source/thumbnail.png";
import IconView from "source/IconView";
import Cross from "components/Commons/Cross";
import styled from "styled-components";
import TextFormat from 'modules/TextFormat';
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import { geturl } from "config";
import { Modal } from "semantic-ui-react";
import DesignMemberContainer from "containers/Designs/DesignMemberContainer";
import DesignComment from "components/Designs/GridEditor/DesignComment";

const DesignInfoComp = styled.div`
    marginTop: 21px;
    display: flex;
    background-color: #EFEFEF;
    width: 1920px;
    height: 237px;
  }
`;
const DesignList = styled.div`
    display: ${props => props.display};
    z-index: 999;
    position: absolute;
    pointer-events: auto;
    top: ${props => props.top - 10 + "px"};
    left: ${props => props.left + "px"};
    z-index: 904;
    height: 250px;
    max-height: 550px;
    width: 365px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    font-family: Noto Sans KR;
    overflow-y: hidden;
    overflow-x: hidden;
    
    &.list::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }

    &.list::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    }
    &.list {
      padding-right: 36px;
      padding-bottom: 5px;
      height: 490px;
        &:hover{
            overflow-y: auto;
            overflow-x: hidden;
    }
`;
const ListItem = styled.div`
    display:flex;
    padding-left:15px;
    flex-direction: column;
    width: 365px;
    height: 85px;
    display: flex;
    margin-top: 10px;
    border-bottom: 1px solid #B7B7B7;
    color: #707070;
    &:hover {
        background-color: #EFEFEF;
        opacity: 0.90;
    }
`;

class DesignInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { likeDialog: false, forkDialog: 0, forkDesignList: false, memberList: false, comment: false };
        this.like = this.like.bind(this);
        this.needLogin = this.needLogin.bind(this);
        this.forkDesign = this.forkDesign.bind(this);
        this.getForkDesignList = this.getForkDesignList.bind(this);
        this.onForkListHandler = this.onForkListHandler.bind(this);
        this.onMemberListHandler = this.onMemberListHandler.bind(this);
        this.joinMember = this.joinMember.bind(this);
        this.getMemberList = this.getMemberList.bind(this);
        this.getDesignComment = this.getDesignComment.bind(this);
    }
    needLogin() {
        alert("로그인 해주세요.");
    }
    onForkListHandler(event) {
        if (event.type === "blur" && !this.forkDesignRef.contains(event.relatedTarget)) {
            this.setState({ forkDesignList: false });
        }
    }
    onMemberListHandler(event) {
        if (event.type === "blur" && !this.memberlist.contains(event.relatedTarget)) {
            this.setState({ memberList: false });
        }
    }
    getForkDesignList() {
        this.setState({ forkDesignList: true });
        this.props.ForkDesignListRequest(this.props.DesignDetail.uid);
    }
    joinMember = () => {
        if (!this.props.userInfo || !this.props.token) {
            alert("로그인을 해주세요.");
        } else if (this.props.DesignDetail.waitingStatus === 1) {
            alert("가입 대기중인 디자인입니다.");
        } else {
            const data = [{ uid: this.props.userInfo.uid }];
            if (window.confirm("해당 디자인에 가입 신청하시겠습니까?")) {
                this.props.JoinDesignRequest(this.props.id, data, 0, this.props.token)
                    .then(res => {
                        if (res && res.data && res.data.success) {
                            alert("가입 신청이 완료되었습니다.");
                            this.props.GetDesignDetailRequest(this.props.id, this.props.token);
                        } else {
                            alert("다시 시도해주세요");
                        }
                    });
            }
        }
    }
    async forkDesign() {
        if (this.props.userInfo === null) {
            return this.needLogin();
        }
        if (!this.props.userInfo.is_designer) {
            console.log("userinfo", this.props.userInfo.is_designer)
            alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
            return this.props.history.push("/myModify")
        }
        await this.setState({ forkDialog: 1 });
    }
    async like() {
        if (!this.props.userInfo) {
            this.needLogin();
            return;
        }
        if (this.props.like) { //dislike
            this.props.UnlikeDesignRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetDesignDetailRequest(this.props.id, this.props.token) })
                .then(() => { this.props.GetLikeDesignRequest(this.props.id, this.props.token) })
                .then(() => { this.props.GetDesignCountRequest(this.props.id) })
        } else {
            await this.setState({ likeDialog: true })
            this.props.LikeDesignRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetDesignDetailRequest(this.props.id, this.props.token) })
                .then(() => { this.props.GetLikeDesignRequest(this.props.id, this.props.token) })
                .then(() => { this.props.GetDesignCountRequest(this.props.id) })
            setTimeout(() => { this.setState({ likeDialog: false }) }, 1500)
        }
    }
    gotoDesignModify = () => {
        let href = window.location.href.substring(0, window.location.href.search("designDetail"))
        window.location.href = href + 'designModify/' + this.props.DesignDetail.uid;
    }
    doFork() {
        this.props.ForkDesignRequest(this.props.DesignDetail.uid, this.props.userInfo.uid, this.props.token)
            .then(async () => {
                await this.setState({ forkDialog: 2 });
                setTimeout(() => {
                    this.closeFork();
                    this.moveDegisnForked();
                }, 1500);
            })
            .catch(err => { alert(err) })
    }
    async closeFork() {
        await this.setState({ forkDialog: 0 })
    }
    moveDegisnForked = () => {
        if (this.props.new_design_id) {
            this.props.history.push("/designModify/" + this.props.new_design_id)
        }
    }
    sendMessage(user_id, nick_name) {
        let href = window.location.href.substring(0, window.location.href.search("designDetail"))
        window.location.href = href + 'message/' + user_id + '/' + nick_name;
    }
    goParentDesign = (parent) => {
        window.location.href = geturl() + `/designDetail/${parent}`
    }
    componentWillReceiveProps = async (nextProps) => {
        if (nextProps !== this.props) {
            console.log("reload");
            return true;
        }
    }
    getDesignComment() {
        this.setState({ comment: true });
    }
    getMemberList() {
        this.setState({ memberList: true });
    }
    render() {
        const { isMyDesign, editor, DesignDetail, Count, like } = this.props
        const thumbnail = (DesignDetail && DesignDetail.img && DesignDetail.img.l_img) || noimg

        const MemberModal = () => {
            return (
                <Modal open={isMyDesign && this.state.memberList} closeOnDimmerClick={false} onClose={() => this.setState({ memberList: false })}>
                    <div onClick={() => this.setState({ memberList: false })} style={{ position: "absolute", left: "100%", marginTop: "0px", marginLeft: "34.32px" }}>
                        <Cross angle={45} color={"#FFFFFF"} weight={3} width={45} height={45} />
                    </div>
                    <Modal.Content>
                        <DesignMemberContainer mine={isMyDesign} DesignDetail={DesignDetail} />
                    </Modal.Content>
                </Modal>
            )
        }
        const DesignCommentModal = () => {
            return (
                <Modal style={{ minWidth: "1250px" }} open={this.state.comment} closeOnDimmerClick={false} onClose={() => this.setState({ comment: false })}>
                    <div onClick={() => this.setState({ comment: false })} style={{ position: "absolute", left: "100%", marginTop: "0px", marginLeft: "34.32px" }}>
                        <Cross angle={45} color={"#FFFFFF"} weight={3} width={45} height={45} />
                    </div>
                    <Modal.Content>
                        <div style={{ marginLeft: "15px", marginBottom: "15px" }}><h3>댓글</h3></div>
                        <div style={{ width: "600px" }}>
                            <DesignComment designId={parseInt(this.props.id, 10)} />
                        </div>
                    </Modal.Content>
                </Modal>)
        }
        console.log("DesignInfo:", isMyDesign, this.state, this.props);
        return (
            <React.Fragment>
                {this.state.forkDialog > 0 &&
                    <div style={{ zIndex: "950", position: "fixed", top: "255px", left: "618px", width: "576px", height: "200px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1" }}>
                        {this.state.forkDialog === 1 && <React.Fragment>
                            <div onClick={() => this.closeFork()} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                                <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} />
                            </div>
                            <div style={{ marginTop: "25px", marginLeft: "62.5px", width: "394px", height: "69px", textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "35px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1" }}>
                                {DesignDetail.userName.slice(0, 12)}님의 디자인 <br />"{DesignDetail.title.slice(0, 16)}{DesignDetail.title.length > 16 && "..."}"<br />
                                파생 디자인을 생성하시겠습니까?</div>
                            <div onClick={() => this.doFork()} style={{ cursor: "pointer", marginTop: "45px", marginLeft: "200px", width: "130px", height: "29px", textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "29px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1", paddingBottom: "1.5px", borderBottom: "1.5px solid #FF0000" }}>
                                네, 생성합니다.</div></React.Fragment>}
                        {this.state.forkDialog === 2 && <React.Fragment>
                            <div style={{ marginTop: "39.5px", marginLeft: "149.5px", width: "278px", height: "149px", textAlign: "center", fontWeight: "500", fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#707070", opacity: "1" }}>
                                파생 디자인 생성중입니다.
                                <p style={{ color: "#FF0000" }}>디자인 수정 페이지로 이동합니다.</p>
                                추가 정보를 입력해 주세요!</div>
                        </React.Fragment>}
                    </div>}
                {this.state.likeDialog &&
                    <div style={{ position: "absolute", top: "47px", left: "763px", width: "396px", height: "138px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #000000", borderRadius: "5px", opacity: "1" }}>
                        <div style={{ marginTop: "31.5px", marginLeft: "62.5px", width: "273px", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", lineHeight: "40px", textAlign: "center", fontWeight: "500", color: "#707070" }}>관심 디자인으로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.</div></div>}
                <DesignInfoComp >
                    {DesignDetail.parent_design && <div style={{ position: "absolute", marginTop: "19px",marginLeft: "220px", width: "32px", height: "70px", backgroundImage: `url(${forked})`, backgroundSize: "cover" }} />}
                    <div style={{ marginTop: "19px", marginLeft: "65px", background: `url(${thumbnail})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundImage: `url${thumbnail}`, backgroundColor: "#D6D6D6", borderRadius: "15px", width: "200px", height: "200px", backgroundRepeat: "no-repeat" }}></div>
                    <div style={{ marginTop: "19px", marginLeft: "42px", }}>
                        <div style={{ position: "absolute", width: "max-content", height: "29px", marginTop: "0px", marginLeft: "0px", fontSize: "20px", color: "#707070", fontWeight: "500", textAlign: "left", lineHeight: "29px", cursor: "pointer" }} title={DesignDetail.title}>{DesignDetail.title.slice(0, 64)}{DesignDetail.title.length > 64 ? "..." : ""}</div>
                        <div style={{ marginTop: "25px" }}>
                            {DesignDetail.parent_design && <div onClick={() => this.goParentDesign(DesignDetail.parent_design)} style={{ width: "165px", height: "25px", marginTop: "9px", marginLeft: "0px", fontSize: "17px", color: "#FF0000", fontWeight: "300", textAlign: "left", lineHeight: "25px", cursor: "pointer" }} title={DesignDetail.parent_title}>{DesignDetail.parent_title.slice(0, 4)}{DesignDetail.parent_title.length > 4 && "..."}에서 파생됨</div>}
                            <button onClick={this.getMemberList} ref={ref => (this.memberlist = ref)} onBlur={!isMyDesign ? this.onMemberListHandler : undefined} style={{ outline: "none", background: "none", border: "none", width: "170px", height: "29px", marginTop: DesignDetail.parent_design ? "8px" : "13px", marginLeft: "0px", fontSize: "17px", color: "#707070", fontWeight: "300", textAlign: "left", lineHeight: "29px", cursor: "pointer" }}>{DesignDetail.userName.slice(0, 8)} {(DesignDetail.member && DesignDetail.member.length > 1) && "외 " + (DesignDetail.member.length - 1).toString() + "명"}</button>
                            {!isMyDesign && this.state.memberList &&
                                <DesignList top={this.memberlist.getBoundingClientRect().top} left={this.memberlist.getBoundingClientRect().left}>
                                    <div className="list" style={{ padding: "15px" }}>
                                        {DesignDetail.member && DesignDetail.member.length > 0 &&
                                            DesignDetail.member.map((mem, i) =>
                                                <div key={i} style={{ marginBottom: "15px", alignItems: "center", padding: "5px", width: "max-content", background: "#EFEFEF", borderRadius: "15px", cursor: "pointer", display: "flex", marginRight: "50px" }}>
                                                    <div style={{ backgroundImage: `url(${mem.thumbnail ? mem.thumbnail.s_img : noface})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
                                                    <div style={{ marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", color: "#707070", width: "max-content", height: "29px" }}>{mem.nick_name}</div>
                                                    {DesignDetail.user_id === mem.user_id &&
                                                        <div title={"팀장"} style={{ display: "flex", justifyContent: "center", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "none" }}><i className="star icon" style={{ marginLeft: "auto", marginRight: "auto", color: "#707070" }} /></div>}
                                                </div>
                                            )
                                        }
                                    </div>
                                </DesignList>
                            }
                            <div onClick={this.getDesignComment} style={{ display: "flex", cursor: "pointer", marginTop: "10px", color: "#FF0000", fontFamily: "Noto Sans KR", fontWeight: "300" }}>
                                <div style={{ fontSize: "17px" }}>댓글</div>
                                <div style={{ marginLeft: "10px", fontSize: "15px" }}>{Count && Count.comment_count ? NumberFormat(Count.comment_count) : 0}</div>
                            </div>
                            <button onClick={DesignDetail.is_parent ? this.getForkDesignList : undefined} ref={ref => (this.forkDesignRef = ref)} onBlur={this.onForkListHandler} style={{ outline: "none", background: "none", border: "none", width: "165px", height: "29px", marginTop: DesignDetail.parent_design ? "5px" : "15px", marginLeft: "0px", fontSize: "17px", color: "#FF0000", fontWeight: "500", textAlign: "left", lineHeight: "29px", display: "flex", alignItems: "bottom" }}>{DesignDetail.is_parent && "파생된 디자인 "}{DesignDetail.is_parent && <div style={{ marginLeft: "10px" }}>{DesignDetail.children_count["count(*)"]}</div>}
                                {this.state.forkDesignList &&
                                    <DesignList top={this.forkDesignRef.getBoundingClientRect().top} left={this.forkDesignRef.getBoundingClientRect().left}>
                                        <div className="list" style={{ padding: "7", marginTop: "10px" }}>
                                            {this.props.forkDesignList &&
                                                this.props.forkDesignList.map((item, idx) => {
                                                    return (<ListItem key={item + idx}>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ width: "50px", height: "50px", borderRadius: "5px", backgroundImage: `url(${item.p_s_img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                                                            <div style={{ marginLeft: "16px", fontSize: "17px" }} >
                                                                <TextFormat txt={item.title} chars={23} />
                                                                <div>{item.nick_name}</div>
                                                            </div>
                                                        </div>
                                                    </ListItem>);
                                                })}
                                        </div>
                                    </DesignList>
                                }</button>
                            <div style={{ width: "165px", height: "29px", marginTop: DesignDetail.parent_design ? "0px" : "7px", marginLeft: "0px", fontSize: "15px", color: "#707070", fontWeight: "500", textAlign: "left", display: "flex" }}>
                                <div style={{ marginTop: "auto" }}><IconView width="17.24px" height="11.41px" fill="#707070" /></div>
                                <div style={{ marginTop: "auto", marginLeft: "5.85px", width: "34px" }}>{NumberFormat(Count.view_count)}</div>
                                <div style={{ marginTop: "auto", marginLeft: "22px", width: "22px", height: "22px", padding: "0px" }}><i style={{ marginTop: "auto", fontSize: "20px" }} className="material-icons">thumb_up</i></div>
                                <div style={{ marginTop: "auto", marginLeft: "6px", width: "34px" }}>{NumberFormat(Count.like_count)}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "65px", marginLeft: "65px" }}>
                        <div style={{ width: "120px", height: "25px", color: "#FF0000", fontSize: "17px", fontFamily: "Noto Sans KR", lineHeight: "25px", fontWeight: "300", textAlign: "left" }}>{DesignDetail.categoryName}</div>
                        <div style={{ wordWrap: "break-word", width: "423px", height: "125px", marginTop: "17px", color: "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", lineHeight: "29px", fontWeight: "300" }}>{DesignDetail.explanation ? DesignDetail.explanation.slice(0, 150) : DesignDetail.userName + "님의 " + DesignDetail.title + "디자인입니다."}</div>
                    </div>
                    <div style={{ marginTop: "19px", marginLeft: "65px" }}>
                        <div style={{ width: "100px", height: "25px", color: "#FF0000", fontSize: "17px", fontFamily: "Noto Sans KR", lineHeight: "25px", fontWeight: "300", textAlign: "left" }}></div>
                        <div style={{ wordWrap: "break-word", width: "423px", height: "158px", marginTop: "17px", color: "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", lineHeight: "29px", fontWeight: "300" }}>{DesignDetail.explanation && DesignDetail.explanation.slice(150, 300 - 3)}{(DesignDetail.explanation.length > 300 - 3) ? "..." : ""}</div>
                    </div>
                    <div style={{ position: "relative", marginTop: "10px", marginLeft: "auto", marginRight: "72px" }}>
                        <div style={{ marginTop: "0px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#FF0000", textAlign: "right", marginLeft: "auto", fontWeight: "500", cursor: "pointer" }} onClick={() => this.forkDesign()}>파생 디자인 생성</div>
                        {isMyDesign === false &&
                            <div style={{ height: "25px", display: "flex", marginTop: "10px", marginLeft: "auto" }}>
                                {editor === false ?
                                    DesignDetail && DesignDetail.waitingStatus === 1 ?
                                        <div style={{ height: "25px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#FF0000", textAlign: "right", marginLeft: "auto", fontWeight: "300" }}>가입승인 대기중</div>
                                        : <div onClick={this.joinMember} style={{ height: "25px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#FF0000", textAlign: "right", marginLeft: "auto", fontWeight: "300", cursor: "pointer" }}>가입 신청</div>
                                    : undefined}
                            </div>
                        }
                        {isMyDesign === true ?
                            <div onClick={this.gotoDesignModify} style={{ width: "max-content", height: "45px", display: "flex", marginTop: "10px", marginLeft: "auto", cursor: "pointer" }} >
                                <div style={{ marginTop: "16px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", fontWeight: "300", color: "#707070", textAlign: "right" }}>디자인 수정하기 </div>
                                <div style={{ marginLeft: "15px", width: "45px", height: "45px", background: `url(${iEdit})`, backgroundSize: "45px 45px", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} />
                                {/* <div style={{ cursor: "pointer", display: "inline-block", height: "40px", marginLeft: "15px", marginBottom: "-7px", backgroundSize: "cover", backgroundPosition: "center center" }}><img alt="icon" src={iEdit} style={{ paddingLeft: "15px" }} /></div> */}
                            </div>
                            :
                            <div onClick={this.like} style={{ height: "45px", display: "flex", marginTop: "17px", marginLeft: "auto", cursor: "pointer" }} >
                                <div style={{ marginTop: "16px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", fontWeight: "300", color: "#707070", textAlign: "right" }}>관심 디자인 {like ? "취소하기" : "등록하기"}</div>
                                <div style={{ marginLeft: "15px", width: "45px", height: "45px", background: `url(${thumbup})`, opacity: like ? "1" : "0.45", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
                            </div>
                        }
                        {isMyDesign === true ?
                            null :
                            <div style={{ height: "45px", display: "flex", marginTop: "15px", marginLeft: "auto", cursor: "pointer" }} onClick={() => this.sendMessage(DesignDetail.user_id, DesignDetail.userName)}>
                                <div style={{ marginTop: "16px", height: "25px", fontFamily: "Noto Sans KR", fontSize: "17px", marginLeft: "auto", fontWeight: "300", color: "#707070", textAlign: "right" }}>메시지 보내기</div>
                                <div style={{ marginLeft: "15px", width: "45px", height: "45px", background: `url(${email})`, backgroundSize: "cover", backgroundPosition: "center center", }}></div>
                            </div>
                        }
                        <div style={{ height: "45px", fontFamily: "Noto Sans KR", fontSize: "17px", color: "#707070", lineHeight: "45px", textAlign: "right", marginLeft: "auto", fontWeight: "300" }}>최근 업데이트 {DateFormat(DesignDetail.update_time)}</div>
                    </div>
                </DesignInfoComp>

                <MemberModal />
                <DesignCommentModal />
            </React.Fragment>
        )
    }
};

export default DesignInfo;
