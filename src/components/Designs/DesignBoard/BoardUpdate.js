import React, { Component } from "react";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import styled from "styled-components";

const Update = styled.div`
  padding: 10px 0;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
`;

const FInput = styled.div`
  & > div {
    margin-bottom: 1.5rem;
  }
`;

class BoardUpdate extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.state.title.target.focus();
    }, 100);
  }
  onSubmit = e => {
    e.preventDefault();

    ValidationGroup(this.state, true)
      .then(data => {
        data.order = this.props.lastOrder;
        this.props
          .onUpdate(this.props.board.uid, this.props.token, data)
          .then(() => {
            this.props.designTime(this.props.board.design_id, this.props.token);
            this.props.getBoard(this.props.board.design_id);
            this.props.ModifyComplete();
          })
        this.setState({ active: false });
      })
      .catch(err => console.log("실패", err));
  };

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  handelClose = e => {
    console.log("blur");
    if (e.type === "blur" && !this.form.contains(e.relatedTarget)) {
      this.props.ModifyComplete();
    }
  };

  handelCloseBtn = () => {
    this.props.ModifyComplete();
  };

  render() {
    return (
      <Update>
        <form
          onSubmit={this.onSubmit}
          onFocus={this.onActive}
          ref={ref => (this.form = ref)}
          tabIndex="1"
          onBlur={this.handelClose}
        >
          <FInput>
            <FormInput
              name="title"
              type="text"
              value={this.props.value}
              placeholder="새 보드 추가 (20자 이내)"
              maxLength="20"
              getValue={this.onChangeValue}
              validates={["Required"]}
            />
          </FInput>
          <ButtonWrap>
            <Button type="submit" size="small">수정</Button>
            <Button type="button" size="small" onClick={this.handelCloseBtn}>
              취소
            </Button>
          </ButtonWrap>
        </form>
      </Update>
    );
  }
}

export default BoardUpdate;
