import React, { Component } from "react";
import noimg from "source/noimg.png"
import styled from "styled-components";
import SectionBasic from "components/Groups/ModifyGroupInfo/SectionBasic"
import { Modal } from "semantic-ui-react";
import iDelete from "source/deleteItem.png"
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }]

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
  // background-color:#F5F4F4;
  border-radius:5px;
}
.menuItem{
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  background-color:#F5F4F4;
  border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  cursor:pointer;
}
.deleteMenuItem{
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  background-color:#FFFFFF;
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
const InputBoard = styled.div`
width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
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

// warning : never used
//const CheckModal = styled(Modal)`
//      box-shadow:0px 3px 6px #000000;
//      position:relative;
//      width:576px;
//      height:200px;
//      text-align:center;
//      bottom:318px;
//      .messageText{
//        width:100%;
//        height:69px;
//        font-family:Noto Sans KR;
//        font-size:20px;
//        color:#707070;
//        line-height:40px;
//        margin-top:35px;
//        margin-bottom:31px;
//      }
//      .okButton{
//        cursor:pointer;
//        width:100%;
//        height:29px;
//        font-family:Noto Sans KR;
//        font-size:20px;
//        text-decoration:underline;
//        color:#FF0000;
//      }
//      .closeButton{
//        cursor:pointer;
//        position:absolute;
//        right:-50px;
//        top:0px;
//        width:22px;
//        height:22px;
//        background-image:${iDelete};
//        background-size:cover;
//        background-position:center center;
//      }
//`
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
`;
class CreateGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteDialog: false, isDelete: false,
      groupThumbnail: "", groupTitle: "", groupExplain: "", groupThumbnailURL: "", groupThumbnailName: "",
      loading: false, isPossibleNextStep: false, step: 0, /* 0: basics, 1: additional, 2: contents*/ selectedCate1: null,
      selectedCate2: null, cate1: null, cate2: null
    }
    this.handleInputDesignExplain = this.handleInputDesignExplain.bind(this);
    this.handleInputDesignTitle = this.handleInputDesignTitle.bind(this);
    this.handleChangeThumbnail = this.handleChangeThumbnail.bind(this);
    this.handleChangeThumbnailURL = this.handleChangeThumbnailURL.bind(this);
    this.handleOnClickDeleteDesign = this.handleOnClickDeleteDesign.bind(this);
    this.cancelDeleteGroup = this.cancelDeleteGroup.bind(this);

  }
  // setLoader = () => { this.setState({ loading: !this.state.loading }) }
  componentDidMount() {
    this.setState({
      groupTitle: this.props.GroupDetail.title,
      groupThumbnail: this.props.GroupDetail.img == null ? noimg : this.props.GroupDetail.img.m_img,
      groupExplain: this.props.GroupDetail.explanation
    });
  }
  shouldComponentUpdate(nextProps) {

    if (this.props.GroupDetail !== nextProps.GroupDetail) {
      console.log("nextprops", nextProps)

      this.setState({
        groupTitle: nextProps.GroupDetail.title,
        groupThumbnail: nextProps.GroupDetail.img == null ? noimg : nextProps.GroupDetail.img.m_img,
        groupExplain: nextProps.GroupDetail.explanation
      });
    }

    return true;
  }
  handleInputDesignTitle(title) {
    console.log("titleinput");
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
  checkIsPossibleToGoNextStep = (step) => {

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
  completeCreateDesign = () => {
    this.submit();
  }
  submit = () => {
  }

  completed = () => {
    this.setState({ isPossibleNextStep: true })
  }
  deleteGroup = () => {

    this.props.DeleteGroupRequest(this.props.id, this.props.token)
      .then(data => {
        this.props.history.push("/group");
      });

  }
  cancelDeleteGroup = () => {
    this.setState({ isDelete: !this.state.isDelete });
  }

  onSubmit = async e => {
    const warning = "필수 입력항목을 모두 입력하지 않아 작업을 완료할 수 없습니다.\n";
    if (this.state.groupThumbnail === "" || this.state.groupThumbnail == null) {
      await alert(warning + "섬네일 이미지를 등록해주세요", "확인");
      return;
    }
    else if (this.state.groupTitle === "" || this.state.groupTitle == null) {
      await alert(warning + "그룹의 이름을 입력해주세요", "확인");
      return;
    }
    // else if (this.state.groupExplain === "" || this.state.groupExplain == null) {
    //   alert("그룹 설명을 작성해주세요!");
    //   return;
    // }
    e.preventDefault();
    let data = {
      user_id: this.props.userInfo.uid, uid: this.props.GroupDetail.uid,
      title: this.state.groupTitle, explanation: this.state.groupExplain, files: []
    };
    let file = {
      value: this.state.groupThumbnail,
      name: this.state.groupThumbnailName,
      key: 0
    };
    data.files.push(file);

    if (data.files.length <= 0 ||
      data.files[0].value === this.props.GroupDetail.img.m_img) delete data.files;

    this.props.UpdateGroupRequest(this.props.id, data, this.props.token)
      .then(async (res) => {
        if (res.data && res.data.success === true) {
          await alert("정보가 수정되었습니다.", "확인");
          this.props.history.push(`/groupDetail/${this.props.id}`);
        } else {
          await alert("다시 시도해주세요", "확인");
          this.setState({
            loading: false
          });
        }
      });
  };
  handleOnClickDeleteDesign() {
    this.setState({ isDelete: !this.state.isDelete })
  }


  render() {
    const { step } = this.state

    const DeleteGroupModal = () => {
      return (
        <Modal open={this.state.isDelete} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
          <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.groupTitle}를<br />삭제하시겠습니까?</div>
          <div style={{ cursor: "pointer", width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px" }}>
            <span style={{ color: "#707070" }} onClick={this.cancelDeleteGroup}>취소</span>
            <span style={{ marginRight: "10px", color: "#FF0000" }} onClick={this.deleteGroup}>확인</span>
          </div>
          <div onClick={this.handleOnClickDeleteDesign} style={{ cursor: "pointer", position: "absolute", right: "-50px", top: "0px", width: "22px", height: "22px", backgroundImage: `url(${iDelete})`, backgroundSize: "cover", backgroundPosition: "center center" }}></div>
        </Modal>
      );
    }

    return (<React.Fragment>

      <MainBanner>
        <div className="title">그룹 수정하기</div>
      </MainBanner>

      <MainSection>
        {/* scroll - menu */}
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
            <div className="deleteMenuItem" onClick={this.handleOnClickDeleteDesign}>
              <div className="deleteText">그룹 삭제하기</div>
            </div>
          </div>
        </NavMenu>
        {/* form */}
        <InputBoard>
          <form>

            {step === 0 &&
              <SectionBasic
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
            {/* buttons*/}
            <div className="buttonBox">
              <CompleteButton isComplete={true}
                onClick={this.onSubmit} >
                <BtnText>수정</BtnText>
              </CompleteButton>
            </div>
          </form>
        </InputBoard>
        <DeleteGroupModal />
      </MainSection>
    </React.Fragment>)
  }
}

export default CreateGroup;
