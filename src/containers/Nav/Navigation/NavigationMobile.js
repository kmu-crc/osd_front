import React, { Component } from 'react'
import styled, { keyframes } from "styled-components";
import Message from "components/Header/Message"
import logo from "source/osd_logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"
import opendesign_style from "opendesign_style"
import new_logo_exit from "source/new_logo_exit.svg";
import new_logo_message_bubble from "source/new_logo_message_bubble.svg";
import new_logo_handle_arrow from "source/new_logo_handle_arrow.svg";
import { SetSession } from 'modules/Sessions';
import { version } from "../../../../package.json";

// mobile
import { SLIDE_MENU_WIDTH, NOT } from "constant";
import mobile_logo_white from "resources/images/mobile_logo_white.svg";
import mobile_alarm_icon from "resources/images/mobile_alarm_icon.svg";
import mobile_message_icon from "resources/images/mobile_message_icon.svg";

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
// mobile
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

            level: [],
            thislevel: 0,
        };
    }

    componentDidMount() {

        this.props.GetCategoryAllRequest();

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

    nextLevel = (id) =>
        this.setState({
            thislevelcolor: BgColorSelector(id),
            thislevel: this.state.thislevel + 1,
        });

    prevLevel = (n) =>
        this.setState({
            thislevel: this.state.thislevel - 1,
        });

    goGrnLevel = () =>
        this.setState({
            thislevelcolor: BgColorSelector(),
            thislevel: 0,
        });

    render() {

        const location = window.location.pathname.toLowerCase();
        const ismainmenu =
            location.indexOf("/design") <= -1
            && location.indexOf("/designer") <= -1
            && location.indexOf("/group") <= -1;
        const loc = location.split("/");

        const level0 = // (loc[1] != "design" && loc[1] != "group" && loc[1] != "designer" &&
            [
                { text: "디자인", id: "design", },
                { text: "그룹", id: "group", },
                { text: "디자이너", id: "designer", },
                { text: "ABOUT", id: "aboutIntro", },
            ]
            , level1 = []
            , level2 = []
            , level3 = [];

        return (<MobileMenuBox bgcolor={this.state.thislevelcolor || BgColorSelector()}>

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
            {this.props.userInfo && ismainmenu
                ? <div className="thumbnail-container">
                    <div className="thumbnail">
                        <img src={this.props.userInfo.thumbnail.m_img} />
                    </div>
                    <div className="alarm-message-icon-wrapper">
                        <div className="alarm-icon-wrapper">
                            {this.state.alarm.count > 0
                                ? <div className="alarm-count">
                                    <p>{this.state.alarm.count > 99 ? 99 : this.state.alarm.count}</p>
                                </div> : null}
                            <img src={mobile_alarm_icon} />
                        </div>
                        <div className="message-icon-wrapper">
                            {this.state.alarm.countMsg > 0
                                ? <div className="message-count">
                                    <p>{this.state.alarm.countMsg > 99 ? 99 : this.state.alarm.countMsg}</p>
                                </div> : null}
                            <img src={mobile_message_icon} />
                        </div>
                    </div>
                </div>
                : null}

            {/* level 0 */}
            {level0.map((level, index) =>
                <a key={index} className="link_tag"
                    //  href={`/${level.id}`}
                    onClick={() => this.nextLevel(level.id)} >
                    <MenuItem className="menu_tag marginTop1 ">
                        {level.text}
                    </MenuItem>
                </a>
            )}

            {this.state.thislevel}

            {/* level 1 = design | group | designer | about */}
            <SubMenuNavigationAni open={this.state.thislevel >= 1} bgcolor={this.state.thislevelcolor || "red"}>
                {/* back */}
                <a className="link_tag" onClick={this.goGrnLevel}>
                    <MenuItem className="menu_tag marginTop1 ">
                        메인메뉴
                    </MenuItem>
                </a>
                {level1.map((level, index) =>
                    //  href={`/${level.id}`}
                    <a key={index} className="link_tag"
                        onClick={this.nextLevel} >
                        <MenuItem className="menu_tag marginTop1 ">
                            {level.text}
                        </MenuItem>
                    </a>
                )}
            </SubMenuNavigationAni>

            <SubMenuNavigationAni open={this.state.thislevel >= 2}>
                this is level 2<br />
                <button onClick={() => this.goGrnLevel(0)}>go lv.0</button>
                <button onClick={() => this.nextLevel(0)}>go lv.3</button>
                <button onClick={() => this.prevLevel(0)}>go lv.2</button>
            </SubMenuNavigationAni>

            {/* 
            <SubMenuNavigationAni open={this.state.thislevel >= 3}>
                this is level 3<br />
                <button onClick={() => this.goGrnLevel(0)}>go lv.0</button>
                <button onClick={() => this.prevLevel(0)}>go lv.3</button>
            </SubMenuNavigationAni> 
            */}

            {this.props.userInfo == null
                ? null
                : <a className="link_tag" onClick={this.SignOut}>
                    <MenuItem className="stickToEnd menu_tag border-top" >로그아웃</MenuItem>
                </a>}

        </MobileMenuBox>);
    };
};

