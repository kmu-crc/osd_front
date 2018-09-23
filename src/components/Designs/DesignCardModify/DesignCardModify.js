import React, { Component } from "react";
import styled from 'styled-components';
import {
  FormInput,
  FormTextArea,
  FormThumbnail
} from "components/Commons/FormItems";
import CardSourceDetail from "components/Designs/CardSourceDetail";
import { ValidationGroup } from "modules/FormControl";

const Label = styled.div`
  margin: 0 0 0.8rem 0;
  display: block;
  color: rgba(0,0,0,.87);
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: none;
`;

class DesignCardModify extends Component {
  shouldComponentUpdate(nextProps, nextState){
    if(this.state == null) return true;
    if(this.state.title){
      if(this.state.title.value !== nextState.title.value){
        return false;
      }
    }
    if(this.state.content){
      if(this.state.content.value !== nextState.content.value){
        return false;
      }
    }
    return true;
  }
  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);
    console.log(this.state);
  };

  onChangeImgtoBase64 = img => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = async () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(img);
    });
  };

  onSubmit = async (data, id, token) => {
    return new Promise((resolve, reject) => {
      ValidationGroup(this.state, true)
        .then(async res => {
          if (res["thumbnail[]"]) {
            let thumbObj = {
              img: null,
              file_name: null
            }
            thumbObj.img = await this.onChangeImgtoBase64(
              res["thumbnail[]"]
            );
            thumbObj.file_name = res["thumbnail[]"].name;
            res.thumbnail = thumbObj;
            delete res["thumbnail[]"];

          } else {
            res.thumbnail = null;
            delete res["thumbnail[]"];
          }
          res.data = data;
          this.props.UpdateCardSourceRequest(res, id, token)
          .then(() => {
            this.props.GetCardDetailRequest(id);
            resolve("aa");
          }).catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
  render() {
    console.log("detail", this.props.detail);
    return (
      <div>
        <Label>썸네일</Label>
        <FormThumbnail
          name="thumbnail"
          getValue={this.onChangeValue}
          image={this.props.card.first_img && this.props.card.first_img.m_img}
          placeholder="썸네일 등록"
          validates={["OnlyImages", "MaxFileSize(10000000)"]}
        />
        <Label>제목</Label>
        <FormInput
          name="title"
          value={this.props.detail.title}
          getValue={this.onChangeValue}
          validates={["Required", "MaxLength(20)"]}
        />
        <Label>설명</Label>
        <FormTextArea
          name="content"
          getValue={this.onChangeValue}
          value={this.props.detail.content}
        />
        <Label>컨텐츠</Label>
        <CardSourceDetail
          {...this.props}
          uid={this.props.uid}
          isTeam={this.props.isTeam}
          edit={true}
          closeEdit={this.props.closeEdit}
          openEdit={this.props.openEdit}
          upDateRequest={this.onSubmit}
        />
      </div>
    );
  }
}

export default DesignCardModify;
