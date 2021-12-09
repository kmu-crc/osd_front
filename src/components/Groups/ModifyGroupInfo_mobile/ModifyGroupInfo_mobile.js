import React, { Component } from "react";
import noimg from "source/noimg.png"
import styled from "styled-components";
import SectionBasic from "components/Groups/ModifyGroupInfo_mobile/SectionBasic"
import { Modal } from "semantic-ui-react";
import iDelete from "source/deleteItem.png"
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import { confirm } from "components/Commons/Confirm/Confirm";
import { strButtonComplete, strButtonCancel, strButtonNext } from "constant";

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }];
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
    color: #1E9B79;
  }
  margin-right: 20px;
  :last-child {
    margin-right: 0px;
  }
`;
const Wrapper =styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .content{
    width:360px;
  }
  .tabmenu{
    width:100%;
    height:22px;
    display:flex;
    justify-content:center;
    align-items:center;
    .text{
      font-family:Spoqa Han Sans;
      font-size:15px;
      font-weight:400;
      color:#7A7A7A;
      margin-left:10px;
      margin-right:10px;
    }
    .select{color:#1E9B79;}
  }

`
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
class CreateGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteDialog: false, isDelete: false,
      groupThumbnail: "", groupTitle: "", groupExplain: "", groupThumbnailURL: "", groupThumbnailName: "",
      loading: false, isPossibleNextStep: false, step: 0, /* 0: basics, 1: additional, 2: contents*/ selectedCate1: null,
      selectedCate2: null, cate1: null, cate2: null
    }
    this.handleInputDesignExplain = this.handleInputDesignExplain.bind(this);
    this.handleInputDesignTitle = this.handleInputDesignTitle.bind(this);
    this.handleChangeThumbnail = this.handleChangeThumbnail.bind(this);
    this.handleChangeThumbnailURL = this.handleChangeThumbnailURL.bind(this);
    this.handleOnClickDeleteDesign = this.handleOnClickDeleteDesign.bind(this);
    this.cancelDeleteGroup = this.cancelDeleteGroup.bind(this);

  }
  // setLoader = () => { this.setState({ loading: !this.state.loading }) }
  componentDidMount() {
    this.setState({
      groupTitle: this.props.GroupDetail.title,
      groupThumbnail: this.props.GroupDetail.img == null ? noimg : this.props.GroupDetail.img.m_img,
      groupExplain: this.props.GroupDetail.explanation
    });
  }
  shouldComponentUpdate(nextProps) {

    if (this.props.GroupDetail !== nextProps.GroupDetail) {
      //console.log("nextprops", nextProps)

      this.setState({
        groupTitle: nextProps.GroupDetail.title,
        groupThumbnail: nextProps.GroupDetail.img == null ? noimg : nextProps.GroupDetail.img.m_img,
        groupExplain: nextProps.GroupDetail.explanation
      });
    }

    return true;
  }
  handleInputDesignTitle(title) {
    //console.log("titleinput");
    this.setState(state => ({ groupTitle: title }))
  }
  handleInputDesignExplain(explain) {
    this.setState(state => ({ groupExplain: explain }))
  }
  handleChangeThumbnail(imgInfo, imgName) {
    this.setState(state => ({ groupThumbnail: imgInfo, groupThumbnailName: imgName }));
  }

  handleChangeThumbnailURL(imgurl) {
    this.setState(state => ({ groupThumbnailURL: imgurl }));
  }
  checkIsPossibleToGoNextStep = (step) => {

  }

  gotoStep = (index) => {
    this.setState({ step: index });
  }
  gotoPrevStep = () => {
    if (this.state.step === 0) {
      window.history.go(-1);
    }
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }
  completeCreateDesign = () => {
    this.submit();
  }
  submit = () => {
  }

  completed = () => {
    this.setState({ isPossibleNextStep: true })
  }
  deleteGroup = () => {

    this.props.DeleteGroupRequest(this.props.id, this.props.token)
      .then(data => {
        this.props.history.push("/group");
      });

  }
  cancelDeleteGroup = () => {
    this.setState({ isDelete: !this.state.isDelete });
  }

  onSubmit = async e => {
    const warning = "필수 입력항목을 모두 입력하지 않아 작업을 완료할 수 없습니다.\n";
    if (this.state.groupThumbnail === "" || this.state.groupThumbnail == null) {
      await alert(warning + "섬네일 이미지를 등록해주세요", "확인");
      return;
    }
    else if (this.state.groupTitle === "" || this.state.groupTitle == null) {
      await alert(warning + "그룹의 이름을 입력해주세요", "확인");
      return;
    }
    // else if (this.state.groupExplain === "" || this.state.groupExplain == null) {
    //   alert("그룹 설명을 작성해주세요!");
    //   return;
    // }
    e.preventDefault();
    let data = {
      user_id: this.props.userInfo.uid, uid: this.props.GroupDetail.uid,
      title: this.state.groupTitle, explanation: this.state.groupExplain, files: []
    };
    let file = {
      value: this.state.groupThumbnail,
      name: this.state.groupThumbnailName,
      key: 0
    };
    data.files.push(file);

    if (data.files.length <= 0 ||
      data.files[0].value === this.props.GroupDetail.img.m_img) delete data.files;

    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
      .then(async (res) => {
        if (res.data && res.data.success === true) {
          await alert("정보가 수정되었습니다.", "확인");
          this.props.history.push(`/groupDetail/${this.props.id}`);
        } else {
          await alert("다시 시도해주세요", "확인");
          this.setState({
            loading: false
          });
        }
      });
  };
  async handleOnClickDeleteDesign() {
    if (await confirm(`${this.state.groupTitle}를 삭제하시겠습니까?`, "예", "아니오")) {
        this.deleteGroup();
      }
  }


  render() {
    const { step } = this.state

    return (
    <React.Fragment>
        <Wrapper>
          <div className="content">
            <StepMenu>
              <Step className={`${"selected"}`}>기본정보</Step>
            </StepMenu>
            {step === 0 &&
          <SectionBasic
            groupTitle={this.state.groupTitle}
            groupExplain={this.state.groupExplain}
            groupThumbnail={this.state.groupThumbnail === "" || this.state.groupThumbnail == null ? noimg : this.state.groupThumbnail}
            onChangeExplain={this.handleInputDesignExplain}
            onChangeTitle={this.handleInputDesignTitle}
            onChangeThumbnailURL={this.handleChangeThumbnailURL}
            onChangeThumbnail={this.handleChangeThumbnail}
            designExplain={this.state.groupExplain}
            designTitle={this.state.groupTitle}
            thumbnail={this.state.groupThumbnail === "" || this.state.groupThumbnail == null ? noimg : this.state.groupThumbnail} {...this.props} />}
           
           <StepButtonWrapper>
            <button onClick={this.handleOnClickDeleteDesign} className="cancel">삭제</button>

            <button onClick={async() => {
              if (await confirm("등록 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                window.history.go(-1);
              }}} className="cancel">{strButtonCancel}</button>
            <button
              onClick={this.onSubmit}
              className={`next`}>
              {strButtonComplete}</button>
            </StepButtonWrapper>
          </div>
        </Wrapper>
    </React.Fragment>)
  }
}

