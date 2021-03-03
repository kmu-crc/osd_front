import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import market_style from "market_style";
const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;
const Message = styled.div`
  display: block;
  position: absolute;
  color: ${StyleGuide.color.main.basic};
  left: 0;
  bottom: -1.5rem;
`;
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
    font-size: ${market_style.font.size.mini1};
    left: 4px;
    top: -1px;
  }
  &.disabled{
    color: ${StyleGuide.color.geyScale.scale6}
    // text-decoration-line: line-through;
  }
`;

export class FormCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.value, target: null, validates: [] };
    this.init = this.init.bind(this);
    this.returnData = this.returnData.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    this.setState({ value: this.props.value || false });
    this.init();
  };

  init = async () => {
    await this.setState({ target: this.input })
    this.returnData();
  };
  onChangeValue = async e => {
    await this.setState({ value: !this.state.value, target: this.input });
    this.returnData();
  };
  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  };

  render() {
    const { name, value, disableMsg, disabled, placeholder, id } = this.props;
    return (
      <InputWrap>
        {disabled ?
          (<CheckBoxLabel className={this.state.value ? "disabled checked" : null} htmlFor={id ? id + value : name + value} onBlur={this.returnData} title={disableMsg}>{placeholder}</CheckBoxLabel>) :
          (<CheckBoxLabel className={this.state.value ? "checked" : null} htmlFor={id ? id + value : name + value} onClick={this.onChangeValue} onBlur={this.returnData} >{placeholder}</CheckBoxLabel>)}
        <input type="checkbox" id={id ? id + value : name + value} name={name && name} style={{ display: "none" }} defaultValue={value && value} ref={ref => (this.input = ref)} />
        <Message />
      </InputWrap>
    )
  }
};

FormCheckBox.propTypes = {
  disabled: PropTypes.bool,
  disableMsg: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};
