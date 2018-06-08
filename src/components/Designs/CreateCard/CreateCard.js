import React, { Component } from "react";
import styled from "styled-components";
import ValidateForm from "components/Commons/ValidateForm";
import { FormInput } from "components/Commons/FormItem";
import { Button, Icon } from "semantic-ui-react";
import FormDataToJson from "modules/FormDataToJson"

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: .67857143em 1em;
  cursor: pointer;
  /* background-color: white; */
`

const ButtonWrap = styled.div`
  margin-top: 1rem;
`

const CloseBtn = styled(Button)`
  background-color: transparent !important;
  border: 0 !important;
  padding: 10px !important;
  margin-left: 10px !important;
`

class CreateCard extends Component {
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
    formData.order = 0;
    this.props.CreateDesignCardRequest(formData, this.props.designId, this.props.boardId, this.props.token).then(
      this.props.GetDesignBoardRequest(this.props.designId)
    );
    this.setState({ active: false });
  }

  handelClose = () => {
    this.setState({ active: false });
  }
  render() {
    return(
      <div>
        {this.state.active
        ? <ValidateForm onSubmit={this.handleSubmit} ref={ ref => this.form = ref }>
          <FormInput name="title" type="text" placeholder="새로운 카드의 제목을 입력해주세요."/>
          <ButtonWrap>
            <Button type="submit">생성</Button>
            <CloseBtn type="button" onClick={this.handelClose} ><Icon name="close"/></CloseBtn>
          </ButtonWrap>
        </ValidateForm>
        : <Title onClick={this.formActive}>카드 추가하기 +</Title>}
      </div>
    );
  }
}

export default CreateCard;
