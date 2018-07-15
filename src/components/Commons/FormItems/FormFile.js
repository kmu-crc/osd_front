import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { FormControl } from "modules/FormControl";

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

const Input = styled.input`
  margin: 0;
  outline: 0;
  -webkit-appearance: none;
  line-height: 1.21428571em;
  padding: 0.67857143em 1em;
  font-size: 1em;
  background: #fff;
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  color: ${StyleGuide.color.geyScale.scale7};
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color 0.1s ease, border-color 0.1s ease;
  &::placeholder {
    color: ${StyleGuide.color.geyScale.scale5};
  }
  &:focus {
    &::placeholder {
      color: ${StyleGuide.color.geyScale.scale7};
    }
    border-color: #85b7d9;
    box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
  }
  &.error {
    border: 1px solid ${StyleGuide.color.main.basic};
    color: ${StyleGuide.color.main.basic};
    &::placeholder {
      color: ${StyleGuide.color.main.basic};
    }
  }
`;

export class FormFile extends Component {
  state = {
    value: [],
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
    await this.setState({target: this.input})
    this.returnData();
  }

  onChangeValue = async e => {
    const event = { ...e };
    const target = event.currentTarget;
    await this.setState({ value: target.files, target });
    FormControl(this.state)
    this.returnData();
  };

  returnData = async (e) => {
    if(this.props.getValue) await this.props.getValue(this.state);
    if(e && this.props.onBlur) await this.props.onBlur();
  }
  render() {
    const { name, placeholder, style, id, hidden, onlyImage } = this.props;
    return (
      <InputWrap>
        <input
          type="file"
          name={name && name}
          placeholder={placeholder && placeholder}
          style={style && style}
          id={id ? id : name}
          onChange={this.onChangeValue}
          ref={ref => (this.input = ref)}
          style={ hidden ? {display:  "none"} : null }
          className=""
          accept={onlyImage ? "image/*" : "*"}
        />
        <Message></Message>
      </InputWrap>
    );
  }
}

FormFile.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
