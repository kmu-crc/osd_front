import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import { Dropdown } from "semantic-ui-react";

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  width: 50%;
  float: left;
  &::after{
    content: "";
    display: block;
    clear: both;
  }
`;

const Message = styled.div`
  display: block;
  position: absolute;
  color: ${StyleGuide.color.main.basic};
  left: 0;
  bottom: -1.5rem;
`;

const FormDropBox = styled(Dropdown)`
  width: 100%;
`;

export class FormSelect extends Component {
  state = {
    value: "",
    target: null,
    validates: [],
    render: false
  };

  componentDidMount() {
    if (this.props.validates) {
      this.setState({ validates: this.props.validates });
    }
    this.init();
  }

  componentDidUpdate(prevProps) {
    // 이전에 전달받은 options와 다르다면 새롭게 options를 render하고 그중 제일 첫번째 요소를 선택한다.
    if (
      JSON.stringify(prevProps.options) !==
        JSON.stringify(this.props.options) ||
      JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)
    ) {
      this.setValue();
    }
  }

  setValue = async () => {
    // 전달받은 value가 Number의 형태를 하고 있지만 type이 string일 경우 검사하여
    // Number로 바꿔주는 로직
    let value = this.props.value;
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    }
    // FormDropBox component의 defaultValue는 처음 render되었을때만 동작하기 때문에
    // 중간에 전달되는 value가 바뀌어도 defaultValue는 동작하지 않는다.
    // 때문에 state에 render 항목을 만들 props가 변경될 때 마다 FormDropBox를 비활성화 했다
    // 다시 활성화 시키는 방법으로 defaultValue 를 정상적으로 동작하게 만들었다.
    await this.setState({ render: false });
    if (this.props.options.length > 0 && value) {
      await this.setState({ value: value });
    }
    if (this.props.options.length > 0 && value == null) {
      await this.setState({ value: this.props.options[0].value });
    }
    await this.setState({ render: true });
  };

  init = async () => {
    await this.setState({ value: this.props.currentValue, target: this.input });
    await this.setValue();
    this.returnData();
  };

  onChangeValue = async (event, {value}) => {
    await this.setState({ value: value, target: this.input });
    this.returnData();
  };
  returnData = async e => {
    if (this.props.getValue) await this.props.getValue(this.state);
    if (this.props.onChange) await this.props.onChange();
    if (e && this.props.onBlur) await this.props.onBlur();
  };
  render() {
    const { name, value, id, options, selection } = this.props;
    return (
      <InputWrap>
        {this.state.render ? (
          <FormDropBox
            selection={selection}
            options={options}
            onChange={this.onChangeValue}
            defaultValue={this.state.value}
          />
        ) : null}
        <select
          style={{ display: "none" }}
          readOnly
          value={this.state.value}
          id={id ? id + value : name + value}
          name={name && name}
          ref={ref => this.input = ref}
        >
          {options
            ? options.map(data => {
                return (
                  <option key={data.text} value={data.value}>
                    {data.text}
                  </option>
                );
              })
            : null}
        </select>
        <Message />
      </InputWrap>
    );
  }
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  target: PropTypes.func
};
