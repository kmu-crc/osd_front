import React, { Component } from "react";
import CreateMaker from 'components/Maker/CreateMaker/CreateMaker';
import CreateMaker_mobile from 'mobileComponents/CreateMaker_mobile';
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import { connect } from "react-redux";
import { InsertMakerDetailRequest } from "actions/Users/UserInfo";

const Wrapper = styled(ContentBox)`
  width:100%;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const Wrapper_mobile = styled.div`
  width:100%;
  padding:0px 10px;
`
class CreateMakerContainer extends Component {
  render() {
    return (
      <React.Fragment>
       {
          window.innerWidth>=500?
          <Wrapper>
          <CreateMaker {...this.props}/>
          </Wrapper>
          :
          <Wrapper_mobile>
            <CreateMaker_mobile  {...this.props} />
          </Wrapper_mobile>
        }
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    InsertMakerDetailRequest: (data, token) => {
      return dispatch(InsertMakerDetailRequest(data, token))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateMakerContainer);
