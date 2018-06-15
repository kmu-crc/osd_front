import React, { Component } from 'react';
import Validates from "../../../modules/Validates";
import { Dropdown, Icon } from "semantic-ui-react";
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
  padding-left: 2rem;
  box-sizing: border-box;
  &::before{
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    display: block;
    content: "";
    top: -0.1rem;
    left: 0;
    border: 1px solid #181818;
    border-radius: 3px;
  }
  &.checked::after{
    font-family: "Icons";
    display: block;
    position: absolute;
    font-size: 12px;
    left: 4px;
    top: -1px;
  }
`

const RadioLabel = styled.label`
position: relative;
  padding-left: 2rem;
  box-sizing: border-box;
  &::before{
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    display: block;
    content: "";
    top: -0.2rem;
    left: 0;
    border: 1px solid #181818;
    border-radius: 50%;
  }
  &.checked::after{
    display: block;
    position: absolute;
    background-color: #000;
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    left: 0;
    top: -0.2rem;
    -webkit-transform: scale(.46666667);
    transform: scale(.46666667);
  }
`

const FormDropBox = styled(Dropdown) `
  width: 100%;
`

const UploaderButton = styled.label`
  display: block;
  width: 100%;
  border: 2px dashed #292A2B;
  border-radius: 3px;
  padding: 20px;
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
    checkValidate(target.value, this.props.validates).then(data => {
      if(this.props.getValue && data.status === "SUCCESS") this.props.getValue(target.value);
      // if(this.props.onBlur && data.status === "SUCCESS") this.props.onBlur();
      this.setState(data);
    })
  }

  render() {
    const { type, name, placeholder } = this.props;
    return (
      <div>
        <input status={this.state.status} {...this.props} type={type} name={name} placeholder={placeholder} value={this.state.value} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormRadio extends Component {
  state = {
    status: null,
    message: null
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }
  onChangeRadio = async () => {
    if(this.props.onChange) this.props.onChange(this.props.value);
  }

  render() {
    const { name, placeholder, currentValue, value } = this.props;
    return (
      <div>
        <RadioLabel className={value === currentValue ? "checked" : null} htmlFor={name} onClick={this.onChangeRadio}>{placeholder}</RadioLabel>
        <input status={this.state.status} {...this.props} id={name} type="radio" style={{ display: "none" }} name={name} value={value} placeholder={placeholder} readOnly checked={value === currentValue} />
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
    checkValidate(this.state.checked, this.props.validates).then(data => {
      this.setState(data);
    })
  }

  render() {
    const { name, placeholder } = this.props;
    return (
      <div>
        <CheckBoxLabel className={this.state.checked ? "checked" : null} htmlFor={name}>{placeholder}</CheckBoxLabel>
        <input status={this.state.status} {...this.props} id={name} type="checkbox" style={{ display: "none" }} name={name} placeholder={placeholder} checked={this.state.checked} onChange={this.onChangeCheckBox} />
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
    checkValidate(target.value, this.props.validates).then(data => {
      this.setState(data);
    })
  }

  render() {
    const { name, placeholder } = this.props;
    return (
      <div>
        <textarea status={this.state.status} name={name} {...this.props} placeholder={placeholder} value={this.state.value} onChange={this.onChangeValue} onBlur={this.onChangeValue}></textarea>
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormSelect extends Component {
  state = {
    status: null,
    message: null,
    value: "SUCCESS",
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    } else if( this.props.options.length > 0 ) {
      this.setState({ value: this.props.options[0].value });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }

  componentDidUpdate(prevProps) {
    // 이전에 전달받은 options와 다르다면 새롭게 options를 render하고 그중 제일 첫번째 요소를 선택한다.
    if (JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)) {
      this.newOptions();
    }
  }

  newOptions = async () => {
    await this.setState({ value: this.props.options[0].value });
    if (this.props.getValue) this.props.getValue(this.props.options[0].value);
    await this.onChangeValue(null, {value: this.state.value});
  }

  onChangeValue = async (event, { value }) => {
    await this.setState({ value });
    checkValidate(value, this.props.validates).then(data => {
      if (this.props.getValue) this.props.getValue(value);
      this.setState(data);
    })
  }

  render() {
    const { name, options } = this.props;
    return (
      <div>
        <select style={{ display: "none" }} {...this.props} readOnly status={this.state.status} value={this.state.value} name={name} >
          {options ? options.map(data => {
            return <option key={data.text} value={data.value}>{data.text}</option>
          }) : null}
        </select>
        <FormDropBox selection options={options} onChange={this.onChangeValue} value={this.state.value} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormMultiSelect extends Component {
  state = {
    status: null,
    message: null,
    value: "SUCCESS",
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    } else if( this.props.options.length > 0 ) {
      this.setState({ value: this.props.options[0].value });
    }
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }

  componentDidUpdate(prevProps) {
    // 이전에 전달받은 options와 다르다면 새롭게 options를 render하고 그중 제일 첫번째 요소를 선택한다.
    if (JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)) {
      this.newOptions();
    }
  }

  newOptions = async () => {
    await this.setState({ value: this.props.options[0].value });
    if (this.props.getValue) this.props.getValue(this.props.options[0].value);
    await this.onChangeValue(null, {value: this.state.value});
  }

  onChangeValue = async (event, { value }) => {
    console.log(value);
    await this.setState({ value });
    checkValidate(value, this.props.validates).then(data => {
      console.log("222", value);
      if (this.props.getValue) this.props.getValue(value);
      this.setState(data);
    })
  }

  render() {
    const { name, options } = this.props;
    return (
      <div>
        <input type="text" {...this.props} name={this.props.name} {...this.props} status={this.state.status} value={this.state.value} style={{ display: "none" }}/>
        <FormDropBox selection multiple options={options} onChange={this.onChangeValue} value={this.state.value} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}

export class FormFile extends Component {
  state = {
    status: "SUCCESS",
    message: null,
    value: "",
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
  }
  componentWillUnmount() {
    this.setState({
      status: null,
      message: null,
      value: "",
    });
  }

  onChangeValue = async (event) => {
    const target = event.target;
    let value = target.files[0];
    if (target.files == null) value = null;

    await checkValidate(value, this.props.validates).then(data => {
      this.setState(data);
    });
    if(this.state.status !== "SUCCESS") return;
    this.setState({ value });
    if (this.props.onChange) this.props.onChange(target);
    if (this.props.freeView) this.props.freeView(value);
  }

  render() {
    const { name, placeholder, id } = this.props;
    return (
      <div>
        <UploaderButton htmlFor={id || name}>
          {
            !this.state.value
            ? <span><Icon name="image" />{placeholder}</span>
            : this.props.fileUploader
            ? <span><Icon name="image" />{placeholder}</span>
            : <span>{this.state.value.name}</span>

          }
        </UploaderButton>
        <input style={{display: "none"}} {...this.props} status={this.state.status} id={id || name} type="file" name={name} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </div>
    );
  }
}
