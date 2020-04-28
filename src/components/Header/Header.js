import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"


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
    // position: absolute;
    left: 0px;
    min-width: 400px;
    margin: 0px;
    padding: 0px;
    vertical-align: top;
    display: flex;
    line-height: 29px;
    list-style: none;
    @media only screen and (max-width: 900px) {
        justify-content:center;
    }
    .logoBox{
        height: 55px;
        min-width: 55px;
        margin-left: 10px;
        .logo{
            width: 55px;
            height: 55px;
        }
    }
`
const MenuItem = styled.li`
    min-width:55px;
    height:29px;
    margin-left:50px;
    margin-top:11px;
    text-align:center;
    .link_tag{
        color:${props => props.isSelect === true ? "#FF0000" : "#707070"}
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
        this.state = { notice: {}, alarm: {}, selectCate: -1, screenWidth: window.innerWidth };
        this.gotoCreateDesignPage = this.gotoCreateDesignPage.bind(this);
    }
    static contextType = MenuContext
    componentDidMount() {
        if (this.props.valid) {
            try {
                Socket.emit("INIT", this.props.userInfo.uid)
                Socket.on("getNoti", alarm => {
                    this.setState({ alarm: alarm })
                })
            } catch (err) {
                //TODO v2: doesn't meaning in client, so! report administrator e-mail
                console.error(err);
            }
        }
        window.addEventListener("resize", this.handleResize, false);
    };
    componentWillUpdate(nextProps){
        console.log(this.props.userInfo)
        if(this.props.userInfo!=null&&nextProps.userInfo!=null&&this.props.userInfo.uid!=null&&nextProps.userInfo.uid!=null){
            if(this.props.userInfo.uid!==nextProps.userInfo.uid){
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
                <Menu className={(this.context.hidemenu ? " hidemenu" : "")}>
                    <RightMenu>
                        <li className="searchItem">
                            <SearchForm formWidth={this.state.screenWidth} searchCategory={this.state.selectCate} visible={window.location.href.search('/search') > -1 ? 0 : 1} />
                        </li>
                        {this.props.userInfo != null ? (
                            <React.Fragment>
                                <li className="IconItem"><Message noti={this.state.alarm} /></li>
                                <li className="IconItem"><AlarmContainer {...this.props} alarm={this.state.alarm} /></li>
                            </React.Fragment>
                        ) : null}
                        <li className="redItem">
                            <div onClick={this.gotoCreateDesignPage}>디자인 등록</div></li>
                        <li className="profileItem">
                            <SignNav formWidth={this.state.screenWidth} {...this.props} /></li> {/* <SignNavContainer /> */}
                    </RightMenu>

                    <LeftMenu>
                        <li className="logoBox">
                            <a href="/"><img alt="logo" className="logo" src={logo} /></a></li>
                        <MenuItem isSelect={window.location.pathname === '/design' || (window.location.pathname.search('/designDetail/') > -1 ? true : false)}>
                            <a className="link_tag" href="/design">디자인</a></MenuItem>
                        <MenuItem isSelect={window.location.pathname === '/group' || (window.location.pathname.search('/groupDetail/') > -1 ? true : false)}>
                            <a className="link_tag" href="/group">그룹</a></MenuItem>
                        <MenuItem isSelect={window.location.pathname === '/designer' || (window.location.pathname.search('/designerDetail/') > -1 ? true : false)}>
                            <a className="link_tag" href="/designer">디자이너</a></MenuItem>
                    </LeftMenu>
                </Menu>

            </React.Fragment>
        )
    }
}

export default Header
