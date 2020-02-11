import React, { Component } from "react";
import styled from 'styled-components';
import { Dropdown } from "semantic-ui-react";
import { InputTag } from "components/Commons/InputItem/InputTag";
import { ThumbnailList } from "components/Commons/InputItem/ThumbnailList";
import { UploadType } from "components/Commons/InputItem/UploadType";
import { AddController } from "components/Commons/InputItem/AddController";
import { Controller } from "components/Commons/InputItem/Controller";

const FirstCategory = [
  { text: "패션", value: 0 },
  { text: "제품", value: 1 },
  { text: "커뮤니케이션", value: 2 },
  { text: "공간", value: 3 },
  { text: "엔터테인먼트", value: 4 },
  { text: "소프트웨어", value: 5 },
  { text: "새분야", value: 6 }];
const SecondCategory =
  [[{ text: "스마트패션", value: 0 }, { text: "의상", value: 1 }, { text: "엑세서리", value: 2 }, { text: "패션모듈", value: 3 }],
  [{ text: "스마트카", value: 0 }, { text: "로봇", value: 1 }, { text: "기계/기기/기구", value: 2 }, { text: "센서모듈", value: 3 }, { text: "공예", value: 4 }],
  [{ text: "UI/UX", value: 0 }, { text: "광고", value: 1 }, { text: "웹", value: 2 }, { text: "영상", value: 3 }, { text: "타이포그래피", value: 4 }],
  [{ text: "스마트시티", value: 0 }, { text: "건축", value: 1 }, { text: "인테리어", value: 2 }, { text: "환경", value: 3 }],
  [{ text: "스마트미디어", value: 0 }, { text: "게임", value: 1 }, { text: "디지털컨텐츠", value: 2 }, { text: "서비스", value: 3 }],
  [{ text: "인공지능", value: 0 }, { text: "빅데이터", value: 1 }, { text: "시스템SW", value: 2 }, { text: "응용SW", value: 3 }],
  [{ text: "새분야", value: 0 }]];
const EmptyCategory = [{ text: "", value: -1 }];
const ItemType = [
  { text: "디자인", value: 0 },
  { text: "프로젝트", value: 1 },
  { text: "기술자문/상담", value: 2 },
  { text: "경험", value: 3 },
  { text: "정보/데이터", value: 4 },
  { text: "아이디어/노하우", value: 5 },
  { text: "특허권", value: 6 },
  { text: "제품", value: 7 }];

const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
  .contentsBox{
    width:100%;
    display:flex;
    padding-left:130px;
    padding-top:36px;
  }
  .font_red {
    width: 7px;
    height: 7px;
    color: #FF0000;
    cursor: default;
  }
`;
const RedButton = styled.div`
  width: 290px;
  height: 70px;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.gray ? "gray" : "red"};
  // position: absolute;
  // left:${props => props.left};
  // bottom:${props => props.bottom};
