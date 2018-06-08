import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";

const CardContent = styled.div`
  margin-bottom: 2rem;
`

const TextArea = styled(FormTextArea) `
  margin-bottom: 1rem !important;
`

export class CardContentUpdate extends Component {
  state = {
    open: "INIT",
    content: ""
  }
  componentWillMount() {
    this.setState({ open: this.props.active })
  }
  onClose = () => {
    this.setState({ open: false })
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
      <CardContent>
        <h3>설명</h3>
        {this.props.active === "content"
          ? <ValidateForm onSubmit={this.handleSubmit}>
            <TextArea name="content" value={this.props.content} placeholder="디자인의 설명을 입력해주세요." />
            <Button type="submit">저장</Button>
            <Button type="button" onClick={() => this.props.changeActive("INIT")}>닫기</Button>
          </ValidateForm>
          : <p onClick={ () => this.props.changeActive("content") }>
          { this.props.content || "설명이 없습니다."}
          </p>
        }
      </CardContent>
    );
  }
};
