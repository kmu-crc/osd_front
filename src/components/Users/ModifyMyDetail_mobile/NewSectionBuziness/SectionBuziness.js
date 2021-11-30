import React, { Component } from "react";
import styled from "styled-components";
import CheckBox2 from "components/Commons/CheckBox";
import iPlus from "source/modifymypage_new_career_button.svg";
import iHelp from "source/modifymypage_help.svg";
import iChecked from "source/modifymypage_checked.png";
import checkedIcon from "resources/images/icon_checked.svg";
import uncheckedIcon from "resources/images/icon_unchecked.svg";
import plusIcon from "source/add_black_24dp.png";

const Info = styled.div`
  width:100%;
  font-family:Spoqa Han Sans;
  .title{width:159px;font-size:15px;font-weight:800;}
  .exp_title{width:65px;font-size:15px;font-weight:800;}
  .row{width:100%;margin-top:15px;display:flex;justify-content:space-between;padding:0px 10px;}
  .row2{width:100%;margin-top:15px;display:flex;padding:0px 10px;}
  .checked{width:24px;height:24px;}
  .careerBox{margin-top:25px;}
  .flex{display:flex;}


  .question{
    width:20px;
    height:20px;
    border-radius:50%;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:red;
    margin-right:10px;
    position:relative;
  }
`
const Hrline = styled.div`
  width:${props=>props.width==null?"100%":props.width+"px"};
  border-top:2px solid #dcdcdc;
  margin-left:auto;
  margin-right:auto;
`
const InputText = styled.input`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    background-color:#c2c2c2;
    padding:0px 6px;
    border:none;
    outline:none;
`
const WarningBox = styled.div`
  position:relative;
  .showani {
      width:300px;
      position: absolute;
      top:20px;
      right:0px;
      margin-top: 5px;
      border-radius: 5px;
      padding: 5px;
      background-color: #707070;
      color: white;
      opacity: 0.0;
      animation-name: fadeinout;
      animation-duration: 5s;
      @keyframes fadeinout {
          from {
              opacity: 0;
          }
          to {
              opacity: 0;
          }
          75% {
              opacity: 0.7;
          }
      }
  }
  .hideani {
      display:none;
  }
`;
class CreateCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesigner: false,
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
      <React.Fragment>
        <div className="row2"><div className="exp_title">번호</div><div className="exp_title">{leadingZeros(this.props.number, 2)}</div></div>
        <div className="row"><div className="exp_title">업무</div><InputText value={this.state.task} onChange={this.onChangeTask} width="270" height="22"/></div>
        <div className="row"><div className="exp_title">기간</div><InputText value={this.state.during} onChange={this.onChangeDuring} width="270" height="22"/></div>
        <div className="row"><div className="exp_title">내용</div><InputText value={this.state.explain} onChange={this.onChangeExplain} width="270" height="22"/></div>
      </React.Fragment>
    );
  }
}
class SectionBuziness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesigner: false,
      career: [{ number: 0, task: "", explain: "", during: "" }],
    };
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    this.onFocusNext = this.onFocusNext.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.onClickQeustion = this.onClickQeustion.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.MyDetail !== this.props.MyDetail) {

      if (nextProps.MyDetail.careerlist !== null) {
        const careerRow = nextProps.MyDetail.careerlist.split("/");
        careerRow.pop();
        const careerList = careerRow.map((item, index) => {
          const piece = item.split(",");
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
    const result = !this.state.isDesigner;
    this.setState({ isDesigner: result });
    this.props.updateIsDesigner(result);
  }
  onChangeIsDesigner(event) {
    this.setState({ isDesigner: event.target.checked });

  }
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
  onClickQeustion=()=>{
    let warningMsg1 = document.getElementById("wariningBox3");
    warningMsg1.className = "showani";
    setTimeout(()=>{
      warningMsg1.className = "hideani";
    },5000);
  }
  
  render() {
    const ShowWarning = () => {
      return (
          <WarningBox>
              <div id="wariningBox3" className="hideani">
              디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며
              디자이너 리스트에 올라가게 됩니다.
              추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다.
              </div>
          </WarningBox>
      );
    }
    return (
      <Info>
      <Hrline style={{marginTop:"15px"}}/>
      <div className="row">
        <div className="title">디자이너 활동 여부</div>
        <div className="flex">
        <div className="question" onClick={this.onClickQeustion}>?</div>
        <ShowWarning />
        <a onClick={this.isDesignerCheck}>
        {this.state.isDesigner ? <img className="checked" src={checkedIcon} style={{opacity:"0.7"}}/> : <img className="checked" src={uncheckedIcon} style={{opacity:"0.7"}} />}
        </a>
        </div>
      </div>
      <Hrline style={{marginTop:"15px"}}/>
      <div >
          <div className="row"><div className="title">경험</div></div>
          <div className="wrapper_noflex ">
          {this.state.career.map((item, index) =>
            <CreateCareer
              key={index}
              item={item}
              number={parseInt(item.number, 10) + 1}
              onChangeCareer={this.onChangeCareer}
            />
          )}
            <div className="row">
              <div/>
              <img src={plusIcon} onClick={this.onClickAddCareer}/>
            </div>
          </div>
      </div>
      <Hrline width="200" style={{marginBottom:"15px"}}/>
      </Info>

    );
  }
}
export default SectionBuziness;

