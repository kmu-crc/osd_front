import React, { Component } from 'react'
import styled, { keyframes } from "styled-components";
import Socket from "modules/Socket"
import new_logo_handle_arrow from "source/new_logo_handle_arrow.svg";
import { SetSession } from 'modules/Sessions';

// mobile
import { SLIDE_MENU_WIDTH, } from "constant";
import mobile_logo_white from "resources/images/mobile_logo_white.svg";
import mobile_alarm_icon from "resources/images/mobile_alarm_icon.svg";
import mobile_message_icon from "resources/images/mobile_message_icon.svg";

const BgColorSelector = (id) => {
    if (id == null)
        return window.location.pathname.toLowerCase().indexOf("designer") != -1 ? "#7E1E9B"
            : window.location.pathname.toLowerCase().indexOf("design") != -1 ? "#1262AB"
                : window.location.pathname.toLowerCase().indexOf("group") != -1 ? "#1E9B79"
                    : window.location.pathname.toLowerCase().indexOf("/about") != -1 ? "#39280b"
                        : "red";
    else
        return id === "designer" ? "#7E1E9B"
            : id === "design" ? "#1262AB"
                : id === "group" ? "#1E9B79"
                    : id === "aboutIntro" ? "#39280b"
                        : "red";

};
const MenuItem = styled.div`
    *{
        cursor:pointer;
    }
    width:100%;
    text-align:center;
    font-size:18px;
    font-family:Spoqa Han Sans;
    color:white;
    background-color:${props => props.isSelect == true ? "rgba(255,255,255,0.53)" : null};
    cursor:pointer;
    &:hover{
        background-color:rgba(255,255,255,0.53);
    }
    &.border-top {
        border-top: 1px solid white;
    }
    &.border-bottom {
        border-bottom: 1px solid white;
    }
    &.submenu {
        text-align: left;
        font-weight: 100;
        font-size: 20px;
        line-height: 29px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #FFFFFF;
    }
`;
const MobileMenuBox = styled.div`
    z-index: 9999;
    position: relative;
    width: ${SLIDE_MENU_WIDTH}px;
    height: 100%;
    background-color: ${props => props.bgcolor}; //${BgColorSelector()};
    border-radius: 0px 0px 33px 0px;

    .menu_top {
        width: 100%;
        height: 39px;
        border-bottom: 1px solid white;

        img {
            margin: 7px 0px 0px 8px;
            width: 61px;
            height: 25px;
            object-fit: cover;
        }
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // background-color: #7A7A7A;
    }

    .menu_tag {
        width: 100%;
        height: 49px;
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 18px;
        .text {
            width: max-content;
            font-size: 20px;
            line-height: 29px;
            font-family: Spoqa Han Sans;
            font-weight: 500;
            letter-spacing: 0px;
            color: #FFFFFF;
        }
    }

    .menu_handle {
        cursor: pointer;
        position: absolute;
        top: 39px;
        left: ${SLIDE_MENU_WIDTH}px;
        width: 33px;
        height: 49px;
        border-radius: 0px 17px 17px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.bgcolor}; // ${BgColorSelector()};
        img {
            position: absolute;
        }
        .arrow {
            width: 24px;
            height: 24px;
        }
        .folding {
            transform: rotate( 180deg);
        }
        .notfolding {
            transform: rotate( 0deg);
        }
        .alarm-count {
            transform: translate( 20px, 20px);
            width: 23px;
            height: 22px;
            background-color: red;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            p {
                font-size: 11;
                font-family: Spoqa Han Sans-Bold, Spoqa Han Sans;
                font-weight: 700;
                text-aglin: center;
                color: white;
            }
        }
    }

    .thumbnail-container {
        border-bottom: 1px solid white;

        .thumbnail { 
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 16px;

            img { 
                width: 85px;
                height: 85px;
                object-fit: cover;
                border-radius: 100%;
            } 
        }

        .alarm-message-icon-wrapper { 
            display: flex;
            flex-direction: row;
            margin-bottom: 11px;
            align-items: center;
            justify-content: start;

            .alarm-icon-wrapper { 
                margin-left: 26px;

                .alarm-count {
                    position: absolute;
                    transform: translate( 25px, -10px);
                    width: 23px;
                    height: 22px;
                    background-color: red;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
        
                    p {
                        font-size: 11;
                        font-family: Spoqa Han Sans-Bold, Spoqa Han Sans;
                        font-weight: 700;
                        text-aglin: center;
                        color: white;
                    }
                }
                img { 
                    width: 44px;
                    height: 44px;
                } 
            }
            .message-icon-wrapper { 
                margin-left: 21px;

                .message-count {
                    position: absolute;
                    transform: translate( 25px, -10px);
                    width: 23px;
                    height: 22px;
                    background-color: red;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
        
                    p {
                        font-size: 11;
                        font-family: Spoqa Han Sans-Bold, Spoqa Han Sans;
                        font-weight: 700;
                        text-aglin: center;
                        color: white;
                    }
                }
                img { 
                    width: 41px;
                    height: 41px;
                } 
            }
        }
    }

    .menu_exit {
        width: 100%;
        height: 92px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .exit_icon {
        width:44px;
        height:44px;
        margin-top:21px;
        margin-bottom:14px;
    }


    .marginTop1{
        // margin-top:27px;
    }
    .icon_message{
        width:66px;
        height:66px;
        position:absolute;
        bottom:0px;
        left:100px;
    }
    &:hover{
        .link_tag{
            color: white;
        }
    }
    .stickToEnd {
        position: absolute;
        bottom: 10px;
        // text-alignment: right;
        // font-size: .9rem;
        // font-weight: 500;
        // color: white;
    }
`;
const SubMenuOpenAni = keyframes`
  0% {
    left: ${-1 * SLIDE_MENU_WIDTH}px;
  }
  100% {
    left: 0px;
  }
`;
const SubMenuCloseAni = keyframes`
  0% {
    left: 0px;
  }
  100% {
    left: ${-1 * SLIDE_MENU_WIDTH}px;
  }
`;
const SubMenuNavigationAni = styled.div`
  border-radius: 0px 0px 33px 0px;
  background-color: ${props => props.bgcolor};
  top: 39px;
  position: absolute;
  height: calc(100% - 100px);
  width: 100%;
  z-index: 902;
  animation-name: ${props => props.open ? SubMenuOpenAni : SubMenuCloseAni};
  animation-duration: 0.5s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  
`;

