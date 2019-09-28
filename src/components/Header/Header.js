import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

// import Notification from "components/Commons/Notification"
import Message from "components/Header/Message"
import logo from "source/logo.png"
import AlarmContainer from "containers/Header/AlarmContainer"
import SearchForm from "components/Header/SearchForm"
import SignNav from "components/Header/SignNav"
import Socket from "modules/Socket"

const SmallMinWidth = 0;
const SmallMaxWidth = 480;
const MediumMinWidth = 480;
const MediumMaxWidth = 1440;
const LargeMinWidth = 1440;
const LargeMaxWidth = 1920;
// CSS
const Menu = styled.div`
    z-index: 900;
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction:row-reverse;
    @media only screen and (max-width : 900px) {
        display:block;
        
    }
    justify-content: space-between;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    background-color: #FFFFFF;
    &.hidemenu {
        top: -55px;
        opacity: 0;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;    
`
const LeftMenu = styled.ul`
    //position:absolute;
    left:0px;
    min-width:400px;
    margin:0px;
    padding:0px;
    vertical-align:top;
    display:flex;
    line-height:29px;
    list-style:none;
    @media only screen and (max-width : 900px) {
        justify-content:center;
    }

    .logoBox{
        min-width:55px;
        height:55px;
        margin-left:10px;
        .logo{
            width:55px;
            height:55px;
        }
    }



`
const MenuItem=styled.li`
    min-width:55px;
    height:29px;
    margin-left:50px;
    margin-top:11px;
    text-align:center;
    .link_tag{
        color:${props=>props.isSelect==true?"#FF0000":"#707070"}
    }

    // @media only screen and (min-width : ${SmallMinWidth}px) and (max-width : ${SmallMaxWidth}px) {
    //     width: ${SmallMaxWidth}px;
    // }
    //   @media only screen and (min-width : ${MediumMinWidth}px) and (max-width : ${MediumMaxWidth}px) {
    //     width: ${MediumMaxWidth}px;
    // }
    //   @media only screen and (min-width : ${LargeMinWidth}px) and (max-width : ${LargeMaxWidth}px) {
    //     width: ${LargeMaxWidth}px;
    // }
    //   @media only screen and (min-width : ${LargeMaxWidth}px){
    //     width: ${LargeMaxWidth}px;
    // }
`
const RightMenu = styled.ul`
    min-width:480px;
    // position:absolute;
    background-color:#FFFFFF;

    right:0px;
    margin:0px;
    padding:0px;
    list-style:none;
    display:flex;
    line-height:29px;
    vertical-align:top;

    @media only screen and (max-width : 900px) {
        background-color:#EFEFEF;
        justify-content:center;
    }


    .searchItem{
        height:36px;
        margin-right:50px;
        margin-top:9px
        border:none;
        @media only screen and (max-width : 900px) {
            margin-top:5px;
            margin-bottom:5px;
        }
    }
    .IconItem{
        width:34px;
        height:34px;
        margin-right:50px;
        margin-top:10px;
        @media only screen and (max-width : 900px) {
            margin-top:5px;
            margin-bottom:5px;
        }
    }
    .redItem{
        min-width:97px;
        line-height:29px;
        height:29px;
        margin-right:50px;
        margin-top:11px
        color: red;
        border-bottom: 1.5px solid red;
        cursor: pointer;
        @media only screen and (max-width : 900px) {
            margin-top:5px;
            margin-bottom:5px;
        }
    }
    .profileItem{
        min-width:55px;
        height:29px;
        margin-right:17px;
        margin-top:11px;
        @media only screen and (max-width : 900px) {
            margin-top:5px;
            margin-bottom:5px;
        }
    }


`

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { alarm: {}, selectCate: -1, screenWidth:window.innerWidth };
        this.gotoCreateDesignPage = this.gotoCreateDesignPage.bind(this);

    }
    static contextType = MenuContext
    componentDidMount() {
        if (this.props.valid) {
            try {
                Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("getNoti", alarm => {
                    this.setState({ alarm: alarm })
                    console.log("getNoti", alarm)
                })
            } catch (err) {
                //TODO v2: doesn't meaning in client, so! report administrator e-mail
                console.log(err)
            }
        }
        window.addEventListener("resize", this.handleResize, false);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, false);
      };
    gotoCreateDesignPage() {
        window.location.href = "/createDesign"
    }
    handleResize = () => {
        this.setState({screenWidth:window.innerWidth})
    };
    render() {
        return (
            <Menu className={(this.context.hidemenu ? " hidemenu" : "")}>

                <RightMenu>
                    <li className="searchItem">
                        <SearchForm formWidth = {this.state.screenWidth} searchCategory={this.state.selectCate} visible={window.location.href.search('/search') > -1 ? 0 : 1} /></li>
                    <li className="IconItem">
                        {this.props.userInfo != null && <Message noti={this.state.alarm} />}
                    </li>
                    <li className="IconItem">
                        {this.props.userInfo != null && <AlarmContainer {...this.props} alarm={this.state.alarm} />}
                    </li>
                    <li className="redItem">
                        <div onClick={this.gotoCreateDesignPage}>디자인 등록</div></li>
                    <li className="profileItem">
                        <SignNav formWidth = {this.state.screenWidth} {...this.props} /></li> {/* <SignNavContainer /> */}
                </RightMenu>
                <LeftMenu>
                    <li className="logoBox">
                        <a href="/"><img alt="logo" className="logo" src={logo} /></a></li>
                    <MenuItem isSelect={window.location.pathname==='/design'}>
                        <a className="link_tag" href="/design">디자인</a></MenuItem>
                    <MenuItem isSelect={window.location.pathname==='/group'}>
                        <a className="link_tag" href="/group">그룹</a></MenuItem>
                    <MenuItem isSelect={window.location.pathname==='/designer'}>
                        <a className="link_tag" href="/designer">디자이너</a></MenuItem>
                </LeftMenu>
            </Menu>
        )
    }
}

