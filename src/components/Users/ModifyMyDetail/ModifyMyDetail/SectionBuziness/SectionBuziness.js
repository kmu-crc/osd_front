import React, { Component } from "react";
import styled from "styled-components";

const IsDesignerContainer = styled.div`
  display: flex;
  justify-content: space-start;
  padding-left: 95.5px;
  .text-label {
    color: #707070;
    font-size: 20px;
    font-weight: 500;
  }
  checkbox {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid #707070;
    background: ${props => props.bg} 
  }
  .tip{
    width: 27px;
    height: 25px;
    margin-left: 420px;
    color: #FF0000;
    font-size: 17px;
    text-align: left;
  }
`;
const Description = styled.div`
  width: 540px;
  height: 75px;
  margin-top: 5px;
  margin-left: 708px;
  color: #707070;
  font-size: 17px;
  font-weight: 100;
`;
const TeamContainer = styled.div`
    display: flex;
    position: relative;
    margin-top: 66px;
    justifyContent: space-start;
    .text-label {
      margin-left: 265px;
      color: #707070;
      font-size: 20px;
      opacity: 0.5;
    }
    input {
      width: 505.5px;
      height: 56px;
      margin-left: 57px;
      padding-left: 15px;
      border: none;
      outline: none;
      borderRadius: 5px;
      font-size: 20px;
      font-family: Noto Sans KR;
      font-weight: 500;
      background-color: #EFEFEF;
      opacity: 0.5;
`;
const CareerContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 46px;
  justify-content: space-start;
  .text-label {
    margin-left: 265px;
    color: #707070;
    font-size: 20px;
    opacity: 0.5;
  };
  input {
    width: 505.5px;
    height: 56px;
    padding-left: 15px;
    margin-left: 37px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    font-family: Noto Sans KR;
    font-weight: 500;
    background-color: #EFEFEF;
    opacity: 0.5;
  }
`; 
const LocationContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 46px;
  justify-content: space-start;
  .text-label { 
    margin-left: 265px;
    color: #707070;
    font-size: 20px;
    opacity: 0.5;
  }
  input {
    width: 505.5px;
    height: 56px;
    margin-left: 37px;
    padding-left: 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    font-family: Noto Sans KR;
    font-weight: 500;
    background-color: #EFEFEF;
    opacity: 0.5;
  }
`; 
const ContactContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 46px;
  justify-content: space-start;
  .text-label {
    margin-left: 265px;
    color: #707070;
    font-size: 20px;
    opacity: 0.5;
  }
  input {
    width: 505.5px;
    height: 56px;
    padding-left: 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    margin-left: 37px;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    background-color: #EFEFEF;
    opacity: 0.5;
  }
`;

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
      <React.Fragment>

        <IsDesignerContainer checkbg={this.state.isDesigner === 1 ? "#FF0000  0% 0% no-repeat padding-box" : "#FFFFFF 0% 0% no-repeat padding-box"}>
          <div className="text-label">디자이너 활동 여부</div>
          <checkbox id="isDesignerCheckbox" onClick={this.isDesignerCheck} />
          <div className="tip">TIP</div>
        </IsDesignerContainer>
        <Description>{description[0]}<br />{description[1]}<br />{description[2]}</Description>

        <TeamContainer>
          <div className="text-label">팀</div>
          <input onChange={this.onChangeTeam} maxLength="100" type="text" value={this.state.team} />
        </TeamContainer>

        <CareerContainer>
          <div className="text-label">경력</div>
          <input onChange={this.onChangeCareer} maxLength="100" type="text" value={this.state.career} />
        </CareerContainer>

        <LocationContainer>
          <div className="text-label">위치</div>
          <input onChange={this.onChangeLocation} maxLength="100" type="text" value={this.state.location} />
        </LocationContainer>

        <ContactContainer>
          <div className="text-label">연락</div>
          <input onChange={this.onChangeContact} maxLength="100" type="text" value={this.state.contact} />
        </ContactContainer>
      </React.Fragment>
    );
  }
}
export default SectionBuziness;