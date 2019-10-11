import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png"

const ContentsBox = styled.div`
  padding-left: 47px;
  .title{
    width: 100px;
    height: 29px;
    text-align: left;
    font-size: 20px;
    font-weight: 500;
    line-height: 29px;
    color: #707070;
  }
`
const ImageBox = styled.div`
  margin-left: 67px;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  background: ${props => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
`
const ThumbnailBox = styled.div`
  display:flex;
  width:1200px;
  .explainBox{
    margin-left:54px;
    margin-top:100px;
  }
  .findThumbnailBtn{
    width:63px;
    height:25px;
    cursor:pointer;
  }
  .findThumbnailText{
    font-family:Noto Sans KR;
    font-size:17px;
    font-weight:500;
    text-align:left;
    line-height:25px;
    color:#FF0000;
    border-bottom:1.5px solid #FF000;
    cursor:pointer;
  }
  .findThumbnailBox{
    margin-left:54px;
    margin-top:100px;
    .thumbnailExplainText{
      width:341px;
      height:45px;
      margin-top:11px;
      font-weight:300;
      font-size:14px;
      color:#707070;
      line-height:20px;
      text-align:left;
    }
  }
`
const TitleBox = styled.div`
  width:1200px;
  display:flex;
  margin-top:96px;

  .inputText{
    width:505px;
    height:56px;
    margin-left:67px;
    padding-left:22px;
    padding-right:22px;
    font-size:20px;
    font-weight:300;
    font-family:Noto Sans KR;
    line-height:29px;
    color:#707070;
    border:none;
    border-radius:5px;
    outline:none;
    background-color:#EFEFEF;
  }
`
const ExplainBox = styled.div`
  width: 1200px;
  margin-top: 103px;
  display: flex;
  .inputTextareaBox {
    width: 717.5px;
    height: 244px;
    margin-left: 70px;
    padding: 22px 26px 34px 32px;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    line-height: 35px;
    text-align: left;
    outline: none;
    border: none;
    border-radius: 5px;
    resize: none;
    background-color: #EFEFEF;
  }
`
//const BasicSecBox = {paddingLeft:"47px"}
// const BasicSecTitle={ width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
// const BasicSec_thumb_Box = { display: "flex",width:"1200px", }
// const BasicSec_thumb_ExplainBox={ marginLeft: "54.5px", marginTop: "100px"}
// const BasicSec_thumb_FindBox ={width: "63px", height: "25px", cursor: "pointer" }
// const BasicSec_thumb_FindTitle = {cursor: "pointer",fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }
// const BasicSec_thumb_FindExplain ={ width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }

class SectionBasic extends Component {
  constructor(props) {
    super(props);
    this.state = { nick: true, nickname: "", introduce: "", thumbnail: noimg, tnumbnail_name: "" }
    this.handleInputNickName = this.handleInputNickName.bind(this);
    this.handleInputIntroduce = this.handleInputIntroduce.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      console.log("MYDETAIL", nextProps.MyDetail.nick_name);
      this.setState({
        nickname: nextProps.MyDetail.nick_name == null ? "" : nextProps.MyDetail.nick_name,
        introduce: nextProps.MyDetail.about_me == null ? "" : nextProps.MyDetail.about_me,
        thumbnail: nextProps.MyDetail.profileImg == null ? noimg : nextProps.MyDetail.profileImg.m_img
      });
      this.props.updateThumbnail(nextProps.MyDetail.profileImg == null ? noimg : nextProps.MyDetail.profileImg.m_img);
      this.props.updateIntroduce(nextProps.MyDetail.about_me == null ? "" : nextProps.MyDetail.about_me);
      this.props.updateNickName(nextProps.MyDetail.nick_name == null ? "" : nextProps.MyDetail.nick_name);
      return true;
    }
    return true;
  }
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
      this.props.updateThumbnail(reader.result, file.name);
      console.log("?", reader.result);
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }

  }
  handleInputIntroduce(event) {
    this.setState({ introduce: event.target.value })
    this.props.updateIntroduce(event.target.value);
  }

  handleInputNickName(event) {
    this.setState({ nickname: event.target.value })
    this.props.updateNickName(event.target.value);
  }
  render() {
    const thumbnailURL = this.state.thumbnail;
    return (
      <ContentsBox>
        {/* thumbnail */}
        <ThumbnailBox>
          <div className="title">프로필 사진</div>
          <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL}></ImageBox>
          <div className="findThumbnailBox">
            <div className="findThumbnailBtn">
              <label className="findThumbnailText" htmlFor="file">찾아보기</label>
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
            </div>
            <div className="thumbnailExplainText">프로필 사진은 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
          </div>
        </ThumbnailBox>
        {/* nick */}
        <TitleBox>
          <div className="title">닉네임</div>
          <input type="text" className="inputText" onChange={this.handleInputNickName} placeholder="닉네임을 입력하세요."
            value={this.state.nickname} maxLength="50" />
        </TitleBox>
        {/* introduction */}
        <ExplainBox>
          <div className="title">자기소개</div>
          <textarea className="inputTextareaBox" onChange={this.handleInputIntroduce} value={this.state.introduce}
            placeholder="자기소개를 입력하세요." maxLength="300" />
        </ExplainBox>
      </ContentsBox>
    );
  }
}
export default SectionBasic;