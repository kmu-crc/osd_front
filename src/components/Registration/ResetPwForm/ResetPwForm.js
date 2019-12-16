import React, { Component } from "react";
import styled from "styled-components";
import PxtoRem from "modules/PxtoRem";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import Button from "components/Commons/Button";
import ResetPwModal from "./ResetPwModal";

const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ResetFormCard = styled.div`
  width: 60%;
  min-width: ${PxtoRem(300)};
  height: ${PxtoRem(200)};
  background-color: white;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${PxtoRem(20)} ${PxtoRem(40)};
`;

const ResetForm = styled.form`
  input{
    width: calc(100% - ${PxtoRem(100)});
    float: left
  }
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`

const SubmitBtn = styled(Button)`
  width: ${PxtoRem(90)};
  margin-left: ${PxtoRem(10)};
`

class ResetPwForm extends Component {

  state = {
    loading: false
  };

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.status) !== JSON.stringify(nextProps.status)) {
      if (nextProps.status === "SUCCESS") {
        this.setState({ loading: false });
        this.props.history.push('./signin');
        console.log("this loading state success >> ", this.state.loading);
        alert(nextProps.message);
      } else if (nextProps.status === "FAILURE") {
        this.setState({ loading: false });
        console.log("this loading state failure >> ", this.state.loading);
        alert(nextProps.message);
      }
    }
    return true;
  }

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  onSubmit = async e => {
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        console.log(data); return;
        this.props.FindPwRequest(data);
        this.setState({ loading: true });
        console.log("this loading state onsubmit >> ", this.state.loading);
      })
      .catch(e => {
        console.log("실패", e);
      });
  };
  render() {
    return (
      <Bg>
        <ResetFormCard>
          <h2>비밀번호 찾기</h2>
          <p>비밀번호를 찾고자 하는 아이디를 입력해 주세요.</p>
          <ResetForm onSubmit={this.onSubmit}>
            {this.state.loading === true ? <ResetPwModal /> : null}
            <FormInput
              name="email"
              validates={["Required", "IsEmail"]}
              placeholder="email을 입력해주세요."
              getValue={this.onChangeValue}
            />
            <SubmitBtn>
              전송
            </SubmitBtn>
          </ResetForm>
        </ResetFormCard>
      </Bg>
    );
  }
}

export default ResetPwForm;