export default CreateGroup;
{/* <Wrapper>
<div className="nav">
  <div className="title">그룹 수정하기</div>
  {scrollmenu.map((menu, index) => {
  return (
  <div className="menu menu_marginTop " onClick={() => this.gotoStep(index)}>기본 정보</div>
  )})}
  <div className="menu deleteButton delete" onClick={this.handleOnClickDeleteDesign} >그룹 삭제하기</div>
</div>
<div className="vline"/>
<div className="content">
  <div className="formWrap">
    {step === 0 &&
    <SectionBasic
      groupTitle={this.state.groupTitle}
      groupExplain={this.state.groupExplain}
      groupThumbnail={this.state.groupThumbnail === "" || this.state.groupThumbnail == null ? noimg : this.state.groupThumbnail}
      onChangeExplain={this.handleInputDesignExplain}
      onChangeTitle={this.handleInputDesignTitle}
      onChangeThumbnailURL={this.handleChangeThumbnailURL}
      onChangeThumbnail={this.handleChangeThumbnail}
      designExplain={this.state.groupExplain}
      designTitle={this.state.groupTitle}
      thumbnail={this.state.groupThumbnail === "" || this.state.groupThumbnail == null ? noimg : this.state.groupThumbnail} {...this.props} />}
    </div>
    <div className="buttonWrap">
      <div className="button grey"
            onClick={async() => 
              {    
                if (await confirm("등록 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                window.history.go(-1)
              }
            }}
      style={{marginRight:"34px"}}>취소</div>
      <div className={`button red`}
           onClick={this.onSubmit}>수정</div>
    </div>
</div>
</Wrapper> */}
