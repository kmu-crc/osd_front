import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import { FormTextArea } from "components/Commons/FormItem";
import FormDataToJson from "modules/FormDataToJson";

const CardContent = styled.div`
  margin-bottom: 2rem;
`;

const TextArea = styled(FormTextArea)`
  margin-bottom: 1rem !important;
`;

const TitleWrap = styled.div`
  position: relative;
`;

const EditBtn = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  top: 0;
  right: 0;
`;

export class CardContentUpdate extends Component {
  state = {
    open: "INIT",
    content: ""
  };
  componentWillMount() {
    this.setState({ open: this.props.active });
  }
  onClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = data => {
    console.log(data);
    const formData = FormDataToJson(data);
    this.props.request(formData, this.props.token, this.props.uid).then(() => {
      this.props.changeActive("INIT");
    });
  };

  onActive = () => {
    this.props.changeActive("content");
  };
  render() {
    return (
      <CardContent>
        <TitleWrap>
          <h3>설명</h3>
          {this.props.isTeam > 0 &&
            this.props.active !== "content" && (
              <EditBtn onClick={this.onActive}>
                <Icon name="edit" />수정하기
              </EditBtn>
            )}
        </TitleWrap>
        {this.props.active === "content" && this.props.isTeam > 0 ? (
          <ValidateForm onSubmit={this.handleSubmit}>
            <TextArea
              name="content"
              maxLength="1000"
              value={this.props.content}
              placeholder="디자인의 설명을 입력해주세요. (1000자 이내)"
            />
            <Button type="submit">저장하기</Button>
            <Button
              type="button"
              onClick={() => this.props.changeActive("INIT")}
            >
              닫기
            </Button>
          </ValidateForm>
        ) : (
          <p onClick={this.onActive}>
            {this.props.content || ""}
          </p>
        )}
      </CardContent>
    );
  }
}
