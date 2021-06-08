import React, { Component } from "react";
import ModifyMaker from 'components/Maker/ModifyMaker/ModifyMaker';
import ModifyMaker_mobile from 'mobileComponents/ModifyMaker_mobile';
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import { connect } from "react-redux";
import { UpdateMakerDetailRequest } from "actions/Users/UserInfo";
import { GetExpertMakerDetailRequest } from "actions/Expert"

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
class ModifyMakerContainer extends Component {
  componentWillMount() {
    this.props.GetExpertMakerDetailRequest(this.props.id);
  }
  render() {
    console.log("ModifyMakerContainer=====", this.props);
    return (
      <React.Fragment>
       {
          window.innerWidth>=500?
          <Wrapper>
          <ModifyMaker {...this.props}/>
          </Wrapper>
          :
          <Wrapper_mobile>
            <ModifyMaker_mobile  {...this.props} />
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
