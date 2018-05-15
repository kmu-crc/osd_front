import React, { Component } from "react";
import { Form, Input, Icon, Dropdown, Checkbox } from "semantic-ui-react";
import Validates from "../../../modules/Validates";

export class InputField extends Component {
  state = {
    status: null,
    message: null,
    value: ""
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  onChangeValue = async (event) => {
    const target = event.target;
    const value = target.value;
    console.log(value);
    let next = true;
    // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
    const whatIsStatus = (status) => {
      if (!status) {
        this.setState({
          status: "SUCCESS",
          message: null,
          value
        });
      } else {
        this.setState({
          status: null,
          message: status,
          value
        });
        // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
        next = false;
      }
    }
    this.setState({ value });
    if (this.props.validates) {
      for (let vali of this.props.validates) {
        //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
        if (!next) break;
        if (!Validates[vali]) {
          // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
          console.log("잘못된 값입니다.");
        } else {
          await Validates[vali](value).then(whatIsStatus);
        }
      }
    } else {
      this.setState({
        status: "SUCCESS",
        message: null,
        value
      });
    }
  }
  render() {
    const { label, type, name, placeholder } = this.props;
    return (
      <Form.Field>
        <label>{label}</label>
        <input status={this.state.status} value={this.state.value} name={name} type={type} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </Form.Field>
    )
  }
}

// 두개의 input의 내용이 같은지 검증할때 사용하는 component
export class OverlapField extends Component {
  state = {}
  componentWillMount() {
    let obj = {};
    let data = {
      status: null,
      message: null,
      value: ""
    }
    // state에 각각의 name으로 초기값을 설정함
    // OverlapField component는 하나의 name, label을 받아서 name뒤에 2를 붙여 두번째 input을 만든다.
    obj[this.props.name] = { ...data };
    obj[this.props.name + "2"] = { ...data }
    this.setState(obj);
  }

  onChangeValue = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.onCheckInput(value, name)
  }

  onCheckInput = (value, name) => {
    return new Promise((resolve, reject) => {
      let obj = {};
      let next = true;
      // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
      const whatIsStatus = (status) => {
        if (!status) {
          obj[name] = {
            ...this.state[name],
            status: "SUCCESS",
            message: null,
            value
          }
          this.setState(obj);
        } else {
          obj[name] = {
            ...this.state[name],
            status: null,
            message: status,
            value
          }
          this.setState(obj);
          next = false;
        }
      }
      if (this.props.validates) {
        for (let vali of this.props.validates) {
          if (!next) break;
          if (!Validates[vali]) {
            console.log("잘못된 값입니다.");
          } else {
            Validates[vali](value).then(whatIsStatus)
          }
        }
      }
      resolve(true);
    });
  }
  overlapCheck = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    let obj = {};
    this.onCheckInput(value, name).then(() => {
      if (this.state[this.props.name + "2"].value && this.state[this.props.name].value !== this.state[this.props.name + "2"].value) {
        obj[name] = {
          ...this.state[name],
          status: null,
          message: `${this.props.label}의 값이 다릅니다.`,
          value
        }
        this.setState(obj);
      }
    })
  }
  render() {
    const { label, type, name, placeholder } = this.props;
    return (
      <div>
        <Form.Field>
          <label>{label}</label>
          <input status={this.state[name].status} value={this.state[name].value} name={name} type={type} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
          {this.state[name].status == null ? <span>{this.state[name].message}</span> : null}
        </Form.Field>
        <Form.Field>
          <label>{label} 확인</label>
          <input status={this.state[name + "2"].status} value={this.state[name + "2"].value} name={name + "2"} type={type} placeholder={placeholder + " 확인"} onChange={this.overlapCheck} onBlur={this.overlapCheck} />
          {this.state[name + "2"].status == null ? <span>{this.state[name + "2"].message}</span> : null}
        </Form.Field>
      </div>

    )
  }
}

export class TextAreaField extends Component {
  state = {
    status: null,
    message: null,
    value: ""
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  onChangeValue = async (event) => {
    const target = event.target;
    const value = target.value;
    let next = true;
    // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
    const whatIsStatus = (status) => {
      if (!status) {
        this.setState({
          status: "SUCCESS",
          message: null,
          value
        });
      } else {
        this.setState({
          status: null,
          message: status,
          value
        });
        // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
        next = false;
      }
    }
    this.setState({ value });
    if (this.props.validates) {
      for (let vali of this.props.validates) {
        //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
        if (!next) break;
        if (!Validates[vali]) {
          // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
          console.log("잘못된 값입니다.");
        } else {
          await Validates[vali](value).then(whatIsStatus);
        }
      }
    } else {
      this.setState({
        status: "SUCCESS",
        message: null,
        value
      });
    }
  }
  render() {
    const { label, type, name, placeholder } = this.props;
    return (
      <Form.Field>
        <label>{label}</label>
        <textarea status={this.state.status} value={this.state.value} name={name} type={type} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} ></textarea>
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </Form.Field>
    )
  }
}

