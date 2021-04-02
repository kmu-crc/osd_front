import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import CheckBox2 from "components/Commons/CheckBox";
import { LocalGridEditor } from "components/GridEditor/LocalGridEditor";
import { AddController, InputContent, Controller, InputTag, /*ThumbnailList,*/ RadioType } from "components/Commons/InputItem";
import SearchDesignMemberContainer from "containers/Commons/SearchMemberContainer";
import { InputPriceNew } from "components/Commons/InputItem/InputPriceNew";
import Loading from "components/Commons/Loading";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import templateImgDesign from "source/template-image-design.png";
import templateImgSofware from "source/template-image-software.png";
import templateImgEngineering from "source/template-image-engineering.png";
import templateImgEmpty from "source/template-image-empty.png";
import { StepCard, CreateStep, CreateCard, } from "components/GridEditor";
import arrow from "source/arrow.svg";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";


const fashion = [
  { order: 0, title: "Ideation" },
  { order: 1, title: "Purpose" },
  { order: 2, title: "Design" },
  { order: 3, title: "Mock-up" },
  { order: 4, title: "Establish" },
];
const software = [
  { order: 0, title: "기획" },
  { order: 1, title: "요구사항 분석" },
  { order: 2, title: "소프트웨어 설계" },
  { order: 3, title: "시스템 구현" },
  { order: 4, title: "시스템 테스트 및 평가" },
];
const engineering = [
  { order: 0, title: "기획" },
  { order: 1, title: "시스템 분석" },
  { order: 2, title: "시스템 설계" },
  { order: 3, title: "시스템 구현" },
  { order: 4, title: "시스템 테스트 및 평가" },
];

