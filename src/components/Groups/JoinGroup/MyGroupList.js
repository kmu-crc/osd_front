import React, { Component } from "react";
import { FormField } from "components/Commons/FormField";
import { FormMultiSelect } from "components/Commons/FormItem";
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
class MyGroupList extends Component {
  state = {
    joinList: []
  }

  componentWillMount(){
    this.props.GetMyGroupListRequest(this.props.token, this.props.match.params.id);
  }

  handleSubmit = (data) => {
    const list = this.state.joinList;
    if (list.length > 0) {
      this.props.GroupJoinGroupRequest({"join_group": this.state.joinList}, this.props.token, this.props.match.params.id)
      .then(data => {
        this.props.handleCloseModal();
      });
    } else {
      return;
    }
  }

  getValue = data => {
    this.setState({
      joinList: data
    });
  }

  render() {
    console.log(this.props);
    return(
      <ValidateForm ignore={true} onSubmit={this.handleSubmit}>
      <Field>
        <label style={{fontSize:"20px",fontFamily:"Spoqa Han Sans Neo",marginBottom:"15px"}}>내 그룹 리스트</label>
        <FormField  name="join_group" options={this.props.groupList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <label style={{height:"30px",marginTop:"20px",display:"flex",alignItems:"center",fontWeight:"300",fontSize:"15px"}}/>
      </Field>
      <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <Btn style={{backgroundColor:"#1E9B79",marginRight:"64px"}} type="submit" onClick={this.handleSubmit}>가입 신청</Btn>
      <Btn style={{backgroundColor:"black"}} type="button" onClick={this.props.handleCloseModal}>취소</Btn>
      </div>
    </ValidateForm>

      // <ValidateForm onSubmit={this.handleSubmit}>
      //   <div style={{fontSize:"17px",paddingLeft:"20px"}}>
      //   <FormField name="join_group" label="내 그룹 리스트" options={this.props.groupList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
      //   </div>
      //   <div style={{height:"70px",marginBottom:"10px"}}>
      //   <Btn type="button" style={{bottom:"0px",left:"170px"}} onClick={this.props.handleCloseModal}>취소</Btn>
      //   <Btn type="submit" style={{bottom:"0px",left:"20px",background:"#FF0000"}} >가입 신청</Btn>
      //   </div>
      // </ValidateForm>
    );
  }
}

export default MyGroupList;
