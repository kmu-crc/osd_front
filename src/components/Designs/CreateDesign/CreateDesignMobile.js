import React from "react";
import update from "react-addons-update";
import styled from 'styled-components';
import Loading from "components/Commons/Loading";
import required from "resources/images/mobile_create_design_required.svg";
import thumbnailSVG from "resources/images/mobile_create_design_thumbnail.svg";
import { strButtonPrev, strErrorDoNotNextStep, strButtonComplete, strButtonCancel, strButtonNext } from "constant";
import { geturl } from "config";
import helpIcon from "resources/images/help_black_24dp.svg";
import closeIcon from "resources/images/icon_close.svg";
import checkedIcon from "resources/images/icon_checked.svg";
import uncheckedIcon from "resources/images/icon_unchecked.svg";

import FileController from "../CardSourceDetail/FileController";
import LinkController from "../CardSourceDetail/LinkController";
import TextController from "../CardSourceDetail/TextControllerPlus";
import TemplateGridEditor from "components/Designs/CreateDesign/TemplateGridEditor";
import opendesign_style from "opendesign_style";
import AddContent, { ControllerWrap } from "./AddContentMobile";
import templateImgDesign from "source/template-image-design.png";
import templateImgSofware from "source/template-image-software.png";
import templateImgEngineering from "source/template-image-engineering.png";
import templateImgEmpty from "source/template-image-empty.png";

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
`;
const AdditionalForm = styled.div`
  margin-top: 25px;
  width: 335px;

  // *{border: 1px dashed black; }
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
        margin-bottom: 10px;

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
  width: 335px;

  .reset-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: 5px;
    color: #707070;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const DesignTemplateSelector = styled.div`
  .title {
    width: max-content;
    color: #707070;
    padding: 10px 5px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1rem;
  }
  .template-wrapper {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .element {
    min-width: 150px;
    margin: 5px;
    border: 2px solid #EFEFEF;
    padding: 5px;
    :hover {
      border: 2px solid #777777;
    }
  }
`;
const DesignElement = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR";
  z-index: 700;
  width: 300px;
  height: 150px;
  border-radius: 15px;
  // background-size: cover;
  img{
    max-width: 100%;
    max-height: 100%;
    // background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${props => props.img});
  }
  
  .cover {
    // cursor: default;
    z-index: 701;
    position: absolute;
    border-radius: 15px;
    background-image: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(32,32,32, 0.7)100%); 
    width: 330px;
    height: 330px;
  }
  .innerbox {
    z-index: 703;
    position: absolute;
    width: 274.08px;
    color: #FFFFFF;
    line-height: 40px;
    height: 35px;
    font-family: Noto Sans KR;
    margin-left: 25px;
    margin-top: 201px;
    .design-title {
      font-size: 20px;
      font-weight: 700;
      text-shadow:2px 2px 6px gray;
      display: flex;
      justify-content: space-between;
    }
    .update-time { 
      margin-top: 5px;
      font-weight: 300;
      border: 1px solid red;
      width: max-content;
      height: 25px;
      font-size: 17px;
      font-family: Noto Sans KR;
      text-shadow:2px 2px 6px gray;
      line-height: 25px;
      text-align: right;
      // cursor: default;
    }
    .user-name {
      font-size: 20px;
      font-weight: 300;
      text-shadow:2px 2px 6px gray;
      // cursor: default;
    }  
    .user-update-wrapper {
      width: 285px;
      display: flex;
      justify-content: space-between;
    }
  }
  .counter {
    z-index: 703;
    position: absolute;
    left: 24.92px;
    top: 286px;
    display: flex;
    justify-content: space-start;
    width: 291px;
    height: 22px;
    text-align: left;
    line-height: 40px;
    font-size: 15px;
    font-weight: 500;
    align-items: center;
  }
  .view {
    z-index: 703;
    margin-right: 4.25px;
  }
  .view-count {
    z-index: 703;
    margin-right: 6px;
    // cursor: default;
  }
  .like {
    z-index: 703;
    margin-right: 4px;
    img{
      width: 13px;
      height: 13px;
    }
  } 
  .like-count {
    z-index: 703;
    margin-right: 6px;
    // cursor: default;
  }
  .fork {
    z-index: 703;
    margin-right: 4px;
    img {
      width: 22px;
      height: 11px;
    }
  }
  .fork-count {
    z-index: 703;
    margin-right: 0px;
    // cursor: default;
  }
`;
const DelBtn = styled.button`
  position: absolute;
  top: 80%;
  left: 95%;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${opendesign_style.color.main.basic};
  color: white;
  text-align: center;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  i.icon {
    margin: 0;
  }
  &:focus .subMenu {
    display: block;
  }
`;
const EditorWrapper = styled.div`
  color: #707070;
  .preview-text {
    margin: 10px;
    font-size: 1.2rem;
    line-height: 1rem;
    font-weight: 500;
  }
  .title {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1rem;
    margin: 10px;
  }
  .editor{
    opacity: .75;
    width: ${window.innerWidth - 30}px;
    overflow: auto;
  }
`;
const template = [
  { type: "empty", text: "빈 템플릿", img: templateImgEmpty },
  { type: "fashion", text: "일반디자인 템플릿", img: templateImgDesign },
  { type: "engineering", text: "공학디자인 템플릿", img: templateImgEngineering },
  { type: "software", text: "소프트웨어디자인 템플릿", img: templateImgSofware },
];
const STEP_BASIC = 0;
const STEP_ADDITIONAL = 1;
const STEP_CONTENT = 2;

export default
  class CreateDesignMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // common
      step: STEP_BASIC,
      basic: false,
      additional: false,
      loading: false,

      // step 0 - basic
      thumbnail: thumbnailSVG,
      thumbnail_name: "",
      title: "",
      explanation: "",

      // step 1 - additional
      categoryLevel1: this.props.userInfo.category1 || null,
      categoryLevel2: null,
      categoryLevel3: null,
      members: [], addmem: [], delmem: [], // alone: true, 
      license1: true, license2: true, license3: true,

      // step 2 - content
      is_project: 0,
      contents: [],
      showSearch: false,

      // info_dialog: false, crop: { unit: "%", width: 50, aspect: 1 }, designId: null, isMyDesign: false, 
      // editor: false, cropper: false, is_rectangle: false, type: null, template: null,
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
    this.checkFinishAdditional();
    this.setState({ step: STEP_ADDITIONAL });
  }
  goStep2 = () => {
    this.checkFinishAdditional();
    this.setState({ step: STEP_CONTENT });
  }
  StepMenu1Clicked = () =>
    this.state.step != STEP_BASIC
      ? this.setState({ step: STEP_BASIC })
      : null;

  StepMenu2Clicked = () =>
    this.state.basic || this.state.step >= STEP_ADDITIONAL
      ? this.setState({ step: STEP_ADDITIONAL })
      : alert(strErrorDoNotNextStep);

  StepMenu3Clicked = () =>
    ((this.state.additional && this.state.step === STEP_BASIC) || this.state.step === STEP_ADDITIONAL)
      ? this.setState({ step: STEP_CONTENT })
      : alert(strErrorDoNotNextStep);

  checkFinishAdditional = async () => {
    const { categoryLevel1, /*alone, members,*/ license1, license2, license3 } = this.state;

    // category
    if (categoryLevel1 == null) {
      await this.setState({ additional: false });
      return;
    }

    // license
    if (!(license1 && license2 && license3)) {
      await this.setState({ additional: false });
      return;
    }

    await this.setState({ additional: true, content: true });
  };
  onChangeCategory1 = async () => {
    await this.setState({
      categoryLevel1: document.getElementById("cate1").value,
      categoryLevel2: null,
      categoryLevel3: null
    });
    this.checkFinishAdditional();
  };
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
  onClickedLicense1 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  };
  onClickedLicense2 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  };
  onClickedLicense3 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  };
  searchMember = async (event) => {
    const value = await document.getElementById("search-member-input").value.trim();
    if (value.length === 0) {
      this.setState({ showSearch: false });
    } else {
      this.setState({ showSearch: true });
      this.props.searchMember(value);
    }
  };
  selectedMember = async (member) => {
    const { email, s_img, nick_name, uid } = member;
    this.addMember(email, s_img, nick_name, uid);
  }
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member)
    });
    this.checkFinishAdditional();
    this.setState({ alone: false });
    this.setState({ showSearch: false });
    document.getElementById("search-member-input").value = "";
  };
  removeMember = async (user_id) => {
    // remove from addmem
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    // display member list
    console.log("removeMember:", this.state.members, user_id);
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });
    this.checkFinishAdditional();

    if (this.state.members.length === 0) {
      this.setState({ alone: true });
    }
  };

  Submit = () => {
    this.setState({ loading: true });

    const {
      contents, categoryLevel1, categoryLevel2, title, explanation,
      license1, license2, license3,
      thumbnail, thumbnail_name } = this.state;
    contents && contents.map(content => {
      delete content.initClick;
      return content;
    });
    let data = {
      uid: this.props.userInfo.uid,
      is_project: this.state.is_project,
      contents: contents, // [*]
      category_level1: categoryLevel1, category_level2: categoryLevel2, explanation: explanation,
      files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
      is_commercial: license1 ? 1 : 0, is_display_creater: license2 ? 1 : 0, is_modify: license3 ? 1 : 0,
      members: {
        add: this.state.addmem, del: this.state.delmem
      },
      title: title,

      // added
      type: this.state.type, steps: this.state.steps,

    };

    // let designId = null;
    this.props.CreateDesignRequest(data, this.props.token)
      .then(async (res) => {
        if (res.success) {
          // designId = res.design_id;
          window.location.href = geturl() + `/designDetail/` + res.design_id; // designId;
        }
      })
      .catch(err => alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다."));
    this.setState({ loading: false });
  };
  onChangeValue = async (data, order) => {
    this.setState({ contents: update(this.state.contents, { [order]: { contents: { $set: data.content } } }) });
  };
  onChangeFile = async (data) => {
    let copyContent = [...this.state.contents];
    delete data.initClick;
    delete data.target;
    await copyContent.splice(data.order, 1, data);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        return item;
      })
    );
    await this.setState({ contents: copyContent });
  };
  onAddValue = async (data) => {
    let copyContent = [...this.state.contents];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ contents: newContent });
  };
  render() {

    console.log(this.props, this.state);

    const {
      loading, step, basic, additional,
      thumbnail: thumbnailURL,
      title, explanation,
      categoryLevel1, categoryLevel2, categoryLevel3,
      showSearch,
      license1, license2, license3,
      is_project, contents,
    } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}

      <Wrapper>

        <StepMenu>
          <Step onClick={this.StepMenu1Clicked} className={`${step === STEP_BASIC ? "selected" : ""}`}>기본정보</Step>
          <Step onClick={this.StepMenu2Clicked} className={`${step === STEP_ADDITIONAL ? "selected" : ""}`}>부가정보</Step>
          <Step onClick={this.StepMenu3Clicked} className={`${step === STEP_CONTENT ? "selected" : ""}`}>컨텐츠정보</Step>
        </StepMenu>

        <CreateForm>
          {/* 기본정보 */}
          {step === STEP_BASIC
            && <BasicForm>
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
                    className="inputText"
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
          {step === STEP_ADDITIONAL
            && <AdditionalForm>
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
                      <input
                        id="search-member-input"
                        onKeyDown={this.searchMember}
                        placeholder="추가할 멤버의 닉네임을 입력해 주세요" />

                      {/* searched */}
                      {<div style={{
                        backgroundColor: "white",
                        position: "absolute",
                        width: "205px",
                        height: `${showSearch ? "50px" : "0px"}`,
                        maxHeight: "150px",
                        overflow: "hidden scroll",
                      }}>
                        {this.props.members
                          && this.props.members
                            //.filter(mem => this.state.members.map(_mem => _mem.uid).includes(mem.uid))
                            .filter(mem => mem.uid !== this.props.userInfo.uid)
                            .filter(mem => !this.state.members.map(m => m.uid).includes(mem.uid))
                            .map((mem, index) =>
                              <div key={index}
                                onClick={() => this.addMember(
                                  mem.email, mem.s_img, mem.nick_name, mem.uid, mem.uid
                                )}>
                                {mem.nick_name}
                              </div>)}
                      </div>}

                      {/* list */}
                      {
                        this.state.members
                          .map((mem, index) =>
                            <div className="added-member-element flex-row space-between" key={index}>
                              <img className="face" src={mem.s_img} />
                              <p className="nick">{mem.nick_name}</p>
                              <a onClick={() => this.removeMember(mem.uid)}>
                                <img className="close" src={closeIcon} />
                              </a>
                            </div>)}

                    </div>
                  </div>

                  <div className="member-tip-wrapper top15">
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

            </AdditionalForm>}

          {/* 컨텐츠정보 */}
          {step === STEP_CONTENT
            && <ContentEditorForm>
              <div
                className="reset-wrapper"
                onClick={() => this.setState({ step: STEP_CONTENT, type: "normal", is_project: 0, contents: [], steps: [], template: null })}>
                작업취소하기<i className="undo icon" />
              </div>
              {is_project === 0
                ? <React.Fragment>
                  {/* edit mode */}
                  {contents && contents.length > 0
                    ? (<React.Fragment>
                      {contents.map(item => {
                        return (<ControllerWrap key={item.order}>
                          {/* <div className="contentWrap"> */}
                          {item.type === "FILE" ?
                            (<FileController
                              item={item}
                              name="source"
                              initClick={this.state.click}
                              getValue={this.onChangeFile}
                              setController={this.setController} />)
                            : null}
                          {item.type === "TEXT" ?
                            <TextController
                              item={item}
                              name={item.name}
                              initClick={this.state.click}
                              getValue={(data) => this.onChangeValue(data, item.order)} />
                            : null}

                          {item.type === "LINK" ?
                            <LinkController item={item} name={item.name} initClick={this.state.click} getValue={(data) => this.onChangeValue(data, item.order)} />
                            : null}

                          <DelBtn
                            type="button"
                            className="editBtn"
                            onClick={() => this.onDelete(item.order)}>
                            <i className="trash alternate icon large" />
                          </DelBtn>
                        </ControllerWrap>)
                      })}
                      <AddContent getValue={this.onAddValue} order={contents.length} />
                    </React.Fragment>)
                    : <AddContent getValue={this.onAddValue} order={0} change={() => this.setState({ type: "grid", is_project: 1 })} />}
                </React.Fragment>
                : null}

              {/* selected grid */}
              {this.state.type === "grid" ?
                /* first suggest design templete */
                <DesignTemplateSelector>
                  <div className="title">템플릿을 선택하시면 보다 편하게 작업을 시작하실 수 있습니다!</div>

                  <div className="template-wrapper">
                    {template &&
                      template.length > 0 &&
                      template.map(item =>
                        <label
                          className="element"
                          key={item.type}
                          onClick={async () => await this.setState({ template: item.type })}>
                          {item.text}
                          <DesignElement>
                            <img alt="" src={item.img} /></DesignElement>
                        </label>
                      )}
                  </div>
                </DesignTemplateSelector>
                : null}

              {(this.state.type === "grid" && this.state.template != null && this.state.template !== "my-design") &&
                <EditorWrapper>
                  <div className="preview-text">
                    미리보기
                  </div>

                  <div className="editor">
                    <TemplateGridEditor
                      mobile
                      selected={content => this.setState({ steps: content, is_project: 1 })}
                      type={this.state.template} />
                  </div>

                  <div className="title">
                    선택하신 템플릿으로 시작하시고 싶으시다면<br />
                    아래에 완료 버튼을 클릭해주세요.
                  </div>
                </EditorWrapper>}

            </ContentEditorForm>}

        </CreateForm>

        <StepButtonWrapper>

          <button onClick={() => window.history.go(-1)} className="cancel">{strButtonCancel}</button>

          {step !== STEP_BASIC &&
            <button
              onClick={() => this.setState({ step: this.state.step - 1 })}
              className="cancel"
            >
              {strButtonPrev}</button>}

          {step === STEP_BASIC &&
            <button
              onClick={
                () => basic
                  ? this.goStep1()
                  : thumbnailURL === thumbnailSVG
                    ? alert("섬네일을 선택해주세요.")
                    : alert("디자인제목을 입력해주세요.")}
              className={`${basic ? "" : "impossible"} next`}>
              {strButtonNext}</button>}

          {step === STEP_ADDITIONAL &&
            <button
              onClick={() => basic && additional
                ? this.goStep2()
                : alert("단계를 완성하여 주세요.")
              }
              className={`${additional ? "" : "impossible"} next`}>
              {strButtonNext}</button>}

          {step === STEP_CONTENT &&
            <button
              onClick={() => basic && additional ? this.Submit() : alert(strErrorDoNotNextStep)}
              className={`${basic && additional ? "" : "impossible"} next`}>
              {strButtonComplete}</button>}

        </StepButtonWrapper>

      </Wrapper>

    </React.Fragment >);
  };
};
