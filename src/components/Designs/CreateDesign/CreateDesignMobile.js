import React, { Component } from "react";
import update from "react-addons-update";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";
import noimg from "source/noimg.png";
import noface from "source/thumbnail.png";
import Cross from "components/Commons/Cross";
import CheckBox2 from "components/Commons/CheckBox";
import { Dropdown, Modal } from "semantic-ui-react";
import styled from "styled-components";
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import FileController from "../CardSourceDetail/FileController";
import LinkController from "../CardSourceDetail/LinkController";
import TextController from "../CardSourceDetail/TextControllerPlus";
import TemplateGridEditor from "components/Designs/CreateDesign/TemplateGridEditor";
import { geturl } from "config";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import templateImgDesign from "source/template-image-design.png";
import templateImgSofware from "source/template-image-software.png";
import templateImgEngineering from "source/template-image-engineering.png";
import templateImgEmpty from "source/template-image-empty.png";
import opendesign_style from "opendesign_style";

const MainBanner = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 25px;
  
  .title{
    width: max-content;
    height: 37px;
    margin-top: 45px;
    margin-left: auto;
    margin-right: auto;
    font-size: 25px;
    font-family: Noto Sans KR;
    color: #707070;
    line-height: 37px;
    font-weight: 700;
  }
`;
const MainSection = styled.div`
  // *{border:1px solid black;}

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction: column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction: column;
  }
`;
const InputBoard = styled.div`
  // width: ${window.innerWidth > 1920 ? 1422 : window.innerWidth - 500}px;
  width:77%;
  padding-bottom:100px;
  margin-bottom:100px;
  position:relative;
  padding-top:45px;
  border-radius:5px;
  border:8px solid #F5F4F4;
  .buttonBox{
    width: max-content;
    display: flex;
    justify-content:flex-end;
    margin-top: 21px;
    margin-left: auto;
    padding:10px 0px 10px 10px;
    position:absolute;
    right:0px;
    bottom:0px;
  }

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    width:100%;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    width:100%;
  }
`;
const CustomButton = styled.div`
  cursor: pointer;
  width: 104.5px;
  height: 44px;
  border-radius: 5px;
  background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
  padding-top: 6px;
  padding-left: 15px;
  margin-right: 25px;
`;
const BtnText = styled.p`
  width: 74px;
  padding: 0px;
  font-familty: Noto Sans KR;
  font-weight: 500;
  line-height: 29px;
  text-align: center;
  font-size: 20px;
  color: #FFFFFF;
  cursor: pointer;
`;
const PeerBox = styled.div`
  display: flex;
  margin-right: 25px;
  margin-bottom: 10px;
  .nameLabel{
    width: max-content;
    height: 29px;
    margin-top: 1px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: left;
    line-height: 29px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .closeButton{
    margin-top: 7px;
    margin-left: 14px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    margin-right: 15px;
  }
`;
const PeerIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
`;
//---sectionbasic---//
const ContentsBox = styled.div`
  padding-left: 47px;
  display:flex;
  flex-direction:column;
  .title{
    min-width: 100px;
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
`;
const ImageBox = styled.div`
  margin-left: 67px;
  min-width: 210px;
  min-height: 210px;
  max-width: 210px;
  max-height: 210px;
  border-radius: 5%;
  background: ${props => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
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
          margin-top: 5px;
          
          display:flex;
          flex-direction:column;
          justify-content:center;
              .thumbnailExplainText{
                  width:100%;
              }
      }
  }
`;
const TitleBox = styled.div`
  display:flex;
  margin-top: 9px;
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
      width:80%;
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
  margin-top: 10px;
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
//---additional--//
const CategoryBox = styled.div`
  width:100%;
  display:flex;
  justify-contant:flex-start;
  flex-direction:row;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    // flex-direction:column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
  }
`;
const CategoryDropDown = styled(Dropdown)`
  width:410px;
  height:56px;     
  border-radius:5px;
  font-size:20px;
  background-color:#EFEFEF !important;
  margin-right:30px;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    margin-top:10px;
    width:90%;
  }