const isOpen = ws => ws.readyState === ws.OPEN;

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alarm: {},
            selectCate: -1,
            h: null,

            thislevel: { num: 0, color: "", id: "" },
            // level3: [],
            level2: [],
            level1: [],
            level0:
                [
                    { max: 2, text: "디자인", id: "design", },
                    { max: 1, text: "그룹", id: "group", },
                    { max: 2, text: "디자이너", id: "designer", },
                    { max: 0, text: "ABOUT", id: "aboutIntro", },
                ]
            ,
        };
    }

    async componentDidMount() {

        await this.props.GetCategoryAllRequest();

        if (isOpen(Socket) && this.props.valid) {
            try {
                if (isOpen(Socket))
                    Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("getNoti", alarm => {
                    this.setState({ alarm: alarm })
                    console.log(alarm)
                    if (alarm.count) {
                    }
                })
                Socket.on("disconnect", () => {
                })
            } catch (err) {
                console.error(err);
            }
        }
        window.addEventListener("resize", this.handleResize, false);

        const location = window.location.pathname.toLowerCase().split("/");

        console.log("MOUNT:", location);

        location[1] != null
            && this.state.level0.find(level => level.id == location[1])
            && this.gotoLevel1(this.state.level0.find(level => level.id == location[1]));

        location[3] != null
            && this.state.level1.find(level => level.id == location[3])
            && this.gotoLevel2(this.state.level1.find(level => level.id == location[3]));

    };
    SignOut = () => {
        SetSession("opendesign_token", null)
            .then(data => {
                this.props.SignOutRequest();
                window.location.href = "/";
            });
    };
    componentWillUpdate(nextProps) {
        if (this.props.userInfo != null && nextProps.userInfo != null && this.props.userInfo.uid != null && nextProps.userInfo.uid != null) {
            if (this.props.userInfo.uid !== nextProps.userInfo.uid) {
                window.history.go(0);
            }
        }

    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, false);

    };
    handleResize = (/*event*/) => {
        this.setState({ h: window.innerHeight });
    };

    goGrnLevel = () =>
        this.setState({
            thislevel: { num: 0, color: BgColorSelector() }
        });
    gotoLevel2 = async (level) => {
        await this.setState({
            level2: this.props.category2[level.id - 1].map(item => ({ text: item.text, id: item.value })),
            thislevel: {
                num: 2,
                color: this.state.thislevel.color,
                id: this.state.thislevel.id,
                prev: level.id,
            }
        })
    };
    gotoLevel1 = (level) => {
        if (level.max) {
            this.setState({
                level1:
                    level.max > 1
                        ? this.props.category1.map(
                            (item, index) => ({ text: item.text, id: item.value }))
                        : [],
                thislevel: {
                    color: BgColorSelector(level.id),
                    num: 1,
                    id: level.id
                }
            })
        }
        else {
            this.gotoPage(`/${level.id}`);
        }
    };
    gotoPage = (page) => {
        window.location.href = page;
        this.props.onClickFolding();
    }
    gotoMyPage = () => {
        alert("!");
        window.location.href = `/mypage`;
    };
    gotoAlarmPage = () => {
        window.location.href = `/alarm`;
    };
    gotoMessagePage = () => {
        window.location.href = `/message`;
    };

    render() {
        const location = window.location.pathname.toLowerCase().split("/");
        const { level0, level1, level2 } = this.state;

        return (<MobileMenuBox bgcolor={this.state.thislevel.color || BgColorSelector()}>

            {/* logo */}
            <a className="link_tag" href="/">
                <div className="menu_top">
                    <img src={mobile_logo_white} />
                </div>
            </a>

            {/* handle */}
            <div className="menu_handle" onClick={this.props.onClickFolding}>
                {this.state.alarm
                    && !this.props.sidemenu
                    && (this.state.alarm.count + this.state.alarm.countMsg) > 0
                    ? <div className="alarm-count">
                        <p className="alarm-count-text">
                            {(this.state.alarm.count + this.state.alarm.countMsg) > 99
                                ? 99
                                : (this.state.alarm.count + this.state.alarm.countMsg)}
                        </p>
                    </div>
                    : null}
                <img
                    className={`arrow ${this.props.sidemenu ? "folding" : "notfolding"}`}
                    src={new_logo_handle_arrow} />
            </div>

            {/* thumbnail */}
            {this.props.userInfo && this.state.thislevel.num === 0
                ? <div className="thumbnail-container">
                    <a onClick={this.gotoMyPage}>
                        <div className="thumbnail">
                            <img src={this.props.userInfo.thumbnail.m_img} />
                        </div>
                    </a>

                    <div className="alarm-message-icon-wrapper">
                        <a onClick={this.gotoAlarmPage}>
                            <div className="alarm-icon-wrapper">
                                {this.state.alarm.count > 0
                                    ? <div className="alarm-count">
                                        <p>{this.state.alarm.count > 99 ? 99 : this.state.alarm.count}</p>
                                    </div> : null}
                                <img src={mobile_alarm_icon} />
                            </div>
                        </a>
                        <a onClick={this.gotoMessagePage}>
                            <div className="message-icon-wrapper">
                                {this.state.alarm.countMsg > 0
                                    ? <div className="message-count">
                                        <p>{this.state.alarm.countMsg > 99 ? 99 : this.state.alarm.countMsg}</p>
                                    </div> : null}
                                <img src={mobile_message_icon} />
                            </div>
                        </a>
                    </div>

                </div>
                : null}


            {/*
            <SubMenuNavigationAni open={this.state.thislevel == 3} bgcolor={this.state.thislevel.color || "red"} >
            </SubMenuNavigationAni> 
            */}

            {/* level 2 = 1st category selected */}
            <SubMenuNavigationAni
                open={this.state.thislevel.num == 2}
                bgcolor={this.state.thislevel.color || "red"}
            >
                {/* back */}
                <a className="link_tag" onClick={this.goGrnLevel}>
                    <MenuItem className="menu_tag marginTop1 border-bottom">
                        메인메뉴
                    </MenuItem>
                </a>
                <a className="link_tag" onClick={() => this.gotoLevel1(level0.find(level => level.id === this.state.thislevel.id))}>
                    <MenuItem
                        className={`menu_tag marginTop1 ${level1.length > 0 ? "border-bottom" : ""}`}>
                        {level0.find(level => level.id === this.state.thislevel.id)
                            && level0.find(level => level.id === this.state.thislevel.id).text}
                    </MenuItem>
                </a>
                <a className="link_tag" onClick={() => this.gotoPage(`/${this.state.thislevel.id}/update/${this.state.thislevel.prev}/`)}>
                    <MenuItem
                        className={`menu_tag marginTop1 ${level2.length > 0 ? "border-bottom" : ""}`}
                        isSelect={location[3] && !location[4] && location[3] == this.state.thislevel.prev}>
                        {this.state.thislevel.prev != null
                            && this.props.category1[this.state.thislevel.prev - 1]
                            && this.props.category1[this.state.thislevel.prev - 1].text}
                    </MenuItem>
                </a>
                {level2.map((level, index) =>
                    <a key={index}
                        className="link_tag"
                        onClick={() =>
                            this.gotoPage(`/${this.state.thislevel.id}/update/${this.state.thislevel.prev}/${level.id}`)}>
                        <MenuItem className="submenu menu_tag marginTop1 " isSelect={location[4] && location[4] == level.id}>
                            {level.text}
                        </MenuItem>
                    </a>
                )}
            </SubMenuNavigationAni>

            {/* level 1 = design  | designer  */}
            <SubMenuNavigationAni
                open={this.state.thislevel.num == 1}
                bgcolor={this.state.thislevel.color || "red"}>

                {/* back */}
                <a className="link_tag" onClick={this.goGrnLevel}>
                    <MenuItem className="menu_tag marginTop1 border-bottom">
                        메인메뉴
                    </MenuItem>
                </a>
                <a className="link_tag" onClick={() => this.gotoPage(`/${this.state.thislevel.id}`)}>
                    <MenuItem
                        className={`menu_tag marginTop1 ${level1.length > 0 ? "border-bottom" : ""}`}
                        isSelect={location[1] && !location[2] && location[1] == this.state.thislevel.id}>
                        {level0.find(level => level.id === this.state.thislevel.id)
                            && level0.find(level => level.id === this.state.thislevel.id).text}
                    </MenuItem>
                </a>
                {level1.map((level, index) =>
                    <a key={index} className="link_tag" onClick={() => this.gotoLevel2(level)}>
                        <MenuItem className="submenu menu_tag marginTop1 " isSelect={location.length <= 2 && location[1] === level.id}>
                            {level.text}
                        </MenuItem>
                    </a>)}
            </SubMenuNavigationAni>

            {/* level 0 */}
            {level0.map((level, index) =>
                <a key={index} className="link_tag"
                    onClick={() => this.gotoLevel1(level)} >
                    <MenuItem
                        className="menu_tag marginTop1 "
                        isSelect={location[1] && !location[2] && location[1] == level.id.toLowerCase()}>
                        {level.text}
                    </MenuItem>
                </a>)}

            {this.props.userInfo == null
                ? null
                : <a className="link_tag" onClick={this.SignOut}>
                    <MenuItem className="stickToEnd menu_tag border-top">로그아웃</MenuItem>
                </a>}

        </MobileMenuBox>);
    };
};

export default Navigation;
