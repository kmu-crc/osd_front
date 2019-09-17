import React, { Component } from "react";
import noimg from "source/noimg.png"

import BasicInfo from "components/Groups/CreateGroup/BasicInfo"
// import AdditionalInfo from "components/Groups/CreateGroup/AdditionalInfo"
// import { userInfo } from "os";
import { Modal } from "semantic-ui-react";
import iDelete from "source/deleteItem.png"

// const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }, { txt: "부가 정보", tag: "#additional" }]

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }]


const Main_Banner = { width: "1920px", display: "flex", justifyContent: "center" }
const Main_Banner_text = { marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }
const Main_Section = { display: "flex", marginTop: "60px", marginBottom: "111px" }
//const Menu_Delete={position:"fixed", top:"349px",left:"100px",width:"150px",height:"29px",fontFamily: "Noto Sans KR",fontWeight:"500",fontSize:"20px",color:"#FF0000"}
//const Btn_Back = { position:"absolute",right:"54px",bottom:"35px",border:"1px solid black",cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px"}
//const Btn_Next ={ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }
const Btn_text = { width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }
const modify_Menu_Delete = { position: "fixed", top: "280px", left: "100px", width: "150px", height: "29px", cursor: "pointer", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "20px", color: "#FF0000" }

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
  componentDidMount()
  {
    this.setState({groupTitle:this.props.GroupDetail.title,
      groupThumbnail:this.props.GroupDetail.img==null?noimg:this.props.GroupDetail.img.m_img,
      groupExplain:this.props.GroupDetail.explanation});
  }
  shouldComponentUpdate(nextProps)
  {
    
      if(this.props.GroupDetail!==nextProps.GroupDetail)
      {
        console.log("nextprops",nextProps)

          this.setState({groupTitle:nextProps.GroupDetail.title,
            groupThumbnail:nextProps.GroupDetail.img==null?noimg:nextProps.GroupDetail.img.m_img,
            groupExplain:nextProps.GroupDetail.explanation});
      }
    
      return true;
  }
  handleInputDesignTitle(title)
  {
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

    if(this.state.groupThumbnail=="")
    {
      alert("그룹의 섬네일을 지정해주세요.");
      return;
    }
    else if(this.state.groupTitle=="")
    {
      alert("그룹 이름을 작성해주세요!");
      return;
    }
    else if(this.state.explanation=="")
    {
      alert("그룹 설명을 작성해주세요!");
      return;
    }
    // console.log("this.props",this.props);return;
    e.preventDefault();
    let data = {user_id:this.props.userInfo.uid,uid:this.props.GroupDetail.uid,
      title:this.state.groupTitle,explanation:this.state.groupExplain,files:[]};
      let file = {
        value: this.state.groupThumbnail,
        name: this.state.groupThumbnailName,
        key: 0
      };
      data.files.push(file);

      if(data.files.length<=0||
        data.files[0].value === this.props.GroupDetail.img.m_img)delete data.files;
        
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
    // const DeleteWariningModal = ()=>
    // {
    //   return(
    //     <Modal open={this.state.deleteDialog} style={{boxShadow:"0px 3px 6px #000000",position:"fixed",width:"576px",height:"160px",textAlign:"center",top:"40px"}}>
    //     <div style = {{width:"100%",height:"29px",fontFamily:"Noto Sans KR",fontSize:"20px",color:"#707070",lineHeight:"29px",marginTop:"40px",marginBottom:"10px"}}>
    //       그룹 캡스톤 디자인 2019를 삭제하지 못했습니다.</div>
    //     <div style = {{width:"100%",height:"29px",fontFamily:"Noto Sans KR",fontSize:"20px",textDecoration:"none",color:"#FF0000"}}>
    //       그룹의 개설자만 삭제할 권한이 주어집니다.</div>
    //   </Modal>
    //   );
    // }
    const DeleteGroupModal = () => {
      return (
        <Modal open={this.state.isDelete} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
          <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.groupTitle}를<br />삭제하시겠습니까?</div>
          <div onClick={this.deleteGroup} style={{ cursor: "pointer", width: "100%", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", textDecoration: "underline", color: "#FF0000" }}>네, 삭제합니다</div>
          <div onClick={this.handleOnClickDeleteDesign} style={{
            cursor: "pointer", position: "absolute", right: "-50px", top: "0px", width: "22px", height: "22px",
            backgroundImage: `url(${iDelete})`, backgroundSize: "cover", backgroundPosition: "center center",
          }}>
          </div>
        </Modal>
      );
    }
    // const DeleteGroupComplete = ()=>
    // {
    //   return(
    //     <Modal open={this.state.deleteDialog} style={{boxShadow:"0px 3px 6px #000000",position:"fixed",width:"576px",height:"160px",textAlign:"center",top:"40px"}}>
    //     <div style = {{width:"100%",height:"29px",fontFamily:"Noto Sans KR",fontSize:"20px",color:"#707070",lineHeight:"29px",marginTop:"40px",marginBottom:"10px"}}>
    //       사용자 매뉴얼 디자인 등록01을 삭제했습니다.</div>
    //     <div style = {{width:"100%",height:"29px",fontFamily:"Noto Sans KR",fontSize:"20px",textDecoration:"underline",color:"#FF0000"}}>
    //       되돌리기</div>
    //     <div onClick = {this.handleOnClickDeleteDesign} style={{position:"absolute",right:"-50px",top:"0px",width:"22px",height:"22px",
    //                 backgroundImage: `url(${iDelete})`,backgroundSize: "cover", backgroundPosition: "center center",}}>
    //     </div>
    //   </Modal>
    //   );
    // }

    return (<React.Fragment>

      <div style={Main_Banner}>
        <div style={Main_Banner_text}>그룹 수정하기</div>
      </div>

      <div style={Main_Section}>
        {/* scroll - menu */}
        <div style={{ width: "433px" }}>
          <div style={{ width: "325px", marginLeft: "64px" }}>
            <div style={{ position: "fixed", top: "197px", width: "325px", height: "62px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
              {scrollmenu.map((menu, index) => {
                return (<div onClick={() => this.gotoStep(index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                  <div style={{ color: this.state.step === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
                </div>)
              })}
            </div>
          </div>
          <div onClick={this.handleOnClickDeleteDesign} style={modify_Menu_Delete}>그룹 삭제하기</div>
        </div>
        {/* form */}
        <div style={{ position: "relative", width: "1422px", height: "925px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "45px" }}>
          <form>

            {step === 0 && <BasicInfo groupTitle={this.state.groupTitle} groupExplain={this.state.groupExplain} groupThumbnail={this.state.groupThumbnail==""?noimg:this.state.groupThumbnail}
              onChangeExplain={this.handleInputDesignExplain} onChangeTitle={this.handleInputDesignTitle} onChangeThumbnailURL={this.handleChangeThumbnailURL} onChangeThumbnail={this.handleChangeThumbnail}
              designExplain={this.state.groupExplain} designTitle={this.state.groupTitle} thumbnail={this.state.groupThumbnail==""?noimg:this.state.groupThumbnail} {...this.props} />}
            {/* {step ===1 &&<AdditionalInfo {...this.props}/>} */}
            {/* buttons*/}
            <div style={{ marginTop: "20.54px", justifyContent: "flex-end", display: "flex" }}>

              <div onClick={this.onSubmit} style={{ position: "absolute", right: "9px", bottom: "35px", cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
                <p style={Btn_text}>완료</p></div>
              {/* {step === 1? 
            <div onClick={this.state.isPossibleNextStep ? this.completeCreateDesign : null} style={{ position:"absolute", right:"9px",bottom:"35px",cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
            <p style={Btn_text}>완료</p></div>
            : <div onClick={() => this.gotoStep(1)} style={{ position:"absolute", right:"9px",bottom:"35px",cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
            <p style={Btn_text}>다음</p>
            </div>
            } */}


            </div>
          </form>
        </div>
        <DeleteGroupModal />
      </div>



    </React.Fragment>)
  }
}

export default CreateGroup;
