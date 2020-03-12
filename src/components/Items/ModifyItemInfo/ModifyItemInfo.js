import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import CheckBox2 from "components/Commons/CheckBox";
import { LocalGridEditor } from "components/GridEditor/LocalGridEditor";
import { AddController, InputContent, Controller, InputTag, RadioType } from "components/Commons/InputItem";
import SearchDesignMemberContainer from "containers/Commons/SearchMemberContainer";
import { InputPrice } from "components/Commons/InputItem/InputPrice";
import Loading from "components/Commons/Loading";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";

const ItemType = [
  { text: "디자인", value: 0 },
  { text: "프로젝트", value: 1 },
  { text: "기술자문/상담", value: 2 },
  { text: "경험", value: 3 },
  { text: "정보/데이터", value: 4 },
  { text: "아이디어/노하우", value: 5 },
  { text: "지적재산권", value: 6 },
  { text: "제작품", value: 7 }
];
const MainBox = styled.div`
  width:100%;
  margin-bottom: ${props => props.marginBottom || 0}px;
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
  padding: 15px 35px;

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
const DescirptionText = styled.div`
  font-size:13px;
  color:#707070;
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
const NaviMenu = styled.div`
  position: abolute;
  width: max-content;
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
`;
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  color: #707070;
  .textLabel {
        margin - left: 35px;
      vertical-align: top;
    }
  `;
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
      // tab: "basic",
      tab: "contents",
      alone: false,
    };
    this.onClickItemType = this.onClickItemType.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onHandleReturnedTags = this.onHandleReturnedTags.bind(this);
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.deleteThisItem = this.deleteThisItem.bind(this);
    this.onHandleAdditionalText = this.onHandleAdditionalText.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.onHandleAdditionalMember = this.onHandleAdditionalMember.bind(this);
    this.onHandleRadio = this.onHandleRadio.bind(this);
  };
  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const members = this.state.alone ? [] : this.state.additional.members
    let additional = {
      ...this.state.additional,
    };
    additional.members = members;

    const data = {
      // basic
      title: this.state.title,
      files: [{
        value: this.state.thumbnail,
        name: this.state.thumbnail_name
      }],
      tag: this.state.tag,
      category1: this.state.category_level1,
      category2: this.state.category_level2,
      itemType: this.state.itemType,
      // additional
      additional: additional, // content: this.state.content, step: this.state.steps,
      type: this.state.type,
      private: this.state.private
    };
    console.log(data);
    return;

    this.props.UpdateItemRequest(data, this.props.ItemDetail["item-id"], this.props.token)
      .then(result => {
        if (result.res.success) {
          alert("아이템이 수정 되었습니다. 아이템상세페이지로 이동합니다.");
          // this.props.GetItemDetailRequest(this.props.id, this.props.token);
          window.location.href = `/productDetail/${result.id}`
        } else {
          alert("아이템 수정을 실패하였습니다.");
        }
      })
      .catch(error => {
        alert("오류내용:" + error.message);
      });
    this.setState({ loading: false });
  };
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: value });
  };
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: value });
  };
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
    this.setState({ tag: param });
  };
  async deleteThisItem() {
    this.setState({ loading: true });
    this.props.DeleteItemRequest &&
      window.confirm("이 아이템을 삭제하시겠습니까?") &&
      await this.props.DeleteItemRequest(this.props.ItemDetail["item-id"], this.props.token)
        .then(data => {
          // console.log(data);
          if (data.res.success) {
            alert("아이템 삭제성공");
            window.location.href = `/product`;
          }
        })
    this.setState({ loading: false });
  };
  async componentDidMount() {
    const { ItemDetail } = this.props;
    const additional = await {
      description: ItemDetail.description,
      price: ItemDetail.price,
      public: ItemDetail.public,
      "contact-type": ItemDetail["contact-type"],
      "selling-type": ItemDetail["selling-type"],
      members: ItemDetail.members,
    }
    // console.log(ItemDetail, additional);
    const item = await {
      title: ItemDetail.title,
      category_level1: ItemDetail.category_level1,
      category_level2: ItemDetail.category_level2,
      tag: ItemDetail.tag,
      itemType: ItemDetail.type,
      thumbnail: ItemDetail.thumbnail.l_img,
      type: ItemDetail.upload_type,
      //
      additional: additional,
    }
    await this.setState(item);
    console.log(this.state, this.props.ItemDetail);
  };
  async onHandleAdditionalText(event) {
    let copy = { ...this.state.additional };
    copy[event.target.name] = event.target.value;
    await this.setState({ additional: copy });
  };
  async getPriceValue(value) {
    let copy = { ...this.state.additional };
    copy["price"] = value;
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
  render() {
    // uid: 93
    // user_id: 1
    // thumbnail_id: 114
    // upload_type: "blog"
    // private: 0
    // list-id: null
    // score: null
    // total: 0
    // listId: 94
    // cardId: 83
    // bought: false
    // members: [{…}]
    // success: true
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    const { /* edit, */ itemType, tab } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다."> * </span>
    // console.log(this.state, this.props);

    return (<MainBox>
      {this.state.loading ? <Loading /> : null}

      {/* 타이틀 */}
      <div className="title">아이템 수정</div>

      <NaviMenu>
        <div className={tab === "basic" ? "active" : ""} onClick={() => this.setState({ tab: "basic" })}>기본/추가정보변경</div>
        <div className={tab === "contents" ? "active" : ""} onClick={() => this.setState({ tab: "contents" })}>컨텐츠변경</div>
      </NaviMenu>

      {/* 공통/기본입력사항 */}
      {tab === "basic" ?
        (<div className="contentsBox">
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
                  <InputTag width={370} taglist={this.state.tag.toString().split(',')} getValue={this.onHandleReturnedTags} />
                </div>
              </div>

              <div className="wrapper flex">
                <div className="label">아이템 유형<span className="font_red">*</span></div>
                <div title={"(아이템 유형을 변경하실 수 없습니다.)"}>
                  {ItemType.map(itemtype => (itemtype.value === this.state.itemType && itemtype.text))}
                </div>
                {/* <DropBox selection value={this.state.itemType} options={ItemType} placeholder="아이템 유형" onChange={this.onClickItemType} /> */}
              </div>

              <div className="wrapper flex">
                <div onClick={this.deleteThisItem}
                  style={{ cursor: "default", width: "max-content", marginLeft: "auto", marginRight: "60px" }}>
                  <div style={{ textAlign: "center", fontSize: "28px", color: "red" }}>아이템삭제</div>
                </div>
              </div>
            </div>
          </FormBox>
        </div>) : null}

      {/* additional */}
      {tab === "basic" ?
        (<div className="contentsBox">
          <MainBox>
            <FormBox boxShadow={true} width={1570}>
              <div className="contentWrap">

                {itemType === 0 ?
                  //<ItemDesign return={this.onHandleAdditional} /> 
                  <React.Fragment>
                    <Field title="설명">
                      <InputTextarea
                        onChange={this.onHandleAdditionalText}
                        value={this.state.additional && this.state.additional.description || ""}
                        name="description"
                        width={483} height={99}
                      />
                    </Field>
                    <Field title="구입 비용">
                      <InputPrice
                        getValue={this.getPriceValue}
                        name="price"
                        price={this.state.additional.price / 1000}
                      />
                    </Field>
                  </React.Fragment> : null}

                {itemType === 1 ?
                  //  <ItemProject return={this.onHandleAdditional} /> 
                  <React.Fragment>
                    <Field title="설명">
                      <InputTextarea
                        onChange={this.onHandleAdditionalText}
                        value={this.state.additional && this.state.additional.description || ""}
                        name="description"
                        width={483} height={99} />
                    </Field>
                    <Field title="팀원 초대">
                      {!this.state.alone ?
                        <SearchDesignMemberContainer
                          originalMember={
                            this.state.additional && this.state.additional.members.filter(user => user.uid !== this.props.userInfo.uid) || []}
                          className="searchRect"
                          onChangeMembers={this.onHandleAdditionalMember} />
                        : null}
                      {/* LEAVE ME ALONE */}
                      <NoInviteMemberBox>
                        <CheckBox2 onChange={() => this.setState({ alone: !this.state.alone, members: [] })} checked={this.state.alone} />
                        <span className="textLabel">멤버를 초대하지 않습니다.</span>
                      </NoInviteMemberBox>
                    </Field>
                    <Field title="공개">
                      <RadioType
                        return={this.onHandleRadio}
                        default={this.state.additional.public === "yes" ? "예" : "아니오"}
                        name="public"
                        Options={["예", "아니오"]} />
                    </Field>
                    <Field title="구입 비용">
                      <InputPrice
                        getValue={this.getPriceValue}
                        name="price"
                        price={this.state.additional.price / 1000}
                      />
                    </Field>
                  </React.Fragment> : null}

                {itemType === 2 ?
                  // <ItemConsulting return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.state.description} name="description" width={483} height={99} /></Field>
                    {/* <Field title="자문/상담 방법"> 온라인 */}
                    {/* <RadioType checked={1} return={this.onHandleReturn} name="contact-method" Options={typeOnOff} /> */}
                    {/* </Field> */}
                    <Field title="내용 공개 여부">
                      <RadioType checked={1} return={this.onHandleReturn} value={this.state.public} name="public" Options={["예", "아니오"]} /></Field>
                    <Field title="자문/상담 비용">
                      <InputPrice placeholder="시간당" name="price" getValue={this.getPriceValue} price={this.state.price} />
                    </Field>
                  </React.Fragment>) : null}

                {itemType === 3 ?
                  // <ItemExperience return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.state.description} name="description" width={483} height={99} /></Field>
                    <Field title="구입 비용">
                      <InputPrice name="price" getValue={this.getPriceValue} price={this.state.price} />
                    </Field>
                  </React.Fragment>) : null}

                {itemType === 4 ?
                  // <ItemInfoData return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.state.description} name="description" width={483} height={99} /></Field>
                    <Field title="구입 비용">
                      <InputPrice name="price" getValue={this.getPriceValue} price={this.state.price} />
                      {/* <InputText onChange={this.onHandleChange} name="price" width={370} /> */}
                    </Field>
                  </React.Fragment>) : null}

                {itemType === 5 ?
                  // <ItemIdea return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.props.description} name="description" width={483} height={99} /></Field>
                    <Field title="구입 비용">
                      <InputPrice name="price" getValue={this.getPriceValue} price={this.state.price} />
                    </Field>
                  </React.Fragment>) : null}

                {itemType === 6 ?
                  // <ItemPatent return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.state.description} name="description" width={483} height={99} /></Field>
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
                      <RadioType return={this.onHandleReturn} name="selling-type" Options={["양도", "독점 사용권", "일반 사용권"]} /></Field>Î
                    <Field title="구입 비용">
                      <InputPrice name="price" getValue={this.getPriceValue} price={this.state.price} />
                    </Field>
                  </React.Fragment >) : null}

                {itemType === 7 ?
                  // <ItemProduct return={this.onHandleAdditional} /> 
                  (<React.Fragment>
                    <Field title="설명">
                      <InputTextarea onChange={this.onHandleChange} value={this.state.description} name="description" width={483} height={99} /></Field>
                    {/* <Field title="상세 이미지">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <ThumbnailList return={this.onHandleImageList} width={650} />
                          <Context >(이미지 최대 10장 업로드 가능)</Context></div></Field> */}
                    <Field title="구입 비용">
                      <InputPrice name="price" getValue={this.getPriceValue} price={this.state.price} />
                    </Field>
                  </React.Fragment>)
                  : null}

              </div>
            </FormBox>
          </MainBox>
        </div>) : null}

      {/* // 아이템 상세정보 입력 폼 */}
      {tab === "contents" ?
        (<div className="contentsBox">
          {itemType > -1 ?
            <ItemContentEditor
              item={this.props.ItemDetail}
              cardId={this.props.ItemDetail.cardId}
              edit={this.props.ItemDetail.user_id === (this.props.userInfo && this.props.userInfo.uid)}
              returnState={(obj) => {
                this.setState({
                  additional: obj.additional,
                  content: obj.content,
                  steps: obj.steps,
                  type: obj.type
                })
                // console.log(this.state);
              }}
              type={this.state.type}
              userInfo={this.props.userInfo}
            />
            : <InfoContentChooseItemType>
              아이템 유형을 선택하여 세부적인 <br />
              내용을 입력해주신 후 아이템을 등록해주세요.
            </InfoContentChooseItemType>}
        </div>) : null}

      {/* 버튼 */}
      {itemType > -1 && tab === "basic" ?
        (<div className="contentsBox" style={{ width: "max-content", marginLeft: "auto", marginRight: "25px" }}>
          <RedButton onClick={this.onSubmit}>수정</RedButton>
          {/* <RedButton gray onClick={() => {
            if (window.confirm("이전페이지로 돌아가며, 작업한 모든 내용은 사라집니다.")) {
              window.history.back();
            }
          }}>취소</RedButton> */}
        </div>) : null}
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
    const { content, steps } = this.state;
    // console.log(this.props);
    return (
      <MainBox marginBottom={75}>
        <FormBox boxShadow={true} width={1570}>
          {this.state.type === "blog"
            ? <CardSourceDetailContainer
              bought={true}
              isCancel
              cardId={this.props.cardId}
              edit={this.props.edit}
            /> : null}
          {this.state.type === "project"
            ? <ItemStepContainer
              // item={item}
              // id={item["item-id"]}
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
