import React, { Component } from "react";
import styled from 'styled-components';
import Loading from "components/Commons/Loading";
import required from "resources/images/mobile_create_design_required.svg";
import thumbnailSVG from "resources/images/mobile_create_design_thumbnail.svg";
import { strButtonComplete, strButtonCancel, strButtonNext } from "constant";


const Wrapper = styled.div`
  margin-top: 2px;

  // *{border: 1px solid red;}
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
  .separator {
    margin: auto;
    height: 0px;
    width: 200px;
    border-bottom: 1px solid #707070;
    margin-bottom: 18px;
    margin-top: 18px;
  }

`;
const StepMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Step = styled.div`
  height: 22px;
  text-align: left;
  font-weight: normal;
  font-size: 15px;
  font-weight: 22px;
  font-familiy: Spoqa Han Sans;
  letter-spacing: 0px;
  color: #7A7A7A;
  &.selected {
    color: #1262AB;
  }
  margin-right: 20px;
  :last-child {
    margin-right: 0px;
  }
`;
const CreateForm = styled.div`
  margin-top: 27px;
`;
const StepButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
  margin-top: 22px;
  margin-bottom: 27px;

  button {
    :last-child {
      margin-left: 10px;
    }
    border: none;
    width: 40px;
    height: 26px;
    box-shadow: 2px 2px 2px #0000002B;

    &.next {
      background-color: red;
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: white;
    }
    &.impossible {
      color: white;
      background-color: black;
    }
    &.cancel {
      background-color: #C9C9C9;
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: black;
    }

  }
`;


const BasicForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
`;
const AdditionalForm = styled.div`
`;
const ContentEditorForm = styled.div`
`;


class CreateDesignMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // common
      // step: 0,
      step: 1,
      basic: false,

      // step 0
      thumbnail: thumbnailSVG,
      thumbnail_name: "",
      title: "",
      explanation: "",

      // is_project: 0, info_dialog: false, contents: [],
      // crop: { unit: "%", width: 50, aspect: 1 },
      // loading: false, designId: null, isMyDesign: false, editor: false,
      // basic: false, additional: false, content: false, step: 0,
      // showSearch: false,
      // cropper: false, is_rectangle: false,
      // categoryLevel1: this.props.userInfo.category1 || null,
      // categoryLevel2: null,
      // alone: true, members: [], addmem: [], delmem: [],
      // license1: true, license2: true, license3: true,
      // type: null, 
      // template: null,
    };
  }

  checkFinishBasic = async () => {
    const { title, thumbnail, } = this.state;
    if (title && thumbnail !== thumbnailSVG) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  };
  handleOnChangeThumbnail = async (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    const regExp = /.(jpe?g|png|bmp)$/i;
    if (!regExp.test(file.name)) {
      await alert('파일의 확장자가 올바른지 확인해주세요.', "확인");
      return;
    }
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = () => {
        this.setState({ is_rectangle: false, ratio: image.width / image.height, cropper: image.width / image.height !== 1.0 });
      }
    }
    reader.onloadend = async () => {
      await this.setState({ thumbnail: reader.result, thumbnail_name: file.name });
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
    await this.checkFinishBasic();
  };
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }
  }
  onChangeValueTitle = async event => {
    if (event.target) {
      await this.setState({ title: event.target.value });
    }
    this.checkFinishBasic();
  };
  onChangeValueExplanation = async event => {
    if (event.target) {
      await this.setState({ explanation: event.target.value });
    }
    //this.checkFinishBasic();
  };
  goStep1 = () => {
    this.setState({ step: 1 });
  }
  render() {

    // const { cropper, ratio, loading, members, is_project, contents, categoryLevel1, categoryLevel2 } = this.state;
    // const thumbnailURL = this.state.thumbnail;
    // console.log(this.props, this.state);


    const {
      loading, step, basic,
      thumbnail: thumbnailURL,
      title, explanation,
    } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}

      <Wrapper>

        <StepMenu>
          <Step onClick={() => step != 0 ? this.setState({ step: 0 }) : null} className={`${step === 0 ? "selected" : ""}`}>기본정보</Step>
          <Step onClick={() => step != 1 && basic ? this.setState({ step: 1 }) : null} className={`${step === 1 ? "selected" : ""}`}>부가정보</Step>
          <Step onClick={() => alert(step)} className={`${step === 2 ? "selected" : ""}`}>컨텐츠정보</Step>
        </StepMenu>

        <CreateForm>
          {/* 기본정보 */}
          {step === 0 &&
            <BasicForm>
              {/* 1. 디자인 이미지 */}
              <div className=" fadein design-image-title">
                <p>1.디자인 이미지</p>
                <img src={required} alt="image" title="필수항목입니다:)" />
              </div>

              <div className=" fadein design-image-content">
                <div onClick={() => { document.getElementById("file").click() }} className="thumbnail">
                  <img src={thumbnailURL || thumbnailSVG} />
                </div>
                <label className="find" htmlFor="file">찾아보기</label>
                <input
                  hidden
                  onChange={this.handleOnChangeThumbnail}
                  id="file"
                  type="file"
                  accept="image/png, image/bmp, image/jpeg, image/jpg" />
                <div className="tip">디자인 이미지는 대표적으로 보이게 되는 사진으로,<br />
                  JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
              </div>

              {/* 2. 제목 */}
              {thumbnailURL != thumbnailSVG && <div className="fadein separator " />}
              {thumbnailURL != thumbnailSVG && <div className="fadein design-title">
                <div className="design-image-title">
                  <p>2. 제목</p>
                  <img src={required} alt="image" title="필수항목입니다:)" />
                </div>
                <div>
                  <input
                    value={title}
                    name="title"
                    maxLength="100"
                    onKeyDown={this.onKeyDownEnter}
                    onChange={this.onChangeValueTitle}
                    placeholder="디자인의 제목을 입력해주세요.(100자이내)"
                  />
                </div>
              </div>}

              {/* 3. 디자인 설명 */}
              {thumbnailURL != thumbnailSVG && <div className="fadein separator " />}
              {thumbnailURL != thumbnailSVG && <div className="fadein design-title">
                <p>3. 디자인 설명</p>
                <div className="textarea-wrapper">
                  <textarea
                    value={explanation}
                    id="explainBox"
                    onChange={this.onChangeValueExplanation}
                    maxLength="350"
                    placeholder="디자인 설명을 입력해주세요. (350자 이내)" />
                </div>
              </div>}

            </BasicForm>}

          {/* 부가정보 */}
          {step === 1 && <React.Fragment>
            <AdditionalForm>

            </AdditionalForm>
          </React.Fragment>}

          {/* 컨텐츠정보 */}
          {step === 2 && <React.Fragment>
            <ContentEditorForm>

            </ContentEditorForm>
          </React.Fragment>}

          <div className="fadein separator " />
        </CreateForm>

        <StepButtonWrapper>

          <button onClick={null} className="cancel">{strButtonCancel}</button>

          {step === 0 &&
            <button
              onClick={
                () => basic
                  ? this.goStep1()
                  : thumbnailURL === thumbnailSVG
                    ? alert("섬네일을 선택해주세요.")
                    : alert("디자인제목을 입력해주세요.")}
              className={`${basic ? "" : "impossible"} next`}>
              {strButtonNext}</button>}

          {step === 1 &&
            <button
              onClick={null}
              className={`${basic ? "active" : ""} next`}>
              {strButtonNext}</button>}
          {step === 2 &&
            <button
              onClick={null}
              className={`${basic ? "active" : ""} next`}>
              {strButtonComplete}</button>}

        </StepButtonWrapper>

      </Wrapper >

    </React.Fragment >);
  };
};

export default CreateDesignMobile;