export class SelectField extends Component {
  state = {
    status: null,
    message: null,
    value: ""
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)) {
      console.log(this.props.options[0].value);
      this.setState({ value: this.props.options[0].value });
      if (this.props.getValue) this.props.getValue(this.props.options[0].value);
    }
  }
  onChangeValue = async (event, { text, value }) => {
    const target = event.target;
    console.log(text, value)
    let MenuValue = target.childNodes[0].textContent;
    // let value = "";
    if (this.props.options) {
      this.props.options.map(data => {
        console.log(data, MenuValue);
        if (data.text === MenuValue) {
          value = data.value;
        }
      })
    }
    let next = true;
    // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
    const whatIsStatus = (status) => {
      if (!status) {
        this.setState({
          status: "SUCCESS",
          message: null,
          value
        });
      } else {
        this.setState({
          status: null,
          message: status,
          value
        });
        // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
        next = false;
      }
    }
    this.setState({ value });
    if (this.props.getValue) this.props.getValue(value);
    if (this.props.validates) {
      for (let vali of this.props.validates) {
        //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
        if (!next) break;
        if (!Validates[vali]) {
          // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
          console.log("잘못된 값입니다.");
        } else {
          await Validates[vali](value).then(whatIsStatus);
        }
      }
    } else {
      this.setState({
        status: "SUCCESS",
        message: null,
        value
      });
    }
  }
  render() {
    const { label, options, name, placeholder } = this.props;
    return (
      <Form.Field>
        <label>{label}</label>
        <select style={{ display: "none" }} status={this.state.status} value={this.state.value} name={name} >
          {this.props.options ? options.map(data => {
            return <option key={data.text} value={data.value}>{data.text}</option>
          }) : null}
        </select>
        <Dropdown selection options={options} onChange={this.onChangeValue} value={this.state.value} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </Form.Field>
    )
  }
}

export class FileField extends Component {
  state = {
    status: null,
    message: null,
    value: ""
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  onChangeValue = async (event) => {
    const target = event.target;
    const value = target.files[0];
    if (this.props.freeView) {
      this.props.freeView(value);
    }
    console.log(value);
    let next = true;
    // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
    const whatIsStatus = (status) => {
      if (!status) {
        this.setState({
          status: "SUCCESS",
          message: null,
          value
        });
      } else {
        this.setState({
          status: null,
          message: status,
          value
        });
        // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
        next = false;
      }
    }
    this.setState({ value });
    if (this.props.validates) {
      for (let vali of this.props.validates) {
        //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
        if (!next) break;
        if (!Validates[vali]) {
          // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
          console.log("잘못된 값입니다.");
        } else {
          await Validates[vali](value).then(whatIsStatus);
        }
      }
    } else {
      this.setState({
        status: "SUCCESS",
        message: null,
        value
      });
    }
  }
  render() {
    const { label, name, placeholder } = this.props;
    return (
      <Form.Field>
        <label>{label}</label>
        <input type="file" status={this.state.status} name={name} placeholder={placeholder} onChange={this.onChangeValue} onBlur={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </Form.Field>
    )
  }
}

export class CheckBoxField extends Component {
  state = {
    status: null,
    message: null,
    value: ""
  }
  componentWillMount() {
    if (!this.props.validates) {
      this.setState({ status: "SUCCESS" });
    }
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  componentDidMount() {
    this.checkbox._reactInternalFiber.child.child.stateNode.attributes.status = this.state.status;
  }
  onChangeValue = async (event) => {
    const target = event.target.parentNode;
    const value = !this.checkbox.state.checked;
    console.log(target.childNodes[0].attributes.readonly);
    target.childNodes[0].attributes.readonly = false;
    // contains는 원래 찾는 class가 있으면 true를 반환하는데
    // 어째서인지 지금은 한박자씩 느리게 동작하여 없을 경우 true가 반환된다.
    console.log(value);
    target.childNodes[0].checked = value;
    console.log("checked", target.childNodes[0].checked)
    target.childNodes[0].attributes.status = this.state.status;
    let next = true;
    // loop 안에서 새로운 함수를 정의하지 못하게 권장하기 때문에 반복문에 사용될 함수를 미리 정의
    const whatIsStatus = (status) => {
      if (!status) {
        this.setState({
          status: "SUCCESS",
          message: null,
          value
        });
      } else {
        this.setState({
          status: null,
          message: status,
          value
        });
        // 검증에 실패하였기 때문에 다음 반복문을 멈추기 위하여 next값을 false로 바꿔준다.
        next = false;
      }
    }
    this.setState({ value });
    if (this.props.validates) {
      for (let vali of this.props.validates) {
        //첫번째 검증을 통과하지 못하면 반복문을 멈춘다.
        if (!next) break;
        if (!Validates[vali]) {
          // Validates에 전달받은 이름의 검증 로직이 없으면 잘못전달되었다고 콘솔에 띄운다.
          console.log("잘못된 값입니다.");
        } else {
          await Validates[vali](value).then(whatIsStatus);
        }
      }
    } else {
      this.setState({
        status: "SUCCESS",
        message: null,
        value
      });
    }
  }
  render() {
    const { label, name, placeholder } = this.props;
    return (
      <Form.Field>
        <label>{label}</label>
        <Checkbox status={this.state.status} name={name} ref={ref => this.checkbox = ref} label={placeholder} onClick={this.onChangeValue} />
        {this.state.status == null ? <span>{this.state.message}</span> : null}
      </Form.Field>
    )
  }
}
