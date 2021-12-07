import React, { Component } from 'react';
import styled from 'styled-components';

//img
import iconView from "source/mypage_icon_view.svg";
import iconLike from "source/mypage_icon_like.svg";
import iconArticle from "source/mypage_icon_article.svg";
import iconEdit from "source/mypage_icon_edit.svg";
import noimg from "source/noimg.png";
import DateFormat from 'modules/DateFormat';
import NumberFormat from "modules/NumberFormat";
import { geturl } from "config";
import { SetSession } from 'modules/Sessions';
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
            height:134px;
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
                border:1px solid black;
                width:100%;
                height:120px;
                overflow-Y: scroll;
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
            height:22px;
            display:flex;
            justify-content:space-between;
            .box{display:flex;}
            .modi{font-family:Spoqa Han Sans Neo;font-size:15px;color:#4F4F4F;margin-right:5px;}
            .iconwrap{height:22px;display:flex;font-size:18px;margin-right:12px;}
        }

    }
`

class MypageHeader_mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
            tmpLike: false,
            likeDialog: false,
            forkDialog: 0,
            isSeeMore: false,
        };
    }
    gotoMyModify = () => {
        window.location.href = geturl() + '/mymodify';
    }
    SignOut = () => {
        SetSession("opendesign_token", null)
            .then(data => {
                this.props.SignOutRequest();
                window.location.href = "/";
            });
    }
    render() {
        const { MyDetail } = this.props;

        const MypageInfo = this.props.MyDetail;
        const countInfo = MypageInfo.count || { total_like: 0, total_group: 0, total_design: 0, total_view: 0, };
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        return (
        <Wrapper>
            <NameWrapper>
                <div className="name">{MyDetail.nick_name}</div>
                <div className="date">
                    <div className="text">최근&nbsp;업데이트&nbsp;{MyDetail && DateFormat(MyDetail.update_time)}</div>
                    <div className="text">등록일자&nbsp;{MyDetail ? new Date(MyDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(MyDetail.create_time).toLocaleDateString('ko-KR').length - 1) : "none"}</div>
                </div>
            </NameWrapper>
            <InfoWrapper url={thumbnailInfo}>
                <div className="infoBox">
                    <div className="top">
                        <div className="thumbnail"/>
                        <div className="info">{MyDetail.about_me}</div>
                    </div>
                    <div className="bottom">
                        <div className="box">
                            <div className="iconwrap">
                                <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>visibility</Icon>
                                {NumberFormat(countInfo.total_view)}
                            </div>
                            <div className="iconwrap">
                                <Icon style={{ fontSize: "18px", color:"red",marginRight:"5px" }}>favorite_border</Icon>
                                {NumberFormat(countInfo.total_like)}
                            </div>
                            <div className="iconwrap">
                                <Icon style={{ fontSize: "18px", color:"black",marginRight:"5px" }}>article</Icon>
                                {NumberFormat(countInfo.total_design + countInfo.total_group)}
                            </div>
                        </div>
                        <div className="box" onClick={this.gotoMyModify}>
                            <div className="modi">정보 수정하기</div>
                            <Icon style={{ fontSize: "18px", color:"black"}}>create</Icon>
                        </div>
                    </div>
                </div>
            </InfoWrapper>
        </Wrapper>
        );
    };
}
export default MypageHeader_mobile;


// <Wrapper>
// <MyInfoBox>
//     <Thumbnail face={thumbnailInfo} />
//     <div className="wrapper">
//         <Details>
//             <div className="wrapper">
//                 <div className="nick">{MyDetail.nick_name}</div>
//                 <div className="cate">{MyDetail.categoryName}</div>
//                 <div className="about">{MyDetail.about_me}</div>
//             </div>

//             <div className="count">
//                 <div className="element">
//                     <div className="icon"><IconDiv width={38} height={38} icon={iconView} /></div>
//                     <div className="num">{NumberFormat(countInfo.total_view)}</div>
//                 </div>
//                 <div className="element">
//                     <div className="icon"><IconDiv width={38} height={38} icon={iconLike} /></div>
//                     <div className="num">{NumberFormat(countInfo.total_like)}</div>
//                 </div>
//                 <div className="element">
//                     <div className="icon"><IconDiv width={28} height={28} icon={iconArticle} /></div>
//                     <div className="num">{NumberFormat(countInfo.total_design + countInfo.total_group)}</div>
//                 </div>
//             </div>
//         </Details>
//         <Additional>
//             <div className="wrapper">
//                 <a className="modify" onClick={this.gotoMyModify}>
//                     <div className="modify-text">정보 수정하기</div>
//                     <div className="modify-icon"><IconDiv width={53} height={53} icon={iconEdit} /></div>
//                 </a>
//             </div>
//             <div className="date">
//                 <div className="update-date">최근&nbsp;업데이트&nbsp;{MyDetail && DateFormat(MyDetail.update_time)}</div>
//                 <div className="create-date">등록일자&nbsp;{MyDetail ? new Date(MyDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(MyDetail.create_time).toLocaleDateString('ko-KR').length - 1) : "none"}</div>
//             </div>
//         </Additional>
//     </div>
// </MyInfoBox>
// </Wrapper>