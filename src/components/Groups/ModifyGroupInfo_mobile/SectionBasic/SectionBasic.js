import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png"
import opendesign_style from "opendesign_style";
import new_logo_plus from "source/new_logo_plus.png"
import required from "resources/images/mobile_create_design_required.svg";
import thumbnailSVG from "resources/images/mobile_create_design_thumbnail.svg";

const GroupImageText = "그룹 이미지";
const BasicForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 27px;
  .fadein {
    animation: fadein 2s;
    -moz-animation: fadein 2s; /* Firefox */
    -webkit-animation: fadein 2s; /* Safari and Chrome */
    -o-animation: fadein 2s; /* Opera */
    @keyframes fadein {
      from { opacity:0; }
      to { opacity:1; }
    }
    @-moz-keyframes fadein { /* Firefox */
      from { opacity:0; }
      to { opacity:1; }
    }
    @-webkit-keyframes fadein { /* Safari and Chrome */
      from { opacity:0; }
      to { opacity:1; }
    }
    @-o-keyframes fadein { /* Opera */
      from { opacity:0; }
      to { opacity: 1; }
    }
  }
  .design-image-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    height: 28px;
    
    p {
      width: max-content;
      height: 28px;
      text-align: left;
      font-weight: medium;
      font-size: 20px;
      line-height: 28px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #000000;
    }

    img {
      position: absolute;
      left: calc(50% + 65px);
      top: -70%;
      width: 14px;
      height: 40px;
      object-fit: contain;
    }
  }
  
  .design-image-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 8px;

    .thumbnail {
      width: 137px;
      height: 137px;
      img { width: 137px; height: 137px; }
      margin-bottom: 8px;
    }
    .find {
      width: max-content;
      height: 28px;
      text-align: center;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #FF0000;
      margin-bottom: 10px;
    }
    .tip {
      width: max-content;
      height: 44px;
      text-align: left;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #707070;
    }
  }

  .design-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    p {
      width: max-content;
      height: 28px;
      text-align: left;
      font-weight: medium;
      font-size: 20px;
      line-height: 28px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #000000;
    }

    img {
      position: absolute;
      left: calc(65px);
      top: -70%;
      width: 14px;
      height: 40px;
      object-fit: contain;
    }
    input {
      width: 306px;
      height: 40px;
      border: none;
      outline: none;
      :active { outline: none; }
      background-color: #E9E9E9;
      padding: 8px 11px;
      height: 22px;
      text-align: left;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #707070;
    }
    .inputText{height:40px;}
    .textarea-wrapper{
      width: 303px;
      height: 323px;
    }
    textarea {
      :active { outline: none; }
      background-color: #E9E9E9;
      width: 303px;
      height: 323px;
      padding: 10px 9px;
      text-align: left;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #707070;
      border: none;
      overflow: auto;
      outline: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      resize: none;
    }
  }
  .separator {
    margin: auto;
    height: 0px;
    width: 200px;
    border-bottom: 1px solid #707070;
    margin-bottom: 18px;
    margin-top: 18px;
  }
  .separator2 {
    margin: auto;
    height: 0px;
    width: 335px;
    border-bottom: 1px solid #707070;
    margin-bottom: 18px;
    margin-top: 18px;
  }
