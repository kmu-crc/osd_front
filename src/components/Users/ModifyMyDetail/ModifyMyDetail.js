import { MyMenu } from 'components/MyDetail';
import React from 'react';
import styled from 'styled-components';
import { ModifyMyProfile } from 'components/MyDetail'
import { SetSession } from 'modules/Sessions'
import Icon from '@material-ui/core/Icon';

const Wrapper = styled.div`
  margin-left: 100px;
  margin-top: ${90 + 24}px;

  // *{border: 1px solid red;}

  display: flex;
  flex–direction: rows;

  .spacer-0 { margin-left: 45px; }
  .spacer-1 { margin-left: 56px; }
  .spacer-2 { margin-left: 37px; }
  .split { margin-top: 100px; border-left: 1px solid #707070; }
  .spacer-3 { margin-left: 28px; }

  .info-pannel {
    height: 450px;
  }
  .buttons {
    height: 58px;
    display: flex;
    flex-direction: row;
    jusify-content: space-end;

    *{ cursor: default; }

    a, .text {
      display: flex;
      cursor: pointer;
    }
    a:last-child {
      margin-left: 33px;
    }
    .cancel {
      width: 96px;
      height: 58px;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 8px 8px 8px #0000002B;
      border: 1px solid #C2C2C2;
      opacity: 1;

      .text {
        margin: auto;
        width: 52px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
      }
    }
    .edit {
      width: 96px;
      height: 58px;
      background: #FF0000 0% 0% no-repeat padding-box;
      box-shadow: 8px 8px 8px #0000002B;
      opacity: 1;
      .text {
        margin: auto;
        width: 52px;
        height: 40px;
        text-align: center;
        font-weight: medium;
        font-size: 28px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
      }
    }
  }
  .margin-buttons { margin-top: 120px; }
`;
const InfoPannel = styled.div`

  .row {
    display: flex;
    flex-direction: row;
  }
  .title {
    width: max-content;
    height: 40px;
    text-align: center;
    font-weight: medium;
    font-size: 28px;
    line-height: 40px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000;
    opacity: 1;
  }
  .label {
    height: 33px;
    text-align: left;
    font-weight: normal;
    font-size: 22px;
    line-height: 33px;
    font-family: Spoqa Han Sans;
    letter-spacing: 0px;
    color: #777;
    opacity: 1;
  }
  .intro { width: 86px; }
  textarea {
    margin-top: 6px;
    width: 811px;
    height: 196px;
    background: #8E8E8E 0% 0% no-repeat padding-box;
    opacity: 1;

    padding: 18px 68px 24px 56px;
    resize: none;
    text-align: left;
    font-weight: 300;
    font-size: 15px;
    line-height: 22px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
  }
  input {
    width: 402px;
    height: 41px;
    background: #8E8E8E 0% 0% no-repeat padding-box;
    opacity: 1;

    padding: 4px 13px;
    text-align: left;
    font-weight: normal;
    font-size: 22px;
    line-height: 33px;
    font-family: Spoqa Han Sans;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    border: none;
    outline: none;
    ::placeholder { color: #FFFFFF; }
  }
  .icon {
    margin-left: 15px;
  }
  .intro, .pw, .pw-re, .category-label, .activity { 
    width: 158px; 
    margin-bottom: 34px;
  }
  .margin-pw { 
    margin-top: 60px;
  }
  .margin-category { 
    margin-top: 60px; 
  }
  .margin44 { margin-bottom: 44px;}
  .margin22 { margin-bottom: 22px;}

  .category {
    select {
      width: 309px;
      height: 41px;
      background: #8E8E8E 0% 0% no-repeat padding-box;
      opacity: 1;
      padding: 4px 13px;

      color: #FFF;

      margin-right: 68px;
      :last-child { margin-right: 0px; }

      ::placeholder {
        font-weight: normal;
        font-size: 22px;
        line-height: 33px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
      }
    }
  }
  .designer-checkbox {
    width: 35px;
    height: 33px;
    background: #707070;
    opacity: 1;
  }
  .triangle {
    width: 17px;
    height: 14px;
    transform: matrix(-1, 0, 0, -1, 0, 0);
    background: #F0F 0% 0% no-repeat padding-box;
    opacity: 1;
  }
`;

