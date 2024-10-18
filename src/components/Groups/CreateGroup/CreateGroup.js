import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import SectionBasic from "components/Groups/CreateGroup/SectionBasic";
import Loading from "components/Commons/Loading";
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import { confirm } from "components/Commons/Confirm/Confirm";


const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }];
const Wrapper =styled.div`
  display:flex;
  .nav{
      min-width:264px;
      width:264px;
      display:flex;
      flex-direction:column;
      align-items:center;
      padding-top:26px;
      .title{
        font-family:Spoqa Han Sans Neo;
        font-weight:Medium;
        font-size:28px;
        color:black;
      }
      .menu{
        font-family:Spoqa Han Sans Neo;
        font-weight:Medium;
        font-size:28px;
        color:#1E9B79;
      }
      .menu_marginTop{margin-top:57px;}
  }
  .vline{
      border:1px solid #CCCCCC;
      height:871px;
      margin-top:42px;
  }
  .content{
      max-width:1566px;
      width:100%;
      display:flex;
      padding-left:72px;
      padding-top:42px;
      .formWrap{
        max-width:1248px;
        width:100%;
      }
      .buttonWrap{
        min-height:920px;
        display:flex;
        justify-content:flex-end;
        align-items:flex-end;
        padding-bottom:50px;

        .button{cursor:pointer;width:86px;height:49px;display:flex;justify-content:center;align-items:center;color:white;font-size:28px;font-family:Spoqa Han Sans Neo;}
        .grey{background-color:#8D8D8D;}
        .red{background-color:red;}
      }
  }

  @media only screen and (min-width : 500px) and (max-width:1700px) {
    display:flex;
    flex-direction:column;
    .content{
      display:flex;
      flex-direction:column;
      .buttonWrap{
        padding-right:30px;
        width:100%;
        min-width:1000px;
        height:max-content;
        min-height:max-content;
        margin-top:30px;
      }
    }
    .vline{
      width:96%;
      min-width:1000px;
      margin:0;
      margin-left:auto;
      margin-right:auto;
      height:0px;
      border-bottom:1px solid #CCCCCC;
      margin-top:60px;

    }
    .nav{
      
      min-width:1000px;
      width:100%;
      height:100px;
      padding:36px 38px;
      display:flex;
      flex-direction:row;
      align-items:center;
      flex-wrap:wrap;
      justify-content:center;
      .title{
        min-width:max-content;
        height:40px;
        margin-bottom:32px;
        font-family:Spoqa Han Sans Neo;
        font-weight:500;
        font-size:28px;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .menu{
        min-width:max-content;
        display:flex;
        justify-content:center;
        align-items:center;
        font-family:Spoqa Han Sans Neo;
        font-size:28px;
        cursor:pointer;
        min-height:40px;
      }
      .menu_marginTop{margin-top:0px;}
      .borderBottom{border:none;}
      .delete{margin:0;margin-left:50px;}
    }
  }
`

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupThumbnail: "", groupTitle: "", groupExplain: "", groupThumbnailURL: "", groupThumbnailName: "",
      loading: false, isPossibleNextStep: false, step: 0, /* 0: basics, 1: additional, 2: contents*/ selectedCate1: null,
      selectedCate2: null, cate1: null, cate2: null
    }
    this.handleInputDesignExplain = this.handleInputDesignExplain.bind(this);
    this.handleInputDesignTitle = this.handleInputDesignTitle.bind(this);
    this.handleChangeThumbnail = this.handleChangeThumbnail.bind(this);
    this.handleChangeThumbnailURL = this.handleChangeThumbnailURL.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  handleInputDesignTitle(title) {
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
  completed = (T) => {
    this.setState({ isPossibleNextStep: T });
  }
  onSubmit = async e => {
    e.preventDefault();
    const warning = "필수 입력항목을 모두 입력하지 않아 작업을 완료할 수 없습니다.\n";
    if (this.state.groupThumbnail === "" || this.state.groupThumbnail == null) {
      await alert(warning + "섬네일 이미지를 등록해주세요","확인");
      return;
    }
    else if (this.state.groupTitle === "" || this.state.groupTitle == null) {
      await alert(warning + "그룹의 이름을 입력해주세요","확인");
      return;
    }
    // else if (this.state.groupExplain === "" || this.state.groupExplain == null) {
    //   alert("그룹 설명을 작성해주세요!");
    //   return;
    // }
    this.setState({ loading: true });
    const data = { user_id: this.props.userInfo.uid, title: this.state.groupTitle, explanation: this.state.groupExplain, files: [] };
    let file = { value: this.state.groupThumbnail, name: this.state.groupThumbnailName, key: 0 };
    data.files.push(file);
    this.props.CreateNewGroupRequest(data, this.props.token)
      .then(res => {
        this.props.history.push(`/groupDetail/${res.id}`);
      }).catch(e => {
        console.log(e);
      });
    this.setState({ loading: false });
  };
  render() {
    const { loading, step } = this.state
    return (
      <React.Fragment>
          <Wrapper>
            <div className="nav">
              <div className="title">그룹 등록하기</div>
              {scrollmenu.map((menu, index) => {
              return (
              <div className="menu menu_marginTop " onClick={() => this.gotoStep(index)}>기본 정보</div>
              )})}
            </div>
            <div className="vline"/>
            <div className="content">
              <div className="formWrap">
                {step === 0 &&
                <SectionBasic completed={this.completed}
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
                  <div className={`button ${this.state.isPossibleNextStep == false? "grey":"red"}`}
                       onClick={this.onSubmit}>완료</div>
                </div>
            </div>
          </Wrapper>
      </React.Fragment>

    )
  }
}

export default CreateGroup;
