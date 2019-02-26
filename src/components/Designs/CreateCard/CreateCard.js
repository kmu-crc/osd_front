import React, { Component } from "react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.67857143em 1em;
  cursor: pointer;
  /* background-color: white; */
`;

const ButtonWrap = styled.div`
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
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
        this.props.CreateDesignCardRequest(data, this.props.designId, this.props.boardId, this.props.token)
          .then(res => {
            if (res.success === true) {
              this.props.GetDesignBoardRequest(this.props.designId);
            } else {
              this.props.GetDesignBoardRequest(this.props.designId);
            }
          })
          .then(this.props.UpdateDesignTime(this.props.designId, this.props.token))
          .then(this.props.GetDesignDetailRequest(this.props.designId, this.props.token));
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
                maxLength="20"
                placeholder="새로운 컨텐츠의 제목을 입력해주세요."
                getValue={this.onChangeValue}
                validates={["Required"]}
              />
            </FInput>

            <ButtonWrap>
              <Button color="Primary" type="submit" size="small">생성</Button>
              <Button color="Primary" type="button" size="small" onClick={this.handelClose}>
                취소
              </Button>
            </ButtonWrap>
          </form>
        ) : (
          <Title onClick={this.formActive}>컨텐츠 추가 +</Title>
        )}
      </div>
    );
  }
}

export default CreateCard;
