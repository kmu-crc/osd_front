import React from "react";
import update from "react-addons-update";
import styled from 'styled-components';
import Loading from "components/Commons/Loading";
import required from "resources/images/mobile_create_design_required.svg";
import thumbnailSVG from "resources/images/mobile_create_design_thumbnail.svg";
import { strButtonPrev, strErrorDoNotNextStep, strButtonSave, strButtonComplete, strButtonCancel, strButtonNext } from "constant";
import { geturl } from "config";
import helpIcon from "resources/images/help_black_24dp.svg";
import closeIcon from "resources/images/icon_close.svg";
import checkedIcon from "resources/images/icon_checked.svg";
import uncheckedIcon from "resources/images/icon_unchecked.svg";
import Logo from "source/osd_logo.png";

import GridEditorMobile from "components/Designs/GridEditor/GridEditorMobile";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";

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
const LoadingBox = styled.div`
  padding-top: 200px;
  .IconBox {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  .loadingText{
    margin-top: 20px;
    width: 100%;
    font-family: Noto Sans KR;
    font-size: 20px;
    text-align: center;
  }
`;
const LoadingIconBox = styled.div`
  width:100px;
  height:100px;
  margin:0 auto;
  background: ${props => `url(${props.imageURL})`};
  background-position:center center;
  background-repeat:no-repeat;
  -webkit-animation: jello-horizontal 0.9s infinite both;
            animation: jello-horizontal 0.9s infinite both;
  
  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
`;
const STEP_BASIC = 0;
const STEP_ADDITIONAL = 1;
const STEP_CONTENT = 2;