`;
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width: 562px;
  height: max-content;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-top: 54px;
  margin-right: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .label{
    width:100%;
    height:29px;
    padding-left:42px;

  }
  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:20px;
  }
`;
const Thumbnail = styled.div`
  width: ${props => props.width == null ? 100 : props.width}px;
  height: ${props => props.height == null ? 100 : props.height}px;
  margin-bottom: ${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  background: #E9E9E9;
  border: ${props => props.img ? "1px solid #E9E9E9" : "none"};
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormBox = styled.div`
  *{
    font-family: Noto Sans KR;
    font-weight: 500;
    font-size: 20px;
  }
  width:${props => props.width || 939}px;
  height:${props => props.height || "max-content"};
  box-shadow: ${props => props.boxShadow == null ? "" : "5px 5px 10px #00000029"};
  border-radius: 20px;
  
  .contentWrap{
    border-radius: 20px;
    padding-left:59px;
    padding-right:59px;
    padding-top:49px;
  }
  .wrapper{
    width:100%;
    margin-bottom:50px;
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
    min-width:157px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
`;
const Button = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  background-color:white;
  font-family:Noto Sans KR;
  font-size:20px;
  display:flex;
  align-items:center;
  margin-left:${props => props.margin == null ? 0 + "px" : props.margin + "px"};
  .label{
    margin-left:60px;
  }
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;

`;
const DropBox = styled(Dropdown)`
  min-width:200px !important;
  background-color: #E9E9E9 !important;
  margin-right: 10px;
  border-radius: 20px !important;
`;
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const HRLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: #E9E9E9;
  margin-top: 35px;
  margin-bottom: 35px;
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
  font-size: 24px;
  color: #707070;
`;
class CreateProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // local
      firstCategory: 0, secondCategory: -1,
      // send data - basic
      title: null,
      thumbnail: null, thumbnail_name: null,
      tag: [], category1: null, category2: null,
      itemType: -1,
      // send data - additional
      additional: null
    };
    this.onClickFirstCategory = this.onClickFirstCategory.bind(this);
    this.onClickItemType = this.onClickItemType.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };
  success = () => 1070;
  onSubmit(event) {
    event.preventDefault();
    let data = { ...this.state };
    delete data.firstCategory;
    delete data.secondCategory;
    console.log(data);
    // window.location.href = `/productDetail/${this.success()}`;
  }
  onClickFirstCategory(event, { value }) {
    this.setState({ firstCategory: { value }.value });
  };
  onClickItemType(event, { value }) {
    this.setState({ itemType: { value }.value, additional: null });
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
  }
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


  render() {
    const { /*edit, */itemType } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다.">*</span>

    return (<MainBox>
      {/* 타이틀 */}
      <div className="title">아이템 등록하기</div>

      {/* 공통/기본입력사항 */}
      <div className="contentsBox">
        <ThumbnailBox>
          <div className="label">썸네일 이미지 등록<Mandatory /></div>
          <Margin height={50} />
          <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/*" />
          <label htmlFor="file">
            <Thumbnail img={this.state.thumbnail} width={334} height={334}>
              {this.state.thumbnail ? null : <div>첨부하기</div>}
            </Thumbnail>
          </label>
          <Margin height={75} />
        </ThumbnailBox>
        <FormBox height="550px" boxShadow={true}>
          <div className="contentWrap">
            <div className="wrapper flex">
              <div className="label">아이템명<Mandatory /></div>
              <InputText width={370} />
            </div>

            <div className="wrapper flex ">
              <div className="label">카테고리<Mandatory /></div>
              <DropBox id="firstCategory" selection options={FirstCategory} placeholder="대분류" onChange={this.onClickFirstCategory} />
              <DropBox id="secondCategory" selection placeholder="소분류"
                options={this.state.firstCategory > -1 ? SecondCategory[this.state.firstCategory] : EmptyCategory} />
            </div>

            <div className="wrapper flex">
              <div className="label">태그</div>
              <div>
                <InputTag width={370} />
              </div>
            </div>

            <div className="wrapper flex">
              <div className="label">아이템 유형<span className="font_red">*</span></div>
              <DropBox selection options={ItemType} placeholder="아이템 유형" onChange={this.onClickItemType} />
            </div>
            {/* <HRLine /> */}
          </div>
        </FormBox>
      </div>

      {/* 아이템 상세정보 입력 폼 */}
      {itemType > -1 ? (
        <ItemTypeForm returnState={obj => this.setState({ additional: obj.additional })} itemType={this.state.itemType} />
      ) : (<InfoContentChooseItemType>아이템 유형을 선택하여 세부적인 <br />내용을 입력해주신 후 아이템을 등록해주세요.</InfoContentChooseItemType>)}
      {/* // <div className="contentsBox">
          // <FormBox boxShadow={true} width="760px" >
            // <div className="contentWrap">
            // </div>
          // </FormBox>
        // </div> */}
      {/* 버튼 */}
      {itemType > -1 ? (
        <div className="contentsBox">
          <RedButton onClick={this.onSubmit}>아이템 등록</RedButton><RedButton gray onClick={() => alert("canceled!")}>취소</RedButton>
        </div>
      ) : null}
    </MainBox>);
  };
}

export default CreateProductForm;


class ItemTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { additional: null, content: [] };
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.itemType !== this.props.itemType)
      this.setState({ additional: null, content: [] });
  }
  returnState() {
    this.props.returnState && this.props.returnState(this.state);
  }
  async onHandleReturn(value) {
    await this.setState({ additional: value });
    this.returnState();
  }
  async onAddValue(data) {
    let copyContent = [...this.state.content];
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
    await this.setState({ content: newContent });
  };
  render() {
    const itemType = this.props.itemType == null ? -1 : parseInt(this.props.itemType, 10);
    const { additional, content } = this.state;
    return (
      <MainBox>

        <div className="contentsBox">
          <FormBox boxShadow={true}>
            {itemType === 0 ? <ItemDesign return={this.onHandleReturn} /> : null}
            {itemType === 1 ? <ItemProject return={this.onHandleReturn} /> : null}
            {itemType === 2 ? <ItemConsulting return={this.onHandleReturn} /> : null}
            {itemType === 3 ? <ItemExperience return={this.onHandleReturn} /> : null}
            {itemType === 4 ? <ItemInfoData return={this.onHandleReturn} /> : null}
            {itemType === 5 ? <ItemIdea return={this.onHandleReturn} /> : null}
            {itemType === 6 ? <ItemPatent return={this.onHandleReturn} /> : null}
            {itemType === 7 ? <ItemProduct return={this.onHandleReturn} /> : null}
          </FormBox>
        </div>

        <div className="contentsBox">
          <FormBox boxShadow={true} width="760px">&nbsp;

            {itemType === 1 ? // 프로젝트 아이템일 경우 바로 프로젝트형을 출력한다!

              <React.Fragment>project !!!!!</React.Fragment>

              : additional ? // 그 외 아이템인 경우 유저의 선택에 따라 블로그형/프로젝트형을 출력한다.
                <React.Fragment>
                  <div className="contentWrap">
                    {additional.uploadType === "블로그형" ?
                      <React.Fragment>
                        {content.length > 0 && content.map((item, index) =>
                          <Controller key={index} type={item.type} item={item} order={index} deleteItem={this.deleteItem} name={`content${index}`} getValue={this.onChangValue} />)}
                        <AddController type="INIT" order={content.length > 0 ? content.length : 0} name="addBasic" getValue={this.onAddValue} />
                      </React.Fragment>

                      : <React.Fragment>project !!!!!</React.Fragment>}
                  </div>
                </React.Fragment> : null
            }
          </FormBox>
        </div>

      </MainBox >);
  }
};
class Field extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="wrapper flex">
        <div className="label">{title}</div>
        {this.props.children}
      </div>)
  }
};
class ItemDesign extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", uploadType: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }
  render() {
    const types = ["블로그형", "프로젝트형"];
    return (
      <React.Fragment>
        <Field title="디자인 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="업로드 유형">
          <UploadType name="type" return={this.onHandleReturn} Options={types} /></Field>
        <Field title="가격">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemProject extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", members: [], uploadType: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }

  render() {
    const types = ["예", "아니오"];
    return (
      <React.Fragment>
        <Field title="프로젝트 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="팀원 초대">
          <InputText onChange={this.onHandleChange} name="members" width={370} /></Field>
        <Field title="공개">
          <UploadType return={this.onHandleReturn} name="type" Options={types} /></Field>
        <Field title="가격">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemConsulting extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", contactMedthod: "", public: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(name, value) {
    await this.setState({ [name]: value });
    this.returnState();
  }

  render() {
    const typeTF = ["예", "아니오"];
    const typeOnOff = ["온라인", "오프라인"];

    return (
      <React.Fragment>
        <Field title="자문/상담 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="자문/상담 방법">
          <UploadType return={(value) => this.onHandleReturn("contactMethod", value)} name="contactMethod" Options={typeOnOff} /></Field>
        <Field title="내용 공개 여부">
          <UploadType return={(value) => this.onHandleReturn("pulic", value)} name="public" Options={typeTF} /></Field>
        <Field title="자문/상담 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemExperience extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }

  render() {
    const type = ["블로그형", "프로젝트형"];

    return (
      <React.Fragment>
        <Field title="경험 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="업로드 유형">
          <UploadType return={this.onHandleReturn} name="uploadType" Options={type} /></Field>
        <Field title="자문/상담 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemInfoData extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", uploadType: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }

  render() {
    const type = ["블로그형", "프로젝트형"];

    return (
      <React.Fragment>
        <Field title="정보/데이터에 관한 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="업로드 유형">
          <UploadType return={this.onHandleReturn} name="uploadType" Options={type} /></Field>
        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemIdea extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", uploadType: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }

  render() {
    const type = ["블로그형", "프로젝트형"];

    return (
      <React.Fragment>
        <Field title="아이디어/노하우에 관한 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="업로드 유형">
          <UploadType return={this.onHandleReturn} name="uploadType" Options={type} /></Field>
        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemPatent extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], description: "", uploadType: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }
  async onAddValue(data) {
    let copyContent = [...this.state.content];
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
    await this.setState({ content: newContent });
  };
  render() {
    const kinds = ["양도", "독점 사용권", "일반 사용권"];
    const { content } = this.state;
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>

        <Field title="내용">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {content.length > 0 &&
              content.map((item, index) =>
                <Controller key={index} type={item.type} item={item} order={index}
                  deleteItem={this.deleteItem} name={`content${index}`} getValue={this.onChangValue} />)}
            <AddController onlyfile type="INIT" order={0} name="addBasic" getValue={this.onAddValue} />
          </div></Field>

        <Field title="판매 방식 선택">
          <UploadType return={this.onHandleReturn} name="uploadType" Options={kinds} /></Field>

        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>

      </React.Fragment >)
  }
};

class ItemProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], description: "", uploadType: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async onHandleReturn(value) {
    await this.setState({ uploadType: value });
    this.returnState();
  }

  render() {
    const type = ["블로그형", "프로젝트형"];
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>

        <Field title="업로드 유형">
          <UploadType return={this.onHandleReturn} name="uploadType" Options={type} /></Field>

        <Field title="내용">
          <ThumbnailList />
        </Field>

        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>

      </React.Fragment>)
  }
};