`;
const InviteMemberBox = styled.div`
  display:flex;
  justify-content:flex-start;
  flex-direction:row;
  .searchBox{
  width:645px;
  height:56px;
  font-size:20px;
  font-weight:500;
  line-height:29px;
  color:#707070;
  border-radius:5px;
  background-color:#EFEFEF;
  }
  .tipTitle{
  width:27px;
  height:25px;
  margin-left:20px;
  font-size:17px;
  font-weight:500;
  line-height:25px;
  text-align:left;
  color:#FF0000;
  }
  .tipDescription{  
  margin-left:17px;
  font-size:16px;
  font-weight:100;
  font-family:Noto Sans KR;
  text-align:left;
  line-height:25px;
  color:#707070;
  }      
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
  .searchBox{
  }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
  .searchBox{
  width:92%;
  }
  }
`;
const InviteMemberListBox = styled.div`
  margin-top:20px;
  margin-left:167px;
  width:645px;
  .memberList{
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  margin-left:0px;
  width:645px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
  margin-left:0px;
  width:92%;
  }
`;
const LicenseBox = styled.div`
  margin-top: 22px;
  width: 100%;
  .licenseList {
    .licenseItem {
      margin-bottom: 15px;
      color: #707070;
      font-size: 16px;
      font-weight: 500;
      font-family: Noto Sans KR;
      .textLabel {
        margin-left: 25px;
        vertical-align: top;
      }
    }
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
const CropperDialog = styled(Modal)`
  max-width: ${props => props.ratio < 1.0 ? 450 : 650}px;
  // height: ${props => props.ratio < 1.0 ? 650 : 450}px;
  height: max-content;
  padding:20px;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #FF0000;
  .imagebox{

  }
  .edit-step-name-button-container {
    display: flex;
    width: 576px;
    margin-left: auto;
    margin-right: 75px;
    margin-top: 38px;
  }
`;
// content form, templete selector
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
const designImageText = "디자인 이미지";
const emptyCategory = [{ value: 0, text: "" }];

function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={props.s_img} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton"><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
    </PeerBox>
  );
};