export default Header

// return (
//     <Menu className={(this.context.hidemenu ? " hidemenu" : "")}>
//         <ul style={{ border:"1px solid black",minWidth: "523px", margin: "0px", padding: "0px", listStyle: "none", display: "flex", lineHeight: "29px", verticalAlign: "top" }} >
//             <li style={{ minWidth: "55px", height: "55px", marginLeft: "10px" }}>
//                 <a href="/"><img alt="logo" style={{ width: "55px", height: "55px" }} src={logo} /></a></li>
//             <li style={{ minWidth: "55px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
//                 <a style={(window.location.pathname === '/design') ? { color: "red" } : { color: "#707070" }} href="/design">디자인</a></li>
//             <li style={{ minWidth: "37px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
//                 <a style={(window.location.pathname === '/group') ? { color: "red" } : { color: "#707070" }} href="/group">그룹</a></li>
//             <li style={{ minWidth: "74px", height: "29px", marginLeft: "50px", marginTop: "11px" }}>
//                 <a style={(window.location.pathname === '/designer') ? { color: "red" } : { color: "#707070" }} href="/designer">디자이너</a></li>
//         </ul>
//         <ul style={{ margin: "0px", padding: "0px", listStyle: "none", display: "flex", lineHeight: "29px", verticalAlign: "top" }} >
//             <li style={{ minWidth: "327px", height: "36px", marginRight: "50px", marginTop: "9px", border: "none" }}>
//                 <SearchForm searchCategory={this.state.selectCate} visible={window.location.href.search('/search') > -1 ? 0 : 1} /></li>
//             <li style={{ width: "34px", height: "34px", marginRight: "50px", marginTop: "10px" }}>
//                 {this.props.userInfo != null && <Message noti={this.state.alarm} />}
//             </li>
//             <li style={{ width: "34px", height: "34px", marginRight: "50px", marginTop: "10px" }}>
//                 {this.props.userInfo != null && <AlarmContainer {...this.props} alarm={this.state.alarm} />}
//             </li>
//             <li style={{ minWidth: "97px", lineHeight: "29px", height: "29px", marginRight: "50px", marginTop: "11px" }}>
//                 <DesignCreateBtn onClick={this.gotoCreateDesignPage}>디자인 등록</DesignCreateBtn></li>
//             <li style={{ minWidth: "55px", height: "29px", marginRight: "17px", marginTop: "11px" }}>
//                 <SignNav {...this.props} /></li> {/* <SignNavContainer /> */}
//         </ul>
//     </Menu>
// )