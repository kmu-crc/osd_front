import React, { Component } from "react";
import ValidateForm from "components/Commons/ValidateForm";
import Button from "components/Commons/Button";
import styled from "styled-components";
import { Dropdown, Form } from "semantic-ui-react";
import opendesign_style from "opendesign_style";

const Btn = styled.div`
  width:104px;
  height:41px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:17px;
  font-weight:500;
  color:white;
  border:none;
  border-radius:0px;
  box-shadow: 8px 8px 8px #0000002B;
  cursor:pointer;
  &:hover{
    outline:none;
  }
`;

const Field = styled(Form.Field)`
  label {
    /* font-size: ${opendesign_style.font.size.paragraph} !important; */
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
    //console.log("upstair: ", data)
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
    //console.log("state", this.state.joinList)
    console.log(this.refs.dropdown.state.value)
  }
  render() {
    return (
      <ValidateForm ignore={true} onSubmit={this.handleSubmit}>
        <Field>
          <label style={{fontSize:"20px",fontFamily:"Spoqa Han Sans Neo"}}>내 디자인 리스트</label>
          <Dropdown style={{marginTop:"11px",width:"100%"}} name="join_design" ref="dropdown" selection multiple onChange={this.handleChange} options={this.props.designList} />
          <label style={{height:"30px",marginTop:"20px",display:"flex",alignItems:"center",fontWeight:"300",fontSize:"15px"}}><input style={{ verticalAlign: "middle",borderRadius:"0px !important", width:"30px",height:"30px",marginRight:"10px" }} type="checkbox" onChange={this.selectAll} value={this.state.joinList} />모두선택 </label>
        </Field>
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
        <Btn style={{backgroundColor:"#1E9B79",marginRight:"64px"}} type="submit" onClick={this.handleSubmit}>가입 신청</Btn>
        <Btn style={{backgroundColor:"black"}} type="button" onClick={this.props.handleCloseModal}>취소</Btn>
        </div>
      </ValidateForm>
    );
  }
}

export default MyDesignList;
