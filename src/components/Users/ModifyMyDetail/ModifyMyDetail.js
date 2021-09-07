import React, { Component } from "react";
import { FormControl } from "modules/FormControl";
import styled from "styled-components";

import SectionThumbnail from "components/Users/ModifyMyDetail/ModifyMyDetail/NewSectionThumbnail";
import SectionBasic from "components/Users/ModifyMyDetail/ModifyMyDetail/NewSectionBasic";
import SectionSecurity from "components/Users/ModifyMyDetail/ModifyMyDetail/NewSectionSecurity";
import SectionAdditional from "components/Users/ModifyMyDetail/ModifyMyDetail/NewSectionAdditional";
import SectionBuziness from "components/Users/ModifyMyDetail/ModifyMyDetail/NewSectionBuziness";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import opendesign_style from "opendesign_style";
import { SetSession } from 'modules/Sessions';

const Wrapper = styled.div`
  width: 1620px;
  margin-left: ${100 + 38}px;
  margin-top: ${90 + 32}px;

  // *{ border:1px solid red; }
  // background-color: #EFEFEF;

  display: flex;
  flex-direction: row;

  .split {
    margin-top: 8px;
    height: 1000px;
    border-left: 2px solid #CCCCCC;
  }
`;
const NavMenu = styled.div`
  width: 430px;
   .thumbnail-text {
    margin: auto;
    border: none;
    width: max-content;
    height: 68px;
    text-align: center;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
  }
  .menu-wrapper {
    margin-top: 24px;

    .menu {
      margin: auto;
      width: 168px;
      padding-top: 22px;
      padding-bottom: 22px;
      display: flex;
      justify-content: center;
      color: #000000;
      :hover {
        background-color: #EFEFEF;
      }
      cursor: pointer;
      .text {
        width: max-content;
        max-width: 168px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        opacity: 1;
      }
      &.active {
        color: #FF0000 !important;
      }
    }

    .bottom-border {
      border-bottom: 2px solid #707070;
    }
  }
  // min-width:433px;
  // height:300px;
  // position:relative;
  // .menuBox{
  //   width:325px;
  //   position: fixed;
  //   top:197px;
  //   margin-left:64px;    
  //   background-color:#F5F4F4;
  //   border-radius:5px;
  // }
  // .menuItem{
  //   height:62px;
  //   padding-left:36px;
  //   padding-top:18px;
  //   lineHeight:29px;
  //   border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  //   cursor:pointer;
  // }
  // .deleteText{
  //   font-family:Noto Sans KR;
  //   font-size:20px;
  //   font-family:Noto Sans KR;
  //   font-weight:500;
  //   text-align:left;
  //   color:#FF0000;
  //   border-bottom:${props => props.borderBottom};
  // }

  // @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  // and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
  //   display:flex;
  //   justify-content:center;
  //   align-items:center;
  //   .menuBox{
  //     margin-left:0px;   
  //     position: static; 
  //   }
  // }
  // @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  // and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
  //   display:none;
  // }
`;
const ModifyForm = styled.div`
  margin-left: 39px;
  border: 3px solid #707070;
  margin-bottom: 50px;
`;
const scrollmenu_data = [{ txt: "기본 정보", tag: "#basic" }, { txt: "보안", tag: "#security" }, { txt: "부가 정보", tag: "#additional" }];

class ModifyMyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_password: false, selected: 0, loading: false,
      thumbnail: "", thumbnail_name: "", nick_name: "", about_me: "",
      password: "", passwordCheck: "",
      category_level1: 0, category_level2: 0, category_level3: 0,
      is_designer: false, team: "", career: "", location: "", contact: "", screenWidth: window.innerWidth,
      careerlist: [{ number: 0, task: "", explain: "", during: "" }],
    }
    this.updateNickName = this.updateNickName.bind(this);
    this.updateIntroduce = this.updateIntroduce.bind(this);
    this.updateThumbnail = this.updateThumbnail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordCheck = this.updatePasswordCheck.bind(this);
    this.updateCategory1 = this.updateCategory1.bind(this);
    this.updateCategory2 = this.updateCategory2.bind(this);
    this.updateCategory3 = this.updateCategory3.bind(this);
    this.updateIsDesigner = this.updateIsDesigner.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.updateCareer = this.updateCareer.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.updateCareerlist = this.updateCareerlist.bind(this);

  }

  /**UPDATE */
  updateNickName(modifyvalue) {
    this.setState({ nick_name: modifyvalue })
  }
  updateIntroduce(modifyvalue) {
    this.setState({ about_me: modifyvalue })
  }
  updateThumbnail(imgInfo, imgName) {
    this.setState(state => ({ thumbnail: imgInfo, thumbnail_name: imgName }));
  }
  updatePassword(modifyvalue) {
    this.setState({ password: modifyvalue });
  }
  updatePasswordCheck(modifyvalue) {
    this.setState({ passwordCheck: modifyvalue })
  }
  updateCategory1(modifyvalue) {
    this.setState({ category_level1: modifyvalue, category_level2: null, category_level3: null });
  }
  updateCategory2(modifyvalue) {
    this.setState({ category_level2: modifyvalue, category_level3: null });
  }
  updateCategory3(modifyvalue) {
    this.setState({ category_level3: modifyvalue });
  }
  updateIsDesigner(modifyvalue) {
    this.setState({ is_designer: modifyvalue });
  }
  updateTeam(modifyvalue) {
    this.setState({ team: modifyvalue });
  }
  updateCareer(modifyvalue) {
    this.setState({ career: modifyvalue });
  }
  updateLocation(modifyvalue) {
    this.setState({ location: modifyvalue });
  }
  updateContact(modifyvalue) {
    this.setState({ contact: modifyvalue });
  }
  updateCareerlist(modifyvalue) {
    this.setState({ careerlist: modifyvalue });
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize, false);
  }
  handleScroll = () => {
    // let sections = document.querySelectorAll("section")
    document.querySelectorAll("section")
  }
  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth })
  };
  scrollMove = (menu, selected) => {
    this.setState({ selected: selected });
    window.location.href = menu.tag;
  }

  componentWillMount() {
    document.removeEventListener("scroll", this.handleScroll, true)
  }

  onChangeValue = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
    }
    await this.setState(obj);

    if (data && data.target && data.target.name === "nick_name") {
      if (data.value === this.props.MyDetail.nick_name) {
        data.validates = ["required", "NotSpecialCharacters"];
      } else {
        data.validates = ["required", "NotSpecialCharacters", "CheckNickName"];
      }
    }
  };

  liveCheck = (target) => {
    FormControl(this.state[target]);
  };

  samePwCheck = () => {
    FormControl({
      value: [this.state.password.value, this.state.password2.value],
      target: this.state.password2.target,
      validates: this.state.password2.validates
    });
  }
  async checkNickname() {
    const data = { nick_name: this.state.nick_name }
    let returnvalue = true;
    await this.props.CheckNickNameRequest(data).then(
      (res) => {
        console.log(res, data);
        if (res.checkNickName === false) {
          returnvalue = false;
        }
      }
    );
    //console.log("qwer", returnvalue);
    return returnvalue;
  }

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.props);

    let careerlist = "";
    this.state.careerlist.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
      return (
        careerlist += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
      );
    })
    // console.log(careerlist);
    // return;
    let formData = {
      uid: this.props.uid, nick_name: this.state.nick_name,
      about_me: this.state.about_me,
      password: this.state.password,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      category_level3: this.state.category_level3,
      is_designer: this.state.is_designer,
      // team: this.state.team, career: this.state.career,
      // location: this.state.location, contact: this.state.contact,
      change_password: this.state.change_password,
      careerlist: careerlist,
      files: [],
    };

    let file = {
      value: this.state.thumbnail,
      name: this.state.thumbnail_name,
      key: 0
    };

    if (this.state.thumbnail != null) {
      if (this.state.thumbnail !== "") {
        formData.files.push(file);
      }
    }
    if (formData.files.length === 0 ||
      formData.files[0].value === (this.props.MyDetail.profileImg && this.props.MyDetail.profileImg.m_img))
      delete formData.files;
    if (this.state.nick_name !== this.props.MyDetail.nick_name) {
      if (await this.checkNickname() === false) {
        await alert("중복된 닉네임입니다", "확인");
        return;
      }
    }
    if (this.state.nick_name === "") {
      await alert("닉네임을 입력해주세요", "확인");
      return;
    }

    if (this.state.password) {
      var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])/;
      if (!reg_pw.test(this.state.password) || this.state.password.length < 6 || this.state.password.length > 15) {
        await alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오", "확인");
        return false;
      }
      if (this.state.password !== this.state.passwordCheck) {
        await alert("비밀번호 확인을 다시 해주십시오", "확인");
        return false;
      }
      delete formData.passwordCheck;
    }

    if (this.state.category_level1 === -1) {
      await alert("카테고리를 선택해주세요!", "확인");
      return;
    }

    // console.log("성공", formData, { ...this.state });
    // return
    await this.setState({ loading: true });
    this.props.UpdateUserDetailRequest(formData, this.props.token)
      .then(async res => {
        console.log(res);
        if (res.success) {
          await alert("정보가 수정되었습니다.", "확인");
          window.location.href = "/mypage"
        } else {
          await alert("다시 시도해주세요", "확인");
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        //console.log("실패", e);
        alert(e + "다시 시도해주세요");
        this.setState({ loading: false });
      });
  };
  onCancal = () => {
    this.props.history.push('/myPage')
  }
  onChangePassword = () => {
    this.setState({ change_password: true })
  }
  onDeleteUser = async () => {

    let isconfirm = await confirm("정말 탈퇴하시겠습니까?", "예", "아니오");
    if (isconfirm) {
      this.props.DeleteUserRequest(this.props.token)
        .then(() => {
          SetSession("opendesign_token", null)
            .then(data => {
              // console.log("data:", data)
              this.props.SignOutRequest()
              this.setState({ sign_modal: false, user_popup: null })
              window.location.reload()
            })
        })
        .then(() => {
          window.location.href = "/"
        });
    }
  }

  render() {
    const scrollmenu = scrollmenu_data;
    const { MyDetail } = this.props;

    return (<Wrapper>

      {/* loading */}
      {this.state.loading ? <Loading /> : null}

      {/* menu */}
      <NavMenu >
        <SectionThumbnail
          MyDetail={MyDetail}
          updateThumbnail={this.updateThumbnail}
        />


        <div className="menu-wrapper">
          {scrollmenu.map((menu, index) => {
            return (<div
              onClick={() => this.scrollMove(menu, index)}
              className={`${this.state.selected === index ? "active" : ""} menu bottom-border`}
              key={menu.txt}>
              <div className={`${this.state.selected === index ? "active" : ""} text`}>{menu.txt}</div>
            </div>);
          })}
          <div className={`menu`} onClick={this.onDeleteUser}>
            <div className="text">탈퇴하기</div>
          </div>
        </div>
      </NavMenu>

      <div className="split">&nbsp;</div>

      {/* form */}
      <ModifyForm>
        <SectionBasic
          updateNickName={this.updateNickName}
          updateIntroduce={this.updateIntroduce}
          MyDetail={this.props.MyDetail}
        />

        <SectionSecurity
          MyDetail={this.props.MyDetail}
          updatePassword={this.updatePassword}
          updatePasswordCheck={this.updatePasswordCheck}
        />

        <SectionAdditional
          MyDetail={this.props.MyDetail}
          category1={this.props.category1}
          category2={this.props.category2}
          category3={this.props.category3}
          updateCategory1={this.updateCategory1}
          updateCategory2={this.updateCategory2}
          updateCategory3={this.updateCategory3}
        />

        <SectionBuziness
          MyDetail={this.props.MyDetail}
          updateCareerlist={this.updateCareerlist}
          updateIsDesigner={this.updateIsDesigner}
          updateTeam={this.updateTeam}
          updateCareer={this.updateCareer}
          updateLocation={this.updateLocation}
          pdateContact={this.updateContact}
        />

        <div className="buttonBox">
          <BackButton
            onClick={async () => {
              if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                window.history.go(-1)
              }
            }}
            isComplete={false}>
            <BtnText>취소</BtnText>
          </BackButton>
          <CompleteButton id="additional" isComplete={true} onClick={this.onSubmit}><BtnText>수정</BtnText></CompleteButton>
        </div>
        
      </ModifyForm>
    </Wrapper >);
  };
};

