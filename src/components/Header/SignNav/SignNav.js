import React, { Component } from 'react'
import styled from 'styled-components'
import SignInModal from './SignInModal'
import { SetSession } from 'modules/Sessions'
// import jina from "source/jina.png"

const UserMenu = styled.div`
    display: ${props => props.display};
    position: absolute;
    pointer-events: auto;
    top: ${props => props.top + "px"};
    left: ${props => props.left + "px"};
    z-index: 904;
    height: 154px;
    width: 150px;
    border-radius: 15px;
    border: 1px solid #FF0000;
    background-color: #FFFFFF;
    color: #707070;
    font-size: 20px;
    font-weight: 500;
    padding: 15px;
`
const UserMenuItem = styled.div`
    cursor: pointer;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 32px;
    padding-left: 13px;
    padding-right: 13px;
    line-height: 30px;
    text-align: left;
    &:hover {}
`
const UserThumbnail = styled.div`
    margin-right: 10px;
    border-radius: 50%;
    background-position: center cetner;
    background-size: cover;
    background-color: #D6D6D6;
    width: 30px;
    height: 30px;
    background-image: url(${prop => prop.url}) 
`

const userinfo = { nickName: "닉네임", thumbnail: "" }
class SignNav extends Component {
    state = { signin_modal: false, user_popup: null }
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
        this.setState({ signin_modal: false, user_popup: null })
        window.location.reload()
    }
    signout = () => {
        SetSession("opendesign_token", null)
            .then(data => {
                // console.log("data:", data)
                this.props.SignOutRequest()
                this.setState({ sign_modal: false, user_popup: null })
            })
        this.setState({ user_popup: null, is_signed: false })
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
        const { isSignedIn } = this.props
        // console.log(this.props) 
        // console.log(this.props.isSigned + " : is signed")
        return (<>
            {this.state.user_popup &&
                <UserMenu ref={this.myRef} display={"block"} top={this.state.user_popup.top} left={this.state.user_popup.left}>
                    <UserMenuItem onClick={this.gotoMyPage}>마이페이지</UserMenuItem>
                    <UserMenuItem onClick={this.signout}>로그아웃</UserMenuItem>
                </UserMenu>}
            {this.state.signin_modal && <SignInModal open={this.state.signin_modal} signinrequest={this.props.SignInRequest} signin={this.signin} close={this.closeModal} />}
            {isSignedIn
                ? (<div onClick={this.openUserMenu} style={{ margin: "0", padding: "0", cursor: "pointer", display: "flex" }}>
                    <UserThumbnail url={info.thumbnail.s_img} />
                    {info.nickName}</div>)
                : (<div onClick={this.openModal} style={{ margin: "0", padding: "0", cursor: "pointer" }}>
                    로그인</div>)}
        </>)
    }
}

export default SignNav