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

{/* <React.Fragment>
{loading ? <Loading /> : null}
<MainBanner>
  <div className="title">그룹 등록하기</div>
</MainBanner>

<MainSection>
  <NavMenu>
    <div className="menuBox">
      {scrollmenu.map((menu, index) => {
        return (
          <div className="menuItem"
            onClick={() => this.gotoStep(index)}
            borderBottom={index + 1 === scrollmenu.length} key={menu.txt}>
            <MenuText selected={this.state.step === index}>{menu.txt}</MenuText>
          </div>)
      })}
    </div>
  </NavMenu>
  <InputBoard >
    <form>
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
      <div className="buttonBox">
          <BackButton
            onClick={async() => 
              {    
                if (await confirm("등록 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                window.history.go(-1)
              }
            }}
            isComplete={false}>
            <BtnText>취소</BtnText>
          </BackButton>
        <CompleteButton isComplete={this.state.isPossibleNextStep}
          onClick={this.onSubmit} >
          <BtnText>완료</BtnText>
        </CompleteButton>
      </div>
    </form>
  </InputBoard>
</MainSection>
</React.Fragment> */}


// const MainBanner = styled.div`
//   width: 100%;
//   height:140px;
//   display: flex;
//   justify-content: center;
//   .title{
//     width: max-content;
//     height: 37px;
//     margin-top: 45px;
//     font-size: 25px;
//     font-family: Noto Sans KR;
//     color: #707070;
//     line-height: 37px;
//     font-weight: 700;
//   }

//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     align-items:flex-end;
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     margin-bottom:20px;
//   }
// `;

// const MainSection = styled.div`
// display: flex;
// flex-direction:row;
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//       flex-direction:column;
//   }
// `;

// const NavMenu = styled.div`
//   min-width:433px;
//   height:300px;
//   position:relative;
//   .menuBox{
//     width:325px;
//     position: fixed;
//     top:197px;
//     margin-left:64px;    
//     background-color:#F5F4F4;
//     border-radius:5px;
//   }
//   .menuItem{
//     height:62px;
//     padding-left:36px;
//     padding-top:18px;
//     lineHeight:29px;
//     border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
//     cursor:pointer;
//   }
//   .deleteText{
//     font-family:Noto Sans KR;
//     font-size:20px;
//     font-family:Noto Sans KR;
//     font-weight:500;
//     text-align:left;
//     color:#FF0000;
//     border-bottom:${props => props.borderBottom};
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     .menuBox{
//       margin-left:0px;   
//       position: static; 
//     }
//   }
//   @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
//   and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
//     display:none;
//   }
// `;
// const MenuText = styled.div`
//   font-size:20px;
//   font-family:Noto Sans KR;
//   font-weight:300;
//   text-align:left;
//   color: ${props => props.selected ? "#FF0000" : "#707070"};
//   border-bottom:${props => props.borderBottom};
// `
// const InputBoard = styled.div`
// width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
// padding-bottom:100px;
// margin-bottom:100px;
// position:relative;
// padding-top:45px;
// border-radius:5px;
// border:8px solid #F5F4F4;
// .buttonBox{
//   width: max-content;
//   display: flex;
//   justify-content:flex-end;
//   margin-top: 21px;
//   margin-left: auto;
//   padding:10px 0px 10px 10px;
//   position:absolute;
//   right:0px;
//   bottom:0px;
// }
// @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
// and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
// }
// `;

// const BtnText = styled.p`
//   width: 74px;
//   padding: 0px;
//   font-familty: Noto Sans KR;
//   font-weight: 500;
//   line-height: 29px;
//   text-align: center;
//   font-size: 20px;
//   color: #FFFFFF;
// `;

// const BackButton = styled.div`
//       cursor: pointer;
//       width: 104.5px;
//       height: 44px;
//       border-radius: 5px;
//       background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
//       padding-top: 6px;
//       padding-left: 15px;
//       margin-right: 25px;
// `
// const CompleteButton = styled.div`
//         cursor: pointer;
//         width: 104.5px;
//         height: 44px;
//         border-radius: 5px;
//         background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
//         padding-top: 6px;
//         padding-left: 15px;
//         margin-right: 25px;
//   `