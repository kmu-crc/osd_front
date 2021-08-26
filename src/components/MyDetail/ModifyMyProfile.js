import React from 'react';
import { Modal } from "semantic-ui-react";
import styled from 'styled-components';
import noface from "source/thumbnail.png";
import Icon from '@material-ui/core/Icon';

const Wrapper = styled.div`
    width: 340px;
 
    .help {
        width: 174px;
        height: 129px;
        
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 8px 8px 8px #0000002B;
        opacity: 1;
        position: absolute;
        left: -10%;
        top: -10%;

    }
    .icon {
        margin-left: 15px;
        cursor: pointer;
    }   
    .title {
        position: relative;
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
            margin-right: 16px;
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
    .menu {
        width: 138px;

        a {
            height: 40px; 
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
            align-items: cetner;

            cursor: pointer; 
            :hover { background: #707070; }

        } 
        .border {
            border-bottom: 2px solid #707070; }
        .active {
            color: red; }
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
const PannelMenu = styled.div`
    margin-top: 11px;
    display: flex;
    flex-direction: column;

    .border {
        border-bottom: 2px solid #707070; }
    .active { 
        color: #FF0000; }
    a {
        margin: auto;
        width: 168px; 
        height: 77px;
        display: flex;
        align-item: center;
        .text {
            height: 40px;
            margin: auto;
            text-align: center;
            font-weight: medium;
            font-size: 28px;
            line-height: 40px;
            font-family: Spoqa Han Sans Neo;
            letter-spacing: 0px;
            color: #000000 !inherit;
            opacity: 1; 
        }
    }
`;
export class ModifyMyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            thumbnail: null,
            thumbnail_name: null,
            nick: this.props.userInfo.nickName || "회원이름",
        };
    };
    componentDidMount() {
        document.addEventListener("mousedown", (e) => {
            if (document.getElementById("thumbnail-help").hidden === false) {
                document.getElementById("thumbnail-help").hidden = true;
                return;
            }
        })
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
        this.props.onChange({ nick: this.state.nick });
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
    };
    // handler
    handleOnChangeThumbnail = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({ thumbnail: reader.result, thumbnail_name: file.name });
            this.props.onChange({ thumbnail: reader.result, thumbnail_name: file.name });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    changeThumbnail = () => {
        const node = document.getElementById("file");
        node.click();
    }

    render() {
        const { userInfo, tab } = this.props;
        const { thumbnail, clicked, nick } = this.state;

        return (<React.Fragment>
            <Wrapper face={thumbnail || (userInfo && userInfo.thumbnail && userInfo.thumbnail.l_img) || noface}>

                {/* title */}
                <div className="title">
                    <div className="text">프로필 사진</div>
                    <div onClick={this.changeThumbnail} className="icon">
                        <Icon>edit</Icon>
                    </div>
                    <div onClick={() => {
                        document.getElementById("thumbnail-help").hidden = !document.getElementById("thumbnail-help").hidden;
                    }}
                        className="icon">
                        <Icon>help</Icon>
                    </div>
                    <div id="thumbnail-help" className="help" hidden={true}>
                        프로필 사진은 대표적으로 보이게 되는 사진으로,<br />
                        JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.
                    </div>
                </div>

                {/* thumbnail */}
                <input
                    accept="image/bmp, image/png, image/jpg, image/jpeg"
                    type="file" id="file" hidden onChange={this.handleOnChangeThumbnail} />
                <div className="thumbnail" />

                {/* nick-name */}
                <div className="nick">
                    <div className="label">
                        닉네임
                    </div>
                    <input onBlur={() => {
                        if (document.getElementById("nick").value.length === 0) {
                            document.getElementById("nick").value = userInfo.nickName;
                            return;
                        }
                        document.getElementById("nick").disabled = true;
                    }} id="nick" disabled={true} value={nick} onChange={this.onChangeNick} />
                    <div className="icon">
                        <Icon onClick={() => {
                            document.getElementById("nick").disabled = false;
                            document.getElementById("nick").focus();
                        }}>edit</Icon>
                    </div>
                    <div className="icon">
                        <Icon>help</Icon>
                    </div>
                </div>

                <PannelMenu>
                    <a className={`border basic ${tab === "basic" ? "active" : ""}`} onClick={this.gotoBasic}>
                        <div className="text">
                            기본정보
                        </div>
                    </a>
                    <a className={`border security ${tab === "security" ? "active" : ""}`} onClick={this.gotoSecurity}>
                        <div className="text">
                            보안
                        </div>
                    </a>
                    <a className={`border addition ${tab === "addition" ? "active" : ""}`} onClick={this.gotoAdditionalInfo}>
                        <div className="text">
                            부가 정보
                        </div>
                    </a>
                    <a className={`additiona${clicked ? "active" : ""}`} onClick={this.deactiveAccount}>
                        <div className="text">
                            탈퇴하기
                        </div>
                    </a>
                </PannelMenu >
            </Wrapper >


            {clicked
                ? <DeactiveModal open={clicked} onClose={this.closeDeactiveModal
                } >
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
                </DeactiveModal >
                : null
            }

        </React.Fragment>);
    };
};
