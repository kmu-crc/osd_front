import React, { Component } from 'react';
import styled from 'styled-components';

// img
import noface from "source/thumbnail.png";
import iconView from "source/mypage_icon_view.svg";
import iconLike from "source/mypage_icon_like.svg";
import iconArticle from "source/mypage_icon_article.svg";
import iMessage from "source/email.png";
import iThumbUp from "source/thumbup_icon_black.png";
import NumberFormat from "modules/NumberFormat";
import DateFormat from 'modules/DateFormat';
import { alert } from "components/Commons/Alert/Alert";

// CSS
const LikeDialog = styled.div`
    width: max-content;
    // height: 138px;
    position: absolute;
    top: 25%;
    left: 50%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 5px;
    box-shadow: 0px 3px 6px #000000;
    opacity: 1;
    z-index: 2000;

    padding: 35px 50px;
    text-align: center;
    font-weight: medium;
    font-size: 24px;
    line-height: 30px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
`;
const Wrapper = styled.div`
    margin-top: ${100 + 24}px;
    margin-left: ${100 + 38}px;
    // *{border: 1px solid red;}
`;
const Thumbnail = styled.div`
    width: 226px;
    height: 226px;
    min-width: 226px;
    min-height: 226px;
    background-color: #FFF;
    background-image: url(${props => props.face});
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 100%;

    // box-shadow: rgba(38, 57, 77, 0.25) 0px 10px 15px -5px;
`;
const DesignerInfoBox = styled.div`
    padding: 12px 12px 12px 34px;

    max-width: 1737px;

    display: flex;
    flex-direction: row;

    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    background-color: #E0E0E0;
    box-shadow: rgba(38, 57, 77, 0.25) 0px 10px 15px -5px;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .nick {
        margin-top: 5px;
        width: max-content;
        height: 41px;
        text-align: left;
        font-weight: bold;
        font-size: 28px;
        line-height: 41px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
     }
     .cate {
        margin-top: 5px;
        width: max-content;
        height: 28px;
        text-align: left;
        font-weight: normal;
        font-size: 19px;
        line-height: 28px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #FF0000;
        opacity: 1;
     }

    .about {
        padding-left: 5px;
        padding-right: 10px;
        margin-top: 5px;
        text-align: left;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
     }

    .count { 
        display: flex;
        flex-direction: row;

        .element {
            display: flex;
            flex-direction: row;
            .icon {
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;

                margin-right: 7px;
            }
            .num {
                width: max-content;
                height: 38px;
                text-align: left;
                font-weight: normal;
                font-size: 26px;
                line-height: 38px;
                font-family: Spoqa Han Sans;
                letter-spacing: 0px;
                color: #000000;
                opacity: 1;

            }
            margin-right: 20px;
            :last-child { margin-right: 0px;}
        }
    }
`;
const IconDiv = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.icon});
    background-position: center center;
    background-size: cover;
    .active { opacity: 1; }
    .inactive { opacity: 0.5; }