export default Navigation;




//             {/* {tree.map((node, index) => {
//                 return ()
//             })} */}

//             {/*  */}
//             {ismainmenu == NOT
//                 ? <React.Fragment>
//                     <a className="link_tag" href="/">
//                         <MenuItem className="menu_tag marginTop1">
//                             메인메뉴
//                         </MenuItem>
//                     </a>

//                     {/* ********** */}
//                     {/*   DESIGN   */}
//                     {/* ********** */}
//                     {loc[1] === "design"
//                         ? <React.Fragment>
//                             <a className="link_tag" href="/design">
//                                 <MenuItem
//                                     isSelect={!(loc[3] || loc[4] || loc[5])}
//                                     className="menu_tag marginTop1 border-top border-bottom">
//                                     디자인
//                                 </MenuItem>
//                             </a>

//                             {loc[3]
//                                 ? <React.Fragment>
//                                     <a className="link_tag" href={`/design/update/${loc[3]}`}>
//                                         <MenuItem
//                                             isSelect={!loc[4]}
//                                             className="menu_tag marginTop1 border-bottom">
//                                             {this.props.category1.find(item => item.value == loc[3])
//                                                 && this.props.category1.find(item => item.value == loc[3]).text}
//                                         </MenuItem>
//                                     </a>

//                                     {this.props.category2
//                                         && loc[3] > 0
//                                         && this.props.category2[loc[3] - 1]
//                                         && this.props.category2[loc[3] - 1].map((item, index) =>
//                                             <a key={index} className="link_tag" href={`/design/update/${loc[3]}/${item.value}`}>
//                                                 <MenuItem
//                                                     isSelect={loc[4] === `${item.value}`}
//                                                     className="menu_tag submenu">
//                                                     {item.text}
//                                                 </MenuItem>
//                                             </a>
//                                         )}
//                                 </React.Fragment>
//                                 : this.props.category1.map((item, index) =>
//                                     <a key={index} className="link_tag" href={`/design/update/${item.value}`}>
//                                         <MenuItem
//                                             isSelect={loc[3] === `${item.value}`}
//                                             className="menu_tag submenu ">
//                                             {item.text}
//                                         </MenuItem>
//                                     </a>)}

//                             {/* {!loc[4] ? null : null} */}

//                         </React.Fragment>
//                         : null}

//                     {/* ********** */}
//                     {/*   GROUP    */}
//                     {/* ********** */}
//                     {loc[1] === "group"
//                         ? <a className="link_tag" href="/group">
//                             <MenuItem
//                                 isSelect={window.location.pathname == ("/group") == true ? true : false}
//                                 className="menu_tag marginTop1">
//                                 그룹
//                             </MenuItem>
//                         </a>
//                         : null}

