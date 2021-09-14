import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid } from "semantic-ui-react";
import opendesign_style from "opendesign_style";
import FooterPara from "./FooterPara";
import ClientTemplate from "templates/ClientTemplate"

const FromFieldCard = styled.div`
  border:3px solid #EFEFEF;  
  margin-left:0.7rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
  width: 100%;
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  padding: 40px;
  & .para {
    font-size: ${opendesign_style.font.size.paragraph};
    color: ${opendesign_style.color.grayScale.scale7};
  }
`;

const Wrapper = styled.div`
  display:flex;
  .content{
    max-width:1511px;
    width:100%;
    border:1px solid #B7B7B7;
    box-shadow: 8px 8px 8px #4141411A;
    margin-top:31px;
    margin-right:45px;
    display:flex;
    justify-content:center;
    padding:14px 14px 43px 14px;
    margin-bottom:100px;
  }
`
const Navi = styled.div`
  min-width:264px;
  width:264px;
  padding-top:305px;
  display:flex;
  flex-direction:column;
  align-items:center;
  .menu{
    width:168px;
    height:60px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:Noto Sans KR;
    font-weight:Medium;
    font-size:24px;
    cursor:pointer;
  }
  .borderBottom{
    border-bottom:2px solid #707070;
  }
  .red{
    color:red;
  }
  
`

// const FormHeader = styled(Header) `
//   position: relative;
//   padding-right: 2.5rem !important;
//   &::after{
//     position: absolute;
//     display: block;
//     right: 2rem;
//     content: "";
//     height: 20px;
//     border-right: 3px solid #191919;
//     top: 50%;
//     transform: translateY(-50%);
//   }
// `;

class FooterTerm extends Component {
  render() {
    return(
      <ClientTemplate>
        <Wrapper>
          <Navi>
          <div className="menu borderBottom red" onClick={()=>window.location.href="/footerPara"}>이용약관</div>
            <div className="menu " onClick={()=>window.location.href="/footerPrivacy"}>개인정보 보호</div>
          </Navi>
          <div className="content">
            <FooterPara/>
          </div>
        </Wrapper>
      </ClientTemplate>
    );
  }
}

export default FooterTerm;