export default class ModifyMyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "basic",

      //profile 
      thumbnail: null, thumbnail_name: null,
      nick: null,

      // info
      about_me: this.props.MyDetail.about_me || "",
      // change_password: false,
      // selected: 0,
      // loading: false,
      //       password: "", passwordCheck: "",
      //       category_level1: 0, category_level2: 0, category_level3: 0,
      //       is_designer: false, team: "", career: "", location: "", contact: "", screenWidth: window.innerWidth,
      //       careerlist: [{ number: 0, task: "", explain: "", during: "" }],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.MyDetail !== this.props.MyDetail && this.props.MyDetail !== null) {
      this.setState({
        about_me: this.props.MyDetail.about_me,
      })
    }
  }
  changeTab = tab => {
    window.location.href = `#${tab}`;
    this.setState({ tab: tab });
  };
  deactivateAccount = async () => {
    // let isconfirm = await confirm("정말 탈퇴하시겠습니까?", "예", "아니오");
    // if (isconfirm) {
    // }
    this.props.DeleteUserRequest(this.props.token)
      .then(() => {
        SetSession("opendesign_token", null)
          .then(data => {
            this.props.SignOutRequest();
            window.location.reload();
          })
      })
      .then(() => {
        window.location.href = "/";
      });
  };
  onCancel = () => {
    alert(false);
  };
  onEdit = () => {
    alert(true);
  };
  onChange = obj => {
    this.setState(obj);
  }
  render() {
    const { Count, userInfo, category1, category2, } = this.props;
    const { tab, about_me } = this.state;
    console.log("PROPS:", this.props, "STATE:", this.state);

    return (<Wrapper>
      <div className="spacer-0">&nbsp;</div>
      {/* mymenu */}
      <div>
        <MyMenu
          Count={Count}
          changeTab={this.changeTab}
          nickName={(userInfo && userInfo.nickName) || "회원"} />
      </div>

      <div className="spacer-1"></div>
      {/* profile */}
      <div>
        <ModifyMyProfile
          onChange={this.onChange}
          tab={tab}
          userInfo={userInfo}
          deactivateAccount={this.deactivateAccount}
          changeTab={this.changeTab} />
      </div>

      <div className="spacer-2"></div>
      <div className="split" />
      <div className="spacer-3"></div>
      {/* info & buttons */}
      <div>
        <InfoPannel>
          <div>
            <div className="margin22 title">기본 정보</div>
            <div className="row">
              <div className="intro label">자기소개</div>
              <div>
                <textarea onChange={e => this.onChange({ about_me: e.target.value })} value={about_me} /></div>
            </div>
          </div>
          <div className="margin-pw">
            <div className="margin44 title">비밀번호 변경</div>
            <div className="row">
              <div className="pw label">비밀번호</div>
              <div>
                <input id="pw1" placeholder="새 비밀번호를 입력해주세요." type="password" />
                <Icon id="view-pw"
                  onClick={(e) => {
                    if (e.target.innerHTML === "visibility") {
                      document.getElementById('pw1').type = "text";
                      document.getElementById('pw2').type = "text";
                      e.target.innerHTML = "visibility_off";
                    } else {
                      document.getElementById('pw1').type = "password";
                      document.getElementById('pw2').type = "password";
                      e.target.innerHTML = "visibility";
                    }
                  }} className="icon">visibility</Icon>
              </div>
            </div>
            <div className="row">
              <div className="pw-re label">비밀번호 확인</div>
              <div>
                <input id="pw2" placeholder="새 비밀번호를 다시 입력해주세요." type="password" /></div>
            </div>
          </div>

          <div className="margin-category category">
            <div className="margin44 title">카테고리 변경</div>
            <div className="row">
              <div className="category-label label">카테고리</div>
              {userInfo.category1}
              <select >
                {category1 &&
                  category1.map((item, index) =>
                    <option key={index}>{item.text}</option>)}
              </select>
              <select>
                {category2 &&
                  category2.map((item, index) =>
                    <option key={index}>{item.text}</option>)}
              </select>
            </div>
          </div>

          <div className="margin-category">
            <div className="margin44 title">디자이너 활동</div>
            <div className="row">
              <div className="activity label">디자인 활동 여부</div>
              <div >
                <input className="designer-checkbox" type="checkbox" />
                <Icon style={{ fontSize: "48px", color: "#8E8E8E" }}>help</Icon></div>
            </div>
          </div>
        </InfoPannel>

        <div className="margin-buttons buttons">
          <a onClick={this.onCancel} className="cancel">
            <div className="text">취소</div>
          </a>
          <a onClick={this.onEdit} className="edit">
            <div className="text">수정</div>
          </a>
        </div>

      </div>

    </Wrapper >)
  };
};

