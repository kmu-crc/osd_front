import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

import Message from "components/Header/Message"
import logo from "source/logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"
import opendesign_style from "opendesign_style"

import new_logo_opendesign from "source/new_logo_opendesign.svg";
import new_logo_opendesign_purple from "source/new_logo_opendesign_purple.svg";
import new_logo_opendesign_red from "source/new_logo_opendesign_red.svg";
import new_logo_opendesign_green from "source/new_logo_opendesign_green.svg";
import new_logo_opendesign_blue from "source/new_logo_opendesign_blue.svg";

import new_logo_mail from "source/new_logo_mail.svg";
import new_logo_notifications from "source/new_logo_notifications.svg";
import new_logo_menu_open from "source/new_logo_menu_open.svg";
import new_logo_menu_close from "source/new_logo_menu_close.svg";
const HeaderMenu = styled.div`
    width:100%;
    height:90px;
    background-color:${props=>props.bgColor};
    position:fixed;
    display:flex;
    justify-content:space-between;
    align-items:center;
    z-index:888;
    * {
        font-family: Noto Sans KR;
    }
    .wrap{
        display:flex;
        align-items:center;
    }
    .menu_nav{
        width:100px;
        height:90px;
        display:flexl
        justify-content:center;
        align-items:center;
    }
    .menu_icon{
        width:60px;
        height:60px;
        cursor:pointer;
    }
    .home_logo{
        width:122px;
        height:51px;
        min-width:122px;
        min-height:51px;
        margin-left:38px;
    }
    .searchBox{
        margin-left:100px;
    }
    .icon_wrap{
        width:44px;
        height:44px;
        position:relative;
    }
    .marginRight1{
        margin-right:45px;
    }
    
`

