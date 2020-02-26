import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import CheckBox2 from "components/Commons/CheckBox";
import noface from "source/thumbnail.png";
import { LocalGridEditor } from "components/GridEditor/LocalGridEditor";
import { AddController, InputContent, Controller, InputTag, ThumbnailList, RadioType } from "components/Commons/InputItem";
import SearchDesignMemverContainer from "containers/Commons/SearchMemberContainer";
// import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";

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
    padding: 49px 59px 49px 59px;
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
  width: ${props => props.width == null ? 100 + "%" : props.width + "px"};
  height: ${props => props.height == null ? 100 + "%" : props.height + "px"};
  background-color: white;
  font-family: Noto Sans KR;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: ${props => props.margin == null ? 0 + "px" : props.margin + "px"};
  .label{
    margin-left: 60px;
  }
`;
const InputText = styled.input`
  width: ${props => props.width == null ? 100 + "%" : props.width + "px"};
  height: 43px;
  border-radius: 20px;
  font-family: Noto Sans KR;
  font-size: 20px;
  background-color: #E9E9E9;
  margin-right: 21px;
  outline: none;
  border: 0px;
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
      // send data - basic
      category_level1: -1, category_level2: -1,
      title: "",
      thumbnail: null, thumbnail_name: null,
      tag: [], category1: null, category2: null,
      itemType: -1,
      // send data - additional
      additional: null, content: [], steps: [], type: "blog"
    };
    this.onClickItemType = this.onClickItemType.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onHandleReturnedTags = this.onHandleReturnedTags.bind(this);
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
  };
  onSubmit(event) {
    event.preventDefault();
    let data = {
      //basic
      title: this.state.title,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name }],
      tag: this.state.tag, category1: this.state.category_level1, category2: this.state.category_level2,
      itemType: this.state.itemType,
      //additional
      additional: this.state.additional, content: this.state.content, step: this.state.steps, type: this.state.type
    };

    this.props.CreateDesignRequest(data, this.props.token)
      .then(result => {
        if (result.success) {
          alert("아이템이 등록 되었습니다. 아이템상세페이지로 이동합니다.");
          window.location.href = `/productDetail/${result.id}`
        } else {
          alert("아이템이 등록에 실패하였습니다.");
        }
      })
      .catch(error => {
        alert("오류내용:" + error.message);
      });
  };
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: value });
  };
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: value });
  };
  onClickItemType(_, { value }) {
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
    this.setState({ tag: param });
  };


  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];

    const { /* edit, */ itemType } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다.">*</span>

    return (<MainBox>
      {this.props.keep ? <div>REDIRECTED</div> : null}
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
              <InputText width={370} name="title" value={this.state.title || ""} onChange={this.onChangeValue} />
            </div>

            <div className="wrapper flex ">
              <div className="label">카테고리<Mandatory /></div>
              <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
              <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
            </div>

            <div className="wrapper flex">
              <div className="label">태그</div>
              <div>
                <InputTag width={370} getValue={this.onHandleReturnedTags} />
              </div>
            </div>

            <div className="wrapper flex">
              <div className="label">아이템 유형<span className="font_red">*</span></div>
              <DropBox selection options={ItemType} placeholder="아이템 유형" onChange={this.onClickItemType} />
            </div>

          </div>
        </FormBox>

      </div>

      {/* 아이템 상세정보 입력 폼 */}
      <div className="contentsBox">
        {itemType > -1 ?
          <ItemTypeForm
            returnState={obj => this.setState({ additional: obj.additional, content: obj.content, steps: obj.steps })}
            itemType={this.state.itemType}
            userInfo={this.props.userInfo}
          />
          : <InfoContentChooseItemType>
            아이템 유형을 선택하여 세부적인 <br />
            내용을 입력해주신 후 아이템을 등록해주세요.</InfoContentChooseItemType>}
      </div>

      {/* 버튼 */}
      {itemType > -1 ? (
        <div className="contentsBox">
          {this.props.keep ?
            <Link to={{
              pathname: `/createdesigner/redirected`, state: {
                keep: {
                  designer: this.props.keep,
                  item: {
                    //basic
                    title: this.state.title, type: "item",
                    files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name }],
                    tag: this.state.tag, category1: this.state.category1, category2: this.state.category2,
                    itemType: this.state.itemType,
                    //additional
                    additional: this.state.additional, content: this.state.content, step: this.state.steps
                  }
                }
              }
            }}>
              <RedButton>디자인 등록 계속하기</RedButton>
            </Link>
            : <RedButton onClick={this.onSubmit}>아이템 등록</RedButton>}
          <RedButton gray onClick={() => {
            if (window.confirm("이전페이지로 돌아가며, 작업한 모든 내용은 사라집니다.")) {
              window.history.back();
            }
          }}>취소</RedButton>
        </div>
      ) : null}
    </MainBox>);
  };
}
export default CreateProductForm;


class ItemTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { additional: null, content: [], steps: [], type: "blog" };
    this.onHandleContent = this.onHandleContent.bind(this);
    this.onHandleAdditional = this.onHandleAdditional.bind(this);
    this.returnState = this.returnState.bind(this);
    this.onHandleGrid = this.onHandleGrid.bind(this);
    this.toProject = this.toProject.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.itemType !== this.props.itemType) {
      this.setState({ additional: null, content: [], steps: [], type: "blog" });
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
    await this.setState({ additional: value });
    this.returnState();
  }
  async toProject() {
    this.setState({ type: "project" });
    this.returnState();
  }

  render() {
    const itemType = this.props.itemType == null ? -1 : parseInt(this.props.itemType, 10);
    const { additional, content, steps } = this.state;

    return (
      <MainBox>
        <FormBox boxShadow={true} width={1570}>
          <div className="contentWrap">
            {itemType === 0 ? <ItemDesign return={this.onHandleAdditional} /> : null}
            {itemType === 1 ? <ItemProject return={this.onHandleAdditional} /> : null}
            {itemType === 2 ? <ItemConsulting return={this.onHandleAdditional} /> : null}
            {itemType === 3 ? <ItemExperience return={this.onHandleAdditional} /> : null}
            {itemType === 4 ? <ItemInfoData return={this.onHandleAdditional} /> : null}
            {itemType === 5 ? <ItemIdea return={this.onHandleAdditional} /> : null}
            {itemType === 6 ? <ItemPatent return={this.onHandleAdditional} /> : null}
            {itemType === 7 ? <ItemProduct return={this.onHandleAdditional} /> : null}

          </div>
        </FormBox>

        <FormBox boxShadow={true} width={1570}>
          {this.state.type === "blog" ?
            <div className="contentWrap">
              <InputContent
                content={content}
                toProject={this.toProject}
                returnState={this.onHandleContent} />
            </div>
            :
            // {/* 로컬 그리드 에디터 - */}
            <div className="contentsBox">
              <LocalGridEditor
                userInfo={this.props.userInfo}
                content={steps}
                returnContent={this.onHandleGrid}
                editor={true} />
            </div>
          }

        </FormBox>

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
    this.state = { description: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
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
        <Field title="가격">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
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
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  color: #707070;
  .textLabel {
    margin-left: 35px;
    vertical-align: top;
  }
`;
const PeerBox = styled.div`
  display: flex;
  margin-right: 25px;
  margin-bottom: 10px;
  .nameLabel{
    width: 112px;
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
function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={props.s_img} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton"><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
    </PeerBox>
  );
};

class ItemProject extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", members: [], price: 0, alone: false }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleReturn(name, value) {
    await this.setState({ [name]: value });
    this.returnState();
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }

  render() {
    const types = ["예", "아니오"];
    return (
      <React.Fragment>
        <Field title="프로젝트 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="팀원 초대">
          {this.state.alone ? undefined : <SearchDesignMemverContainer className="searchRect" addMember={mem => this.setState({ members: [] })} />}
          {/* <SearchDesignMemverContainer className="searchRect" addMember={() => this.setState({ members: [] })} /> */}
          <div>
            {/* INVITED MEMBER */}
            <InviteMemberListBox>
              <div className="memberList">{
                (this.state.members.length > 0) ?
                  this.state.members.map((item, index) =>
                    <div onClick={() => this.removeMember(item.user_id)} key={index}>
                      <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
                    </div>) : null}</div>
            </InviteMemberListBox>

            {/* LEAVE ME ALONE */}
            <NoInviteMemberBox>
              <CheckBox2 onChange={() => this.setState({ alone: !this.state.alone, members: [] })} checked={this.state.alone} />
              <span className="textLabel">멤버를 초대하지 않습니다.</span>
            </NoInviteMemberBox>
          </div>
          {/* <InputText onChange={this.onHandleChange} name="members" width={370} /> */}
        </Field>
        <Field title="공개">
          <RadioType return={this.onHandleReturn} name="type" Options={types} /></Field>
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
          <RadioType return={this.onHandleReturn} name="contact-method" Options={typeOnOff} /></Field>
        <Field title="내용 공개 여부">
          <RadioType return={this.onHandleReturn} name="public" Options={typeTF} /></Field>
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
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }

  render() {

    return (
      <React.Fragment>
        <Field title="경험 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="자문/상담 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemInfoData extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }

  render() {
    return (
      <React.Fragment>
        <Field title="정보/데이터에 관한 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemIdea extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  render() {
    return (
      <React.Fragment>
        <Field title="아이디어/노하우에 관한 설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>
        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>
      </React.Fragment>)
  }
};
class ItemPatent extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], description: "", price: 0 };
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
  async onHandleReturn(name, value) {
    await this.setState({ [name]: value });
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
          <RadioType return={this.onHandleReturn} name="selling-type" Options={kinds} /></Field>

        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>

      </React.Fragment >)
  }
};
const Context = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
class ItemProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], imageList: [], description: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
    this.onHandleImageList = this.onHandleImageList.bind(this);
  };
  returnState() {
    this.props.return && this.props.return(this.state);
  };
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  };
  async onHandleReturn(name, value) {
    await this.setState({ [name]: value });
    this.returnState();
  };
  async onHandleImageList(value) {
    await this.setState({ imageList: value.imageList });
    this.returnState();
  }
  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea onChange={this.onHandleChange} name="description" width={483} height={99} /></Field>

        <Field title="상세 이미지">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ThumbnailList return={this.onHandleImageList} width={650} />
            <Context >(이미지 최대 10장 업로드 가능)</Context></div></Field>

        <Field title="구입 비용">
          <InputText onChange={this.onHandleChange} name="price" width={370} /></Field>

      </React.Fragment>)
  }
};

