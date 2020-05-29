import React, { Component } from "react";
import styled from "styled-components";
import CheckBox2 from "components/Commons/CheckBox";
import { Icon } from "semantic-ui-react";
import opendesign_style from "opendesign_style";

const ExperienceBox = styled.div`
  *{
    font-size:20px;
    color: #707070;
  }
    width:100%;
    border-radius: 20px;
    // padding-left:59px;
    // padding-top:49px;
    // padding:50px;
    .title{
      max-width: 200px;
      min-width:200px;
      font-size: 20px;
      font-weight: 500;
      line-height:29px;
      color: #707070;
      margin-bottom:30px;
      margin-top:30px;
    }
    .wrapper{
      width:100%;
    }
    .wrapper_noflex{
      width:100%;
      margin-bottom:70px;
    }
    .labelBox{
      width:97%;
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
        padding:5px;
        width:10%;
      }
      .text_wrapper{
        width:30%;
      }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
      .careerBox{
        .number_wrapper{
          font-size:16px;
          margin-right:5px;
        }
        .text_wrapper{
          font-size:16px;
          text-align:center;
        }
      }
      .labelBox{
        .number_label{
          font-size:16px;
          margin-right:5px;
          
        }
        .text_label{
          font-size:16px;
          text-align:center;
        }
      }
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
    cursor:pointer;
    margin-left:${props => props.margin == null ? 0 + "px" : props.margin + "px"};
    .label{
      margin-left:60px;
    }
    
`;
const ContentsBox = styled.div`

    padding-left:47px;
    .title{
        width:100px;
        height:29px;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        text-align:left;
        color:#707070;
    }
    .tipTitle {
      // width: 375px;
      width:max-content;
      height: 25px;
      text-align:left;
      margin-left: 375px;
      font-size: 17px;
      color: #FF0000;
      text-align: left;
    }

    .tipDescription {
      width: 550px;
      margin-top: 5px;
      margin-left: 608px;
      font-size: 17px;
      font-weight: 200;
      font-family: Noto Sans KR;
      color: #707070;
      line-height: 25px;
      .mobileTipTitle {
        display:none;
        width:max-content;
        height: 25px;
        text-align:left;
        margin-left: 375px;
        font-size: 17px;
        color: #FF0000;
        text-align: left;
      }
    }
    @media only screen and (min-width : 780px) and (max-width:1440px) {
      flex-direction:column;
      .tipTitle {
        margin-top:30px;
        margin-left:0px;
      }
      .tipDescription {
      margin-left:0px;
      }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
        flex-direction:column;
        .tipTitle {
          margin-top:30px;
          margin-left:0px;
        }
        .tipDescription {
        margin-left:0px;
        width: 90%;
        }
    }
    @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
    and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
      padding-left:22px;

      .tipTitle{
        display:none;
      }
      .tipDescription{
        .mobileTipTitle{
          display:block;
        }
      }
    }
`;
const IsDesignerBox = styled.div`
  display:flex;
  flex-direction:row;
  .isDesignerText {
    display:flex;
    max-width: 200px;
    min-width:200px;
    font-size: 20px;
    font-weight: 500;
    line-height:29px;
    color: #707070;
    margin-right: 15px;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction:column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
      flex-direction:column;
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    flex-direction:row;
  }
`
const InputText = styled.input.attrs({ type: 'text', maxLength: 100 })`
  width: ${props => props.width == null ? "505px" : props.width + "px"};
  height: 56px;
  padding-left: 15px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  opacity: 0.5;
  background-color: #EFEFEF;
  border: none;
  border-radius: 5px;
  outline: none;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    width:505px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    width:80%
  }

`

