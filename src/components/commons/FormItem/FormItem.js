import React, { Component } from 'react';
import Validates from "../../../modules/Validates";
import styled from "styled-components";

const checkValidate = async (value, validates) => {
  let next = true;
  let obj = {
    status: "SUCCESS",
    message: null
  };
  const whatIsStatus = (status) => {
    if (status) {
      // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
      next = false;
      obj = {
        status: null,
        message: status
      };
    }
  }
  if (validates) {
    for (let vali of validates) {
      //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
      if (!next) break;
      if (!Validates[vali]) {
        // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
        console.log("잘못된 값입니다.");
      } else {
        await Validates[vali](value).then(whatIsStatus);
      }
    }
  }
  return Promise.resolve(obj);
}

const CheckBoxLabel = styled.label`
  position: relative;
  padding-left: 1.5rem;
  box-sizing: border-box;
  &::before{
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: block;
    content: "";
    top: 0;
    left: 0;
    border: 1px solid #181818;
    border-radius: 3px;
  }
  &.checked::after{
    font-family: "Checkbox";
    display: block;
    position: absolute;
    left: 0;
    top: -2px;
  }
`

export class FormInput extends Component {
  state = {
    status: null,
    message: null,
    value: "",
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }

  onChangeValue = (event) => {
    const target = event.target;
    this.setState({ value: target.value });
    checkValidate(target.value, this.props.validates).then( data => {
      this.setState(data);
    })
  }

  render() {
    const { type, name, placeholder } = this.props;
    return (
      <div>
        <input status={this.state.status} type={type} name={name} placeholder={placeholder} value={this.state.value} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormCheckBox extends Component {
  state = {
    status: null,
    message: null,
    checked: true
  }
  componentWillMount() {
    if (this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }
  onChangeCheckBox = async () => {
    await this.setState({ checked: !this.state.checked });
    checkValidate(this.state.checked, this.props.validates).then( data => {
      this.setState(data);
    })
  }

  render() {
    const { name, placeholder } = this.props;
    return (
      <div>
        <CheckBoxLabel className={this.state.checked ? "checked" : null} htmlFor={name}>{placeholder}</CheckBoxLabel>
        <input status={this.state.status} id={name} type="checkbox" style={{ display: "none" }} name={name} placeholder={placeholder} checked={this.state.checked} onChange={this.onChangeCheckBox} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormTextArea extends Component {
  state = {
    status: null,
    message: null,
    value: "",
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }

  onChangeValue = (event) => {
    const target = event.target;
    this.setState({ value: target.value });
    checkValidate(target.value, this.props.validates).then( data => {
      this.setState(data);
    })
  }

  render() {
    const { type, name, placeholder } = this.props;
    return (
      <div>
        <textarea status={this.state.status} name={name} placeholder={placeholder} value={this.state.value} onChange={this.onChangeValue} onBlur={this.onChangeValue}></textarea>
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormFile extends Component {
  state = {
    status: null,
    message: null,
    value: "",
  }
  componentWillMount() {
    console.log("file");
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }
  componentWillUnmount(){
    this.setState({
      status: null,
      message: null,
      value: "",
    });
  }

  onChangeValue = (event) => {
    const target = event.target;
    let value = target.files[0];

    this.setState({ value });
    checkValidate(value, this.props.validates).then( data => {
      this.setState(data);
    });
    if(this.props.onChange) this.props.onChange(target);
  }

  render() {
    const { name, placeholder, id, style } = this.props;
    return (
      <div>
        <input style={style} status={this.state.status} id={id} type="file" name={name} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}