`;
const Additional = styled.div`
    width: max-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .modify {
        margin-bottom: 18px;
        :last-child { margin-bottom: 0px; }
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .modify-text {
        width: max-content;
        height: 22px;
        text-align: right;
        font-weight: normal;
        font-size: 15px;
        line-height: 22px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;

        margin-top: 3px;
        margin-right: 6px;
    }
    .modify-icon {
        width: 22px;
        height: 22px;
        filter: invert(100%);
        filter: brightness(0);
        margin-top: 3px;
    }
    .date {
        width: max-content;
        text-align: right;
        font-weight: normal;
        font-size: 18px;
        line-height: 26px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
    }
`;
class DesignerPageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: window.innerWidth > 1920 ? 1920 : window.innerWidth, isSeeMore: false,
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
    async needLogin() {
        await alert("로그인 해주세요.", "확인");
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

        return (<Wrapper>

            {likeDialog ?
                <LikeDialog>
                    <div className="message">
                        관심 디자이너로 등록되었습니다.<br />
                        내 정보에서 확인 가능합니다.
                    </div>
                </LikeDialog>
                : null}

            <DesignerInfoBox>
                <Thumbnail face={thumbnailInfo} />

                <div className="wrapper">
                    <Details>
                        <div className="wrapper">
                            <div className="nick">{DesignerDetail.nick_name}</div>
                            <div className="cate">{DesignerDetail.categoryName}</div>
                            <div className="about">{DesignerDetail.about_me}</div>
                        </div>
                        <div className="count">
                            <div className="element">
                                <div className="icon"><IconDiv width={38} height={38} icon={iconView} /></div>
                                <div className="num">{NumberFormat(Count.total_view)}</div>
                            </div>
                            <div className="element">
                                <div className="icon"><IconDiv width={38} height={38} icon={iconLike} /></div>
                                <div className="num">{NumberFormat(Count.total_like)}</div>
                            </div>
                            <div className="element">
                                <div className="icon"><IconDiv width={28} height={28} icon={iconArticle} /></div>
                                <div className="num">{NumberFormat(Count.total_design + Count.total_group)}</div>
                            </div>
                        </div>
                    </Details>

                    <Additional>
                        <div classname="wrapper">
                            <div className="modify"
                                onClick={this.props.userInfo == null
                                    ? async () => await alert("로그인 해주세요", "확인")
                                    : () => this.like()}>
                                <div className="modify-text">관심디자이너 {like ? "취소하기" : "등록하기"}</div>
                                <div className="modify-icon">
                                    <IconDiv width={22} height={20} className={`${like ? "active" : "inactive"}`} icon={iThumbUp} />
                                </div>
                            </div>
                            <div className="modify" onClick={this.sendMessage}>
                                <div className="modify-text">메시지 보내기</div>
                                <div className="modify-icon">
                                    <IconDiv width={20} height={16} icon={iMessage} />
                                </div>
                            </div>
                        </div>
                        <div className="date">
                            <div className="update-date">최근&nbsp;업데이트&nbsp;{DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                            <div className="create-date">등록일자&nbsp;{DesignerDetail ? new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').length - 1) : "none"}</div>
                        </div>
                    </Additional>

                </div>

            </DesignerInfoBox>

        </Wrapper>);
    };
}
export default DesignerPageHeader;

//  // new
//const Header = styled.div`
//    // div{border:1px solid red;}
//    width: ${props => props.width}px;
//    display: flex;
//    @media only screen and (min-width : ${0}px) and (max-width : ${900}px) {
//        margin-top: 50px;
//    }
//`;
//const ButtonRegion = styled.div`
//    display: flex;
//    height: 250px;
//    padding: 15px 0px;
//    flex-direction: column !important;
//    .sideItemBox {
//        display: flex;
//        justify-content: flex-end;
//        align-items: flex-end;
//        width: 100%;
//        height: 36px;
//    }
//    .sideMenu_label {
//        cursor: pointer;
//        width: 164px;
//        height: 25px;
//        color: #707070;
//        font-family: Noto Sans KR;
//        font-size: 17px;
//        font-weight: 200;
//        text-align: right;
//    }
//    .UpdateTimeLabel {
//        width: max-content;
//        height: 25px;
//        margin-left: auto;
//        font-size: 17px;
//        font-weight: 200;
//        font-family: Noto Sans KR;
//        color: #707070;
//        text-align: right;
//    }
//`;
//const LeftSide = styled.div`
//    margin-left: 35px;
//    display: flex;
//    flex-direction: column;
//
//    @media only screen and (min-width : ${0}px) and (max-width : ${750}px) {
//        display: none;
//    }
//`;

{/* <MainBox>
    <div className="wrapper">
        <OneSideBox>
            <div className="title">{DesignerDetail.nick_name}</div>
            <Thumbnail imageURL={thumbnailInfo} />
            <div className="mobileMode">
                <div className="time_label">
                    <div>최근 업데이트 {DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                    <div>등록 일자 {DesignerDetail && new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
                </div>
                <div className="count-box">
                    <div className="icon-wrapper">
                        <IconView width="22px" height="11px" fill="#000000" opacity="0.55" />
                        <div className="label">{NumberFormat(Count.total_view || 0)}</div>
                    </div>

                    <div className="icon-wrapper">
                        <img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} />
                        <div className="label">{NumberFormat(Count.total_like || 0)}</div>
                    </div>

                    <div className="icon-wrapper">
                        <img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55" }} />
                        <div className="label">{NumberFormat(Count.total_design || 0 + Count.total_group || 0)}</div>
                    </div>
                </div>
            </div>
        </OneSideBox>
        <TwoSideBox w={w - 450}>
            <div className="explainBox">
                {DesignerDetail.categoryName ?
                    <CategoryLabel>{DesignerDetail.categoryName}</CategoryLabel>
                    : null}
                <div className="explanationRegion">
                    <p>{MypageInfo.about_me}</p>
                </div>
                <div className="count-box">
                    <div className="icon-wrapper">
                        <IconView width="22px" height="11px" fill="#000000" opacity="0.55" />
                        <div className="label">{NumberFormat(Count.total_view || 0)}</div>
                    </div>

                    <div className="icon-wrapper">
                        <img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} />
                        <div className="label">{NumberFormat(Count.total_like || 0)}</div>
                    </div>

                    <div className="icon-wrapper">
                        <img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} />
                        <div className="label">{NumberFormat(Count.total_design || 0 + Count.total_group || 0)}</div>
                    </div>
                </div>
            </div>

        </TwoSideBox>
        <ThreeSideBox>
            <div>
                {isMyProfile ?
                    <div onClick={this.gotoMyModify} className="sideItemBox">
                        <div className="sideMenu_label">정보 수정하기</div>
                        <SideItemIcon imageURL={iEdit} />
                    </div>
                    : <React.Fragment>
                        <InterestDesignerBox onClick={this.props.userInfo == null ? async () => await alert("로그인 해주세요", "확인") : () => this.like()}>
                            <InterestDesignerTitle>관심 디자이너 {like ? "취소하기" : "등록하기"}</InterestDesignerTitle>
                            <InterestDesignerIcon opacity={like ? "0.5" : "0.25"} img={iThumbUp} />
                        </InterestDesignerBox>
                        <SendMessageBox >
                            <SendMessagTitle>메시지 보내기</SendMessagTitle>
                            <SendMessageImg icon={iMessage} />
                        </SendMessageBox>
                    </React.Fragment>}
            </div>
            <div className="time_label">
                <div>최근 업데이트 {DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                <div>등록 일자 {DesignerDetail && new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').length - 1)}</div>
            </div>
        </ThreeSideBox>
        <MobileSeeMore isShow={this.state.isSeeMore}>
            <div className="explain-box font_middle">{DesignerDetail.about_me}</div>
            <div className="icon-box">
                {isMyProfile === true ?
                    <div className="icon-wrapper">
                        <div onClick={this.gotoMyModify} className="icon-piece"><MiniIcon iconName={iEdit} /><div className="font_small">정보수정</div></div>
                    </div>
                    :
                    <div className="icon-wrapper" >
                        <div className="icon-piece" onClick={this.like}><MiniIcon like_opacity={like ? 1 : 0.45} iconName={iThumbUp} /><div className="font_small">관심그룹</div></div>
                    </div>
                }
                <div className="icon-wrapper">
                    <div onClick={this.sendMessage} className="icon-piece"><Icon color="grey" className="mail" size="big" /><div className="font_small">메시지</div></div>
                </div>

            </div>
        </MobileSeeMore>
        <div className="seemore cursor_pointer" onClick={() => { this.setState({ isSeeMore: !this.state.isSeeMore }) }}>
            <div className="txt">{this.state.isSeeMore == false ? "▼ 더보기" : "▲ 접기"}</div>
        </div>
    </div>
</MainBox> 
*/}


// const Thumbnail = styled.div`
//     position:relative;
//     min-width: 200px;
//     max-width: 200px;
//     min-height: 200px;
//     max-height:200px;
//     border-radius: 200px;
//     background: #D6D6D6;
//     background-repeat: no-repeat;
//     background-position: 50%;
//     background-size: cover;
//     background-image: ${props => `url(${props.imageURL})`};
//     @media only screen and (min-width : ${0}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         min-width: 100px;
//         min-height:100px;
//         max-width: 100px;
//         max-height:100px;
//         margin-right:20px;
//     }
// `
// const MainBox = styled.div`
//     width:100%;
//     position:relative;
//     .wrapper{
//         width:100%;
//         height:100%;
//         background-color:#EFEFEF;
//         display:flex;
//         padding:15px;
//         padding-left:25px;
//         .seemore{
//             margin-top:15px;
//             width:100%;
//             height:max-content;
//             background-color:#E6E6E6;
//             padding:3px;
//             border-radius:3px;
//             display:none;
//             .txt{
//                 width:max-content;
//                 height:max-content;
//                 color:#707070;
//             }
//         }
//     }      
//     .font_big{font-size:20px;}
//     .font_midBig{font-size:17px;}
//     .font_middle{font-size:16px;}
//     .font_smallthan{font-size:14px;}
//     .font_small{font-size:12px;}
//     .font_bold{font-weight:500;}
//     .font_fit{font-weight:300;}
//     .font_red{color:#FF0000;}
//     .flexBox{display:flex;}
//     .algin_right{text-align:right;}
//     .margin_top{margin-top:15px;}
//     .margin_bottom{margin-bottom:10px;}
//     .margin_bottom_small{margin-bottom:5px;}
//     .alignItem_end{align-items:flex-end;}
//     .line_height{line-height:20px;}
//     .position_relative{position:relative;}
//     .transparent_btn{
//         width: max-content;
//         margin-top:15px;
//         margin-left:-5px;
//         background:none;
//         border:none;
//         outline:none;
//         display:flex;
//     }
//     .cursor_pointer{
//         cursor:pointer;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.LargeMaxWidth}px){
//         width:1920px;
//     }
//     @media only screen and (min-width : ${0}px) and (max-width : ${1024}px) {
//         height:max-content;
//         margin-top: 90px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width : ${1024}px) {
//         .wrapper{
//             flex-wrap:wrap
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {

//         .wrapper{
//             flex-wrap:wrap
//             .seemore{
//                 display:flex;
//                 justify-content:center;
//                 align-items:center;
//             }
//         }
//     }
// `
// const OneSideBox = styled.div`
//     width:200px;
//     height:max-content;

//     .title{
//         width: max-content;
//         min-width: 200px;
//         height: 29px;
//         font-size: 20px;
//         font-weignt: 500;
//         font-family: Noto Sans KR;
//         color: #707070;
//         text-align: center;

//     }
//     .mobileMode {
//         width:max-content;
//         display:none;
//         margin-top:20px;
//         font-weight:300;
//         color:#707070;
//         position:relative;
//         .time_label{
//             font-size:14px;
//             font-weight:300;
//             font-family:Noto Sans KR;
//             color:#707070;
//             letter-spacing:0;
//             line-height:18px;
//         }
//         .count-box{
//             width:180px;
//             display:flex;
//             align-items:flex-end;
//             text-align:center;
//             font-weight:500;
//             .icon-wrapper{
//                 display:flex;
//                 margin-right:10px;
//                 align-items:center;
//             }
//             .label{
//                 color:#707070;
//                 margin-left:3px;
//                 width:max-content;
//                 font-size:15px;
//             }
//         }
//     }


//     @media only screen and (min-width : ${1024}px) 
//     and (max-width : ${opendesign_style.resolutions.LargeMinWidth}px) {

//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//     and (max-width : ${1024}px) {
//         .title{
//             min-width:165px !important;
//             white-space:nowrap;
//             overflow:hidden;
//             text-overflow:ellipsis;
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         width:100%;
//         display:flex;
//         flex-wrap:wrap;
//         .flexBox{
//             width:100%;
//             height:max-content;
//         }
//         .title{
//             width:100%;
//             text-align:left;
//             max-width:300px !important;
//             white-space:nowrap;
//             overflow:hidden;
//             text-overflow:ellipsis;
//         }

//         .mobileMode{
//             display:flex;
//             flex-direction:column;
//             justify-content:space-between;
//         }
//     }
// `
// const TwoSideBox = styled.div`
//     min-width:165px;
//     max-height:170px;
//     margin-top:50px;
//     margin-left:20px;
//     .countBox{
//     }
//     .explainBox{
//         *{
//             color:#707070;
//         }
//         width: ${props => props.w}px;
//         height: 100%;
//         display: flex;
//         flex-direction: column;
//         justify-content:space-between;
//         .creater {
//             width: max-content;
//             height: 25px;
//             font-size: 17px;
//             font-weight: 500;
//             line-height: 25px;
//             text-align: left;
//             font-family: Noto Sans KR;
//         }
//         .explanationRegion{
//             width: 100%;
//             display: flex;
//             height: 90px;
//             font-size: 17px;
//             color: #707070;
//             line-height: 30px;
//             cursor: default;

//             p {
//                 overflow-y: auto;
//                 overflow-x: hidden;
//                 width: 100%;
//                 word-wrap: break-word;

//                 font-size: 20px;
//                 font-weight: 300;
//                 font-family: Noto Sans KR;
//                 line-height: 30px;
//                 color: #707070;

//                 :hover {
//                     background-color: #EDEDED;
//                 }
//                 ::-webkit-scrollbar {
//                     position: absolute;
//                     width: 3px;
//                 }
//                 ::-webkit-scrollbar-thumb {
//                     background: #707070 !important;
//                 }
//             }
//         } 
//         .count-box{
//             width:200px;
//             display:flex;
//             align-items:center;
//             text-align:left;
//             font-weight:500;
//             .icon-wrapper{
//                 display:flex;
//                 margin-right:20px;
//                 align-items:center;
//             }
//             .label{
//                 color:#707070;
//                 margin-left:5px;
//                 width:max-content;
//                 font-size:15px;
//             }
//         }
//     }

//     @media only screen and (min-width : ${opendesign_style.resolutions.MediumMinWidth}px) 
//     and (max-width : ${1024}px) {
//         margin-bottom:50px;
//         width:230px;
//         .explainBox{
//             width:100%;
//             .explanationRegion{
//                 .explain-text{
//                     width:100%;
//                 }
//             }
//         }

//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         display:none;
//     }

// `
// const ThreeSideBox = styled.div`
//     margin-left: auto;
//     display: flex;
//     flex-direction: column !important;
//     justify-content:space-between;
//     min-height:100%;
//     .sideItemBox {
//         display: flex;
//         justify-content: flex-end;
//         align-items: flex-end;
//         width: 100%;
//         height: 36px;
//     }
//     .sideMenu_label {
//         cursor: pointer;
//         width: 164px;
//         height: 25px;
//         color: #707070;
//         font-family: Noto Sans KR;
//         font-size: 17px;
//         font-weight: 200;
//         text-align: right;
//     }
//     .join_label_{
//         width:100%;
//         text-align:right;
//         height: 40px;
//         margin-left: auto;
//         color: #FF0000;
//         font-size: 20px;
//         cursor: pointer
//     }
//     .ButtonItem {
//         width: max-content;
//         height: 30px;
//         display: flex;
//         margin-top: 10px;
//         cursor: pointer;
//         .button_text_label{
//             width: 150px;
//             height: 20px;
//             margin-top: 10px;
//             font-size: 17px;
//             font-weight: 300;
//             font-family: Noto Sans KR;
//             text-align: right;
//             color: #707070
//         }
//     }
//     .time_label{
//         font-size:17px;
//         font-weight:300;
//         font-family:Noto Sans KR;
//         color:#707070;
//         letter-spacing:0;
//         text-align:right;
//         line-height:27px;
//         margin-top:46px;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         display:none;
//     }
// `

// const MobileSeeMore = styled.div`
//     margin-top:15px;
//     display:${props => props.isShow === false ? "none" : "flex"};
//     flex-direction:column;
//     width:100%;
//     .explain-box{
//         margin-bottom:15px;
//         color:#707070;
//     }
//     .icon-box{
//         margin-top:30px;
//         width:100%;
//         height:60px;
//         display:flex;
//         .icon-wrapper{
//             width:20%;
//             min-width:50px;
//             height:100%;  
//         }
//         .icon-piece{
//             cursor:pointer;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             width:95%;
//             height:95%;
//             border-radius:5px;
//             background-color:#DEDEDE;
//         }
//     }
//     `
// const MiniIcon = styled.div`
//     width: 30px; 
//     height: 30px; 
//     background: url(${props => props.iconName}); 
//     background-size: contain; 
//     background-position: center center; 
//     background-repeat: no-repeat;
//     opacity: ${props => props.like_opacity == null ? 1 : props.like_opacity};

// `
// const InterestDesignerBox = styled.div`
//     display:flex;
//     justify-content:flex-end;
//     align-items:flex-end;
//     width:100%;
//     // height:36px;
//     // margin-top:64px;
// `;
// const InterestDesignerTitle = styled.div`
//     cursor: pointer;
//     display: inline-block;
//     width: max-content;
//     color: #707070;
//     font-family: Noto Sans KR;
//     font-size: 17px;
//     font-weight: 200;
//     text-align: right;
// `;
// const InterestDesignerIcon = styled.div`
//     display: inline-block;
//     opacity: ${props => props.opacity};
//     width: 40px;
//     height: 35px;
//     margin-left: 15px;
//     // margin-bottom: -7px;
//     background-image: url(${props => props.img});
//     background-size: cover;
//     background-position: center center;
// `;
// const SendMessageBox = styled.div`
//     cursor: pointer;
//     display: flex;
//     justify-content: flex-end;
//     align-items: flex-end;
//     height: 45px;
//     margin-top: 33px;
// `;
// const SendMessagTitle = styled.div`
//     display: inline-block;
//     margin-bottom: 7px;
//     width: max-content;
//     color: #707070;
//     font-family: Noto Sans KR;
//     font-size: 17px;
//     font-weight: 200;
//     text-align: right;
// `;

// //const ProfileBox = styled.div`
// //    min-width: 200px;
// //    width: 200px;
// //    height: 200px;
// //    border-radius: 200px;
// //    background: #D6D6D6;
// //    background-repeat: no-repeat;
// //    background-position: 50%;
// //    background-size: cover;
// //    background-image: url(${props => props.img});
// //`;
// //const NameLabel = styled.div`
// //    width: max-content;
// //    min-width: 200px;
// //    height: 29px;
// //    font-size: 20px;
// //    font-weignt: 500;
// //    font-family: Noto Sans KR;
// //    color: #707070;
// //    text-align: center;
// //`;
// const CategoryLabel = styled.div`
//     width:479px;
//     height:29px;
//     font-size:20px;
//     font-weight:200;
//     font-family:Noto Sans KR;
//     color:#FF0000;
//     text-align:left;
// `;
// //const ExplainBox01 = styled.div`
// //    width: 97%;
// //    height: 140px;
// //    font-size: 20px;
// //    font-weight: 200;
// //    font-family: Noto Sans KR;
// //    line-height: 35px;
// //    color: #707070;
// //
// //    white-space: nowrap; 
// //    overflow: hidden; 
// //    text-overflow: ellipsis; 
// //    white-space: normal; 
// //    text-align: left; 
// //    word-wrap: break-word; 
// //    display: -webkit-box; 
// //    -webkit-line-clamp: 4; 
// //    -webkit-box-orient: vertical;
// //`;
// //const CountBox = styled.div`
// //    width: 300px;
// //    display: flex;
// //    .innerWrapper {
// //        background-color: #EFEFEF;
// //        width: 200px;
// //        height: 22px;
// //        display: flex;
// //        justify-content: space-start;
// //        text-align: left;
// //        line-height: 35px;
// //        font-size: 15px;
// //        font-weight: 500;
// //        align-items: center;
// //        cursor: default;
// //    }
// //`;

// const SideItemIcon = styled.div`
//     cursor:pointer;
//     height:36px;
//     width:36px;
//     margin-left:15px;
//     background:${props => `url(${props.imageURL})`};
//     background-repeat:no-repeat;
//     background-size:contain;
//     background-position:center center;
// `;