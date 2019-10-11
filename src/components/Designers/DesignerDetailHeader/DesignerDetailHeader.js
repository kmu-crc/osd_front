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
// const BackgroundBox = styled.div`
//     position: relative;
//     over-flow: hidden;
//     width: 1920px;
//     height: 336px;
//     margin-top: 36px;
//     background: #EFEFEF;
// `;
// const ProfileBox = styled.div`
//     position: absolute;
//     width: 200px;
//     height: 200px;
//     top: 90px;
//     left: 70px;
//     border-radius: 200px;
//     background: #D6D6D6;
//     background-repeat: no-repeat;
//     background-position: 50%;
//     background-size: cover;
//     background-image: url(${props => props.img});
// `;
// const Name = styled.div`
//     position: absolute;
//     width: 200px;
//     height: 29px;
//     top: 41px;
//     left: 70px;
//     color: #707070;
//     font-family: Noto Sans KR
//     font-size: 20px;
//     font-weight: 500;
//     text-align: center;
// `;
// const Title = styled.div`
//     position: absolute;
//     width: 479px;
//     height: 29px;
//     top: 41px;
//     left: 418px;
//     color: #FF0000;
//     font-family: Noto Sans KR;
//     font-size: 20px;
//     font-weight: 200;
//     text-align: left;
// `;
// const ExplainBox01 = styled.div`
//     word-wrap: break-word;
//     position: absolute;
//     overflow: hidden;
//     width: 479px;
//     height: 149px;
//     top: 90px;
//     left: 418px;
//     color: #707070;
//     font-size: 20px;
//     font-family: Noto Sans KR;
//     font-weight: 200;
//     text-align: left;
//     line-height: 35px;
// `;
// const ExplainBox02 = styled.div`
//     position: absolute;
//     overflow: hidden;
//     width: 479px;
//     height: 149px;
//     top: 90px;
//     left: 976px;
//     color: #707070;
//     font-size: 20px
//     font-family: Noto Sans KR;
//     font-weight: 200;
//     text-align: left;
//     line-height: 35px;
// `;
// const SummaryIconBox = styled.div`
//     position: absolute;
//     width: 479px;
//     height: 22px;
//     bottom: 50px;
//     left: 418px;
// `;
// const SummaryViewIcon = styled.div`
//     display: inline-block;
//     width: 17px;
//     height: 17px;
// `;
// const SummaryView = styled.div`
//     margin-left: 5px;
//     display: inline-block;
//     width: 54px;
//     height: 21px;
// `;
// const SummaryThumbUpIcon = styled.div`
//     display: inline-block;
//     width: 13px;
//     height: 13px;
//     opacity: 0.55;
//     background: url('${props => props.icon}');//iThumbUp
//     background-size: cover;
//     background-position: center center;
// `;
// const SummaryThumbUp = styled.div`
//     margin-left: 5px;
//     display: inline-block;
//     width: 54px;
//     height: 21px;
// `;
// const SummaryForkedIcon = styled.div`
//     display: inline-block;
//     width: 15px;
//     height: 15px;
//     opacity: 0.55;
//     margin-top: 3px;
//     margin-bottom: -3px;
//     background: url('${props => props.icon}');//iForked
//     background-size: cover;
//     background-position: center center;
// `;
// const SummaryForked = styled.div`
//     margin-left: 5px;
//     display: inline-block;
//     width: 54px;
//     height: 21px;
// `;
const InterestDesignerBox = styled.div`
    // position: absolute;
    // width: 250px;
    // height: 45px;
    // top: 90px;
    // right: 72px;
    // text-align: right;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    width:100%;
    height:36px;
    margin-top:64px;
`;
// const ModifyMyDetailBox = styled.div`
//     position: absolute;
//     width: 250px;
//     height: 45px;
//     top: 26px;
//     right: 72px;
//     text-align: right;
// `;
// const ModifyMyDetailTitle = styled.div`
//     cursor: pointer;
//     display: inline-block;
//     width: max-content;
//     color: #707070;
//     font-family: Noto Sans KR;
//     font-size: 17px;
//     font-weight: 200;
//     text-align: right;
// `;
const InterestDesignerTitle = styled.div`
    cursor: pointer;
    display: inline-block;
    width: 180px;
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
    margin-bottom: -7px;
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center center;
`;
const SendMessageBox = styled.div`
    cursor: pointer;
    // overflow: hidden;
    // position: absolute;
    // width: 250px;
    // height: 45px;
    // top: 168px;
    // right: 45px;
    // textAlign: right;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    width:100%;
    height:36px;
    margin-top:25px;
`;
const SendMessagTitle = styled.div`
cursor: pointer;
display: inline-block;
width: 180px;
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
    margin-bottom: -7px;
    background-image: url(${props => props.icon});
    background-size: cover;
    background-position: center center;
`;
// const UpdateTimeBox = styled.div`
//     position: absolute;
//     width: 146px;
//     height: 25px;
//     top: 273px;
//     right: 72px;
//     color: #707070;
//     font-family: Noto Sans KR;
//     font-size: 17px;
//     font-weight: 200;
//     text-align: right;
// `;
// const ModifyMyDetailImg = styled.div`
//     cursor: pointer;
//     display: inline-block;
//     height: 36px;
//     width: 36px;
//     margin-left: 15px;
//     background: url('${props => props.icon}');
//     background-repeat: no-repeat;
//     background-size: cover;
//     background-position: center center;
// `;
// const LikeDialog = styled.div`
//     z-index: 930;
//     position: absolute;
//     top: 47px;
//     left: 763px;
//     width: 396px;
//     height: 138px;
//     background: #FFFFFF 0% 0% no-repeat padding-box;
//     boxShadow: 0px 3px 6px #000000;
//     borderRadius: 5px;
//     opacity: 1;
//     .dialog-context{
//         margin-top: 31.5px;
//         margin-left: 62.5px;
//         width: 273px;
//         height: 69px;
//         font-family: Noto Sans KR;
//         font-size: 20px;
//         line-height: 40px;
//         text-align: center;
//         font-weight: 500;
//         color: #707070;
//     }
// `;
const ProfileBox = styled.div`
    position: absolute;
    width: 200px;
    height: 200px;
    top: 90px;
    left: 70px;
    border-radius: 200px;
    background: #D6D6D6;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-image: url(${props => props.img});
`;
//CSS
const MypageSummaryBox = styled.div`
    width:1920px;
    height:336px;
    position:relative;
    overflow:hidden;
    margin-top:36px;
    background:#EFEFEF;
    .name_label{
        width:200px;
        height:29px;
        position:absolute;
        top:41px;
        left:70px;
        font-size:20px;
        font-weignt:500;
        font-family:Noto Sans KR;
        color:#707070;
        text-align:center;
    }
    .category_label{
        width:479px;
        height:29px;
        position:absolute;
        top:41px;
        left:418px;
        font-size:20px;
        font-weight:200;
        font-family:Noto Sans KR;
        color:#FF0000;
        text-align:left;
    }
    .explainBox01{
        width:479px;
        height:149px;
        position:absolute;
        top:90px;
        left:418px;
        overflow:hidden;
        font-size:20px;
        font-weight:200;
        font-family:Noto Sans KR;
        color:#707070;
        text-align:left;
        line-height:35px;
        word-wrap:break-word;
    }
    .explainBox02{
        width:479px;
        height:149px;
        position:absolute;
        top:90px;
        left:976px;
        overflow:hidden;
        font-size:20px;
        font-weight:200;
        font-family:Noto Sans KR;
        color:#707070;
        text-align:left;
        line-height:35px;
        word-wrap:break-word;
    }
    .countBox{
        width:300px;
        height:22px;
        position:absolute;
        display:flex;
        left:418px;
        bottom:50px;
    }
    .countItem{
        display:flex;
        width:75px;
        height:100%;
        
        .count_label{
            width:54px;
            height:100%
            margin-left:5px;
        }
    } 
    .sideMenuBox{
        width:250px;
        height:100%;
        position:absolute;
        right:67px;
        padding-top:26px;

        .sideItemBox{
            display:flex;
            justify-content:flex-end;
            align-items:flex-end;
            width:100%;
            height:36px;
        }
        .sideMenu_label{
            cursor:pointer;
            width:164px;
            height:25px;
            color:#707070;
            font-family:Noto Sans KR;
            font-size:17px;
            font-weight:200;
            text-align:right;
        }
        .updateTime_label
        {
            width:200px;
            height:25px;
            position:absolute;
            top:273px;
            right:0px;
            font-size:17px;
            font-weight:200;
            font-family:Noto Sans KR;
            color:#707070;
            text-align:right;
        }

    }
 
`
const SideItemIcon = styled.div`
    cursor:pointer;
    height:36px;
    width:36px;
    margin-left:15px;
    background:${props => `url(${props.imageURL})`};
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center center;
`
//const MiniIcon = styled.div`
//    width:17px;
//    height:17px;
//    background-image: ${props => `url(${props.imageURL})`};
//    background-position:center center;
//    background-size:contain;
//    background-repeat:no-repeat;
//    opacity:${props => props.opacity};
//`
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
`
class DesignerPageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about_me: ["", ""], descriptionLengthCheck: "", joinDialog: false, likeDialog: false, manager: false, tmpLike: false
        };
        this.needLogin = this.needLogin.bind(this);
        this.like = this.like.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.gotoMyModify = this.gotoMyModify.bind(this);
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
    async componentWillReceiveProps(nextProps) {
        if (this.props.DesignerDetail !== nextProps.DesignerDetail) {
            const DesignerDetail = nextProps.DesignerDetail;
            await this.setState({ descriptionLengthCheck: DesignerDetail.about_me.length < 199 + 199 ? "" : " ..." });
            await this.setState({ about_me: [DesignerDetail.about_me.length < 199 ? DesignerDetail.about_me : DesignerDetail.about_me.slice(0, 199), DesignerDetail.about_me.length < 199 ? "" : DesignerDetail.about_me.slice(200, 399) + this.state.descriptionLengthCheck] });
        }
        return true;
    }
    render() {
        const { DesignerDetail, Count, like } = this.props;
        const { about_me, likeDialog } = this.state;
        const thumbnailInfo = DesignerDetail.thumbnail ? DesignerDetail.thumbnailUrl.m_img : noface;
        const isMyProfile = this.props.userInfo && DesignerDetail && this.props.userInfo.uid === DesignerDetail.uid ? true : false;
        console.log("DesignerDetail::", this.props);
        return (
            <React.Fragment>
                {likeDialog ?
                    <LikeDialog><div className="dialog-context">관심 디자이너로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.</div></LikeDialog> : null}
                <MypageSummaryBox>
                    <div className="name_label">{DesignerDetail.nick_name}</div>
                    <ProfileBox img={thumbnailInfo} />
                    <div className="category_label">{DesignerDetail.categoryName}</div>
                    <div className="explainBox01">{about_me[0]}</div>
                    <div className="explainBox02">{about_me[1]}</div>
                    <div className="countBox">
                        <div style={{ backgroundColor: "#EFEFEF", width: "200px", marginTop: "19px", height: "22px", display: "flex", justifyContent: "space-start", textAlign: "left", lineHeight: "40px", fontSize: "15px", fontWeight: "500", alignItems: "center" }}>
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
                    </div>
                    <div className="sideMenuBox" >
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
                        <div className="updateTime_label">최근 업데이트 {DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                        {/* <div style={{ marginLeft: "auto", marginTop: "5px", width: "max-content" }}>{DesignerDetail && DateFormat(DesignerDetail.create_time)} 등록</div> */}
                    </div>
                </MypageSummaryBox>
            </React.Fragment>
        );
    };
}
export default DesignerPageHeader;