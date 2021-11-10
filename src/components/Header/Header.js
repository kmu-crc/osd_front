import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

import Message from "components/Header/Message"
// import logo from "source/osd_logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"
// import opendesign_style from "opendesign_style"

import new_logo_opendesign from "source/new_logo_opendesign.svg";
import new_logo_opendesign_purple from "source/new_logo_opendesign_purple.svg";
// import new_logo_opendesign_red from "source/new_logo_opendesign_red.svg";
import new_logo_opendesign_green from "source/new_logo_opendesign_green.svg";
import new_logo_opendesign_blue from "source/new_logo_opendesign_blue.svg";

// import new_logo_mail from "source/new_logo_mail.svg";
// import new_logo_notifications from "source/new_logo_notifications.svg";
// import new_logo_menu_open from "source/new_logo_menu_open.svg";
// import new_logo_menu_close from "source/new_logo_menu_close.svg";

// mobile
import { MOBILE_WIDTH, LoginText, CreateDesign, } from "constant";
import mobilelogo from "resources/images/mobile_logo.svg";
import mobilesearch from "resources/images/mobile_search_icon.svg";


const Profile = styled.div`
    min-width:57px;
    max-width:57px;
    min-height:57px;
    max-height:57px;
    border-radius:50%;
    box-shadow: 8px 8px 6px #00000029;
    border:1px solid #912525;
    background-color:white;
    background-image:url(${props => props.img});
    background-size:cover;
    border:4px solid ${window.location.pathname.indexOf("designer") != -1 ? "#7E1E9B"
        : window.location.pathname.indexOf("Designer") != -1 ? "#7E1E9B"
            : window.location.pathname.indexOf("design") != -1 ? "#1262AB"
                : window.location.pathname.indexOf("Design") != -1 ? "#1262AB"
                    : window.location.pathname.indexOf("group") != -1 ? "#1E9B79"
                        : window.location.pathname.indexOf("Group") != -1 ? "#1E9B79"
                            : "red"
    };
`

const HeaderMenu = styled.div`
    width: 100%;
    height: 90px;
    background-color: ${props => props.bgColor};
    position: fixed;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    z-index: 903;
    * {
        font-family: Noto Sans KR;
    }
    .wrap {
        display: flex;
        align-items: center;
    }
    .menu_nav {
        min-width: 100px;
        height:90px;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:${window.location.pathname.indexOf("designer") != -1 ? "#522058"
        : window.location.pathname.indexOf("Designer") != -1 ? "#522058"
            : window.location.pathname.indexOf("design") != -1 ? "#193356"
                : window.location.pathname.indexOf("Design") != -1 ? "#193356"
                    : window.location.pathname.indexOf("group") != -1 ? "#205847"
                        : window.location.pathname.indexOf("Group") != -1 ? "#205847"
                            : "#7A7A7A"
    };
    }
    .menu_icon{
        width:60px;
        height:60px;
        cursor:pointer;
    }
    .home_logo{
        width: 120px;
        height: 51px;
        min-width: 120px;
        min-height: 51px;
        margin-left: 35px;
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
    .design_button{
        width:170px;
        height:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-family:Spoqa Han Sans Neo,Noto Sans KR;
        font-size:20px;
        background-color:red;
        box-shadow: 8px 8px 8px #0000002B;
        margin-right:46px;
        cursor:pointer;
    }
    .login_button {
        font-family: Spoqa Han Sans;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }

    @media only screen and (min-width : 950px) and (max-width:1300px) {
        .searchBox{
            margin-left: 10px;
        }
        .marginRight1 {
            margin-right: 25px;
        }
        .design_button {
            margin-right: 20px;
        }
    }
    @media only screen and (min-width : 0px) and (max-width: 950px) {
        display: flex;
        justify-content: start;
        .searchBox{
            margin-left: 10px;
        }
        .marginRight1 {
            margin-right: 5px;
        }
        .design_button {
            margin-right: 10px;
        }
        .home_logo {
            margin-left: 15px;
        }
    }
`;

// MOBILE
const MobileHeaderMenu = styled.ul`
    z-index: 8888;
    display: flex;
    flex-direction: row;
    width: 360px;
    padding: 0px;
    margin: 0px;
`;
const MenuElement = styled.li`
    list-style: none;

    &.logo { 
        border: none;
        margin: 6px 11px 7px 8px;
        width: 61px;
        height: 25px;
        img {
            border: none;
            object-fit: cover;
        }
    }

    &.search {
        margin: 9px 5px 8px 0px;
        width: 199px;
    }

    &.login-button { 
        margin: 9px 8px 9px 0px;
        width: 67px;
        height: 21px;
        border-radius: 10px;
        border: red;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
            font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
            font-weight: 500;
            color: white;
            text-align: center;
            line-height: 14px;
            font-size: 10px;
        }
    }

    &.create-design-button { 
        margin: 9px 8px 9px 0px;
        width: 67px;
        height: 21px;
        border-radius: 10px;
        border: red;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
            font-family: Spoqa Han Sans Neo-Medium, Spoqa Han Sans Neo;
            font-weight: 500;
            color: white;
            text-align: center;
            line-height: 14px;
            font-size: 10px;
        }
    }
`;


