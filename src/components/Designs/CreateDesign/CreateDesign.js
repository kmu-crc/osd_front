import React, { Component } from "react";
import update from "react-addons-update";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";
import noimg from "source/noimg.png";
import noface from "source/thumbnail.png";
import Cross from "components/Commons/Cross";
import CheckBox2 from "components/Commons/CheckBox";
import { Dropdown, Modal } from "semantic-ui-react";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import osdcss from "opendesign_style";
import FileController from "../CardSourceDetail/FileController";
import LinkController from "../CardSourceDetail/LinkController";
import TextController from "../CardSourceDetail/TextControllerPlus";
import TemplateGridEditor from "components/Designs/CreateDesign/TemplateGridEditor";
import { geturl } from "config";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
// import { geturl } from "config";
// import { geturl } from "config";
import templateImgDesign from "source/template-image-design.png";
import templateImgSofware from "source/template-image-software.png";
import templateImgEngineering from "source/template-image-engineering.png";
import templateImgEmpty from "source/template-image-empty.png";

import new_logo_view from "source/new_logo_view.svg";
import new_logo_favorite from "source/new_logo_favorite.svg";
import new_logo_share from "source/new_logo_share.svg";
import new_logo_plus from "source/new_logo_plus.png";

const Section = styled.div`
  display: ${(props) =>
    props.isNone == true ? (props.isLast == null ? "flex" : "flex") : "none"};
  @media only screen and (min-width: 500px) and (max-width: 1400px) {
    display: ${(props) =>
      props.isNone == true
        ? props.isLast == null
          ? "block"
          : "block"
        : "none"};
  }
`;
const LoadingBox = styled.div`
  padding-top: 200px;
  .IconBox {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  .loadingText {
    margin-top: 20px;
    width: 100%;
    font-family: Noto Sans KR;
    font-size: 20px;
    text-align: center;
  }
`;
const LoadingIconBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: ${(props) => `url(${props.imageURL})`};
  background-position: center center;
  background-repeat: no-repeat;
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
const CropperDialog = styled(Modal)`
  max-width: ${(props) => (props.ratio < 1.0 ? 450 : 650)}px;
  // height: ${(props) => (props.ratio < 1.0 ? 650 : 450)}px;
  height: max-content;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #ff0000;
  .imagebox {
  }
  .edit-step-name-button-container {
    display: flex;
    width: 576px;
    margin-left: auto;
    margin-right: 75px;
    margin-top: 38px;
  }
`;
const CustomButton = styled.div`
  cursor: pointer;
  width: 86px;
  min-width: 86px;
  height: 49px;
  background-color: ${(props) => (props.isComplete ? "#FF0000" : "#8D8D8D")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 34px;
  cursor: pointer;
`;
const BtnText = styled.p`
  font-family: Spoqa Han Sans Neo;
  font-weight: Medium;
  font-size: 28px;
  color: white;
`;
const PeerBox = styled.div`
  display: flex;
  margin-right: 25px;
  margin-bottom: 10px;
  .nameLabel {
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
  .closeButton {
    margin-top: 7px;
    margin-left: 14px;
  }
  @media only screen and (min-width: 360px) and (max-width: 780px) {
    margin-right: 15px;
  }
`;
const PeerIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
`;
const InviteMemberListBox = styled.div`
  width: 645px;
  height: 200px;
  margin-left: 191px;
  padding-top: 50px;
  overflow-y: auto;
  .memberList {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;
const IsProblemBox = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 22px;
  font-family: Spoqa Han Sans;
  height: 45px;

  .textLabel {
    vertical-align: top;
    padding-top: 5px;
    padding-left: 10px;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 150px;
  // flex-wrap:wrap;
  .maxFlex {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .category_wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
  }
  .flex {
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
  }
  .flex2 {
    max-width: 1200px;
    width: 100%;
  }
  .navi_menu {
    min-width: 264px;
    width: 264px;
    height: 100%;
    padding: 36px 38px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .navi_header {
      min-width: max-content;
      width: 187px;
      height: 40px;
      margin-bottom: 32px;
      font-family: Spoqa Han Sans Neo;
      font-weight: 500;
      font-size: 28px;
      text-align: center;
    }
    .navi_label {
      min-width: max-content;
      width: 187px;
      min-height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Spoqa Han Sans Neo;
      font-size: 28px;
      cursor: pointer;
    }
    .red {
      color: red;
    }
    .black {
      color: black;
    }
    .select {
      color: #1262ab;
    }
    .delete {
      margin-top: 531px;
    }
    .borderBottom {
      border-bottom: 2px solid #707070;
    }
  }
  .vLine {
    border: 1px solid #cccccc;
    margin: 53px 0px;
    height: 871px;
  }
  .summary {
    padding: 45px 77px;
  }
  .completeButton {
    width: 100%;
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-family: Spoqa Han Sans Neo;
    font-size: 28px;
    border: 1px solid #eaeaea;
    box-shadow: 8px 8px 8px #0000002b;
    margin-top: 61px;
    cursor: pointer;
  }
  .marginRight1 {
    margin-right: 51px;
  }
  .marginRight2 {
    margin-right: 0px;
  }
  .flex_board {
    display: flex;
  }
  .board {
    max-width: 1248px;
    min-width: 1000px;
    width: 100%;
    height: max-content;
    padding: 56px 72px 0px 72px;
    .board_label {
      width: max-content;
      min-width: 195px;
      display: flex;
      align-items: center;
      height: 40px;
      font-family: Spoqa Han Sans Neo;
      font-weight: Medium;
      font-size: 28px;
    }
    .guide {
      font-size: 20px;
      font-family: Spoqa Han Sans Neo;
      line-height: 28px;
      color: #707070;
    }
    .board_box {
      width: 100%;
      padding-left: 40px;
      display: flex;
    }
    .column {
      flex-direction: column;
    }
    .paddingLeft1 {
      padding-left: 200px;
    }
    .buttonBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 26px;
    }
  }
  .grid_wrapper {
    min-width: 1000px;
    width: 100%;
    max-width: 1566px;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    .grid_buttonWrap {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      .button {
        cursor: pointer;
        width: 86px;
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 28px;
        font-family: Spoqa Han Sans Neo;
      }
      .grey {
        background-color: #8d8d8d;
      }
      .red {
        background-color: red;
      }
    }
  }
  .board_grid {
    max-width: 1566px;
    width: 96%;
    height: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .addImg {
    width: 290px;
    height: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e9e9e9;
    margin-bottom: 20px;
    margin-top: 10px;
    object-fit: cover;
    .plus {
      width: 100px;
      height: 100px;
      object-fit: fit;
    }
  }
  .sub {
    height: 40px;
    color: red;
  }
  .licenseItem {
    margin-bottom: 46px;
    color: #707070;
    font-size: 22px;
    font-weight: 300;
    font-family: Spoqa Han Sans;
    .textLabel {
      margin-left: 35px;
      vertical-align: top;
    }
  }
  .row {
    width: 100%;
    display: flex;
  }
  .imageBox {
    width: 290px;
    height: 290px;
    background-color: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imageLabel {
    margin-left: 38px;
    padding-top: 10px;
    .findThumbnailText {
      cursor: pointer;
      font-size: 30px;
      font-family: Spoqa Han Sans Neo;
      font-weight: Regular;
      color: red;
    }
    .thumbnailExplainText {
      font-size: 22px;
      font-family: Spoqa Han Sans;
      font-weight: Regular;
      color: #707070;
      margin-top: 15px;
      line-height: 33px;
    }
  }
  .dropdown {
    width: 228px;
    min-height: 41px !important;
    max-height: 41px !important;
    padding: 0px 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    border-radius: 0px !important;
  }
  .messageBubble {
    width: 100%;
    display: none;
    .quest {
      min-width: 20px;
      min-height: 20px;
      max-width: 20px;
      max-height: 20px;
      font-size: 15px;
      font-family: Noto Sans KR;
      font-weight: 400;
      border-radius: 50%;
      background-color: red;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media only screen and (min-width: 500px) and (max-width: 1400px) {
    display: flex;
    flex-direction: column;
    .board {
      padding-left: auto;
      padding-right: auto;
    }
    .grid_wrapper {
      padding-left: 0px;
      padding-left: auto;
      padding-right: auto;
    }
    .vLine {
      width: 96%;
      min-width: 1000px;
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      height: 0px;
      border-bottom: 1px solid #cccccc;
      margin-top: 60px;
    }
    .navi_menu {
      min-width: 1000px;
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      .navi_header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .navi_label {
        min-height: 40px;
      }
      .borderBottom {
        border: none;
      }
      .delete {
        margin: 0;
        margin-left: 50px;
      }
    }
    .messageBubble {
      display: flex;
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1566px;
  width: 100%;

  // display:flex;
  padding-bottom: 100px;
  .formWrap {
    max-width: 1248px;
    width: 100%;
  }
  .buttonWrap {
    min-height: 920px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 250px;
    .button {
      cursor: pointer;
      width: 86px;
      height: 49px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 28px;
      font-family: Spoqa Han Sans Neo;
    }
    .grey {
      background-color: #8d8d8d;
    }
    .red {
      background-color: red;
    }
  }
  @media only screen and (min-width: 500px) and (max-width: 1400px) {
    .buttonWrap {
      padding-right: 30px;
      width: 100%;
      min-width: 1000px;
      height: max-content;
      min-height: max-content;
      margin-top: 30px;
    }
  }
`;
const QuestionGuide = styled.div`
  width: 35px;
  height: 35px;
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 30px;
  font-weight: 800;
  font-family: Spoqa Han Sans;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  margin-left: 10px;
  position: relative;
  cursor: default;
  .messageBubble {
    width: ${(props) => props.bubbleSize}px;
    font: normal normal normal 20px/27px Noto Sans KR;
    letter-spacing: 0px;
    line-height: 25px;
    color: #707070;
    font-weight: 400;
    padding: 10px;
    position: absolute;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;

    z-index: 888;

    display: block;
  }
  @media only screen and (min-width: 500px) and (max-width: 1400px) {
    display: none;
    .messageBubble {
      display: none;
    }
  }
`;
const DesignCard = styled.div`
  *{
    font-family:Spoqa Han Sans Neo;
    color:black;
  }
  width:360px;
  height:525px;
  box-shadow: 8px 8px 8px #4141411A;
  border: 0.5px solid #eaeaea;

  .thumbnail{
    width:100%;
    height:333px;
    border: 0.5px solid #eaeaea;
  }
  .info{
    width:100%;
    padding:21px 23px 31px 23px;
  }
  .spaceBetween{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:7px;
  }
  .title{
    font-size:37px;
    font-weight:600;
    height:49px;
    display:flex;
    align-items:center;
  }
  .date{
    color:#707070;
    font-size:17px;
  }
  .designer{
    font-size:16px;
  }

  .asset_wrapper{
    width:100%;
    height:30px;
    display:flex;
    align-items:center;
    margin-top:31px;
    .asset_icon{
      width:27px;
      height27px;
      object-fit:cover;
    }
    .asset_text{
      min-width:70px;
      font-size:18px;
      padding-left:10px;
    }
  }
`;
const InputText = styled.input`
  width: 880px;
  height: 51px;
  background-color: #e9e9e9;
  padding: 5px 20px;
  outline: none;
  border: none;
  resize: none;
  // margin-left:30px;
  margin-top: 12px;
  font-size: 22px;
`;
const InputTextArea = styled.textarea`
  width: 880px;
  height: 323px;
  background-color: #e9e9e9;
  padding: 20px;
  outline: none;
  border: none;
  resize: none;
  // margin-left:30px;
  margin-top: 24px;
  font-size: 22px;
`;
const CategoryDropDown = styled(Dropdown)`
  max-width: 309px;
  height: 41px !important;
  font-family: Spoqa Han Sans, Regular;
  font-size: 22px;
  background-color: #8e8e8e !important;
  margin-right: 68px;
  margin-top: 10px;
  margin-bottom: 10px;
  .text {
    color: white !important;
  }
  .item {
    background-color: #8e8e8e !important;
  }
`;
const ResetButtonWrapper = styled.div`
  width: max-content;
  margin-left: auto;
  margin-right: 25px;
  color: #707070;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const DelBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
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
  background-color: ${osdcss.color.main.basic};
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
const DesignTemplateSelector = styled.div`
  max-width: 100%;
  width: 100%;
  .title {
    width: max-content;
    margin: auto;
    color: #707070;
    padding: 10px 5px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 2rem;
  }
  .template-wrapper {
    display: flex;
    justify-content: center;
    overflow: auto;
  }
  .element {
    min-width: 200px;
    margin: 5px;
    border: 2px solid #efefef;
    padding: 5px;
    :hover {
      border: 2px solid #777777;
    }
  }
`;
const DesignElement = styled.div`
  * {
    cursor: pointer;
  }
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR";
  z-index: 700;
  border-radius: 15px;
  // background-size: cover;
  img {
    max-width: 100%;
    max-height: 100%;
    // background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${(props) => props.img});
  }

  .cover {
    // cursor: default;
    z-index: 701;
    position: absolute;
    border-radius: 15px;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 60%,
      rgba(32, 32, 32, 0.7) 100%
    );
    width: 330px;
    height: 330px;
  }

  .innerbox {
    z-index: 703;
    position: absolute;
    width: 274.08px;
    color: #ffffff;
    line-height: 40px;
    height: 35px;
    font-family: Noto Sans KR;
    margin-left: 25px;
    margin-top: 201px;
    .design-title {
      font-size: 20px;
      font-weight: 700;
      text-shadow: 2px 2px 6px gray;
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
      text-shadow: 2px 2px 6px gray;
      line-height: 25px;
      text-align: right;
      // cursor: default;
    }
    .user-name {
      font-size: 20px;
      font-weight: 300;
      text-shadow: 2px 2px 6px gray;
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
    img {
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
const EditorWrapper = styled.div`
  // max-width:853px;
  width: 100%;
  .title {
    width: 100%;
    text-align: center;
    margin: auto;
    color: #707070;
    padding: 10px 5px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 2rem;
  }
  .editor {
    opacity: 0.75;
    overflow: auto;
  }
`;
const designImageText = "디자인 이미지";
const emptyCategory = [{ value: 0, text: "" }];
const scrollmenu = [
  { step: 0, txt: "기본 정보" },
  { step: 1, txt: "부가 정보" },
  { step: 2, txt: "컨텐츠 정보" },
];

function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={props.s_img} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton">
        <Cross angle={45} color={"#707070"} weight={3} width={16} height={16} />
      </div>
    </PeerBox>
  );
}

const template = [
  { type: "empty", text: "빈 템플릿", img: templateImgEmpty },
  { type: "fashion", text: "일반디자인 템플릿", img: templateImgDesign },
  {
    type: "engineering",
    text: "공학디자인 템플릿",
    img: templateImgEngineering,
  },
  {
    type: "software",
    text: "소프트웨어디자인 템플릿",
    img: templateImgSofware,
  },
];

class CreateDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_project: 0,
      info_dialog: false,
      contents: [],
      crop: { unit: "%", width: 50, aspect: 1 },
      loading: false,
      designId: null,
      isMyDesign: false,
      editor: false,
      basic: false,
      additional: false,
      content: false,
      step: 0,
      showSearch: false,
      title: "",
      thumbnail: noimg,
      thumbnail_name: "",
      cropper: false,
      is_rectangle: false,
      // categoryLevel1: this.props.userInfo.category1 || null,
      categoryLevel1: null,
      categoryLevel2: null,
      categoryLevel3: null,
      alone: true,
      members: [],
      addmem: [],
      delmem: [],
      license1: true,
      license2: true,
      license3: false,
      type: null,
      template: null,
      is_problem: false,
    };
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckIsProblem = this.onCheckIsProblem.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.onChangeCategory3 = this.onChangeCategory3.bind(this);

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
      await alert("파일의 확장자가 올바른지 확인해주세요.", "확인");
      return;
    }
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = () => {
        this.setState({
          is_rectangle: false,
          ratio: image.width / image.height,
          cropper: image.width / image.height !== 1.0,
        });
      };
    };
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name });
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
    this.checkFinishBasic();
  };
  checkInputForm = async () => {
    const warning =
      "필수 입력항목을 모두 입력하지 않아 다음 단계를 진행할 수 없습니다.\n";
    if (this.state.step === 0) {
      if (this.state.thumbnail === noimg) {
        await alert(warning + designImageText + "를 등록해주세요", "확인");
        return;
      } else if (this.state.title === "") {
        await alert(warning + "제목을 입력해주세요.", "확인");
        return;
      }
    } else if (this.state.step === 1) {
      if (this.state.categoryLevel1 === false) {
        await alert(warning + "카테고리를 선택해주세요.", "확인");
        return;
      } else if (
        this.state.license1 === false ||
        this.state.license2 === false ||
        this.state.license3 === false
      ) {
        await alert(warning + "라이센스 사용에 동의해주세요.", "확인");
        return;
      }
    }
  };
  onChangeValueThumbnail = async (data) => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
    }
    this.checkFinishBasic();
  };
  onChangeValueTitle = async (event) => {
    if (event.target) {
      await this.setState({ title: event.target.value });
    }
    this.checkFinishBasic();
  };
  onChangeValueExplanation = async (event) => {
    if (event.target) {
      await this.setState({ explanation: event.target.value });
    }
  };
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }
  }
  onKeyPress = () => {
    this.checkFinishBasic();
  };
  gotoPrevStep = () => {
    console.log(this.state.step - 1);
    this.setState({ step: this.state.step - 1 });
  };
  gotoNextStep = async () => {
    console.log(this.state.step + 1);
    await this.setState({ step: this.state.step + 1 });
    this.checkFinishBasic();
    this.checkFinishAdditional();
  };
  checkFinishBasic = async () => {
    const { title, thumbnail } = this.state;
    if (title && thumbnail !== noimg) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  };
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } =
      this.state;
    if (
      categoryLevel1 != null &&
      ((alone && members.length === 0) || (!alone && members.length > 0))
    ) {
      await this.setState({ additional: true, content: true });
    } else {
      await this.setState({ additional: false });
    }
  };
  submit = () => {
    this.setState({ loading: true });
    const {
      contents,
      categoryLevel1,
      categoryLevel2,
      categoryLevel3,
      title,
      explanation,
      license1,
      license2,
      license3,
      is_problem,
      thumbnail,
      thumbnail_name,
    } = this.state;
    contents &&
      contents.map((content) => {
        delete content.initClick;
        return content;
      });
    let data = {
      uid: this.props.userInfo.uid,
      is_project: this.state.is_project,
      contents: contents, // [*]
      category_level1: categoryLevel1,
      category_level2: categoryLevel2,
      category_level3: categoryLevel3,
      explanation: explanation,
      files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
      is_commercial: license1 ? 1 : 0,
      is_display_creater: license2 ? 1 : 0,
      is_modify: license3 ? 1 : 0,
      is_problem: is_problem ? 1 : 0,
      members: {
        add: this.state.addmem,
        del: this.state.delmem,
      },
      title: title,

      // added
      type: this.state.type,
      steps: this.state.steps,
    };

    let designId = null;
    this.props
      .CreateDesignRequest(data, this.props.token)
      .then(async (res) => {
        if (res.success) {
          designId = res.design_id;
          window.location.href = `/designDetail/${designId}`;
        }
      })
      .catch((err) =>
        alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다.")
      );
    this.setState({ loading: false });
  };
  onChangeCategory1(event, { value }) {
    this.setState({
      categoryLevel1: { value }.value,
      categoryLevel2: null,
      categoryLevel3: null,
    });
    this.checkFinishAdditional();
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value, categoryLevel3: null });
    this.checkFinishAdditional();
  }
  onChangeCategory3(event, { value }) {
    this.setState({ categoryLevel3: { value }.value });
    this.checkFinishAdditional();
  }
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
  onCheckIsProblem = async () => {
    await this.setState({ is_problem: !this.state.is_problem });
    this.checkFinishAdditional();
  };
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  };
  addMember = async (email, s_img, nick_name, uid) => {
    let member = {
      email: email,
      s_img: s_img,
      nick_name: nick_name,
      user_id: uid,
      uid: uid,
    };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member),
    });
    this.checkFinishAdditional();
    this.setState({ alone: false });
  };
  removeMember = async (user_id) => {
    // remove from addmem
    if (
      this.state.addmem.find((mem) => {
        return mem.user_id === user_id;
      })
    ) {
      await this.setState({
        addmem: this.state.addmem.filter((member) => {
          return member.user_id !== user_id;
        }),
      });
    } else {
      // remove if not in addmem
      await this.setState({
        delmem: this.state.delmem.concat(
          this.state.members.filter((member) => {
            return user_id === member.user_id;
          })
        ),
      });
    }
    // display member list
    await this.setState({
      members: this.state.members.filter((member) => {
        return user_id !== member.user_id;
      }),
    });
    this.checkFinishAdditional();

    if (this.state.members.length === 0) {
      this.setState({ alone: true });
    }
  };
  closeCropper = () => {
    if (this.state.is_rectangle === false) {
      this.setState({ thumbnail_name: "", thumbnail: noimg });
    }
    this.setState({
      cropper: false,
      crop: { unit: "%", width: 50, aspect: 1 },
    });
    this.checkFinishBasic();
  };
  toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  crop = async () => {
    // apply
    await this.toDataURL(this.state.croppedImageUrl).then(async (dataUrl) => {
      this.setState({ thumbnail: dataUrl });
    });
    this.setState({ cropper: false });
    this.checkFinishBasic();
  };
  onImageLoaded = (image) => {
    this.imageRef = image;
  };
  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };
  makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.state.thumbnail_name /*"newFile.jpeg"*/
      );
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
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
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
  makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.state.thumbnail_name /*"newFile.jpeg"*/
      );
      this.setState({ croppedImageUrl });
    }
  };
  openInfoToProject = () => {
    this.setState({ loading: true });
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
    this.setState({
      contents: update(this.state.contents, {
        [order]: { contents: { $set: data.content } },
      }),
    });
  };
  onDelete = async (order) => {
    if (
      (await confirm("선택하신 컨텐츠를 삭제하시겠습니까?", "예", "아니오")) ===
      false
    ) {
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
      if (
        item.type === "FILE" &&
        item.fileUrl == null &&
        item.type === "FILE" &&
        item.content === ""
      ) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);
    let newContent = copyContent.filter((item) => {
      return item !== null;
    });
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
  onChangeGridData = async (data) => {};

  render() {
    const { step, is_project, contents } = this.state;
    const thumbnailURL = this.state.thumbnail;
    console.log(this.props, this.state);
    let category3Index = -1;
    let nCount = 0;
    for (let i in this.props.category2) {
      this.props.category2 &&
        this.props.category2[i] &&
        this.props.category2[i].map((item, index) => {
          if (item.value == this.state.categoryLevel2) {
            category3Index = nCount;
          }
          nCount++;
        });
    }
    if (category3Index == -1) category3Index = 0;

    return (
      <React.Fragment>
        {this.state.cropper ? (
          <CropperDialog
            ratio={this.state.ratio}
            onKeyDown={null}
            open={this.state.cropper}
            onClose={null}
          >
            <div
              onClick={this.closeCropper}
              style={{
                position: "absolute",
                width: "max-content",
                top: "10px",
                right: "15px",
              }}
            >
              <Cross
                angle={45}
                color={"#000000"}
                weight={2}
                width={32}
                height={32}
              />
            </div>
            <div
              style={{
                width: "max-content",
                height: "20px",
                lineHeight: "20px",
                color: "#707070",
                fontFamily: "Noto Sans KR",
                fontSize: "20px",
                fontWeight: "500",
                textAlign: "left",
                marginTop: "45px",
                marginLeft: "75px",
              }}
            >
              {designImageText} 등록
            </div>
            <div
              style={{
                width: "max-content",
                height: "15px",
                lineHeight: "15px",
                color: "#FF0000",
                fontFamily: "Noto Sans KR",
                fontSize: "15px",
                fontWeight: "300",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "75px",
              }}
            >
              [!]등록하신 {designImageText}가 정사각형이 아닙니다.
            </div>
            <div
              style={{
                width: "max-content",
                height: "30px",
                lineHeight: "15px",
                color: "#707070",
                fontFamily: "Noto Sans KR",
                fontSize: "15px",
                fontWeight: "300",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "75px",
              }}
            >
              아래의 이미지에서 {designImageText}로 등록하고자하는 영역을 <br />{" "}
              조절하여 등록하기를 클릭하시면 {designImageText}가 등록됩니다.
            </div>
            <div className="imagebox">
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: this.state.ratio > 1.0 ? "370px" : "240px",
                  height: "max-content",
                }}
              >
                <ReactCrop
                  src={this.state.thumbnail}
                  crop={this.state.crop}
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              </div>
              <div style={{ marginTop: "20px", display: "flex" }}>
                <div
                  style={{
                    marginLeft: "25px",
                    marginRight: "25px",
                    width: "max-content",
                    border: "none",
                    background: "none",
                    height: "40px",
                    lineHeight: "40px",
                    color: "#707070",
                    paddingBottom: "1.5px",
                    borderBottom: "1.5px solid #707070",
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Noto Sans KR",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => this.closeCropper()}
                >
                  취소
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    textAlign: "middle",
                    color: "#FF0000",
                    fontSize: "20px",
                    fontWeight: "500",
                    fontFamily: "Noto Sans KR",
                    lineHeight: "40px",
                    borderBottom: "1.5px solid #FF0000",
                    border: "1px splid black",
                    cursor: "pointer",
                  }}
                  onClick={() => this.crop()}
                >
                  등록하기
                </div>
              </div>
            </div>
          </CropperDialog>
        ) : null}
        <Wrapper>
          <div className="navi_menu">
            <div className="navi_header">디자인 등록하기</div>
            <div
              className={`navi_label borderBottom ${
                this.state.step == 0 ? "select" : "black"
              }`}
              onClick={() => this.setState({ step: 0 })}
            >
              {scrollmenu[0].txt}
            </div>
            <div
              className={`navi_label borderBottom ${
                this.state.step == 1 ? "select" : "black"
              }`}
              onClick={() =>
                this.state.basic
                  ? this.setState({ step: 1 })
                  : alert("기본 정보의 필수항목(*)을 입력하셔야 합니다.")
              }
            >
              {scrollmenu[1].txt}
            </div>
            <div
              className={`navi_label ${
                this.state.step == 2 ? "select" : "black"
              }`}
              onClick={() =>
                this.state.additional
                  ? this.setState({ step: 2 })
                  : alert("부가 정보의 필수항목(*)을 입력하셔야 합니다.")
              }
            >
              {scrollmenu[2].txt}
            </div>
          </div>
          {/* <div className="navi_menu">
            <div className="navi_header">디자인 등록하기</div>
            <div className={`navi_label borderBottom ${this.state.step==0?"select":"black"}`} onClick={()=> this.setState({ step: 0 })}>{scrollmenu[0].txt}</div>
            <div className={`navi_label borderBottom ${this.state.step==1?"select":"black"}`}  
                  onClick={()=> this.setState({ step: 1 })}
                  // onClick={() => this.state.basic ?this.setState({ step: 1 }) :alert("기본 정보의 필수항목(*)을 입력하셔야 합니다.")}
                  >{scrollmenu[1].txt}</div>
            <div className={`navi_label ${this.state.step==2?"select":"black"}`} 
                  onClick={()=> this.setState({ step: 2 })}
                  //  onClick={() => this.state.additional ? this.setState({ step: 2 }) : alert("부가 정보의 필수항목(*)을 입력하셔야 합니다.")}
                   >{scrollmenu[2].txt}</div>
            <div className="navi_label red" style={{marginTop:"531px"}}></div>

          </div> */}
          <div className="vLine" />
          {/* <div className="summary">
             <DesignCard>
               <img src={thumbnailURL == null ? noimg : thumbnailURL} className="thumbnail"/>
               <div className="info">
                 <div className="spaceBetween">
                   <div className="title">디자인1</div>
                   <div className="date">8일전</div>
                 </div>
                 <div className="designer">디자이너1</div>
                 <div className="asset_wrapper">
                   <img src={new_logo_view} className="asset_icon"/><div className="asset_text">0</div>
                   <img src={new_logo_favorite} className="asset_icon"/><div className="asset_text">0</div>
                   <img src={new_logo_share} className="asset_icon"/><div className="asset_text">0</div>
                 </div>
               </div>
             </DesignCard>
             <div className="completeButton"
                  onClick={this.submit}
             >완성된 디자인 등록하기</div>
          </div> */}
          <ContentWrapper>
            <Section isNone={step === 0}>
              <div className="board">
                <div className="board_label">
                  1. 대표 이미지 등록하기
                  <sub className="sub marginRight2">*</sub>
                  <QuestionGuide left={15} top={-50} bubbleSize={584}>
                    ?
                  </QuestionGuide>
                </div>
                <div className="board_box">
                  <div className="row" style={{ marginTop: "10px" }}>
                    {this.state.thumbnail == null ||
                    this.state.thumbnail == noimg ? (
                      <div className="imageBox">
                        <img src={new_logo_plus} className="plus" />
                      </div>
                    ) : (
                      <img className="imageBox" src={this.state.thumbnail} />
                    )}
                    <div className="imageLabel">
                      <label className="findThumbnailText" htmlFor="file">
                        찾아보기
                      </label>
                      <input
                        hidden
                        onChange={this.handleOnChangeThumbnail}
                        id="file"
                        type="file"
                        accept="image/jpg, image/jpeg, image/png, image/bmp"
                      />
                      <div className="thumbnailExplainText">
                        {" "}
                        대표적으로 보이게 되는 사진으로, <br />
                        JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="board_label" style={{ marginTop: "12px" }}>
                  2. 디자인 이름<sub className="sub marginRight1">*</sub>
                </div>
                <div className="board_box">
                  <InputText
                    onChange={this.onChangeValueTitle}
                    onKeyDown={this.onKeyDownEnter}
                    name="title"
                    maxLength="100"
                    placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
                  />
                </div>
                <div className="board_label" style={{ marginTop: "22px" }}>
                  3. 디자인 설명
                  {/* <sub className="sub marginRight2">*</sub> */}
                </div>
                <div className="board_box">
                  <InputTextArea
                    id="textBox"
                    onChange={this.onChangeValueExplanation}
                    maxLength="350"
                    placeholder="디자인 설명을 입력해주세요. (350자 이내)"
                  />
                </div>
              </div>
              {step === 0 && (
                <div className="buttonWrap">
                  <CustomButton
                    onClick={
                      this.state.basic ? this.gotoNextStep : this.checkInputForm
                    }
                    isComplete={this.state.basic}
                  >
                    <BtnText>다음</BtnText>
                  </CustomButton>
                </div>
              )}
            </Section>

            <Section isNone={step === 1}>
              <div className="board">
                <div className="maxFlex">
                  <div className="board_label">
                    1. 카테고리<sub className="sub marginRight1">*</sub>
                  </div>

                  <div className="category_wrapper">
                    <CategoryDropDown
                      selection
                      ref="dropdown1"
                      onChange={this.onChangeCategory1}
                      options={this.props.category1}
                      value={this.state.categoryLevel1}
                      placeholder="카테고리를 선택해주세요"
                    />
                    <CategoryDropDown
                      selection
                      id="category2"
                      ref="dropdown2"
                      onChange={this.onChangeCategory2}
                      options={
                        this.props.category2[this.state.categoryLevel1 - 1] ||
                        emptyCategory
                      }
                      value={this.state.categoryLevel2}
                      placeholder="카테고리를 선택해주세요"
                    />
                    {this.state.categoryLevel2 == 28 ? (
                      <CategoryDropDown
                        selection
                        id="category3"
                        ref="dropdown3"
                        onChange={this.onChangeCategory3}
                        options={
                          (this.props.category3 &&
                            this.props.category3[category3Index]) ||
                          emptyCategory
                        }
                        value={this.state.categoryLevel3}
                        placeholder="카테고리를 선택해주세요"
                      />
                    ) : null}
                  </div>
                </div>
                <div
                  className="board_box paddingLeft1"
                  style={{ marginTop: "70px" }}
                >
                  {/* {this.state.categoryLevel3 != null ? (
                    <IsProblemBox>
                      <CheckBox2
                        onChange={this.onCheckIsProblem}
                        checked={this.state.is_problem ? true : false}
                        type="checkbox"
                      />
                      <span className="textLabel">
                        문제 등록 기능을 사용합니다.
                      </span>
                    </IsProblemBox>
                  ) : null} */}
                </div>
                <div className="maxFlex">
                  <div className="board_label " style={{ marginRight: "5px" }}>
                    2. 멤버 초대하기
                  </div>
                  <div style={{ width: "400px", marginRight: "10px" }}>
                    <SearchDesignMemverContainer
                      className="searchRect"
                      addMember={this.addMember}
                    />
                  </div>
                  <QuestionGuide left={64} top={-10} bubbleSize={600}>
                    ?
                    <div className="messageBubble">
                      함께 디자인을 만들어 갈 멤버를 초대해 주세요. <br />
                      초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.
                      <br />
                      디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수
                      있습니다.
                    </div>
                  </QuestionGuide>
                </div>
                <div className="messageBubble">
                  <div className="board_label" />
                  <div className="quest">?</div>
                  <div className="board_box">
                    함께 디자인을 만들어 갈 멤버를 초대해 주세요. <br />
                    초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.
                    <br />
                    디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수
                    있습니다.
                  </div>
                </div>
                <InviteMemberListBox>
                  <div className="memberList">
                    {this.state.members && this.state.members.length > 0
                      ? this.state.members.map((item, index) => {
                          return (
                            <div
                              onClick={() => this.removeMember(item.user_id)}
                              key={index}
                            >
                              <Peer
                                s_img={item.s_img == null ? noface : item.s_img}
                                nick_name={item.nick_name}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </InviteMemberListBox>
                <div className="board_label">3. 라이센스</div>
                <div className="board_box paddingLeft1 column">
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license1}
                      onChange={this.onCheckedLicense01}
                    />
                    <span className="textLabel">
                      상업적으로 이용이 가능합니다.
                    </span>
                  </div>
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license2}
                      onChange={this.onCheckedLicense02}
                    />
                    <span className="textLabel disabled">
                      원작자를 표시합니다.
                    </span>
                  </div>
                  <div className="licenseItem">
                    <CheckBox2
                      checked={this.state.license3}
                      onChange={this.onCheckedLicense03}
                    />
                    <span className="textLabel">수정이 가능합니다.</span>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <div className="buttonWrap">
                  <CustomButton isComplete={false} onClick={this.gotoPrevStep}>
                    <BtnText>뒤로</BtnText>
                  </CustomButton>
                  <CustomButton
                    onClick={
                      this.state.additional
                        ? this.gotoNextStep
                        : this.checkInputForm
                    }
                    isComplete={this.state.additional}
                  >
                    <BtnText>다음</BtnText>
                  </CustomButton>
                </div>
              )}
            </Section>
            <Section isNone={step === 2} isLast={true}>
              <div className="grid_wrapper">
                <div className="board_grid">
                  <ResetButtonWrapper
                    onClick={() =>
                      this.setState({
                        step: 2,
                        type: "normal",
                        is_project: 0,
                        contents: [],
                        steps: [],
                        template: null,
                      })
                    }
                  >
                    작업취소하기
                    <i className="undo icon" />
                  </ResetButtonWrapper>

                  {is_project === 0 ? (
                    <React.Fragment>
                      {contents && contents.length > 0 ? (
                        <React.Fragment>
                          {contents.map((item) => {
                            return (
                              <ControllerWrap key={item.order}>
                                <div className="contentWrap">
                                  {item.type === "FILE" ? (
                                    <FileController
                                      item={item}
                                      name="source"
                                      initClick={this.state.click}
                                      getValue={this.onChangeFile}
                                      setController={this.setController}
                                    />
                                  ) : null}
                                  {item.type === "TEXT" ? (
                                    item.initClick == true ||
                                    this.state.selectOrder == item.order ? (
                                      <TextController
                                        item={item}
                                        name={item.name}
                                        initClick={this.state.click}
                                        getValue={(data) =>
                                          this.onChangeValue(data, item.order)
                                        }
                                      />
                                    ) : (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.content,
                                        }}
                                        onClick={() =>
                                          this.setState({
                                            selectOrder: item.order,
                                          })
                                        }
                                      />
                                    )
                                  ) : null}
                                  {item.type === "LINK" ? (
                                    <LinkController
                                      item={item}
                                      name={item.name}
                                      initClick={this.state.click}
                                      getValue={(data) =>
                                        this.onChangeValue(data, item.order)
                                      }
                                    />
                                  ) : null}
                                </div>
                                <DelBtn
                                  type="button"
                                  className="editBtn"
                                  onClick={() => this.onDelete(item.order)}
                                >
                                  <i className="trash alternate icon large" />
                                </DelBtn>
                              </ControllerWrap>
                            );
                          })}
                          <AddContent
                            getValue={this.onAddValue}
                            order={contents.length}
                          />
                        </React.Fragment>
                      ) : (
                        <AddContent
                          getValue={this.onAddValue}
                          order={0}
                          change={() =>
                            this.setState({ type: "grid", is_project: 1 })
                          }
                        />
                      )}
                    </React.Fragment>
                  ) : null}

                  {this.state.type === "grid" ? (
                    <DesignTemplateSelector>
                      <div className="title">
                        템플릿을 선택하시면 보다 편하게 작업을 시작하실 수
                        있습니다!
                      </div>

                      <div className="template-wrapper">
                        {template &&
                          template.length > 0 &&
                          template.map((item) => (
                            <label
                              className="element"
                              key={item.type}
                              onClick={async () =>
                                await this.setState({ template: item.type })
                              }
                            >
                              {item.text}
                              <DesignElement>
                                <img alt="" src={item.img} />
                              </DesignElement>
                            </label>
                          ))}
                      </div>
                    </DesignTemplateSelector>
                  ) : null}

                  {this.state.type === "grid" &&
                  this.state.template != null &&
                  this.state.template !== "my-design" ? (
                    <EditorWrapper>
                      <div className="editor">
                        <TemplateGridEditor
                          selected={(content) =>
                            this.setState({ steps: content, is_project: 1 })
                          }
                          type={this.state.template}
                        />
                      </div>
                      <div className="title">
                        선택하신 템플릿으로 시작하시고 싶으시다면 완성된 디자인
                        등록하기 버튼을 클릭해주세요.
                      </div>
                    </EditorWrapper>
                  ) : null}
                </div>
              </div>

              {step === 2 && (
                <div className="buttonWrap">
                  <CustomButton isComplete={false} onClick={this.gotoPrevStep}>
                    <BtnText>뒤로</BtnText>
                  </CustomButton>
                  <CustomButton
                    isComplete={
                      this.state.type === "grid" && this.state.template == null
                        ? false
                        : true
                    }
                    onClick={this.submit}
                  >
                    <BtnText>완료</BtnText>
                  </CustomButton>
                </div>
              )}
            </Section>
          </ContentWrapper>
        </Wrapper>
      </React.Fragment>
    );
  }
}
export default CreateDesign;

const ControllerWrap = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  border: 1px solid #707070;
  padding: 25px;
  margin-bottom: 30px;
  .innerBox {
    display: flex;
    justify-content: space-between;
  }
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${osdcss.color.grayScale.scale6};
    }
  }
  &:hover {
    background-color: #fafafa;
    & .initWrap {
      & > ul {
        display: flex;
      }
      & > span {
        color: ${osdcss.color.grayScale.scale6};
      }
    }
  }
`;
const NewController = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-weight: 500;
  font-size: 22px;
  color: black;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`;

class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = { type: null, content: "", order: null };
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({
        type,
        order: this.props.order,
        content: "",
        initClick: true,
      });
      setTimeout(() => {
        this.setState({ initClick: false });
      }, 100);
    } else {
      await this.setState({ type, order: this.props.order, content: "" });
      this.returnData();
    }
  };
  changeType = () => {
    this.props.change && this.props.change();
  };
  returnData = async (data) => {
    if (data) {
      await this.setState({
        type: null,
        order: this.props.order,
        content: "",
        initClick: false,
      });
      this.props.getValue(data);
    } else {
      if (this.props.getValue) this.props.getValue(this.state);
    }
  };
  render() {
    return (
      <ControllerWrap>
        <div className="innerBox">
          <NewController
            className="first txt"
            onClick={() => this.addContent("FILE")}
            width="max-content"
            minWidth="116px"
            height="29px"
          >
            파일 등록하기
          </NewController>
          <NewController
            className="txt"
            onClick={() => this.addContent("TEXT")}
            width="max-content"
            minWidth="134px"
            height="29px"
          >
            텍스트 입력하기
          </NewController>
          <NewController
            onClick={() => this.addContent("LINK")}
            width="max-content"
            minWidth="134px"
            height="29px"
          >
            하이퍼링크 등록하기
          </NewController>

          {this.props.order === 0 ? (
            <NewController
              className="txt complecated"
              width="max-content"
              height="29px"
            >
              <div onClick={this.changeType} className="txt">
                템플릿 선택하기
              </div>
              {/* <Tip>
                <sup>&nbsp;?</sup>
                <div className="wrapper">
                  <div className="tip-txt">
                    <font style={{ color: "pink" }}>*&nbsp;</font>...</div>
                </div>
              </Tip> */}
            </NewController>
          ) : null}
        </div>
        {this.state.type === "FILE" && (
          <FileController item={this.state} getValue={this.returnData} />
        )}
      </ControllerWrap>
    );
  }
}
