import React, { Component } from 'react'
import styled from 'styled-components'
import SignInModal from './SignInModal'
import { SetSession } from 'modules/Sessions'
import noface from "source/noimg.png"

const UserMenu = styled.div`
    display: ${props => props.display};
    position: absolute;
    pointer-events: auto;
    top: 50.5px;
    left: ${props => props.left + "px"};
    z-index: 904;
    height: 153px;
    width: 179px;
    border-radius: 15px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    border-radius: 5px;
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    padding: 15px;
`
const UserMenuItem = styled.div`
    cursor: pointer;
    width: 100%;
    padding-top:11.5px;
    padding-left: 5px;
    padding-right: 13px;
    line-height: 30px;
    text-align: left;
    &:hover {}
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
    openModal = () => { this.setState({ signin_modal: true }) }
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
            })
        this.setState({ user_popup: null })
    }
    gotoMyPage = () => {
        this.setState({ user_popup: null })
        window.location.href = "/mypage"
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

        const profile = (info && info.thumbnail && info.thumbnail.s_img) || noface

        return (<>
            {this.state.user_popup &&
                <UserMenu ref={this.myRef} display={"block"} top={this.state.user_popup.top} left={userinfo.userMenuLeft} >
                    <div style={{ paddingBottom: "5px" }}><UserMenuItem onClick={this.gotoMyPage}>마이페이지</UserMenuItem></div>
                    <hr style={{ position: "relative", left: '-10px' }} width="166px" noshade="none" />
                    <div><UserMenuItem onClick={this.signout}>로그아웃</UserMenuItem></div>
                </UserMenu>}
            {this.state.signin_modal && <SignInModal open={this.state.signin_modal} signinrequest={this.props.SignInRequest} signin={this.signin} close={this.closeModal} />}
            {isLoggedIn
                ? (<div onClick={this.openUserMenu} style={{ margin: "0", padding: "0", cursor: "pointer", display: "flex" }}>
                    <UserThumbnail url={profile} />
                    {info.nickName}</div>)
                : (<div onClick={this.openModal} style={{ margin: "0", padding: "0", cursor: "pointer" }}>
                    로그인</div>)}
        </>)
    }
}

export default SignNav
