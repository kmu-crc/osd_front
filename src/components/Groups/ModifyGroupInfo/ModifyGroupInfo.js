import React, { Component } from "react";
import noimg from "source/noimg.png"
import styled from "styled-components";
import SectionBasic from "components/Groups/ModifyGroupInfo/SectionBasic"
import { Modal } from "semantic-ui-react";
import iDelete from "source/deleteItem.png"

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }]

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
`
const MainSection = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 111px;
`

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
    border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
    cursor:pointer;

  }
    .menuText{
      font-size:20px;
      font-family:Noto Sans KR;
      font-weight:300;
      text-align:left;
      color: ${props => props.selected ? "#707070" : "#FF0000"};
      border-bottom:${props => props.borderBottom};
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
`
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
      .completeBtn{
        position:absolute;
        right:9px;
        bottom:35px;
        cursor:pointer;
        width:104.5px;
        height:44px;
        border-radius:5px;
        background-color:#FF0000;
        padding-top:6px;
        padding-left:15px;
        margin-right:53px;
      }
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

  onSubmit = async e => {
    if (this.state.groupThumbnail === "" || this.state.groupThumbnail == null) {
      alert("그룹의 섬네일을 지정해주세요.");
      return;
    }
    else if (this.state.groupTitle === "" || this.state.groupTitle == null) {
      alert("그룹 이름을 작성해주세요!");
      return;
    }
    else if (this.state.explanation === "" || this.state.explanation == null) {
      alert("그룹 설명을 작성해주세요!");
      return;
    }
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
      .then(res => {
        if (res.data && res.data.success === true) {
          alert("정보가 수정되었습니다.");
          this.props.history.push(`/groupDetail/${this.props.id}`);
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      });
  };
  handleOnClickDeleteDesign() {
    if (this.state.isDelete === true) {
      this.setState({ isDelete: !this.state.isDelete })
    }
    else {
      this.setState({ isDelete: !this.state.isDelete })
    }

  }
  render() {
    const { step } = this.state

    const DeleteGroupModal = () => {
      return (
        <Modal open={this.state.isDelete} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
          <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.groupTitle}를<br />삭제하시겠습니까?</div>
          <div onClick={this.deleteGroup} style={{ cursor: "pointer", width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", textDecoration: "underline", color: "#FF0000" }}>네, 삭제합니다</div>
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
                  <div className="menuText" selected={this.state.step === index}>{menu.txt}</div>
                </div>)
            })}
            <div className="menuItem" onClick={this.handleOnClickDeleteDesign}>
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
              <div className="completeBtn"
                onClick={this.onSubmit} >
                <BtnText>완료</BtnText>
              </div>
            </div>
          </form>
        </InputBoard>
        <DeleteGroupModal />
      </MainSection>
    </React.Fragment>)
  }
}

export default CreateGroup;
