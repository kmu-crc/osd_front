import React, { Component } from 'react'
import styled from 'styled-components'
// import SignInModal from './SignInModal'
import { SetSession } from 'modules/Sessions'
import noimg from "source/thumbnail.png";
import TextFormat from 'modules/TextFormat';
import { geturl } from "config"


const UserMenu = styled.div`
    display: ${props => props.display};
    padding-top:10px;
    position: absolute;
    pointer-events: auto;
    top: 50.5px;
    right: 5px;
    z-index: 904;
    height: 115px;
    width: 179px;
    border-radius: 15px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    border-radius: 10px;
    color: #707070;
    font-size: 20px;
    font-weight: 500;    
   `
const UserMenuItem = styled.div`
    margin-top:5px;
    cursor: pointer;
    width: 100%;
    line-height: 30px;
    text-align: center;
    &:hover {
        color:#FF0000;
    }
`
const UserThumbnail = styled.div`
    margin-right: 10px;
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
    background-color: #D6D6D6;
    width: 30px;
    height: 30px;
    background-image: url(${prop => prop.url}) 
`

const userinfo = {
    nickName: "닉네임",
    thumbnail: "",
    userMenuLeft: "1751px",
}
class SignNav extends Component {
    state = { signin_modal: false, user_popup: null, userMenuLeft: userinfo.userMenuLeft };
    openModal = () => {
        window.location.href = "/SignIn";
        // this.setState({ signin_modal: true }) 
    }
    openUserMenu = (event) => {
        document.addEventListener("mousedown", this.handleClickOutside)
        const top = event.clientY + 10
        const left = event.clientX - (event.clientX + 75 > window.screenLeft ? 150 : 75)
        this.setState({ user_popup: { display: "block", top: top, left: left } })
    }
    closeModal = () => { this.setState({ signin_modal: false }) }
    signin = () => {
        this.closeModal()
        this.setState({ signin_modal: false, user_popup: null, isLoggedIn: true })
        window.location.reload()
    }
    signout = () => {
        SetSession("opendesign_token", null)
            .then(data => {
                // console.log("data:", data)
                this.props.SignOutRequest()
                this.setState({ sign_modal: false, user_popup: null })
                window.location.reload()
            })
        this.setState({ user_popup: null })
    }
    gotoMyPage = () => {
        this.setState({ user_popup: null })
        window.location.href = geturl() + "/mypage"
    }

    myRef = React.createRef()
    handleClickOutside = e => {
        if (this.myRef.current === null) return

        if (!this.myRef.current.contains(e.target)) {
            this.setState({ user_popup: null })
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }

    render() {
        const info = this.props.userInfo || userinfo
        const { isLoggedIn } = this.props
        const { user_popup } = this.state
        const profile = (info && info.thumbnail && info.thumbnail.s_img) || noimg

        return (<React.Fragment>
            {user_popup &&
                <UserMenu ref={this.myRef} display={"block"} top={user_popup.top} left={userinfo.userMenuLeft} >
                    <div><UserMenuItem onClick={this.gotoMyPage}>내 정보</UserMenuItem></div>
                    <hr color="#EFEFEF" width="166px" noshade="none" />
                    <div><UserMenuItem onClick={this.signout}>로그아웃</UserMenuItem></div>
                </UserMenu>}
            {/* {this.state.signin_modal && <SignInModal open={signin_modal} CheckEmailRequest={this.props.CheckEmailRequest} FindPwRequest={this.props.FindPwRequest} signinrequest={this.props.SignInRequest} signin={this.signin} close={this.closeModal} />} */}
            {isLoggedIn
                ? (<div onClick={this.openUserMenu} style={{ width: "max-content", margin: "0", padding: "0", cursor: "pointer", display: "flex" }}><UserThumbnail url={profile} /><TextFormat chars={9} txt={this.props.formWidth < 1000 ? "" : info.nickName} /></div>)
                : (<div onClick={this.openModal} style={{ minWidth: "max-content", marginRight: "0px", padding: "0", cursor: "pointer",display: "flex" }}>로그인</div>)}
        </React.Fragment>)
    }
}

export default SignNav
