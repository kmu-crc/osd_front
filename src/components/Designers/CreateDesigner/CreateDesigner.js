import React, { Component } from "react";
import { FormControl } from "modules/FormControl";

// import { FormControl, ValidationGroup } from "modules/FormControl";
// import SelectBox from "components/Commons/SelectBox"
// import showPw from "source/show_password.svg";
// import styled from "styled-components";

import SectionBasic from "components/Designers/CreateDesigner/ModifyMyDetail/SectionBasic"
import SectionAdditional from "components/Designers/CreateDesigner/ModifyMyDetail/SectionAdditional"
import SectionBuziness from "components/Designers/CreateDesigner/ModifyMyDetail/SectionBuziness"

const scrollmenu_data = [
  { txt: "기본 정보", tag: "#basic" }, { txt: "부가 정보", tag: "#additional" }
]

//const colorSwich = ['#FFFFFF', '#FF0000'];
class ModifyMyDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      change_password: false, selected: 0, loading: false, isClickModify: false,
      thumbnail: "", nick_name: "", about_me: "",
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

    this.handleClickModifyMyProfile = this.handleClickModifyMyProfile.bind(this);

  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail && this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        thumbnail: nextProps.MyDetail.profileImg && nextProps.MyDetail.profileImg.m_img == null ? "" : nextProps.MyDetail.profileImg && nextProps.MyDetail.profileImg.m_img,
        nick_name: nextProps.MyDetail.nick_name == null ? "" : nextProps.MyDetail.nick_name,
        about_me: nextProps.MyDetail.about_me == null ? "" : nextProps.MyDetail.about_me,
        password: "", passwordCheck: "",
      });
    }
    return true;
  }
  handleClickModifyMyProfile() {
    this.setState({ isClickModify: !this.state.isClickModify });
  }
  /**UPDATE */
  updateNickName(modifyvalue) {
    this.setState({ nick_name: modifyvalue })
  }
  updateIntroduce(modifyvalue) {
    this.setState({ about_me: modifyvalue })
  }
  updateThumbnail(modifyvalue) {
    this.setState({ thumbnail: modifyvalue });
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
    //let sections = document.querySelectorAll("section")
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

  onSubmit = async e => {
    e.preventDefault();

    let formData = this.state;

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

    //ValidationGroup(formData, false).then(async data => {
    // console.log("성공", {...this.state});
    // return
    await this.setState({ loading: true });
    this.props.UpdateUserDetailRequest(formData, this.props.token)
      .then(res => {
        if (res.success) {
          alert("정보가 수정되었습니다.");
          //this.props.history.push(`/`);
          window.location.href = "/";
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
          <div style={{ position: "fixed", top: "197px", width: "325px", height: "62px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
            <div onClick={this.handleClickModifyMyProfile} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", paddingTop: "18px", paddingLeft: "36px", backgroundColor: this.state.isClickModify === true ? "#707070" : "#F5F4F4", borderRadius: "5px" }}>
              <div style={{ color: this.state.isClickModify === true ? "#FFFFFF" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>
                내 프로필 수정하기      {this.state.isClickModify === true ? <span style={{ marginLeft: "70px", fontSize: "15px" }}>▼</span> : <span style={{ marginLeft: "70px", fontSize: "15px" }}>▲</span>}
              </div>
            </div>
          </div>
          {this.state.isClickModify &&
            <div style={{ position: "fixed", top: "261px", width: "325px", height: "126px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
              {scrollmenu.map((menu, index) => {
                return (<div onClick={() => this.scrollMove(menu, index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                  <div style={{ color: selected === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
                </div>)
              })}
            </div>
          }
        </div>
        {/* form */}
        <div style={{ width: "1422px", marginLeft: "45px", height: "2104px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "46px", fontFamily: "Noto Sans KR" }}>
          <form>
            {this.state.isClickModify &&
              <React.Fragment>
                <SectionBasic updateThumbnail={this.updateThumbnail} updateNickName={this.updateNickName} updateIntroduce={this.updateIntroduce} MyDetail={this.props.MyDetail} />
                <div style={{ marginTop: "100.5px", marginBottom: "67.5px", borderBottom: "5px solid #F5F4F4" }} />
              </React.Fragment>
            }

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
