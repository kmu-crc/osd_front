import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

import Message from "components/Header/Message"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
// import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"

import new_logo_opendesign from "source/new_logo_opendesign.svg";
import new_logo_opendesign_purple from "source/new_logo_opendesign_purple.svg";
import new_logo_opendesign_green from "source/new_logo_opendesign_green.svg";
import new_logo_opendesign_blue from "source/new_logo_opendesign_blue.svg";

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

        // border: 2px dashed green;
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
            margin-right: 10px;
            // width: ${window.innerWidth * 2 / 5}px;
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

            {window.location.pathname.indexOf("/sign") != -1 ?
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
                                {window.location.href.search('/search') > -1
                                    ? null
                                    : <SearchForm
                                        formWidth={this.state.screenWidth}
                                        searchCategory={this.state.selectCate}
                                        visible={1}
                                    />}
                            </div>
                        </div>
                        <div className="wrap">
                            {this.props.userInfo != null ?
                                <React.Fragment>
                                    {/* <div className="design_button" onClick={() => { window.location.href = "/createDesign" }}>디자인 등록</div> */}
                                    <div className="icon_wrap marginRight1"><AlarmContainer {...this.props} alarm={this.state.alarm} /></div>
                                    <div className="icon_wrap marginRight1"><Message noti={this.state.alarm} /></div>
                                </React.Fragment>
                                : null}
                        </div>
                    </div>
                </HeaderMenu >
            }
        </React.Fragment>);
    };
};

export default Header;
