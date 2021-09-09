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

// css
const Wrapper = styled.div`
    // margin-top: ${100 + 24}px;
    // margin-left: ${100 + 38}px;
    margin-top: 24px;
    margin-left: 38px;
    margin-right: 38px;
    // *{border: 1px solid red;}
`;
const MyInfoBox = styled.div`
    padding: 12px 12px 12px 34px;

    max-width: 1737px;
    min-width: ${1000}px;

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
const Thumbnail = styled.div`
    width: 226px;
    height: 226px;
    min-width: 226px;
    min-height: 226px;
    background-image: url(${props => props.face});
    background-position: center center;
    background-size: cover;
    border-radius: 100%;

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
        width: max-content;
        height: 41px;
        text-align: center;
        font-weight: bold;
        font-size: 28px;
        line-height: 41px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
     }

    .about {
        padding-left: 5px;
        padding-right: 10px;
        margin-top: 14px;
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
`;
const Additional = styled.div`
    width: 203px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .wrapper {
        display: flex;
        flex-direction: column;
    }
    .modify {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        :hover {
            opacity: 0.8;
            background-color: #E4E4E4;
        }
    }
    .logout {
        margin-left: auto;
        width: max-content;
        margin-top: 15px;
    }
    .logout-text {
        cursor: pointer;
        width: max-content;
        color: #FF0000;
        font-size: 1rem;
        height: 1.2rem;
        line-height: 1.2rem;
        font-family: Spoqa Han Sans Neo;
    }
    .modify-text {
        width: max-content;
        height: 33px;
        text-align: center;
        font-weight: medium;
        font-size: 24px;
        line-height: 33px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #4F4F4F;
        opacity: 1;

        margin-top: 6px;
        margin-right: 12px;
    }
    .modify-icon {
        width: 53px;
        height: 53px;
    }
    .date {
        width: 100%;
        text-align: right;
        font-weight: normal;
        font-size: 18px;
        line-height: 26px
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
    }
`;

class MypageHeader extends Component {
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
        console.log("MyDetail:", this.props);

        // const { likeDialog, w } = this.state;
        const { MyDetail } = this.props;

        const MypageInfo = this.props.MyDetail;
        const countInfo = MypageInfo.count || { total_like: 0, total_group: 0, total_design: 0, total_view: 0, };
        const thumbnailInfo = MypageInfo.profileImg ? MypageInfo.profileImg.m_img : noimg;

        return (<Wrapper>
            <MyInfoBox>
                {/* thumbnail */}
                <Thumbnail face={thumbnailInfo} />

                <div className="wrapper">
                    {/* nick, intro, counter */}
                    <Details>
                        <div className="wrapper">
                            <div className="nick">{MyDetail.nick_name}</div>
                            <div className="about">{MyDetail.about_me}</div>
                        </div>

                        <div className="count">
                            <div className="element">
                                <div className="icon"><IconDiv width={38} height={38} icon={iconView} /></div>
                                <div className="num">{NumberFormat(countInfo.total_view)}</div>
                            </div>
                            <div className="element">
                                <div className="icon"><IconDiv width={38} height={38} icon={iconLike} /></div>
                                <div className="num">{NumberFormat(countInfo.total_like)}</div>
                            </div>
                            <div className="element">
                                <div className="icon"><IconDiv width={28} height={28} icon={iconArticle} /></div>
                                <div className="num">{NumberFormat(countInfo.total_design + countInfo.total_group)}</div>
                            </div>
                        </div>
                    </Details>

                    {/* button, update, create */}
                    <Additional>
                        <div className="wrapper">
                            <a className="modify" onClick={this.gotoMyModify}>
                                {/* <div  > */}
                                <div className="modify-text">정보 수정하기</div>
                                <div className="modify-icon"><IconDiv width={53} height={53} icon={iconEdit} /></div>
                                {/* </div> */}
                            </a>
                            <a className="logout" onClick={this.SignOut}>
                                <div className="logout-text">로그아웃</div>
                                {/* <div className="logout-icon"><IconDiv width={53} height={53} icon={?} /></div> */}
                            </a>
                        </div>
                        <div className="date">
                            <div className="update-date">최근&nbsp;업데이트&nbsp;{MyDetail && DateFormat(MyDetail.update_time)}</div>
                            <div className="create-date">등록일자&nbsp;{MyDetail ? new Date(MyDetail.create_time).toLocaleDateString('ko-KR').substring(0, new Date(MyDetail.create_time).toLocaleDateString('ko-KR').length - 1) : "none"}</div>
                        </div>
                    </Additional>
                </div>
            </MyInfoBox>

        </Wrapper>);
    };
}
export default MypageHeader;