// const WrapperBox = styled.div`
//     width:100%;
//     display:flex;
//     justify-content:center;
// `
// const Menu = styled.div`
//     z-index: 900;
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.LargeMaxWidth}px) {
//         width:100%;
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.LargeMaxWidth}px) {
//         width:1920px;
//     }
//     width: 100%;
//     position: fixed;
//     display: flex;
//     flex-direction:row-reverse;
//     justify-content: space-between;
//     align-items:center;
//     font-size: 20px;
//     font-weight: 500;
//     font-family: Noto Sans KR;
//     color: #707070;
//     background-color: #FFFFFF;
//     &.hidemenu {
//         top: -55px;
//         opacity: 0;
//     }
//     -webkit-transition: all 0.45s;
//     -moz-transition: all 0.45s;
//     -ms-transition: all 0.45s;
//     -o-transition: all 0.45s;
//     transition: all 0.45s;    
//     @media only screen and (max-width : 1024px) {
//         display:block;
//     }
// `
// const LeftMenu = styled.ul`
//     left: 0px;
//     min-width: 30%;
//     margin: 0px;
//     padding: 0px;
//     vertical-align: top;
//     display: flex;
//     list-style: none;
//     .logoBox{
//         height: 55px;
//         min-width: 55px;
//         margin-left: 36px;
//         .logo{
//             width: 55px;
//             height: 55px;
//         }
//     }
//        @media only screen and (max-width: 1024px) {
//            justify-content:center;
//        }
//        @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//        and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//           min-width:100%;
//        }
// `
// const MenuItem = styled.li`
//     min-width:max-content;
//     height:29px;
//     margin-left:36px;
//     margin-top:11px;
//     text-align:center;
//     .link_tag{
//         color:${props => props.isSelect === true ? "#FF0000" : "#707070"}
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         margin-left:0px;
//         margin-right:10%;
//         font-size:18px;
//     }
// `
// const CenterMenu = styled.ul`
//     min-width:56%;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     padding:0px;
//     .searchItem{
//         height:36px;
//         // margin-right:50px;
//         // margin-top:5px
//         border:none;
//     }
//     @media only screen and (min-width : 1600px) {
//         // margin-left:40px;
//     }
//     @media only screen and (max-width : 1600px) {
//         min-width:60%;
//     }
//     @media only screen and (max-width : 1440px) {
//         min-width:50%;
//     }
//     @media only screen and (max-width : 1024px) {
//         min-width:40%;
//         .searchItem{
//             margin-right:3%;
//             min-width:200px;
//             display:flex;
//             justify-content:center;
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         width:100%;
//         .searchItem{
//             min-width:100%;
//             max-width:300px;
//             margin-right:0px;
//             margin-top:5px;
//             display:flex;
//             justify-content:center;
//         }
//     }
// `
// const RightMenu = styled.ul`
//     width:70%;
//     background-color:#FFFFFF;

//     right:0px;
//     margin:0px;
//     padding:0px;
//     list-style:none;
//     display:flex;
//     justify-content:space-between;
//     vertical-align:top;
//     .signnav{
//         min-width:44%;
//         display:flex;
//         justify-content:flex-end;
//     }
//     .IconItem{
//         width:34px;
//         height:34px;
//         margin-right:35px;
//         // margin-top:10px;
//         position:relative;
//     }
//     .redItem{
//         min-width:max-content;
//         height:29px;
//         border-radius:18px;
//         background-color:red;
//         color:white;
//         display:flex;
//         justify-content:center;
//         align-items:center;
//         padding:4px 16px 4px 16px;
//         margin-right:36px;
//         cursor: pointer;
//         font-weight: 900;
//     }
//     .profileItem{
//         *{
//             cursor:pointer;
//         }
//         max-width:150px;
//         height:29px;
//         display:flex;
//         line-height:29px;
//         margin-right:45px;
//         // margin-top:11px;
//         cursor:pointer;
//         // overflow:hidden;
//     }
//     @media only screen and (max-width : 1440px) {
//         .IconItem{
//             margin-right:25px;
//         }
//         .redItem{
//             margin-right:25px;
//             margin-left:15px;
//         }
//         .profileItem{
//         }
//     }
//     @media only screen and (max-width : 1024px) {
        
//         min-width:100%;
//         background-color:#EFEFEF;
//         display:flex;
//         justify-content:center;
//         flex-wrap:wrap;
//         .IconItem{
//             margin-right:3%;
//             margin-top:5px;
//             margin-bottom:5px;
//         }
//         .redItem{
//             margin-right:3%;
//             margin-top:5px;
//             margin-bottom:5px;
//         }
//         .profileItem{
//             margin-right:3%;
//             margin-top:5px;
//             margin-bottom:5px;
//         }
//         .signnav{
//             width:60%;
//         }
//     }
//     @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//     and (max-width : ${opendesign_style.resolutions.SmallMaxWidth}px) {
//         max-width:100%;
//         display:flex;
//         justify-content:center;
//         flex-wrap:wrap;
//         .IconItem{
//             margin-right:25px;
//         }
//         .redItem{
//             margin-right:25px;
//         }
//         .profileItem{
//             margin-right:0px;
//         }
//         .signnav{
//             width:100%;
//             justify-content:center;
//         }

//     }

// `
function isOpen(ws) { return ws.readyState === ws.OPEN }
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            notice: {}, alarm: {},
            selectCate: -1,
            screenWidth: window.innerWidth
        };
        this.gotoCreateDesignPage = this.gotoCreateDesignPage.bind(this);
    }
    static contextType = MenuContext
    componentDidMount() {
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
    componentWillUpdate(nextProps) {
        if (this.props.userInfo != null && nextProps.userInfo != null && this.props.userInfo.uid != null && nextProps.userInfo.uid != null) {
            if (this.props.userInfo.uid !== nextProps.userInfo.uid) {
                window.history.go(0);
            }
        }

    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, false);

    };
    gotoCreateDesignPage() {
        window.location.href = "/createDesign"
    }
    handleResize = () => {
        this.setState({ screenWidth: window.innerWidth })
    };

    render() {
        return (
            <React.Fragment>
                {
                    window.location.pathname.indexOf("/sign") != -1?
                    <HeaderMenu bgColor={"#912525"}>
                        <div className="wrap">
                        <div className="menu_nav" onClick={()=>this.props.onClickMenu()}>
                            {
                                this.props.sidemenu == true?
                                <img className="menu_icon" src={new_logo_menu_close}/>
                                :<img className="menu_icon" src={new_logo_menu_open}/>
                            }
                        </div>
                        </div>
                    </HeaderMenu>
                    :
                    <HeaderMenu bgColor={"#00000033"}>
                        <div className="wrap">
                        <div className="menu_nav" onClick={()=>this.props.onClickMenu()}>
                            {
                                this.props.sidemenu == true?
                                <img className="menu_icon" src={new_logo_menu_close}/>
                                :<img className="menu_icon" src={new_logo_menu_open}/>
                            }
                        </div>
                        <a href="/"><img src={
                                window.location.pathname.indexOf("/group")!=-1? new_logo_opendesign_green
                                :window.location.pathname.indexOf("/designer")!=-1? new_logo_opendesign_purple
                                :window.location.pathname.indexOf("/my")!=-1? new_logo_opendesign_red 
                                :window.location.pathname.indexOf("/design")!=-1? new_logo_opendesign_blue
                                :new_logo_opendesign
                            } className="home_logo"/></a>
                        <div className="searchBox">
                            {window.location.href.search('/search') > -1 ? null :
                            <SearchForm formWidth={this.state.screenWidth} searchCategory={this.state.selectCate} visible={1} />
                            }
                            </div>
                        </div>
                        <div className="wrap">
                        {this.props.userInfo != null ? 
                            <React.Fragment>
                            <div className="icon_wrap marginRight1"><Message noti={this.state.alarm} /></div>
                            {/* <img src={new_logo_notifications} className="icon_wrap marginRight1"/> */}
                            <div className="icon_wrap marginRight1"><AlarmContainer {...this.props} alarm={this.state.alarm} /></div>
                            </React.Fragment>
                            :null
                        }
                        </div>
                    </HeaderMenu>

                }
            </React.Fragment>
        )
    }
}

