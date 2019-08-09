import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class ResetPwModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : true
    }
  }

  closeModal() {
    this.setState({visible : false});
  }

  render() {
    const ModalStyle = {
      textAlign: 'center',
      margin: 100
    }

    return(
      <section>
        <Modal
        onLoad
        visible={this.state.visible}
        width="400"
        height="300"
        effect="fadeInDown"
        >
        <div style={ModalStyle}>
          <h1>비밀번호를<br></br> 전송중입니다.</h1>
          <p>로그인 페이지로 이동합니다.</p>
        </div>
        </Modal>
      </section>
    );
  }
}