// import React, { Component } from "react";
// import { FormControl } from "modules/FormControl";
// import styled from "styled-components";

// import SectionBasic from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBasic"
// import SectionSecurity from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionSecurity"
// import SectionAdditional from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionAdditional"
// import SectionBuziness from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBuziness"
// import Loading from "components/Commons/Loading";
// import { alert } from "components/Commons/Alert/Alert";
// import opendesign_style from "opendesign_style";

// const MainBanner = styled.div`
//   width: 100%;
//   height:140px;
//   display: flex;
//   justify-content: center;
//   .title{
//     width: 196px;
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
// `
// const MainSection = styled.div`
//   display: flex;
//   flex-direction:row;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//       flex-direction:column;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//       flex-direction:column;
//   }
// `
// const MenuItem = styled.div`
//   height:62px;
//   padding-left:36px;
//   padding-top:18px;
//   lineHeight:29px;
//   border-bottom: ${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
//   cursor:pointer;
//   &.white{
//     background-color: white;
//   }
// }`
// const NavMenu = styled.div`
// min-width:433px;
// height:300px;
// position:relative;
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
// `
// const MenuText = styled.div`
// font-size:20px;
// font-family:Noto Sans KR;
// font-weight:300;
// text-align:left;
// color: ${props => props.selected ? "#FF0000" : "#707070"};
// border-bottom:${props => props.borderBottom};
// `
// //const Arrow = styled.span`
// //  margin-left:70px;
// //  font-size:15px;
// //`
// const InputBoard = styled.div`
//   width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
//   padding-bottom:100px;
//   margin-bottom:100px;
//   position:relative;
//   padding-top:45px;
//   border-radius:5px;
//   border:8px solid #F5F4F4;
//   .buttonBox{
//     width: max-content;
//     display: flex;
//     justify-content:flex-end;
//     margin-top: 21px;
//     margin-left: auto;
//     padding:10px 0px 10px 10px;
//     position:absolute;
//     right:0px;
//     bottom:0px;
//   }  
// `

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
// const HRline = styled.div`
//   margin-top:100px;
//   margin-bottom:67px;
//   border-bottom:5px solid #F5F4F4;
// `
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

// const scrollmenu_data = [{ txt: "기본 정보", tag: "#basic" }, { txt: "보안", tag: "#security" }, { txt: "부가 정보", tag: "#additional" }];

// class ModifyMyDetail extends Component {
//   constructor(props) {
//     super(props);

//     this.updateNickName = this.updateNickName.bind(this);
//     this.updateIntroduce = this.updateIntroduce.bind(this);
//     this.updateThumbnail = this.updateThumbnail.bind(this);
//     this.updatePassword = this.updatePassword.bind(this);
//     this.updatePasswordCheck = this.updatePasswordCheck.bind(this);
//     this.updateCategory1 = this.updateCategory1.bind(this);
//     this.updateCategory2 = this.updateCategory2.bind(this);
//     this.updateCategory3 = this.updateCategory3.bind(this);
//     this.updateIsDesigner = this.updateIsDesigner.bind(this);
//     this.updateTeam = this.updateTeam.bind(this);
//     this.updateCareer = this.updateCareer.bind(this);
//     this.updateLocation = this.updateLocation.bind(this);
//     this.updateContact = this.updateContact.bind(this);
//     this.updateCareerlist = this.updateCareerlist.bind(this);

//   }