export default ModifyMyDetail;



// <MainBanner >
// <div className="title">내 프로필 수정하기</div>
// </MainBanner>
// <MainSection id="basic">
// {/* scroll - menu */}
// <NavMenu>
//   <div className="menuBox">
//     {scrollmenu.map((menu, index) => {
//       return (<MenuItem onClick={() => this.scrollMove(menu, index)}
//         className="menuItem"
//         borderBottom={index + 1 === scrollmenu.length}
//         key={menu.txt}>
//         <MenuText selected={this.state.selected === index}>{menu.txt}</MenuText>
//       </MenuItem>)
//     })}
//   <MenuItem className="white" onClick={this.onDeleteUser}>
//           <div className="deleteText">탈퇴하기</div>
//   </MenuItem>
//   </div>
// </NavMenu>
// {/* form */}
// <InputBoard isModifyAnother={true}>

// </InputBoard>
// </MainSection>

const MainBanner = styled.div`
  width: 100%;
  height:140px;
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
  }

  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
    align-items:flex-end;
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    margin-bottom:20px;
  }
`
const MainSection = styled.div`
  display: flex;
  flex-direction:row;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
      flex-direction:column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
      flex-direction:column;
  }
`
const MenuItem = styled.div`
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  border-bottom: ${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  cursor:pointer;
  &.white{
    background-color: white;
  }
}`

const MenuText = styled.div`
font-size:20px;
font-family:Noto Sans KR;
font-weight:300;
text-align:left;
color: ${props => props.selected ? "#FF0000" : "#707070"};
border-bottom:${props => props.borderBottom};
`
//const Arrow = styled.span`
//  margin-left:70px;
//  font-size:15px;
//`
const InputBoard = styled.div`
  width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
  padding-bottom:100px;
  margin-bottom:100px;
  position:relative;
  padding-top:45px;
  border-radius:5px;
  border:8px solid #F5F4F4;
  .buttonBox{
    width: max-content;
    display: flex;
    justify-content:flex-end;
    margin-top: 21px;
    margin-left: auto;
    padding:10px 0px 10px 10px;
    position:absolute;
    right:0px;
    bottom:0px;
  }  
`

const BackButton = styled.div`
      cursor: pointer;
      width: 104.5px;
      height: 44px;
      border-radius: 5px;
      background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
      padding-top: 6px;
      padding-left: 15px;
      margin-right: 25px;
`
const CompleteButton = styled.div`
        cursor: pointer;
        width: 104.5px;
        height: 44px;
        border-radius: 5px;
        background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
        padding-top: 6px;
        padding-left: 15px;
        margin-right: 25px;
  `
const HRline = styled.div`
  margin-top:100px;
  margin-bottom:67px;
  border-bottom:5px solid #F5F4F4;
`
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
