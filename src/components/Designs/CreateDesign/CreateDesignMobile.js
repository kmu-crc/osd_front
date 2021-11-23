import React, { Component } from "react";
import styled from 'styled-components';
import Loading from "components/Commons/Loading";
import required from "resources/images/mobile_create_design_required.svg";
import thumbnailSVG from "resources/images/mobile_create_design_thumbnail.svg";
import { strButtonPrev, strErrorDoNotNextStep, strButtonComplete, strButtonCancel, strButtonNext } from "constant";
import helpIcon from "resources/images/help_black_24dp.svg";
import closeIcon from "resources/images/icon_close.svg";
import checkedIcon from "resources/images/icon_checked.svg";
import uncheckedIcon from "resources/images/icon_unchecked.svg";

const Wrapper = styled.div`
  margin-top: 2px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .space-between {
    justify-content: space-between;
  }

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
  .separator2 {
    margin: auto;
    height: 0px;
    width: 335px;
    border-bottom: 1px solid #707070;
    margin-bottom: 18px;
    margin-top: 18px;
  }
  .top15 {
    margin-top: 15px;
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
`;
const StepButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 27px;

  button {
    margin-right: 10px;
    :last-child {
      margin-right: 0px;
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

  margin-top: 27px;

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
  margin-top: 25px;
  width: 335px;

  *{border: 1px dashed black; }
  .label {
    width: max-content;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    font-family: Spoqa Han Sans;
    letter-spacing: 0px;
    color: #000000;
  }
  .category-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .select-wrapper {
    position: relative;
    
    select {
      margin: 0px;
      padding: 0px;
      padding-left: 4px;
      font-size: 14px;
      width: 205px;
      height: 23px;
      background-color: #C9C9C9;
      border: none;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .select-arrow {
      position: absolute;
      top: 5px;
      right: 4px;
      width: 0px;
      height: 0px;
      pointer-events: none;
      border-style: solid;
      border-width: 14px 8px 0 8px;
      border-color: #000000 transparent transparent transparent;
    }
  }

  .member-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // align-items: center;
    .member-input {
      input {
        width: 205px;
        height: 21px;
        background-color: #C9C9C9;
        border: none;
        outline: none;

        ::placeholder { color: white; opacity: 1; } /* Chrome, Firefox, Opera, Safari 10.1+ */ /* Firefox */
        :-ms-input-placeholder { color: white; } /* Internet Explorer 10-11 */
        ::-ms-input-placeholder { color: white; } /* Microsoft Edge */

        :active {
          border: none;
          outline: none;
        }

        padding: 2px 8px;
        text-align: left;
        font-weight: normal;
        font-size: 11px;
        line-height: 17px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: white;
      }
    }
  }
  .member-tip-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img {}
    p {
      margin-top: 6px;
      text-align: left;
      font-weight: normal;
      font-size: 11px;
      line-height: 15px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #707070;
    }
  }
  .added-member-element {
    width: max-content;
    
    .face {
      margin-right: 9px;
      width: 43px;
      height: 43px;
      box-shadow: 8px 8px 6px #00000029;
      border: 1px solid #912525;
      border-radius: 100%;
    }
    .nick {
      margin-right: 9px;
      width: 86px;
      height: 34px;
      text-align: left;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;
      font-family: Spoqa Han Sans Neo;
      letter-spacing: 0px;
      color: #707070;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .close {
      
    }
  }

  .license-wrapper { }
  .license-check-wrapper {
    margin-top: 21px;
  }
  .license-text {
    height: 33px;
    text-align: left;
    font-weight: normal;
    font-size: 22px;
    line-height: 33px;
    font-family: Spoqa Han Sans;
    letter-spacing: 0px;
    color: #8E8E8E;
    text-transform: lowercase;
  }
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
      additional: false,

      // step 0
      thumbnail: thumbnailSVG,
      thumbnail_name: "",
      title: "",
      explanation: "",

      // step 1
      categoryLevel1: this.props.userInfo.category1 || null,
      categoryLevel2: null,
      categoryLevel3: null,
      alone: true, members: [], addmem: [], delmem: [],
      license1: true, license2: true, license3: true,


      // is_project: 0, info_dialog: false, contents: [],
      // crop: { unit: "%", width: 50, aspect: 1 },
      // loading: false, designId: null, isMyDesign: false, editor: false,
      // content: false,
      // showSearch: false,
      // cropper: false, is_rectangle: false,
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
  StepMenu1Clicked = () =>
    this.state.step != 0
      ? this.setState({ step: 0 })
      : null;

  StepMenu2Clicked = () =>
    this.state.step != 1 && this.state.basic
      ? this.setState({ step: 1 })
      : alert(strErrorDoNotNextStep);

  StepMenu3Clicked = () =>
    alert(this.state.step);

  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0))) {
      await this.setState({ additional: true, content: true });
    } else {
      await this.setState({ additional: false });
    }
  };
  onChangeCategory1 = async () => {
    await this.setState({
      categoryLevel1: document.getElementById("cate1").value,
      categoryLevel2: null,
      categoryLevel3: null
    });
    this.checkFinishAdditional();
  }
  onChangeCategory2 = async () => {
    const value = await document.getElementById("cate2").value;
    await this.setState({
      categoryLevel2: value === "-1" ? null : value,
      categoryLevel3: null
    });
  };
  onChangeCategory3 = async () => {
    await this.setState({
      categoryLevel3: document.getElementById("cate3").value
    });
  };
  onClickedLicense1 = () => { this.setState({ license1: !this.state.license1 }); this.checkFinishAdditional(); }
  onClickedLicense2 = () => { this.setState({ license2: !this.state.license2 }); this.checkFinishAdditional(); }
  onClickedLicense3 = () => { this.setState({ license3: !this.state.license3 }); this.checkFinishAdditional(); }
  searchMember = async (event) => {

  }

  render() {

    console.log(this.props, this.state);

    const {
      loading, step, basic, additional,
      thumbnail: thumbnailURL,
      title, explanation,
      categoryLevel1, categoryLevel2, categoryLevel3,
      license1, license2, license3,

    } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}

      <Wrapper>

        <StepMenu>
          <Step onClick={this.StepMenu1Clicked} className={`${step === 0 ? "selected" : ""}`}>기본정보</Step>
          <Step onClick={this.StepMenu2Clicked} className={`${step === 1 ? "selected" : ""}`}>부가정보</Step>
          <Step onClick={this.StepMenu3Clicked} className={`${step === 2 ? "selected" : ""}`}>컨텐츠정보</Step>
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

              <div className="fadein separator " />

            </BasicForm>}

          {/* 부가정보 */}
          {step === 1 && <React.Fragment>
            <AdditionalForm>
              {/* 1. 카테고리 */}
              <div className="category-wrapper fadein">
                <div className="label">
                  1. 카테고리
                </div>
                <div>
                  {this.props.category1.length > 0
                    ? <React.Fragment>
                      <div className="select-wrapper">
                        <select
                          onChange={this.onChangeCategory1}
                          id="cate1"
                          value={categoryLevel1} >
                          {categoryLevel1 == null
                            ? <option selected disabled value>{"카테고리(필수)"}</option>
                            : null}
                          {this.props.category1.map((cate1, index) =>
                            <option
                              selected={categoryLevel1 === cate1.value}
                              value={cate1.value}
                              key={index}>
                              {cate1.text}
                            </option>
                          )}
                        </select>
                        <div className="select-arrow"></div>
                      </div>
                      {categoryLevel1
                        ? <div className="select-wrapper top15 fadein">
                          <select
                            onChange={this.onChangeCategory2}
                            id="cate2"
                            value={categoryLevel2}>
                            {!categoryLevel2
                              ? <option selected disabled>{"서브 카테고리(옵션)"}</option>
                              : <option value={-1}>{"선택취소"}</option>
                            }
                            {this.props.category2[categoryLevel1 - 1].map((cate2, index) =>
                              <option value={cate2.value} key={index}>{cate2.text}</option>
                            )}
                          </select>
                          <div className="select-arrow"></div>
                        </div>
                        : null}

                      {categoryLevel2 === 28
                        ? <div className="select-wrapper top15 fadein">
                          <select
                            onChange={this.onChangeCategory3}
                            id="cate3"
                            value={categoryLevel3}>
                            <option disabled selected value>{"3차 카테고리(옵션)"}</option>
                            {this.props.category3[categoryLevel2 - 1].map((cate3, index) =>
                              <option value={cate3.value} key={index}>{cate3.text}</option>
                            )}
                          </select>
                          <div className="select-arrow"></div>
                        </div>
                        : null}
                    </React.Fragment>
                    : null}
                </div>
              </div>
              {/* 2. 멤버 초대하기 */}
              {categoryLevel1
                ? <React.Fragment>
                  <div className="fadein separator2 " />

                  <div className="member-wrapper fadein">
                    <div className="label">
                      2. 멤버 초대하기
                    </div>
                    <div className="member-input">
                      {/* input */}
                      <input onKeyPress={this.searchMember} placeholder="추가할 멤버의 닉네임을 입력해 주세요" />

                      {/* searched */}
                      <div>searched</div>

                      {/* list */}
                      {
                        [
                          { uid: 1, img: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1615109185448-x200.jpeg", nick: "닉네임1", },
                          { uid: 2, img: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1615109185448-x200.jpeg", nick: "닉네임2닉네임2닉네임2닉네임2닉네임2닉네임2", }
                        ].map((mem, index) =>
                          <div className="added-member-element flex-row space-between" key={index}>
                            <img className="face" src={mem.img} />
                            <p className="nick">{mem.nick}</p>
                            <a onClick={() => this.removeMember(mem)}>
                              <img className="close" src={closeIcon} />
                            </a>
                          </div>)}

                    </div>
                  </div>

                  <div className="member-tip-wrapper">
                    <img src={helpIcon} />
                    <p>
                      함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                      초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                      디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.<br />
                    </p>
                  </div>
                </React.Fragment>
                : null}

              {/* 3. 라이센스 */}
              {categoryLevel1
                ? <div className="license-wrapper fadein">

                  <div className="fadein separator2 " />

                  <div className="label">
                    3. 라이센스
                  </div>

                  <div className="license-check-wrapper flex-row space-between" >
                    <div className="license-text">{"상업적으로 이용이 가능합니다."}</div>
                    <a onClick={this.onClickedLicense1}>
                      {license1 ? <img src={checkedIcon} /> : <img src={uncheckedIcon} />}
                    </a>
                  </div>
                  <div className="license-check-wrapper flex-row space-between" >
                    <div className="license-text">{"원작자를 표시합니다."}</div>
                    <a onClick={this.onClickedLicense2}>
                      {license2 ? <img src={checkedIcon} /> : <img src={uncheckedIcon} />}
                    </a>
                  </div>
                  <div className="license-check-wrapper flex-row space-between" >
                    <div className="license-text">{"추후 수정이 가능합니다."}</div>
                    <a onClick={this.onClickedLicense3}>
                      {license3 ? <img src={checkedIcon} /> : <img src={uncheckedIcon} />}
                    </a>
                  </div>
                </div>
                : null}

            </AdditionalForm>
          </React.Fragment>}

          {/* 컨텐츠정보 */}
          {step === 2 && <React.Fragment>
            <ContentEditorForm>

            </ContentEditorForm>
          </React.Fragment>}

        </CreateForm>

        <StepButtonWrapper>

          <button onClick={null} className="cancel">{strButtonCancel}</button>

          {step !== 0 &&
            <button
              onClick={null}
              className="cancel"
            >
              {strButtonPrev}</button>}

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
              className={`${additional ? "active" : ""} next`}>
              {strButtonNext}</button>}

          {step === 2 &&
            <button
              onClick={null}
              className={`${basic ? "active" : ""} next`}>
              {strButtonComplete}</button>}

        </StepButtonWrapper>

      </Wrapper>

    </React.Fragment >);
  };
};

