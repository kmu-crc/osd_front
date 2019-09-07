import React, { Component } from "react";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import styled from "styled-components";
import { Dropdown, Form } from "semantic-ui-react";
import StyleGuide from "StyleGuide";

const Btn = styled(Button)`
  font-size:17px;
  border:none;
  position:absolute;
  &:hover{
    outline:none;
  }
`;

const Field = styled(Form.Field)`
  label {
    /* font-size: ${StyleGuide.font.size.paragraph} !important; */
  }
`
class MyDesignList extends Component {
  state = {
    joinList: []
  }

  componentWillMount() {
    this.props.GetMyDesignListRequest(this.props.token, this.props.match.params.id);
  }

  handleSubmit = (data) => {
    const list = this.refs.dropdown.state.value
    if (list.length > 0) {
      this.props.JoinGroupRequest({ "join_design": list }, this.props.token, this.props.match.params.id)
        .then(data => { this.props.handleCloseModal() });
    } else {
      return;
    }
  }

  getValue = (data) => {
    console.log("upstair: ", data)
    this.setState({ joinList: data });
  }

  selectAll = async (event) => {
    const target = event.target
    let dropdown = this.refs.dropdown
    if (target.checked) {
      let value = []
      value = this.props.designList.map((obj) => { return (obj.value)})
      await dropdown.setState({ value })
    } else {
      await dropdown.setState({ value: [] })
    }
    this.setState({ joinList: dropdown.state.value })
    console.log(this.state.joinList)
  }
  handleChange = async (e, { value }) => {
    console.log(this.refs.dropdown.state.value)
    console.log(value, { value })
    await this.refs.dropdown.setState({ value })
    console.log("state", this.state.joinList)
    console.log(this.refs.dropdown.state.value)
  }
  render() {
    return (
      <ValidateForm ignore={true} onSubmit={this.handleSubmit}>
        <Field>
          <label style={{fontSize:"17px",paddingLeft:"20px"}}>내 디자인 리스트</label>
          <Dropdown style={{margin:"20px",width:"95%"}} name="join_design" ref="dropdown" selection multiple onChange={this.handleChange} options={this.props.designList} />
          <label style={{fontSize:"17px",paddingLeft:"20px"}}><input style={{ verticalAlign: "middle", width:"15px",height:"15px",marginRight:"10px" }} type="checkbox" onChange={this.selectAll} value={this.state.joinList} />모두선택 </label>
        </Field>
        <div style={{height:"50px",marginBottom:"10px"}}>
        <Btn style={{bottom:"0px",left:"20px",background:"#FF0000"}} type="submit">가입 신청</Btn>
        <Btn style={{bottom:"0px",left:"170px"}} type="button" onClick={this.props.handleCloseModal}>취소</Btn>
        </div>
      </ValidateForm>
    );
  }
}

export default MyDesignList;
