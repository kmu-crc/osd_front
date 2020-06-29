import React, { Component } from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import noimg from "source/noimg.png";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import HaveInGalleryContainer from "containers/Gallery/HaveInGalleryContainer/HaveInGalleryContainer";
import CreateGroupContainer from "containers/Groups/CreateGroupContainer/CreateGroupContainer"
import { RedButton, GrayButton } from "components/Commons/CustomButton"

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
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
  .contentsBox{
    width:100%;
    display:flex;
    padding-left:130px;
    padding-top:36px;
  }

`

const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:562px;
  height:540px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:42px;
  padding-top:54px;
  margin-right:63px;
  .label{
    width:100%;
    height:29px;
  }
  .thumbnail{
    width:256px;
    height:256px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#E9E9E9;
    border-radius:50%;
    margin-left:110px;
  }
`
const Thumbnail = styled.div`
  cursor:pointer;
  width:256px;
  height:256px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  border-radius:50%;
  margin-left:110px;
`
const SubBox = styled.div`
    width:1560px;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px;
    padding-left:59px;
    padding-top:49px;
    padding:50px;
    .titleBox{
      width:100%;
      display:flex;
      justify-content:space-between;
    }
    .title{
      width:max-content;
      font-size:20px;
      font-weight:500;
      margin-bottom:15px;
    }
    .redText{
      color:red;
      cursor:pointer;
    }
    .contensts{
      width:103%;
    }
    .wrapper{
      width:100%;
    }
    .labelBox{
      width:100%;
      display:flex;
      padding-bottom:20px;
      border-bottom:1px solid #E6E6E6;
      margin-bottom:20px;

      .number_label{
        width:10%;
      }
      .text_label{
        width:30%;
      }
    }
    .careerBox{
      display:flex;
      margin-bottom:10px;
      .number_wrapper{
        width:10%;
      }
      .text_wrapper{
        width:30%;
      }
    }
`
const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-top:49px;

  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:70px;
  }
  .wrapper_noflex{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .margin_bottom{
    margin-bottom:30px;
  }
  .flex{
    display:flex;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    min-width:157px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }

`
const Button = styled.div`
    width:${props => props.width == null ? 100 + "%" : props.width + "px"};
    height:${props => props.height == null ? 100 + "%" : props.height + "px"};
    background-color:white;
    font-family:Noto Sans KR;
    font-size:20px;
    display:flex;
    align-items:center;
    margin-left:${props => props.margin == null ? 0 + "px" : props.margin + "px"};
    .label{
      margin-left:60px;
    }
    cursor:pointer;
    
`
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  padding: 0.67857143em 1em;

`
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`
const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`

class ModifyMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null, thumbnail_name: null,
      category_level1: -1, category_level2: -1,
      location: "",
      explain: "", tag: [], equipment: [], technique: [],
      career: [{ number: 0, task: "", explain: "", during: "" }],
    }
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleAddEquipment = this.handleAddEquipment.bind(this);
    this.handleAddTechnique = this.handleAddTechnique.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }
  componentDidMount() {
    if (this.props.userInfo == null) {
      alert("로그인해주세요.");
      window.location.href = '/signin'
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
      this.props.MakerDetail.score !== nextProps.MakerDetail.score) {

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
      const tag = nextProps.MakerDetail.tag.split(",");
      tag.pop();

      const equipment = nextProps.MakerDetail.tag.split(",");
      equipment.pop();

      const technique = nextProps.MakerDetail.tag.split(",");
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
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  async onChangeCareer(number, task, explain, during) {
    // console.log("arr", arr);
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
  handleAddEquipment(equipment) {
    this.setState({
      equipment: equipment.slice(),
    })
  }
  handleAddTechnique(technique) {
    this.setState({
      technique: technique.slice(),
    })
  }
  handleShowModal(value) {
    this.setState({ open: value })
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
  onClickCancel(event) {
    window.location.href = "/mypage"
  }
  onSubmit() {
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
    this.props.UpdateMakerDetailRequest(data, this.props.token)
      .then(res => {
        console.log("res", res);
        const result = res;
        if (result.success) {
          alert("정보가 수정되었습니다.");
          //this.props.history.push(`/`);
          window.location.href = "/mypage";
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

    // window.location.href="/mypage";
  }


  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    console.log("break:", this.props);
    return (
      <React.Fragment>
        {this.state.open && <CreateGroupContainer id={this.props.id} handleShowModal={this.handleShowModal} open={this.state.open} />}
        {this.props.userInfo &&
          <MainBox>
            <div className="title">메이커 관리</div>
            <div className="contentsBox">
              <ThumbnailBox>
                <div className="label">썸네일 등록</div>
                <Margin height={70} />
                <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                <label htmlFor="file">
                  {this.state.thumbnail == null ?
                    <div className="thumbnail"><div>첨부</div></div>
                    :
                    <Thumbnail imageURL={this.state.thumbnail} />
                  }
                </label>
              </ThumbnailBox>
              {/* <RedButton onClick={this.onSubmit} left={223} bottom={0}><div>등록하기</div></RedButton> */}
              <FormBox>

                <div className="wrapper flex">
                  <div className="label">닉네임</div>
                  {this.props.userInfo.nickName}
                </div>

                <div className="wrapper flex">
                  <div className="label">설명</div>
                  <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={483} height={99} />
                </div>

                <div className="wrapper flex">
                  <div className="label">카테고리</div>
                  <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                  <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
                </div>

                <div className="wrapper flex">
                  <div className="label">태그</div>
                  <div>
                    <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

                <div className="wrapper flex">
                  <div className="label">위치</div>
                  <DropBox id="country" disabled selection options={[{ value: 0, text: "대한민국" }]} value={0} />
                  <DropBox id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)} selection options={LocationList} placeholder="시/도"
                    onChange={this.onChangeLocation} />
                </div>

                {/* <div className="wrapper_noflex ">
                {
                  this.state.career.map((item, index) => {
                    console.log(item);
                    return (
                      <CreateCareer item={item} number={parseInt(item.number, 10) + 1} onChangeCareer={this.onChangeCareer} key={index} />
                    );
                  })
                }
                {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
                {/* <Button width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
                  <Icon name="plus" /><div className="label">경력 추가하기</div>
                </Button>
              </div> */}

                <div className="wrapper flex">
                  <div className="label">보유장비</div>
                  <div>
                    <InputTag taglist={this.state.equipment} getValue={this.handleAddEquipment} placeholder="보유장비를 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

                <div className="wrapper flex">
                  <div className="label">보유기술</div>
                  <div>
                    <InputTag taglist={this.state.technique} getValue={this.handleAddTechnique} placeholder="보유장비 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

              </FormBox>
            </div>
            <div className="contentsBox">
              <SubBox>
                <div className="title">경험</div>
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
                      <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} key={index} />
                    );
                  })}
                  {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
                  <Button /*onClick={this.onSubmit}*/ width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
                    <Icon name="plus" /><div className="label">경험 추가</div>
                  </Button>
                </div>
              </SubBox>
            </div>
            <div className="contentsBox">
              <SubBox>
                <div className="titleBox">
                  <div className="title">갤러리</div>
                  <div className="title redText" onClick={this.handleShowModal}>갤러리 등록</div>
                </div>
                <div className="contensts">
                  {<HaveInGalleryContainer id={this.props.id} isModify={true} />}
                </div>
              </SubBox>
            </div>
            <div className="contentsBox">
              <GrayButton value={"취소"} onClick={this.onClickCancel} isConfirm={true} />
              <RedButton value={"적용"} onClick={this.onSubmit} isConfirm={true} />
            </div>
          </MainBox>}
      </React.Fragment>
    );
  };
} export default ModifyMaker;

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
            <InputText value={this.state.task} onChange={this.onChangeTask} width={370} />
          </div>
          <div className="text_wrapper">
            <InputText value={this.state.during} onChange={this.onChangeDuring} width={370} />
          </div>
          <div className="text_wrapper">
            <InputText value={this.state.explain} onChange={this.onChangeExplain} width={370} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
