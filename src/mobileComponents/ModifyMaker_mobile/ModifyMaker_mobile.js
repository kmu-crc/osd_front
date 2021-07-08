import React, { Component } from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import noimg from "source/noimg.png";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import HaveInGalleryContainer_mobile from "mobileComponents/HaveInGalleryContainer_mobile";
import CreateGroupContainer from "containers/Groups/CreateGroupContainer/CreateGroupContainer"
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { alert } from "components/Commons/Alert/Alert";
// import { Confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const LocationList = [
  { value: 0, text: "서울특별시" },
  { value: 1, text: "부산광역시" },
  { value: 2, text: "대구광역시" },
  { value: 3, text: "인천광역시" },
  { value: 4, text: "광주광역시" },
  { value: 5, text: "대전광역시" },
  { value: 6, text: "울산광역시" },
  { value: 7, text: "경기도" },
  { value: 8, text: "강원도" },
  { value: 9, text: "충청북도" },
  { value: 10, text: "충청남도" },
  { value: 11, text: "전라북도" },
  { value: 12, text: "경상북도" },
  { value: 13, text: "경상남도" },
  { value: 14, text: "제주도" },
  { value: 15, text: "제한없음" },
];
const Wrapper = styled.div`
  width:100%;
  .header{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.normal2};
    font-weight:800;
    color:#c1c1c1;
    margin-bottom:10px;
  }
  .redButton{
    width:100%;
    border:2px solid #ff3838;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FF3838;
    font-weight:800;
    padding:4px 0px 4px 0px;
  }
`
const Button = styled.div`
  width:100%;
  height:35px;
  border-radius:10px;
  background-color:${props=>props.background==null?"#FF3838":props.background};
  color:${props=>props.color==null?"white":props.color};
  box-shadow: 2px 2px 3px #00000019;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:${market_style.font.size.small1};
  font-weight:500;
  margin-top:10px;
`
const Career = styled.div`
  .row{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:10px;
  }
  .text_wrapper{
    width:100%;
  }
  .number{
    min-width:37px;
    font-size:${market_style.font.size.mini2};
  }
  .career_label{
    min-width:48px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
  }
  .close{width:100%;text-align:right;}
`
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:10px;
  margin-bottom:10px;
  .title{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.small1};
    font-weight:800;
    color:#c1c1c1;
    margin-bottom:10px;
  }
  .row{
    width:100%;
  }
  .label{
    min-width:85px;
  }
  .paddingNormal{padding:10px;}
  .marginTop1{margin-top:5px;}
  .marginTop2{margin-top:10px;}
  .marginTop3{margin-top:20px;}
  .marginRight{margin-right:10px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .font{font-size:${market_style.font.size.small1};font-weight:500;}
  .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
  .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
  .black{color:black;}
  .flex{display:flex;}
  .flexWrap{flex-wrap:wrap;}
  .justifyCenter{justify-content:center;}
  .alignCenter{align-items:center;}
  .spaceBetween{justify-content:space-between;}
  .flexEnd{justify-content:flex-end;}
  .column{flex-direction:column;}
  .textRight{text-align:right;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .thumbnail{
    min-width:100px;
    min-height:100px;
    border-radius:50%;
    background-image:url(${props=>props.face});
    background-size:cover;
    margin-right:10px;
  }
  .greyButton{
    width:100%;
    border-radius:10px;
    background-color:#F7F7F7;
    display:flex;
    justify-content:center;
    align-items:center;
    color:black;
    padding:4px 0px 5px 0px;
  }
`
const DropBox = styled(Dropdown)`
    min-width:120px !important;
    max-height:31px !important;   
    display:flex !important;
    align-items:center !important; 
    background-color:#E9E9E9 !important;
    margin-right:10px;
    font-size:${market_style.font.size.mini2};
    border-radius:10px !important;
    position:relative !important;
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small1};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:100px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`
class ModifyMaker_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null, thumbnail_name: null,
      category_level1: -1, category_level2: -1,
      location: "",
      explain: "", tag: [], equipment: [], technique: [],
      // career: [{ number: 0, task: "", explain: "", during: "" }],
      career:[],
      galleryModify:false,
      isModify:false,
    }
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.onDeleteCareer = this.onDeleteCareer.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleAddEquipment = this.handleAddEquipment.bind(this);
    this.handleAddTechnique = this.handleAddTechnique.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.handlerIsGalleryModify=this.handlerIsGalleryModify.bind(this);

  }
  async componentDidMount() {
    if (this.props.userInfo == null) {
      await alert("로그인해주세요.");
      window.location.href = '/signin'
    }
  }
  checkModify=()=>{
    let tagString = "";
    this.state.tag.map((item,index)=>{
      return(
        tagString+=item+","
      )
    });
    let careerString = "";
    this.state.career.map((item,index)=>{
      return(
        careerString+=item.number+","+item.task+","+item.explain+","+item.during+"/"
      );
    })
    let equipmentString = "";
    this.state.equipment.map((item,index)=>{
      return(
        equipmentString+=item+","
      )
    });
    let techniqueString = "";
    this.state.technique.map((item,index)=>{
      return(
        techniqueString+=item+","
      )
    });
    if(tagString==",")tagString="";
    if(careerString==",,,/")careerString="";
    //예외처리
    if(this.props.MakerDetail.description == this.state.explain||
      this.props.MakerDetail.category_level1== this.state.category_level1||
      this.props.MakerDetail.category_level2==this.state.category_level2||
      this.props.MakerDetail.location==this.state.location||
      tagString==this.props.MakerDetail.tag||
      careerString==this.props.MakerDetail.experience||
      equipmentString==this.props.MakerDetail.maker_equipment||
      techniqueString==this.props.MakerDetail.maker_technique||
      this.state.galleryModify==true){
        this.setState({isModify:true});
        return;
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props.MakerDetail.image !== nextProps.MakerDetail.image ||
      this.props.MakerDetail.user_id !== nextProps.MakerDetail.user_id ||
      this.props.MakerDetail.description !== nextProps.MakerDetail.description ||
      this.props.MakerDetail.location !== nextProps.MakerDetail.location ||
      this.props.MakerDetail.category_level1 !== nextProps.MakerDetail.category_level1 ||
      this.props.MakerDetail.category_level2 !== nextProps.MakerDetail.category_level2 ||
      this.props.MakerDetail.tag !== nextProps.MakerDetail.tag ||
      this.props.MakerDetail.experience !== nextProps.MakerDetail.experience ||
      this.props.MakerDetail.score !== nextProps.MakerDetail.score||
      this.props.MakerDetail.maker_equipment!==nextProps.MakerDetail.maker_equipment) {

      const careerRow = nextProps.MakerDetail.experience.split("/");
      careerRow.pop();
      const careerList = careerRow.map((item, index) => {
        const piece = item.split(",");
        console.log("piece:::", piece[0], piece[1], piece[2], piece[3]);
        return (
          { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
        );
      });
      console.log(careerList);
      const tag = nextProps.MakerDetail.tag==null?[]:nextProps.MakerDetail.tag.split(",");
      tag.pop();

      const equipment = nextProps.MakerDetail.maker_equipment==null?[]:nextProps.MakerDetail.maker_equipment.split(",");
      equipment.pop();

      const technique = nextProps.MakerDetail.maker_technique==null?[]:nextProps.MakerDetail.maker_technique.split(",");
      technique.pop();

      this.setState({
        thumbnail: nextProps.MakerDetail.image,
        user_id: nextProps.MakerDetail.user_id,
        explain: nextProps.MakerDetail.description || "",
        location: nextProps.MakerDetail.location || null,
        category_level1: nextProps.MakerDetail.category_level1,
        category_level2: nextProps.MakerDetail.category_level2,
        tag: tag || [],
        career: careerList,
        score: nextProps.MakerDetail.score || 0,
        equipment: equipment,
        technique: technique,
      })
    };

    return true;
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
    this.checkModify();
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
    this.checkModify();
  }
  async onChangeCareer(number, task, explain, during) {
    // console.log("arr", arr);
    let arr = this.state.career.slice();
    await arr.splice(number, 1, { number: number, task: task, explain: explain, during: during });
    this.setState({
      career: arr,
    })
    this.checkModify();
  }
  onClickAddCareer(event) {
    this.setState({
      career: this.state.career.concat({ number: this.state.career.length, task: "", explain: "", during: "" }),
    })
    this.checkModify();
  }
  async onDeleteCareer(value){

    const number = value;
    let copy = [...this.state.career];
    await copy.splice(number,1);
    copy&&copy.map(async(item,index)=>{
      item.number=index;
      console.log(index);
    });
    console.log(copy);
    await this.setState({career:copy,isModify:true});
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value })
    this.checkModify();
  }
  onChangeLocation(event, { value }) {
    this.setState({ location: { value }.value });
    this.checkModify();
  }
  handleAddTag(tag) {
    this.setState({
      tag: tag.slice(),
    });
    this.checkModify();
  }
  handleAddEquipment(equipment) {
    this.setState({
      equipment: equipment.slice(),
    })
    this.checkModify();
  }
  handleAddTechnique(technique) {
    this.setState({
      technique: technique.slice(),
    })
    this.checkModify();
  }
  handleShowModal(value) {
    console.log("handleShowModal=====",value)
    this.setState({ open: value })
  }
  handlerIsGalleryModify(){
    this.setState({galleryModify:true});
    this.checkModify();
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
    this.checkModify();
  }
  onClickCancel(event) {
    window.location.href = "/mypage"
  }
  onSubmit=async e=> {

    e.preventDefault();
    if(this.state.isModify==false){
      await alert("수정된 내용이 없습니다.");
      window.location.href="/mypage";
      return;
    }
    let tagList = "";
    this.state.tag.map((item, index) => { // 태그,태그,태그 ...
      return (
        tagList += item + ","
      );
    });
    let experienceList = "";
    this.state.career.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
      return (
        experienceList += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
      );
    });

    let equipmentList = "";
    this.state.equipment.map((item, index) => { // 태그,태그,태그 ...
      return (
        equipmentList += item + ","
      );
    });

    let techniqueList = "";
    this.state.technique.map((item, index) => { // 태그,태그,태그 ...
      return (
        techniqueList += item + ","
      );
    });
    const data = {
      files: [],
      user_id: this.props.userInfo.uid,
      type: "maker",
      description: this.state.explain,
      location: this.state.location,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: tagList,
      experience: experienceList,
      maker_equipment: equipmentList,
      maker_technique: techniqueList

    }
    let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
    data.files.push(file);
    console.log(data);


    if (this.state.thumbnail != null || this.state.thumbnail !== "") {
      data.files.push(file);
    }
    if (data.files.length <= 0 || data.files[0].value === (this.props.MakerDetail && this.props.MakerDetail.image)) {
      delete data.files;
    }


    // 예외처리
    if(data.user_id === "" || data.user_id == null){
          await alert("닉네임을 입력해주세요","확인");
          return;
    }else if(data.category_level1<=0||data.category_level1==null){
          await alert("카테고리를 입력해주세요","확인");
          return;
    }

    this.props.UpdateMakerDetailRequest(data, this.props.token)
      .then(async res => {
        console.log("res", res);
        const result = res;
        if (result.success) {
          await alert("정보가 수정되었습니다.");
          //this.props.history.push(`/`);
          window.location.href = "/mypage";
        } else {
          await alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      })
      .catch(async e => {
        console.log("실패", e);
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });

    window.location.href="/mypage";
  }


  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    console.log("break:", this.props);
    return (
      <React.Fragment>
        {this.state.open && <CreateGroupContainer id={this.props.id} handleIsModify={this.handlerIsGalleryModify} handleShowModal={this.handleShowModal} open={this.state.open} />}
        <Wrapper>
          <div className="header">메이커 관리</div>
          <ShadowBox face={this.state.thumbnail}t>
            <div className="row flex alignCenter">
            <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
              <div className="thumbnail"/>
              <div className="row">
                <div className="">
                  <span className="fontNormal marginRight">닉네임</span><span className="fontBig black">{this.props.userInfo.nickName}</span>
                </div>
                <label htmlFor="file">
                <div className="redButton marginTop2">썸네일 등록</div>
                </label>
            </div>
            </div>
          </ShadowBox>
          <ShadowBox>
            <div className="row title">정보</div>
            <div className="row flex">
              <div className="label font black">설명</div>
              <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" />
            </div>
            <div className="row flex marginTop3 alignCenter">
              <div className="label font black">카테고리</div>
                <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
            </div>
            <div className="row flex marginTop3 alignCenter">
              <div className="label font black">태그</div>
              <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" />
            </div>
            <div className="row flex marginTop3 alignCenter">
              <div className="label font black">위치</div>
              <DropBox upward id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
                        selection options={LocationList} placeholder="시/도"
                        onChange={this.onChangeLocation} />
            </div>
            <div className="row flex marginTop3 alignCenter">
              <div className="label font black">보유장비</div>
              <InputTag taglist={this.state.equipment} getValue={this.handleAddEquipment} placeholder="보유장비를 입력하고 [enter]키를 누르세요"/>
            </div>
            <div className="row flex marginTop3 alignCenter">
              <div className="label font black">보유기술</div>
              <InputTag taglist={this.state.technique} getValue={this.handleAddTechnique} placeholder="보유장비 입력하고 [enter]키를 누르세요"/>
            </div>
          </ShadowBox>
          <ShadowBox>
            <div className="row title">경험</div>
              {this.state.career.map((item, index) => {
                  return (
                    <CreateCareer item={item} number={Number(item.number) + 1} onChangeCareer={this.onChangeCareer} onDeleteCareer={(index)=>this.onDeleteCareer(index)} key={index} />
                  );
                })}
                <div className="greyButton" onClick={this.onClickAddCareer}>경험 추가</div>
          </ShadowBox>
          <ShadowBox>
          <div className="title">갤러리</div>
          <div className="greyButton" onClick={this.handleShowModal}>갤러리 등록</div>
          <div className="contensts">
              {<HaveInGalleryContainer_mobile handlerIsGalleryModify={this.handlerIsGalleryModify} id={this.props.id} isModify={true} />}
          </div>
          </ShadowBox>
        </Wrapper>
        <Button onClick={this.state.isModify==false?null:this.onSubmit} background={this.state.isModify==true?"#FF3838":"#707070"} color="white">저장하기</Button>
        <Button onClick={this.onClickCancel} background="#707070" color="white">취소하기</Button>
      </React.Fragment>
    );
  };
} export default ModifyMaker_mobile;

// 경력 //
class CreateCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "", explain: "", during: "",
    }
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeDuring = this.onChangeDuring.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
  }
  componentDidMount() {

    this.setState({
      task: this.props.item.task,
      explain: this.props.item.explain,
      during: this.props.item.during,
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        task: this.props.item.task,
        explain: this.props.item.explain,
        during: this.props.item.during,
      })
    }
    return true;
  }
  onChangeTask(event) {
    this.setState({ task: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, event.target.value, this.state.explain, this.state.during);
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, event.target.value, this.state.during);
  }
  onChangeDuring(event) {
    this.setState({ during: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, this.state.explain, event.target.value);
  }
  onDeleteAll(event){
    let number = this.props.number-1;
    if(number<0)return;
    this.props.onDeleteCareer(number);  }

  render() {
    const leadingZeros = (n, digits) => { //0채우는 함수
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    }
    console.log("careerlog", this.state);
    return (
        <Career>
          <div className="row">
            <div className="number">{leadingZeros(this.props.number, 2)}</div>
            <div className="career_label">업무</div>
            <div className="text_wrapper">
              <InputText value={this.state.task} onChange={this.onChangeTask}/>
            </div>
          </div>
          <div className="row">
            <div className="number"/>
            <div className="career_label">기간</div>
            <div className="text_wrapper">
            <InputText value={this.state.during} onChange={this.onChangeDuring}/>
            </div>
          </div>
          <div className="row">
            <div className="number"/>
            <div className="career_label">내용</div>
            <div className="text_wrapper">
            <InputText value={this.state.explain} onChange={this.onChangeExplain}/>
            </div>
          </div>
          <div className="close" onClick={this.onDeleteAll}>x</div>
        </Career>
    );
  }
}
// {this.state.open && <CreateGroupContainer id={this.props.id} handleIsModify={this.handlerIsGalleryModify} handleShowModal={this.handleShowModal} open={this.state.open} />}
// {this.props.userInfo &&
//   <MainBox>
//     <div className="title">메이커 관리</div>
//     <div className="contentsBox flexWrap">
//         <ThumbnailBox>
//           <div className="label">썸네일 등록<sub style={{color:"red"}}>*</sub></div>
//         <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
//         <label htmlFor="file">
//           {this.state.thumbnail == null ?
//             <div className="thumbnail"><div>첨부</div></div>
//             :
//             <Thumbnail imageURL={this.state.thumbnail} />
//           }
//         </label>
//       </ThumbnailBox>
//       {/* <RedButton onClick={this.onSubmit} left={223} bottom={0}><div>등록하기</div></RedButton> */}
//       <FormBox>
//         <div className="FormBoxScroll">
//         <div className="wrapper flex">
//           <div className="label">닉네임<sup style={{color:"red"}}>*</sup></div>
//           {this.props.userInfo.nickName}
//         </div>

//         <div className="wrapper flex">
//           <div className="label">설명</div>
//           <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" height={67} />
//         </div>

//         <div className="wrapper flex">
//           <div className="label">카테고리<sup style={{color:"red"}}>*</sup></div>
//           <div className="flexWrapBox">
//             <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
//             <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
//           </div>
//         </div>

//         <div className="wrapper flex">
//           <div className="label">태그</div>
//           <div className="maxWidth">
//             <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" />
//           </div>
//         </div>

//         <div className="wrapper flex">
//           <div className="label">위치</div>
//           <DropBox upward id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)} selection options={LocationList} placeholder="시/도"
//             onChange={this.onChangeLocation} />
//         </div>
//         <div className="wrapper flex">
//           <div className="label">보유장비</div>
//           <div className="maxWidth">
//             <InputTag taglist={this.state.equipment} getValue={this.handleAddEquipment} placeholder="보유장비를 입력하고 [enter]키를 누르세요"/>
//           </div>
//         </div>

//         <div className="wrapper flex">
//           <div className="label">보유기술</div>
//           <div className="maxWidth">
//             <InputTag taglist={this.state.technique} getValue={this.handleAddTechnique} placeholder="보유장비 입력하고 [enter]키를 누르세요"/>
//           </div>
//         </div>
//         </div>
//       </FormBox>
//     </div>
//     <div className="contentsBox">
//       <ExperienceBox>
//         <div className="title_">경험</div>
//         <div className="labelBox">
//           <div className="number_label">번호</div>
//           <div className="text_label">업무</div>
//           <div className="text_label">기간</div>
//           <div className="text_label">내용</div>
//         </div>
//         <div className="wrapper_noflex ">
//           {this.state.career.map((item, index) => {
//             console.log("career", item)
//             return (
//               <CreateCareer key={index} item={item} number={Number(item.number) + 1} onChangeCareer={this.onChangeCareer} onDeleteCareer={(index)=>this.onDeleteCareer(index)} key={index} />
//             );
//           })}
//           <Button  width={250} height={30} margin={112} onClick={this.onClickAddCareer}>
//           <Icon name="plus" size='tiny' color='red' /><div className="label">경험 추가</div>
//           </Button>
//         </div>
//       </ExperienceBox>
//     </div>
//     <div className="contentsBox">
//       <SubBox>
//         <div className="titleBox">
//           <div className="wrapper_box"/>
//           <div className="title">갤러리</div>
//           <div className="title redText small_font" onClick={()=>this.handleShowModal(true)}>갤러리 등록</div>
//         </div>
//         <div className="wrapper hrline marginBottom" />
//         <div className="contensts">
//           {<HaveInGalleryContainer handlerIsGalleryModify={this.handlerIsGalleryModify} id={this.props.id} isModify={true} />}
//         </div>
//       </SubBox>
//     </div>
//     <div className="contentsBox centering">
//     <RedButton width={150} height={30} fontSize={market_style.font.size.small1}  text ={"수정된 내용을 저장합니다."} okText="확인" cancelText="취소" value={"저장하기"} onClick={this.onSubmit} isConfirm={this.state.isModify} />
//     <GrayButton width={150} height={30} fontSize={market_style.font.size.small1}  text={"수정된 내용이 저장되지 않습니다."} okText="확인" cancelText="취소" value={"취소하기"} onClick={this.onClickCancel} isConfirm={this.state.isModify} />
//     </div>
//   </MainBox>}