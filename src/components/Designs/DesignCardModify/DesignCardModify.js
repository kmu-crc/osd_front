import React, { Component } from "react";
import {
  FormInput,
  FormTextArea,
  FormThumbnail
} from "components/Commons/FormItems";
import CardSourceDetail from "components/Designs/CardSourceDetail";
import { ValidationGroup } from "modules/FormControl";

class DesignCardModify extends Component {
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
          this.props.UpdateCardSourceRequest(res, id, token).then(resolve("aa")).catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
  render() {
    console.log("detail", this.props.detail);
    return (
      <div>
        <label>썸네일</label>
        <FormThumbnail
          name="thumbnail"
          getValue={this.onChangeValue}
          image={this.props.card.first_img && this.props.card.first_img.m_img}
          placeholder="썸네일 등록"
        />
        <label>제목</label>
        <FormInput
          name="title"
          value={this.props.detail.title}
          getValue={this.onChangeValue}
          validates={["Required", "MaxLength(20)"]}
        />
        <label>설명</label>
        <FormTextArea
          name="content"
          getValue={this.onChangeValue}
          value={this.props.detail.content}
        />

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
