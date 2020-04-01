import React, { Component } from 'react';
import styled from 'styled-components';

// img
import noface from "source/thumbnail.png";
import iForked from "source/baseline_library_books_black_48dp.png";
import iThumbUp from "source/thumbup_icon_black.png"
import iMessage from 'source/email.png';
import IconView from "source/IconView";
import iEdit from 'source/edit_1.png';
import DateFormat from 'modules/DateFormat';
import NumberFormat from "modules/NumberFormat";

// CSS
const InterestDesignerBox = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    width:100%;
    // height:36px;
    // margin-top:64px;
`;
const InterestDesignerTitle = styled.div`
    cursor: pointer;
    display: inline-block;
    width: max-content;
    color: #707070;
    font-family: Noto Sans KR;
    font-size: 17px;
    font-weight: 200;
    text-align: right;
`;
const InterestDesignerIcon = styled.div`
    display: inline-block;
    opacity: ${props => props.opacity};
    width: 40px;
    height: 35px;
    margin-left: 15px;
    // margin-bottom: -7px;
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center center;
`;
const SendMessageBox = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 45px;
    margin-top: 33px;
`;
const SendMessagTitle = styled.div`
    display: inline-block;
    margin-bottom: 7px;
    width: max-content;
    color: #707070;
    font-family: Noto Sans KR;
    font-size: 17px;
    font-weight: 200;
    text-align: right;
`;
const SendMessageImg = styled.div`
    display: inline-block;
    opacity: ${props => props.opacity};
    width: 40px;
    height: 35px;
    margin-left: 15px;
    background-size: cover;
    background-position: center center;
    background-image: url(${props => props.icon});
`;
const ProfileBox = styled.div`
    min-width: 200px;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background: #D6D6D6;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-image: url(${props => props.img});
`;
const NameLabel = styled.div`
    width: max-content;
    min-width: 200px;
    height: 29px;
    font-size: 20px;
    font-weignt: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: center;
`;
const CategoryLabel = styled.div`
    width:479px;
    height:29px;
    font-size:20px;
    font-weight:200;
    font-family:Noto Sans KR;
    color:#FF0000;
    text-align:left;
`;
const ExplainBox01 = styled.div`
    width: 100%;
    height: 130px;
    font-size: 20px;
    font-weight: 200;
    font-family: Noto Sans KR;
    line-height: 35px;
    color: #707070;

    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: normal; 
    text-align: left; 
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 4; 
    -webkit-box-orient: vertical;
`;
const CountBox = styled.div`
    width: 300px;
    display: flex;
    .innerWrapper {
        background-color: #EFEFEF;
        width: 200px;
        margin-top: 19px;
        height: 22px;
        display: flex;
        justify-content: space-start;
        text-align: left;
        line-height: 35px;
        font-size: 15px;
        font-weight: 500;
        align-items: center;
        cursor: default;
    }
`;