const EditorContainer = styled.div`
    padding-top: ${props => props.mobile ? 0 : 35}px;
    .steps {
        display: flex;
    }
    .step {
        margin-right: 10px;
    }
    .create-step {
        width: max-content;
    }
`;
const EditorWrapperMobile = styled.div`
    margin-top: 10px;
    padding-bottom: 5px;
    width: 100%;

    .step-wrapper {
        width: max-content;
        margin: auto;
        position: relative;
        display: flex;
        flex-direction: row;

        .more-button {
          position: absolute;
          right: -50px;
        }
        .more-menu {
          position: absolute;
          border: 2px solid #707070;
          border-radius: 5px;
          box-shadow: 2.5px 2.5px #EFEFEF;
          background-color: white;
          width: 150px;
          right: -50px;
          top: 30px;
          display: none;
          ul {
            text-align: center;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          li {
              padding: 10px;
              font-size: 1rem;
              color: #707070;
              font-weight: 500;
          }
          &.active {
            display: block;
          }
        }
    }
    .navigation {
        position: relative;
        .normal {
            position: absolute;
            top: 50px;
        }
        .left {
            left: 5px;
        }
        .right {
            right: 5px;
        }
    }
    .cards-wrapper {
        width: max-content;
        margin: auto;
        .card {
            margin: 15px;
        }
    }
`;
const Arrow = styled.div`
    width: 17px;
    height: 48px;
    z-index: 831;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    cursor:pointer;

    :hover{
        opacity: 1;
    }
`;
const AsBelowArrow = styled.div`;
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    margin-bottom: ${props => props.marginBottom + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 65}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: ${props => props.opacity};
    border-top: ${props => props.percent * 65}px solid ${props => props.color || "#707070"};
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;
class TemplateGridEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { steps: [], step: 0 };
    this.getTempTemplate = this.getTempTemplate.bind(this);
    this.changeStep = this.changeStep.bind(this);
  };
  componentDidMount() {
    // this.getAllTemplate();
    this.getTempTemplate();
  }
  // navigation
  changeStep(offset) {
    this.setState({ step: this.state.step + offset, });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.reset !== this.props.reset) {
      this.setState({ steps: this.props.steps });
    }
    if (this.props.type !== prevProps.type) {
      await this.getTempTemplate();
    }
  }
  getTempTemplate = async () => {
    const { type } = this.props;
    if (type === "empty") {
      await this.setState({ steps: [] });
      this.props.selected && this.props.selected(this.state.steps);
    } else if (type === "fashion") {
      await this.setState({ steps: fashion });
      this.props.selected && this.props.selected(this.state.steps);
    } else if (type === "engineering") {
      await this.setState({ steps: engineering });
      this.props.selected && this.props.selected(this.state.steps);
    } else if (type === "software") {
      await this.setState({ steps: software });
      this.props.selected && this.props.selected(this.state.steps);
    }
  }

  render() {
    const { mobile } = this.props;
    const { steps, step } = this.state;

    return (<EditorContainer mobile={mobile}>
      {mobile
        ?
        <EditorWrapperMobile>
          {/* step */}
          <div className="step-wrapper">
            {step === steps.length ?
              <CreateStep />
              :
              <StepCard
                title={(steps && steps[step].title) || "제목없음"}
                marginTop={0} marginLeft={0} marginBottom={10} marginRight={0}
              />}
          </div>

          {/* navigation */}
          <div className="navigation">
            {step > 0
              ? <div className="normal left">
                <Arrow angle="0deg" onClick={() => this.changeStep(-1)} />
              </div> : null}
            {step < steps.length - 1 //(steps && steps.length || 0)
              ? <div className="normal right">
                <Arrow angle="180deg" onClick={() => this.changeStep(+1)} />
              </div> : null}
          </div>

          {/* cards */}
          <div id="cards-wrapper" className="cards-wrapper">
            <div className="card">
              <CreateCard
                title={""} step={"카드 "}
                marginTop={0} marginRight={0} marginBottom={0} marginLeft={0} />
            </div>
          </div>
        </EditorWrapperMobile>
        :
        <div className="steps">
          {(steps && steps.length > 0)
            ? steps.map((step, index) =>
              <div key={step + index} className="step">
                <StepCard title={step.title} />
                <AsBelowArrow angle={0} percent={.25} marginTop={10} marginRight={0} marginBottom={10} marginLeft={85} />
                <CreateCard />
              </div>)
            : null
          }
          <div className="create-step">
            <CreateStep />
          </div>
        </div>}

    </EditorContainer>);
  }
}

const template = [
  { type: "empty", text: "빈 템플릿", img: templateImgEmpty },
  { type: "fashion", text: "일반디자인 템플릿", img: templateImgDesign },
  { type: "engineering", text: "공학디자인 템플릿", img: templateImgEngineering },
  { type: "software", text: "소프트웨어디자인 템플릿", img: templateImgSofware },
];
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
const DesignElement = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  cursor: pointer;
  color: white;
  font-size:${market_style.font.size.normal3};
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
      font-size:${market_style.font.size.normal3};
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
      font-size:${market_style.font.size.small3};
      font-family: Noto Sans KR;
      text-shadow:2px 2px 6px gray;
      line-height: 25px;
      text-align: right;
      // cursor: default;
    }
    .user-name {
      font-size:${market_style.font.size.normal3};
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
    font-size:${market_style.font.size.small1};
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
    // cursor: defㅅault;
  }
`;
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
    padding-right:30px;
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
`;
const Thumbnail = styled.div`
  width: ${props => props.width == null ? "230px" : props.width+"px"};
  height: ${props => props.height == null ? "230px" : props.height+"px"};
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
  width:${props => props.width != null ? props.width+"px" : "100%"};
  height:${props => props.height != null ? props.height+"px" : "max-content"};
  box-shadow: ${props => props.boxShadow == null ? "" : "5px 5px 10px #00000029"};
  margin-top: ${props => props.marginTop || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  border-radius: 20px;
  padding: ${props=>props.padding==null?"30px 50px":props.padding};
  border:1px solid #eaeaea;
  .FormBoxScroll{
    padding:0px 15px 0px 0px;
    width:100%;
    height:100%;
    overflow-Y:auto;
    overflow-X:hidden;
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
    .icon{
      width:max-content !important;
      height:max-content !important;
      padding:6px !important;
    }
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
  font-size:${market_style.font.size.normal3};
  color: #707070;
`;
const EditorWrapper = styled.div`
  .title {
    width: 100%;
    text-align:center;
    color: #707070;
    font-size:${market_style.font.size.normal1};
    font-weight: 300;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  .editor{
    opacity: .75;
    overflow: auto;
  }
`;
const ResetButtonWrapper = styled.div`
  width: max-content;
  margin-left: auto;
  color: #707070;
  font-size:${market_style.font.size.small1};
  cursor: pointer;
  margin-bottom: 10px;
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
      additional: null, content: [], steps: [], type: "blog", private: 0,
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
    this.setState({ loading: true });
    let data = {
      // basic
      title: this.state.title,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name }],
      tag: this.state.tag, category1: this.state.category_level1, category2: this.state.category_level2,
      itemType: this.state.itemType,
      // additional
      additional: this.state.additional, content: this.state.content, step: this.state.steps,
      type: this.state.type, private: this.state.private
    };
    // console.log("sent:", data);
    // return;
    data.additional.description = data.additional.description.replace(/(?:\r\n|\r|\n)/g,'<br />');

    this.props.CreateDesignRequest(data, this.props.token)
      .then(async result => {
        this.setState({ loading: false });
        if (result.success) {
          // await alert("아이템이 등록 되었습니다. 아이템상세페이지로 이동합니다.");
          window.location.href = `/productDetail/${result.id}`
        } else {
          await alert("아이템이 등록에 실패하였습니다.");
        }
      })
      .catch(async error => {
        await alert("오류내용:" + error.message);
      });
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


  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];

    const { /* edit, */ itemType } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다.">*</span>

    return (<MainBox>
      {this.state.loading ? <Loading /> : null}
      {this.props.keep ? <div>REDIRECTED</div> : null}
      {/* 타이틀 */}
      <div className="title">아이템 등록</div>

      {/* 공통/기본입력사항 */}
      <div className="contentsBox centering">
        <ThumbnailBox>
          <div className="label">썸네일 이미지 등록<Mandatory /></div>
          <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" accept="image/*" />
          <label htmlFor="file">
            <Thumbnail img={this.state.thumbnail}>
              {this.state.thumbnail ? null : <div>첨부</div>}
            </Thumbnail>
          </label>
        </ThumbnailBox>

        <FormBox height={302} marginBottom={20} boxShadow={true}>
          <div className="FormBoxScroll">
            <div className="wrapper margin_bottom flex">
              <div className="label">제목<Mandatory /></div>
              <InputText placeholder="제목을 입력하세요" width={330} name="title" value={this.state.title || ""} onChange={this.onChangeValue} />
            </div>

            <div className="wrapper margin_bottom flex ">
              <div className="label">카테고리<Mandatory /></div>
              <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
              <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
            </div>

            <div className="wrapper margin_bottom flex">
              <div className="label">태그</div>
              <div className="maxWidth">
                <InputTag placeholder="태그를 입력하고 [enter]키를 누르세요" width={330} getValue={this.onHandleReturnedTags} />
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
      <div className="contentsBox centering">
        {itemType > -1 ?
          <ItemTypeForm
            returnState={obj => this.setState({ additional: obj.additional, content: obj.content, steps: obj.steps, type: obj.type })}
            itemType={this.state.itemType}
            userInfo={this.props.userInfo}
          />
          : <InfoContentChooseItemType>
            아이템 유형을 선택하여 세부적인 <br />
            내용을 입력해주신 후 아이템을 등록해주세요.</InfoContentChooseItemType>}
      </div>

      {/* 버튼 */}
      {itemType > -1 ? (
        <div className="contentsBox centering marginTop">
          {this.props.keep ?
            <Link to={{
              pathname: `/createdesigner/redirected`, state: {
                keep: {
                  designer: this.props.keep,
                  item: {
                    // basic
                    title: this.state.title,
                    files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name }],
                    tag: this.state.tag, category1: this.state.category_level1, category2: this.state.category_level2,
                    itemType: this.state.itemType,
                    // additional
                    additional: this.state.additional, content: this.state.content, step: this.state.steps,
                    type: this.state.type, private: this.state.private
                  }
                }
              }
            }}>
              <RedButton width={150} height={30} fontSize={market_style.font.size.small1} value={"디자인 등록 계속"} isConfirm={false} />
            </Link>
            : <RedButton width={150} height={30} fontSize={market_style.font.size.small1} text="아이템을 등록합니다." okText="확인" cancelText="취소" value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
          }
          <GrayButton width={150} height={30} fontSize={market_style.font.size.small1} text={"취소하시겠습니까?"} value={"취소하기"} onClick={async() => {
            if (await confirm("이전페이지로 돌아가며, 작업한 모든 내용은 사라집니다.")) {
              window.history.back();
            }
          }}>취소하기</GrayButton>
        </div>
      ) : null}
    </MainBox>);
  };
}
export default CreateProductForm;

