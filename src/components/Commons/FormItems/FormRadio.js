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

const RadioLabel = styled.label`
position: relative;
  padding-left: 2rem;
  box-sizing: border-box;
  line-height: 1.4rem;
  cursor: pointer;
  &::before{
    box-sizing: border-box;
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    display: block;
    content: "";
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border: 1px solid #181818;
    border-radius: 50%;
  }
  &.checked::after{
    display: block;
    box-sizing: border-box;
    position: absolute;
    background-color: #000;
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    top: 50%;
    left: 0;
    -webkit-transform: scale(.46666667) translateY(-50%);
    transform: scale(.46666667) translateY(-50%);
    transform-origin: 50% 0;
  }
`

export class FormRadio extends Component {
  state = {
    value: "",
    target: null,
    validates: []
  };

  componentDidMount(){
    if(this.props.validates){
      this.setState({ validates: this.props.validates });
    }
    this.init();
  }

  init = async () => {
    await this.setState({value: this.props.currentValue, target: this.input})
    this.returnData();
  }

  onChangeValue = async e => {
    await this.setState({ value: this.props.value, target: this.input });
    this.returnData();
  };
  returnData = async (e) => {
    if(this.props.getValue) await this.props.getValue(this.state);
    if(e && this.props.onBlur) await this.props.onBlur();
  }
  render() {
    const { name, value, placeholder, id, currentValue } = this.props;
    return (
      <InputWrap>
        <RadioLabel
          className={value === currentValue ? "checked" : null}
          htmlFor={id ? id+value : name+value}
          onClick={this.onChangeValue}
          >{placeholder}</RadioLabel>
        <input
          type="radio"
          id={id ? id+value : name+value}
          name={name && name}
          style={{display: "none"}}
          defaultValue={value && value}
          ref={ref => (this.input = ref)}
          onBlur={this.returnData}/>
        <Message></Message>
      </InputWrap>
    );
  }
}

FormRadio.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  target: PropTypes.func
};