// import React, { Component } from "react";
// import styled from 'styled-components';
// import { FormInput, FormAddress, FormExp, FormTag, FormThumbnail, FormDropBox, FormCheckBoxnew } from "components/Commons/FormItems";
// import Button from "components/Commons/Button";
// import { Header, Grid } from "semantic-ui-react"
// import StyleGuide from "StyleGuide";


// const category = [
//   { text: "특허권", value: 0 },
//   { text: "디자인권", value: 1 },
//   { text: "기술자문", value: 2 },
//   { text: "기술상담", value: 3 },
//   { text: "경험", value: 4 },
//   { text: "정보/데이터", value: 5 },
//   { text: "아이디어/노하우", value: 6 },
//   { text: "제품", value: 7 },
// ];

// const FromFieldCard = styled.div`
//   width: 100%;
//   background-color: white;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//   padding: 70px;
//   margin-bottom: 30px;
//   border-radius: 3px;
//   @media only screen and (min-width: 1200px) {
//     padding: 70px 100px 70px 100px;
//   }

//   .miniLabel{
//     width:100px;
//     margin-top:10px;
//     margin-bottom:10px;
//   }
// `;

// const FormHeader = styled(Header)`
//   position: relative;
//   padding-right: 2.5rem !important;
//   @media only screen and (max-width: 991px) {
//     padding-bottom: 2rem !important;
//   }
//   &::after {
//     position: absolute;
//     display: inline-block;
//     content: "";
//     height: 20px;
//     width: 100%;
//     border-bottom: 3px solid ${StyleGuide.color.geyScale.scale5};
//     bottom: 10px;
//     left: 0;