//   /**UPDATE */
//   updateNickName(modifyvalue) {
//     this.setState({ nick_name: modifyvalue })
//   }
//   updateIntroduce(modifyvalue) {
//     this.setState({ about_me: modifyvalue })
//   }
//   updateThumbnail(imgInfo, imgName) {
//     this.setState(state => ({ thumbnail: imgInfo, thumbnail_name: imgName }));
//   }
//   updatePassword(modifyvalue) {
//     this.setState({ password: modifyvalue });
//   }
//   updatePasswordCheck(modifyvalue) {
//     this.setState({ passwordCheck: modifyvalue })
//   }
//   updateCategory1(modifyvalue) {
//     this.setState({ category_level1: modifyvalue, category_level2:null, category_level3:null });
//   }
//   updateCategory2(modifyvalue) {
//     this.setState({ category_level2: modifyvalue, category_level3:null });
//   }
//   updateCategory3(modifyvalue){
//     this.setState({category_level3: modifyvalue});
//   }
//   updateIsDesigner(modifyvalue) {
//     this.setState({ is_designer: modifyvalue });
//   }
//   updateTeam(modifyvalue) {
//     this.setState({ team: modifyvalue });
//   }
//   updateCareer(modifyvalue) {
//     this.setState({ career: modifyvalue });
//   }
//   updateLocation(modifyvalue) {
//     this.setState({ location: modifyvalue });
//   }
//   updateContact(modifyvalue) {
//     this.setState({ contact: modifyvalue });
//   }
//   updateCareerlist(modifyvalue) {
//     this.setState({ careerlist: modifyvalue });
//   }

//   componentDidMount() {
//     document.addEventListener("scroll", this.handleScroll, true);
//     window.addEventListener("resize", this.handleResize, false);
//   }
//   handleScroll = () => {
//     // let sections = document.querySelectorAll("section")
//     document.querySelectorAll("section")
//   }
//   handleResize = () => {
//     this.setState({ screenWidth: window.innerWidth })
//   };
//   scrollMove = (menu, selected) => {
//     this.setState({ selected: selected })
//     window.location.href = menu.tag
//   }

//   componentWillMount() {
//     document.removeEventListener("scroll", this.handleScroll, true)
//   }

//   onChangeValue = async data => {
//     let obj = {};
//     if (data.target) {
//       obj[data.target.name] = data;
//     }
//     await this.setState(obj);

//     if (data && data.target && data.target.name === "nick_name") {
//       if (data.value === this.props.MyDetail.nick_name) {
//         data.validates = ["required", "NotSpecialCharacters"]; //       } else { //         data.validates = ["required", "NotSpecialCharacters", "CheckNickName"]; //       }
//     }
//   };

//   liveCheck = (target) => {
//     FormControl(this.state[target]);
//   };

//   samePwCheck = () => {
//     FormControl({
//       value: [this.state.password.value, this.state.password2.value],
//       target: this.state.password2.target,
//       validates: this.state.password2.validates
//     });
//   }
//   async checkNickname() {
//     const data = { nick_name: this.state.nick_name }
//     let returnvalue = true;
//     await this.props.CheckNickNameRequest(data).then(
//       (res) => {
//         console.log(res, data);
//         if (res.checkNickName === false) {
//           returnvalue = false;
//         }
//       }
//     );
//     //console.log("qwer", returnvalue);
//     return returnvalue;
//   }

//   onSubmit = async e => {
//     e.preventDefault();
//     console.log(this.props);

//     let careerlist = "";
//     this.state.careerlist.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
//       return (
//         careerlist += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
//       );
//     })
//     // console.log(careerlist);
//     // return;
//     let formData = {
//       uid: this.props.uid, nick_name: this.state.nick_name,
//       about_me: this.state.about_me,
//       password: this.state.password,
//       category_level1: this.state.category_level1,
//       category_level2: this.state.category_level2,
//       category_level3: this.state.category_level3,
//       is_designer: this.state.is_designer,
//       // team: this.state.team, career: this.state.career,
//       // location: this.state.location, contact: this.state.contact,
//       change_password: this.state.change_password,
//       careerlist: careerlist,
//       files: [],
//     };

//     let file = {
//       value: this.state.thumbnail,
//       name: this.state.thumbnail_name,
//       key: 0
//     };

//     if (this.state.thumbnail != null) {
//       if (this.state.thumbnail !== "") {
//         formData.files.push(file);
//       }
//     }
//     if (formData.files.length === 0 ||
//       formData.files[0].value === (this.props.MyDetail.profileImg && this.props.MyDetail.profileImg.m_img))
//       delete formData.files;
//     if (this.state.nick_name !== this.props.MyDetail.nick_name) {
//       if (await this.checkNickname() === false) {
//         await alert("중복된 닉네임입니다","확인");
//         return;
//       }
//     }
//     if (this.state.nick_name === "") {
//       await alert("닉네임을 입력해주세요","확인");
//       return;
//     }

