import React, { Component } from 'react';
import styled from 'styled-components';

import noface from "source/thumbnail.png";
import iconView from "source/mypage_icon_view.svg";
import iconLike from "source/mypage_icon_like.svg";
import iconArticle from "source/mypage_icon_article.svg";
import iMessage from "source/email.png";
import iThumbUp from "source/thumbup_icon_black.png";
import NumberFormat from "modules/NumberFormat";
import DateFormat from 'modules/DateFormat';
import { alert } from "components/Commons/Alert/Alert";
import iconEdit from "source/mypage_icon_edit.svg";
import Icon from '@material-ui/core/Icon';

const Wrapper = styled.div`
    width:100%;
    margin-top:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const NameWrapper = styled.div`
    width:360px;
    height:38px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-left:44px;
    padding-right:10px;
    margin-bottom:5px;
    .name{
        width:200px;
        height:38px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;

        font-family:Spoqa Han Sans;
        font-weight:700;
        font-size:26px;

        display:flex;
        align-items:center;
    }
    .date{
        width:120px;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        .text{
            font-family:Spoqa Han Sans;
            font-weight:400;
            font-size:12px;
            color:#777777;
            text-align:right;
        }
    }
`

const InfoWrapper = styled.div`
    width:100%;
    height:177px;
    background-color:#E0E0E0;
    display:flex;
    justify-content:center;
    .infoBox{
        width:360px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        padding:12px 7px 12px 7px;
        .top{
            display:flex;
            height:110px;
            .thumbnail{
                width:85px;
                height:85px;
                min-width:85px;
                min-height:85px;

                border-radius:50%;
                background-color:white;
                background-image:url(${props=>props.url});
                background-size:cover;
                background-position:center;
                box-shadow: 8px 8px 6px #00000029;
                margin-right:10px;
            }
            .info{
                width:100%;
                height:100px;
                overflow-Y: auto;
                // text-overflow: ellipsis;
                // white-space: normal;
                // display: -webkit-box;
                // -webkit-line-clamp: 5; /* 라인수 */	
                // -webkit-box-orient: vertical; 
                // word-wrap:break-word;

                font: normal normal normal 18px/24px Spoqa Han Sans;
                color:#777777;
            }
        }
        .bottom{
            width:100%;
            height:30px;
            display:flex;
            justify-content:space-between;
            align-items:flex-end;
            .flexEnd{display:flex;flex-direction:column;align-items:flex-end;}
            .box{display:flex;}
            .modi{font-family:Spoqa Han Sans Neo;font-size:15px;color:#4F4F4F;margin-right:5px;}
            .iconwrap{height:22px;display:flex;font-size:18px;margin-right:12px;}
        }

    }
`


class DesignerDetailHeader_mobile extends Component {
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
        window.location.href = '/mymodify';
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
        if (!this.props.userInfo) {
            this.needLogin();
            return;
        }
        let href = window.location.href.substring(0, window.location.href.search("designerDetail"))
        window.location.href = href + 'message/' + this.props.DesignerDetail.uid + '/' + this.props.DesignerDetail.nick_name;
    }
    render() {
        const { DesignerDetail, Count, like } = this.props;
        const { likeDialog, w } = this.state;
        const thumbnailInfo = DesignerDetail.thumbnail ? DesignerDetail.thumbnailUrl.m_img : noface;
        const isMyProfile = this.props.userInfo && DesignerDetail && this.props.userInfo.uid === DesignerDetail.uid ? true : false;
        const MypageInfo = this.props.DesignerDetail;

        return (
            <React.Fragment>
            <Wrapper>
                <NameWrapper>
                    <div className="name">{DesignerDetail.nick_name}</div>
                    <div className="date">
                        <div className="text">
                            최근&nbsp;업데이트&nbsp;{DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
                        <div className="text">
                            등록일자&nbsp;{MypageInfo? new Date(MypageInfo.create_time).toLocaleDateString('ko-KR').substring(0, new Date(MypageInfo.create_time).toLocaleDateString('ko-KR').length - 1): "none"}</div>
                        </div>
                </NameWrapper>
                <InfoWrapper url={thumbnailInfo}>
                    <div className="infoBox">
                        <div className="top">
                            <div className="thumbnail"/>
                            <div className="info">{DesignerDetail.about_me}</div>
                        </div>
                        <div className="bottom">
                            <div className="box">
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>visibility</Icon>
                                    {NumberFormat(Count.total_view)}
                                </div>
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"red",marginRight:"5px" }}>favorite_border</Icon>
                                    {NumberFormat(Count.total_like)}
                                </div>
                                <div className="iconwrap">
                                    <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>article</Icon>
                                    {NumberFormat(Count.total_design + Count.total_group)}
                                </div>
                            </div>
                            {isMyProfile?
                            <div className="box" onClick={this.gotoMyModify}>
                                <div className="modi">내 정보 수정하기</div>
                                <Icon style={{ fontSize: "18px", color:"black"}}>create</Icon>
                            </div>
                            :
                            <div className="flexEnd">
                                <div className="box"
                                onClick={this.props.userInfo == null
                                        ? async () => await alert("로그인 해주세요", "확인")
                                        : () => this.like()}
                                >
                                <div className="modi">관심 디자이너</div>
                                {
                                    like?
                                    <Icon style={{ fontSize: "18px", color:"red"}}>favorite</Icon>
                                    :
                                    <Icon style={{ fontSize: "18px", color:"black"}}>favorite</Icon>
                                }
                                </div>
                                <div className="box" onClick={this.sendMessage}>
                                <div className="modi">메시지</div>
                                <Icon style={{ fontSize: "18px", color:"black"}}>email</Icon>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </InfoWrapper>
            </Wrapper>
            </React.Fragment>
        );
    };
}
export default DesignerDetailHeader_mobile;


        
// <Wrapper>

// {likeDialog ?
//     <LikeDialog>
//         <div className="message">
//             관심 디자이너로 등록되었습니다.<br />
//             내 정보에서 확인 가능합니다.
//         </div>
//     </LikeDialog>
//     : null}

// <DesignerInfoBox>
//     <Thumbnail face={thumbnailInfo} />

//     <div className="wrapper">
//         <Details>
//             <div className="wrapper">
//                 <div className="nick">{DesignerDetail.nick_name}</div>
//                 {DesignerDetail.categoryName ? <div className="cate">{DesignerDetail.categoryName}</div> : null}
//                 <div className="about ellipsis">{DesignerDetail.about_me}</div>
//             </div>
//             <div className="count">
//                 <div className="element">
//                     <div className="icon"><IconDiv width={38} height={38} icon={iconView} /></div>
//                     <div className="num">{NumberFormat(Count.total_view)}</div>
//                 </div>
//                 <div className="element">
//                     <div className="icon"><IconDiv width={38} height={38} icon={iconLike} /></div>
//                     <div className="num">{NumberFormat(Count.total_like)}</div>
//                 </div>
//                 <div className="element">
//                     <div className="icon"><IconDiv width={28} height={28} icon={iconArticle} /></div>
//                     <div className="num">{NumberFormat(Count.total_design + Count.total_group)}</div>
//                 </div>
//             </div>
//         </Details>

//         {isMyProfile
//             ? <MyAdditional>
//                 <div className="wrapper">
//                     <a className="modify" onClick={this.gotoMyModify}>
//                         <div className="modify-text">정보 수정하기</div>
//                         <div className="modify-icon"><IconDiv width={53} height={53} icon={iconEdit} /></div>
//                     </a>
//                 </div>
//                 <div className="date">
//                     <div className="update-date">최근&nbsp;업데이트&nbsp;{MypageInfo && DateFormat(MypageInfo.update_time)}</div>
//                     <div className="create-date">등록일자&nbsp;
//                         {MypageInfo
//                             ? new Date(MypageInfo.create_time).toLocaleDateString('ko-KR').substring(0, new Date(MypageInfo.create_time).toLocaleDateString('ko-KR').length - 1)
//                             : "none"}
//                     </div>
//                 </div>
//             </MyAdditional>
//             : <Additional>
//                 <div classname="wrapper">
//                     <div className="modify"
//                         onClick={this.props.userInfo == null
//                             ? async () => await alert("로그인 해주세요", "확인")
//                             : () => this.like()}>
//                         <div className="modify-text">관심디자이너 {like ? "취소하기" : "등록하기"}</div>
//                         <div className="modify-icon">
//                             <IconDiv width={22} height={20} className={`${like ? "active" : "inactive"}`} icon={iThumbUp} />
//                         </div>
//                     </div>
//                     <div className="modify" onClick={this.sendMessage}>
//                         <div className="modify-text">메시지 보내기</div>
//                         <div className="modify-icon">
//                             <IconDiv width={20} height={16} icon={iMessage} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="date">
//                     <div className="update-date">최근&nbsp;업데이트&nbsp;{DesignerDetail && DateFormat(DesignerDetail.update_time)}</div>
//                     <div className="create-date">등록일자&nbsp;
//                         {DesignerDetail
//                             ? new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(DesignerDetail.create_time).toLocaleDateString('ko-KR').length - 1)
//                             : "none"}
//                     </div>
//                 </div>
//             </Additional>
//         }
//     </div>

// </DesignerInfoBox>

// </Wrapper>


// CSS
// const LikeDialog = styled.div`
//     width: max-content;
//     // height: 138px;
//     position: absolute;
//     top: 25%;
//     left: 50%;
//     background: #FFFFFF 0% 0% no-repeat padding-box;
//     border-radius: 5px;
//     box-shadow: 0px 3px 6px #000000;
//     opacity: 1;
//     z-index: 2000;

//     padding: 35px 50px;
//     text-align: center;
//     font-weight: medium;
//     font-size: 24px;
//     line-height: 30px;
//     font-family: Spoqa Han Sans Neo;
//     letter-spacing: 0px;
//     color: #000000;
//     opacity: 1;
// `;
// const Wrapper = styled.div`
//     margin-top: 24px;
//     margin-left: 38px;
//     // margin-right: 38px;

//     // margin-top: ${100 + 24}px;
//     // margin-left: ${100 + 38}px;
//     // *{border: 1px solid red;}
// `;
// const Thumbnail = styled.div`
//     width: 226px;
//     height: 226px;
//     min-width: 226px;
//     min-height: 226px;
//     background-color: #FFF;
//     background-image: url(${props => props.face});
//     background-position: 50% 50%;
//     background-size: cover;
//     border-radius: 100%;

//     // box-shadow: rgba(38, 57, 77, 0.25) 0px 10px 15px -5px;
// `;
// const DesignerInfoBox = styled.div`
//     padding: 12px 12px 12px 34px;

//     max-width: 1737px;
//     min-width: 1000px;
//     width:100%;

//     display: flex;
//     flex-direction: row;

//     .wrapper {
//         width: 100%;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//     }
//     background-color: #E0E0E0;
//     box-shadow: rgba(38, 57, 77, 0.25) 0px 10px 15px -5px;
// `;
// const Details = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;

//     .wrapper {
//         display: flex;
//         flex-direction: column;
//     }

//     .nick {
//         width: max-content;
//         height: 41px;
//         text-align: center;
//         font-weight: bold;
//         font-size: 28px;
//         line-height: 41px;
//         font-family: Spoqa Han Sans;
//         letter-spacing: 0px;
//         color: #000000;
//         opacity: 1;
//     }
//      .cate {
//         margin-top: 5px;
//         width: max-content;
//         height: 28px;
//         text-align: left;
//         font-weight: normal;
//         font-size: 19px;
//         line-height: 28px;
//         font-family: Spoqa Han Sans;
//         letter-spacing: 0px;
//         color: #FF0000;
//         opacity: 1;
//     }
//     .about {
//         padding-left: 5px;
//         padding-right: 10px;
//         margin-top: 14px;
//         text-align: left;
//         font-weight: normal;
//         font-size: 18px;
//         line-height: 27px;
//         font-family: Spoqa Han Sans;
//         letter-spacing: 0px;
//         color: #777777;
//         opacity: 1;
//     }
//     .ellipsis {
//         display: -webkit-box;
//         min-width: 300px;
//         -webkit-line-clamp: 6;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//     }
//     .count { 
//         display: flex;
//         flex-direction: row;

//         .element {
//             display: flex;
//             flex-direction: row;
//             .icon {
//                 width: 42px;
//                 height: 42px;
//                 display: flex;
//                 align-items: center;

//                 margin-right: 7px;
//             }
//             .num {
//                 width: max-content;
//                 height: 38px;
//                 text-align: left;
//                 font-weight: normal;
//                 font-size: 26px;
//                 line-height: 38px;
//                 font-family: Spoqa Han Sans;
//                 letter-spacing: 0px;
//                 color: #000000;
//                 opacity: 1;

//             }
//             margin-right: 20px;
//             :last-child { margin-right: 0px;}
//         }
//     }
// `;
// const IconDiv = styled.div`
//     width: ${props => props.width}px;
//     height: ${props => props.height}px;
//     background-image: url(${props => props.icon});
//     background-position: center center;
//     background-size: cover;
//     .active { opacity: 1; }
//     .inactive { opacity: 0.5; }
// `;
// const Additional = styled.div`
//     width: max-content;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     .modify {
//         margin-bottom: 18px;
//         :last-child { margin-bottom: 0px; }
//         display: flex;
//         flex-direction: row;
//         justify-content: flex-end;
//         cursor: pointer;
//     }
//     .modify-text {
//         width: max-content;
//         height: 22px;
//         text-align: right;
//         font-weight: normal;
//         font-size: 15px;
//         line-height: 22px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         color: #707070;
//         opacity: 1;

//         margin-top: 3px;
//         margin-right: 6px;
//     }
//     .modify-icon {
//         width: 22px;
//         height: 22px;
    
//         margin-top: 3px;
//     }
//     .date {
        
//         width: 100%;
//         text-align: right;
//         font-weight: normal;
//         font-size: 18px;
//         line-height: 26px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         color: #777777;
//         opacity: 1;
//         .update-date{
//             min-width:max-content;
//         }
//         .create-date{
//             min-width:max-content;
//         }
//     }
// `;
// const MyAdditional = styled.div`
//     width: 203px;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     .wrapper {
//         display: flex;
//         flex-direction: column;
//     }
//     .modify {
//         display: flex;
//         flex-direction: row;
//         cursor: pointer;
//         :hover {
//             opacity: 0.8;
//             background-color: #E4E4E4;
//         }
//     }
//     .logout {
//         margin-left: auto;
//         width: max-content;
//         margin-top: 15px;
//     }
//     .logout-text {
//         cursor: pointer;
//         width: max-content;
//         color: #FF0000;
//         font-size: 1rem;
//         height: 1.2rem;
//         line-height: 1.2rem;
//         font-family: Spoqa Han Sans Neo;
//     }
//     .modify-text {
//         width: max-content;
//         height: 33px;
//         text-align: center;
//         font-weight: medium;
//         font-size: 24px;
//         line-height: 33px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         color: #4F4F4F;
//         opacity: 1;
//         // cursor: pointer;

//         margin-top: 6px;
//         margin-right: 12px;
//     }
//     .modify-icon {
//         width: 53px;
//         height: 53px;
//     }
//     .date {
//         margin-left: auto;
//         width: 100%;
//         text-align: right;
//         font-weight: normal;
//         font-size: 18px;
//         line-height: 26px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         color: #777777;
//         opacity: 1;
//     }
// `;
