import React, { Component } from "react";
import { FormControl } from "modules/FormControl";
import styled from "styled-components";

import SectionBasic from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBasic"
import SectionSecurity from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionSecurity"
import SectionAdditional from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionAdditional"
import SectionBuziness from "components/Users/ModifyMyDetail/ModifyMyDetail/SectionBuziness"
import Loading from "components/Commons/Loading";


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

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    align-items:flex-end;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    align-items:flex-end;
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
const NavMenu = styled.div`
  min-width:433px;
  height:300px;
  position:relative;
  .menuBox{
    width:325px;
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
    border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
    cursor:pointer;
  }
  .deleteText{
    font-family:Noto Sans KR;
    font-size:20px;
    font-family:Noto Sans KR;
    font-weight:500;
    text-align:left;
    color:#FF0000;
    border-bottom:${props => props.borderBottom};
  }

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    display:flex;
    justify-content:center;
    align-items:center;
    .menuBox{
      margin-left:0px;   
      position: static; 
    }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    display:flex;
    justify-content:center;
    align-items:center;
    .menuBox{
      margin-left:0px;  
      position:static;  

    }
  }
`
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
  width:${window.innerWidth>1920?1422+'px':100+'%'};
  padding-bottom:100px;
  margin-bottom:100px;
  position:relative;
  padding-top:45px;
  border-radius:5px;
  border:8px solid #F5F4F4;
  .buttonBox{
    display: flex;
    margin-top: 20.54px;
    justifyContent: flex-end;
  }
`
const CompleteButton = styled.div`
  position:absolute;
  right:9px;
  bottom:35px;
  cursor:pointer;
  width:104.5px;
  height:44px;
  border-radius:5px;
  background-color:${props => props.isComplete ? "#FF0000" : "#707070"};
  padding-top:6px;
  padding-left:15px;
  margin-right:53px;
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

const scrollmenu_data = [{ txt: "기본 정보", tag: "#basic" }, { txt: "보안", tag: "#security" }, { txt: "부가 정보", tag: "#additional" }];

class ModifyMyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_password: false, selected: 0, loading: false,
      thumbnail: "", thumbnail_name: "", nick_name: "", about_me: "",
      password: "", passwordCheck: "",
      category_level1: 0, category_level2: 0,
      is_designer: false, team: "", career: "", location: "", contact: "",screenWidth: window.innerWidth,
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
    console.log("qwer", returnvalue);
    return returnvalue;
  }

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.props);
    let formData = {
      uid: this.props.uid, nick_name: this.state.nick_name,
      about_me: this.state.about_me,
      password: this.state.password,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      is_designer: this.state.is_designer,
      team: this.state.team, career: this.state.career,
      location: this.state.location, contact: this.state.contact,
      change_password: this.state.change_password,
      files: []
    };

    let file = {
      value: this.state.thumbnail,
      name: this.state.thumbnail_name,
      key: 0
    };

    if(this.state.thumbnail!=null)
    {
      if(this.state.thumbnail!="")
      {      
        formData.files.push(file);  
      }
    }
    if (formData.files.length === 0 ||
      formData.files[0].value === (this.props.MyDetail.profileImg && this.props.MyDetail.profileImg.m_img))
      delete formData.files;
    if (this.state.nick_name !== this.props.MyDetail.nick_name) {
      if (await this.checkNickname() === false) {
        alert("중복된 닉네임입니다");
        return;
      }
    }
    if (this.state.nick_name === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (this.state.password) {
      var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])/;
      if (!reg_pw.test(this.state.password) || this.state.password.length < 6 || this.state.password.length > 15) {
        alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오");
        return false;
      }
      if (this.state.password !== this.state.passwordCheck) {
        alert("비밀번호 확인을 다시 해주십시오");
        return false;
      }
      delete formData.passwordCheck;
    }

    if (this.state.category_level1 === -1) {
      alert("카테고리를 선택해주세요!");
      return;
    }

    // console.log("성공", formData, { ...this.state });
    // return
    await this.setState({ loading: true });
    this.props.UpdateUserDetailRequest(formData, this.props.token)
      .then(res => {
        console.log(res);
        if (res.success) {
          alert("정보가 수정되었습니다.");
          window.location.href = "/mypage"
        } else {
          alert("다시 시도해주세요");
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log("실패", e);
        alert("다시 시도해주세요");
        this.setState({ loading: false });
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
    const scrollmenu = scrollmenu_data
    // const { selected } = this.state

    return (<React.Fragment>
      {this.state.loading ? <Loading /> : null}
      <MainBanner >
        <div className="title">내 프로필 수정하기</div>
      </MainBanner>
      <MainSection id="basic">
        {/* scroll - menu */}
        <NavMenu>
          <div className="menuBox">
            {scrollmenu.map((menu, index) => {
              return (<div onClick={() => this.scrollMove(menu, index)}
                className="menuItem"
                borderBottom={index + 1 === scrollmenu.length}
                key={menu.txt}>
                <MenuText selected={this.state.selected === index}>{menu.txt}</MenuText>
              </div>)
            })}
          </div>
        </NavMenu>

        {/* form */}
        <InputBoard isModifyAnother={true}>
          <SectionBasic updateThumbnail={this.updateThumbnail} updateNickName={this.updateNickName} updateIntroduce={this.updateIntroduce} MyDetail={this.props.MyDetail} /> 
          <HRline />
          <SectionSecurity MyDetail={this.props.MyDetail} updatePassword={this.updatePassword} updatePasswordCheck={this.updatePasswordCheck} />
          <HRline />
          <SectionAdditional MyDetail={this.props.MyDetail} category1={this.props.category1} category2={this.props.category2}
            updateCategory1={this.updateCategory1} updateCategory2={this.updateCategory2} />
          <HRline />
          <SectionBuziness MyDetail={this.props.MyDetail} updateIsDesigner={this.updateIsDesigner} updateTeam={this.updateTeam} updateCareer={this.updateCareer} updateLocation={this.updateLocation} updateContact={this.updateContact} />
          <CompleteButton id="additional" isComplete={true} onClick={this.onSubmit}><BtnText>수정</BtnText></CompleteButton>
        </InputBoard>
      </MainSection>
    </React.Fragment>)
  }
}

export default ModifyMyDetail;
