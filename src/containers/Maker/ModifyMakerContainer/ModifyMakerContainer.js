import React, { Component } from "react";
import ModifyMaker from 'components/Maker/ModifyMaker/ModifyMaker';
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import { connect } from "react-redux";
import { UpdateMakerDetailRequest } from "actions/Users/UserInfo";
import { GetExpertMakerDetailRequest } from "actions/Expert"

//const ImgWrapper = styled.div`
//  background-image: url(${mainSlide});
//  background-position: center;
//  background-size: cover;
//  width: 100%;
//  height: 200px;
//  position: relative;
//  &::after {
//    position: absolute;
//    top: 0;
//    left: 0;
//    display: block;
//    content: "";
//    width: 100%;
//    height: 100%;
//    background-color: rgba(0, 0, 0, 0.6);
//    z-index: 1;
//  }
//`;
//const Title = styled.div`
//  width: 100%;
//  color: white;
//  position: absolute;
//  text-align: center;
//  top: 40%;
//  left: 0;
//  z-index: 2;
//  transform: translateY(-50%);
//  h1 {
//    color: ${StyleGuide.color.geyScale.scale0};
//    font-size: ${StyleGuide.font.size.heading2};
//    font-weight: bold;
//  }
//`;
const Wrapper = styled(ContentBox)`
  width:100%;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;

class ModifyMakerContainer extends Component {
  componentWillMount() {
    this.props.GetExpertMakerDetailRequest(this.props.id);
    //this.props.GetTopItemListRequest(0);
  }
  render() {
    console.log("ModifyMakerContainer=====", this.props);
    return (
      <React.Fragment>
        <Wrapper>
          <ModifyMaker {...this.props} />
        </Wrapper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
    MakerDetail: state.MakerDetail.status.MakerDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateMakerDetailRequest: (data, token) => {
      return dispatch(UpdateMakerDetailRequest(data, token))
    },
    GetExpertMakerDetailRequest: (data, token) => {
      return dispatch(GetExpertMakerDetailRequest(data, token))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModifyMakerContainer);