const DesignTemplateSelector = styled.div`
  .title {
    width:100%;
    text-align:center;
    color: #707070;
    font-weight: 300;
    font-size:${market_style.font.size.normal1};
    margin-bottom: 15px;
  }
  .template-wrapper {
    display: flex;
    overflow: auto;
  }
  .element {
    min-width: 150px;
    margin: 5px;
    border: 2px solid #EFEFEF;
    padding: 5px;
    :hover{
      border: 2px solid #777777;
    }
  }
`;
class ItemTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { reset: 0, additional: null, content: [], steps: [], type: this.props.itemType === 1 ? "project" : "blog", template: null };
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
    this.setState({ type: "project", content: [] });
    this.returnState();
  }

  render() {
    const itemType = this.props.itemType == null ? -1 : parseInt(this.props.itemType, 10);
    const {/* additional, */content, steps } = this.state;
    // console.log(this.state, this.props);

    return (
        <React.Fragment>
        <div style={{width:"100%"}}>
        <FormBox boxShadow={true}>
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

        <FormBox padding={"10px 50px 16px 50px"} boxShadow={true} marginTop={20}>
          <ResetButtonWrapper
            onClick={async () => {
              await this.setState({
                additional: null,
                content: [],
                steps: [],
                type: this.props.itemType === 1 ? "project" : "blog",
                template: null,
                is_project: 0,
                reset: (++this.state.reset) % 10,
              });
              this.returnState();
            }}>
            <i className="undo icon" />
            작업 취소
          </ResetButtonWrapper>
          {this.state.type === "blog" ?
            // <div className="contentWrap">
            <InputContent
              reset={this.state.reset}
              projectable={true}
              content={content}
              toProject={this.toProject}
              returnState={this.onHandleContent} />
            // </div>
            :
            // {/* 로컬 그리드 에디터 - */}
            <React.Fragment>
              <div className="contentsBox centering">
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
                          onClick={
                            async () => {
                              await this.setState({ template: item.type })
                            }}>
                          {item.text}
                          <DesignElement ><img alt="" src={item.img} /></DesignElement>
                        </label>
                      )}
                  </div>
                </DesignTemplateSelector>
                {/* 
                  <LocalGridEditor
                    userInfo={this.props.userInfo}
                    content={steps}
                    returnContent={this.onHandleGrid}
                    editor={true} />
                */}
              </div>
              <div className="contentsBox centering">
                <EditorWrapper>
                  <div className="editor">
                    <TemplateGridEditor
                      reset={this.state.reset}
                      selected={
                        content => {
                          this.setState({ steps: content, type: "project", is_project: 1 });
                          this.returnState();
                        }}
                      type={this.state.template} />
                  </div>
                  <div className="title">
                    선택하신 템플릿으로 시작하시고 싶으시다면 아래에 등록 버튼을 클릭해주세요.
                  </div>
                </EditorWrapper>
              </div>
            </React.Fragment>}
        </FormBox>
        </div>
        </React.Fragment>
        );
  }
};
class Field extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={`wrapper flex ${this.props.isMargin==false?null:"margin_bottom"} ${this.props.isCentering==null?null:"Vcentering"}`}>
        <div className={`label`}>{title}</div>
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
    this.getPriceValue = this.getPriceValue.bind(this);
  }
  async returnState() {
    this.props.return && await this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }
  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
          {/* <InputText onChange={this.onHandleChange} name="price" width={370} /> */}
        </Field>
      </React.Fragment>)
  }
};
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  margin-top: 30px;
  font-size:${market_style.font.size.normal3};
  font-weight: 500;
  font-family: Noto Sans KR;
  color: #707070;
  .textLabel {
    margin-left: 35px;
    vertical-align: top;
  }
