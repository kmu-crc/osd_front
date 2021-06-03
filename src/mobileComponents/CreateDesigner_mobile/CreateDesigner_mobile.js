import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag";
import noimg from "source/noimg.png";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { alert } from "components/Commons/Alert/Alert";
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
    color:red;
    font-weight:800;
    padding:4px 0px 4px 0px;
  }
`
const Button = styled.div`
  width:100%;
  height:35px;
  border-radius:10px;
  background-color:${props=>props.background==null?"red":props.background};
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
class CreateDesigner_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getready: false,
      thumbnail: null, thumbnail_name: null,
      category_level1: 0, category_level2: -1, location: null,
      explain: "", tag: [],
      // career: [{ number: 0, task: "", explain: "", during: "" }],
      career:[],
    }
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.onDeleteCareer = this.onDeleteCareer.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  async onChangeCareer(number, task, explain, during) {
    let arr = this.state.career.slice();
    await arr.splice(number, 1, { number: number, task: task, explain: explain, during: during });
    this.setState({
      career: arr,
    })
  }
  onClickAddCareer(event) {
    this.setState({
      career: this.state.career.concat({ number: this.state.career.length, task: "", explain: "", during: "" }),
    })
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
    await this.setState({career:copy});
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value })
  }
  onChangeLocation(event, { value }) {
    this.setState({ location: { value }.value });
  }
  handleAddTag(tag) {
    this.setState({
      tag: tag.slice(),
    });
  }

  async handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      await reader.readAsDataURL(file);
    }
  }
  onClickCancel(event) {
    window.location.href = "/mypage"
  }
  onSubmit = async e => {

    e.preventDefault();
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
    })
    const data = {
      files: [],
      user_id: this.props.userInfo.uid,
      // thumbnail:this.state.thumbnail,
      type: "designer",
      description: this.state.explain,
      location: this.state.location,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: tagList,
      experience: experienceList,
    }
    let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
    await data.files.push(file);
    console.log(data);


    if (this.state.thumbnail != null || this.state.thumbnail !== "") {
      await data.files.push(file);
    }

    // 예외처리
    if(data.user_id == "" || data.user_id == null){
      await alert("닉네임을 입력해주세요","확인");
      return;
    }else if(data.category_level1<=0||data.category_level1==null){
      await alert("카테고리를 입력해주세요","확인");
      return;
    }else if(!data.files[0]&&(data.files[0].value==null||data.files[0].name==null)){
      await alert("썸네일을 등록해주세요","확인");
      return;
    }

    this.props.InsertDesignerDetailRequest(data, this.props.token)
      .then(async res => {
        console.log("res", res.res);
        const result = res.res;
        if (result.success) {
          await alert("정보가 수정되었습니다","확인");
          window.location.href = `/mypage`;
        } else {
          await alert("다시 시도해주세요","확인");
          this.setState({
            loading: false
          });
        }
      })
      // .then(
      //   this.props.CreateDesignRequest(this.props.keep.item, this.props.token)
      //     .then(result => {
      //       if (result.success) {
      //         alert("아이템이 등록되었습니다.");
      //         console.log("result", result);
      //         window.location.href = `/mypage`;
      //       } else {
      //         alert("아이템 등록에 실패했습니다.");
      //       }
      //     })
      // )
      .catch(async e => {
        console.log("실패", e);
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
  };

  componentDidMount() {
    if (this.props.keep) {
      this.setState(this.props.keep.designer);
      this.setState({ getready: true });
    }
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    console.log("category:", category1, this.state.category_level1, category2, this.props.category2);

    return (
      <React.Fragment>
        {this.props.keep ? "redirected" : null}
        {/* {this.state.open && <CreateGroupContainer id={this.props.id} handleIsModify={this.handlerIsGalleryModify} handleShowModal={this.handleShowModal} open={this.state.open} />} */}
        <Wrapper>
          <div className="header">디자이너 등록</div>
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
          {/* <ShadowBox>
          <div className="title">갤러리</div>
          <div className="contensts">
              {<HaveInGalleryContainer_mobile handlerIsGalleryModify={this.handlerIsGalleryModify} id={this.props.id} isModify={true} />}
          </div>
          <div className="greyButton" onClick={this.handleShowModal}>갤러리 등록</div>
          </ShadowBox> */}
        </Wrapper>
        <Button onClick={this.onSubmit} background="red" color="white">저장하기</Button>
        <Button onClick={this.onClickCancel} background="#707070" color="white">취소하기</Button>
      </React.Fragment>
    );
  };
}
export default CreateDesigner_mobile;

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
    this.props.onDeleteCareer(number);  
  }


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
      <React.Fragment>

        <div className="careerBox">
          <div className="number_wrapper">{leadingZeros(this.props.number, 2)}</div>
          <div className="text_wrapper">
            <InputText  value={this.state.task} onChange={this.onChangeTask} />
          </div>
          <div className="text_wrapper">
            <InputText value={this.state.during} onChange={this.onChangeDuring} />
          </div>
          <div className="text_wrapper">
            <InputText value={this.state.explain} onChange={this.onChangeExplain} />
          </div>
          <div className="close" onClick={this.onDeleteAll}>x</div>
        </div>
      </React.Fragment>
    );
  }
}
{/* <MainBox>
<div className="title">디자이너 등록</div>
<div className="contentsBox flexWrap">
  <ThumbnailBox>
    <div className="label">프로필 썸네일<sub style={{color:"red"}}>*</sub></div>
    <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
    <label className="wrapper_thumb" htmlFor="file">
      {this.state.thumbnail == null ?
        <div className="thumbnail"><div>첨부</div></div>
        :
        <Thumbnail imageURL={this.state.thumbnail} />
      }
    </label>
  </ThumbnailBox>

  <FormBox>
    <div className="FormBoxScroll">
    <div className="wrapper flex">
      <div className="label">닉네임<sup style={{color:"red"}}>*</sup></div>
      {this.props.userInfo.nickName}
    </div>

    <div className="wrapper flex">
      <div className="label">설명</div>
      <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" height={67} />
    </div>

    <div className="wrapper flex">
      <div className="label">카테고리<sup style={{color:"red"}}>*</sup></div>
      <div className="flexWrapBox">
        <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
        <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
      </div>
    </div>

    <div className="wrapper flex">
      <div className="label">태그</div>
      <div className="maxWidth">
        <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" />
      </div>
    </div>

    <div className="wrapper last_margin flex">
      <div className="label">위치</div>
      <DropBox upward id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
        selection options={LocationList} placeholder="시/도"
        onChange={this.onChangeLocation} />
    </div>
    </div>
  </FormBox>


</div>
<div className="contentsBox">
  <ExperienceBox>
    <div className="title_">경험</div>
    <div className="labelBox">
      <div className="number_label">번호</div>
      <div className="text_label">업무</div>
      <div className="text_label">기간</div>
      <div className="text_label">내용</div>
    </div>
    
    <div className="wrapper_noflex ">
      {this.state.career.map((item, index) => {
        console.log("career", item)
        return (
          <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} onDeleteCareer={(index)=>this.onDeleteCareer(index)} key={index} />
        );
      })}
      <Button  width={250} height={30} margin={112} onClick={this.onClickAddCareer}>
        <Icon name="plus" size='tiny' color='red' /><div className="label">경험 추가</div>
      </Button>
    </div>
  </ExperienceBox>
</div>
<div className="contentsBox centering marginTop">
  <RedButton width={150} height={30} fontSize={market_style.font.size.small1} text={"디자이너를 등록합니다."} okText="확인" cancelText="취소" value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
  <GrayButton width={150} height={30} fontSize={market_style.font.size.small1} text={"취소하시겠습니까?"} value={"취소하기"} onClick={() => { window.location.href = "/mypage" }} isConfirm={false}></GrayButton>
</div>

</MainBox> */}