const template = [
  { type: "empty", text: "빈 템플릿", img: templateImgEmpty },
  { type: "fashion", text: "일반디자인 템플릿", img: templateImgDesign },
  { type: "engineering", text: "공학디자인 템플릿", img: templateImgEngineering },
  { type: "software", text: "소프트웨어디자인 템플릿", img: templateImgSofware },
];
const ResetButtonWrapper = styled.div`
  width: max-content;
  margin-left: auto;
  margin-right: 25px;
  color: #707070;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
`;
class CreateDesignMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_project: 0, info_dialog: false, contents: [],
      crop: { unit: "%", width: 50, aspect: 1 },
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0,
      showSearch: false,
      title: "",
      thumbnail: noimg, thumbnail_name: "", cropper: false, is_rectangle: false,
      categoryLevel1: this.props.userInfo.category1 || null,
      categoryLevel2: null,
      alone: true, members: [], addmem: [], delmem: [],
      license1: true, license2: true, license3: true,
      type: null, template: null,
    };
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.checkInputForm = this.checkInputForm.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
  }
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
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name });
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };
  checkInputForm = async () => {
    const warning = "필수 입력항목을 모두 입력하지 않아 다음 단계를 진행할 수 없습니다.\n";
    if (this.state.step === 0) {

      if (this.state.thumbnail === noimg) {
        await alert(warning + designImageText + "를 등록해주세요", "확인");
        return;
      }
      else if (this.state.title === "") {
        await alert(warning + "제목을 입력해주세요.", "확인");
        return;
      }
    }
    else if (this.state.step === 1) {
      if (this.state.categoryLevel1 === false) {
        await alert(warning + "카테고리를 선택해주세요.", "확인");
        return;
      }
      // else if ((this.state.alone === false && this.state.members.length === 0)) {
      //   await alert(warning + "멤버를 초대하지 않으면 '멤버를 초대하지 않습니다'를 체크해주세요.","확인");
      //   return;
      // }
      else if (this.state.license1 === false || this.state.license2 === false || this.state.license3 === false) {
        await alert(warning + "라이센스 사용에 동의해주세요.", "확인");
        return;
      }
    }
  };
  onChangeValueThumbnail = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
      console.log("thumbnail:", this.state);
    }
    this.checkFinishBasic();
  };
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
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }

  }
  onKeyPress = () => {
    this.checkFinishBasic();
  };
  checkFinishBasic = async () => {
    const { title, thumbnail, } = this.state;
    if (title && thumbnail !== noimg) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  };
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0)) && license1 && license2 && license3) {
      await this.setState({ additional: true, content: true });
    } else {
      await this.setState({ additional: false });
    }
  };
  submit = () => {
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

    let designId = null;
    this.props.CreateDesignRequest(data, this.props.token)
      .then(async (res) => {
        if (res.success) {
          designId = res.design_id;
          window.location.href = geturl() + `/designDetail/` + designId;
        }
      })
      .catch(err => alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다."));
    this.setState({ loading: false });
  };
  onChangeCategory1 = async (event, { value }) => {
    await this.setState({ categoryLevel1: { value }.value });
    this.checkFinishAdditional();
  };
  onChangeCategory2 = async (event, { value }) => {
    await this.setState({ categoryLevel2: { value }.value })
    this.checkFinishAdditional();
  };
  onCheckedLicense01 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  };
  onCheckedLicense02 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  };
  onCheckedLicense03 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  };
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  };
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member)
    });
    // console.log("members[]====", this.state.members);
    this.checkFinishAdditional();
    this.setState({ alone: false });
  };
  removeMember = async (user_id) => {
    // remove from addmem
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    // display member list
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });
    this.checkFinishAdditional();

    if (this.state.members.length === 0) {
      this.setState({ alone: true })
    }

  };
  closeCropper = () => {
    if (this.state.is_rectangle === false) {
      this.setState({ thumbnail_name: "", thumbnail: noimg });
    }
    this.setState({ cropper: false, crop: { unit: "%", width: 50, aspect: 1 } });
  };
  toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));
  crop = async () => {
    // apply
    await this.toDataURL(this.state.croppedImageUrl)
      .then(async (dataUrl) => {
        this.setState({ thumbnail: dataUrl });
      })
    this.setState({ cropper: false });
  };
  onImageLoaded = image => {
    this.imageRef = image;
  };
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };
  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };
  makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, this.state.thumbnail_name/*"newFile.jpeg"*/);
      this.setState({ croppedImageUrl });
    }
  };
  getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  };
  openInfoToProject = () => {
    this.setState({ loading: true });
    // this.setState({ info_dialog: true });
    this.toProject();
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
  onChangeValue = async (data, order) => {
    this.setState({ contents: update(this.state.contents, { [order]: { contents: { $set: data.content } } }) });
  };
  onDelete = async (order) => {
    if (await confirm("선택하신 컨텐츠를 삭제하시겠습니까?", "예", "아니오") === false) {
      return;
    }
    let copyContent = [...this.state.contents];
    for (var i = 0; i < copyContent.length; i++) {
      if (copyContent[i].order === order) {
        copyContent.splice(i, 1);
      }
    }
    for (i = 0; i < copyContent.length; i++) {
      copyContent[i].order = i;
    }
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
  onChangeGridData = async (data) => {
    ;
  }

  render() {

    const { cropper, ratio, loading, members, is_project, contents, categoryLevel1, categoryLevel2 } = this.state;
    const thumbnailURL = this.state.thumbnail;
    console.log(this.props, this.state);

    return (
      <React.Fragment>
        {loading ?
          <Loading /> : null}


        {cropper ?
          <CropperDialog
            open={cropper}
            ratio={ratio}
            onKeyDown={null}
            onClose={null}>
            <div onClick={this.closeCropper} style={{ position: "absolute", width: "max-content", top: "10px", right: "15px" }}>
              <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
            </div>
            <div style={{ width: "max-content", height: "20px", lineHeight: "20px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "45px", marginLeft: "75px" }}>{designImageText} 등록</div>
            <div style={{ width: "max-content", height: "15px", lineHeight: "15px", color: "#FF0000", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>[!]등록하신 {designImageText}가 정사각형이 아닙니다.</div>
            <div style={{ width: "max-content", height: "30px", lineHeight: "15px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>아래의 이미지에서 {designImageText}로 등록하고자하는 영역을 <br /> 조절하여 등록하기를 클릭하시면 {designImageText}가 등록됩니다.</div>
            <div className="imagebox">
              <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "20px", width: this.state.ratio > 1.0 ? "370px" : "240px", height: "max-content" }}>
                <ReactCrop
                  src={this.state.thumbnail} crop={this.state.crop}
                  onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange} />
              </div>
              <div style={{ marginTop: "20px", display: "flex" }} >
                <div style={{
                  marginLeft: "25px", marginRight: "25px", width: "max-content", border: "none", background: "none", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500",
                  fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer"
                }} onClick={() => this.closeCropper()} >취소</div>
                <div style={{ marginLeft: "auto", textAlign: "middle", color: "#FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", lineHeight: "40px", borderBottom: "1.5px solid #FF0000", border: "1px splid black", cursor: "pointer" }} onClick={() => this.crop()} >등록하기</div>
              </div>
            </div>
          </CropperDialog> : null}


        <MainBanner>
          <div className="title">디자인 등록하기</div>
        </MainBanner>


        <MainSection>
          {/* FORM */}
          <InputBoard>

            {/* THUMBNAIL */}
            <ContentsBox>
              <ThumbnailBox>
                <div className="title">{designImageText}<sup style={{ color: "red" }}>*</sup></div>
                <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL} />
                <div className="findThumbnailBox">
                  <div className="findThumbnailBtn">
                    <label className="findThumbnailText" htmlFor="file">찾아보기</label>
                    <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/png, image/bmp, image/jpeg, image/jpg" />
                  </div>
                  <div className="thumbnailExplainText"> {designImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                </div>
              </ThumbnailBox>
              {/* TITLE */}
              <TitleBox>
                <div className="title">제목<sup style={{ color: "red" }}>*</sup></div>
                <input onChange={this.onChangeValueTitle} onKeyDown={this.onKeyDownEnter}
                  className="inputText" name="title" maxLength="100" placeholder="디자인의 제목을 입력해주세요. (100자 이내)" />
              </TitleBox>
              {/* EXPLANATION */}
              <ExplainBox>
                <div className="title">디자인 설명</div>
                <textarea id="explainBox" onChange={this.onChangeValueExplanation} className="inputTextareaBox"
                  maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)" />
              </ExplainBox>
            </ContentsBox>

            {/* CATEGORY */}
            <ContentsBox>
              {this.props.category1.length > 0 ?
                <CategoryBox>
                  <TitleBox>
                    <div className="title">카테고리<sup style={{ color: "red" }}>*</sup></div>
                  </TitleBox>
                  <CategoryDropDown
                    selection
                    ref="dropdown1"
                    onChange={this.onChangeCategory1}
                    options={this.props.category1}
                    value={categoryLevel1}
                    placeholder="카테고리를 선택해주세요(필수사항)"
                  />
                  <CategoryDropDown
                    selection
                    id="category2"
                    ref="dropdown2"
                    onChange={this.onChangeCategory2}
                    options={this.props.category2[categoryLevel1 - 1] || emptyCategory}
                    value={categoryLevel2}
                    placeholder="서브 카테고리를 선택해주세요(선택사항)"
                  />
                </CategoryBox>
                : <p>카테고리를 가져오고 있습니다.</p>}
            </ContentsBox>

            {/* MEMBERS */}
            <ContentsBox>
              <TitleBox>
                <div className="title">멤버 초대하기</div>
              </TitleBox>
              {/* INVITE MEMBER */}
              <InviteMemberBox>
                <div className="searchBox">
                  <SearchDesignMemverContainer
                    className="searchRect"
                    addMember={this.addMember} />
                </div>
                <div className="tipTitle">TIP</div>
                <div className="tipDescription">
                  함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                  초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                  디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
              </InviteMemberBox>

              {/* INVITED MEMBER */}
              <InviteMemberListBox>
                <div className="memberList">
                  {members &&
                    members.length > 0 ?
                    members.map((item, index) =>
                      <div
                        key={index}
                        onClick={() => this.removeMember(item.user_id)}>
                        <Peer
                          s_img={item.s_img == null ? noface : item.s_img}
                          nick_name={item.nick_name} />
                      </div>) : null}
                </div>
              </InviteMemberListBox>
              {/* <HRline /> */}
            </ContentsBox>

            {/* LICENSE */}
            <ContentsBox>
              <TitleBox>
                <div className="title">라이센스</div>
              </TitleBox>
              <LicenseBox>
                <div className="licenseList">
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license1}
                      onChange={this.onCheckedLicense01} />
                    <span className="textLabel">상업적으로 이용이 가능합니다</span>
                  </div>
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license2}
                      onChange={this.onCheckedLicense02} />
                    <span className="textLabel">원작자를 표시합니다</span>
                  </div>
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license3}
                      onChange={this.onCheckedLicense03} />
                    <span className="textLabel">추후에 수정이 가능합니다</span>
                  </div>
                </div>
              </LicenseBox>
            </ContentsBox>

            {/* DESIGN CONTENTS */}
            <ContentsBox>
              <TitleBox>
                <div className="title">디자인 컨텐츠</div>
              </TitleBox>
              <ResetButtonWrapper
                onClick={() => this.setState({ step: 2, type: "normal", is_project: 0, contents: [], steps: [], template: null })}>
                작업취소하기<i className="undo icon" />
              </ResetButtonWrapper>

              {is_project === 0 ?
                <React.Fragment>
                  {/* edit mode */}
                  {contents && contents.length > 0 ?
                    (<React.Fragment>
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

                          {/* {item.type === "EMBED" ? */}
                          {/* (<EmbController />) */}
                          {/* : null} */}
                          {/* </div> */}
                          <DelBtn
                            type="button"
                            className="editBtn"
                            onClick={() => this.onDelete(item.order)}>
                            <i className="trash alternate icon large" />
                          </DelBtn>
                          {/* {content.length - 1 >= item.order && item.order !== 0 ? <UpBtn type="button" className="editBtn" onClick={() => this.moveUpItem(item.order)}><i className="angle up alternate icon large" /></UpBtn> : null} */}
                          {/* {content.length - 1 !== item.order && item.order >= 0 ? <DownBtn type="button" className="editBtn" onClick={() => this.moveDownItem(item.order)}><i className="angle down alternate icon large" /></DownBtn> : null} */}
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
                  <div className="title">
                    템플릿을 선택하시면 보다 편하게 작업을 시작하실 수 있습니다!
                  </div>

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
            </ContentsBox>

            {/* BUTTONS */}
            <div className="buttonBox">
              <CustomButton
                onClick={() => window.history.go(-1)}
                isComplete={false}>
                <BtnText>취소</BtnText>
              </CustomButton>
              <CustomButton
                isComplete={this.state.type === "grid" && this.state.template == null ? false : true}
                onClick={this.submit}>
                <BtnText>완료</BtnText>
              </CustomButton>
            </div>
          </InputBoard>
        </MainSection>

      </React.Fragment >)
  };
}
export default CreateDesignMobile;


const ControllerWrap = styled.div`
  width: 100%;
  position: relative;
  text-align: center;

  border: 1px dashed ${opendesign_style.color.grayScale.scale6};
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${opendesign_style.color.grayScale.scale6};
    }
  }
  & :hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul { display: flex; }
      & > span { color: ${opendesign_style.color.grayScale.scale6}; }
    }
  }
  .innerBox {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
`;
const NewController = styled.li`
  width: max-content;
  height: 29px;
  color: #FF0000;
  margin-left: 15px;
  &.first {
    margin-left: 0px;
  }
  &.complecated {
    display: flex;
    flex-direction: row;
    .txt{
      // border-bottom: 1.5px solid #FF0000;
    }
  }
  &.txt{
    border-bottom: 1.5px solid #FF0000;
  }
  line-height: 29px;
  padding-bottom: 1.5px;
  font-size: 15px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;
class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null, content: "", order: null
    };
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({ type, order: this.props.order, content: "", initClick: true });
      setTimeout(() => {
        this.setState({ initClick: false });
      }, 100);
    } else {
      await this.setState({ type, order: this.props.order, content: "" });
      this.returnData();
    }
  }
  changeType = () => {
    this.props.change && this.props.change();
  }
  returnData = async (data) => {
    if (data) {
      await this.setState({ type: null, order: this.props.order, content: "", initClick: false })
      this.props.getValue(data);
    } else {
      if (this.props.getValue) this.props.getValue(this.state);
    }
  }
  render() {
    return (
      <ControllerWrap>
        <div className="innerBox">
          <NewController
            className="first txt"
            onClick={() => this.addContent("FILE")}
            width="max-content"
            minWidth="116px"
            height="29px">

            파일 등록하기</NewController>

          <NewController
            className="txt"
            onClick={() => this.addContent("TEXT")}
            width="max-content"
            minWidth="134px"
            height="29px">

            텍스트 입력하기</NewController>

          <NewController
            onClick={() => this.addContent("LINK")}
            width="max-content" minWidth="134px" height="29px">
            하이퍼링크 등록하기</NewController>

          {this.props.order === 0 ?
            <NewController
              className="txt complecated"
              width="max-content"
              height="29px">
              <div
                onClick={this.changeType}
                className="txt">
                템플릿 선택하기</div>

            </NewController> : null}
        </div>
        {this.state.type === "FILE" &&
          <FileController
            item={this.state}
            getValue={this.returnData} />}
      </ControllerWrap>
    );
  }
};
