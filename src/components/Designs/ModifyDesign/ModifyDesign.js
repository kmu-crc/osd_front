import React, { Component } from "react";
import { Dropdown, Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png"
import noface from "source/thumbnail.png";
import GridEditor from "components/Designs/GridEditor";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer"
import Loading from "components/Commons/Loading";
import { geturl } from "config";
import iDelete from "source/deleteItem.png"
import forked from "source/forked.svg";


const emptyCategory = [{ value: 0, text: "" }]
const scrollmenu = [{ step: 0, txt: "기본 정보", tag: "#basics" }, { step: 1, txt: "부가 정보", tag: "#additional" }, { step: 2, txt: "단계/컨텐츠 정보", tag: "#contenteditor" }]

function Peer(props) {
  return (<div style={{ cursor: "pointer", display: "flex", marginRight: "50px" }}>
    <div style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${props.s_img || noface})`, backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
    <div style={{ marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", color: "#707070", width: "112px", height: "29px" }}>{props.nick_name}</div>
    <div style={{ marginTop: "7.34px", marginLeft: "13.86px" }}><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
  </div>)
}
const BasicSecTitle = { width: "100px", height: "29px", lineHeight: "29px", fontSize: "20px", fontWeight: "500", color: "#707070", textAlign: "left" }
const BasicSec_thumb_Box = { display: "flex", width: "1200px", }
const BasicSec_thumb_ExplainBox = { marginLeft: "54.5px", marginTop: "100px" }
const BasicSec_thumb_FindBox = { width: "63px", height: "25px", cursor: "pointer" }
const BasicSec_thumb_FindTitle = { cursor: "pointer", fontWeight: "500", fontSize: "17px", borderBottom: "1.5px solid #FF0000", lineHeight: "25px", textAlign: "left", color: "#FF0000" }
const BasicSec_thumb_FindExplain = { width: "341px", height: "45px", marginTop: "11px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", textAlign: "left", color: "#707070" }
const modify_Menu_Delete = { position: "fixed", top: "400px", left: "100px", width: "150px", height: "29px", cursor: "pointer", fontFamily: "Noto Sans KR", fontWeight: "500", fontSize: "20px", color: "#FF0000" }

class ModifyDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0, title: "", explanation: "",
      showSearch: false, thumbnail: noimg, thumbnail_name: "", grid: false,
      categoryLevel1: null, categoryLevel2: null, alone: false, members: [], license1: false, license2: false, license3: false,
    }
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.DesignDetail !== nextProps.DesignDetail) {
      this.setState({
        thumbnail: nextProps.DesignDetail.img == null ? noimg : nextProps.DesignDetail.img.m_img,
        title: nextProps.DesignDetail.title,
        explanation: nextProps.DesignDetail.explanation,
        categoryLevel1: nextProps.DesignDetail.category_level1,
        categoryLevel2: nextProps.DesignDetail.category_level2,
        members: nextProps.DesignDetail.member && nextProps.DesignDetail.member.filter((mem) => { return mem.user_id !== this.props.userInfo.uid }),
        license1: nextProps.DesignDetail.is_commercial,
        license2: nextProps.DesignDetail.is_display_creater,
        license3: nextProps.DesignDetail.is_modify
      })
    }
    return true;
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.id)
      })
    this.setState({ content: true, designId: this.props.id, grid: true, loading: false });
  }
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  onChangeValueThumbnail = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
      console.log("thumbnail:", this.state);
    }
    this.checkFinishBasic();
  };
  onChangeValueTitle = async event => {
    if (event.target) {
      await this.setState({ title: event.target.value });
    }
    this.checkFinishBasic();
  };
  onChangeValueExplanation = async event => {
    if (event.target) {
      await this.setState({ explanation: event.target.value });
    }
    this.checkFinishBasic();
  };
  onKeyPress = () => {
    this.checkFinishBasic();
  }
  gotoPrevStep = () => {
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }
  gotoStep = (menu) => {
    if (this.state.basic) { };
    this.setState({ step: menu.step });
  }
  checkFinishBasic = async () => {
    const { title, thumbnail, explanation } = this.state;
    if (title && title.length > 0 && thumbnail && thumbnail.img && explanation && explanation.length > 0) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  }
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    console.log("checkFinishAdditional", categoryLevel1, ((alone && members.length === 0) || (!alone && members.length > 0)), license1, license2, license3);
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0)) && license1 && license2 && license3) {
      await this.setState({ additional: true });
    } else {
      await this.setState({ additional: false });
    }
  }
  submit = () => {

    const data = {
      category_level1: this.state.categoryLevel1, category_level2: this.state.categoryLevel2,
      title: this.state.title, explanation: this.state.explanation,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name, key: "thumbnail[]" }],
      members: this.state.members,
      is_commercial: this.state.license1 ? 1 : 0, is_display_creater: this.state.license2 ? 1 : 0, is_modify: this.state.license3 ? 1 : 0
    };
    if (data.files.length <= 0 || data.files[0].value === this.props.DesignDetail.img.m_img) {
      console.log("--------------------------------------------------------)");
      delete data.files;
    }

    console.log(data);
    this.setState({ loading: true });
    this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
      .then((data) => {
        console.log(data);
        if (data.res && data.res.success) {
          alert("디자인 정보 수정이 완료되었습니다. 디자인보기 화면으로 이동합니다.");
          window.location.href = geturl() + '/designDetail/' + this.props.DesignDetail.uid;
        } else {
          alert("디자인 정보 수정에 실패하였습니다.");
        }
      })
    this.setState({ loading: false });

    // window.location.href = geturl() + `/designDetail/` + this.state.designId;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value });
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value })
  }
  onCheckedLicense01 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  }
  onCheckedLicense02 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  }
  onCheckedLicense03 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  }
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  }
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, uid: uid };
    await this.setState({ members: this.state.members.concat(member) });
    console.log("members[]====", this.state.members);
    this.checkFinishAdditional();
  }
  removeMember(index) {
    this.setState({ members: this.state.members.filter((member, memberindex) => { return index !== memberindex }) });
  }
  deleteDesign = () => {
    this.props.DeleteDesignRequest(this.props.id, this.props.token)
      .then(() => {
        window.location.href = geturl() + `/design`;
      })
  }
  deleteDialog = () => { this.setState({ deleteModal: !this.state.deleteModal }) }
  render() {
    // const myInfo = this.props.MyDetail
    let arrSummaryList = [];
    if (this.state.members.length > 0) {
      arrSummaryList = this.state.members.map((item, index) => {
        // let SelectedItem = false;
        // if(this.state.selectId === item.friend_id)   SelectedItem=true;       
        return (
          <div onClick={() => this.removeMember(index)} key={index}>
            <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
          </div>
        )
      });
    }
    const DeleteDesignModal = () => {
      return (<Modal open={this.state.deleteModal} style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
        <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.title}를<br />삭제하시겠습니까?</div>
        <div onClick={this.deleteDesign} style={{ fontWeight: "500", cursor: "pointer", width: "100%", height: "25px", fontFamily: "Noto Sans KR", fontSize: "20px", textDecoration: "underline", color: "#FF0000" }}>네, 삭제합니다</div>
        <div style={{ marginTop: "5px", width: "100%", height: "20px", fontWeight: "300", fontFamily: "Noto Sans KR", fontSize: "15px", color: "#FF0000" }}>* 디자인 내에 포함된 모든 컨텐츠가 삭제되며, 되 돌릴수 없습니다.</div>
        <div onClick={this.deleteDialog} style={{ cursor: "pointer", position: "absolute", right: "-50px", top: "0px", width: "22px", height: "22px", backgroundImage: `url(${iDelete})`, backgroundSize: "cover", backgroundPosition: "center center", }}>
        </div>
      </Modal>
      )
    }
    const { step, loading, deleteModal } = this.state; // const { DesignDetail } = this.props;
    const thumbnailURL = this.state.thumbnail; //DesignDetail && DesignDetail.img == null ? noimg : DesignDetail.img.m_img;//this.state.thumbnail;
    console.log("new:", this.props)
    return (<React.Fragment>
      {loading ? <Loading /> : null}
      {deleteModal ? <DeleteDesignModal /> : null}
      <div onClick={this.handleCloseMember}>
        <div style={{ width: "1920px", display: "flex", justifyContent: "center" }}>
          <div style={{ marginTop: "45px", width: "196px", height: "37px", fontFamily: "Noto Sans KR", fontSize: "25px", fontWeight: "700", lineHeight: "37px", textAlign: "center", color: "#707070" }}>디자인 수정하기</div>
        </div>
        <div style={{ display: "flex", marginTop: "60px", marginBottom: "111px" }}>

          {/* scroll - menu */}
          <div style={{ width: "325px", marginLeft: "64px" }}>
            <div style={{ position: "fixed", top: "197px", width: "325px", height: "190px", backgroundColor: "#F5F4F4", borderRadius: "5px" }}>
              {scrollmenu.map((menu, index) => {
                return (<div onClick={() => this.gotoStep(menu)} style={{ cursor: "pointer", height: "62px", lineHeight: "29px", borderBottom: index + 1 === scrollmenu.length ? "none" : "2px solid #FFFFFF", paddingTop: "18px", paddingLeft: "36px" }} key={menu.txt}>
                  <div style={{ color: this.state.step === index ? "#FF0000" : "#707070", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "300", textAlign: "left" }}>{menu.txt}</div>
                </div>)
              })}
            </div>
          </div>
          <div onClick={this.deleteDialog} style={modify_Menu_Delete}>디자인 삭제하기</div>

          {/* form */}
          <div style={{ width: "1422px", marginLeft: "45px", height: "max-content", borderRadius: "5px", border: "8px solid #F5F4F4", paddingTop: "46px" }}>
            {/* <form ref={(ref) => this.form = ref}> */}
            <section style={{ display: step === 0 ? "block" : "none", paddingLeft: "55.5px" }} >
              {/* thumbnail */}
              <div style={BasicSec_thumb_Box}>
                <div style={BasicSecTitle}>프로필 사진
                    </div>
                <div style={{ position:"relative",
                  marginLeft: "67px", width: "210px", height: "210px", borderRadius: "10px",
                  backgroundImage: `url(${thumbnailURL})`, backgroundSize: "cover", backgroundPosition: "center center"
                }} >
                  {this.props.DesignDetail&&this.props.DesignDetail.parent_design && 
                  <div style={{ position: "absolute",right:"21px", width: "32px", height: "70px", 
                  backgroundImage: `url(${forked})`, backgroundSize: "cover" }} />}

                </div>
                <div style={BasicSec_thumb_ExplainBox}>
                  <div style={BasicSec_thumb_FindBox}>
                    <label htmlFor="file" style={BasicSec_thumb_FindTitle}>찾아보기</label>
                    <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                  </div>
                  <div style={BasicSec_thumb_FindExplain}>프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG 파일을 등록 가능합니다.</div>
                </div>
              </div>

              {/* title */}
              <div style={{ marginTop: "86px", width: "1544px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "37px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>제목</div>
                  <div style={{ marginLeft: "130px", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }} >
                    <input
                      style={{ outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }}
                      name="title" maxLength="100" value={this.state.title} placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
                      onBlur={this.checkFinishBasic} onChange={this.onChangeValueTitle} />
                  </div>
                  <div style={{ marginTop: "16px", marginLeft: "27.5px", fontSize: "17px", fontWeight: "300", lineHeight: "25px", color: "#707070", width: "230px", height: "25px" }} />
                </div>
              </div>
              {/* explanation */}
              <div style={{ marginTop: "50px", display: "flex" }}>
                <div style={{ width: "97px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>디자인 설명</div>
                <div style={{ width: "717.5px", height: "244px", marginLeft: "70px", backgroundColor: "#EFEFEF", borderRadius: "5px", marginTop: "14px", }}>
                  <textarea style={{ width: "717.5px", height: "244px", backgroundColor: "#EFEFEF", outline: "none", border: "none", resize: "none", lineHeight: "35px", textAlign: "left", fontSize: "20px", fontWeight: "300", color: "#707070", paddingTop: "26px", paddingLeft: "22px", paddingBottom: "34px", paddingRight: "32.5px" }}
                    name="explanation" maxLength="1000" placeholder="디자인 설명을 입력해주세요. (1000자 이내)" value={this.state.explanation} onBlur={this.checkFinishBasic} onChange={this.onChangeValueExplanation} />
                </div>
              </div>
            </section>



            <section style={{ display: step === 1 ? "block" : "none", marginBottom: "16px", paddingLeft: "52px" }} >
              {this.props.category1.length > 0 ?
                <React.Fragment>
                  {/* category */}
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "74px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }}>카테고리</div>
                    <div style={{ marginLeft: "98px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                      <Dropdown onChange={this.onChangeCategory1} style={{ width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px" }}
                        options={this.props.category1} selection name="category1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
                    </div>
                    <div style={{ marginLeft: "30px", marginTop: "4px", width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}>
                      <Dropdown id="category2" onChange={this.onChangeCategory2} style={{ width: "410px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px" }}
                        options={this.state.categoryLevel1 === 0 ? emptyCategory : this.props.category2[this.state.categoryLevel1 - 1]} selection name="cate2" ref="dropdown2" value={this.state.categoryLevel2} />
                    </div>
                  </div>
                </React.Fragment>
                : <p>카테고리를 가져오고 있습니다.</p>}
              {/* invite member*/}
              <div style={{ marginTop: "107px", display: "flex" }}>
                <div style={{ width: "115px", height: "29px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070", textAlign: "left" }}>멤버 초대하기</div>
                <div style={{ marginLeft: "52px", width: "645px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px", fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070" }} >
                  {/* <input type="text" style={{ zIndex: "900", outline: "none", marginLeft: "27px", marginTop: "12px", height: "29px", lineHeight: "29px", width: "451.5px", border: "none", color: "#707070", backgroundColor: "#EFEFEF" }} placeholder="닉네임을 검색해 주세요" />  */}
                  {this.state.alone ? undefined : <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />}
                </div>
                <div style={{ marginLeft: "20px", width: "27px", height: "25px", fontSize: "17px", lineHeight: "25px", fontWeight: "500", color: "#FF0000", textAlign: "left" }}>TIP</div>
                <div style={{ marginLeft: "17px", width: "457px", height: "75px", fontSize: "17px", lineHeight: "25px", fontWeight: "100", color: "#707070", textAlign: "left" }}>함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
              </div>
              <div>
                {/* invited member*/}
                <div style={{ marginTop: "20px", marginLeft: "167px" }}>
                  <div style={{ width: "1000px", display: "flex", flexWrap: "wrap", flexDirection: "row", marginBottom: "34px" }}>
                    {arrSummaryList}
                  </div>
                </div>
                {/* LEAVE ME ALONE */}
                <div style={{ marginLeft: "185px", marginBottom: "30px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500" }}><input onChange={this.LeaveMeAlone} type="checkbox" style={{ width: "25px", height: "25px", marginRight: "17px", paddingBottom: "10px" }} /><span style={{ verticalAlign: "top" }}>맴버를 초대하지 않습니다.</span></div>
              </div>
              <div style={{ width: "1318px", marginTop: "122.5px", border: "2.5px solid #EFEFEF" }} />

              {/* license*/}
              <div style={{ marginTop: "22px", display: "flex" }}>
                <div style={{
                  width: "115px", height: "29px",
                  fontSize: "20px", lineHeight: "29px", fontWeight: "500", color: "#707070", textAlign: "left"
                }}>라이센스</div>
                <div style={{ width: "645px", height: "143px" }}>
                  <div style={{ width: "100%", paddingLeft: "52px" }}>
                    <div style={{ marginBottom: "30px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500" }}>
                      <input onChange={this.onCheckedLicense01} checked={this.state.license1 ? true : false} type="checkbox" style={{ width: "25px", height: "25px", marginRight: "17px", paddingBottom: "10px" }} /><span style={{ verticalAlign: "top" }}>상업적으로 이용이 가능합니다</span></div>
                    <div style={{ marginBottom: "30px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500" }}>
                      <input onChange={this.onCheckedLicense02} checked={this.state.license2 ? true : false} type="checkbox" style={{ width: "25px", height: "25px", marginRight: "17px", paddingBottom: "10px" }} /><span style={{ verticalAlign: "top" }}>원작자를 표시합니다</span></div>
                    <div style={{ marginBottom: "30px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500" }}>
                      <input onChange={this.onCheckedLicense03} checked={this.state.license3 ? true : false} type="checkbox" style={{ width: "25px", height: "25px", marginRight: "17px", paddingBottom: "10px" }} /><span style={{ verticalAlign: "top" }}>추후에 수정이 가능합니다</span></div>
                  </div>
                </div>
              </div>
              {/* hr line */}
              <div style={{ marginTop: "150.5px", marginLeft: "auto", marginRight: "52px", width: "545px", height: "69px", textAlign: "right", fontWeight: "300", fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1" }} >마지막 단계만이 남아있습니다!<br />단계 / 컨텐츠 정보 탭에서 기본적인 디자인의 뼈대를 구성해 주세요</div>
            </section>



            <section style={{ display: step === 2 ? "block" : "none", paddingLeft: "51px", marginBottom: "204px" }} >
              <div>
                {this.state.grid ? <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} /> : <div>단계/컨텐츠 에디터를 가져오고 있습니다.</div>}
              </div>
            </section>

            {/* buttons*/}
            <div style={{ marginTop: "20.54px", marginBottom: "35px", justifyContent: "flex-end", display: "flex" }}>
              {step === 0 && <React.Fragment>
                <div onClick={this.gotoNextStep} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>다음</p></div>
              </React.Fragment>}
              {step === 1 && <React.Fragment>
                <div onClick={this.gotoPrevStep} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "15px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>뒤로</p></div>
                <div onClick={this.gotoNextStep} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>다음</p></div>
              </React.Fragment>}
              {step === 2 && <React.Fragment>
                <div onClick={this.gotoPrevStep} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "15px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>뒤로</p></div>
                <div onClick={this.submit} style={{ cursor: "pointer", width: "104.5px", height: "44px", borderRadius: "5px", backgroundColor: "#FF0000", paddingTop: "6px", paddingLeft: "15px", marginRight: "53px" }}><p style={{ width: "74px", padding: "0px", fontFamilty: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", textAlign: "center", fontSize: "20px", color: "#FFFFFF" }}>완료</p></div>
              </React.Fragment>}
            </div>
            {/* </form> */}
          </div>
        </div></div>

    </React.Fragment>)
  }
}

export default ModifyDesign;
