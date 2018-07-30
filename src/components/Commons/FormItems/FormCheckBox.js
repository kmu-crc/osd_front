import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`

const Message = styled.div`
  display: block;
  position: absolute;
  color: ${StyleGuide.color.main.basic};
  left: 0;
  bottom: -1.5rem;
`

const CheckBoxLabel = styled.label`
  position: relative;
  padding-left: 2rem;
  box-sizing: border-box;
  cursor: pointer;
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

export class FormCheckBox extends Component {
  state = {
    value: true,
    target: null,
    validates: []
  };

  componentDidMount(){
    if(this.props.validates){
      this.setState({ validates: this.props.validates });
    }
    if(this.props.value){
      this.setState({ value: this.props.value });
    }
    if(this.props.value === 0){
      this.setState({ value: false });
    }
    this.init();
  }

  init = async () => {
    await this.setState({target: this.input})
    this.returnData();
  }

  onChangeValue = async e => {
    await this.setState({ value: !this.state.value, target: this.input });
    this.returnData();
  };

  returnData = async (e) => {
    if(this.props.getValue) await this.props.getValue(this.state);
    if(e && this.props.onBlur) await this.props.onBlur();
  }
  render() {
    const { name, value, placeholder, id } = this.props;
    return (
      <InputWrap>
        <CheckBoxLabel
          className={this.state.value ? "checked" : null}
          htmlFor={id ? id+value : name+value}
          onClick={this.onChangeValue}
          onBlur={this.returnData}
          >{placeholder}</CheckBoxLabel>
        <input
          type="checkbox"
          id={id ? id+value : name+value}
          name={name && name}
          style={{display: "none"}}
          defaultValue={value && value}
          ref={ref => (this.input = ref)}
          />
        <Message></Message>
      </InputWrap>
    );
  }
}

FormCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};
