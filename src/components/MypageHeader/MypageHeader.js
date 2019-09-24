import React, { Component } from 'react';
import styled from 'styled-components';

//img
import noimg from "source/noimg.png"
import iForked from "source/baseline_library_books_black_48dp.png"
import iThumbUp from "source/thumbup_icon_black.png"
import IconView from "source/IconView"
import DateFormat from 'modules/DateFormat';
import NumberFormat from "modules/NumberFormat";
import iEdit from 'source/edit_1.png';
import { geturl } from "config"


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
const SideItemIcon=styled.div`
    cursor:pointer;
    height:36px;
    width:36px;
    margin-left:15px;
    background:${props => `url(${props.imageURL})`};
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center center;
`
const MiniIcon = styled.div`
    width:17px;
    height:17px;
    background-image: ${props => `url(${props.imageURL})`};
    background-position:center center;
    background-size:contain;
    background-repeat:no-repeat;
    opacity:${props=>props.opacity};

`
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
const UpdateTimeBox = {
    position: "absolute", width: "200px", height: "25px", top: "273px", right: "72px",
    color: "#707070", fontFamily: "Noto Sans KR", fontSize: "17px", fontWeight: "200", textAlign: "right"
}
const defaultCount = {
    total_like: 0,
    total_group: 0,
    total_design: 0,
    total_view: 0,
}
let about_me = ["", ""];
let descriptionLengthCheck = "";

class MypageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { tmpLike: false, likeDialog: false, forkDialog: 0 };
    }
    gotoMyModify = () => {
        window.location.href = geturl() + '/mymodify';
    }
    render() {
        const MypageInfo = this.props.MyDetail;

        const countInfo = MypageInfo.count || defaultCount;
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        if (MypageInfo&&MypageInfo.about_me !=null ) {
            about_me[0] = MypageInfo.about_me.length < 199 ? MypageInfo.about_me : MypageInfo.about_me.slice(0, 199);
            descriptionLengthCheck = MypageInfo.about_me.length < 400 ? "" : " ...";
            about_me[1] = MypageInfo.about_me.length < 199 ? "" : MypageInfo.about_me.slice(200, 399) + descriptionLengthCheck;
        }

        //console.log("updatetime==", DateFormat(MypageInfo.update_time));
        return (
            <React.Fragment>
                    <MypageSummaryBox>
                    <div className="name_label">{MypageInfo.nick_name}</div>
                    <ProfileBox img={thumbnailInfo} />
                    <div className="category_label">{MypageInfo.categoryName}</div>
                    <div className="explainBox01">{about_me[0]}</div>
                    <div className="explainBox02">{about_me[1]}</div>
                    <div className="countBox">
                        <div className="countItem">
                            <MiniIcon><IconView width="17px" height="13px" fill="#707070" /></MiniIcon>                        
                            <div className="count_label">{NumberFormat(countInfo.total_view==null?0:countInfo.total_view)}</div>
                        </div>
                        <div className="countItem">
                            <MiniIcon imageURL={iThumbUp} opacity="0.5"></MiniIcon>
                            <div className="count_label">{NumberFormat(countInfo.total_like==null?0:countInfo.total_like)}</div>
                        </div>
                        <div className="countItem">
                            <MiniIcon imageURL={iForked} opacity="0.5"></MiniIcon>
                            <div className="count_label">{NumberFormat(countInfo.total_group + countInfo.total_design)}</div>
                        </div>
                    </div>
                <div className="sideMenuBox">
                    <div onClick = {this.gotoMyModify}  className="sideItemBox">
                    <div className="sideMenu_label">정보 수정하기</div>
                    <SideItemIcon imageURL={iEdit}/>
                    </div>

                    <div className="updateTime_label">최근 업데이트 {DateFormat(this.props.MyDetail&&this.props.MyDetail.update_time)}</div>
                </div>
                    {this.state.likeDialog === false ? null :
                        <LikeDialog>
                            <div className="message">관심 디자이너로 등록되었습니다.<br />마이페이지에서 확인 가능합니다.
                        </div>
                        </LikeDialog>}
                </MypageSummaryBox>

            </React.Fragment>
        );

    };
}
export default MypageHeader;
