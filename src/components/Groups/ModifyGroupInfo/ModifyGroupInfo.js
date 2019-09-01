import React, { Component } from "react";
import noimg from "source/noimg.png"

import BasicInfo from "components/Groups/CreateGroup/BasicInfo"
import AdditionalInfo from "components/Groups/CreateGroup/AdditionalInfo"
import { userInfo } from "os";

// const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }, { txt: "부가 정보", tag: "#additional" }]

const scrollmenu = [{ txt: "기본 정보", tag: "#basics" }]


const Main_Banner ={ width: "1920px", display: "flex", justifyContent: "center" }
const Main_Banner_text = { marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }
const Main_Section = {display: "flex", marginTop: "60px", marginBottom: "111px" }
const Menu_Delete={position:"fixed", top:"349px",left:"100px",width:"150px",height:"29px",fontFamily: "Noto Sans KR",fontWeight:"500",fontSize:"20px",color:"#FF0000"}
const Btn_Back = { position:"absolute",right:"54px",bottom:"35px",border:"1px solid black",cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px"}
const Btn_text ={ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }
const Btn_Next ={ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }

class CreateGroup extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      groupThumbnail:noimg,groupTitle:"",groupExplain:"", groupThumbnailURL:"",groupThumbnailName:"",
      loading: false, isPossibleNextStep: false, step: 0, /* 0: basics, 1: additional, 2: contents*/ selectedCate1: null,
     selectedCate2: null, cate1: null,cate2: null}
    this.handleInputDesignExplain = this.handleInputDesignExplain.bind(this);
    this.handleInputDesignTitle = this.handleInputDesignTitle.bind(this);
    this.handleChangeThumbnail=this.handleChangeThumbnail.bind(this);
    this.handleChangeThumbnailURL=this.handleChangeThumbnailURL.bind(this);
  }
  // setLoader = () => { this.setState({ loading: !this.state.loading }) }
  componentDidMount()
  {
  }
  shouldComponentUpdate(nextProps)
  {
    
      if(this.props.GroupDetail!=nextProps.GroupDetail)
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
    this.setState(state=>({groupTitle:title}))
  }
  handleInputDesignExplain(explain)
  {
    this.setState(state=>({groupExplain:explain}))
  }
  handleChangeThumbnail(imgInfo,imgName)
  {
    this.setState(state=>({groupThumbnail:imgInfo,groupThumbnailName:imgName}));
  }

  handleChangeThumbnailURL(imgurl)
  {
    this.setState(state=>({groupThumbnailURL:imgurl}));
    }
  checkIsPossibleToGoNextStep = (step) => {

  }

  gotoStep=(index)=>
  {
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
  
  onSubmit = async e => {
    e.preventDefault();
    const data = {user_id:this.props.userInfo.uid,title:this.state.groupTitle,explanation:this.state.groupExplain,files:[]};
    let file = {
      value: this.state.groupThumbnail,
      name: this.state.groupThumbnailName,
      key: 0
    };
     data.files.push(file);
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
    // }).catch(e => {
    //   console.log("실패", e);
    //   // this.setState({
    //   //   loading: false
    //   // });
    // });
  //};

  // onSubmit = async e => {
  //   e.preventDefault();

  //   const data = {title:this.state.groupTitle,explanation:this.state.groupExplain};
  //   let file = {
  //     value: this.state.groupThumbnail,
  //     name: this.state.groupThumbnailName,
  //     key: 0
  //   };
  //    //data.files.push(file);

  //     this.props.UpdateGroupRequest(this.props.GroupDetail.uid,data, this.props.token)
  //     .then(res => {
  //       this.props.history.push(`/groupDetail/${res.id}`);
  //     }).catch(e => {
  //     console.log("실패", e);
  //     this.setState({
  //       loading: false
  //     });
  //   });
    // e.preventDefault();
    // ValidationGroup(this.state, false).then(async data => {
    //   console.log("성공", data);
    //   await this.setState({
    //     loading: true
    //   });
    //   this.props.CreateNewGroupRequest(data, this.props.token)
    //   .then(res => {
    //     this.props.history.push(`/groupDetail/${res.id}`);
    //   });
    // }).catch(e => {
    //   console.log("실패", e);
    //   this.setState({
    //     loading: false
    //   });
    // });
  };
  render() {
    // const myInfo = this.props.MyDetail



    const { step } = this.state
    return (<>

      <div style={Main_Banner}>
        <div style={Main_Banner_text}>그룹 등록하기</div>
      </div>

      <div style={Main_Section}>
        {/* scroll - menu */}
        <div style={{width:"433px"}}>
              <div style={{ width: "325px", marginLeft: "64px" }}>
                  <div style={{ position: "fixed", top: "197px", width: "325px", height: "62px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
                    {scrollmenu.map((menu, index) => {
                      return (<div onClick={() => this.gotoStep(index)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                        <div style={{ color: this.state.step === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
                      </div>)
                    })}
                  </div>
              </div>
        </div>
        {/* form */}
        <div style={{position:"relative", width: "1422px", height: "925px", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "45px" }}>
          <form>
             
             {step ===0 && <BasicInfo groupTitle={this.state.groupTitle} groupExplain={this.state.groupExplain} groupThumbnail={this.state.groupThumbnail}
             onChangeExplain={this.handleInputDesignExplain} onChangeTitle = {this.handleInputDesignTitle} onChangeThumbnailURL={this.handleChangeThumbnailURL} onChangeThumbnail = {this.handleChangeThumbnail}
             designExplain={this.state.groupExplain} designTitle ={this.state.groupTitle} thumbnail = {this.state.groupThumbnail} {...this.props}/> }
             {/* {step ===1 &&<AdditionalInfo {...this.props}/>} */}
            {/* buttons*/}
            <div style={{ marginTop: "20.54px", justifyContent: "flex-end", display: "flex" }}>

            <div onClick={this.onSubmit} style={{ position:"absolute", right:"9px",bottom:"35px",cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: this.state.isPossibleNextStep ? "#FF0000" : "#707070", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}>
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
      </div>
    </>)
  }
}

export default CreateGroup;
