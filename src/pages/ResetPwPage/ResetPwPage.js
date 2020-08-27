import React, { Component } from "react";
import ResetPwContainer from "containers/Registration/ResetPwContainer";
import styled from "styled-components";

const ResetContentBox = styled.div`
width: 100%;
height:100vh;
position: relative;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
background-size: cover;
background-position: center;
`;
const ResetCard = styled.div`
position: relative;
z-index: 2;
border-radius: 20px;
box-shadow: 5px 5px 10px #00000029;
background: #FFFFFF 0% 0% no-repeat padding-box;
`;
class ResetPwPage extends Component {
  render() {
    return (
      <ResetContentBox>
        <ResetCard>
          <ResetPwContainer />
        </ResetCard>
      </ResetContentBox>
    );
  }
}

export default ResetPwPage;