export default
  class ModifyDesignMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // common
      step: 2, //STEP_BASIC,
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

    };
  }

  componentDidMount() {
    const { DesignDetail: detail } = this.props;
    if (!detail) {
      alert("디자인정보를 가져오지 못하였습니다.");
      window.history.go(-1);
      return;
    }
    const initstate = {
      // categoryName: "C/C++"
      // children_count: {count(*): 1}
      // is_members: 0
      // is_parent: true
      // is_problem: 0
      // is_public: 1
      // is_team: 1
      // parent_design: 4574
      // parent_title: "C/C++ 프로그래밍 과제 템플릿"
      // userName: "+김정혁(관리자)"
      // user_id: 762
      // waitingStatus: 0
      // wires: null

      // step 0 - basic
      thumbnail: (detail.img && detail.img.l_img) || thumbnailSVG,
      title: detail.title,
      explanation: detail.explanation,

      // step 1 - additional
      categoryLevel1: detail.category_level1,
      categoryLevel2: detail.category_level2,
      categoryLevel3: detail.category_level3,

      members: detail.member.filter(item => item.uid === detail.user_id),
      license1: detail.is_commercial === 1,
      license2: detail.is_display_creater === 1,
      license3: detail.is_modify === 1,

      // step 2 - content
      is_project: detail.is_project,
    };

    this.setState(initstate, () => {
      this.checkFinishBasic();
      this.checkFinishAdditional();
    });

    if (this.props.id) {
      this.props.GetDesignBoardRequest(this.props.id)
      this.setState({ content: true, designId: this.props.id, grid: true, loading: false });
    } else {
      alert("디자인 정보가 없습니다.");
      window.history.go(-1);
    }

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
    const { categoryLevel1, license1, license2, license3 } = this.state;

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

  update = () => {
    const data = {
      user_id: this.props.userInfo.user_id,
      category_level1: this.state.categoryLevel1,
      category_level2: this.state.categoryLevel2,
      category_level3: this.state.categoryLevel3,
      title: this.state.title,
      explanation: this.state.explanation,
      files:
        [{
          value: this.state.thumbnail,
          name: this.state.thumbnail_name,
          key: "thumbnail[]"
        }],
      members: {
        add: this.state.addmem,
        del: this.state.delmem
      },
      is_commercial: this.state.license1 ? 1 : 0,
      is_display_creater: this.state.license2 ? 1 : 0,
      is_modify: this.state.license3 ? 1 : 0
    };
    if (data.files[0].name === '') {
      delete data.files;
    }
    this.setState({ loading: true });
    this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
      .then(async (data) => {
        console.log(data, data.res && data.res.success);
        if (data.res && data.res.success) {
          await alert("디자인 정보 수정이 완료되었습니다. 디자인보기 화면으로 이동합니다.", "확인");
          window.location.href = geturl() + '/designDetail/' + this.props.DesignDetail.uid;
        } else {
          await alert("디자인 정보 수정에 실패하였습니다.", "확인");
        }
      })
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
              {<div className="fadein separator " />}
              {<div className="fadein design-title">
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
              {<div className="fadein separator " />}
              {<div className="fadein design-title">
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
                              // selected={categoryLevel1 === cate1.value}
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
                            <option disabled value>{"3차 카테고리(옵션)"}</option>
                            {this.props.category3[categoryLevel2 - 2].map((cate3, index) =>
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

              {this.state.grid ?
                this.props.DesignDetail && this.props.DesignDetail.is_project
                  ? <GridEditorMobile
                    editor={true}
                    isMyDesign={true}
                    design={this.props.DesignDetail}
                    {...this.props}
                  />

                  : <DesignDetailViewContainer
                    history={this.props.history}
                    id={this.props.DesignDetail.uid}
                    isMyDesign={true}
                    editor={false}
                  />
                : <LoadingBox>
                  <LoadingIconBox imageURL={Logo} />
                  <div className="loadingText">컨텐츠 에디터를 가져오고 있습니다...</div>
                </LoadingBox>}

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

          {step === STEP_BASIC
            ? <React.Fragment>
              <button
                onClick={
                  () => basic
                    ? this.goStep1()
                    : thumbnailURL === thumbnailSVG
                      ? alert("섬네일을 선택해주세요.")
                      : alert("디자인제목을 입력해주세요.")}
                className={`${basic ? "" : "impossible"} next`}>
                {strButtonNext}</button>
              <button
                onClick={() => basic ? this.update() : alert(strErrorDoNotNextStep)}
                className={`${basic ? "" : "impossible"} next`}>
                {strButtonSave}</button>

            </React.Fragment>
            : null}

          {step === STEP_ADDITIONAL
            ? <React.Fragment>
              <button
                onClick={() => basic && additional
                  ? this.goStep2()
                  : alert("단계를 완성하여 주세요.")
                }
                className={`${additional ? "" : "impossible"} next`}>
                {strButtonNext}</button>
              <button
                onClick={() => additional ? this.update() : alert(strErrorDoNotNextStep)}
                className={`${additional ? "" : "impossible"} next`}>
                {strButtonSave}</button>
            </React.Fragment>
            : null}

        </StepButtonWrapper>

      </Wrapper>

    </React.Fragment >);
  };
};






// import React, { Component } from "react";
// import GridEditorMobile from "components/Designs/GridEditor/GridEditorMobile";
// import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";

// import styled from "styled-components";
// import { geturl } from "config";
// import noimg from "source/noimg.png"
// //import forked from "source/forked.svg";
// import noface from "source/thumbnail.png";
// // import iDelete from "source/deleteItem.png"
// import Cross from "components/Commons/Cross";
// import Loading from "components/Commons/Loading";
// import { Dropdown, } from "semantic-ui-react";
// import Logo from "source/osd_logo.png"
// import CheckBox2 from "components/Commons/CheckBox";
// import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
// // import { alert } from "components/Commons/Alert/Alert";
// import { confirm } from "components/Commons/Confirm/Confirm";
// import opendesign_style from "opendesign_style";

// const designImageText = "디자인 이미지";
// const MainBanner = styled.div`
//   width: 100%;
//   height: 140px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   .title {
//     width: max-content;
//     height: 37px;
//     margin-top: 45px;
//     font-size: 25px;
//     font-family: Noto Sans KR;
//     color: #707070;
//     line-height: 37px;
//     font-weight: 700;
//   }
// `;
// const MainSection = styled.div`
// `;
// const MenuItem = styled.div`
//   padding: 10px;
//   lineHeight: 29px;
//   cursor:pointer;
//   .deleteText{
//     width: max-content;
//     margin-left: auto;
//     margin-right: 10px;
//     color: red;
//   }
// `;
// const InputBoard = styled.div`
//   // width: ${window.innerWidth > 1920 ? 1422 : window.innerWidth - 500}px;
//   width:77%;
//   padding-bottom:100px;
//   margin-bottom:100px;
//   position:relative;
//   padding-top:45px;
//   border-radius:5px;
//   border:8px solid #F5F4F4;
//   .buttonBox{
//     width: max-content;
//     display: flex;
//     justify-content:flex-end;
//     margin-top: 21px;
//     margin-left: auto;
//     padding:10px 0px 10px 10px;
//     position:absolute;
//     right:0px;
//     bottom:0px;
//   }

//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     width:100%;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     width:100%;
//   }
// `;
// const CustomButton = styled.div`
//   cursor: pointer;
//   width: 104.5px;
//   height: 44px;
//   border-radius: 5px;
//   background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
//   padding-top: 6px;
//   padding-left: 15px;
//   margin-right: 25px;
// `;
// const BtnText = styled.p`
//   width: 74px;
//   padding: 0px;
//   font-familty: Noto Sans KR;
//   font-weight: 500;
//   line-height: 29px;
//   text-align: center;
//   font-size: 20px;
//   color: #FFFFFF;
// `;
// //---sectionbasic---//
// const ContentsBox = styled.div`
//   padding-left: 47px;
//   display:flex;
//   flex-direction:column;
//   .title{
//     min-width: 100px;
//     height: 29px;
//     text-align: left;
//     font-size: 20px;
//     font-weight: 500;
//     line-height: 29px;
//     color: #707070;
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//   padding:15px;
//     .title{
//       margin-bottom:10px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//       padding:15px;
//       display:flex;
//       flex-direction:column;
//       align-items:center;
//   }
// `;
// const ImageBox = styled.div`
//   margin: auto;
//   min-width: 220px;
//   min-height: 220px;
//   max-width: 220px;
//   max-height: 220px;
//   border-radius: 5%;
//   background: ${props => `url(${props.imageURL})`};
//   background-size: cover;
//   background-position: center center;
// `;
// const ThumbnailBox = styled.div`
//   display:flex;
//   justify-content:flex-start;
//   flex-direction:row;
//   .explainBox{
//     margin-left:54px;
//     margin-top:100px;
//   }
//   .findThumbnailBtn{
//     width:63px;
//     height:25px;
//     cursor:pointer;
//   }
//   .findThumbnailText{
//     font-family:Noto Sans KR;
//     font-size:17px;
//     font-weight:500;
//     text-align:left;
//     line-height:25px;
//     color:#FF0000;
//     border-bottom:1.5px solid #FF000;
//     cursor:pointer;
//   }
//   .findThumbnailBox{
//     margin-left:54px;
//     margin-top:100px;
//     .thumbnailExplainText{
//       width:341px;
//       height:45px;
//       margin-top:11px;
//       font-weight:300;
//       font-size:14px;
//       color:#707070;
//       line-height:20px;
//       text-align:left;
//     }
//   }

//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//       flex-direction:column;
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//       flex-direction:column;
//       width:100%;
//           .findThumbnailBox{
//           margin-left:0px;
//           margin-top: 5px;

//           display:flex;
//           flex-direction:column;
//           justify-content:center;
//               .thumbnailExplainText{
//                   width:100%;
//               }
//       }
//   }
// `;
// const TitleBox = styled.div`
//   display:flex;
//   margin-top: 9px;
//   justify-content:flex-start;
//   flex-direction:row;
//   .inputText{
//     width:505px;
//     height:56px;
//     margin-left:67px;
//     padding-left:22px;
//     padding-right:22px;
//     font-size:20px;
//     font-weight:300;
//     font-family:Noto Sans KR;
//     line-height:29px;
//     color:#707070;
//     border:none;
//     border-radius:5px;
//     outline:none;
//     background-color:#EFEFEF;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//     }

//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//       width:80%;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     flex-direction:column;
//     .inputText{
//       margin-left:0px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     flex-direction:column;
//     width:100%;
//     .inputText{
//       margin-left:0px;
//       width:100%;
//     }
//   }
// `;
// const ExplainBox = styled.div`
//   margin-top: 10px;
//   display: flex;
//   justify-content:flex-start;
//   flex-direction:row;
//   .inputTextareaBox {
//     width: 717px;
//     height: 244px;
//     margin-left: 70px;
//     padding: 22px 26px 34px 32px;
//     font-family: Noto Sans KR;
//     font-size: 20px;
//     font-weight: 300;
//     color: #707070;
//     line-height: 35px;
//     text-align: left;
//     outline: none;
//     border: none;
//     border-radius: 5px;
//     resize: none;
//     background-color: #EFEFEF;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .inputTextareaBox {
//       margin-left: 0px;
//     }
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;

//     .inputTextareaBox {
//       width:100%;
//       margin-left: 0px;
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     width:100%;
//   }
// `;
// //---additional--//
// const CategoryBox = styled.div`
//   width:100%;
//   display:flex;
//   justify-contant:flex-start;
//   flex-direction:row;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     // flex-direction:column;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;
//   }
// `;
// const CategoryDropDown = styled(Dropdown)`
//   width:410px;
//   height:56px;     
//   border-radius:5px;
//   font-size:20px;
//   background-color:#EFEFEF !important;
//   margin-right:30px;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {

//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     margin-top:10px;
//     width:90%;
//   }
// `;
// const InviteMemberBox = styled.div`
//   display:flex;
//   justify-content:flex-start;
//   flex-direction:row;
//   margin-top: 10px;
//   .searchBox{
//     width:645px;
//     height:56px;
//     font-size:20px;
//     font-weight:500;
//     line-height:29px;
//     color:#707070;
//     border-radius:5px;
//     background-color:#EFEFEF;
//   }
//   .tipTitle{
//     width:27px;
//     height:25px;
//     margin-left:20px;
//     font-size:17px;
//     font-weight:500;
//     line-height:25px;
//     text-align:left;
//     color:#FF0000;
//   }
//   .tipDescription{  
//     margin-left:17px;
//     font-size: 13px;
//     font-weight:100;
//     font-family:Noto Sans KR;
//     text-align:left;
//     line-height:25px;
//     color:#707070;
//   }      
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .searchBox{
//     }
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;
//     .searchBox{
//       width:92%;
//     }
//   }   
// `;
// const InviteMemberListBox = styled.div`
//   margin-top:20px;
//   margin-left:167px;
//   width:645px;
//   .memberList{
//     display:flex;
//     flex-wrap:wrap;
//     flex-direction:row;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     margin-left:0px;
//     width:645px;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     margin-left:0px;
//     width:92%;
//   }
// `;
// const LicenseBox = styled.div`
//   margin-top: 22px;
//   width: 100%;
//   .licenseList {
//     .licenseItem {
//       margin-bottom: 15px;
//       color: #707070;
//       font-size: 16px;
//       font-weight: 500;
//       font-family: Noto Sans KR;
//       .textLabel {
//         margin-left: 25px;
//         vertical-align: top;
//       }
//     }
//   }
// `;
// const LoadingBox = styled.div`
//   padding-top: 200px;
//   .IconBox {
//     width: 100px;
//     height: 100px;
//     margin: 0 auto;
//   }
//   .loadingText{
//     margin-top: 20px;
//     width: 100%;
//     font-family: Noto Sans KR;
//     font-size: 20px;
//     text-align: center;
//   }
// `;
// const LoadingIconBox = styled.div`
//   width:100px;
//   height:100px;
//   margin:0 auto;
//   background: ${props => `url(${props.imageURL})`};
//   background-position:center center;
//   background-repeat:no-repeat;
//   -webkit-animation: jello-horizontal 0.9s infinite both;
//             animation: jello-horizontal 0.9s infinite both;

//   @-webkit-keyframes jello-horizontal {
//     0% {
//       -webkit-transform: scale3d(1, 1, 1);
//               transform: scale3d(1, 1, 1);
//     }
//     30% {
//       -webkit-transform: scale3d(1.25, 0.75, 1);
//               transform: scale3d(1.25, 0.75, 1);
//     }
//     40% {
//       -webkit-transform: scale3d(0.75, 1.25, 1);
//               transform: scale3d(0.75, 1.25, 1);
//     }
//     50% {
//       -webkit-transform: scale3d(1.15, 0.85, 1);
//               transform: scale3d(1.15, 0.85, 1);
//     }
//     65% {
//       -webkit-transform: scale3d(0.95, 1.05, 1);
//               transform: scale3d(0.95, 1.05, 1);
//     }
//     75% {
//       -webkit-transform: scale3d(1.05, 0.95, 1);
//               transform: scale3d(1.05, 0.95, 1);
//     }
//     100% {
//       -webkit-transform: scale3d(1, 1, 1);
//               transform: scale3d(1, 1, 1);
//     }
//   }
//   @keyframes jello-horizontal {
//     0% {
//       -webkit-transform: scale3d(1, 1, 1);
//               transform: scale3d(1, 1, 1);
//     }
//     30% {
//       -webkit-transform: scale3d(1.25, 0.75, 1);
//               transform: scale3d(1.25, 0.75, 1);
//     }
//     40% {
//       -webkit-transform: scale3d(0.75, 1.25, 1);
//               transform: scale3d(0.75, 1.25, 1);
//     }
//     50% {
//       -webkit-transform: scale3d(1.15, 0.85, 1);
//               transform: scale3d(1.15, 0.85, 1);
//     }
//     65% {
//       -webkit-transform: scale3d(0.95, 1.05, 1);
//               transform: scale3d(0.95, 1.05, 1);
//     }
//     75% {
//       -webkit-transform: scale3d(1.05, 0.95, 1);
//               transform: scale3d(1.05, 0.95, 1);
//     }
//     100% {
//       -webkit-transform: scale3d(1, 1, 1);
//               transform: scale3d(1, 1, 1);
//     }
//   }
// `;
// const emptyCategory = [{ value: 0, text: "" }];
// const PeerWrapper = styled.div`
//   cursor: pointer;
//   display: flex;
//   margin-right: 50px;
//   margin-top: 10px;
//   .pic {
//     background-size: cover;
//     background-position: center;
//     background-image: url(${props => props.img});
//     background-color: #D6D6D6;
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//   }
//   .nick {
//     margin-top: 1px;
//     margin-left: 10px;
//     font-size: 20px;
//     line-height: 29px;
//     text-align: left;
//     font-weight: 500;
//     font-family: Noto Sans KR;
//     color: #707070;
//     width: max-content;
//     height: 29px;
//   }
//   .cross {
//     margin-top: 7.34px;
//     margin-left: 13.86px;
//   }
// `;
// function Peer(props) {
//   return (<PeerWrapper img={props.s_img || noface}>
//     <div className="pic" />
//     <div className="nick">{props.nick_name}</div>
//     <div className="cross">
//       <Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
//   </PeerWrapper>)
// };

// class ModifyDesignMobile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       deleteModal: false,
//       loading: false, designId: null, isMyDesign: false, editor: false,
//       basic: false, additional: false, content: false, step: 0, title: "", explanation: "",
//       showSearch: false, thumbnail: noimg, thumbnail_name: "", grid: false,
//       categoryLevel1: null, categoryLevel2: null, alone: false, members: [], addmem: [], delmem: [], license1: true, license2: false, license3: false,
//     }
//     this.addMember = this.addMember.bind(this);
//     this.removeMember = this.removeMember.bind(this);
//     this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
//     this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
//     this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
//     this.onChangeCategory1 = this.onChangeCategory1.bind(this);
//     this.onChangeCategory2 = this.onChangeCategory2.bind(this);
//     this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
//     this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
//     this.cancelDeleteDesign = this.cancelDeleteDesign.bind(this);
//   }
//   shouldComponentUpdate(nextProps) {
//     if (this.props.DesignDetail !== nextProps.DesignDetail) {
//       //console.log("img", nextProps.DesignDetail.img);
//       this.setState({
//         thumbnail: nextProps.DesignDetail.img == null ? noimg : nextProps.DesignDetail.img.m_img,
//         title: nextProps.DesignDetail.title,
//         explanation: nextProps.DesignDetail.explanation,
//         categoryLevel1: nextProps.DesignDetail.category_level1,
//         categoryLevel2: nextProps.DesignDetail.category_level2,
//         members: nextProps.DesignDetail.member && nextProps.DesignDetail.member.filter((mem) => { return mem.user_id !== this.props.userInfo.uid }),
//         license1: nextProps.DesignDetail.is_commercial,
//         license2: nextProps.DesignDetail.is_display_creater,
//         license3: nextProps.DesignDetail.is_modify
//       })
//     }
//     return true;
//   }
//   componentDidMount() {
//     if (this.props.id) {
//       this.props.GetDesignBoardRequest(this.props.id)
//       this.setState({ content: true, designId: this.props.id, grid: true, loading: false });
//     } else {
//       alert("디자인 정보가 없습니다.");
//       window.history.go(-1);
//     }
//   }
//   handleOnChangeThumbnail(event) {
//     event.preventDefault();
//     const reader = new FileReader();
//     const file = event.target.files[0];
//     reader.onloadend = () => {
//       this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
//     }
//     if (event.target.files[0]) {
//       reader.readAsDataURL(file);
//     }
//   }
//   onChangeValueThumbnail = async data => {
//     let obj = {};
//     if (data.target) {
//       obj[data.target.name] = data;
//       await this.setState(obj);
//       //console.log("thumbnail:", this.state);
//     }
//     this.checkFinishBasic();
//   };
//   onChangeValueTitle = async event => {
//     if (event.target) {
//       await this.setState({ title: event.target.value });
//     }
//     this.checkFinishBasic();
//   };
//   onChangeValueExplanation = async event => {
//     if (event.target) {
//       await this.setState({ explanation: event.target.value });
//     }
//     this.checkFinishBasic();
//   };
//   onKeyDownEnter(event) {
//     if (event.key === "Enter") {
//       document.getElementById("explainBox").focus();
//     }

//   }
//   onKeyPress = () => {
//     this.checkFinishBasic();
//   }
//   gotoPrevStep = () => {
//     this.setState({ step: this.state.step - 1 });
//   }
//   gotoNextStep = () => {
//     this.setState({ step: this.state.step + 1 });
//   }
//   gotoStep = (menu) => {
//     if (this.state.basic) { };
//     this.setState({ step: menu.step });
//   }
//   checkFinishBasic = async () => {
//     const { title, thumbnail, } = this.state;
//     if (title && title.length > 0 && thumbnail && thumbnail.img) {
//       await this.setState({ basic: true });
//     } else {
//       await this.setState({ basic: false });
//     }
//   }
//   checkFinishAdditional = async () => {
//     const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
//     if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0))) {
//       await this.setState({ additional: true });
//     } else {
//       await this.setState({ additional: false });
//     }
//   }
//   submit = () => {
//     const data = {
//       user_id: this.props.DesignDetail.user_id,
//       category_level1: this.state.categoryLevel1, category_level2: this.state.categoryLevel2,
//       title: this.state.title, explanation: this.state.explanation,
//       files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name, key: "thumbnail[]" }],
//       members: { add: this.state.addmem, del: this.state.delmem },
//       is_commercial: this.state.license1 ? 1 : 0, is_display_creater: this.state.license2 ? 1 : 0, is_modify: this.state.license3 ? 1 : 0
//     };
//     if (data.files.length <= 0 || data.files[0].value === this.props.DesignDetail.img.m_img) {
//       delete data.files;
//     }
//     this.setState({ loading: true });
//     this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
//       .then(async (data) => {
//         console.log(data, data.res && data.res.success);
//         if (data.res && data.res.success) {
//           await alert("디자인 정보 수정이 완료되었습니다. 디자인보기 화면으로 이동합니다.", "확인");
//           window.location.href = geturl() + '/designDetail/' + this.props.DesignDetail.uid;
//         } else {
//           await alert("디자인 정보 수정에 실패하였습니다.", "확인");
//         }
//       })
//     this.setState({ loading: false });
//     // window.location.href = geturl() + `/designDetail/` + this.state.designId;
//   }
//   onChangeCategory1(event, { value }) {
//     this.setState({ categoryLevel1: { value }.value });
//     this.checkFinishAdditional();
//   }
//   onChangeCategory2(event, { value }) {
//     this.setState({ categoryLevel2: { value }.value })
//     this.checkFinishAdditional();
//   }
//   onCheckedLicense01 = async () => {
//     await this.setState({ license1: !this.state.license1 });
//     this.checkFinishAdditional();
//   }
//   onCheckedLicense02 = async () => {
//     await this.setState({ license2: !this.state.license2 });
//     this.checkFinishAdditional();
//   }
//   onCheckedLicense03 = async () => {
//     await this.setState({ license3: !this.state.license3 });
//     this.checkFinishAdditional();
//   }
//   LeaveMeAlone = async () => {
//     await this.setState({ alone: !this.state.alone, members: [] });
//     this.checkFinishAdditional();
//   }
//   addMember = async (email, s_img, nick_name, uid) => {
//     let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
//     await this.setState({
//       members: this.state.members.concat(member),
//       addmem: this.state.addmem.concat(member)
//     });
//     // console.log("members[]====", this.state.members, this.state.addmem);
//     this.checkFinishAdditional();
//     this.setState({ alone: false });
//   }
//   removeMember = async (user_id) => {
//     // remove from addmem
//     if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
//       await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
//     } else { // remove if not in addmem
//       await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
//     }
//     // display member list
//     await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });

//     if (this.state.members.length === 0) {
//       this.setState({ alone: true })
//     }
//   }
//   deleteDesign = async () => {
//     const answer = await confirm("디자인을 삭제하시겠습니까?", "확인", "취소");
//     answer && this.props.DeleteDesignRequest(this.props.id, this.props.token)
//       .then(async () => {
//         window.location.href = geturl() + `/design`;
//       })
//       .catch(async () => {
//         await alert("삭제에 실패하였습니다.", "확인");
//       });
//   }
//   cancelDeleteDesign = () => {
//     this.setState({ deleteModal: !this.state.deleteModal })
//   }
//   deleteDialog = () => {
//     this.setState({ deleteModal: !this.state.deleteModal })
//   }

//   render() {
//     let arrSummaryList = [];
//     if (this.state.members != null && this.state.members.length > 0) {
//       arrSummaryList = this.state.members.map((item, index) => {
//         return (<div onClick={() => this.removeMember(item.user_id)} key={index}>
//           <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
//         </div>)
//       });
//     }

//     const { step, loading, } = this.state;
//     const thumbnailURL = this.state.thumbnail;
//     //console.log("modify:", this.props)
//     let boardWidth = 125;
//     if (step === 3) boardWidth = 0;
//     return (
//       <React.Fragment>
//         {loading ? <Loading /> : null}
//         <div onClick={this.handleCloseMember}>
//           <MainBanner>
//             <div className="title">디자인 수정하기</div>
//           </MainBanner>
//           <MainSection>
//             <MenuItem className="white" onClick={this.deleteDesign}>
//               <div className="deleteText">디자인 삭제하기</div>
//             </MenuItem>

//             {/* FORM */}
//             <InputBoard boardWidth={boardWidth}>
//               {/* <form ref={(ref) => this.form = ref}> */}
//               {/* THUMBNAIL */}
//               <ContentsBox>
//                 <ThumbnailBox>
//                   <div className="title">{designImageText}<sup style={{ color: "red" }}>*</sup></div>
//                   <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL}>
//                     {this.props.DesignDetail && this.props.DesignDetail.parent_design &&
//                       <div className="forkedImg" />}
//                   </ImageBox>
//                   <div className="findThumbnailBox">
//                     <div className="findThumbnailBtn">
//                       <label className="findThumbnailText" htmlFor="file">찾아보기</label>
//                       <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
//                     </div>
//                     <div className="thumbnailExplainText">{designImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
//                   </div>
//                 </ThumbnailBox>

//                 {/* TITLE */}
//                 <TitleBox>
//                   <div className="title">제목<sup style={{ color: "red" }}>*</sup></div>
//                   <input onChange={this.onChangeValueTitle} onKeyDown={this.onKeyDownEnter}
//                     className="inputText" name="title" maxLength="100" value={this.state.title} placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
//                     onBlur={this.checkFinishBasic} />
//                 </TitleBox>
//                 {/* EXPLANATION */}
//                 <ExplainBox>
//                   <div className="title">디자인 설명</div>
//                   <textarea id="explainBox" className="inputTextareaBox" onChange={this.onChangeValueExplanation}
//                     name="explanation" maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)"
//                     value={this.state.explanation} onBlur={this.checkFinishBasic} />
//                 </ExplainBox>
//               </ContentsBox>

//               {/* CATEGORY */}
//               <ContentsBox>
//                 <TitleBox>
//                   <div className="title">카테고리</div>
//                 </TitleBox>
//                 {this.props.category1.length > 0 ?
//                   <CategoryBox>
//                     {/* category */}
//                     <CategoryDropDown onChange={this.onChangeCategory1}
//                       options={this.props.category1} selection name="category1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
//                     {this.props.category2[this.state.categoryLevel1 - 1] && this.state.categoryLevel1 !== 0
//                       ? <CategoryDropDown options={this.props.category2[this.state.categoryLevel1 - 1]} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />
//                       : <CategoryDropDown options={emptyCategory} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />}
//                   </CategoryBox>
//                   : <p>카테고리를 가져오고 있습니다.</p>}
//               </ContentsBox>

//               {/* MEMBERS */}
//               <ContentsBox>
//                 <TitleBox>
//                   <div className="title">멤버관리</div>
//                 </TitleBox>
//                 {/* INVITE MEMBER */}
//                 <InviteMemberBox>
//                   <div className="additionalTitle ">초대하기
//                   </div>
//                   <div className="searchBox" >
//                     <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />
//                   </div>
//                   <div className="tipTitle">TIP</div>
//                   <div className="tipDescription">
//                     함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
//                     초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
//                     디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
//                 </InviteMemberBox>
//                 {/* INVITED MEMBER */}
//                 {arrSummaryList && arrSummaryList.length > 0 &&
//                   <InviteMemberListBox>
//                     <div className="additionalTitle ">현재멤버 </div>
//                     <div className="memberList">
//                       {arrSummaryList}
//                     </div>
//                   </InviteMemberListBox>}
//               </ContentsBox>

//               {/* LICENSE */}
//               <ContentsBox>
//                 <TitleBox>
//                   <div className="title">라이센스<sup style={{ color: "red" }}>*</sup></div>
//                 </TitleBox>
//                 <LicenseBox>
//                   <div className="licenseList">
//                     <div className="licenseItem">
//                       <CheckBox2
//                         checked={this.state.license1 ? true : false} type="checkbox"
//                         onChange={this.onCheckedLicense01} />
//                       <span className="textLabel">상업적으로 이용이 가능합니다.</span>
//                     </div>
//                     <div className="licenseItem">
//                       <CheckBox2
//                         checked={this.state.license2 ? true : false} type="checkbox"
//                         onChange={this.onCheckedLicense02} />
//                       <span className="textLabel">원작자를 표시합니다.</span>
//                     </div>
//                     <div className="licenseItem">
//                       <CheckBox2
//                         checked={this.state.license3 ? true : false} type="checkbox"
//                         onChange={this.onCheckedLicense03} />
//                       <span className="textLabel">수정이 가능합니다.</span>
//                     </div>
//                   </div>
//                 </LicenseBox>
//               </ContentsBox>

//               {/* DESIGN CONTENTS */}
//               <ContentsBox>
//                 <TitleBox>
//                   <div className="title">디자인 컨텐츠</div>
//                 </TitleBox>
//                 {this.state.grid ?
//                   this.props.DesignDetail &&
//                     this.props.DesignDetail.is_project ?
//                     <GridEditorMobile editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} />
//                     : <DesignDetailViewContainer history={this.props.history} id={this.props.DesignDetail.uid} isMyDesign={true} editor={false} />
//                   :
//                   <LoadingBox>
//                     <LoadingIconBox imageURL={Logo} />
//                     <div className="loadingText">컨텐츠 에디터를 가져오고 있습니다...</div>
//                   </LoadingBox>}
//               </ContentsBox>

//               {/* BUTTONS */}
//               <div className="buttonBox">
//                 <CustomButton
//                   onClick={() => window.history.go(-1)}
//                   isComplete={false}>
//                   <BtnText>취소</BtnText>
//                 </CustomButton>
//                 <CustomButton
//                   isComplete={true}
//                   onClick={this.submit}>
//                   <BtnText>완료</BtnText>
//                 </CustomButton>
//               </div>
//             </InputBoard>
//           </MainSection>
//         </div>
//       </React.Fragment >)
//   }
// }

// export default ModifyDesignMobile;
