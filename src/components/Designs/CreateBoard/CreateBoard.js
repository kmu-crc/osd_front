import React, { Component } from "react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";

const Board = styled.li`
  padding: 5px;
  width: 250px;
  float: left;
  box-sizing: border-box;
  background-color: #dbdada;
  border-radius: 3px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.67857143em 1em;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  width: 100%;
  font-size: 1rem;
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

class CreateBoard extends Component {
  state = {
    active: false
  };

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  formActive = async () => {
    await this.setState({ active: true });
    setTimeout(() => {
      this.state.title.target.focus();
    }, 100);
  };

  handleSubmit = async e => {
    e.preventDefault();

    await ValidationGroup(this.state, true)
      .then(data => {
        data.order = this.props.order;
        this.props.CreateDesignBoardRequest(data,this.props.designId, this.props.token)
        .then(() => { this.props.GetDesignBoardRequest(this.props.designId);})
        .then(this.props.UpdateDesignTime(this.props.designId, this.props.token));
        this.setState({ active: false });
      })
      .catch(err => console.log(err,"실패"));
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
      <Board>
        {this.state.active ? (
          <form onSubmit={this.handleSubmit} ref={ref => (this.form = ref)} tabIndex="1" onBlur={this.handelClose}>
            <FInput>
              <FormInput
                name="title"
                placeholder="새 단계 추가 (20자 이내)"
                maxLength="20"
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
          <Title onClick={this.formActive}>단계 추가 +</Title>
        )}
      </Board>
    );
  }
}

export default CreateBoard;
