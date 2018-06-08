import React, { Component } from "react";
import styled from "styled-components";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import { Button } from "semantic-ui-react";
import FormDataToJson from "modules/FormDataToJson"

const Board = styled.li`
  padding: 5px;
  width: 250px;
  float: left;
  box-sizing: border-box;
  background-color: #DBDADA;
  border-radius: 3px;
  input {
    width: 70% !important;
    float: left;
  }
  button {
    width: 29%;
    margin: 0 !important;
    margin-left: 1% !important;
    display: block !important;
    float: left;
    line-height: 1.21428571em !important;
    padding: .67857143em 1em !important;
    border: 1px solid #e0e1e2 !important;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: .67857143em 1em;
  cursor: pointer;
`

class CreateBoard extends Component {
  state = {
    active: false
  }
  formActive = () => {
    this.setState({ active: true } );
    setTimeout(() => {
      this.form._reactInternalFiber.child.child.stateNode.title.focus()
    }, 100);
  }
  handleSubmit = (data) => {
    let formData = FormDataToJson(data);
    formData.order = this.props.order;
    console.log(formData);
    this.props.CreateDesignBoardRequest(formData, this.props.designId, this.props.token).then( data => {
      this.props.GetDesignBoardRequest(this.props.designId);
    })
    this.setState({ active: false });
  }
  render() {
    return (
      <Board>
        {
          this.state.active
            ? <ValidateForm onSubmit={this.handleSubmit} ref={ ref => this.form = ref}>
              <FormInput name="title" type="text" placeholder="새 보드 추가" onBlur={() => this.setState({active: false})}/>
              <Button>생성</Button>
            </ValidateForm>
            : <Title onClick={this.formActive}>새 보드 추가 +</Title>
        }
      </Board>
    );
  }
}

export default CreateBoard;
