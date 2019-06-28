import React, { Component } from 'react'
import { Modal, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CustomModal = styled(Modal)`
border: none;
width: 450px;
border-radius: 50%;
padding: 45px 10px 45px 10px;
& .icon.close{
    position: absoulte;
    color: #F00;
    cursor: pointer;
}
`
class SignInModal extends Component {
    _signin = () => {
        let success = true
        this.props.signin(success)
    }
    onClose = () => { this.props.close() }
    render() {
        const { open } = this.props
        return (
            <CustomModal open={open} onClose={this.onClose}>
                <Modal.Content>
                    <Icon className="close" size="big" onClick={this.onClose} />
                    <h3>OPEN SOURCE DESIGN</h3>
                    <form onSubmit={this._signin}>
                        <label>이메일</label>
                        <input />
                        <label>Password</label>
                        <input />
                        <div><Link to="/signup">회원가입</Link><div onClick={this._signin}>로그인</div></div>
                    </form>
                </Modal.Content>
            </CustomModal>
        )
    }
}

export default SignInModal