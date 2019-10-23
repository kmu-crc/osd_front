import React, { Component } from "react";
import styled from "styled-components";

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
    margin-left: 410px;
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

`
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
`
const CheckBox = styled.input`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  background-color: #EFEFEF !important;
  border: 1px solid #707070 !important;
  border-radius: 5px !important;  
`
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
  width: 505px;
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
    this.state = { isDesigner: false, team: "", career: "", location: "", contact: "" };
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        isDesigner: nextProps.MyDetail.is_designer, team: nextProps.MyDetail.team, career: nextProps.MyDetail.career,
        contact: nextProps.MyDetail.contact, location: nextProps.MyDetail.location
      })
      this.props.updateTeam(nextProps.MyDetail.team);
      this.props.updateCareer(nextProps.MyDetail.career);
      this.props.updateIsDesigner(nextProps.MyDetail.is_designer);
      this.props.updateLocation(nextProps.MyDetail.location);
      this.props.updateContact(nextProps.MyDetail.contact);
    }
    return true;
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
  onChangeTeam(event) {
    this.setState({ team: event.target.value });
    this.props.updateTeam(event.target.value);
  }
  onChangeCareer(event) {
    this.setState({ career: event.target.value });
    this.props.updateCareer(event.target.value);
  }
  onChangeLocation(event) {
    this.setState({ location: event.target.value });
    this.props.updateLocation(event.target.value);
  }
  onChangeContact(event) {
    this.setState({ contact: event.target.value });
    this.props.updateContact(event.target.value);
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
          <CheckBox type="checkbox" id="designercheckbox" className="cuteCheckBox"
            onChange={this.isDesignerCheck} onClick={this.isDesignerCheck} checked={this.state.isDesigner} />
          </div>
          <div className="tipTitle">TIP</div>
        </IsDesignerBox>
        <div className="tipDescription">{description[0]}<br />{description[1]}<br />{description[2]}</div>

        <DesignerInfoBox>
          <div className="itemBox">
            <div className="designerInfoTitle">팀</div>
            <InputText onChange={this.onChangeTeam} value={this.state.team == null ? "" : this.state.team} />
          </div>

          <div className="itemBox">
            <div className="designerInfoTitle">경력</div>
            <InputText onChange={this.onChangeCareer} value={this.state.career == null ? "" : this.state.career} />
          </div>

          <div className="itemBox">
            <div className="designerInfoTitle">위치</div>
            <InputText onChange={this.onChangeLocation} value={this.state.location == null ? "" : this.state.location} />
          </div>

          <div className="itemBox">
            <div className="designerInfoTitle">연락</div>
            <InputText onChange={this.onChangeContact} value={this.state.contact == null ? "" : this.state.contact} />
          </div>
        </DesignerInfoBox>
      </ContentsBox>
    );
  }
}
export default SectionBuziness;