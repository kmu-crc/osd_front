import React, { Component } from "react";
// import { FormControl, ValidationGroup } from "modules/FormControl";
// import SelectBox from "components/Commons/SelectBox"
import CheckBox2 from "components/Commons/CheckBox";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const ExperienceBox= styled.div`
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
    }
    @media only screen and (min-width : 780px) and (max-width:1440px) {
      flex-direction:column;
      .tipTitle {
        margin-top:15px;
        margin-left:0px;
      }
      .tipDescription {
      margin-left:0px;
      }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
        flex-direction:column;
        .tipTitle {
          margin-top:15px;
          margin-left:0px;
        }
        .tipDescription {
        margin-left:0px;
        width: 90%;
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
}
@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
}


// const CheckBox = styled.input.attrs({ type: 'checkbox' })`
//       width:25px;
//       height:25px;
//       margin-left:10px;
//       background-color:#EFEFEF !important;
//       border:1px solid #707070 !important;
//       border-radius:5px !important;  
// `

const DesignerInfoBox = styled.div`
margin-left: 20px;
.itemBox{
  display: flex;
  position: relative;
  margin-top: 46px;
  .designerInfoTitle{
    min-width: 47px;
    margin-left: 150px;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: left;
    opacity: 0.5;
  }
}

@media only screen and (min-width : 780px) and (max-width:1440px) {   
  .itemBox{
    flex-direction:column;
    .designerInfoTitle{
      margin-left:0px;
      margin-bottom:10px;
    }
  }
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  .itemBox{
    flex-direction:column;
    .designerInfoTitle{
      margin-left:0px;
      margin-bottom:10px;
    }
  }
}
`
const InputText = styled.input.attrs({ type: 'text', maxLength: 100 })`
width: ${props=>props.width==null?"505px":props.width+"px"};
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
    this.state = { isDesigner: false, 
      career: [{ number: 0, task: "", explain: "", during: "" }], };
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    this.onFocusNext = this.onFocusNext.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (this.props.MyDetail != nextProps.MyDetail) {
      console.log(nextProps.MyDetail);
      if(nextProps.MyDetail.careerlist!==null){
        const careerRow = nextProps.MyDetail.careerlist.split("/");
        careerRow.pop();
        const careerList = careerRow.map((item, index) => {
          const piece = item.split(",");
          console.log("piece:::", piece[0], piece[1], piece[2], piece[3]);
          return (
            { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
          );
        });
        this.setState({
          isDesigner: nextProps.MyDetail.is_designer, 
          career: careerList,
        })
      }
      else{
        this.setState({
          isDesigner: nextProps.MyDetail.is_designer, 
          career:  [{ number: 0, task: "", explain: "", during: "" }], 
        })
      }   
    }
    return true;
    //   this.setState({
    //     isDesigner: nextProps.MyDetail.is_designer, team: nextProps.MyDetail.team, career: nextProps.MyDetail.career,
    //     contact: nextProps.MyDetail.contact, location: nextProps.MyDetail.location
    //   })
    //   this.props.updateIsDesigner(nextProps.MyDetail.is_designer);
    //   // this.props.updateTeam(nextProps.MyDetail.team);
    //   // this.props.updateCareer(nextProps.MyDetail.career);
    //   // this.props.updateLocation(nextProps.MyDetail.location);
    //   // this.props.updateContact(nextProps.MyDetail.contact);
    // }
  }
  isDesignerCheck = () => {
    var checkDiv = document.getElementById("isDesignerCheckbox");
    if (checkDiv.style.backgroundColor === "rgb(255, 255, 255)") {
      checkDiv.style.backgroundColor = "#FF0000"
    }
    else {
      checkDiv.style.backgroundColor = "#FFFFFF";
    }
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
  onFocusNext(event)
  {
    const arrID = ["team","career","location","contact"];
    if(event.key=="Enter")
    {
      if(event.target.id == arrID[0])
      {
        document.getElementById(arrID[1]).focus();
      }
      else if(event.target.id == arrID[1])
      {
        document.getElementById(arrID[2]).focus();
      }
      else if(event.target.id == arrID[2])
      {s
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
      <React.Fragment>
        let description = [];
    description[0] = "디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며"
    description[1] = "디자이너 리스트에 올라가게 됩니다."
    description[2] = "추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다."
    return (
      <ContentsBox>
        <IsDesignerBox>
          <div className="isDesignerText">디자이너 활동 여부</div>
          <CheckBox2 type="checkbox" id="designercheckbox" //className="cuteCheckBox"
            onChange={this.isDesignerCheck} checked={this.state.isDesigner} />
          <div className="tipTitle">TIP</div>
        </IsDesignerBox>
        <div className="tipDescription">
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
                    <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} key={index} />
                  );
                })}
                {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
                <Button width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
                  <Icon name="plus" /><div className="label">경험 추가</div>
                </Button>
               </div>
          </ExperienceBox>
        </ContentsBox>
        {/* <div style={{ display: "flex", justifyContent: "space-start", paddingLeft: "95.5px" }}>
          <div style={{ fontSize: "20px", color: "#707070", fontWeight: "500" }}>디자이너 활동 여부</div>
          <CheckBox2 id="isDesignerCheckbox" onClick={this.isDesignerCheck} />
          {/* style={{marginLeft:"10px", width:"25px",height:"25px",background: this.state.isDesigner==1?"#FF0000  0% 0% no-repeat padding-box":"#FFFFFF 0% 0% no-repeat padding-box", border: "1px solid #707070", borderRadius: "5px", }} */}
          {/*<div style={{ color: "#FF0000", fontSize: "17px", textAlign: "left", marginLeft: "420px", width: "27px", height: "25px" }}>TIP</div>
        </div>
        <div className="description" style={{ marginTop: "5px", marginLeft: "708px", color: "#707070", fontSize: "17px", fontWeight: "100", width: "540px", height: "75px" }}>{description[0]}<br />{description[1]}<br />{description[2]}</div>

        <div style={{ display: "flex", position: "relative", marginTop: "66px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>팀</div>
          <input  id="team" onKeyDown={this.onFocusNext} onChange={this.onChangeTeam} type="text" value={this.state.team} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "57px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>경력</div>
          <input id="career" onKeyDown={this.onFocusNext}  onChange={this.onChangeCareer} type="text" value={this.state.career} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>위치</div>
          <input id="location" onKeyDown={this.onFocusNext}  onChange={this.onChangeLocation} type="text" value={this.state.location} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>연락</div>
          <input id="contact" onChange={this.onChangeContact} onChange={this.onChangeContact} type="text" value={this.state.contact} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div> */}

      </React.Fragment>
    );
  }
}
export default SectionBuziness;