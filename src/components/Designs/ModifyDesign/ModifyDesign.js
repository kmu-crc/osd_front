import React, { Component } from "react";
import GridEditor from "components/Designs/GridEditor";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";

import styled from "styled-components";
import { geturl } from "config";
import noimg from "source/noimg.png"
import forked from "source/forked.svg";
import noface from "source/thumbnail.png";
// import iDelete from "source/deleteItem.png"
import Cross from "components/Commons/Cross";
import Loading from "components/Commons/Loading";
import { Dropdown, Modal } from "semantic-ui-react";
import Logo from "source/logo.png"
import CheckBox2 from "components/Commons/CheckBox";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";


const designImageText = "디자인 이미지";
const MainBanner = styled.div`
  width: 100%;
  height:140px;
  display: flex;
  justify-content: center;
  .title{
    width: 196px;
    height: 37px;
    margin-top: 45px;
    font-size: 25px;
    font-family: Noto Sans KR;
    color: #707070;
    line-height: 37px;
    font-weight: 700;
  }

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    align-items:flex-end;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    align-items:flex-end;
  }
`
const MainSection = styled.div`
  width:${window.innerWidth > 1920 ? 1920 + 'px' : 100 + '%'};
  // border:2px solid blue;
  display: flex;
  flex-direction:row;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
      flex-direction:column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
      flex-direction:column;
  }
`

const NavMenu = styled.div`
min-width:433px;
height:300px;
position:relative;
.menuBox{
  width:325px;
  position: fixed;
  top:197px;
  margin-left:64px;    
  background-color:#F5F4F4;
  border-radius:5px;
}
.menuItem{
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  cursor:pointer;
}
.deleteText{
  font-family:Noto Sans KR;
  font-size:20px;
  font-family:Noto Sans KR;
  font-weight:500;
  text-align:left;
  color:#FF0000;
  border-bottom:${props => props.borderBottom};
}

@media only screen and (min-width : 780px) and (max-width:1440px) {
  display:flex;
  justify-content:center;
  align-items:center;
  .menuBox{
    margin-left:0px;   
    position: static; 
  }
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  display:flex;
  justify-content:center;
  align-items:center;
  .menuBox{
    margin-left:0px;  
    position:static;  

  }
}
`
const MenuItem = styled.div`
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  border-bottom: ${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  cursor:pointer;
  &.white{
    background-color: white;
  }
}`
const MenuText = styled.div`
  font-size:20px;
  font-family:Noto Sans KR;
  font-weight:300;
  text-align:left;
  color: ${props => props.selected ? "#FF0000" : "#707070"};
  border-bottom:${props => props.borderBottom};
`
//const Arrow = styled.span`
//    margin-left:70px;
//    font-size:15px;
//`
const InputBoard = styled.div`
// width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
width:77%;
padding-bottom:100px;
margin-bottom:100px;
position:relative;
padding-top:45px;
border-radius:5px;
border:8px solid #F5F4F4;
.buttonBox{
  display: flex;
  margin-top: 20.54px;
  justifyContent: flex-end;
}

@media only screen and (min-width : 780px) and (max-width:1440px) {
  width:100%;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  width:100%;
}
`
const ButtonBox = styled.div`
      height:100px;
      display: flex;
      margin-top: 30.54px;
      justify-content: flex-end;
`
const BackButton = styled.div`
      position:absolute;
      right:120px;
      bottom:35px;
      cursor:pointer;
      width:104.5px;
      height:44px;
      border-radius:5px;
      background-color:#FF0000;
      padding-top:6px;
      padding-left:15px;
      margin-right:53px;
`
const CompleteButton = styled.div`
      position:absolute;
      right:9px;
      bottom:35px;
      cursor:pointer;
      width:104.5px;
      height:44px;
      border-radius:5px;
      background-color:${props => props.isComplete ? "#FF0000" : "#707070"};
      padding-top:6px;
      padding-left:15px;
      margin-right:53px;
  `
const HRline = styled.div`
  width:95%;
  margin-top:60px;
  margin-bottom:67px;
  border-bottom:5px solid #F5F4F4;
`
const BtnText = styled.p`
  width: 74px;
  padding: 0px;
  font-familty: Noto Sans KR;
  font-weight: 500;
  line-height: 29px;
  text-align: center;
  font-size: 20px;
  color: #FFFFFF;
`;

