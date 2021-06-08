import React, { Component } from "react";
import styled from 'styled-components';
// import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import CheckBox2 from "components/Commons/CheckBox";
// import { LocalGridEditor } from "components/GridEditor/LocalGridEditor";
import { AddController, InputContent, InputCalendar, Controller, InputTag, RadioType } from "components/Commons/InputItem";
import SearchDesignMemberContainer from "containers/Commons/SearchMemberContainer";
import { InputPriceNew } from "components/Commons/InputItem/InputPriceNew";
import Loading from "components/Commons/Loading";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import _ from 'lodash';
import market_style from "market_style";
import { Icon } from "semantic-ui-react";

const ItemType = [
  { text: "디자인", value: 0 },
  { text: "프로젝트", value: 1 },
  { text: "강의", value: 8 },
  { text: "기술자문/상담", value: 2 },
  { text: "경험", value: 3 },
  { text: "정보/데이터", value: 4 },
  { text: "아이디어/노하우", value: 5 },
  { text: "지적재산권", value: 6 },
  { text: "제작품", value: 7 }
];
const MainBox = styled.div`
  width:100%;
  .title{
    width:100%;
    text-align:center;
    font-family:Noto Sans KR, Medium;
    font-size:${market_style.font.size.normal3};
    font-weight:500;
    color:black;
    margin-bottom:15px;
  }
  .contentsBox {
    display: flex;
    width: 100%;
  }
  .centering{
    justify-content:center; 
  }
  .marginTop{
    margin-top:20px; 
  }
  .directionColumn{
    align-items:center;
    flex-direction:column;
  }
  .font_red {
    width: 7px;
    height: 7px;
    color: #FF0000;
    cursor: default;
  }
  .tabMenu{
    margin-top:15px;
    margin-bottom:15px;
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    border: 1px dashed #707070;
    .items{
      cursor:pointer;
      font-size:${market_style.font.size.small1};
    }
    .marginRight{
      margin-right:70px;
    }
    .redText{
      color:red;
    }
    .blackText{
      color:black;
    }
  }
  @media only screen and (min-width: 1000px) and (max-width:1366px){
    .flexWrap{
      flex-wrap:nowrap;
    }
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    .flexWrap{
      flex-wrap:wrap;
    }
  }
`;
const ButtonBox = styled.div`
  width: max-content;
  margin-left: auto;
  margin-right: 85px;
  min-width:100%;
  display:flex;
  justify-content:center;
  // padding-left:130px;
  padding-top:20px;
  margin-bottom:70px;
`;
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
  }
  width:270px;
  height:302px;
  padding:20px;
  margin-right:20px;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  border-radius:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  .label{
    width:100%;
    text-align:center;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    margin-bottom:10px;
  }
  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:20px;
  }
  @media only screen and (min-width: 1000px) and (max-width:1366px){
    margin-bottom:20px;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    width:100%;
    margin-bottom:20px;
    margin-right:0px;
  }
