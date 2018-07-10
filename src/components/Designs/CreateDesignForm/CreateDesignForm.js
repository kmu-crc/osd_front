import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import ValidateForm from "components/Commons/ValidateForm";
import CreateDesingFormContent from "components/Designs/CreateDesingFormContent";

class CreateDesignForm extends Component {
  state = {
    designs: [],
    sources: [],
    members: []
  }
  // state가 업데이트되면 component가 리렌더링 되면서 하위에 fileUploader component를 리렌더링한다.
  // 이때 업로드 파일 목록들이 초기화되기때문에 업로드된 파일의 정보를 저장할 수 없는 문제가 방생한다.
  // 그래서 CreateDesignForm Component에서는 state가 변하더라도 다시 렌더링 하지 말도록 설정하였다.
  shouldComponentUpdate(nextProps, nextState){
    console.log(JSON.stringify(this.state), JSON.stringify(nextState));
    if(JSON.stringify(this.state) !== JSON.stringify(nextState)){
      return false;
    } else {
      return true;
    }
  }
  onSubmitForm = (data) => {
    this.props.setLoader();
    data.delete("design_file[]");
    data.delete("source_file[]");
    data.delete("search");
    if(this.state.designs !== []){
      this.state.designs.map( item => {
        data.append("design_file[]", item, item.name);
      });
    }
    if(this.state.sources !== []){
      this.state.sources.map( item => {
        data.append("source_file[]", item, item.name);
      });
    }

    if(this.state.members !== []){
      data.append("members", JSON.stringify(this.state.members));
    }

    for (const [key, value]  of data.entries()) {
      console.log(key, value);
    }

    this.props.CreateDesignRequest(data, this.props.token).then( res => {
      if(res.success){
        this.props.history.push(`/designDetail/${res.design_id}`)
      }
      console.log(res);
    })
  }
  onChangeDesing = (data) => {
    this.setState({designs: data});
  }
  onChangeSource = (data) => {
    this.setState({sources: data})
  }
  onChangeMembers = (data) => {
    console.log(data);
    this.setState({members: data})
  }
  render() {
    const {GetCategoryLevel1Request, GetCategoryLevel2Request, category1, category2} = this.props;
    return (
      <ValidateForm onSubmit={this.onSubmitForm}>
        <CreateDesingFormContent
          GetCategoryLevel1Request={GetCategoryLevel1Request}
          GetCategoryLevel2Request={GetCategoryLevel2Request}
          category1={category1}
          category2={category2}
          onChangeDesing={this.onChangeDesing}
          onChangeSource={this.onChangeSource}
          onChangeMembers={this.onChangeMembers}/>
        <Button type="submit">등록</Button>
      </ValidateForm>
    );
  }
}

export default CreateDesignForm;
