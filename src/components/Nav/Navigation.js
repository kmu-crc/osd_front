import React, { Component } from 'react'
import styled, { keyframes } from "styled-components";
import MenuContext from "Global/Context/GlobalContext"

import Message from "components/Header/Message"
import logo from "source/logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"
import opendesign_style from "opendesign_style"

import new_logo_exit from "source/new_logo_exit.svg";
import new_logo_message_bubble from "source/new_logo_message_bubble.svg";

const Profile = styled.div`
    min-width:57px;
    max-width:57px;
    min-height:57px;
    max-height:57px;
    border-radius:50%;
    box-shadow: 8px 8px 6px #00000029;
    border:1px solid #912525;
    background-image:url(${props=>props.img});
    background-size:cover;
`
const MenuBox = styled.div`
    width:100px;
    height:1080px;
    min-width:100px;
    min-height:1080px;
    background-color:${
        window.location.pathname.indexOf("/designer")!=-1?"#7E1E9B"
        :window.location.pathname.indexOf("/design")!=-1?"#1262AB"
        :window.location.pathname.indexOf("/group")!=-1?"#1E9B79"
        :"red"
    };
    position:relative;
    .menu_top{
        width:100%;
        height:90px;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#7A7A7A;
    }
    .menu_exit{
        width:100%;
        height:92px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .exit_icon{
        width:44px;
        height:44px;
        margin-top:21px;
        margin-bottom:14px;
    }
    .menu_tag{
        width:100%;
        text-align:center;
        font-size:18px;
        font-family: Spoqa Han Sans;
        color:white;
        padding-top:13px;
        padding-bottom:14px;
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
            color:white;
        }
    }

`
const MenuItem = styled.div`
    width:100%;
    text-align:center;
    font-size:18px;
    font-family:SpoqaHanSans;
    color:white;
    background-color:${props=>props.isSelect == true ? "rgba(255,255,255,0.53)" : null};
    cursor:pointer;
    &:hover{
        background-color:rgba(255,255,255,0.53);
    }
 
`
function isOpen(ws) { return ws.readyState === ws.OPEN }
class Navigation extends Component {
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
        console.log(this.props);
        return (
            <React.Fragment>
                <MenuBox>
                    <div className="menu_top"/>
                    <MenuItem
                    isSelect={window.location.pathname === "/myPage"
                    || window.location.pathname.search("/myPage/") > -1 ? true : false
                    || window.location.pathname.search("/myModify") > -1 ? true : false
                    || window.location.pathname.search("/message/") > -1 ? true : false
                    }
                    >
                    <div className="menu_exit">
                        {
                            this.props.userInfo==null?
                            <a href="/signin">
                             <img src={new_logo_exit} className="exit_icon"/>
                            </a>
                            :<a href="/myPage">
                             <Profile img={this.props.userInfo.thumbnail&&this.props.userInfo.thumbnail.s_img}/>
                            </a>
                        }
                    </div>
                    </MenuItem>
                    <MenuItem 
                    isSelect={window.location.pathname === "/design"
                             || window.location.pathname.search("/design/") > -1 ? true : false
                             || window.location.pathname.search("/designDetail/") > -1 ? true : false
                             || window.location.pathname.search("/createDesign/") > -1 ? true : false
                             || window.location.pathname.search("/modifyDesign/") > -1 ? true : false}
                    className="menu_tag marginTop1"><a className="link_tag" href="/design">디자인</a></MenuItem>
                    <MenuItem isSelect={window.location.pathname === '/group'
                             || window.location.pathname.search("/group/") > -1 ? true : false
                             || (window.location.pathname.search('/groupDetail/') > -1 ? true : false)
                             || window.location.pathname.search("/createGroup/") > -1 ? true : false
                             || window.location.pathname.search("/modifyGroup/") > -1 ? true : false}
                              className="menu_tag marginTop1"> <a className="link_tag" href="/group">그룹</a></MenuItem>
                    <MenuItem 
                    isSelect={window.location.pathname === '/designer'
                             || window.location.pathname.search("/designer/") > -1 ? true : false
                             || (window.location.pathname.search('/designerDetail/') > -1 ? true : false)
                             || window.location.pathname.search("/createDesigner/") > -1 ? true : false
                             || window.location.pathname.search("/modifyDesigner/") > -1 ? true : false}
                              className="menu_tag marginTop1"><a className="link_tag" href="/designer">디자이너</a></MenuItem>
                    <MenuItem className="menu_tag marginTop1">NEWS</MenuItem>
                    <MenuItem className="menu_tag marginTop1">ABOUT</MenuItem>
                    {/* <img className="icon_message" src={new_logo_message_bubble}/> */}
                </MenuBox>
            </React.Fragment>
        )
    }
}

export default Navigation


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