//---sectionbasic---//
const ContentsBox = styled.div`
padding-left: 47px;
  display:flex;
  flex-direction:column;
  .title{

        min-width:100px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
  }
  .additionalTitle{
        min-width:167px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    justify-content:center;
    .title{
      margin-bottom:10px;
    }
    .additionalTitle{
      margin-bottom:10px;
    }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    .title{
      margin-bottom:10px;
    }
    .additionalTitle{
      margin-bottom:10px;
    }
  }
`
const ImageBox = styled.div`
  
  margin-left: 67px;
    min-width: 210px;
    min-height: 210px;
    max-width: 210px;
    max-height: 210px;
  border-radius:5px;
  background: ${props => `url(${props.imageURL})`};
  background-size:cover;
  background-position:center center;
  position:relative;
    .forkedImg{
      z-index:500;
      width:32px;
      height:70px;
      position:absolute;
      right:21px;
      background-image:url(${forked});
      background-size:cover;
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

@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
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
          width:80%;
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
      width:90%;
      margin-left: 0px;
    }
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
`
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
`
const InviteMemberBox = styled.div`
display:flex;
justify-content:flex-start;
flex-direction:row;
margin-top:120px;
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
`
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
`
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  display:flex;
  color: #707070;
  .textLabel {
    vertical-align: top;
  }
`;
//const CheckBox = styled.input.attrs({ type: 'checkbox' })`
//      width:25px;
//      height:25px;
//      margin-right:17px;
//      background-color:#EFEFEF !important;
//      border:1px solid #707070 !important;
//      border-radius:5px !important;  
//`
// const CheckBox = styled.input.attrs({ type: 'checkbox' })`
//   width: 25px;
//   height: 25px;
//   margin-right: 17px;
//   background-color: #EFEFEF !important;
//   border: 1px solid #707070 !important;
//   border-radius: 5px !important;  
// `
const LicenseBox = styled.div`
display:flex;
margin-top:22px;
.licenseList{
  width:645px;
  height:143px;
  .licenseItem{
    margin-bottom:30px;
    color:#707070;
    font-size:20px;
    font-weight:500;
    font-family:Noto Sans KR;
    display:flex;
  }
  .textLabel{
    vertical-align:top;
  }
}

@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
}
`
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

const emptyCategory = [{ value: 0, text: "" }];
const scrollmenu = [
  { step: 0, txt: "기본 정보", tag: "#basics" },
  { step: 1, txt: "부가 정보", tag: "#additional" },
  { step: 2, txt: "컨텐츠 정보", tag: "#contenteditor" }
];

