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

// const DesignInfoComp = styled.div`
//     marginTop: 21px;
//     display: flex;
//     background-color: #EFEFEF;
//     width: ${window.innerWidth > 1920 ? 1920 : window.innerWidth};
//     height: 237px;
// `;
const Button = styled.button`
    outline:none;
    border:none;
`
const ThumbnailWrapper = styled.div`
    .fork-mark {
        position: absolute;
        margin-left: 70px;
        width: 32px;
        height: 70px;
        background-image: url(${forked});
        background-size: cover; 
    }
    .thumbnail {
        @media only screen and (min-width: 0px) and (max-width: 1250px) {
            margin-top: 20px;
        }
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center center;
        background-image: url(${props => props.img});
        background-color: #D6D6D6;
        border-radius: 15px;
        background-repeat: no-repeat;
    }
`;
const LeftSide = styled.div`
    display: flex;
    height: 220px;
    justify-content: space-between;
    flex-direction: column !important;
    .title {
        display: block !important;
        @media only screen and (min-width: 0px) and (max-width: 1250px) {
            display: none !important;
        }
        position: absolute;
        height: 29px;
        color: #707070;
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        line-height: 29px;
        cursor: pointer;
    }
    .box {
        position: relative;
        margin-top: 40px;
        .goto-parent {
            position: relative;
            width: 165px;
            height: 25px;
            color: #FF0000;
            font-size: 17px;
            font-weight: 300;
            text-align: left;
            line-height: 25px;
            cursor: pointer;
            &.no {
                cursor: default;
            }
        }
        .design_member {
            width: max-content;
            max-width: 150px;
            font-size: 16px;
            font-weight: 300;            
        }
        .member-list-btn {
            width: max-content;
            max-width: 170px;
            height: 29px;
            margin-top: 10px;
            margin-left: -5px;
            border: none;
            outline: none;
            background: none;
            font-size: 17px;
            color: #707070;
            font-weight: 300;
            text-align: left;
            line-height: 29px;
            cursor: pointer;
        }
        .comment-box {
            width: max-content;
            display: flex;
            cursor: pointer;
            margin-top: 10px;
            color: #FF0000;
            font-family: Noto Sans KR;
            font-weight: 300;
            .txt {
                font-size: 17px;
            }
            .count {
                margin-left: 10px;
                font-size: 15px
            }
        }
        .fork-list-btn {
            width: 165px;
            height: 29px;
            margin-top: 10px;
            margin-left: -5px;
            background: none;
            border: none;
            outline: none;
            display: flex;
            color: #FF0000;
            font-size: 17px;
            font-weight: 500;
            line-height: 29px;
            text-align: left;
            align-items: bottom;
            cursor: pointer;
            .fork-count {
                margin-left: 10px;
            }
            &.no {
                cursor: default;
            }
        }
    }
    .count-box {
        // position: absolute;
        width: 165px;
        height: 29px;
        margin-bottom: 8px;
        font-size: 15px;
        color: #707070;
        font-weight: 500;
        text-align: left;
        display: flex;
        .view {
            margin-top: 11px;
        }
        .view-count {
            margin-top: auto;
            margin-left: 6px;
            width: 34px;
        }
        .like {
            margin-top: auto;
            margin-left: 22px;
            width: 22px;
            height: 22px;
            padding: 0px;
            &i {
                margin-top: auto;
                font-size: 20px;
            }
        }
        .like-count {
            margin-top: auto;
            margin-left: 6px;
            width: 34px;
        }
    }
`;
const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column !important;
    width:100%;
    height:150px;
    .category-name {
        width: max-content;
        height: 25px;
        color: #FF0000;
        font-size: 17px;
        font-weight: 300;
        line-height: 25px;
        text-align: left;
        font-family: Noto Sans KR;
    }
    .txt {
        display: inline-block; 
    width: 100%;
    height: 140px;
    font-size: 20px;
    font-weight: 200;
    font-family: Noto Sans KR;
    line-height: 35px;
    margin-top: 20px;
    color: #707070;

    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: normal; 
    text-align: left; 
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
        // width: 423px;
        // height: 125px;
        // margin-top: 10px;
        // word-wrap: break-word;
        // color: #707070;
        // font-size: 20px;
        // font-weight: 300;
        // line-height: 29px;
        // font-family: Noto Sans KR;
    }