const SideItemIcon = styled.div`
    cursor:pointer;
    height:36px;
    width:36px;
    margin-left:15px;
    background:${props => `url(${props.imageURL})`};
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center center;
`;
const LikeDialog = styled.div`
    width:396px;
    height:138px;
    position:absolute;
    top:47px;
    left:763px;
    background:#FFFFFF 0% 0% no-repeat padding-box;
    border-radius:5px;
    box-shadow:0px 3px 6px #000000;
    opacity:1;
    .message
    {
        width:273px;
        height:69px;
        margin-top:31px;
        margin-left:62px;
        font-size:20px;
        font-weight:500;
        font-family:Noto Sans KR;
        color:#707070;
        line-height:40px;
        text-align:center;
    }
`;
// new
const Header = styled.div`
    // div{border:1px solid red;}
    width: ${props => props.width}px;
    display: flex;
    @media only screen and (min-width : ${0}px) and (max-width : ${900}px) {
        margin-top: 50px;
    }
`;
const ButtonRegion = styled.div`
    display: flex;
    height: 250px;
    padding: 15px 0px;
    flex-direction: column !important;
    .sideItemBox {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
        height: 36px;
    }
    .sideMenu_label {
        cursor: pointer;
        width: 164px;
        height: 25px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 17px;
        font-weight: 200;
        text-align: right;
    }
    .UpdateTimeLabel {
        width: max-content;
        height: 25px;
        margin-left: auto;
        font-size: 17px;
        font-weight: 200;
        font-family: Noto Sans KR;
        color: #707070;
        text-align: right;
    }
`;
const LeftSide = styled.div`
    margin-left: 35px;
    display: flex;
    flex-direction: column;

    @media only screen and (min-width : ${0}px) and (max-width : ${750}px) {
        display: none;
    }
`;
class DesignerPageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
            descriptionLengthCheck: "", joinDialog: false, likeDialog: false, manager: false, tmpLike: false
        };
        this.needLogin = this.needLogin.bind(this);
        this.like = this.like.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.gotoMyModify = this.gotoMyModify.bind(this);
    }
    handleResize = () => {
        this.setState({ w: window.innerWidth > 1920 ? 1920 : window.innerWidth });
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }
    gotoMyModify() {
        let href = window.location.href.substring(0, window.location.href.search("designerDetail"))
        window.location.href = href + 'mymodify';
    }
    needLogin() {
        alert("로그인을 해주세요.");
    }
    async like() {
        if (!this.props.userInfo) {
            this.needLogin();
            return;
        }
        if (this.props.like) { //dislike
            this.props.UnlikeDesignerRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetDesignerDetailRequest(this.props.id) })
                .then(() => { this.props.GetDesignerCountRequest(this.props.id) })
                .then(() => { this.props.GetLikeDesignerRequest(this.props.id, this.props.token) })
        } else { // like
            await this.setState({ likeDialog: true })
            this.props.LikeDesignerRequest(this.props.id, this.props.token)
                .then(() => { this.props.GetDesignerDetailRequest(this.props.id) })
                .then(() => { this.props.GetDesignerCountRequest(this.props.id) })
                .then(() => { this.props.GetLikeDesignerRequest(this.props.id, this.props.token) })
            setTimeout(() => { this.setState({ likeDialog: false }) }, 2500);
        }
    }
    sendMessage() {
        let href = window.location.href.substring(0, window.location.href.search("designerDetail"))
        window.location.href = href + 'message/' + this.props.DesignerDetail.uid + '/' + this.props.DesignerDetail.nick_name;
    }
    render() {
        const { DesignerDetail, Count, like } = this.props;
        const { likeDialog, w } = this.state;
        const thumbnailInfo = DesignerDetail.thumbnail ? DesignerDetail.thumbnailUrl.m_img : noface;
        const isMyProfile = this.props.userInfo && DesignerDetail && this.props.userInfo.uid === DesignerDetail.uid ? true : false;
        const MypageInfo = this.props.DesignerDetail;

        console.log("DesignerDetail::", this.props);

        return (

            <React.Fragment>

                {likeDialog ?
                    <LikeDialog>
                        <div className="dialog-context">
                            관심 디자이너로 등록되었습니다.<br />
                        내 정보에서 확인 가능합니다.
                        </div>
                    </LikeDialog>
                    : null}

                <Header width={w}>
                    {DesignerDetail ?
                        <div style={{ width: `${w}px`, height: "250px", backgroundColor: "#EFEFEF", display: "flex", flexDirection: "row" }}>
                            {/* left */}
                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <div style={{ marginLeft: "15px", marginTop: "15px", display: "flex", flexDirection: "column" }}>
                                    <NameLabel>{DesignerDetail.nick_name}</NameLabel>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <ProfileBox img={thumbnailInfo} />
                                        <LeftSide >
                                            {DesignerDetail.categoryName ?
                                                <CategoryLabel>{DesignerDetail.categoryName}</CategoryLabel>
                                                : null}
                                            <ExplainBox01>{MypageInfo.about_me}</ExplainBox01>
                                            <CountBox>
                                                <div className="innerWrapper">
                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(Count.total_view || 0)}</div>
                                                    </div>

                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(Count.total_like || 0)}</div>
                                                    </div>

                                                    <div style={{ display: "flex" }}>
                                                        <div style={{ marginTop: "5px" }}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px', marginTop: "4px" }}>{NumberFormat(Count.total_design || 0 + Count.total_group || 0)}</div>
                                                    </div>
                                                </div>
                                            </CountBox>
                                        </LeftSide>
                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div style={{ marginLeft: "auto", marginRight: "15px" }}>
                                <ButtonRegion>
                                    <div>
                                        {isMyProfile ?
                                            <div onClick={this.gotoMyModify} className="sideItemBox">
                                                <div className="sideMenu_label">정보 수정하기</div>
                                                <SideItemIcon imageURL={iEdit} />
                                            </div>
                                            : <React.Fragment>
                                                <InterestDesignerBox onClick={this.props.userInfo == null ? null : () => this.like()}>
                                                    <InterestDesignerTitle>관심 디자이너 {like ? "취소하기" : "등록하기"}</InterestDesignerTitle>
                                                    <InterestDesignerIcon opacity={like ? "0.5" : "0.25"} img={iThumbUp} />
                                                </InterestDesignerBox>
                                                <SendMessageBox onClick={this.sendMessage}>
                                                    <SendMessagTitle>메시지 보내기</SendMessagTitle>
                                                    <SendMessageImg icon={iMessage} />
                                                </SendMessageBox>
                                            </React.Fragment>}
                                    </div>
                                    <div style={{ marginTop: "auto" }}>
                                        <div className="UpdateTimeLabel">최근 업데이트 {DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                                    </div>
                                </ButtonRegion>
                            </div>
                        </div>
                        : // case of no DesignerDetail
                        <div></div>}
                </Header>
            </React.Fragment >);
    };
}
export default DesignerPageHeader;