//                     {/* ********** */}
//                     {/*   DESIGNER */}
//                     {/* ********** */}
//                     {loc[1] === "designer"
//                         ? <React.Fragment>
//                             <a className="link_tag" href="/designer">
//                                 <MenuItem
//                                     isSelect={!(loc[3] || loc[4] || loc[5])}
//                                     className="menu_tag marginTop1 border-top border-bottom">
//                                     디자이너
//                                 </MenuItem>
//                             </a>

//                             {loc[3]
//                                 ? <React.Fragment>
//                                     <a className="link_tag" href={`/designer/update/${loc[3]}`}>
//                                         <MenuItem
//                                             isSelect={!loc[4]}
//                                             className="menu_tag marginTop1 border-bottom">
//                                             {this.props.category1.find(item => item.value == loc[3])
//                                                 && this.props.category1.find(item => item.value == loc[3]).text}
//                                         </MenuItem>
//                                     </a>

//                                     {this.props.category2
//                                         && loc[3] > 0
//                                         && this.props.category2[loc[3] - 1]
//                                         && this.props.category2[loc[3] - 1].map((item, index) =>
//                                             <a key={index} className="link_tag" href={`/designer/update/${loc[3]}/${item.value}`}>
//                                                 <MenuItem
//                                                     isSelect={loc[4] === `${item.value}`}
//                                                     className="menu_tag submenu">
//                                                     {item.text}
//                                                 </MenuItem>
//                                             </a>
//                                         )}
//                                 </React.Fragment>
//                                 : this.props.category1.map((item, index) =>
//                                     <a key={index} className="link_tag" href={`/designer/update/${item.value}`}>
//                                         <MenuItem
//                                             isSelect={loc[3] === `${item.value}`}
//                                             className="menu_tag submenu ">
//                                             {item.text}
//                                         </MenuItem>
//                                     </a>)}

//                             {/* {!loc[4] ? null : null} */}

//                         </React.Fragment>
//                         : null}

//                 </React.Fragment>
//                 : <React.Fragment>
//                     <a className="link_tag" href="/design">
//                         <MenuItem
//                             isSelect={window.location.pathname == ("/design") == true ? true : false}
//                             className="menu_tag marginTop1">
//                             디자인
//                         </MenuItem>
//                     </a>

//                     <a className="link_tag" href="/group">
//                         <MenuItem
//                             isSelect={window.location.pathname == ("/group") == true ? true : false}
//                             className="menu_tag marginTop1">
//                             그룹
//                         </MenuItem>
//                     </a>

//                     <a className="link_tag" href="/designer">
//                         <MenuItem
//                             isSelect={window.location.pathname == ("/designer") == true ? true : false}
//                             className="menu_tag marginTop1">
//                             디자이너
//                         </MenuItem>
//                     </a>

//                     <a className="link_tag" href="/aboutIntro">
//                         <MenuItem
//                             isSelect={window.location.pathname == ("/about") == true ? true : false}
//                             className="menu_tag marginTop1">ABOUT
//                         </MenuItem>
//                     </a>
//                 </React.Fragment>}





// const MobileOpenAni = keyframes`
//   0% {
//     left: ${-1 * SLIDE_MENU_WIDTH}px;
//   }
//   100% {
//     left: 0px;
//   }
// `;
// const MobileCloseAni = keyframes`
//   0% {
//     left: 0px;
//   }
//   100% {
//     left: ${-1 * SLIDE_MENU_WIDTH}px;
//   }
// `;
// const MobileNavigationAni = styled.div`
//   position: fixed;
//   height: 100%;
//   z-index: 902;
//   animation-name: ${props => props.sidemenu ? MobileOpenAni : MobileCloseAni};
//   animation-duration: 1s;
//   animation-direction: alternate;
//   animation-fill-mode: forwards;
//   animation-timing-function: ease-out;  
// `;