`;
const RightSide = styled.div`
    display: flex;
    height: 220px;
    justify-content: space-between;
    flex-direction: column !important;
    .do-fork-btn {
        width: max-content;
        margin-top: 15px;
        margin-left: auto;
        text-align: right;
        color: #FF0000;
        font-size: 20px;
        font-weight: 500;
        font-family: Noto Sans KR;
        cursor: pointer;
    }
    .join-box {
        width: max-content;
        height: 25px;
        display: flex;
        margin-top: 15px;
        margin-left: auto;
        .waiting-txt {
            height: 25px;
            font-family: Noto Sans KR;
            font-size: 20px;
            color: #FF0000;
            text-align: right;
            margin-left: auto;
            font-weight: 300;
        }
        .join-txt {
            height: 25px;
            font-family: Noto Sans KR;
            font-size: 20px;
            color: #FF0000;
            text-align: right;
            margin-left: auto;
            font-weight: 300;
            cursor: pointer;
        }
    }
    .design-edit-box {
        width: max-content;
        height: 35px;
        display: flex;
        margin-top: 15px;
        margin-left: auto;
        cursor: pointer;
        .edit-txt {
            margin-top: 15px;
            height: 25px;
            font-family: Noto Sans KR;
            font-size: 17px;
            font-weight: 300;
            color: #707070;
            text-align: right;
        }
        .edit-icon {
            width: 35px; 
            height: 35px; 
            margin-left: 15px; 
            background: url(${iEdit}); 
            background-size: 45px 45px; 
            background-position: center center; 
            background-repeat: no-repeat;
        }
    }
    .design-like-box {
        width: max-content;
        height: 35px;
        display: flex;
        margin-top: 10px;
        margin-left: auto;
        cursor: pointer;
        .like-txt {
            margin-top: 15px;
            height: 25px;
            font-family: Noto Sans KR;
            font-size: 17px;
            font-weight: 300;
            color: #707070;
            text-align: right;
        }
        .like-icon {
            width: 35px;
            height: 35px;
            margin-left: 15px;
            opacity: ${props => props.like_opacity};
            background: url(${thumbup});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
    .msg-icon-box {
        width: max-content;
        display: flex;
        height: 35px;
        margin-top: 15px;
        margin-left: auto;
        cursor: pointer;
        .msg-txt {
            height: 25px;
            margin-top: 10px;
            margin-left: auto;
            text-align: right;
            color: #707070;
            font-size: 17px;
            font-weight: 300;
            font-family: Noto Sans KR;
        }
        .msg-icon {
            margin-left: 15px;
            width: 33px;
            height: 33px;
            background: url(${email});
            background-size: cover;
            background-position: center center;
        }
    }
    .update-time {
        margin-top: 5px;
        width: 200px;
        height: 25px;
        // right: 3px;
        // margin-bottom: 5px;
        text-align: right;
        color: #707070;
        font-size: 17px;
        font-weight: 300;
        font-family: Noto Sans KR;
    }
`;
const DesignMemberList = styled.div`
    display: ${props => props.display};
    z-index: 900;
    position: absolute;
    pointer-events: auto;
    top: ${props => props.top};
    left: ${props => props.left};
    z-index: 904;
    height: 250px;
    max-height: 550px;
    width: 365px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    font-family: Noto Sans KR;
    overflow-y: scroll;
    overflow-x: hidden;
    .close-box {
        position: absolute;
        cursor: pointer;
        z-index: 901;
        right: 10px;
        top: 10px;
    } 
    &.list::-webkit-scrollbar {
        position: absolute;
        width: 4px;
    }

    &.list::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    }
    &.list {
      padding: 15px;
      padding-right: 36px;
      padding-bottom: 5px;
      height: 490px;
        &:hover{
            overflow-y: auto;
            overflow-x: hidden;
    }
`;
const DesignMemberListElement = styled.div`
    width: max-content;
    padding: 5px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 50px;
    border-radius: 15px;
    background: #EFEFEF;
    align-items: center;
    display: flex;
    cursor: pointer;
    .face {
        background-image: url(${props => props.face});
        background-size: cover;
        background-position: center;
        background-color: #D6D6D6;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .nick-name {
        width: max-content;
        height: 29px;
        margin-top: 1px;
        margin-left: 10px;
        color: #707070;
        font-size: 20px;
        text-align: left;
        font-weight: 500;
        font-family: Noto Sans KR;
        line-height: 29px;
    }
    .star {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        background-color: none;
        &i{
            margin-left: auto;
            margin-right: auto;
            color: #707070;
        }
    }
`;
const ListItem = styled.div`
    display:flex;
    padding-left:15px;
    padding-top: 15px;
    flex-direction: column;
    width: 365px;
    height: 85px;
    display: flex;
    border-bottom: 1px solid #B7B7B7;
    color: #707070;
    &:hover {
        background-color: #EFEFEF;
        opacity: 0.90;
    }
    .wrapper {
        cursor: pointer;
        display: flex;
        .design-thumbnail {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            background-image: url(${props => props.img});
            background-size: cover;
            background-position: center;
        }
        .design-title {
            margin-left: 16px;
            font-size: 17px;
        }
    } 
`;
const ForkDialogContainer = styled.div`
    z-index: 950;
    position: fixed;
    width: 576px;
    height: 200px;
    top: 255px;
    left: 618px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border-radius: 5px;
    opacity: 1;
    .close-box {
        cursor:pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .txt {
        margin-top: 25px;
        margin-left: 62.5px;
        width: 394px;
        height: 69px;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        line-height: 35px;
        font-family: Noto Sans KR;
        letter-spacing: 0;
        color: #707070;
        opacity: 1
    }
    .confirm {
        cursor: pointer;
        margin-top: 45px;
        margin-left: 200px;
        width: 130px;
        height: 29px;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
        font-family: Noto Sans KR;
        letter-spacing: 0;
        color: #FF0000;
        opacity: 1;
        padding-bottom: 1.5px;
        border-bottom: 1.5px solid #FF0000;
    }
    .ing-txt{
        margin-top: 39.5px;
        margin-left: 149.5px;
        width: 278px;
        height: 149px;
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        line-height: 40px;
        font-family: Noto Sans KR;
        letter-spacing: 0;
        color: #707070;
        opacity: 1;
        p {
            color: #FF0000;
        }
    }
`;
const LikeDialogContainer = styled.div`
    position: absolute;
    width: 396px;
    height: 138px;
    top: 47px;
    left: 763px;
    box-shadow: 0px 3px 6px #000000;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    .txt {
        width: 273px;
        height: 69px;
        margin-top: 31.5px;
        margin-left: 62.5px;
        text-align: center;
        color: #707070;
        font-size: 20px;
        font-weight: 500;
        font-family: Noto Sans KR;
        line-height: 40px;
    }
`;
const DesignMemberModalContainer = styled(Modal)`
.close-box {
    cursor:pointer;
    position: absolute;
    right:10px;
    top:10px;
}
`;
const DesignCommentModalContainer = styled(Modal)`
    padding: 60px;
    min-width: 800px;
    // width: max-content;
    // max-width: 1440px;
    .close-box {
        cursor:pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .header-txt {
        margin-bottom:20px;
    }
    .body-container {
        width: 100%;
    }
`;

const DesignInfo3 = styled.div`
    margin-top: 21px;
    width: 100%;
    background-color: #EFEFEF;    
    padding-bottom: 18px;    
    @media only screen and (min-width: 0px) and (max-width: 900px) {    
      margin-top: 55px;    
    }
  .grid {
    min-height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .title {
        display: none;
        @media only screen and (min-width: 0px) and (max-width: 1250px) {    
            display: block;
            margin-left: 25px;
        }
        position: absolute;
        height: 29px;
        color: #707070;
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        line-height: 29px;
        cursor: pointer;
    }
  }
  .grid > div {
    display: flex; 
    justify-content: center;
    flex-direction: row;//column;
  }
  .grid > div:last-child {
    display: flex; 
    justify-content: center;
    flex-direction: column;
  }
  .grid > div > div {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .box1 { 
    order: 1;
    width: 200px;
    margin-left: 65px;
    margin-top: 19px;
  }
  .box2 { 
    order: 2;
    width: 165px;
    margin-top: 19px;
    margin-left: 42px;
  }
  .box3 { 
    order: 3;
    // width: 423px;
    width:1050px;
    margin-left: 65px;
    margin-top: 65px;
    @media only screen and (min-width: 0px) and (max-width: 1250px) {
      order: 4;
    }
    &.secondary {
      @media only screen and (min-width: 0px) and (max-width: 1760px) {
        display: none;
      }
    }
  }
  .box4 { 
    order: 4;
    width: 208px;
    margin-left: auto;
    margin-right: 72px;
    margin-top: 19px;
    @media only screen and (min-width: 0px) and (max-width: 1250px) {
      order: 3;
      margin-left: 25px;
    }

`;

class DesignInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { posX: -1, posY: -1, likeDialog: false, forkDialog: 0, forkDesignList: false, memberList: false, comment: false };
        this.like = this.like.bind(this);
        this.needLogin = this.needLogin.bind(this);
        this.forkDesign = this.forkDesign.bind(this);
        this.getForkDesignList = this.getForkDesignList.bind(this);
        this.joinMember = this.joinMember.bind(this);
        this.getMemberList = this.getMemberList.bind(this);
        this.getDesignComment = this.getDesignComment.bind(this);
        this.onMoveForkDesign = this.onMoveForkDesign.bind(this);
        this.onBlurMemberList = this.onBlurMemberList.bind(this);
        this.onBlurForkDesign = this.onBlurForkDesign.bind(this);
    }
    onBlurMemberList(event){
        this.setState({memberList:false});
    }
    onBlurForkDesign(event){
        this.setState({forkDesignList:false});
    }
    onMoveForkDesign(designID) {
        window.location.href = "/designDetail/" + designID;
    }
    needLogin() {
        alert("로그인 해주세요.");
    }

    closeMemberList() {
        this.setState({ memberList: false });
    }
    closeForkList() {
        this.setState({ forkDesignList: false });
    }
    async getForkDesignList(event) {
        await this.setState({ posX: event.clientX, posY: event.clientY });
        this.props.ForkDesignListRequest(this.props.DesignDetail.uid);
        await this.setState({ forkDesignList: true });
    }
    joinMember = () => {
        if (!this.props.userInfo || !this.props.token) {
            alert("로그인을 해주세요.");
        } else if (this.props.DesignDetail.waitingStatus === 1) {
            alert("가입 대기중인 디자인입니다.");
        } else {
            const data = [{ uid: this.props.userInfo.uid }];
            if (window.confirm("해당 디자인에 멤버로 가입 신청하시겠습니까?")) {
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
        //alert(this.props.new_design_id);
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
                <DesignMemberModalContainer open={isMyDesign && this.state.memberList} closeOnDimmerClick={false} onClose={() => this.setState({ memberList: false })}>
                    <div className="close-box" onClick={() => this.setState({ memberList: false })} >
                        <Cross angle={45} color={"#707070"} weight={3} width={20} height={20} />
                    </div>
                    <Modal.Content>
                        <DesignMemberContainer mine={isMyDesign} DesignDetail={DesignDetail} />
                    </Modal.Content>
                </DesignMemberModalContainer>
            )
        }
        const DesignCommentModal = () => {
            return (
                <DesignCommentModalContainer open={this.state.comment} onClose={() => this.setState({ comment: false })}>
                    <div className="close-box" onClick={() => this.setState({ comment: false })} >
                        <Cross angle={45} color={"#000000"} weight={3} width={20} height={20} />
                    </div>
                    {/* <Modal.Content> */}
                    <div className="header-txt"><h2>댓글</h2></div>
                    <div className="body-container">
                        <DesignComment designId={parseInt(this.props.id, 10)} requestDesignDetail={this.props.GetDesignCountRequest} />
                    </div>
                    {/* </Modal.Content> */}
                </DesignCommentModalContainer>)
        }

        return (
            <React.Fragment>
                {this.state.forkDialog > 0 &&
                    <ForkDialogContainer>
                        {this.state.forkDialog === 1 && <React.Fragment>
                            <div className="close-box" onClick={() => this.closeFork()} >
                                <Cross angle={45} color={"#707070"} weight={3} width={45} height={45} /></div>
                            <div className="txt">
                                {DesignDetail.userName.slice(0, 12)}님의 디자인 <br />"{DesignDetail.title.slice(0, 16)}{DesignDetail.title.length > 16 && "..."}"<br />파생 디자인을 생성하시겠습니까?</div>
                            <div className="confirm" onClick={() => this.doFork()} >
                                네, 생성합니다.</div></React.Fragment>}
                        {this.state.forkDialog === 2 && <React.Fragment>
                            <div className="ing-txt" >
                                파생 디자인 생성중입니다.
                                <p >디자인 수정 페이지로 이동합니다.</p>
                                추가 정보를 입력해 주세요!</div>
                        </React.Fragment>}
                    </ForkDialogContainer>}

                {this.state.likeDialog &&
                    <LikeDialogContainer>
                        <div className="txt">관심 디자인으로 등록되었습니다.<br />내 정보에서 확인 가능합니다.</div></LikeDialogContainer>}

                {/*  */}
                <DesignInfo3>
                    <div className="grid">
                        <div className="title" title={DesignDetail.title}>{DesignDetail.title.slice(0, 64)}{DesignDetail.title.length > 64 ? "..." : ""}</div>
                        <div className="box box1">
                            {/* THUMBNAIL */}
                            <ThumbnailWrapper img={thumbnail}>
                                {DesignDetail.parent_design && <div className="fork-mark" />}
                                <div className="thumbnail" />
                            </ThumbnailWrapper></div>
                        <div className="box box2">
                            {/* LEFT */}
                            <LeftSide>
                                <div>
                                    <div className="title" title={DesignDetail.title}>{DesignDetail.title.slice(0, 64)}{DesignDetail.title.length > 64 ? "..." : ""}</div>
                                    <div className="box">
                                        {DesignDetail.parent_design ?
                                            <div className="goto-parent" onClick={() => this.goParentDesign(DesignDetail.parent_design)} title={DesignDetail.parent_title}>
                                                {DesignDetail.parent_title.slice(0, 4)} {DesignDetail.parent_title.length > 4 && "..."}에서 파생됨</div>
                                            : <div className="goto-parent no"></div>}
                                        <button className="member-list-btn" onBlur={this.onBlurMemberList} onClick={this.getMemberList} ref={ref => (this.memberlist = ref)}>
                                            <div className="design_member"> {DesignDetail.userName.length > 7 ? DesignDetail.userName.slice(0, 7) + "..." : DesignDetail.userName}{(DesignDetail.member && DesignDetail.member.length > 1) && "외" + (DesignDetail.member.length - 1).toString() + "명"}</div>
                                        </button>
                                        {!isMyDesign && this.state.memberList &&
                                            <DesignMemberList top={this.state.posY} left={this.state.posX}>
                                                <div className="close-box" onClick={() => this.setState({ memberList: false })} >
                                                    <Cross angle={45} width={30} height={30} />
                                                </div>
                                                <div className="list">
                                                    {DesignDetail.member && DesignDetail.member.length > 0 &&
                                                        DesignDetail.member.map((mem, i) =>
                                                            <DesignMemberListElement face={mem.thumbnail ? mem.thumbnail.s_img : noface} key={i} >
                                                                <div className="face" />
                                                                <div className="nick-name">{mem.nick_name}</div>
                                                                {DesignDetail.user_id === mem.user_id &&
                                                                    <div title={"팀장"} ><i className="star icon" /></div>}
                                                            </DesignMemberListElement>)}</div>
                                            </DesignMemberList>}

                                        <div className="comment-box" onClick={this.getDesignComment} >
                                            <div className="txt">댓글</div>
                                            <div className="count">{Count && Count.comment_count ? NumberFormat(Count.comment_count) : 0}</div>
                                        </div>

                                        {DesignDetail.children_count["count(*)"] > 0
                                            ? <button className="fork-list-btn" ref={ref => (this.forkDesignRef = ref)} onBlur={this.onBlurForkDesign} onClick={(event) => { this.getForkDesignList(event) }}>
                                                <React.Fragment>파생된 디자인<div className="fork-count">{DesignDetail.children_count["count(*)"]}</div></React.Fragment>
                                            </button>
                                            : <button className="fork-list-btn no" disabled></button>}

                                        {this.state.forkDesignList &&
                                            <DesignMemberList top={this.state.posY} left={this.state.posX}>
                                                <div className="close-box" onClick={() => this.setState({ forkDesignList: false })} >
                                                    <Cross angle={45} color={"#000000"} weight={3} width={30} height={30} />
                                                </div>
                                                <div className="list">
                                                    {this.props.forkDesignList && this.props.forkDesignList.map((item, idx) => {
                                                        return (<ListItem key={item + idx} img={item.p_s_img}>
                                                            <div className="wrapper" onClick={() => this.onMoveForkDesign(item.uid)} >
                                                                <div className="design-thumbnail" />
                                                                <div className="design-title">
                                                                    <TextFormat txt={item.title} chars={23} />
                                                                    <div>{item.nick_name}</div></div>
                                                            </div></ListItem>);
                                                    })}</div>
                                            </DesignMemberList>}
                                    </div>
                                </div>

                                <div>
                                    <div className="count-box">
                                        <div className="view"><IconView width="20px" height="17px" fill="#707070" /></div>
                                        <div className="view-count">{NumberFormat(Count.view_count)}</div>
                                        <div className="like"><i className="material-icons">&#xE8DC;</i></div>
                                        <div className="like-count">{NumberFormat(Count.like_count)}</div>
                                    </div>
                                </div>
                            </LeftSide>
                        </div>
                        <div className="box box3">
                            {/* DESCRIPTION */}
                            <DescriptionContainer>
                                <div className="category-name">{DesignDetail.categoryName}</div>
                                <div className="txt">
                                    {/* {DesignDetail.explanation ? (<p>{DesignDetail.explanation.slice(0, 88)}</p>) : (``)} */}
                                    {DesignDetail.explanation}
                                </div>
                            </DescriptionContainer>
                        </div>
                        {/* <div className="box box3 secondary"> */}
                            {/* DESCRIPTION */}
                            {/* <DescriptionContainer>
                                <div className="category-name"></div>
                                <div className="txt">{DesignDetail.explanation && DesignDetail.explanation.slice(88, 170 - 3)}{(DesignDetail.explanation && DesignDetail.explanation.length > 170 - 3) ? "..." : ""}</div>
                            </DescriptionContainer>
                        </div> */}
                        <div className="box box4">
                            <div>
                                {/* RIGHT */}
                                <RightSide like_opacity={like ? 1 : 0.45}>
                                    <div>
                                        <div className="do-fork-btn" onClick={() => this.forkDesign()}>파생 디자인 생성</div>
                                        {isMyDesign === false && <div className="join-box">
                                            {editor === false ?
                                                DesignDetail && DesignDetail.waitingStatus === 1 ?
                                                    <div className="waiting-txt">가입승인 대기중</div>
                                                    : <div className="join-txt" onClick={this.joinMember} >가입 신청</div> : undefined}
                                        </div>}
                                        {isMyDesign === true ?
                                            <div className="design-edit-box" onClick={this.gotoDesignModify}  >
                                                <div className="edit-txt">디자인 수정하기</div>
                                                <div className="edit-icon" />
                                            </div>
                                            :
                                            <div className="design-like-box" onClick={this.like} >
                                                <div className="like-txt" >관심 디자인 {like ? "취소하기" : "등록하기"}</div>
                                                <div className="like-icon" />
                                            </div>}
                                        {isMyDesign === true ?
                                            null :
                                            <div className="msg-icon-box" onClick={() => this.sendMessage(DesignDetail.user_id, DesignDetail.userName)}>
                                                <div className="msg-txt">메시지 보내기</div>
                                                <div className="msg-icon" />
                                            </div>}
                                    </div>
                                    <div>
                                        <div className="update-time">최근 업데이트 {DateFormat(DesignDetail.update_time)}</div>
                                        <div className="update-time">{DateFormat(DesignDetail.create_time)} 등록</div>
                                    </div>
                                </RightSide>
                            </div>
                        </div>
                    </div>
                </DesignInfo3>

                <MemberModal />
                <DesignCommentModal />
            </React.Fragment >
        )
    }
};

export default DesignInfo;
