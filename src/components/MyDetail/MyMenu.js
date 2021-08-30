import React from 'react';
import styled from 'styled-components';
import new_logo_mail from "source/new_logo_mail.svg";
import new_logo_mail_red from "source/new_logo_mail_red.svg";
import new_logo_notifications from "source/new_logo_notifications.svg";
import { SignOutRequest, } from "redux/modules/auth";
import { SetSession } from "modules/Sessions";

const AlarmIcon = styled.div`
    width: 44px;
    height: 44px;
    opacity: 1;
    background: url(${new_logo_notifications}); 
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
`;
const Alarm = ({ count }) => {
    return (<React.Fragment>
        {count ? <React.Fragment></React.Fragment> : null}
        <AlarmIcon />
    </React.Fragment>);
};

const Wrapper = styled.div`
    width: 174px;
    
    .menu {
        padding: 19px 0px 20px 0px;
        display: flex;
        justify-content: center;
        a {
            width: max-content;
            height: 32px;
            text-align: center;
            font-weight: medium;
            font-size: 24px;
            line-height: 32px;
            font-family: Noto Sans KR;
            letter-spacing: 0px;
            color: #4F4F4F;
            opacity: 1;
            cursor: pointer;
            &.active {
                color: #FF0000;
            }
            :hover {
                background: #FAFAFA;
                color: #FF0000;
            }
        }
    }
    .border {
        border-bottom: 2px solid #4F4F4F;
    }
    .welcome {
        width: 160px;
        height: 64px;
        text-align: center;
        font-weight: medium;
        font-size: 24px;
        line-height: 32px;
        font-family: Noto Sans KR;
        letter-spacing: 0px;
        color: #4F4F4F;
        opacity: 1;
        cursor: default;
        
        margin-bottom: 20px;
    }
    .icon_wrap{
        width: 44px;
        height: 44px;
        position: relative;
    }
    .create-design {
        width: 174px;
        height: 41px;
        background: #FF0000 0% 0% no-repeat padding-box;
        box-shadow: 8px 8px 8px #0000002B;
        opacity: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .text {
            margin: auto;
            width: 134px;
            height: 28px;
            text-align: center;
            font-weight: medium;
            font-size: 20px;
            line-height: 28px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #FFFFFF;
            opacity: 1;
        }
    }
`;


const MsgIcon = styled.div`
    width:44px;
    height:44px;
    background: url(${prop => prop.red ? new_logo_mail_red : new_logo_mail}); 
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;

`;
const Message = ({ count }) => {
    return (<React.Fragment>
        {count ? <React.Fragment></React.Fragment> : null}
        <MsgIcon red={window.location.href.search('/message') > -1 ? true : false} />
    </React.Fragment>);
};

export class MyMenu extends React.Component {
    gotoMessagePage = () => {
        window.location.href = "/message";
    };
    logout = () => {
        SetSession("opendesign_token", null)
            .then(data => {
                SignOutRequest();
                window.location.href = "/";
            })
    };
    modifyMyInfo = () => {
        window.location.href = "/mymodify";
    };
    modifyMyDesign = () => {
        this.props.changeTab("manage");
    };
    openAlarmPopup = () => {
        alert('open alarm popup');
    };
    gotoCreateDesign = () => {
        window.location.href = "/createDesign";
    };


    render() {
        const { nickName, Count, tab, } = this.props;

        return (<Wrapper>
            {/* welcome */}
            <div className="welcome" title={nickName}>
                {nickName.slice(0, 6)}&nbsp;님
                <br />
                반갑습니다!
            </div>

            {/* CREATE DESIGN */}
            <div className="create-design">
                <a onClick={this.gotoCreateDesign}>
                    <div className="text">
                        디자인 등록하기
                    </div>
                </a>
            </div>

            {/* alarm icon */}
            <div className="menu border">
                {/* <div className="icon_wrap marginRight1"> */}
                <a onClick={this.openAlarmPopup}>
                    <Alarm count={Count && Count.count} />
                </a>
                {/* </div> */}
            </div>
            {/* msg icon */}
            <div className="menu border">
                <a onClick={this.gotoMessagePage}>
                    <Message count={Count && Count.countMsg} />
                </a>
            </div>
            {/* manage my design */}
            <div className={`menu border`}>
                <a className={`${tab === "manage" ? "active" : ""}`} onClick={this.modifyMyDesign}>내 디자인 관리</a>
            </div>
            {/* modify myinfo */}
            <div className="menu border default">
                <a className={`${window.location.href.search('mymodify') > -1 ? "active" : ""}`} onClick={this.modifyMyInfo}>회원정보 수정</a>
            </div>
            {/* logout */}
            <div className="menu ">
                <a onClick={this.logout}>로그아웃</a>
            </div>
        </Wrapper>);
    };
};
