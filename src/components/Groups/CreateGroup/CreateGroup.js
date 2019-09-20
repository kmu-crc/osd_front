import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import BasicInfo from "components/Groups/CreateGroup/BasicInfo";
import Loading from "components/Commons/Loading";

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }];

const MainBanner = styled.div`
  width: 1920px;
  display: flex;
  justify-content: center;
`;
const MainBannertext = styled.div`
  margin-top: 45px;
  width: 196px;
  height: 37px;
  font-family: Noto Sans KR;
  font-size: 25px;
  font-weight: 700;
  line-height: 37px;
  text-align: center;
  color: #707070;
`;
const MainSection = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 111px;
  .FONT-TEST{
    color: ${props=>props.color};
    font-size: ${props=>props.fz}px;
    font-family: Noto Sans KR;
    font-weight: 300;
    text-align: left;
  };
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
        <MainBannertext>그룹 등록하기</MainBannertext>
      </MainBanner>

      <MainSection>
        {/* scroll - menu */}
        <div style={{ width: "433px" }}>
          <div style={{ width: "325px", marginLeft: "64px" }}>
            <div style={{ position: "fixed", top: "197px", width: "325px", height: "62px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
              {scrollmenu.map((menu, index) => {
                return (<div onClick={() => this.gotoStep(index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                  <div className="FONT-TEST" fz={100} color={this.state.step === index ? "#FF0000" : "#707070"} >{menu.txt}</div>
                </div>)
              })}
            </div>
          </div>
        </div>

        {/* form */}
        <div style={{ position: "relative", width: "1422px", height: "925px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "45px" }}>
          <form>
            {step === 0 &&
              <BasicInfo completed={this.completed}
                groupTitle={this.state.groupTitle} groupExplain={this.state.groupExplain} groupThumbnail={this.state.groupThumbnail == "" ? noimg : this.state.groupThumbnail}
                onChangeExplain={this.handleInputDesignExplain} onChangeTitle={this.handleInputDesignTitle} onChangeThumbnailURL={this.handleChangeThumbnailURL} onChangeThumbnail={this.handleChangeThumbnail}
                designExplain={this.state.groupExplain} designTitle={this.state.groupTitle} thumbnail={this.state.groupThumbnail == "" ? noimg : this.state.groupThumbnail} {...this.props} />}
            <div style={{ marginTop: "20.54px", justifyContent: "flex-end", display: "flex" }}>
              <div onClick={this.state.isPossibleNextStep ? this.onSubmit : ()=>alert("아직 그룹 등록에 필요한 정보가 입력되지 않았습니다.")} style={{ position: "absolute", right: "9px", bottom: "35px", cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
                <BtnText>완료</BtnText>
              </div>
            </div>
          </form>
        </div>
      </MainSection>
    </React.Fragment>)
  }
}

export default CreateGroup;
