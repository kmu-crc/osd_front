import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import SectionBasic from "components/Groups/CreateGroup/SectionBasic";
import Loading from "components/Commons/Loading";

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }];

const MainBanner = styled.div`
  width: 1920px;
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
    text-align: center;
  }
`;

const MainSection = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 111px;
`;

const NavMenu = styled.div`
  width: 433px;

  .menuBox{
    width:325px;
    height:62px;
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
    border-bottom:${props => props.borderBottom?"none" : "2px solid #FFFFFF"};
    cursor:pointer;

  }
    .menuText{
      font-size:20px;
      font-family:Noto Sans KR;
      font-weight:300;
      text-align:left;
      color: ${props => props.selected?"#707070":"#FF0000"};
      border-bottom:${props => props.borderBottom};
    }
`;

const InputBoard = styled.div`
      width:1422px;
      height:925px;
      position:relative;
      padding-top:45px;
      border-radius:5px;
      border:8px solid #F5F4F4;

      .buttonBox{
        display: flex;
        margin-top: 20.54px;
        justifyContent: flex-end;
      }
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
`;

const CompleteButton = styled.div`
  position:absolute;
  right:9px;
  bottom:35px;
  cursor:pointer;
  width:104.5px;
  height:44px;
  border-radius:5px;
  background-color:${props=>props.isComplete?"#FF0000":"#707070"};
  padding-top:6px;
  padding-left:15px;
  margin-right:53px;
`;

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

    if (this.state.groupThumbnail == "") {
      alert("그룹의 섬네일을 지정해주세요.");
      return;
    }
    else if (this.state.groupTitle == "") {
      alert("그룹 이름을 작성해주세요!");
      return;
    }
    else if (this.state.explanation == "") {
      alert("그룹 설명을 작성해주세요!");
      return;
    }
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
    return (<React.Fragment>
      {loading ? <Loading /> : null}
      <MainBanner>
        <div className="title">그룹 등록하기</div>
      </MainBanner>

      <MainSection>
        {/* scroll - menu */}
        <NavMenu>
          <div className = "menuBox">
              {scrollmenu.map((menu, index) => {
                return (
                <div className = "menuItem" 
                     onClick={() => this.gotoStep(index)}
                     borderBottom={ index + 1 === scrollmenu.length} key={menu.txt}>
                <div className="menuText" selcted={this.state.step === index}>{menu.txt}</div>
                </div>)
              })}
          </div>
        </NavMenu>

        {/* form */}
        <InputBoard >
          <form>
            {step === 0 &&
              <SectionBasic completed={this.completed}
                groupTitle={this.state.groupTitle} 
                groupExplain={this.state.groupExplain} 
                groupThumbnail={this.state.groupThumbnail == "" ? noimg : this.state.groupThumbnail}
                onChangeExplain={this.handleInputDesignExplain} 
                onChangeTitle={this.handleInputDesignTitle} 
                onChangeThumbnailURL={this.handleChangeThumbnailURL} 
                onChangeThumbnail={this.handleChangeThumbnail}
                designExplain={this.state.groupExplain} 
                designTitle={this.state.groupTitle} 
                thumbnail={this.state.groupThumbnail == "" ? noimg : this.state.groupThumbnail} {...this.props} />}
            <div className = "buttonBox">
                <CompleteButton isComplete = {this.state.isPossibleNextStep}
                     onClick={this.state.isPossibleNextStep ? this.onSubmit : ()=>alert("아직 그룹 등록에 필요한 정보가 입력되지 않았습니다.")} >
                <BtnText>완료</BtnText>
              </CompleteButton>
            </div>
          </form>
        </InputBoard>
      </MainSection>
    </React.Fragment>)
  }
}

export default CreateGroup;