function Peer(props) {
  return (<div style={{ cursor: "pointer", display: "flex", marginRight: "50px", marginTop: "10px" }}>
    <div style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${props.s_img || noface})`, backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
    <div style={{ marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", color: "#707070", width: "112px", height: "29px" }}>{props.nick_name}</div>
    <div style={{ marginTop: "7.34px", marginLeft: "13.86px" }}><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
  </div>)
};

class ModifyDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0, title: "", explanation: "",
      showSearch: false, thumbnail: noimg, thumbnail_name: "", grid: false,
      categoryLevel1: null, categoryLevel2: null, alone: false, members: [], addmem: [], delmem: [], license1: false, license2: false, license3: false,
    }
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
    this.cancelDeleteDesign = this.cancelDeleteDesign.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.DesignDetail !== nextProps.DesignDetail) {
      console.log("img", nextProps.DesignDetail.img);
      this.setState({
        thumbnail: nextProps.DesignDetail.img == null ? noimg : nextProps.DesignDetail.img.m_img,
        title: nextProps.DesignDetail.title,
        explanation: nextProps.DesignDetail.explanation,
        categoryLevel1: nextProps.DesignDetail.category_level1,
        categoryLevel2: nextProps.DesignDetail.category_level2,
        members: nextProps.DesignDetail.member && nextProps.DesignDetail.member.filter((mem) => { return mem.user_id !== this.props.userInfo.uid }),
        license1: nextProps.DesignDetail.is_commercial,
        license2: nextProps.DesignDetail.is_display_creater,
        license3: nextProps.DesignDetail.is_modify
      })
    }
    return true;
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.id)
      })
    this.setState({ content: true, designId: this.props.id, grid: true, loading: false });
  }
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
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
    this.checkFinishBasic();
  };
  onKeyDownEnter(event){
    if(event.key=="Enter")
    {
      document.getElementById("explainBox").focus();
    }

  }
  onKeyPress = () => {
    this.checkFinishBasic();
  }
  gotoPrevStep = () => {
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }
  gotoStep = (menu) => {
    if (this.state.basic) { };
    this.setState({ step: menu.step });
  }
  checkFinishBasic = async () => {
    const { title, thumbnail, explanation } = this.state;
    if (title && title.length > 0 && thumbnail && thumbnail.img) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  }
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0)) && license1 && license2 && license3) {
      await this.setState({ additional: true });
    } else {
      await this.setState({ additional: false });
    }
  }
  submit = () => {
    const data = {
      user_id: this.props.DesignDetail.user_id,
      category_level1: this.state.categoryLevel1, category_level2: this.state.categoryLevel2,
      title: this.state.title, explanation: this.state.explanation,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name, key: "thumbnail[]" }],
      members: { add: this.state.addmem, del: this.state.delmem },
      is_commercial: this.state.license1 ? 1 : 0, is_display_creater: this.state.license2 ? 1 : 0, is_modify: this.state.license3 ? 1 : 0
    };
    if (data.files.length <= 0 || data.files[0].value === this.props.DesignDetail.img.m_img) {
      delete data.files;
    }
    this.setState({ loading: true });
    this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
      .then((data) => {
        console.log(data, data.res && data.res.success);
        if (data.res && data.res.success) {
          alert("디자인 정보 수정이 완료되었습니다. 디자인보기 화면으로 이동합니다.");
          window.location.href = geturl() + '/designDetail/' + this.props.DesignDetail.uid;
        } else {
          alert("디자인 정보 수정에 실패하였습니다.");
        }
      })
    this.setState({ loading: false });
    // window.location.href = geturl() + `/designDetail/` + this.state.designId;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value });
    this.checkFinishAdditional();
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value })
    this.checkFinishAdditional();
  }
  onCheckedLicense01 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  }
  onCheckedLicense02 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  }
  onCheckedLicense03 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  }
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  }
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member)
    });
    // console.log("members[]====", this.state.members, this.state.addmem);
    this.checkFinishAdditional();
    this.setState({alone:false});
  }
  removeMember = async (user_id) => {
    // remove from addmem
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    // display member list
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });

    if(this.state.members.length===0)
    {
      this.setState({alone:true})
    }
  }
  deleteDesign = () => {
    this.props.DeleteDesignRequest(this.props.id, this.props.token)
      .then(() => {
        alert("삭제되었습니다.");
        window.location.href = geturl() + `/design`;
      })
  }
  cancelDeleteDesign=()=>{
    this.setState({ deleteModal: !this.state.deleteModal })
  }
  deleteDialog = () => {
    this.setState({ deleteModal: !this.state.deleteModal })
  }

  render() {
    let arrSummaryList = [];
    if (this.state.members != null && this.state.members.length > 0) {
      arrSummaryList = this.state.members.map((item, index) => {
        return (<div onClick={() => this.removeMember(item.user_id)} key={index}>
          <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
        </div>)
      });
    }
    const DeleteDesignModal = () => {
      return (<Modal open={this.state.deleteModal} closeOnDimmerClick={true} onClose={this.deleteDialog}
        style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
        <div style={{ position: "absolute", left: "100%", marginTop: "0px", marginLeft: "10px" }} onClick={this.deleteDialog} >
          <Cross angle={45} color={"#EFEFEF"} weight={3} width={25} height={25} />
        </div>
        <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.title}(을)를<br />삭제하시겠습니까?</div>
        <div style={{ fontWeight: "500", width: "100%", height: "25px", fontFamily: "Noto Sans KR", fontSize: "20px" }}>
          <div style={{ marginLeft: "auto", marginRight: "auto", width: "max-content", cursor: "pointer", }} >
            <span style={{marginRight:"10px",color: "#FF0000"}} onClick={this.deleteDesign}>확인</span>
            <span style={{color:"#707070"}} onClick={this.cancelDeleteDesign}>취소</span>
        </div>
        </div>
        <div style={{ marginTop: "5px", width: "100%", height: "20px", fontWeight: "300", fontFamily: "Noto Sans KR", fontSize: "15px", color: "#FF0000" }}>* 디자인 내에 포함된 모든 컨텐츠가 삭제되며, 되 돌릴수 없습니다.</div>
      </Modal>
      )
    }
    const { step, loading, deleteModal } = this.state; // const { DesignDetail } = this.props;
    const thumbnailURL = this.state.thumbnail; //DesignDetail && DesignDetail.img == null ? noimg : DesignDetail.img.m_img;//this.state.thumbnail;
    console.log("modify:", this.props)
    let boardWidth = 125;
    if (step === 3) boardWidth = 0;
    return (
      <React.Fragment>
        {loading ? <Loading /> : null}
        {deleteModal ? <DeleteDesignModal /> : null}
        <div onClick={this.handleCloseMember}>
          <MainBanner>
            <div className="title">디자인 수정하기</div>
          </MainBanner>
          <MainSection>
            {/* SCROLL - MENU */}
            <NavMenu>
              <div className="menuBox">
                {scrollmenu.map((menu, index) => {
                  return (
                    <MenuItem onClick={() => this.gotoStep(menu)}
                      // className="menuItem"
                      borderBottom={index + 1 === scrollmenu.length}
                      key={menu.txt}>
                      <MenuText selected={this.state.step === index}>{menu.txt}</MenuText>
                    </MenuItem>)
                })}
                <MenuItem className="white" onClick={this.deleteDialog}>
                  <div className="deleteText">디자인 삭제하기</div>
                </MenuItem>
              </div>
            </NavMenu>
            {/* <ModifyMenuDelete onClick={this.deleteDialog} >디자인 삭제하기</ModifyMenuDelete> */}

            {/* FORM */}
            <InputBoard boardWidth={boardWidth}>
              {/* <form ref={(ref) => this.form = ref}> */}
              <section style={{ display: step === 0 ? "block" : "none" }} >
                {/* THUMBNAIL */}
                <ContentsBox>
                  <ThumbnailBox>
              <div className="title">{designImageText}<sup style={{color:"red"}}>*</sup></div>
                    <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL}>
                      {this.props.DesignDetail && this.props.DesignDetail.parent_design &&
                        <div className="forkedImg" />}
                    </ImageBox>
                    <div className="findThumbnailBox">
                      <div className="findThumbnailBtn">
                        <label className="findThumbnailText" htmlFor="file">찾아보기</label>
                        <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                      </div>
                      <div className="thumbnailExplainText">{designImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                    </div>
                  </ThumbnailBox>

                  {/* TITLE */}
                  <TitleBox>
                    <div className="title">제목<sup style={{color:"red"}}>*</sup></div>
                    <input onChange={this.onChangeValueTitle} onKeyDown={this.onKeyDownEnter}
                      className="inputText" name="title" maxLength="100" value={this.state.title} placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
                      onBlur={this.checkFinishBasic} />
                  </TitleBox>
                  {/* EXPLANATION */}
                  <ExplainBox>
                    <div className="title">디자인 설명</div>
                    <textarea id="explainBox" className="inputTextareaBox" onChange={this.onChangeValueExplanation}
                      name="explanation" maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)"
                      value={this.state.explanation} onBlur={this.checkFinishBasic} />
                  </ExplainBox>
                </ContentsBox>
              </section>

              <section style={{ display: step === 1 ? "block" : "none" }} >
                <ContentsBox>
                  {this.props.category1.length > 0 ?
                    <CategoryBox>
                      {/* category */}
                      <div className="additionalTitle">카테고리</div>
                      <CategoryDropDown onChange={this.onChangeCategory1}
                        options={this.props.category1} selection name="category1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
                      {this.props.category2[this.state.categoryLevel1 - 1] && this.state.categoryLevel1 !== 0
                        ? <CategoryDropDown options={this.props.category2[this.state.categoryLevel1 - 1]} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />
                        : <CategoryDropDown options={emptyCategory} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />}
                    </CategoryBox>
                    : <p>카테고리를 가져오고 있습니다.</p>}
                  {/* invite member*/}
                  <InviteMemberBox>
                    <div className="additionalTitle ">멤버 초대하기<sup style={{color:"red"}}>*</sup></div>
                    <div className="searchBox" >
                      <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />
                    </div>
                    <div className="tipTitle">TIP</div>
                    <div className="tipDescription">
                      함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                      초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                      디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
                  </InviteMemberBox>
                  <div>
                    {/* INVITED MEMBER */}
                    <InviteMemberListBox>
                      <div className="memberList">
                        {arrSummaryList}
                      </div>
                    </InviteMemberListBox>
                    {/* LEAVE ME ALONE */}
                    <NoInviteMemberBox>
                       <div><CheckBox2 onChange={this.LeaveMeAlone} type="checkbox" checked={this.state.alone}/></div>

                      <div className="textLabel">멤버를 초대하지 않습니다.</div>
                    </NoInviteMemberBox>
                  </div>
                  <HRline />

                  {/* LICENSE */}
                  <LicenseBox>
                    <div className="additionalTitle">라이센스</div>
                    <div className="licenseList">
                      <div className="licenseItem">
                        <div><CheckBox2 onChange={this.onCheckedLicense01} checked={this.state.license1 ? true : false} type="checkbox" /></div>
                        <div className="textLabel">상업적으로 이용이 가능합니다</div>
                      </div>
                      <div className="licenseItem">
                        <div><CheckBox2 onChange={this.onCheckedLicense02} checked={this.state.license2 ? true : false} type="checkbox" /></div>
                        <div className="textLabel">원작자를 표시합니다</div></div>
                      <div className="licenseItem">
                        <div><CheckBox2 onChange={this.onCheckedLicense03} checked={this.state.license3 ? true : false} type="checkbox" /></div>
                        <div className="textLabel">추후에 수정이 가능합니다</div></div>
                    </div>
                  </LicenseBox>
                  {/* hr line */}
                  {/* <div style={{ marginTop: "150.5px", marginLeft: "auto", marginRight: "52px", width: "545px", height: "69px", textAlign: "right", fontWeight: "300", fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1" }} >마지막 단계만이 남아있습니다!<br />단계 / 컨텐츠 정보 탭에서 기본적인 디자인의 뼈대를 구성해 주세요</div> */}
                </ContentsBox>
              </section>

              <section style={{ display: step === 2 ? "block" : "none", paddingLeft: "51px", marginBottom: "204px" }} >
                <div>
                  {this.state.grid ?
                    this.props.DesignDetail &&
                      this.props.DesignDetail.is_project ?
                      <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} />
                      : <DesignDetailViewContainer history={this.props.history} id={this.props.DesignDetail.uid} isMyDesign={true} editor={false} />
                    :
                    <LoadingBox>
                      <LoadingIconBox imageURL={Logo} />
                      <div className="loadingText">컨텐츠 에디터를 가져오고 있습니다...</div>
                    </LoadingBox>}
                </div>
              </section>

              {/* BUTTONS */}
              <ButtonBox>
                {step === 0 && <React.Fragment>
                  <CompleteButton onClick={this.gotoNextStep} isComplete={true}><BtnText>다음</BtnText></CompleteButton>
                </React.Fragment>}
                {step === 1 && <React.Fragment>
                  <BackButton onClick={this.gotoPrevStep} isComplete={true}><BtnText>뒤로</BtnText></BackButton>
                  <CompleteButton onClick={this.gotoNextStep} isComplete={true}><BtnText>다음</BtnText></CompleteButton>
                </React.Fragment>}
                {step === 2 && <React.Fragment>
                  <BackButton onClick={this.gotoPrevStep} isComplete={true}><BtnText>뒤로</BtnText></BackButton>
                  <CompleteButton onClick={this.submit} isComplete={true}><BtnText>완료</BtnText></CompleteButton>
                </React.Fragment>}
              </ButtonBox>
              {/* </form> */}
            </InputBoard>
          </MainSection>
        </div>
      </React.Fragment>)
  }
}

export default ModifyDesign;
