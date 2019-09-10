import React, { Component } from "react";
import { FormControl } from "modules/FormControl";
//import { FormControl, ValidationGroup } from "modules/FormControl";
// import SelectBox from "components/Commons/SelectBox"
// import showPw from "source/show_password.svg";
// import styled from "styled-components";

import SectionBasic from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBasic"
import SectionSecurity from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionSecurity"
import SectionAdditional from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionAdditional"
import SectionBuziness from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBuziness"

const scrollmenu_data = [
  { txt: "기본 정보", tag: "#basic" }, { txt: "보안", tag: "#security" }, { txt: "부가 정보", tag: "#additional" }
]

//const colorSwich = ['#FFFFFF', '#FF0000'];
class ModifyMyDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      change_password: false, selected: 0, loading: false,
      thumbnail: "",thumbnail_name:"", nick_name: "", about_me: "",
      password: "", passwordCheck: "",
      category_level1: 0, category_level2: 0,
      is_designer: false, team: "", career: "", location: "", contact: "",
    }
    this.updateNickName = this.updateNickName.bind(this);
    this.updateIntroduce = this.updateIntroduce.bind(this);
    this.updateThumbnail = this.updateThumbnail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordCheck = this.updatePasswordCheck.bind(this);
    this.updateCategory1 = this.updateCategory1.bind(this);
    this.updateCategory2 = this.updateCategory2.bind(this);
    this.updateIsDesigner = this.updateIsDesigner.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.updateCareer = this.updateCareer.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateContact = this.updateContact.bind(this);
    
  }

  /**UPDATE */
  updateNickName(modifyvalue) {
    this.setState({ nick_name: modifyvalue })
  }
  updateIntroduce(modifyvalue) {
    this.setState({ about_me: modifyvalue })
  }
  updateThumbnail(imgInfo,imgName)
  {
    this.setState(state=>({thumbnail:imgInfo,thumbnail_name:imgName}));
  }
  updatePassword(modifyvalue) {
    this.setState({ password: modifyvalue });
  }
  updatePasswordCheck(modifyvalue) {
    this.setState({ passwordCheck: modifyvalue })
  }
  updateCategory1(modifyvalue) {
    this.setState({ category_level1: modifyvalue });
  }
  updateCategory2(modifyvalue) {
    this.setState({ category_level2: modifyvalue });
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

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll, true)
  }
  handleScroll = () => {
   // let sections = document.querySelectorAll("section")
    document.querySelectorAll("section")
  }
  scrollMove = (menu, selected) => {
    this.setState({ selected: selected })
    window.location.href = menu.tag
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
  async checkNickname()
  {
      const data = {nick_name:this.state.nick_name}
      let returnvalue = true;
      await this.props.CheckNickNameRequest(data).then(
          (res)=>{
              console.log(res, data);
              if(res.checkNickName===false)
              {                   
                  returnvalue = false;
              }
          }
      );
      console.log("qwer",returnvalue);
      return returnvalue;
  }

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.props);
    let formData = {uid:this.props.uid,nick_name:this.state.nick_name,
                    about_me:this.state.about_me,
                    password:this.state.password,
                    category_level1:this.state.category_level1,
                    category_level2:this.state.category_level2,
                    is_designer:this.state.is_designer,
                    team:this.state.team,career:this.state.career,
                    location:this.state.location,contact:this.state.contact,
                    change_password:this.state.change_password,
                    files:[]};

    let file = {
      value: this.state.thumbnail,
      name: this.state.thumbnail_name,
      key: 0
    };
    formData.files.push(file);
    
    if(formData.files.length<=0||
      formData.files[0].value === this.props.MyDetail.profileImg.m_img)delete formData.files;
    if(this.state.nick_name!==this.props.MyDetail.nick_name)
    {
      if(await this.checkNickname()===false)
      {
          alert("중복된 닉네임입니다");
          return;
      }
    }
    if(this.state.nick_name=="")
    {
          alert("닉네임을 입력해주세요");
          return;
    }

    if (this.state.password) {
      var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*<>?])/;
      if (!reg_pw.test(formData.password.value) || formData.password.value.length < 6 || formData.password.value.length > 15) {
        alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오");
        return false;
      }
      if (this.state.password !== this.state.passwordCheck) {
        alert("비밀번호 확인을 다시 해주십시오");
        return false;
      }
      delete formData.passwordCheck;
    }

    if(this.state.category_level1 ===-1)
    {
      alert("카테고리를 선택해주세요!");
      return;
    }

    //ValidationGroup(formData, false).then(async data => {
    // console.log("성공", {...this.state});
    // return
    await this.setState({ loading: true });
    this.props.UpdateUserDetailRequest(formData, this.props.token)
      .then(res => {
        console.log(res);
        if (res.success) {
          alert("정보가 수정되었습니다.");
          //this.props.history.push(`/`);
          window.location.href="/"
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      })
      .catch(e => {
        console.log("실패", e);
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
  };
  onCancal = () => {
    this.props.history.push('/myPage')
  }
  onChangePassword = () => {
    this.setState({ change_password: true })
  }
  onDeleteUser = () => {
    let confirm = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirm) {
      this.props.SecessionRequest(this.props.token);
    }
  }


  render() {
    // const myInfo = this.props.MyDetail;
    const scrollmenu = scrollmenu_data
    const { selected } = this.state

    return (<>
      <div style={{ width: "1920px", display: "flex", justifyContent: "center" }}>
        <div id="basic" style={{ marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }}>내 프로필 수정하기</div>
      </div>

      <div style={{ display: "flex", marginTop: "60px", marginBottom: "111px" }}>
        {/* scroll - menu */}
        <div style={{ width: "325px", marginLeft: "64px" }}>
          <div style={{ position: "fixed", top: "197px", width: "325px", height: "190px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
            {scrollmenu.map((menu, index) => {
              return (<div onClick={() => this.scrollMove(menu, index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                <div style={{ color: selected === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
              </div>)
            })}
          </div>
        </div>
        {/* form */}
        <div style={{ width: "1422px", marginLeft: "45px", height: "2104px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "46px", fontFamily: "Noto Sans KR" }}>
          <form>
            <SectionBasic updateThumbnail={this.updateThumbnail} updateNickName={this.updateNickName} updateIntroduce={this.updateIntroduce} MyDetail={this.props.MyDetail} />
            <div style={{ marginTop: "100.5px", marginBottom: "67.5px", borderBottom: "5px solid #F5F4F4" }} />
            <SectionSecurity MyDetail={this.props.MyDetail} updatePassword={this.updatePassword} updatePasswordCheck={this.updatePasswordCheck} />
            <div style={{ marginTop: "101.5px", marginBottom: "67.5px", borderBottom: "5px solid #F5F4F4" }} />
            <SectionAdditional MyDetail={this.props.MyDetail} category1={this.props.category1} category2={this.props.category2}
              updateCategory1={this.updateCategory1} updateCategory2={this.updateCategory2} />
            <div style={{ marginTop: "102.5px", marginBottom: "41.5px", borderBottom: "5px solid #F5F4F4" }} />
            <SectionBuziness MyDetail={this.props.MyDetail}
              updateIsDesigner={this.updateIsDesigner}
              updateTeam={this.updateTeam} updateCareer={this.updateCareer} updateLocation={this.updateLocation} updateContact={this.updateContact} />
          </form>
          <div onClick={this.onSubmit} style={{
            cursor: "pointer", display: "table-cell", position: "relative", left: "1264.5px", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", color: "#FFFFFF", fontSize: "20px", fontWeight: "500"
            , textAlign: "center", verticalAlign: "middle"
          }}>등록하기</div>
        </div>
      </div>
    </>)
  }
}

export default ModifyMyDetail;
