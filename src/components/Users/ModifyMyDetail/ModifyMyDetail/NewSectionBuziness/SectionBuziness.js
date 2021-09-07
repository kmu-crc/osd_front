import React, { Component } from "react";
import styled from "styled-components";
import CheckBox2 from "components/Commons/CheckBox";
import iPlus from "source/modifymypage_new_career_button.svg";
import iHelp from "source/modifymypage_help.svg";

const Wrapper = styled.div`
  max-width: 1300px;
  // border-bottom: 3px solid #707070;

  .section {
    display: flex;
    flex-direction: row;
    
    .label {
      margin-left: 42px;
      margin-top: 19px;
      margin-bottom: 19px;
      width: max-content;
      height: 33px;
      text-align: left;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      font-family: Spoqa Han Sans;
      letter-spacing: 0px;
      color: #777777;
      opacity: 1;
      min-width: 221px;
    }
    .head {
      display: flex;
      flex-direction: row;
      margin-left: 42px;
      min-width: 1109px;
      border-bottom: 1px solid #707070;
      opacity: 1;

      .head_label {
        width: max-content;
        height: 33px;
        text-align: left;
        font-weight: bold;
        font-size: 22px;
        line-height: 33px;
        font-family: Spoqa Han Sans;
        letter-spacing: 0px;
        color: #777777;
        opacity: 1;
      }
      .mid {
        width: 130px;
      }
      .long {
        width: 309px;
      }
    }
    margin-top: 22px;
    margin-bottom: 40px;
    &.adjust-margin {
      margin-bottom: 20px;
    }
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .tip {
    width: 723px;
    height: 118px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 8px 8px 8px #0000002B;
    border: 0.5px solid #707070;
    opacity: 1;

    .text {
      height: 127px;
      text-align: left;
      font-weight: normal;
      font-size: 20px;
      line-height: 27px;
      font-family: Segoe UI, Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
      opacity: 1;
    }
  }
`;
const IconDiv = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.icon});
    background-position: center center;
    background-size: cover;

    cursor: pointer;
`;
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
    // var checkDiv = document.getElementById("isDesignerCheckbox"); // if (checkDiv.style.backgroundColor === "rgb(255, 255, 255)") { //   checkDiv.style.backgroundColor = "#FF0000" // } // else { //   checkDiv.style.backgroundColor = "#FFFFFF"; // }
    const result = !this.state.isDesigner;
    this.setState({ isDesigner: result });
    this.props.updateIsDesigner(result);
  }
  onChangeIsDesigner(event) {
    this.setState({ isDesigner: event.target.checked });

  }
  // onChangeTeam(event) { //   this.setState({ team: event.target.value }); //   this.props.updateTeam(event.target.value); // } // onChangeCareer(event) { //   this.setState({ career: event.target.value }); //   this.props.updateCareer(event.target.value); // } // onChangeLocation(event) { //   this.setState({ location: event.target.value }); //   this.props.updateLocation(event.target.value); // } // onChangeContact(event) { //   this.setState({ contact: event.target.value }); //   this.props.updateContact(event.target.value); // }
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

    return (<Wrapper>
      <div className="section">
        <div className="label">디자이너 활동 여부</div>
        <div className="content">
          <CheckBox2
            type="checkbox"
            id="designercheckbox"
            className="cuteCheckBox"
            onChange={this.isDesignerCheck}
            onClick={this.isDesignerCheck}
            checked={this.state.isDesigner}
          /> 
          <IconDiv width={42} height={42} icon={iHelp} />
          <div className="tip">
            <div className="text">
              디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며<br />
              디자이너 리스트에 올라가게 됩니다.<br />
              추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다.
            </div>
          </div>
        </div>
      </div>

      <div className="section adjust-margin">
        <div className="label">경험</div>
      </div>

      <div className="section column">
        <div className="head">
          <div className="head_label mid">번호</div>
          <div className="head_label long">업무</div>
          <div className="head_label long">기간</div>
          <div className="head_label long">내용</div>
        </div>

        <div className="content">
          {this.state.career.map((item, index) =>
            <CreateCareer
              key={index}
              item={item}
              number={parseInt(item.number, 10) + 1}
              onChangeCareer={this.onChangeCareer}
            />
          )}
        </div>
        <div style={{ marginLeft: "130px" }}>
          <IconDiv
            width={65}
            height={65}
            icon={iPlus}
            onClick={this.onClickAddCareer}
          />
        </div>
      </div>

    </Wrapper>);
  }
}
export default SectionBuziness;


const NewCareerWrapper = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .number {
    margin-left: 42px;
    width: 100px;
    height: 52px;
    text-align: left;
    font-weight: bold;
    font-size: 35px;
    line-height: 52px;
    font-family: Spoqa Han Sans;
    letter-spacing: 0px;
    color: #777777;
    opacity: 1;
    margin-right: 29px;
  }
  input {
    padding-left: 20px;
    padding-top: 5px;
    font-weight: 300;
    font-size: 15px;
    font-family: Spoqa Han Sans Neo;
    letter-spacing: 0px;
    color: #000000;
    border: none;
    outline: none;
    background-color: #C9C9C9;
    width: 280px;
    height: 40px;

    margin-right: 29px;
    :last-child { margin-right: 0px; }
  }
`;
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
    return (
      <NewCareerWrapper>
        <div className="number">{leadingZeros(this.props.number, 2)}</div>
        <input value={this.state.task} onChange={this.onChangeTask} />
        <input value={this.state.during} onChange={this.onChangeDuring} />
        <input value={this.state.explain} onChange={this.onChangeExplain} />
      </NewCareerWrapper>
    );
  }
}