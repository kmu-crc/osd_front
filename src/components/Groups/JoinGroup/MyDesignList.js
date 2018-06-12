import React, { Component } from "react";
import { FormMultiSelect } from "components/Commons/FormItem";
import { FormField } from "components/Commons/FormField";
import ValidateForm from "components/Commons/ValidateForm";
import { Button } from "semantic-ui-react";

class MyDesignList extends Component {
  state = {
    joinList: []
  }
  componentWillMount(){
    console.log(this.props);
    this.props.GetMyDesignListRequest(this.props.token, this.props.match.params.id).then(data => {
      console.log(data);
    })
  }
  handleSubmit = (data) => {
    console.log("multiSelect", this.state.joinList);
    this.props.JoinGroupRequest({"join_design": this.state.joinList}, this.props.token, this.props.match.params.id)
    .then(data => {
      this.props.handleCloseModal();
    })
  }

  getValue = (data) => {
    console.log("multiSelect1", this.state.joinList);

    this.setState({joinList: data});
  }

  render() {
    return(
      <ValidateForm onSubmit={this.handleSubmit}>
        <FormField name="join_design" label="내 디자인 리스트" options={this.props.designList} RenderComponent={FormMultiSelect} getValue={this.getValue}/>
        <Button type="submit">등록</Button>
        <Button type="button" onClick={this.props.handleCloseModal}>닫기</Button>
      </ValidateForm>
    );
  }
}

export default MyDesignList;