`;

class GroupBasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { groupTitle: "", groupExplain: "", groupThumbnail: noimg, groupThumbnailURL: "", groupThumbnailName: "" }
        this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
        this.handleOnChangeExplain = this.handleOnChangeExplain.bind(this);
        this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
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
    handleOnChangeTitle(event) {
        this.setState({ groupTitle: event.target.value });
        this.props.onChangeTitle(event.target.value);
    }
    handleOnChangeExplain(event) {
        this.setState({ groupExplain: event.target.value });
        this.props.onChangeExplain(event.target.value);
    }

    handleOnChangeThumbnail(event) {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({ groupThumbnail: reader.result, groupThumbnailName: file.name })
            this.props.onChangeThumbnail(reader.result, file.name);
        }
        if (event.target.files[0]) {
            let imgurl = reader.readAsDataURL(file)
            this.setState({ groupThumbnailURL: imgurl });
            this.props.onChangeThumbnail(imgurl);
            //console.log("file===", imgurl);

        }

    }
    onKeyDownEnter(event) {
        if (event.key === "Enter") {
            document.getElementById("explainBox").focus();
        }

    }
    render() {
      const thumbnailURL = this.state.groupThumbnail;

        return (

          <BasicForm>
          {/* 1. 디자인 이미지 */}
          <div className=" fadein design-image-title">
            <p>1.그룹 이미지</p>
            <img src={required} alt="image" title="필수항목입니다:)" />
          </div>
    
          <div className=" fadein design-image-content">
            <div onClick={() => { document.getElementById("file").click() }} className="thumbnail">
              <img src={this.props.groupThumbnail==noimg?null:this.props.groupThumbnail} />
            </div>
            <label className="find" htmlFor="file">찾아보기</label>
            <input
              hidden
              onChange={this.handleOnChangeThumbnail}
              id="file"
              type="file"
              accept="image/png, image/bmp, image/jpeg, image/jpg" />
            <div className="tip">그룹 이미지는 대표적으로 보이게 되는 사진으로,<br />
              JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
          </div>
    
          {/* 2. 제목 */}
          {thumbnailURL != thumbnailSVG && <div className="fadein separator " />}
          {thumbnailURL != thumbnailSVG && 
          <div className="fadein design-title">
            <div className="design-image-title">
              <p>2. 제목</p>
              <img src={required} alt="image" title="필수항목입니다" />
            </div>
            <div>
              <input
                className="inputText"
                value={this.props.groupTitle || ""}
                name="title"
                maxLength="100"
                onKeyDown={this.onKeyDownEnter}
                onChange={this.handleOnChangeTitle}
                placeholder="그룹의 제목을 입력해주세요.(100자이내)"
              />
            </div>
          </div>}
    
          {/* 3. 디자인 설명 */}
          {thumbnailURL != thumbnailSVG && <div className="fadein separator " />}
          {thumbnailURL != thumbnailSVG && 
          <div className="fadein design-title">
            <p>3. 디자인 설명</p>
            <div className="textarea-wrapper">
              <textarea
                value={this.props.groupExplain}
                id="explainBox"
                onChange={this.handleOnChangeExplain}
                maxLength="350"
                placeholder="그룹 설명을 입력해주세요. (350자 이내)" />
            </div>
          </div>}
    
          <div className="fadein separator " />
    
        </BasicForm>
        );
    }
}
export default GroupBasicInfo;


// <ContentBox>
// <div className="label">1. 그룹 이미지</div>
// <div className="row" style={{marginTop:"10px"}}>
//     <img className="imageBox" src={this.props.groupThumbnail==noimg?null:this.props.groupThumbnail}/>
//     <div className="imageLabel">
//           <label className="findThumbnailText" htmlFor="file">찾아보기</label>
//           <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
//           <div className="thumbnailExplainText">{GroupImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
//     </div>
// </div>

// <div className="label" style={{marginTop:"13px"}}>2. 제목</div>
// <div className="row" style={{marginTop:"13px"}}>
//           <InputText type="text" placeholder="그룹 제목을 입력하세요." onChange={this.handleOnChangeTitle}
//           onKeyDown={this.onKeyDownEnter} value={this.props.groupTitle || ""} maxLength="50" />
// </div>

// <div className="label" style={{marginTop:"23px"}}>3. 설명</div>
// <div className="row" style={{marginTop:"23px"}}>
//           <InputTextArea id="explainBox" className="inputTextareaBox" placeholder="그룹 설명을 입력하세요." onChange={this.handleOnChangeExplain}
//           value={this.props.groupExplain} maxLength="400" />
// </div>
// </ContentBox>