`;
class ItemProject extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", members: [], price: 0, alone: false }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleReturn = this.onHandleReturn.bind(this);
    this.returnState = this.returnState.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.changeMembers = this.changeMembers.bind(this);
  }
  returnState() {
    this.props.return && this.props.return(this.state);
  }
  async onHandleReturn(name, value) {
    await this.setState({ [name]: value });
    this.returnState();
  }
  async onHandleChange(event) {
    let text= event.target.value;
    if(text!=""){
      text.replaceAll("\n","<br/>");
    }
    await this.setState({ [event.target.name]: text });
    this.returnState();
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }
  async changeMembers(mem) {
    await this.setState({ members: mem })
    this.returnState();
  }

  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        <Field title="팀원 초대">
          <div className="inputBox">
          {this.state.alone ? undefined : <SearchDesignMemberContainer className="searchRect" onChangeMembers={this.changeMembers} />}
          </div>
          {/* LEAVE ME ALONE */}
          {/* <NoInviteMemberBox>
            <CheckBox2 onChange={() => this.setState({ alone: !this.state.alone, members: [] })} checked={this.state.alone} />
            <span className="textLabel">멤버를 초대하지 않습니다.</span>
          </NoInviteMemberBox> */}
        </Field>
        <Field title="내용 공개 여부">
          <RadioType return={this.onHandleReturn} default={this.state["public"]} name="public" Options={["예", "아니오"]} /></Field>
        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
        </Field>
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
    this.getPriceValue = this.getPriceValue.bind(this);
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
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }
  render() {
    // const typeOnOff = ["온라인", "오프라인"];

    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        {/* <Field title="자문/상담 방법"> 온라인 */}
        {/* <RadioType checked={1} return={this.onHandleReturn} name="contact-method" Options={typeOnOff} /> */}
        {/* </Field> */}
        <Field title="내용 공개 여부">
          <RadioType return={this.onHandleReturn} default={this.state["public"]} name="public" Options={["예", "아니오"]} /></Field>
        <Field isMargin={false} isCentering={true} title="자문/상담 비용">
          <InputPriceNew placeholder="시간당" name="price" getValue={this.getPriceValue} />
        </Field>
      </React.Fragment>)
  }
};
class ItemExperience extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  }
  async returnState() {
    this.props.return && await this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }

  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
        </Field>
      </React.Fragment>)
  }
};
class ItemInfoData extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  }
  async returnState() {
    this.props.return && await this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }

  render() {
    // const types = ["블로그형", "프로젝트형"];
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
          {/* <InputText onChange={this.onHandleChange} name="price" width={370} /> */}
        </Field>
      </React.Fragment>)
  }
};
class ItemIdea extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", price: 0 }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  }
  async returnState() {
    this.props.return && await this.props.return(this.state);
  }
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }

  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>
        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
        </Field>
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
    this.getPriceValue = this.getPriceValue.bind(this);
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
  async getPriceValue(value) {
    await this.setState({ price: value });
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
    const { content } = this.state;
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>

        <Field title="내용">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {content.length > 0 &&
              content.map((item, index) =>
                <Controller key={index} type={item.type} item={item} order={index}
                  deleteItem={this.deleteItem} name={`content${index}`} getValue={this.onChangValue} />)}
            <DescirptionText>※ 특허청에 등록된 원본 파일을 올려주세요.</DescirptionText>
            <AddController onlyfile type="INIT" order={0} name="addBasic" getValue={this.onAddValue} />
          </div></Field>

        <Field title="판매 방식 선택">
          <RadioType return={this.onHandleReturn} default={this.state["selling-type"]} name="selling-type" Options={["양도", "독점 사용권", "일반 사용권"]} /></Field>

        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
        </Field>

      </React.Fragment >)
  }
};
class ItemProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], imageList: [], description: "", price: 0 };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.returnState = this.returnState.bind(this);
    // this.onHandleImageList = this.onHandleImageList.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  };
  returnState() {
    this.props.return && this.props.return(this.state);
  };
  async onHandleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    this.returnState();
  };
  // async onHandleImageList(value) {
  //   await this.setState({ imageList: value.imageList });
  //   this.returnState();
  // }
  async getPriceValue(value) {
    await this.setState({ price: value });
    this.returnState();
  }
  render() {
    return (
      <React.Fragment>
        <Field title="설명">
          <InputTextarea placeholder="설명을 입력하세요" onChange={this.onHandleChange} name="description" height={60} /></Field>

        {/* <Field title="상세 이미지">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ThumbnailList return={this.onHandleImageList} width={650} />
            <Context >(이미지 최대 10장 업로드 가능)</Context></div></Field> */}

        <Field isMargin={false} isCentering={true} title="구입 비용">
          <InputPriceNew name="price" getValue={this.getPriceValue} />
        </Field>

      </React.Fragment>)
  }
};