const isOpen = ws => ws.readyState === ws.OPEN;
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

        return (<React.Fragment>

            {MOBILE_WIDTH >= window.innerWidth

                ? <MobileHeaderMenu>
                    {/* 로그 */}
                    <a href="/">
                        <MenuElement className="logo">
                            <img src={mobilelogo} />
                        </MenuElement>
                    </a>

                    {/* 검색 */}
                    <MenuElement className="search">
                        {window.location.href.search('/search') > -1
                            ? null
                            : <SearchForm
                                mobile={true}
                                mobilesearch={mobilesearch}

                                formWidth={this.state.screenWidth}
                                searchCategory={this.state.selectCate}
                                visible={1}
                            />}
                    </MenuElement>

                    {/* 로그인 / 디자인 등록 */}
                    {this.props.userInfo

                        ? <a onClick={() => window.location.href = "/createDesign"}>
                            <MenuElement className="create-design-button">
                                <p className="text">
                                    {CreateDesign}
                                </p>
                            </MenuElement>
                        </a>

                        : <a onClick={() => this.props.onClickLogin()}>
                            <MenuElement className="login-button">
                                <p className="text">
                                    {LoginText}
                                </p>
                            </MenuElement>
                        </a>}
                </MobileHeaderMenu>

                : window.location.pathname.indexOf("/sign") != -1 ?
                    <HeaderMenu bgColor={"#cccccc"}>
                        {/* <div className="wrap"> */}
                        {/* <div className="menu_nav"> */}
                        {/* {this.props.sidemenu == true&&this.props.isLogin?  <img className="menu_icon" src={new_logo_menu_close}/> :<img className="menu_icon" src={new_logo_menu_open}/> } */}
                        {/* </div> */}
                        {/* </div> */}

                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                            <div className="wrap">
                                <a href="/">
                                    <img src={new_logo_opendesign} className="home_logo" />
                                </a>
                            </div>
                            <div className="wrap">
                                {this.props.userInfo != null
                                    ? <React.Fragment>
                                        <div className="design_button">디자인 등록</div>
                                        <div className="icon_wrap marginRight1"><AlarmContainer {...this.props} alarm={this.state.alarm} /></div>
                                        <div className="icon_wrap marginRight1"><Message noti={this.state.alarm} /></div>
                                    </React.Fragment>
                                    : null}
                            </div>
                        </div>
                    </HeaderMenu>

                    : <HeaderMenu bgColor={"#00000033"}>

                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                            <div className="wrap">
                                <div className="menu_nav">
                                    {/* { this.props.sidemenu == true?  <img className="menu_icon" src={new_logo_menu_close}/> :<img className="menu_icon" src={new_logo_menu_open}/> } */}
                                    {this.props.userInfo != null ?
                                        <a href="/myPage">
                                            <Profile img={this.props.userInfo.thumbnail && this.props.userInfo.thumbnail.s_img} />
                                        </a>
                                        : <div className="login_button"
                                            onClick={() => this.props.onClickLogin()}>로그인</div>
                                    }
                                </div>
                                <a href="/"><img src={
                                    window.location.pathname.indexOf("designer") != -1 ? `${new_logo_opendesign_purple}`
                                        : window.location.pathname.indexOf("Designer") != -1 ? `${new_logo_opendesign_purple}`
                                            : window.location.pathname.indexOf("design") != -1 ? `${new_logo_opendesign_blue}`
                                                : window.location.pathname.indexOf("Design") != -1 ? `${new_logo_opendesign_blue}`
                                                    : window.location.pathname.indexOf("group") != -1 ? `${new_logo_opendesign_green}`
                                                        : window.location.pathname.indexOf("Group") != -1 ? `${new_logo_opendesign_green}`
                                                            : `${new_logo_opendesign}`
                                } className="home_logo" /></a>
                            </div>

                            <div className="wrap">
                                <div className="searchBox">
                                    {window.location.href.search('/search') > -1 ? null : <SearchForm formWidth={this.state.screenWidth} searchCategory={this.state.selectCate} visible={1} />}
                                </div>
                            </div>
                            <div className="wrap">
                                {this.props.userInfo != null ?
                                    <React.Fragment>
                                        <div className="design_button" onClick={() => { window.location.href = "/createDesign" }}>디자인 등록</div>
                                        <div className="icon_wrap marginRight1"><AlarmContainer {...this.props} alarm={this.state.alarm} /></div>
                                        <div className="icon_wrap marginRight1"><Message noti={this.state.alarm} /></div>
                                    </React.Fragment>
                                    : null}
                            </div>
                        </div>
                    </HeaderMenu >
            }
        </React.Fragment>);
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