import React, { Component } from "react";
import styled from "styled-components";

import iconEdit from "source/mypage_icon_edit.svg";
import noimg from "source/modifymypage_nothumbnail.svg";

const Wrapper = styled.div`
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    .title {
      width: max-content;
      height: 40px;
      text-align: center;
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
    }
    .icon_wrapper{
      display:flex;
      align-items:center;
    }
    .icon {
      height: 18px;
      width: 18px;
      margin-left: 13px;
    }
    .find-text {
      margin-left: 20px;

      width: max-content;
      height: 33px;
      text-align: left;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #FF0000;
      opacity: 1;
    }
    cursor: pointer;
  }
  .thumbnail-wrapper {
    margin-top: 5px;
    .thumbnail-box {
      margin: auto;
      width: 350px;
      height: 350px;
      background-color: white;
      background-image: url(${props => props.thumbnail});
      background-position: center center;
      background-size: cover;
      border-radius: 100%;
      border:1px solid #eaeaea;
      margin-bottom:10px;
    }
    cursor: pointer;
  }
  @media only screen and (min-width : 500px) and (max-width:1600px) {
    .header{
      justify-content:space-between;
    }
  }
`;
const IconDiv = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.icon});
    background-position: center center;
    background-size: cover;
`;
class SectionBasic extends Component {
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
      //console.log("?", reader.result);
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

    return (<Wrapper thumbnail={thumbnailURL} >
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
    </Wrapper>);
  }
}
export default SectionBasic;

// <ContentsBox>
// {/* thumbnail */}
// <ThumbnailBox>
//   <div className="title">프로필 사진{window.location.pathname=="/insertUserDetail"?<sup style={{color:"red"}}>*</sup>:null}</div>
//   <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL}></ImageBox>
//   <div className="findThumbnailBox">
//     <div className="findThumbnailBtn">
//       <label className="findThumbnailText" htmlFor="file">찾아보기</label>
//     </div>
//     <div className="thumbnailExplainText">프로필 사진은 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
//   </div>
// </ThumbnailBox>