export default CreateDesignMobile;



// class SearchMember extends Component {
//   state = { member: [], open: false, listOpen: false, }
//   componentDidMount() { if (this.props.originalMember) { this.setState({ member: this.props.originalMember }); } }
//   getValue = (value) => {
//     this.setState({ open: true }); if (!value) { this.setState({ open: false }); return; }
//     this.props.SearchMemberRequest(null, { key: value }, this.props.token).then(data => { })
//   }
//   addMember = async (data) => { this.getValue(""); this.props.addMember && this.props.addMember(data.email, data.s_img, data.nick_name, data.uid); }
//   closeList = () => { this.setState({ open: false }); }
//   onChangeInput() { this.setState({ listOpen: true }); }
//   deleteMember = (index) => { let newArray = [...this.state.member]; newArray.splice(index, 1); this.setState({ member: newArray }); this.returnData(); }

//   returnData = () => { setTimeout(() => { if (this.props.onChangeMembers) this.props.onChangeMembers(this.state.member); }, 100) }

//   render() {
//     return (
//       <div>
//         <FormInput
//           className="form-input"
//           type="text"
//           name="search"
//           placeholder="추가할 멤버의 닉네임을 입력해 주세요"
//           validates={this.props.validates}
//           getValue={this.getValue}
//         />
//         <div style={{ width: "100%", height: "100%", }}>
//           <div display={this.state.open ? "block" : "none"}>
//             {this.props.members && this.props.members.map((item, index) => {
//               return (<div key={`member${index}`} onClick={() => this.addMember(item)}>{item.email}</div>);
//             })}
//           </div>
//         </div>
//         <div >
//           {this.state.member.map((data, index) => {
//             return (<div key={index}>
//               {data.nick_name}
//               <span>
//                 <button type="button" onClick={() => this.deleteMember(index)}>
//                   <Icon name="remove" />
//                 </button>
//               </span>
//             </div>)
//           })}
//         </div>
//       </div>
//     );
//   }
// }