//     if (this.state.password) {
//       var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])/;
//       if (!reg_pw.test(this.state.password) || this.state.password.length < 6 || this.state.password.length > 15) {
//         await alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오","확인");
//         return false;
//       }
//       if (this.state.password !== this.state.passwordCheck) {
//         await alert("비밀번호 확인을 다시 해주십시오","확인");
//         return false;
//       }
//       delete formData.passwordCheck;
//     }

//     if (this.state.category_level1 === -1) {
//       await alert("카테고리를 선택해주세요!","확인");
//       return;
//     }

//     // console.log("성공", formData, { ...this.state });
//     // return
//     await this.setState({ loading: true });
//     this.props.UpdateUserDetailRequest(formData, this.props.token)
//       .then(async res => {
//         console.log(res);
//         if (res.success) {
//           await alert("정보가 수정되었습니다.","확인");
//           window.location.href = "/mypage"
//         } else {
//           await alert("다시 시도해주세요","확인");
//           this.setState({ loading: false });
//         }
//       })
//       .catch(e => {
//         //console.log("실패", e);
//         alert(e+"다시 시도해주세요");
//         this.setState({ loading: false });
//       });
//   };
//   onCancal = () => {
//     this.props.history.push('/myPage')
//   }
//   onChangePassword = () => {
//     this.setState({ change_password: true })
//   }


//   render() {
//     const scrollmenu = scrollmenu_data
//     // const { selected } = this.state
//     console.log(this.props.category3);
//     return (<React.Fragment>
//       {this.state.loading ? <Loading /> : null}
//       <MainBanner >
//         <div className="title">내 프로필 수정하기</div>
//       </MainBanner>
//       <MainSection id="basic">
//         {/* scroll - menu */}
//         <NavMenu>
//           <div className="menuBox">
//             {scrollmenu.map((menu, index) => {
//               return (<MenuItem onClick={() => this.scrollMove(menu, index)}
//                 className="menuItem"
//                 borderBottom={index + 1 === scrollmenu.length}
//                 key={menu.txt}>
//                 <MenuText selected={this.state.selected === index}>{menu.txt}</MenuText>
//               </MenuItem>)
//             })}

//           <MenuItem className="white" onClick={this.onDeleteUser}>
//                   <div className="deleteText">탈퇴하기</div>
//           </MenuItem>
//           </div>
//         </NavMenu>

//         {/* form */}
//         <InputBoard isModifyAnother={true}>
//           <SectionBasic updateThumbnail={this.updateThumbnail} updateNickName={this.updateNickName} updateIntroduce={this.updateIntroduce} MyDetail={this.props.MyDetail} />
//           <HRline />
//           <SectionSecurity MyDetail={this.props.MyDetail} updatePassword={this.updatePassword} updatePasswordCheck={this.updatePasswordCheck} />
//           <HRline />
//           <SectionAdditional MyDetail={this.props.MyDetail} category1={this.props.category1} category2={this.props.category2} category3={this.props.category3}
//             updateCategory1={this.updateCategory1} updateCategory2={this.updateCategory2} updateCategory3={this.updateCategory3}/>
//           <HRline />
//           <SectionBuziness MyDetail={this.props.MyDetail} updateCareerlist={this.updateCareerlist} updateIsDesigner={this.updateIsDesigner} updateTeam={this.updateTeam} updateCareer={this.updateCareer} updateLocation={this.updateLocation} updateContact={this.updateContact} />
//           <div className="buttonBox">
//           <BackButton
//                   onClick={async() => 
//                     {    
//                       if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
//                       window.history.go(-1)
//                     }
//                   }}
//                   isComplete={false}>
//                   <BtnText>취소</BtnText>
//             </BackButton> 
//           <CompleteButton id="additional" isComplete={true} onClick={this.onSubmit}><BtnText>수정</BtnText></CompleteButton>
//           </div>
//         </InputBoard>
//       </MainSection>
//     </React.Fragment>)
//   }
// }

// export default ModifyMyDetail;