//     @media only screen and (min-width: 992px) {
//       width: 1px;
//       display: block;
//       position: absolute;
//       right: 2rem;
//       top: 50%;
//       left: initial;
//       bottom: initial;
//       transform: translateY(-50%);
//       border-bottom: 0;
//       border-right: 3px solid #191919;
//     }
//   }
// `;

// const Label = styled.div`
//   margin: 0 0 0.8rem 0;
//   display: block;
//   color: rgba(0,0,0,.87);
//   font-size: .92857143em;
//   font-weight: 700;
//   text-transform: none;
// `;

// class CreateMaker extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div>
//           <form onSubmit={this.onSubmit}>
//             <FromFieldCard>
//               <Grid>
//                 <Grid.Column mobile={16} computer={4}>
//                   <FormHeader as="h2">메이커 정보</FormHeader>
//                 </Grid.Column>
//                 <Grid.Column mobile={16} computer={12}>
//                   <Label>썸네일 등록</Label>
//                   <FormThumbnail
//                     name="thumbnail"
//                     placeholder="썸네일 등록"
//                     getValue={this.onChangeValue}
//                     onChange={() => { this.liveCheck("thumbnail") }}
//                     validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
//                   />
//                   <Label>카테고리</Label>
//                   <FormDropBox
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     options={category}
//                   />
//                   <Label>설명</Label>
//                   <FormInput
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     getValue={this.onChangeValue}
//                   />
//                   <Label>위치</Label>
//                   <FormAddress />
//                   <Label>p</Label>
//                   <FormExp />
//                   <Label>태그</Label>
//                   <FormTag
//                     placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />
//                   <Label>보유장비</Label>
//                   <FormCheckBoxnew
//                     items="장비1장비1,장비2장비2,장비3장비3,장비4장비4,장비5장비5,장비6장비6,장비7장비7,장비8장비8,장비9장비9,장비10장비10" />
//                   <div className="miniLabel">추가입력</div><FormTag />

//                   <Label>보유기술</Label>
//                   <FormCheckBoxnew
//                     items="기술1기술1,기술2기술2,기술3기술3,기술4기술4,기술5기술5,기술6기술6,기술7기술7,기술8기술8,기술9기술9,기술10기술10" />
//                   <div className="miniLabel">추가입력</div><FormTag />
//                 </Grid.Column>
//               </Grid>
//             </FromFieldCard>
//           </form>
//           <div style={{ width: "max-content", marginLeft: "auto" }}>
//             <Button color="Primary">등록하기</Button>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default CreateMaker;
