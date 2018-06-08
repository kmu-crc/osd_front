import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";

const CardTitle = styled.div`
  margin-bottom: 2rem;
`

const Input = styled(FormInput) `
  margin-bottom: 1rem !important;
`

export class CardTitleUpdate extends Component {
  state = {
    open: "INIT",
    title: ""
  }

  componentWillMount() {
    this.setState({ open: this.props.active });
  }

  onClose = () => {
    this.setState({ open: false });
  }
  handleSubmit = (data) => {
    console.log(data);
    const formData = FormDataToJson(data);
    this.props.request(formData, this.props.token, this.props.uid).then(() => {
      this.props.changeActive("INIT");
    });
  }
  render() {
    return (
      <CardTitle>
        {this.props.active === "title"
          ? <ValidateForm onSubmit={this.handleSubmit}>
            <h3>제목</h3>
            <Input name="title" label="제목" value={this.props.title} placeholder="제목을 입력해주세요." type="text" />
            <Button type="submit">저장</Button>
            <Button type="button" onClick={() => this.props.changeActive("INIT")}>닫기</Button>
          </ValidateForm>
          : <h1 onClick={ () => this.props.changeActive("title") }>{this.props.title}</h1>
        }
      </CardTitle>
    );
  }
};
