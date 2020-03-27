import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { setTimeout } from 'timers';

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : true
    }
  }

  componentDidMount() {
    setTimeout(
      ()=>{
        this.props.history.push('./design');
        this.setState({visible: false
      });}, 3000);
  }

  closeModal() {
    //console.log(this.props.history);
    this.setState({
        visible : false
      }
    );
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
          <h1>회원가입이<br></br> 완료되었습니다.</h1>
          <p>내 정보로 이동합니다.</p>
        </div>
        </Modal>
      </section>
    );
  }
}
