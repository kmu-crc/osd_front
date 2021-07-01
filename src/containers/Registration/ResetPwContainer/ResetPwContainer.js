import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResetPwForm from "components/Registration/ResetPwForm";
import ResetPwForm_mobile from "mobileComponents/ResetPwForm_mobile";
import { FindPwRequest } from "actions/Registration";
import styled from "styled-components";

const ResetContentBox = styled.div`
    width: 100%;
    height:100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    margin-top:80px;
    padding:0px 20px;
`;
const ResetCard = styled.div`
    width:933px;
    height:309px;
    display:flex;
    align-items:center;
    justify-content:center;
    max-width:100%;
    position: relative;
    z-index: 2;
    box-shadow: 3px 3px 5px #00000029;
    border: 0.5px solid #EAEAEA;
    border-radius: 20px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    margin:0px 20px;
    
`;

class ResetPwContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <ResetContentBox>
            <ResetCard>
              <ResetPwForm {...this.props} />
            </ResetCard>
          </ResetContentBox>
          :
          <ResetPwForm_mobile {...this.props} />
        }
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.FindPw.FindPw.status,
    message: state.FindPw.status.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FindPwRequest: data => {
      return dispatch(FindPwRequest(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPwContainer)
);
