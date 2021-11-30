import React, { Component } from "react";
import styled from "styled-components";

import iconEdit from "source/mypage_icon_edit.svg";
import noimg from "source/new_logo_default.png";

const Wrapper = styled.div`
  width:85px;
  height:100%;

  font-family:Spoqa Han Sans;
  display:flex;
  flex-direction:column;
  align-items:center;

  .thumbnail{
    width:85px;
    height:85px;
    min-width:85px;
    min-width:85px;
    background-image:url(${props=>props.thumbnail});
    background-size:cover;
    border-radius:50%;
    box-shadow: 0px 0px 5px 0px #ABABAB;
  }
  .greyText{color:#777777;font-size:15px;font-weight:700;height:22px;display:flex;align-items:center;}
  .redText{color:red;font-size:12px;font-weight:400;height:17px;display:flex;align-items:center;}
`
class UserThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = { thumbnail: null, tnumbnail_name: "" }
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        thumbnail: nextProps.MyDetail.profileImg == null ? noimg : nextProps.MyDetail.profileImg.l_img
      });
      this.props.updateThumbnail(nextProps.MyDetail.profileImg == null ? "" : nextProps.MyDetail.profileImg.l_img);
      return true;
    }
    return true;
  };
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
      this.props.updateThumbnail(reader.result, file.name);
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  onClicked = (e) => {
    const file = document.getElementById("file");
    file && file.click();
  }

  render() {
    const thumbnailURL = this.state.thumbnail;

    return (
      <Wrapper thumbnail={thumbnailURL}>
        <div className="thumbnail"/>
        <div className="greyText" style={{marginTop:"3px"}}>프로필 사진</div>
        <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/jpg, image/jpeg, image/png, image/bmp" />
        <div className="redText" style={{marginTop:"3px"}} onClick={this.onClicked}>찾아보기</div>
      </Wrapper>
    );
  }
}
export default UserThumbnail;
{/* <Wrapper thumbnail={thumbnailURL} >
      <div className="header" onClick={this.onClicked} >
        <div className="title">프로필 사진</div>
        <div className="icon_wrapper">
        <div className="icon"><IconDiv width={18} height={18} icon={iconEdit} /></div>
        <div className="find-text">찾아보기</div>
        </div>
      </div>

      <div className="thumbnail-wrapper" onClick={this.onClicked} >
        <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/jpg, image/jpeg, image/png, image/bmp" />
        <div className="thumbnail-box">&nbsp;</div>
      </div>

      <div>
        <div className="thumbnail-text">
          프로필 사진은 대표적으로 보이게 되는 사진으로,<br />
          JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.
        </div>
      </div>
    </Wrapper> */}