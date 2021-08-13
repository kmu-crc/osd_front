import React from 'react';
import styled from 'styled-components';
import new_logo_mail from "source/new_logo_mail.svg";
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
    width: 168px;
    
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
        }
        :hover {
            background: #FAFAFA;
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
`;


const MsgIcon = styled.div`
    width:44px;
    height:44px;
    background: url(${new_logo_mail}); 
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;
`;
const Message = ({ count }) => {
    return (<React.Fragment>
        {count ? <React.Fragment></React.Fragment> : null}
        <MsgIcon />
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
        alert('modify my design');
    };
    openAlarmPopup = () => {
        alert('open alarm popup');
    };

    render() {
        const { nickName, Count, } = this.props;

        return (<Wrapper>
            {/* welcome */}
            <div className="welcome" title={nickName}>
                {nickName.slice(0, 6)}&nbsp;님
                <br />
                반갑습니다!
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
            {/* logout */}
            <div className="menu border">
                <a onClick={this.logout}>로그아웃</a>
            </div>
            {/* manage my design */}
            <div className="menu border">
                <a onClick={this.modifyMyDesign}>내 디자인 관리</a>
            </div>
            {/* modify myinfo */}
            <div className="menu default">
                <a onClick={this.modifyMyInfo}>회원정보 수정</a>
            </div>

        </Wrapper>);
    };
};
