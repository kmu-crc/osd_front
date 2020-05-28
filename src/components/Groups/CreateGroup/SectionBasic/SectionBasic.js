import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png"
import opendesign_style from "opendesign_style";

const ContentsBox = styled.div`
padding-left: 47px;
display:flex;
flex-direction:column;
position:relative;
.title{
  min-width: 105px;
  height: 29px;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
  color: #707070;
}

@media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
  padding:15px;
  .title{
    margin-bottom:10px;
  }
}
@media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
  padding:15px;
  display:flex;
  flex-direction:column;
  align-items:center;
}
`
const ImageBox = styled.div`
    margin-left:67px;
    min-width: 210px;
    min-height: 210px;
    max-width: 210px;
    max-height: 210px;
    border-radius:10px;
    background: ${props => `url(${props.imageURL})`};
    background-size:cover;
    background-position:center center;
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
        margin-left:0px;
    }
}
`
const ThumbnailBox = styled.div`
display:flex;
justify-content:flex-start;
flex-direction:row;
.explainBox{
  margin-left:54px;
  margin-top:100px;
}
.findThumbnailBtn{
  width:max-content;
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

@media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
  flex-direction:column;
}
@media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
  flex-direction:column;
  width:100%;
.findThumbnailBox{
  margin-left:0px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  .thumbnailExplainText{
    width:100%;
  }
}
}
`
const TitleBox = styled.div`
display:flex;
margin-top:96px;
justify-content:flex-start;
flex-direction:row;
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
@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
  .inputText{
    margin-left:0px;
  }

}
@media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
  .inputText{
    margin-left:0px;
    width:100%;
  }
}
@media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
  flex-direction:column;
  .inputText{
    margin-left:0px;
  }
}
@media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
  flex-direction:column;
  width:100%;
  .inputText{
    margin-left:0px;
    width:100%;
  }
}
`

const ExplainBox = styled.div`
  margin-top: 103px;
  display: flex;
  justify-content:flex-start;
  flex-direction:row;
  .inputTextareaBox {
    width: 717px;
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
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction:column;
    .inputTextareaBox {
      margin-left: 0px;
    }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;

    .inputTextareaBox {
      width:100%;
      margin-left: 0px;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
  width:100%;
}
`
const GroupImageText = "그룹 이미지";

class SectionBasic extends Component {
  constructor(props) {
    super(props);
    this.state = { groupTitle: null, groupExplain: null, groupThumbnail: noimg, groupThumbnailURL: null, groupThumbnailName: null };
    this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
    this.handleOnChangeExplain = this.handleOnChangeExplain.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.checkisfinished = this.checkisfinished.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  componentDidMount() {
    this.setState({
      groupTitle: this.props.groupTitle,
      groupExplain: this.props.groupExplain,
      groupThumbnail: this.props.groupThumbnail
    })
  }
  async handleOnChangeTitle(event) {
    this.setState({ groupTitle: event.target.value });
    this.props.onChangeTitle(event.target.value);
    this.checkisfinished();
  }
  async handleOnChangeExplain(event) {
    this.setState({ groupExplain: event.target.value });
    this.props.onChangeExplain(event.target.value);
    this.checkisfinished();
  }
  async handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = async () => {
      await this.setState({ groupThumbnail: reader.result, groupThumbnailName: file.name })
      await this.props.onChangeThumbnail(reader.result, file.name);
    }
    if (event.target.files[0]) {
      let imgurl = reader.readAsDataURL(file)
      await this.setState({ groupThumbnailURL: imgurl });
      await this.props.onChangeThumbnail(imgurl);
    }
    this.checkisfinished();
  }
  checkisfinished() {
    const { groupTitle, /* groupExplain, */ groupThumbnailName } = this.state;
    if (groupTitle != null && groupTitle.length > 0 && /*groupExplain != null && groupExplain.length > 0 &&*/ groupThumbnailName != null && groupThumbnailName.length > 0) {
      this.props.completed && this.props.completed(true);
    } else {
      this.props.completed && this.props.completed(false);
    }
  }
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }

  }
  render() {
    return (
      <ContentsBox  >
        {/* thumbnail */}
        <ThumbnailBox>
          <div className="title">{GroupImageText}<sup style={{ color: "red" }}>*</sup></div>
          <ImageBox imageURL={this.props.groupThumbnail}></ImageBox>
          <div className="findThumbnailBox">
            <div className="findThumbnailBtn">
              <label className="findThumbnailText" htmlFor="file">찾아보기</label>
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
            </div>
            <div className="thumbnailExplainText">{GroupImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
          </div>
        </ThumbnailBox>
        {/* title */}
        <TitleBox>
          <div className="title">제목<sup style={{ color: "red" }}>*</sup></div>
          <input type="text" className="inputText" placeholder="그룹 제목을 입력하세요." onChange={this.handleOnChangeTitle}
            onKeyDown={this.onKeyDownEnter} value={this.props.groupTitle || ""} maxLength="50" />
        </TitleBox>
        {/* description */}
        <ExplainBox>
          <div className="title">설명</div>
          <textarea id="explainBox" className="inputTextareaBox" placeholder="그룹 설명을 입력하세요." onChange={this.handleOnChangeExplain}
            value={this.props.groupExplain} maxLength="400" />
        </ExplainBox>
      </ContentsBox>
    );
  }
}
export default SectionBasic;

// <div style={{ border:"1px solid black",
// marginLeft: "67px", width: "210px", height: "210px", borderRadius: "10px",
// backgroundImage: `url(${this.props.groupThumbnail})`, backgroundSize: "cover", backgroundPosition: "center center"