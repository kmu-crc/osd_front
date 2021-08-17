import React from 'react';
import { Modal } from "semantic-ui-react";
import styled from 'styled-components';
import noface from "source/thumbnail.png";
import Icon from '@material-ui/core/Icon';

const Wrapper = styled.div`
    width: 340px;
 
    .icon {
        margin-left: 15px;
        cursor: pointer;
    }   
    .title {
        margin-bottom: 26px;

        display: flex;
        flex-direction: row;
        align-items: center;

        .text {
            width: 136px;
            height: 40px;
            text-align: center;
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
        }
        .icons {
            margin-left: 15px;
        }
    }
    .thumbnail {
        margin-left: 22px;
        margin-bottom: 38px;

        width: 290px;
        height: 290px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-image: url(${prop => prop.face});
    }
    .nick {
        display: flex;
        flex-direction: row;
        align-items: center;

        .label {
            margin-left: 16px;
            width: 84px;
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
        input {
            width: 161px;
            height: 41px;
            border: 1px solid #707070;
            opacity: 1;
            padding: 5px 10px;
            color: #707070;
        }
    } 
    .like-menu {
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
        align-items: cetner;
        cursor: default;
        
        .like-design {
            margin-top: 45px;
            margin-bottom: 22px;
            :hover { background: #FAFAFA;}
        }
        .like-group {
            margin-top: 22px;
            margin-bottom: 15px;
            :hover { background: #FAFAFA;}
        }
        .like-designer {
            margin-top: 22px;
            margin-bottom: 15px;
            :hover { background: #FAFAFA;}
        }
        a{
            cursor: pointer;
        } 
        .border {
            border-bottom: 2px solid #707070;
        }
        .active {
            color: red;
        }
    }
`;
const DeactiveModal = styled(Modal)`
    width: 524px !important;
    height: 234px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 8px 8px 8px #0000002B;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .warning {
        margin: auto;
        margin-top: 22px;

        width: 57px;
        height: 49px;

        color: red;
        font-size: 49px;
    }
    .message {
        margin: auto;
        margin-top: 13px;

        width: 304px;
        height: 40px;

        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;

        cursor: default;
    }
    .buttons {
        margin: auto;
        width: max-content;
        margin-top: 29px;
        a {
            cursor: pointer;
            text-align: center;
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            opacity: 1;
            :last-child {
                margin-left: 67px;
            }
            &.red {
                color: red;
            }
            :hover {
                color: red;
            }
        }
    }
`;
export class ModifyMyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false, nick: this.props.userInfo.nickName || "회원이름" };
    }
    gotoBasic = () => {
        this.props.changeTab("basic");
    };
    gotoSecurity = () => {
        this.props.changeTab("security");
    };
    gotoAdditionalInfo = () => {
        this.props.changeTab("addition");
    };
    deactiveAccount = async () => {
        await this.setState({ clicked: true });
    };
    onChangeNick = (e) => {
        this.setState({ nick: e.target.value });
    };
    closeDeactiveModal = () => {
        this.setState({ clicked: false });
    };
    requestDeactivateAccount = () => {
        if (this.props.deactivateAccount == null) {
            return;
        }
        this.props.deactivateAccount();
        this.closeDeactiveModal();
    }

    render() {
        const { userInfo, MyDetail, tab } = this.props;
        const { clicked, nick } = this.state;

        return (<React.Fragment>
            <Wrapper face={(userInfo && userInfo.thumbnail && userInfo.thumbnail.l_img) || noface}>

                {/* title */}
                <div className="title">
                    <div className="text">프로필 사진</div>
                    <div className="icon">
                        <Icon>edit</Icon>
                    </div>
                    <div className="icon">
                        <Icon>help</Icon>
                    </div>
                </div>

                {/* thumbnail */}
                <div className="thumbnail" />

                {/* nick-name */}
                <div className="nick">
                    <div className="label">
                        닉네임
                    </div>
                    <input value={nick} onChange={this.onChangeNick} />
                    <div className="icon">
                        <Icon>edit</Icon>
                    </div>
                    <div className="icon">
                        <Icon>help</Icon>
                    </div>
                </div>

                <div className="like-menu">
                    {/* myinfo */}
                    <div className={`border like-design ${tab === "basic" ? "active" : ""}`}>
                        <a onClick={this.gotoBasic}>기본 정보</a>
                    </div>
                    {/* security */}
                    <div className={`border like-group ${tab === "security" ? "active" : ""}`}>
                        <a onClick={this.gotoSecurity}>보안</a>
                    </div>
                    {/* additional */}
                    <div className={`border like-designer ${tab === "addition" ? "active" : ""}`}>
                        <a onClick={this.gotoAdditionalInfo} >부가 정보</a>
                    </div>
                    {/* delete account */}
                    <div className={`like-designer ${clicked ? "active" : ""}`}>
                        <a onClick={this.deactiveAccount} >탈퇴하기</a>
                    </div>
                </div>
            </Wrapper>


            {clicked
                ? <DeactiveModal open={clicked} onClose={this.closeDeactiveModal}>
                    <div className="warning">
                        <Icon style={{ fontSize: 60 }}>warning</Icon>
                    </div>
                    <div className="message">
                        정말로 탈퇴하시겠습니까?
                    </div>
                    <div className="buttons">
                        <a className="red" onClick={this.requestDeactivateAccount}>예</a>
                        <a onClick={this.closeDeactiveModal}>아니오</a>
                    </div>
                </DeactiveModal>
                : null}

        </React.Fragment>);
    };
};
