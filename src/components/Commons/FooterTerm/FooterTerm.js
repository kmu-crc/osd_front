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

const FormHeader = styled(Header) `
  position: relative;
  padding-right: 2.5rem !important;
  &::after{
    position: absolute;
    display: block;
    right: 2rem;
    content: "";
    height: 20px;
    border-right: 3px solid #191919;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class FooterTerm extends Component {
  render() {
    return(
      <ClientTemplate>
      <div style={{width:"99%"}}>
        <FromFieldCard>
          <Grid>
            <Grid.Column width={4}>
              <FormHeader as="h2">이용약관</FormHeader>
            </Grid.Column>
            <Grid.Column width={12}>
              <FooterPara/>
            </Grid.Column>
          </Grid>
        </FromFieldCard>
      </div>
      </ClientTemplate>
    );
  }
}

export default FooterTerm;
