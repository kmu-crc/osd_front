import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";


// css styling

const Foot = styled.footer`
  background-color: #191919;
  bottom: 0px;
  width: 100%;
  color: #fff;
  & .ui.grid>.row {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  & .copyright {
  }
  & .list > li {
    float: left;
    margin-right: 3rem;
    font-size: 11px;
    cursor: pointer;
  }
`;


class Footer extends Component {
  render() {
    return(
      <Foot>
        <Grid padded={true} columns={2}>
          <Grid.Row>
            <Grid.Column className="copyright">Copyright @ 2018 Open Design Inc.</Grid.Column>
            <Grid.Column as="ul" className="list">
              <li>사이트 소개</li>
              <li>이용약관</li>
              <li>개인정보보호정책</li>
              <li>Contact Us</li>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Foot>
    );
  }
}

export default Footer;