`;
const Thumbnail = styled.div`
  width: ${props => props.width == null ? "230px" : props.width + "px"};
  height: ${props => props.height == null ? "230px" : props.height + "px"};
  margin-bottom: ${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  background: #E9E9E9;
  border: ${props => props.img ? "1px solid #E9E9E9" : "none"};
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
`;
const FormBox = styled.div`
  width:100%;
  max-width:${props => props.width != null ? props.width + "px" : "100%"};
  height:${props => props.height != null ? props.height + "px" : "max-content"};
  box-shadow: ${props => props.boxShadow == null ? "" : "5px 5px 10px #00000029"};
  margin-top: ${props => props.marginTop || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  border-radius: 20px;
  padding: ${props => props.padding == null ? "30px 50px" : props.padding};
  border:1px solid #eaeaea;

  .FormBoxScroll{
    position: relative;
    padding:0px 15px 0px 0px;
    width:100%;
    height:100%;
    overflow-Y:overlay;
    overflow-X:hidden;
  }
  .flexWrapBox{
    width:100%;
    display:flex;
    flex-wrap:wrap;
  }
  .maxWidth{
    width:100%;
  }
  .contentWrap{
  }
  .Vcentering{
    align-items:center;
  }
  .inputBox{
    width:330px;
    height:max-content;
  }
  .wrapper{
    width:100%;
    height:max-content;
  }
  .margin_bottom{
    margin-bottom:20px;
  }
  .margin_zero{
    margin:0px;
  }
  .flex{
    display:flex;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    width:141px;
    font-family: Noto Sans KR;
    font-weight: 500;
    min-width:157px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
  .remove-margin{
    // margin-top: 10px;
    margin-bottom: 10px;
  }
  .cursor {
    cursor: pointer;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    padding:27px;
  }
`;
const DescirptionText = styled.div`
font-size:${market_style.font.size.mini2};
color:#707070;
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;
  font-weight:300;

`;
const DropBox = styled(Dropdown)`
    width:160px;
    min-width:100px !important;
    min-height:31px !important;
    max-height:31px !important;   
    display:flex !important;
    align-items:center !important; 
    background-color:#E9E9E9 !important;
    margin-right:10px;
    font-size:${market_style.font.size.small1};
    border-radius:10px !important;
    position:relative !important;
    .icon{
      width:max-content !important;
      height:max-content !important;
      padding:6px !important;
    }
    .menu{
      height:max-content;
      max-height:113px !important;
      z-index:9999 !important;

    }
    .
`;
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const InfoContentChooseItemType = styled.div`
  border: 1px dashed gray;
  padding: 25px;
  width: 860px;
  border-radius: 20px;
  line-height: 28px;
  text-align: center;
  margin-top: 76px;
  margin-left: auto;
  margin-right: auto;
  font-size:${market_style.font.size.giant1};
  color: #707070;
`;
const DeleteMenu = styled.div`
  position: abolute;
  width: 280px;
  padding: 25px;
  border-radius: 25px;
  background: white;
  font-size: 28px;
  // line-height: 56px;
  text-align: center;
  font-family: Noto Sans KR;
  opacity:0.6;
  .active{
    color: red;
  }
  .mousePointer{
    cursor:pointer;
  }
  &:hover{
    opacity:1;
  }
`;
const NaviMenu = styled.div`
  position: abolute;
  width: 280px;
  padding: 25px;
  border: 1px solid blue;
  border-radius: 25px;
  background: white;
  font-size: 28px;
  line-height: 56px;
  text-align: center;
  font-family: Noto Sans KR;
  
  .active{
    color: red;
  }
  .mousePointer{
    cursor:pointer;
  }
`;
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  // margin-top: 30px;
  font-size:${market_style.font.size.normal3};
  font-weight: 500;
  font-family: Noto Sans KR;
  color: #707070;
  display:flex;
  .textLabel {
        margin - left: 35px;
      vertical-align: top;
    }
`;
class Field extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={`wrapper flex ${this.props.isMargin == false ? null : "margin_bottom"} ${this.props.isCentering == null ? null : "Vcentering"}`}>
        <div className={`label`}>{title}</div>
        {this.props.children}
      </div>)
  }
};
const ItemContents = styled.div`
  // *{ border: 1px solid blue; }
  width: 100%;
  // width: 1306px;
  height: max-content;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border: 0.25px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding: 20px 25px;

  .header {
    padding-bottom: 10px;
    border-bottom: 2px solid #EFEFEF; 
    .title {
      margin: auto;
      // margin-top: 10px;
      width: max-content;
      line-height: 27px;
      font-size: 18px;
      color: #000000;
      font-family: Noto Sans KR;
      font-weight: Medium;
      letter-spacing: 0px;
    }
    .title-input {
      width: 100%;
      min-width: 820px;
      height: 31px;
      background: #E9E9E9 0% 0% no-repeat padding-box;
      border-radius: 10px;
      border: none;
      outline:none;
      text-align: left;
      font: normal normal 300 13px/19px Noto Sans KR;
      letter-spacing: 0px;
      color: #000; //#707070;
      padding: 3px 0px 0px 11px;
      &.checkbox_wrapper{
        width:max-content;
        height: 19px;
        display: flex;
        align-items:center;
        .checkbox{
          width:max-content;
          height: 19px;
          margin-right: 5px;
        }
        .text{
          font: normal normal 300 13px/19px Noto Sans KR !important;
          height: max-content;
        }
      }
    }
  }
  .editor-wrapper {
    :hover {
      opacity: 0.95;
    }
    width: 99%;
    height: 100%;
    padding-top: 15px;
    word-wrap: break-word;
    overflow: hidden;
  }
  button {
    &.edit{
      margin-left: 10px;
      width: 120px;
      height: 31px;
      background-color: red;
      font: normal normal 300 13px/19px Noto Sans KR;
      color: white;
      border: none;
      outline: none;
      border-radius: 10px;
    }
    &.disabled{
      background-color: #EFEFEF;
      color: gray;
    }
  }
`;
const InputNumberText = styled.input.attrs({ type: "number" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;


class ModifyItemInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // send data - basic
      category_level1: -1, category_level2: -1,
      title: "",
      thumbnail: null, thumbnail_name: null,
      tag: [], category1: null, category2: null,
      itemType: -1,
      // send data - additional
      additional: null, content: [], steps: [], type: "blog", private: 0,

      //ui 
      tab: "contents", //debug
      // tab: "basic",
      alone: false,
      ismodified: false,
      // more
      listname: null,
    };
    this.onClickItemType = this.onClickItemType.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onHandleReturnedTags = this.onHandleReturnedTags.bind(this);
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onClickCategorylevel3 = this.onClickCategorylevel3.bind(this);
    this.deleteThisItem = this.deleteThisItem.bind(this);
    this.onHandleAdditionalText = this.onHandleAdditionalText.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.onHandleAdditionalMember = this.onHandleAdditionalMember.bind(this);
    this.onHandleRadio = this.onHandleRadio.bind(this);
    this.isModify = this.isModify.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeListName = this.onChangeListName.bind(this);
    this.editGridEditorName = this.editGridEditorName.bind(this);
    this.newGridEditorName = this.newGridEditorName.bind(this);
    this.updateListHeader = this.updateListHeader.bind(this);
    this.onHandleAdditionalMaxNumber = this.onHandleAdditionalMaxNumber.bind(this);
  };
  async componentDidMount() {
    const { ItemDetail } = this.props;
    let additional = await {
      description: ItemDetail.description,
      price: ItemDetail.price,
      public: ItemDetail.public,
      "contact-type": ItemDetail["contact-type"],
      "selling-type": ItemDetail["selling-type"],
      members: ItemDetail.members,
      max_students: ItemDetail.max_students,
      recruit_always: ItemDetail.recruit_always,
      start_date: ItemDetail.start_date,
      end_date: ItemDetail.end_date,
    }
    // console.log(ItemDetail, additional);
    const item = await {
      title: ItemDetail.title,
      category_level1: ItemDetail.category_level1,
      category_level2: ItemDetail.category_level2,
      category_level3: ItemDetail.category_level3,
      tag: ItemDetail.tag.indexOf(",") == -1 ? [] : ItemDetail.tag.split(","),
      itemType: ItemDetail.type,
      thumbnail: ItemDetail.thumbnail.l_img,
      type: ItemDetail.upload_type,
      //
      additional: additional,
      is_problem: ItemDetail.is_problem,
    }
    await this.setState({ listname: ItemDetail.headers.map(head => head.name) });
    await this.setState(item);
  };
  async isModify() {
    // check 
    if (
      this.state.title === this.props.ItemDetail.title
      && this.state.files == null
      && this.state.tag.join(',') === this.props.ItemDetail.tag
      && this.state.category_level1 === this.props.ItemDetail.category_level1
      && this.state.category_level2 === this.props.ItemDetail.category_level2
      && this.state.category_level3 === this.props.ItemDetail.category_level3
      && _.isEqual(this.state.additional, { "contact-type": this.props.ItemDetail["contact-type"], description: this.props.ItemDetail.description, members: this.props.ItemDetail.members, price: this.props.ItemDetail.price, public: this.props.ItemDetail.public, "selling-type": this.props.ItemDetail["selling-type"] })
      // "\n7", this.state.content, this.props.ItemDetail.content,
      // "\n8", this.state.step === this.props.ItemDetail.steps,
      && this.state.type === (this.props.ItemDetail.type === 1 ? "project" : "blog")
      && this.state.private === this.props.ItemDetail.private
    ) {
      // await alert("변경된 사항이 없습니다.");
      return false;
    }
    return true;
  }
  async onSubmit(event) {
    // event.preventDefault();
    this.setState({ loading: true });
    const members = this.state.alone ? [] : this.state.additional.members
    let additional = {
      ...this.state.additional,
    };
    additional.members = members;
    let data = {
      // basic
      title: this.state.title,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name }],
      tag: this.state.tag, category1: this.state.category_level1, category2: this.state.category_level2, category3: this.state.category_level3, is_problem: this.state.is_problem,
      // itemType: this.state.itemType, //fixed
      // additional
      additional: this.state.additional, content: this.state.content, step: this.state.steps,
      type: this.state.type, private: this.state.private
    };

    // return;
    data.additional.description = data.additional.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.props.UpdateItemRequest(data, this.props.ItemDetail.item_id, this.props.token)
      .then(async result => {
        if (result.res.success) {
          await alert("아이템이 수정 되었습니다. 아이템상세페이지로 이동합니다.");
          window.location.href = `/productDetail/${this.props.id}`
        } else {
          await alert("아이템 수정을 실패하였습니다.");
        }
      })
      .catch(async error => {
        await alert("오류내용:" + error.message);
      });
    this.setState({ loading: false });
  };
  async onCancel() {
    if (this.state.ismodified) {
      if (await confirm("수정된 내용이 저장되지 않습니다.", "확인", "취소")) {
        // window.history.go(-1).then(() => window.location.reload())
      } else {
        return;
      }
    }
    window.location.href = `/productDetail/${this.props.id}`
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: value });
    this.setState({ ismodified: await this.isModify() });

  };
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: value });
    this.setState({ ismodified: await this.isModify() });

  };
  async onClickCategorylevel3(event, { value }) {
    await this.setState({ category_level3: value });
    this.setState({ ismodified: await this.isModify() });

  }
  onClickItemType(_, { value }) {
    this.setState({ itemType: { value }.value, additional: null, type: { value }.value === 1 ? "project" : "blog" });
  };
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
  };
  async deleteItem(index) {
    let copyContent = [...this.state.content];
    let copyDelete = [...this.state.deleteContent];
    if (copyContent[index].uid) {
      copyDelete.push(copyContent[index]);
    }
    await copyContent.splice(index, 1);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        delete item.target;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent, deleteContent: copyDelete });
  };
  onChangeValue(event) {
    this.setState({ [event.target.name]: event.target.value });
  };
  onHandleReturnedTags(param) {
    // console.log(param);
    this.setState({ tag: param });
  };
  async deleteThisItem() {
    this.setState({ loading: true });
    this.props.DeleteItemRequest &&
      await confirm("이 아이템을 삭제하시겠습니까?") &&
      await this.props.DeleteItemRequest(this.props.ItemDetail.item_id, this.props.token)
        .then(data => {
          // console.log(data);
          if (data.res.success) {
            // alert("아이템 삭제성공");
            window.location.href = `/product`;
          }
        })
    this.setState({ loading: false });
  };
  async onHandleAdditionalText(event) {
    let copy = { ...this.state.additional };
    copy[event.target.name] = event.target.value;
    await this.setState({ additional: copy });
  };
  async onHandleAdditionalMaxNumber(event, max_limit) {
    let copy = { ...this.state.additional };
    const { value } = event.target;
    copy[event.target.name] = value > max_limit ? max_limit : value;
    await this.setState({ additional: copy });
  };
  async getPriceValue(value) {
    let copy = { ...this.state.additional };
    copy.price = value;
    await this.setState({ additional: copy });
  };
  async onHandleAdditionalMember(mem) {
    let copy = { ...this.state.additional };
    copy["members"] = mem;
    await this.setState({ additional: copy });
  }
  async onHandleRadio(name, value) {
    let copy = { ...this.state.additional };
    // console.log(this.state, value);
    copy[name] = value === "예" ? "yes" : "no";
    await this.setState({ additional: copy });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (_.isEqual(prevState, this.state) == false) {
      const initvalue = {
        additional: null, alone: false, category1: null, category2: null, category_level1: -1, category_level2: -1, content: [], ismodified: false, itemType: -1, private: 0, steps: [], tab: "basic", tag: [], thumbnail: null, thumbnail_name: null, title: "", type: "blog"
      };
      if (_.isEqual(this.state, initvalue) == false) {
        this.setState({ ismodified: await this.isModify() });
      }
    }
  }
  async onChangeListName(event, index) {
    let copy = this.state.listname.map((v, i) => i === index ? event.target.value : v);
    await this.setState({ listname: copy });
  }
  async editGridEditorName(header, index) {
    this.props.UpdateItemListHeaderRequest(header.uid, this.props.token, { name: this.state.listname[index] })
      .then(() => {
        this.props.GetItemDetailRequest(this.props.id, this.props.token);
      })
  }
  async newGridEditorName() {
    if (await confirm("새로운 내용을 추가하시겠습니까?") === false) {
      return;
    }
    const { id, token } = this.props;

    this.props.CreateItemListHeaderRequest(id, token)
      .then(this.props.GetItemDetailRequest(id, token))
  }
  async updateListHeader(head) {
    const { id, token } = this.props;
    this.props.UpdateItemListHeaderRequest(head.uid, token, { type: head.type === "item" ? "practice" : "item" })
      .then(this.props.GetItemDetailRequest(id, token))
  }


  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    const category3 = (this.state.category_level1 && this.state.category_level2 && this.props.category3 && this.props.category3.filter(item => item.parent === this.state.category_level2)) || [{ text: "_", value: -1 }];

    const { /* edit, */ itemType, tab } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다."> * </span>
    const { ItemDetail: item } = this.props;
    console.log("ITEM::", this.props);
    return (<MainBox>
      {this.state.loading ? <Loading /> : null}

      {/* 타이틀 */}
      <div className="title">아이템 수정</div>
      <div className="tabMenu">
        <div className={`items marginRight ${tab == "basic" ? "redText" : "blackText"}`}
          onClick={() => this.setState({ tab: "basic" })}> 기본/추가정보 변경</div>
        <div className={`items marginRight ${tab == "contents" ? "redText" : "blackText"}`}
          onClick={() => this.setState({ tab: "contents" })}>컨텐츠 변경</div>
        <div className={`items ${tab == "delete" ? "redText" : "blackText"}`}
          onClick={this.deleteThisItem}>아이템 삭제</div>
      </div>
      {/* <NaviMenu>
        <div className={tab === "basic" ? "active mousePointer" : "mousePointer"} onClick={() => this.setState({ tab: "basic" })}>기본/추가정보 변경</div>
        <div className={tab === "contents" ? "active mousePointer" : "mousePointer"} onClick={() => this.setState({ tab: "contents" })}>컨텐츠 변경</div>
      </NaviMenu>
      <DeleteMenu>
        <div className={tab === "delete" ? "active mousePointer" : "mousePointer"} onClick={this.deleteThisItem}>아이템 삭제</div>
      </DeleteMenu> */}

      {/* 공통/기본입력사항 */}
      {tab === "basic" ?
        (<div className="contentsBox flexWrap">
          <ThumbnailBox>
            <div className="label">썸네일 이미지<Mandatory /></div>
            <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/*" />
            <label htmlFor="file">
              <Thumbnail img={this.state.thumbnail}>
                {this.state.thumbnail ? null : <div>첨부하기</div>}
              </Thumbnail>
            </label>
          </ThumbnailBox>

          <FormBox height={302} marginBottom={20} boxShadow={true}>
            <div className="FormBoxScroll">
              <div className="contentWrap">
                <div className="wrapper flex margin_bottom">
                  <div className="label">아이템명<Mandatory /></div>
                  <InputText width={330} name="title" value={this.state.title || ""} onChange={this.onChangeValue} />
                </div>

                <div className="wrapper flex margin_bottom">
                  <div className="label">카테고리<Mandatory /></div>
                  <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                  <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
                  {parseInt(this.state.category_level2, 10) === 42 ?
                    <React.Fragment>
                      <DropBox id="category_level3" value={this.state.category_level3} selection options={category3} placeholder="언어선택" onChange={this.onClickCategorylevel3} />
                      <div style={{ disply: "flex", alignItems: "center" }}>
                        <CheckBox2 onChange={() => this.setState({ is_problem: !this.state.is_problem, })} checked={this.state.is_problem} />
                        <div style={{ marginLeft: "30px" }}>문제 등록기능을 사용합니다.</div>
                      </div>
                    </React.Fragment>
                    : null}
                </div>
                <div className="wrapper flex margin_bottom">
                  <div className="label">태그</div>
                  <div>
                    <InputTag width={330} taglist={this.state.tag} getValue={this.onHandleReturnedTags} />
                  </div>
                </div>

                <div className="wrapper flex">
                  <div className="label">아이템 유형<span className="font_red">*</span></div>
                  <div title={"(아이템 유형을 변경하실 수 없습니다.)"}>
                    {ItemType.map(itemtype => (itemtype.value === this.state.itemType && itemtype.text))}
                  </div>
                  {/* <DropBox selection value={this.state.itemType} options={ItemType} placeholder="아이템 유형" onChange={this.onClickItemType} /> */}
                </div>

                {/* <div className="wrapper flex">
                <div onClick={this.deleteThisItem}
                  style={{ cursor: "default", width: "max-content", marginLeft: "auto", marginRight: "60px" }}>
                  <div style={{ textAlign: "center", fontSize: "28px", color: "red" }}>아이템삭제</div>
                </div>
              </div> */}
              </div>
            </div>
          </FormBox>
        </div>) : null}

      {/* additional */}
      {tab === "basic" ?
        (<div className="contentsBox centering">
          <FormBox boxShadow={true}>
            <div className="contentWrap">

              {itemType === 0 ?
                //<ItemDesign return={this.onHandleAdditional} /> 
                <React.Fragment>
                  <Field title="설명">
                    <InputTextarea
                      onChange={this.onHandleAdditionalText}
                      value={(this.state.additional && this.state.additional.description.replace(/<br \/>/gi, '\n')) || ""}
                      name="description"
                      height={60} />
                  </Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew
                      getValue={this.getPriceValue}
                      name="price"
                      price={this.state.additional.price}
                    />
                  </Field>
                </React.Fragment> : null}

              {itemType === 1 ?
                //  <ItemProject return={this.onHandleAdditional} /> 
                <React.Fragment>
                  <Field title="설명">
                    <InputTextarea
                      onChange={this.onHandleAdditionalText}
                      value={(this.state.additional && this.state.additional.description.replace(/<br \/>/gi, '\n')) || ""}
                      name="description"
                      height={60} ></InputTextarea>
                  </Field>
                  <Field title="팀원 초대">
                    <div className="inputBox">
                      {!this.state.alone ?
                        <SearchDesignMemberContainer
                          originalMember={
                            (this.state.additional && this.state.additional.members.filter(user => user.uid !== this.props.userInfo.uid)) || []}
                          className="searchRect"
                          onChangeMembers={this.onHandleAdditionalMember} />
                        : null}
                      {/* LEAVE ME ALONE */}
                      {/* <NoInviteMemberBox>
                          <CheckBox2 onChange={() => this.setState({ alone: !this.state.alone, members: [] })} checked={this.state.alone} />
                          <div className="textLabel">멤버를 초대하지 않습니다.</div>
                        </NoInviteMemberBox> */}
                    </div>
                  </Field>
                  <Field title="내용 공개 여부">
                    <RadioType
                      return={this.onHandleRadio}
                      default={this.state.additional.public === "yes" ? "예" : "아니오"}
                      name="public"
                      Options={["예", "아니오"]} />
                  </Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew

                      getValue={this.getPriceValue}
                      name="price"
                      price={this.state.additional.price}
                    />
                  </Field>
                </React.Fragment> : null}

              {itemType === 2 ?
                // <ItemConsulting return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  {/* <Field title="자문/상담 방법"> 온라인 */}
                  {/* <RadioType checked={1} return={this.onHandleReturn} name="contact-method" Options={typeOnOff} /> */}
                  {/* </Field> */}
                  <Field title="내용 공개 여부">
                    <RadioType
                      return={this.onHandleRadio}
                      default={this.state.additional.public === "yes" ? "예" : "아니오"}
                      name="public"
                      Options={["예", "아니오"]} /></Field>
                  <Field isMargin={false} isCentering={true} title="자문/상담 비용">
                    <InputPriceNew placeholder="시간당" name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                  </Field>
                </React.Fragment>) : null}

              {itemType === 3 ?
                // <ItemExperience return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                  </Field>
                </React.Fragment>) : null}

              {itemType === 4 ?
                // <ItemInfoData return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                    {/* <InputText onChange={this.onHandleChange} name="price" width={370} /> */}
                  </Field>
                </React.Fragment>) : null}

              {itemType === 5 ?
                // <ItemIdea return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                  </Field>
                </React.Fragment>) : null}

              {itemType === 6 ?
                // <ItemPatent return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  <Field title="내용">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {this.state.content.length > 0 &&
                        this.state.content.map((item, index) =>
                          <Controller key={index} type={item.type} item={item} order={index}
                            deleteItem={this.deleteItem} name={`content${index}`} getValue={this.onChangValue} />)}
                      <DescirptionText>※ 특허청에 등록된 원본 파일을 올려주세요.</DescirptionText>
                      <AddController onlyfile type="INIT" order={0} name="addBasic" getValue={this.onAddValue} />
                    </div></Field>
                  <Field title="판매 방식 선택">
                    <RadioType
                      return={this.onHandleReturn}
                      default={this.state.additional["selling-type"]}
                      name="selling-type"
                      Options={["양도", "독점 사용권", "일반 사용권"]} /></Field>
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                  </Field>
                </React.Fragment >) : null}

              {itemType === 7 ?
                // <ItemProduct return={this.onHandleAdditional} /> 
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea id="description" onChange={this.onHandleAdditionalText}
                      value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} ></InputTextarea></Field>
                  {/* <Field title="상세 이미지">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <ThumbnailList return={this.onHandleImageList} width={650} />
                          <Context >(이미지 최대 10장 업로드 가능)</Context></div></Field> */}
                  <Field isMargin={false} isCentering={true} title="구입 비용">
                    <InputPriceNew name="price" getValue={this.getPriceValue} price={this.state.additional.price} />
                  </Field>
                </React.Fragment>)
                : null}

              {itemType === 8 ?
                (<React.Fragment>
                  <Field title="설명">
                    <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleAdditionalText} value={this.state.additional.description.replace(/<br \/>/gi, '\n')} name="description" height={60} />
                  </Field>

                  <Field title="최대 수강인원">
                    <InputNumberText width={100} onBlur={e => this.onHandleAdditionalMaxNumber(e, 1000)} onChange={e => this.onHandleAdditionalMaxNumber(e, 1000)} min="1" max="1000" name="max_students" value={this.state.additional.max_students} />&nbsp;명&nbsp;
                  </Field>

                  <Field title="수강생 모집기간">
                    <CheckBox2 onChange={async () => {
                      let copy = { ...this.state.additional };
                      copy.recruit_always = !this.state.additional.recruit_always;
                      await this.setState({ additional: copy });
                    }}
                      checked={this.state.additional.recruit_always} />&nbsp;상시모집&nbsp;&nbsp;
                      {!this.state.additional.recruit_always
                      ? <InputCalendar
                        name="calendar"
                        startDate={this.state.additional.start_date}
                        endDate={this.state.additional.end_date}
                        getStartDateValue={this.getStartDateValue}
                        getEndDateValue={this.getEndDateValue}
                        getDayDateValue={this.getDayDateValue}
                      />
                      : null}
                  </Field>

                  <Field isMargin={false} isCentering={true} title="수강료">
                    <InputPriceNew getValue={this.getPriceValue} name="price" />
                  </Field>
                </React.Fragment>)
                : null}

            </div>
          </FormBox>
        </div>) : null}

      {/* // 아이템 상세정보 입력 폼 */}
      {tab === "contents" ?

        <React.Fragment>
          {item &&
            item.headers &&
            item.headers.length > 0 &&
            item.headers.map(
              (head, index) => {
                return (<div key={index} className="row" style={{ marginBottom: "30px" }}>
                  <ItemContents>
                    <div className="header">
                      <div className="title" style={{ display: "flex" }}>
                        {itemType === 8 ?
                          <React.Fragment>
                            <input
                              className="title-input"
                              value={(this.state.listname && this.state.listname[index]) || ""}
                              onChange={e => this.onChangeListName(e, index)}
                            />
                            <button
                              className={`edit ${(this.state.listname && this.state.listname[index]) === head.name && "disabled"}`}
                              disabled={(this.state.listname && this.state.listname[index]) === head.name}
                              onClick={e => this.editGridEditorName(head, index)}>수정</button>
                            <div style={{ marginLeft: "15px", display: "flex", height: "max-content",display:"flex",alignItems:"center"}}>
                              <CheckBox2 onChange={() => this.updateListHeader(head)} checked={head.type === "practice" || head.type === "copied"} />
                              <div style={{ width: "max-content", font: "normal normal 300 13px/19px Noto Sans KR"}}>파생가능</div>
                            </div>
                          </React.Fragment>
                          : "아이템 상세내용"}
                      </div>
                    </div>
                    <div className="editor-wrapper">
                      {head.editor_type === "project"
                        ? <ItemStepContainer index={index} header={head} editor={true} /> : null}
                      {head.editor_type === "blog"
                        ? <CardSourceDetailContainer edit={true} bought={item.bought} isCancel cardId={item.cardId} /> : null}
                    </div>
                  </ItemContents>
                </div>)
              })}
          {/* {itemType === 8 ?
            <FormBox boxShadow={true} marginTop={25}>
              <div className="flexWrapBox Vcentering cursor"
                onClick={(e) => this.newGridEditorName()}>
                <Icon name="plus" size='tiny' color='red' /><div className="label">템플릿 추가</div></div>
            </FormBox> : null} */}
        </React.Fragment>
        : null
      }

      {/* 버튼 */}
      {
        itemType > -1 && tab === "basic" ?
          (<ButtonBox className="buttonBox" >
            <RedButton
              text={"수정된 내용을 저장합니다."}
              width={150} height={30} fontSize={market_style.font.size.small1}
              okText="확인"
              cancelText="취소"
              value={"저장하기"}

              onClick={this.onSubmit}
              disabled={!this.state.ismodified}
              isConfirm={true} />

            <GrayButton
              text={"수정된 내용이 저장되지 않습니다."}
              width={150} height={30} fontSize={market_style.font.size.small1}
              value={"취소하기"}
              okText="확인"
              cancelText="취소"
              onClick={this.onCancel}
              isConfirm={false} />

            {/* <RedButton onClick={this.onSubmit}>수정하기</RedButton> */}
            {/* <RedButton gray onClick={() => {
            if (window.confirm("이전페이지로 돌아가며, 작업한 모든 내용은 사라집니다.")) {
              window.history.back();
            }
          }}>취소</RedButton> */}
          </ButtonBox>) : null
      }
    </MainBox >);
  };
};
export default ModifyItemInfo;

class ItemContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], steps: [], type: "", item: null };
    this.onHandleContent = this.onHandleContent.bind(this);
    this.onHandleAdditional = this.onHandleAdditional.bind(this);
    this.returnState = this.returnState.bind(this);
    this.onHandleGrid = this.onHandleGrid.bind(this);
    this.toProject = this.toProject.bind(this);
  }
  componentDidMount() {
    this.setState({ type: this.props.type, item: this.props.item });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.additional !== this.props.additional) {
      await this.setState({ additional: this.props.additional });
    }
    if (prevProps.itemType !== this.props.itemType) {
      this.setState({ content: [], steps: [], type: "blog" });
      if (this.props.itemType === 1) {
        this.setState({ type: "project" });
      }
    }
  }
  async returnState() {
    this.props.returnState && this.props.returnState(this.state);
  }
  async onHandleContent(value) { //write content state
    await this.setState({ content: value.content });
    this.returnState();
  }
  async onHandleGrid(value) {
    await this.setState({ steps: value });
    this.returnState();
  }
  async onHandleAdditional(value) { //write additional state
    // console.log("on handle addition", value);
    await this.setState({ additional: value });
    this.returnState();
  }
  async toProject() {
    this.setState({ type: "project", content: [] });
    this.returnState();
  }

  render() {
    // const { content, steps } = this.state;
    // console.log(this.props);
    return (
      <MainBox marginBottom={50}>
        <FormBox boxShadow={true}>
          {this.state.type === "blog"
            ? <CardSourceDetailContainer
              mode="blog"
              bought={true}
              isCancel
              cardId={this.props.cardId}
              edit={this.props.edit}
            /> : null}
          {this.state.type === "project"
            ? <ItemStepContainer
              index={this.props.index}
              header={this.props.header}
              // item={item}
              // id={item.item_id}
              mode="project"
              bought={true}
              editor={this.props.edit}
            /> : null}
          {/* {this.state.type === "blog" ?
            <div className="contentWrap">
              <InputContent
                projectable={true}
                content={content}
                toProject={this.toProject}
                returnState={this.onHandleContent} />
            </div>
            :
            {
              // 로컬 그리드 에디터
            }
            <div className="contentsBox">
              <LocalGridEditor
                userInfo={this.props.userInfo}
                content={steps}
                returnContent={this.onHandleGrid}
                editor={true} />
            </div>
          } */}
        </FormBox>
      </MainBox >);
  }
};
