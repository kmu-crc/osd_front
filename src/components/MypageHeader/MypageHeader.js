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
    margin-top: 20px;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background: #D6D6D6;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-image: url(${props => props.img});
`;
//CSS
const NameLabel = styled.div`
    width: 200px;
    height: 29px;
    font-size: 20px;
    font-weignt: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: center;
`;
const CategoryLabel = styled.div`
    width: 479px;
    height: 29px;
    font-size: 20px;
    font-weight: 200;
    font-family: Noto Sans KR;
    color: #FF0000;
    text-align: left;
`;
const ExplainBox01 = styled.div`
    // column-width:300px;
    // column-fill:auto;
    // column-count:2;
    // column-gap:100px;
    // border:1px solid black;
    // display:block;
    // margin-top: 20px;
    // width: 100%;
    // height: 140px;
    // font-size: 20px;
    // font-weight: 200;
    // font-family: Noto Sans KR;
    // color: #707070;
    // text-align: left;
    // line-height: 35px;
    // word-wrap: break-word;
    // overflow: hidden;    
    // text-overflow:ellipsis;
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
    -webkit-line-clamp: 4; 
    -webkit-box-orient: vertical;

    
`;
const CountBox = styled.div`
    width: 300px;
    height: 22px;
    display: flex;
    margin-top: auto;
    .countItem{
        display: flex;
        width: 75px;
        height: 100%;
        .count_label{
            width: 54px;
            height: 100%
            margin-left: 5px;
        }
    } 
`;
const SideMenuBox = styled.div`
    display: flex;
    height: 247px;
    flex-direction: column !important;
    .sideItemBox {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
        height: 36px;
        cursor: pointer;
    }
    .SideMenuLabel {
        width: max-content;
        height: 18px;
        color: #707070;
        font-family: Noto Sans KR;
        font-size: 17px;
        font-weight: 200;
        text-align: right;
        margin-bottom: 7px;
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
const SideItemIcon = styled.div`
    cursor: pointer;
    height: 40px;
    width: 40px;
    margin-left: 15px;
    background:${props => `url(${props.imageURL})`};
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center center;
`
const MiniIcon = styled.div`
    width: 17px;
    height: 17px;
    background-image: ${props => `url(${props.imageURL})`};
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: ${props => props.opacity};
`
const LikeDialog = styled.div`
    width: 396px;
    height: 138px;
    position: absolute;
    top: 47px;
    left: 763px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 5px;
    box-shadow: 0px 3px 6px #000000;
    opacity: 1;
    .message {
        width: 273px;
        height: 69px;
        margin-top: 31px;
        margin-left: 62px;
        font-size: 20px;
        font-weight: 500;
        font-family: Noto Sans KR;
        color: #707070;
        line-height: 40px;
        text-align: center;
    }
`;
const DesignerInfo3 = styled.div`
    position: relative;
    overflow: hidden;
    background-color: #EFEFEF;
    margin-top: 36px;
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
            position: absolute;
            height: 29px;
            color: #707070;
            font-size: 20px;
            font-weight: 500;
            text-align: left;
            line-height: 29px;
            cursor: pointer;
            @media only screen and (min-width: 0px) and (max-width: 1250px) {    
                display: block;
                margin-left: 25px;
            }
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
  .box {
    // border: 1px solid red;
  }
  .box1 { 
    order: 1;
    width: 200px;
    margin-left: 70px;
    margin-top: 41px;
    @media only screen and (min-width: 0px) and (max-width: 500px) {
        margin-left: 25px;
    }
    @media only screen and (min-width: 500px) and (max-width: 1250px) {
        margin-left: 25px;
    }
  }
  .box2 { 
    order: 2;
    width: 1100px;
    margin-top: 41px;
    margin-left: 148px;
    &.secondary {
        margin-top: 90px;
        @media only screen and (min-width: 0px) and (max-width: 1775px) {
            display: none;
        }
    }
    @media only screen and (min-width: 0px) and (max-width: 1250px) {
        order: 4;
        margin-left: 15px;
    }
  }
  .box4 { 
    order: 4;
    width: 153px;
    margin-top: 26px;
    margin-left: auto;
    margin-right: 67px;
    @media only screen and (min-width: 0px) and (max-width: 500px) {
        order: 3;
        margin-left: 15px;
        margin-right: 15px;
    }
    @media only screen and (min-width: 500px) and (max-width: 1250px) {
      order: 3;
      margin-left: 15px;
      margin-right: 10px;
    }
`;

const defaultCount = { total_like: 0, total_group: 0, total_design: 0, total_view: 0, }
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

        if (MypageInfo && MypageInfo.about_me != null) {
            descriptionLengthCheck = MypageInfo.about_me.length < 230 ? "" : " ...";
            about_me[0] = MypageInfo.about_me.length < 230 ? MypageInfo.about_me : MypageInfo.about_me.slice(0, 230) + descriptionLengthCheck;
            // about_me[1] = MypageInfo.about_me.length < 199 ? "" : MypageInfo.about_me.slice(200, 399) + descriptionLengthCheck;
        }

        return (
            <React.Fragment>
                <DesignerInfo3>
                    <div className="grid">
                        <div className="box box1">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                <NameLabel>{MypageInfo.nick_name}</NameLabel>
                                <ProfileBox img={thumbnailInfo} />
                            </div>
                        </div>
                        <div className="box box2">
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                <CategoryLabel>{MypageInfo.categoryName}</CategoryLabel>
                                <ExplainBox01>{MypageInfo.about_me}</ExplainBox01>
                                <CountBox>
                                    <div className="countItem">
                                        <MiniIcon><IconView width="17px" height="13px" fill="#707070" /></MiniIcon>
                                        <div className="count_label">{NumberFormat(countInfo.total_view == null ? 0 : countInfo.total_view)}</div>
                                    </div>
                                    <div className="countItem">
                                        <MiniIcon imageURL={iThumbUp} opacity="0.5"></MiniIcon>
                                        <div className="count_label">{NumberFormat(countInfo.total_like == null ? 0 : countInfo.total_like)}</div>
                                    </div>
                                    <div className="countItem">
                                        <MiniIcon imageURL={iForked} opacity="0.5"></MiniIcon>
                                        <div className="count_label">{NumberFormat(countInfo.total_group + countInfo.total_design)}</div>
                                    </div>
                                </CountBox>
                            </div>
                        </div>
                        {/* <div className="box box2 secondary">
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                <ExplainBox02>{about_me[1]}</ExplainBox02>
                            </div>
                        </div> */}
                        <div className="box box4">
                            <SideMenuBox>
                                <div>
                                    <div onClick={this.gotoMyModify} className="sideItemBox">
                                        <div className="SideMenuLabel">정보 수정하기</div>
                                        <SideItemIcon imageURL={iEdit} />
                                    </div>
                                </div>
                                <div style={{ marginTop: "auto" }}>
                                    <div className="UpdateTimeLabel">최근 업데이트 {DateFormat(this.props.MyDetail && this.props.MyDetail.update_time)}</div>
                                </div>
                            </SideMenuBox>
                        </div>
                    </div>
                </DesignerInfo3>

                {this.state.likeDialog === false ? null :
                    <LikeDialog>
                        <div className="message">관심 디자이너로 등록되었습니다.<br />내 정보에서 확인 가능합니다.
                        </div>
                    </LikeDialog>}
            </React.Fragment>
        );

    };
}
export default MypageHeader;
