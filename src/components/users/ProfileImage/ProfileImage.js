import React, { Component } from 'react';
import styled from "styled-components";
import { FileField } from "../../commons/FormField";

const ProfileWrap = styled.div`
  width: 100%;
  img {
    width: 100%
  }
`
class ProfileImage extends Component {
  state = {
    imgUrl : null
  }
  onChangeImgUrl = (url) => {
    console.log("url", url);
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imgUrl: reader.result
      });
    }
    if(url == null) return;
    reader.readAsDataURL(url);
  }
  render() {
    let {imgUrl} = this.state;
    let $imagePreview = null;
    if (imgUrl) {
      $imagePreview = (<img src={imgUrl} alt="프로필 이미지"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return(
      <ProfileWrap>
        {$imagePreview}
        <FileField type="file" name="thumbnail" placeholder="프로필을 등록해주세요." label="프로필 이미지" freeView={this.onChangeImgUrl}/>
      </ProfileWrap>
    );
  }
}
export default ProfileImage;
