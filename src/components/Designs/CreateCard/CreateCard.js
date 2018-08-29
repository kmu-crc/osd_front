import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";

const Title = styled.div`
  font-size: 1em;
  font-weight: 600;
  padding: 0.67857143em 1em;
  cursor: pointer;
  /* background-color: white; */
`;

const ButtonWrap = styled.div`
  margin-top: 1rem;
`;

const CloseBtn = styled(Button)`
  background-color: transparent !important;
  border: 0 !important;
  padding: 10px !important;
  margin-left: 10px !important;
`;

const FInput = styled.div`
  & > div {
    margin-bottom: 1.5rem;
  }
`;

class CreateCard extends Component {
  state = {
    active: false
  };
  formActive = async () => {
    await this.setState({ active: true });
    setTimeout(() => {
      this.state.title.target.focus();
    }, 100);
  };

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    ValidationGroup(this.state, true)
      .then(data => {
        data.order = this.props.lastOrder;
        this.props
          .CreateDesignCardRequest(data, this.props.designId, this.props.boardId, this.props.token)
          .then(res => {
            if (res.success === true) {
              this.props.GetDesignBoardRequest(this.props.designId);
            } else {
              this.props.GetDesignBoardRequest(this.props.designId);
            }
          });
        this.setState({ active: false });
      })
      .catch(err => console.log("실패", err));
  };

  handelClose = (e) => {
    if(e.type === "blur" && !this.form.contains(
      e.relatedTarget
    )){
      this.setState({ active: false });
    } else if(e.type === "click") {
      this.setState({ active: false });
    }
  };
  render() {
    return (
      <div>
        {this.state.active ? (
          <form onSubmit={this.handleSubmit} ref={ref => (this.form = ref)} tabIndex="1" onBlur={this.handelClose}>
            <FInput>
              <FormInput
                name="title"
                placeholder="새로운 컨텐츠의 제목을 입력해주세요."
                getValue={this.onChangeValue}
                validates={["Required"]}
              />
            </FInput>

            <ButtonWrap>
              <Button type="submit">생성</Button>
              <CloseBtn type="button" onClick={this.handelClose}>
                <Icon name="close" />
              </CloseBtn>
            </ButtonWrap>
          </form>
        ) : (
          <Title onClick={this.formActive}>컨텐츠 추가하기 +</Title>
        )}
      </div>
    );
  }
}

export default CreateCard;
