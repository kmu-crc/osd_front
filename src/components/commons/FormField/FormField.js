import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import Validates from "modules/Validates";

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

export class FormField extends Component {
  render(){
    const {label, RenderComponent} = this.props;
    const newProps = {...this.props};
    delete newProps.RenderComponent;
    return (
      <Form.Field>
        <label>{label}</label>
        <RenderComponent {...newProps}/>
      </Form.Field>
    );
  }
}
