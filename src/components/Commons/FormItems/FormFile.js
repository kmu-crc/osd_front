import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import { FormControl } from "modules/FormControl";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  input {
    display: ${props => props.display};
  }
`

const Message = styled.div`
  bottom: -1.5rem;
  display: block;
  position: absolute;
  color: ${opendesign_style.color.main.basic};
  left: 0;
  margin-left:55px;
`

export class FormFile extends Component {
  state = {
    value: [],
    target: null,
    validates: []
  };

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    this.init();
  }

  init = async () => {
    await this.setState({ target: this.input })
    this.returnData();
  }

  onChangeValue = async e => {
    const event = { ...e };
    const target = event.currentTarget;
    await this.setState({ value: target.files, target });
    FormControl(this.state).then(data => {
      this.returnData();
    }).catch(err => {
      console.log("formFile", err);
    });
  };

  returnData = async (e) => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (e && this.props.onBlur) await this.props.onBlur();
  }
  render() {
    const { name, placeholder, /*style,*/ id, hidden, onlyImage } = this.props;
    return (
      <InputWrap display={hidden ? "none" : "block"}>
        <input type="file" name={name && `${name}[]`} placeholder={placeholder && placeholder}
          id={id ? id : name} onChange={this.onChangeValue} ref={ref => (this.input = ref)}
          className="" accept={onlyImage ? "image/*" : "*"} />
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
