import React, { Component } from "react";
import { FormControl } from "modules/FormControl";
import styled from "styled-components";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
// import { alert } from "components/Commons/Alert/Alert";
import { SetSession } from 'modules/Sessions';


import UserThumbnail from "components/Users/ModifyMyDetail_mobile/UserThumbnail";
import SectionBasic from "components/Users/ModifyMyDetail_mobile/NewSectionBasic";
import SectionSecurity from "components/Users/ModifyMyDetail_mobile/NewSectionSecurity";
import SectionAdditional from "components/Users/ModifyMyDetail_mobile/NewSectionAdditional";
import SectionBuziness from "components/Users/ModifyMyDetail_mobile/NewSectionBuziness";


const Wrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .content{
    max-width:360px;
    width:100%;
  }

  .deleteUser{
    width:100%;
    text-align:right;
    padding:10px;
    color:red;
  }
`
const Profile = styled.div`
  .header{
    width:100%;
    height:40px;
    display:flex;
    align-items:center;
    padding:0px 8px 0px 44px;
    justify-content:space-between;
    .nickname{width:200px;height:38px;font-family:Spoqa Han Sans;font-weight:800;font-size:26px;            
              display:flex;align-items:center;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
    .button_wrap{display:flex;}
    .button{width:40px;height:26px;box-shadow: 0px 0px 5px 0px #ABABAB;
            display:flex;justify-content:center;align-items:center;font-weight:500;}
    .red{background-color:red;color:white;}
    .grey{background-color:#c2c2c2;color:black;}        
  }
  .main{

    width:100%;
    height:177px;
    background-color:#dcdcdc;
    padding:12px 8px 6px 12px;
    font-family:Spoqa Han Sans;
    .flex{display:flex;}
    .title{width:56px;height:22px;display:flex;align-items:center;
           font-size:15px;font-weight:700;color:#777777;margin-right:12px;}
  }
  .miniText{color:#777777; width:100%;height:11px;text-align:center; font-family:Spoqa Han Sans Neo;font-size:7px;font-size:8px;}

`
const Info = styled.div`
  width:100%;
  font-family:Spoqa Han Sans;
  .title{width:159px;font-size:15px;font-weight:800;}
  .exp_title{width:65px;font-size:15px;font-weight:800;}
  .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
  .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
  .checked{width:24px;height:24px;}
  .careerBox{margin-top:25px;}

`
const DropDown = styled.div`
    position: relative; 
        
    select {
      margin: 0px;
      padding: 0px;
      padding-left: 4px;
      font-size: 14px;
      width: 174px;
      height: 23px;
      background-color: #C9C9C9;
      border: none;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .select-arrow {
      position: absolute;
      top: 5px;
      right: 4px;
      width: 0px;
      height: 0px;
      pointer-events: none;
      border-style: solid;
      border-width: 14px 8px 0 8px;
      border-color: #000000 transparent transparent transparent;
    }
`
const Hrline = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  border-top:2px solid #dcdcdc;
  margin-left:auto;
  margin-right:auto;
`
const InputText = styled.input`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:0px 6px;
    border:none;
    outline:none;
`
const InputTextArea = styled.textarea`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:6px;
    border:none;
    outline:none;
`


const scrollmenu_data = [{ txt: "기본 정보", tag: "#basic" }, { txt: "보안", tag: "#security" }, { txt: "부가 정보", tag: "#additional" }];

class ModifyMyDetail_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_password: false, selected: 0, loading: false,
      thumbnail: "", thumbnail_name: "", nick_name: "", about_me: "",
      password: "", passwordCheck: "",
      category_level1: 7, category_level2: 27, category_level3: 0,
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
    return returnvalue;
  }

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.props);
    // return;
    let careerlist = "";
    this.state.careerlist.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
      return (
        careerlist += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
      );
    })
    let formData = {
      uid: this.props.uid, nick_name: this.state.nick_name,
      about_me: this.state.about_me,
      password: this.state.password,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      category_level3: this.state.category_level3,
      is_designer: this.state.is_designer,
      change_password: this.state.change_password,
      careerlist: careerlist,
      files: [],
    };
    // console.log(formData);
    // return;
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
    if (formData.files.length === 0 || formData.files[0].value === (this.props.MyDetail.profileImg && this.props.MyDetail.profileImg.l_img)) {
      delete formData.files;
    }
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

    await this.setState({ loading: true });
    this.props.UpdateUserDetailRequest(formData, this.props.token)
      .then(async res => {
        console.log(res);
        if (res.success) {
          await alert("정보가 수정되었습니다.", "확인");
          window.location.href = "/myPage"
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

  onBack = async () => {

    if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
      window.history.go(-1);
    }
  }


  render() {
    const scrollmenu = scrollmenu_data;
    const { MyDetail } = this.props;

    return (
      <Wrapper>
      <div className="content">
      <Profile> 
          <div className="header">
            <div className="nickname">{this.props.MyDetail.nick_name}</div>
            <div className="button_wrap">
              <a onClick={this.onBack}><div className="grey button" style={{marginRight:"10px"}}>취소</div></a>
              <a onClick={this.onSubmit}><div className="red button">저장</div></a>
            </div>
          </div>
          <div className="main">
            <div className="flex">
              <UserThumbnail MyDetail={MyDetail} updateThumbnail={this.updateThumbnail}/>
              <SectionBasic
                updateNickName={this.updateNickName}
                updateIntroduce={this.updateIntroduce}
                MyDetail={this.props.MyDetail}
              />
            </div>
          <div className="miniText" style={{marginTop:"6px"}}>프로필 사진은 대표 사진으로, JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
          </div>
      </Profile>
      <Hrline width={200} style={{marginTop:"37px"}}/>
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
        category_level1={this.state.category_level1}
        category_level2={this.state.category_level2}
        category_level3={this.state.category_level3}
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
      <div className="deleteUser" onClick={this.onDeleteUser}>탈퇴하기</div>
      </div>
      </Wrapper>
    );
  }
}

export default ModifyMyDetail_mobile;

{/* <Wrapper id="basic">

{this.state.loading ? <Loading /> : null}

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

<ModifyForm >
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
    <a onClick={this.onBack}>
      <Button backgroundColor={"#CCCCCC"}>
        <ButtonText className="black">취소</ButtonText>
      </Button>
    </a>

    <a onClick={this.onSubmit}>
      <Button backgroundColor={"#FF0000"}>
        <ButtonText className="white">수정</ButtonText>
      </Button>
    </a>

  </div>

</ModifyForm>
</Wrapper > */}



// <Wrapper>
// <div className="content">
// <Profile> 
//     <div className="header">
//       <div className="nickname">{this.props.MyDetail.nick_name}</div>
//       <div className="button_wrap">
//         <a onClick={this.onBack}><div className="grey button" style={{marginRight:"10px"}}>취소</div></a>
//         <a onClick={this.onSubmit}><div className="red button">저장</div></a>
//       </div>
//     </div>
//     <div className="main">
//       <div className="flex">
//         <UserThumbnail MyDetail={MyDetail} updateThumbnail={this.updateThumbnail}/>
//         <section style={{marginLeft:"12px"}}>
//           <div className="flex"><div className="title">닉네임</div><InputText type="text" width="174" height="22"/></div>
//           <div className="flex" style={{marginTop:"14px"}}><div className="title">자기소개</div><InputTextArea width="174" height="98"/></div>
//         </section>
//       </div>
//     <div className="miniText" style={{marginTop:"6px"}}>프로필 사진은 대표 사진으로, JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
//     </div>
// </Profile>
// <Hrline width={200} style={{marginTop:"37px"}}/>
// <Info>
//   <div className="row">
//     <div className="title">비밀번호</div>
//     <InputText type="text" width="174" height="22"/>
//   </div>
//   <div className="row">
//     <div className="title">비밀번호 확인</div>
//     <InputText type="text" width="174" height="22"/>
//   </div>
//   <Hrline style={{marginTop:"15px"}}/>
//   <div className="row">
//       <div className="title">카테고리</div>
//       <DropDown>
//       <select
//         id="cate1"
//         value={this.state.category_level1} >
//         {this.state.category_level1 == null
//           ? <option selected disabled value>{"카테고리(필수)"}</option>
//           : null}
//         {this.props.category1.map((cate1, index) =>
//           <option
//             selected={this.state.category_level1 === cate1.value}
//             value={cate1.value}
//             key={index}>
//             {cate1.text}
//           </option>
//         )}
//       </select>
//       <div className="select-arrow"/>
//     </DropDown>
//   </div>
//   <div className="row">
//     <div className="title"/>
//     <DropDown>
//       <select
//         id="cate2"
//         value={this.state.category_level2} >
//         {this.state.category_level2 == null
//           ? <option selected disabled value>{"카테고리(필수)"}</option>
//           : null}
//         {this.props.category2.map((cate2, index) =>
//           <option
//             selected={this.state.category_level2 === cate2.value}
//             value={cate2.value}
//             key={index}>
//             {cate2.text}
//           </option>
//         )}
//       </select>
//       <div className="select-arrow"/>
//     </DropDown>
//   </div>
//   <div className="row">
//     <div className="title"/>
//     <DropDown>
//       <select
//         id="cate3"
//         value={this.state.category_level3} >
//         {this.state.category_level3 == null
//           ? <option selected disabled value>{"카테고리(필수)"}</option>
//           : null}
//         {this.props.category3.map((cate3, index) =>
//           <option
//             selected={this.state.category_level3 === cate3.value}
//             value={cate3.value}
//             key={index}>
//             {cate3.text}
//           </option>
//         )}
//       </select>
//       <div className="select-arrow"/>
//     </DropDown>
//   </div>
//   <Hrline style={{marginTop:"15px"}}/>
//   <div className="row">
//     <div className="title">디자이너 활동 여부</div>
//     <a onClick={this.updateIsDesigner}>
//               {this.state.is_designer ? <img className="checked" src={checkedIcon} style={{opacity:"0.7"}}/> : <img className="checked" src={uncheckedIcon} style={{opacity:"0.7"}} />}
//     </a>
//   </div>
//   <Hrline style={{marginTop:"15px"}}/>
//   <div >
//       <div className="row"><div className="title">경험</div></div>
//       <div className="wrapper_noflex ">
//         {this.state.careerlist.map((item, index) => {
//           return (
//             <div className="careerBox">
//               <div className="row2"><div className="exp_title">번호</div><div className="exp_title">{parseInt(item.number, 10) + 1}</div></div>
//               <div className="row"><div className="exp_title">업무</div><InputText width="270" height="22"/></div>
//               <div className="row"><div className="exp_title">기간</div><InputText width="270" height="22"/></div>
//               <div className="row"><div className="exp_title">내용</div><InputText width="270" height="22"/></div>
//             </div>
//           );
//         })}
//         <div className="row">
//           <div/>
//           <img src={plusIcon}/>
//         </div>
//       </div>
//   </div>
//   <Hrline width="200" style={{marginBottom:"35px"}}/>
// </Info>
// </div>
// </Wrapper>