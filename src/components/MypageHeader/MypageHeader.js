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

//CSS
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
    width: 97%;
    height: 140px;
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
        // margin-top: 19px;
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
class MypageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: window.innerWidth > 1920 ? 1920 : window.innerWidth,
            tmpLike: false,
            likeDialog: false,
            forkDialog: 0
        };
    }
    gotoMyModify = () => {
        window.location.href = geturl() + '/mymodify';
    }
    render() {
        console.log("MyDetail:", this.props);

        const { likeDialog, w } = this.state;
        const { MyDetail } = this.props;

        const MypageInfo = this.props.MyDetail;
        const countInfo = MypageInfo.count || { total_like: 0, total_group: 0, total_design: 0, total_view: 0, };
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        return (
            <React.Fragment>

                {likeDialog ?
                    <LikeDialog>
                        <div className="message">
                            관심 디자이너로 등록되었습니다.<br />
                            내 정보에서 확인 가능합니다.
                        </div>
                    </LikeDialog>
                    : null}

                <Header width={w}>
                    {MyDetail ?
                        <div style={{ width: `${w}px`, height: "250px", backgroundColor: "#EFEFEF", display: "flex", flexDirection: "row" }}>
                            {/* left */}
                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <div style={{ marginLeft: "15px", marginTop: "15px", display: "flex", flexDirection: "column" }}>
                                    <NameLabel>{MyDetail.nick_name}</NameLabel>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <ProfileBox img={thumbnailInfo} />
                                        <LeftSide >
                                            {MyDetail.categoryName ?
                                                <CategoryLabel>{MyDetail.categoryName}</CategoryLabel> : null}

                                            <ExplainBox01>{MyDetail.about_me}</ExplainBox01>

                                            <CountBox>
                                                <div className="innerWrapper" style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(countInfo.total_view || 0)}</div>
                                                    </div>
                                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                                        <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(countInfo.total_like || 0)}</div>
                                                    </div>
                                                    <div style={{ display: "flex" }}>
                                                        <div style={{ marginTop: "5px" }}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} /></div>
                                                        <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px', marginTop: "4px" }}>{NumberFormat(countInfo.total_design || 0 + countInfo.total_group || 0)}</div>
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
                                        <div onClick={this.gotoMyModify} className="sideItemBox">
                                            <div className="sideMenu_label">정보 수정하기</div>
                                            <SideItemIcon imageURL={iEdit} />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "auto" }}>
                                        <div className="UpdateTimeLabel">최근 업데이트 {MyDetail && DateFormat(MyDetail.update_time)}</div>
                                        <div className="UpdateTimeLabel">등록 일자 {MyDetail&&new Date(MyDetail.create_time).toLocaleDateString('ko-KR').substring(0,new Date(MyDetail.create_time).toLocaleDateString('ko-KR').length-1)}</div>
                                    </div>
                                </ButtonRegion>
                            </div>
                        </div>
                        : // case of no DesignerDetail
                        <div></div>}
                </Header>


            </React.Fragment>
        );

    };
}
export default MypageHeader;

// {/* <Header width={w}>
//     {MyDetail ?
//         <div style={{ width: `${w}px`, height: "250px", backgroundColor: "#EFEFEF", display: "flex", flexDirection: "row" }}>
//             {/* left */}
//             <div style={{ display: "flex", flexDirection: "row" }}>
//                 <div style={{ marginLeft: "15px", marginTop: "15px", display: "flex", flexDirection: "column" }}>
//                     <NameLabel>{MyDetail.nick_name}</NameLabel>
//                     <div style={{ display: "flex", flexDirection: "row" }}>
//                         <ProfileBox img={thumbnailInfo} />
//                         <LeftSide >
//                             {MyDetail.categoryName ?
//                                 <CategoryLabel>{MyDetail.categoryName}</CategoryLabel>
//                                 : null}
//                             <ExplainBox01>{MyDetail.about_me}</ExplainBox01>
//                             <CountBox>
//                                 <div className="innerWrapper" style={{ display: "flex", flexDirection: "row" }}>
//                                     <div style={{ display: "flex", marginRight: "20px" }}>
//                                         <div><IconView width="22px" height="11px" fill="#000000" opacity="0.55" /></div>
//                                         <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(countInfo.total_view || 0)}</div>
//                                     </div>
//                                     <div style={{ display: "flex", marginRight: "20px" }}>
//                                         <div><img alt="icon" src={iThumbUp} style={{ width: "15px", height: "15px", opacity: "0.55" }} /></div>
//                                         <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px' }}>{NumberFormat(countInfo.total_like || 0)}</div>
//                                     </div>
//                                     <div style={{ display: "flex" }}>
//                                         <div style={{ marginTop: "5px" }}><img alt="icon" src={iForked} style={{ width: "19px", height: "19px", opacity: "0.55", marginTop: "10px" }} /></div>
//                                         <div style={{ color: "#707070", marginLeft: "5px", width: "max-content", fontSize: '15px', marginTop: "4px" }}>{NumberFormat(countInfo.total_design || 0 + countInfo.total_group || 0)}</div>
//                                     </div>
//                                 </div>
//                             </CountBox>
//                         </LeftSide>
//                     </div>
//                 </div>
//             </div>
//             {/* right */}
//             <div style={{ marginLeft: "auto", marginRight: "15px" }}>
//                 <SideMenuBox>
//                     <div>
//                         <div onClick={this.gotoMyModify} className="sideItemBox">
//                             <div className="SideMenuLabel">정보 수정하기</div>
//                             <SideItemIcon imageURL={iEdit} />
//                         </div>
//                     </div>
//                     <div style={{ marginTop: "auto" }}>
//                         <div className="UpdateTimeLabel">최근 업데이트 {DateFormat(this.props.MyDetail && this.props.MyDetail.update_time)}</div>
//                     </div>
//                 </SideMenuBox>
//             </div>
//         </div>
//         :
//         <div></div>}
// </Header> */}