export default Header


// <WrapperBox>
// <Menu className={(this.context.hidemenu ? " hidemenu" : "")}>

//     <RightMenu>
//             <CenterMenu>
//             {window.location.href.search('/search') > -1 ? null :
//             <div className="searchItem">
//                 <SearchForm formWidth={this.state.screenWidth} searchCategory={this.state.selectCate} visible={1} />
//             </div>}
//              </CenterMenu>
//         <div className="signnav">
//         {this.props.userInfo != null ? (
//             <React.Fragment>
//                 <li className="IconItem"><Message noti={this.state.alarm} /></li>
//                 <li className="IconItem"><AlarmContainer {...this.props} alarm={this.state.alarm} /></li>
//                 <li className="redItem">
//                 <div onClick={this.gotoCreateDesignPage}>디자인 등록</div></li>
//             </React.Fragment>
//         ) : null}

//         <li className="profileItem">
//             <SignNav formWidth={this.state.screenWidth} {...this.props} /></li> 
//         </div>
//     </RightMenu>

//     <LeftMenu>
//         <li className="logoBox">
//             <a href="/"><img alt="logo" className="logo" src={logo} /></a></li>
//         <MenuItem isSelect={window.location.pathname === "/design"
//             || window.location.pathname.search("/design/") > -1 ? true : false
//                 || window.location.pathname.search("/designDetail/") > -1 ? true : false
//                     || window.location.pathname.search("/createDesign/") > -1 ? true : false
//                         || window.location.pathname.search("/modifyDesign/") > -1 ? true : false}>
//             <a className="link_tag" href="/design">디자인</a></MenuItem>
//         <MenuItem isSelect={window.location.pathname === '/group'
//             || window.location.pathname.search("/group/") > -1 ? true : false
//                 || (window.location.pathname.search('/groupDetail/') > -1 ? true : false)
//                 || window.location.pathname.search("/createGroup/") > -1 ? true : false
//                     || window.location.pathname.search("/modifyGroup/") > -1 ? true : false}>
//             <a className="link_tag" href="/group">그룹</a></MenuItem>
//         <MenuItem isSelect={window.location.pathname === '/designer'
//             || window.location.pathname.search("/designer/") > -1 ? true : false
//                 || (window.location.pathname.search('/designerDetail/') > -1 ? true : false)
//                 || window.location.pathname.search("/createDesigner/") > -1 ? true : false
//                     || window.location.pathname.search("/modifyDesigner/") > -1 ? true : false}>
//             <a className="link_tag" href="/designer">디자이너</a></MenuItem>

//     </LeftMenu>

// </Menu>
// </WrapperBox>