import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SignInModal from "components/Commons/SignNav/SignInModal"

const SignNavContainer = styled.div`
font-size: 15px;
img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0px;
    background-color: #D6D6D6;
}
`
class SignNav extends Component {
    state = { valid: false, user_popup: false, signin_modal: false }
    _handleClick = () => { }
    _open_signin_modal = () => { this.setState({ signin_modal: !this.state.signin_modal }) }
    handleCloseModal = () => { this.setState({ signin_modal: false }) }
    handleSignIn = (success) => { this.setState({ valid: success, signin_modal: false }) }
    handleSignOut = () => { this.setState({ valid: false }) }
    _popup = () => { this.setState({ user_popup: true }) }
    render() {
        const User = () => {
            return (
                <div onClick={this._popup}>
                    <img />
                    {this.props.nickname}
                    {this.state.user_popup &&
                        <div>
                            <Link to="/designer">마이페이지</Link>
                            <div onClick={this.handleSignOut}>로그아웃</div>
                        </div>
                    }
                </div>)
        }
        const NonUser = () => {
            return (
                <div style={{ display: "flex" }}>
                    <div onClick={this._open_signin_modal}>로그인</div>
                    <Link to="/signup"><div>회원가입</div></Link>
                </div>)
        }
        return (
            <SignNavContainer onClick={this._handleClick}>
                {this.state.valid ? <User /> : <NonUser />}
                {this.state.signin_modal && <SignInModal open={this.state.signin_modal} signin={this.handleSignIn} close={this.handleCloseModal} />}
            </SignNavContainer>
        )
    }
}
export default SignNav 