class SectionBuziness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesigner: false,
      // team: "", career: "", location: "", contact: "" };
      career: [{ number: 0, task: "", explain: "", during: "" }],
    };
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    // this.onChangeCareer = this.onChangeCareer.bind(this);
    // this.onChangeContact = this.onChangeContact.bind(this);
    // this.onChangeLocation = this.onChangeLocation.bind(this);
    // this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onFocusNext = this.onFocusNext.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
  }
  componentWillUpdate(nextProps) {
    // this.setState({
    //   isDesigner: nextProps.MyDetail.is_designer, team: nextProps.MyDetail.team, career: nextProps.MyDetail.career,
    //   contact: nextProps.MyDetail.contact, location: nextProps.MyDetail.location
    // })
    // console.log(nextProps.MyDetail);
    if (nextProps.MyDetail !== this.props.MyDetail) {

      if (nextProps.MyDetail.careerlist !== null) {
        // console.log(nextProps.MyDetail.careerlist);
        const careerRow = nextProps.MyDetail.careerlist.split("/");
        careerRow.pop();
        const careerList = careerRow.map((item, index) => {
          const piece = item.split(",");
          // console.log("piece:::", piece[0], piece[1], piece[2], piece[3]);
          return (
            { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
          );
        });
        this.setState({
          isDesigner: nextProps.MyDetail.is_designer,
          career: careerList,
        })
        this.props.updateCareerlist(careerList);
      }
      else {
        this.setState({
          isDesigner: nextProps.MyDetail.is_designer,
          career: [{ number: 0, task: "", explain: "", during: "" }],
        })
      }

      this.props.updateIsDesigner(nextProps.MyDetail.is_designer);
    }
    // this.props.updateTeam(nextProps.MyDetail.team);
    // this.props.updateCareer(nextProps.MyDetail.career);
    // this.props.updateLocation(nextProps.MyDetail.location);
    // this.props.updateContact(nextProps.MyDetail.contact);
    return true;

  }
  async onChangeCareer(number, task, explain, during) {
    let arr = this.state.career.slice();
    await arr.splice(number, 1, { number: number, task: task, explain: explain, during: during });
    this.setState({
      career: arr,
    })
    await this.props.updateCareerlist(arr);
  }
  onClickAddCareer(event) {
    this.setState({
      career: this.state.career.concat({ number: this.state.career.length, task: "", explain: "", during: "" }),
    })
  }
  isDesignerCheck = () => {
    // var checkDiv = document.getElementById("isDesignerCheckbox");
    // if (checkDiv.style.backgroundColor === "rgb(255, 255, 255)") {
    //   checkDiv.style.backgroundColor = "#FF0000"
    // }
    // else {
    //   checkDiv.style.backgroundColor = "#FFFFFF";
    // }
    const result = !this.state.isDesigner;
    this.setState({ isDesigner: result });
    this.props.updateIsDesigner(result);
  }
  onChangeIsDesigner(event) {
    this.setState({ isDesigner: event.target.checked });

  }
  // onChangeTeam(event) {
  //   this.setState({ team: event.target.value });
  //   this.props.updateTeam(event.target.value);
  // }
  // onChangeCareer(event) {
  //   this.setState({ career: event.target.value });
  //   this.props.updateCareer(event.target.value);
  // }
  // onChangeLocation(event) {
  //   this.setState({ location: event.target.value });
  //   this.props.updateLocation(event.target.value);
  // }
  // onChangeContact(event) {
  //   this.setState({ contact: event.target.value });
  //   this.props.updateContact(event.target.value);
  // }
  onFocusNext(event) {
    const arrID = ["team", "career", "location", "contact"];
    if (event.key === "Enter") {
      if (event.target.id === arrID[0]) {
        document.getElementById(arrID[1]).focus();
      }
      else if (event.target.id === arrID[1]) {
        document.getElementById(arrID[2]).focus();
      }
      else if (event.target.id === arrID[2]) {
        document.getElementById(arrID[3]).focus();
      }
    }
  }
  render() {

    let description = [];
    description[0] = "디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며"
    description[1] = "디자이너 리스트에 올라가게 됩니다."
    description[2] = "추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다."

    console.log("checkbox", this.state.isDesigner);
    return (
      <ContentsBox>

        <IsDesignerBox>
          <div className="isDesignerText"><div>디자이너 활동 여부</div>
            <CheckBox2 type="checkbox" id="designercheckbox" className="cuteCheckBox"
              onChange={this.isDesignerCheck} onClick={this.isDesignerCheck} checked={this.state.isDesigner} />
          </div>
          <div className="tipTitle">TIP</div>
        </IsDesignerBox>
        <div className="tipDescription">
        <div className="mobileTipTitle">TIP</div>
          {description[0]}<br />
          {description[1]}<br />
          {description[2]}</div>
        <ExperienceBox>
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
                <CreateCareer item={item} number={parseInt(item.number, 10) + 1} onChangeCareer={this.onChangeCareer} key={index} />
              );
            })}
            {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
            <Button width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
              <Icon name="plus" /><div className="label">경험 추가</div>
            </Button>
          </div>
        </ExperienceBox>
      </ContentsBox>
    );
  }
}
export default SectionBuziness;

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
